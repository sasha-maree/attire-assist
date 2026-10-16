create table public.conversations (
                                      id uuid primary key default gen_random_uuid(),
                                      shop_id uuid not null,
                                      customer_session_id uuid not null, /*identifies the customer session that owns it*/
                                      channel text not null default 'website',
                                      status text not null default 'automated',
                                      created_at timestamptz not null default now(),
                                      updated_at timestamptz not null default now(),

                                      constraint conversations_channel_valid
                                          check (channel = 'website'),

                                      constraint conversations_status_valid
                                          check (status in ('automated', 'staff_handling', 'resolved')),

                                      constraint conversations_customer_session_fk
                                          foreign key (shop_id, customer_session_id)
                                              references public.customer_sessions (shop_id, id),

                                      unique (shop_id, id)
);

alter table public.conversations enable row level security;