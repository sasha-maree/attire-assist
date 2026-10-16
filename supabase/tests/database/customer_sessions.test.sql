begin;

create extension if not exists pgtap with schema extensions;
set local search_path = public, extensions;

select plan(9);

-- Create a fictional shop for this test.
insert into public.shops (id, slug, name)
values (
           '33333333-3333-4333-8333-333333333333',
           'session-test-shop',
           'Session Test Shop'
       );

-- Create two test users without real contact details.
insert into auth.users (id)
values
    ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
    ('bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb');

-- Give each user a session at the same shop.
insert into public.customer_sessions (shop_id, auth_user_id)
values
    (
        '33333333-3333-4333-8333-333333333333',
        'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'
    ),
    (
        '33333333-3333-4333-8333-333333333333',
        'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'
    );

-- Create one conversation for each test customer's session.
insert into public.conversations (
    id,
    shop_id,
    customer_session_id
)
select
    auth_user_id,
    shop_id,
    id
from public.customer_sessions
where shop_id = '33333333-3333-4333-8333-333333333333';

-- Add a message to each test conversation.
insert into public.messages (shop_id, conversation_id, sender, content)
values
    (
        '33333333-3333-4333-8333-333333333333',
        'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
        'customer',
        'Message from user A'
    ),
    (
        '33333333-3333-4333-8333-333333333333',
        'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
        'customer',
        'Message from user B'
    );

-- Simulate a request authenticated as user A.
set local role authenticated;
set local request.jwt.claims =
    '{"sub":"aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa","role":"authenticated"}';

select results_eq(
               $$select auth_user_id from public.customer_sessions$$,
               $$values ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'::uuid)$$,
               'User A can read their own session but not user B’s'
       );

select throws_ok(
               $$
                   insert into public.customer_sessions (shop_id, auth_user_id)
    values (
      '33333333-3333-4333-8333-333333333333',
      'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'
    )
  $$,
               '42501',
               'new row violates row-level security policy for table "customer_sessions"',
               'User A cannot create a session for user B'
       );

select results_eq(
               $$select id from public.conversations$$,
               $$values ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'::uuid)$$,
               'User A can read their own conversation but not user B’s'
       );

select results_eq(
               $$select content from public.messages$$,
               $$values ('Message from user A'::text)$$,
               'User A can read their own messages but not user B’s'
       );

select throws_ok(
               $$
                   insert into public.messages (
      shop_id,
      conversation_id,
      sender,
      content
    )
    values (
      '33333333-3333-4333-8333-333333333333',
      'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      'assistant',
      'This is a forged assistant reply'
    )
  $$,
               '42501',
               'new row violates row-level security policy for table "messages"',
               'A customer cannot insert an assistant message'
       );

select lives_ok(
               $$
                   insert into public.messages (
      shop_id,
      conversation_id,
      sender,
      content
    )
    values (
      '33333333-3333-4333-8333-333333333333',
      'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      'customer',
      'A legitimate customer message'
    )
  $$,
               'A customer can insert a message into their own conversation'
       );

select throws_ok(
               $$
                   insert into public.messages (
      shop_id,
      conversation_id,
      sender,
      content
    )
    values (
      '33333333-3333-4333-8333-333333333333',
      'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      'customer',
      'Attempt to write into another customer’s conversation'
    )
  $$,
               '42501',
               'new row violates row-level security policy for table "messages"',
               'User A cannot insert a message into user B’s conversation'
       );

reset role;

-- Create a second shop using privileged test access.
insert into public.shops (id, slug, name)
values (
           '44444444-4444-4444-8444-444444444444',
           'second-test-shop',
           'Second Test Shop'
       );

select throws_ok(
               $$
                   insert into public.conversations (shop_id, customer_session_id)
    select
      '44444444-4444-4444-8444-444444444444'::uuid,
               id
                   from public.customer_sessions
    where shop_id = '33333333-3333-4333-8333-333333333333'
      and auth_user_id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'
  $$,
               '23503',
               'insert or update on table "conversations" violates foreign key constraint "conversations_customer_session_fk"',
               'A conversation cannot reference a customer session from another shop'
       );

select throws_ok(
               $$
                   insert into public.messages (
      shop_id,
      conversation_id,
      sender,
      content
    )
    values (
      '44444444-4444-4444-8444-444444444444',
      'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      'customer',
      'Message with a mismatched shop'
    )
  $$,
               '23503',
               'insert or update on table "messages" violates foreign key constraint "messages_conversation_fk"',
               'A message cannot reference a conversation from another shop'
       );

select * from finish();
rollback;