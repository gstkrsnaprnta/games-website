create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text default 'admin' check (role in ('admin', 'super_admin')),
  is_active boolean default true,
  created_at timestamptz default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  year integer not null unique,
  name text not null,
  theme text,
  description text,
  start_date date,
  end_date date,
  is_active boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.competitions (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade,
  name text not null,
  slug text unique not null,
  code text not null,
  short_description text,
  description text,
  participant_levels text[],
  competition_type text default 'individual' check (competition_type in ('individual', 'team')),
  min_members integer default 1,
  max_members integer default 1,
  registration_fee integer default 0,
  registration_status text default 'closed' check (registration_status in ('open', 'closed')),
  registration_open_at timestamptz,
  registration_close_at timestamptz,
  guidebook_url text,
  poster_url text,
  contact_person text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.timelines (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade,
  competition_id uuid references public.competitions(id) on delete set null,
  title text not null,
  description text,
  start_date date not null,
  end_date date,
  sort_order integer default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade,
  question text not null,
  answer text not null,
  sort_order integer default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade,
  competition_id uuid references public.competitions(id) on delete set null,
  title text not null,
  slug text unique not null,
  category text default 'general',
  content text not null,
  attachment_url text,
  status text default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete restrict,
  competition_id uuid references public.competitions(id) on delete restrict,
  registration_code text unique not null,
  participant_type text default 'individual',
  team_name text,
  leader_name text not null,
  email text not null,
  whatsapp text not null,
  institution text not null,
  level text,
  payment_proof_url text,
  submission_url text,
  registration_status text default 'pending' check (registration_status in ('pending', 'verified', 'rejected', 'revision_required')),
  payment_status text default 'unpaid' check (payment_status in ('unpaid', 'pending', 'valid', 'rejected', 'revision_required')),
  submission_status text default 'not_required' check (submission_status in ('not_required', 'not_submitted', 'pending', 'valid', 'rejected', 'revision_required')),
  admin_note text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.registration_members (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid references public.registrations(id) on delete cascade,
  name text not null,
  role text,
  created_at timestamptz default now()
);

create table public.sponsors (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade,
  name text not null,
  logo_url text,
  website_url text,
  sponsor_type text default 'sponsor',
  sort_order integer default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table public.galleries (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade,
  title text,
  image_url text not null,
  description text,
  sort_order integer default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role in ('admin', 'super_admin')
      and is_active = true
  );
$$;

create or replace function public.next_registration_code(competition_id_input uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  competition_record record;
  next_number integer;
begin
  select c.code, e.year
  into competition_record
  from public.competitions c
  join public.events e on e.id = c.event_id
  where c.id = competition_id_input;

  if competition_record is null then
    raise exception 'Competition not found';
  end if;

  select count(*) + 1
  into next_number
  from public.registrations
  where competition_id = competition_id_input;

  return 'GAMES-' || competition_record.year || '-' || upper(competition_record.code) || '-' || lpad(next_number::text, 4, '0');
end;
$$;

alter table public.profiles enable row level security;
alter table public.events enable row level security;
alter table public.competitions enable row level security;
alter table public.timelines enable row level security;
alter table public.faqs enable row level security;
alter table public.announcements enable row level security;
alter table public.registrations enable row level security;
alter table public.registration_members enable row level security;
alter table public.sponsors enable row level security;
alter table public.galleries enable row level security;

create policy "Public read active events" on public.events for select using (is_active = true or public.is_admin());
create policy "Public read active competitions" on public.competitions for select using (is_active = true or public.is_admin());
create policy "Public read active timelines" on public.timelines for select using (is_active = true or public.is_admin());
create policy "Public read active faqs" on public.faqs for select using (is_active = true or public.is_admin());
create policy "Public read published announcements" on public.announcements for select using (status = 'published' or public.is_admin());
create policy "Public read active sponsors" on public.sponsors for select using (is_active = true or public.is_admin());
create policy "Public read active galleries" on public.galleries for select using (is_active = true or public.is_admin());

create policy "Public insert registrations" on public.registrations for insert with check (true);
create policy "Public insert registration members" on public.registration_members for insert with check (true);

create policy "Admin all profiles" on public.profiles for all using (public.is_admin()) with check (public.is_admin());
create policy "Admin all events" on public.events for all using (public.is_admin()) with check (public.is_admin());
create policy "Admin all competitions" on public.competitions for all using (public.is_admin()) with check (public.is_admin());
create policy "Admin all timelines" on public.timelines for all using (public.is_admin()) with check (public.is_admin());
create policy "Admin all faqs" on public.faqs for all using (public.is_admin()) with check (public.is_admin());
create policy "Admin all announcements" on public.announcements for all using (public.is_admin()) with check (public.is_admin());
create policy "Admin read registrations" on public.registrations for select using (public.is_admin());
create policy "Admin update registrations" on public.registrations for update using (public.is_admin()) with check (public.is_admin());
create policy "Admin read registration members" on public.registration_members for select using (public.is_admin());
create policy "Admin update registration members" on public.registration_members for update using (public.is_admin()) with check (public.is_admin());
create policy "Admin all sponsors" on public.sponsors for all using (public.is_admin()) with check (public.is_admin());
create policy "Admin all galleries" on public.galleries for all using (public.is_admin()) with check (public.is_admin());
