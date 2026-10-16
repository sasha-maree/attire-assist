create table public.customer_sessions (
                                          id uuid primary key default gen_random_uuid(),
                                          shop_id uuid not null references public.shops(id), /*points to an existing shop*/
                                          auth_user_id uuid not null references auth.users(id), /*points to a user managed by Supabase Auth*/
                                          created_at timestamptz not null default now(),

                                          unique (shop_id, auth_user_id), /*allows one customer record per visitor per shop*/
                                          unique (shop_id, id) /*will let conversations reference the session and its shop together*/
);

alter table public.customer_sessions enable row level security;