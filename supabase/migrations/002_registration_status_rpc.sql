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
  where r.registration_code = registration_code_input
    and (
      lower(r.email) = lower(contact_input)
      or regexp_replace(r.whatsapp, '[^0-9]', '', 'g') = regexp_replace(contact_input, '[^0-9]', '', 'g')
    )
  limit 1;
$$;
