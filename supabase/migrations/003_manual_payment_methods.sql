create table if not exists public.payment_methods (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade,
  type text not null check (type in ('qris', 'bank_transfer', 'ewallet')),
  label text not null,
  is_active boolean default true,
  bank_name text,
  account_number text,
  account_holder text,
  qris_image_url text,
  notes text,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.registrations
  add column if not exists payment_method_id uuid references public.payment_methods(id) on delete set null;

alter table public.payment_methods enable row level security;

create policy "Public read active payment methods"
on public.payment_methods
for select
using (is_active = true or public.is_admin());

create policy "Admin all payment methods"
on public.payment_methods
for all
using (public.is_admin())
with check (public.is_admin());

with active_event as (
  select id from public.events where year = 2026
)
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

with active_event as (
  select id from public.events where year = 2026
)
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
