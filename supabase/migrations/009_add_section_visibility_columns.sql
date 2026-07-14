-- Migration ini menambah kolom pengaturan visibilitas section di halaman detail lomba
alter table public.competitions
  add column if not exists show_timeline   boolean default true,
  add column if not exists show_stages     boolean default true,
  add column if not exists show_mechanisms boolean default true;
