revoke all on public.conversations from anon, authenticated;

grant select, insert on public.conversations to authenticated;

create policy conversations_read_own
  on public.conversations
  for select
                 to authenticated
                 using (
                 exists (
                 select 1
                 from public.customer_sessions as session
                 where session.id = conversations.customer_session_id
                 and session.shop_id = conversations.shop_id
                 and session.auth_user_id = (select auth.uid())
                 )
                 );

create policy conversations_insert_own
  on public.conversations
  for insert
  to authenticated
  with check (
    status = 'automated'
    and channel = 'website'
    and exists (
      select 1
      from public.customer_sessions as session
      where session.id = conversations.customer_session_id /*checks the conversation belongs to that session*/
        and session.shop_id = conversations.shop_id /*checks the session belongs to the same shop*/
        and session.auth_user_id = (select auth.uid()) /*checks the authenticated visitor owns the session*/
    )
  );