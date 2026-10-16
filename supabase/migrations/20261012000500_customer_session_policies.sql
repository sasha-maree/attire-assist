revoke all on public.customer_sessions from anon, authenticated;

grant select, insert on public.customer_sessions to authenticated;

create policy customer_sessions_read_own
  on public.customer_sessions
  for select
                 to authenticated
                 using (auth_user_id = (select auth.uid()));

create policy customer_sessions_insert_own
  on public.customer_sessions
  for insert
  to authenticated
  with check (auth_user_id = (select auth.uid()));