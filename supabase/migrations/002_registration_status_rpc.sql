-- 002_registration_status_rpc.sql
-- RPC untuk generate nomor registrasi dan cek status peserta secara aman.

-- =========================================================
-- 1. Generate registration code
-- Format: GAMES-{YEAR}-{COMPETITION_CODE}-{NUMBER}
-- Contoh: GAMES-2026-LCT-0001
-- =========================================================

create or replace function public.next_registration_code(
  p_event_id uuid,
  p_competition_id uuid
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_year integer;
  v_code text;
  v_count integer;
  v_next_number text;
begin
  select year
  into v_year
  from public.events
  where id = p_event_id;

  if v_year is null then
    raise exception 'Event not found';
  end if;

  select code
  into v_code
  from public.competitions
  where id = p_competition_id;

  if v_code is null then
    raise exception 'Competition not found';
  end if;

  select count(*) + 1
  into v_count
  from public.registrations
  where event_id = p_event_id
    and competition_id = p_competition_id;

  v_next_number := lpad(v_count::text, 4, '0');

  return 'GAMES-' || v_year || '-' || upper(v_code) || '-' || v_next_number;
end;
$$;

grant execute on function public.next_registration_code(uuid, uuid) to anon;
grant execute on function public.next_registration_code(uuid, uuid) to authenticated;


-- =========================================================
-- 2. Check registration status
-- Dipakai untuk halaman /cek-status.
-- Peserta wajib input registration_code + email/WhatsApp.
-- Tidak mengembalikan data sensitif seperti bukti pembayaran.
-- =========================================================

create or replace function public.check_registration_status(
  registration_code_input text,
  contact_input text
)
returns table (
  registration_code text,
  participant_name text,
  team_name text,
  institution text,
  competition_name text,
  competition_code text,
  registration_status text,
  payment_status text,
  submission_status text,
  admin_note text
)
language sql
security definer
set search_path = public
as $$
  select
    r.registration_code,
    r.leader_name as participant_name,
    r.team_name,
    r.institution,
    c.name as competition_name,
    c.code as competition_code,
    r.registration_status,
    r.payment_status,
    r.submission_status,
    r.admin_note
  from public.registrations r
  join public.competitions c on c.id = r.competition_id
  where lower(r.registration_code) = lower(registration_code_input)
    and (
      lower(r.email) = lower(contact_input)
      or regexp_replace(coalesce(r.whatsapp, ''), '[^0-9]', '', 'g') =
         regexp_replace(coalesce(contact_input, ''), '[^0-9]', '', 'g')
    )
  limit 1;
$$;

grant execute on function public.check_registration_status(text, text) to anon;
grant execute on function public.check_registration_status(text, text) to authenticated;

notify pgrst, 'reload schema';