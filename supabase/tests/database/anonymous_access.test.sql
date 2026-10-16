begin;

create extension if not exists pgtap with schema extensions;

set local search_path = public, extensions;

select plan(1);

set local role anon;

select throws_ok(
               'select * from public.messages',
               '42501',
               'permission denied for table messages',
               'Unauthenticated visitors cannot read messages'
       );

reset role;

select * from finish();

rollback;