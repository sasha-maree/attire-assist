create table public.shops (
                              id uuid primary key default gen_random_uuid(), /*unique, generated database identifier*/
                              slug text not null unique,  /*unique readable identifier, such as velvet-rentals*/
                              name text not null, /*shop’s display name*/
                              created_at timestamptz not null default now(),

                              constraint shops_slug_not_blank check (length(trim(slug)) > 0),
                              constraint shops_name_not_blank check (length(trim(name)) > 0)
);

alter table public.shops enable row level security;