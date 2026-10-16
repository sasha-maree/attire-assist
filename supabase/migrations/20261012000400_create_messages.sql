create table public.messages (
                                 id uuid primary key default gen_random_uuid(),
                                 shop_id uuid not null,
                                 conversation_id uuid not null,
                                 sender text not null,
                                 content text not null,
                                 created_at timestamptz not null default now(),

                                 constraint messages_sender_valid
                                     check (sender in ('customer', 'assistant', 'staff')),

                                 constraint messages_content_not_blank
                                     check (length(trim(content)) > 0),

                                 constraint messages_conversation_fk
                                     foreign key (shop_id, conversation_id)
                                         references public.conversations (shop_id, id)
);

create index messages_conversation_created_idx
    on public.messages (shop_id, conversation_id, created_at, id);

alter table public.messages enable row level security;