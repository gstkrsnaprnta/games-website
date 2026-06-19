-- FILE: supabase/migrations/005_dynamic_registration_fields.sql

-- 1. Tambah kolom baru ke tabel competitions
alter table public.competitions
  add column if not exists max_teams_per_school integer default null,
  add column if not exists total_quota          integer default null,
  add column if not exists has_work_submission  boolean default false,
  add column if not exists subthemes            text[]  default '{}';

-- 2. Tambah kolom baru ke tabel registrations
alter table public.registration_members
  add column if not exists identity_number    text default null,
  add column if not exists class_or_semester  text default null,
  add column if not exists id_card_url        text default null;

alter table public.registrations
  add column if not exists work_title    text default null,
  add column if not exists work_subtheme text default null;

-- 3. Seed data kompetisi GAMES 2026 (UPSERT berdasarkan slug agar idempotent)
with active_event as (
  select id from public.events where year = 2026 limit 1
)
insert into public.competitions (
  event_id, name, slug, code,
  participant_levels, competition_type, min_members, max_members,
  registration_fee, registration_status,
  max_teams_per_school, total_quota,
  has_work_submission, subthemes,
  is_active
)
select
  ae.id,
  v.name, v.slug, v.code,
  v.participant_levels, v.competition_type, v.min_members, v.max_members,
  v.registration_fee, 'open',
  v.max_teams_per_school, v.total_quota,
  v.has_work_submission, v.subthemes,
  true
from active_event ae
cross join (values
  (
    'Lomba Cepat Tepat Matematika', 'lctm', 'LCTM',
    array['SMP','SMA']::text[], 'team', 3, 3,
    75000, 2, 24,
    false, '{}'::text[]
  ),
  (
    'Lomba Olimpiade Matematika', 'olimpiade-matematika', 'LOM',
    array['SD','SMP','SMA']::text[], 'individual', 1, 1,
    50000, 7, null,
    false, '{}'::text[]
  ),
  (
    'Lomba Esai Regional', 'esai-regional', 'ESAI',
    array['SMA']::text[], 'team', 1, 2,
    60000, 2, null,
    true, array[
      'Sains & Media',
      'Sosial Budaya',
      'Energi dan Alam',
      'Edu-Teknologi',
      'Finansial'
    ]::text[]
  ),
  (
    'Lomba Karya Tulis Ilmiah Nasional', 'lkti-nasional', 'LKTI',
    array['Mahasiswa']::text[], 'team', 1, 3,
    80000, null, null,
    true, array[
      'Matematika untuk solusi lingkungan',
      'Pemodelan matematika berkelanjutan',
      'Inovasi data untuk pembangunan',
      'Efisiensi sumber daya berbasis matematika',
      'AI dalam pembangunan berkelanjutan'
    ]::text[]
  )
) as v(name, slug, code, participant_levels, competition_type, min_members, max_members, registration_fee, max_teams_per_school, total_quota, has_work_submission, subthemes)
on conflict (slug) do update set
  participant_levels    = excluded.participant_levels,
  competition_type      = excluded.competition_type,
  min_members           = excluded.min_members,
  max_members           = excluded.max_members,
  registration_fee      = excluded.registration_fee,
  max_teams_per_school  = excluded.max_teams_per_school,
  total_quota           = excluded.total_quota,
  has_work_submission   = excluded.has_work_submission,
  subthemes             = excluded.subthemes,
  registration_status   = 'open';

-- 4. RPC: Validasi kuota sekolah dan total kuota, lalu insert registrasi + anggota secara atomik
create or replace function public.submit_registration(
  p_competition_id     uuid,
  p_team_name          text,
  p_leader_name        text,
  p_email              text,
  p_whatsapp           text,
  p_institution        text,
  p_level              text,
  p_work_title         text,
  p_work_subtheme      text,
  p_payment_method_id  uuid,
  p_payment_proof_url  text,
  p_members            jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_competition        record;
  v_event_id           uuid;
  v_reg_code           text;
  v_reg_id             uuid;
  v_school_count       integer;
  v_total_count        integer;
  v_member             jsonb;
  v_member_count       integer;
begin
  -- Kunci baris kompetisi agar tidak race condition saat cek kuota
  select c.*, e.id as ev_id
  into v_competition
  from public.competitions c
  join public.events e on e.id = c.event_id
  where c.id = p_competition_id
    and c.is_active = true
    and c.registration_status = 'open'
  for update;

  if not found then
    return jsonb_build_object('ok', false, 'error', 'Lomba tidak ditemukan atau pendaftaran sudah ditutup.');
  end if;

  v_event_id := v_competition.ev_id;

  -- Hitung jumlah anggota (termasuk ketua)
  v_member_count := jsonb_array_length(p_members);

  -- Validasi jumlah anggota sesuai min/max
  if v_member_count < v_competition.min_members then
    return jsonb_build_object(
      'ok', false,
      'error', format('Minimal %s anggota diperlukan untuk lomba ini (termasuk ketua).', v_competition.min_members)
    );
  end if;

  if v_member_count > v_competition.max_members then
    return jsonb_build_object(
      'ok', false,
      'error', format('Maksimal %s anggota diperbolehkan untuk lomba ini (termasuk ketua).', v_competition.max_members)
    );
  end if;

  -- Validasi jenjang
  if p_level is null or not (p_level = any(v_competition.participant_levels)) then
    return jsonb_build_object(
      'ok', false,
      'error', format('Jenjang "%s" tidak diperbolehkan untuk lomba ini.', p_level)
    );
  end if;

  -- Validasi karya wajib untuk has_work_submission
  if v_competition.has_work_submission then
    if p_work_title is null or trim(p_work_title) = '' then
      return jsonb_build_object('ok', false, 'error', 'Judul karya wajib diisi untuk lomba ini.');
    end if;
    if p_work_subtheme is null or trim(p_work_subtheme) = '' then
      return jsonb_build_object('ok', false, 'error', 'Subtema karya wajib dipilih untuk lomba ini.');
    end if;
    if not (p_work_subtheme = any(v_competition.subthemes)) then
      return jsonb_build_object('ok', false, 'error', 'Subtema yang dipilih tidak valid.');
    end if;
  end if;

  -- Validasi kuota total lomba (hanya registrasi verified + pending dihitung)
  if v_competition.total_quota is not null then
    select count(*)
    into v_total_count
    from public.registrations
    where competition_id = p_competition_id
      and registration_status in ('pending', 'verified');

    if v_total_count >= v_competition.total_quota then
      return jsonb_build_object(
        'ok', false,
        'error', format('Kuota pendaftaran untuk lomba ini sudah penuh (%s tim).', v_competition.total_quota)
      );
    end if;
  end if;

  -- Validasi kuota per sekolah
  if v_competition.max_teams_per_school is not null then
    select count(*)
    into v_school_count
    from public.registrations
    where competition_id = p_competition_id
      and lower(trim(institution)) = lower(trim(p_institution))
      and registration_status in ('pending', 'verified');

    if v_school_count >= v_competition.max_teams_per_school then
      return jsonb_build_object(
        'ok', false,
        'error', format(
          'Sekolah/instansi "%s" sudah mencapai batas maksimal %s pendaftar untuk lomba ini.',
          p_institution,
          v_competition.max_teams_per_school
        )
      );
    end if;
  end if;

  -- Generate kode registrasi
  select count(*) + 1
  into v_total_count
  from public.registrations
  where competition_id = p_competition_id;

  v_reg_code := 'GAMES-' || (select year from public.events where id = v_event_id)
    || '-' || upper(v_competition.code)
    || '-' || lpad(v_total_count::text, 4, '0');

  -- Cek duplikat kode
  if exists (select 1 from public.registrations where registration_code = v_reg_code) then
    v_reg_code := v_reg_code || '-' || substr(gen_random_uuid()::text, 1, 4);
  end if;

  v_reg_id := gen_random_uuid();

  -- Insert registrasi utama
  insert into public.registrations (
    id, event_id, competition_id, registration_code,
    participant_type, team_name, leader_name, email, whatsapp,
    institution, level, work_title, work_subtheme,
    payment_method_id, payment_proof_url,
    payment_status, registration_status, submission_status
  ) values (
    v_reg_id,
    v_event_id,
    p_competition_id,
    v_reg_code,
    case when v_competition.max_members > 1 then 'team' else 'individual' end,
    nullif(trim(p_team_name), ''),
    p_leader_name,
    p_email,
    p_whatsapp,
    p_institution,
    p_level,
    nullif(trim(p_work_title), ''),
    nullif(trim(p_work_subtheme), ''),
    p_payment_method_id,
    nullif(trim(p_payment_proof_url), ''),
    case when p_payment_proof_url is not null and trim(p_payment_proof_url) != '' then 'pending' else 'unpaid' end,
    'pending',
    case when v_competition.has_work_submission then 'not_submitted' else 'not_required' end
  );

  -- Insert semua anggota (sudah termasuk ketua di index 0)
  for v_member in select * from jsonb_array_elements(p_members)
  loop
    insert into public.registration_members (
      registration_id, name, role, identity_number, class_or_semester, id_card_url
    ) values (
      v_reg_id,
      v_member->>'name',
      v_member->>'role',
      nullif(trim(v_member->>'identity_number'), ''),
      nullif(trim(v_member->>'class_or_semester'), ''),
      nullif(trim(v_member->>'id_card_url'), '')
    );
  end loop;

  return jsonb_build_object(
    'ok', true,
    'registration_code', v_reg_code,
    'registration_id', v_reg_id
  );

exception when others then
  return jsonb_build_object('ok', false, 'error', sqlerrm);
end;
$$;

-- 5. Grant execute ke public (anon + authenticated)
grant execute on function public.submit_registration(uuid, text, text, text, text, text, text, text, text, uuid, text, jsonb) to anon, authenticated;
