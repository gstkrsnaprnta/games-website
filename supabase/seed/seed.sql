insert into public.events (year, name, theme, description, start_date, end_date, is_active)
values (
  2026,
  'Gebyar Matematika Sains 2026',
  'Matematika, Sains, dan Prestasi untuk Indonesia',
  'Program kerja tahunan divisi pendidikan sebagai wujud pengabdian mahasiswa Matematika terhadap masyarakat.',
  '2026-06-01',
  '2026-08-10',
  true
)
on conflict (year) do update set is_active = excluded.is_active;

with active_event as (
  select id from public.events where year = 2026
)
insert into public.competitions (event_id, name, slug, code, short_description, description, participant_levels, competition_type, min_members, max_members, registration_status)
select id, name, slug, code, short_description, description, participant_levels, competition_type, min_members, max_members, 'open'
from active_event,
(values
  ('Lomba Cepat Tepat Matematika', 'lct-matematika', 'LCT', 'Kompetisi cepat dan tepat menyelesaikan soal matematika secara tim.', 'LCT Matematika menguji kemampuan kognitif, pemecahan masalah, kerja sama, dan kecepatan berpikir.', array['SD','SMP','SMA'], 'team', 2, 3),
  ('Olimpiade Matematika', 'olimpiade-matematika', 'OLIM', 'Kompetisi pemecahan soal matematika menantang untuk siswa.', 'Olimpiade Matematika menguji kemampuan matematika dan kecerdasan peserta dalam menyelesaikan soal kompleks.', array['SD','SMP','SMA'], 'individual', 1, 1),
  ('Ranking 1', 'ranking-1', 'R1', 'Kompetisi ketepatan menjawab pertanyaan hingga tersisa satu pemenang.', 'Ranking 1 adalah kompetisi antar siswa SD/sederajat.', array['SD'], 'individual', 1, 1),
  ('LKTI', 'lkti', 'LKTI', 'Kompetisi karya tulis ilmiah tingkat nasional.', 'LKTI menjadi ruang gagasan ilmiah peserta sesuai ketentuan panitia.', array['SMA','Mahasiswa'], 'team', 1, 3),
  ('Calculus Competition', 'calculus-competition', 'CALC', 'Kompetisi kalkulus untuk mahasiswa.', 'Calculus Competition menguji pemahaman kalkulus dan problem solving mahasiswa.', array['Mahasiswa'], 'individual', 1, 1)
) as c(name, slug, code, short_description, description, participant_levels, competition_type, min_members, max_members)
on conflict (slug) do nothing;

with active_event as (select id from public.events where year = 2026)
insert into public.faqs (event_id, question, answer, sort_order)
select id, question, answer, sort_order from active_event,
(values
  ('Apakah pendaftaran dilakukan online?', 'Ya, peserta mengisi formulir pendaftaran melalui website GAMES.', 1),
  ('Bagaimana cara cek status pendaftaran?', 'Gunakan nomor registrasi serta email atau WhatsApp pada halaman cek status.', 2)
) as f(question, answer, sort_order);

with active_event as (select id from public.events where year = 2026)
insert into public.timelines (event_id, title, description, start_date, sort_order)
select id, title, description, start_date::date, sort_order from active_event,
(values
  ('Pembukaan pendaftaran', 'Pendaftaran peserta GAMES dibuka.', '2026-06-01', 1),
  ('Penutupan pendaftaran', 'Batas akhir pengisian formulir dan pembayaran.', '2026-07-15', 2),
  ('Pelaksanaan lomba', 'Pelaksanaan cabang lomba sesuai jadwal panitia.', '2026-08-03', 3)
) as t(title, description, start_date, sort_order);

with active_event as (select id from public.events where year = 2026)
insert into public.announcements (event_id, title, slug, category, content, status, published_at)
select id, 'Pendaftaran GAMES 2026 segera dibuka', 'pendaftaran-games-2026', 'general', 'Pantau website resmi GAMES untuk informasi pembukaan pendaftaran, guidebook, dan kontak panitia.', 'published', now()
from active_event
on conflict (slug) do nothing;

with active_event as (select id from public.events where year = 2026)
insert into public.payment_methods (event_id, type, label, qris_image_url, notes, sort_order, is_active)
select
  id,
  'qris',
  'QRIS Panitia GAMES',
  'https://example.com/qris-games-2026.png',
  'Scan QRIS panitia, lalu unggah atau tempel link bukti pembayaran pada formulir pendaftaran.',
  1,
  true
from active_event
where not exists (
  select 1 from public.payment_methods where label = 'QRIS Panitia GAMES'
);

with active_event as (select id from public.events where year = 2026)
insert into public.payment_methods (event_id, type, label, bank_name, account_number, account_holder, notes, sort_order, is_active)
select
  id,
  'bank_transfer',
  'Transfer Bank Panitia GAMES',
  'Bank Contoh',
  '1234567890',
  'Panitia GAMES',
  'Transfer sesuai biaya lomba, lalu unggah atau tempel link bukti pembayaran pada formulir pendaftaran.',
  2,
  true
from active_event
where not exists (
  select 1 from public.payment_methods where label = 'Transfer Bank Panitia GAMES'
);
