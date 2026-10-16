revoke all on public.messages from anon, authenticated;

grant select, insert on public.messages to authenticated;

create policy messages_read_own
  on public.messages
  for select
                 to authenticated
                 using (
                 exists (
                 select 1
                 from public.conversations as conversation
                 join public.customer_sessions as session
                 on session.id = conversation.customer_session_id
                 and session.shop_id = conversation.shop_id
                 where conversation.id = messages.conversation_id
                 and conversation.shop_id = messages.shop_id
                 and session.auth_user_id = (select auth.uid())
                 )
                 );

create policy messages_insert_customer
  on public.messages
  for insert
  to authenticated
  with check (
    sender = 'customer'
    and exists (
      select 1
      from public.conversations as conversation
      join public.customer_sessions as session
        on session.id = conversation.customer_session_id
        and session.shop_id = conversation.shop_id
      where conversation.id = messages.conversation_id
        and conversation.shop_id = messages.shop_id
        and session.auth_user_id = (select auth.uid())
    )
  );