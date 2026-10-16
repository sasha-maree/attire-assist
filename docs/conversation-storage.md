# Conversation Storage Plan

## Purpose

Save conversations and messages so customers can return to their chat
and authorized staff can handle inquiries.

Browser memory is temporary. Supabase PostgreSQL will provide
persistent storage.

## Initial records

### Shops

Assistant-owned shop records with stable identifiers.
A mapping will connect them to Attire Rentz shops later.

### Customer sessions

Identify a website visitor's conversation access within one shop.

A session credential must be securely generated and verified by the
server. A public shop ID does not grant access to conversations.

### Conversations

Each conversation belongs to one shop and one customer session.

Store:
- Conversation ID.
- Shop ID.
- Customer session ID.
- Channel, initially website.
- Status: automated, staff handling, or resolved.
- Creation and update timestamps.

### Messages

Each message belongs to a conversation and the same shop.

Store:
- Message ID.
- Shop ID.
- Conversation ID.
- Sender: customer, assistant, or staff.
- Message text.
- Creation timestamp.

## Access rules

- Customers can access only conversations belonging to their verified session.
- Staff can access only shops where they have an authorized membership.
- The server must verify access before reading or writing messages.
- Database constraints must prevent relationships between different shops.
- Row-level security will restrict database access.
- Privileged server credentials must never reach the browser.

## Boundaries

These tables belong to Attire Assist.
We will not modify Attire Rentz tables.

Website sessions will not automatically link to WhatsApp identities.

Retention and deletion rules must be defined before storing real
customer conversations.

## Current status

The local Supabase database now has shops, customer sessions,
conversations, and messages tables.

Seven migrations define the tables and initial customer access policies.
The seed file adds two fictional shops.

Ten database tests pass locally. They cover customer access restrictions,
message writing permissions, and cross-shop relationship constraints.

GitHub Actions is configured to run database tests in a temporary
Supabase environment. This new workflow job has not been verified
on GitHub yet.

The application is not connected to these tables yet.
Chat history still lives only in browser memory.

Staff access, automatic updated_at handling, and retention/deletion
behavior remain to be implemented.