# Attire Assist — Architecture

## Current application

The project is one independently deployable Next.js application.

- src/app contains pages, layouts, and future backend endpoints.
- src/components contains reusable user interface components.
- docs contains project documentation.

The current shop cards use fictional data and show placeholder messages.

## Planned conversation flow

Website widget or WhatsApp
→ Channel adapter
→ Shared conversation service
→ Shop information, AI, or staff handover
→ Reply through the original channel

## Responsibilities

### Channel adapters

Translate website and WhatsApp messages into a shared input format.
They also handle channel-specific validation and response delivery.

### Conversation service

Coordinates each conversation and decides whether automation can reply.
It checks whether staff are handling the conversation before calling AI.

Both channels use this service so their business rules stay consistent.

### Business rules

Handle exact decisions such as opening hours, special closures,
and dates in the shop's timezone.

These calculations belong in code rather than being guessed by AI.

### AI adapter

Connects to Gemini on the server.
Receives only the current shop's relevant information.

A clearly labelled mock mode will support development without credentials.

### Database access

Stores assistant-owned information in Supabase, including conversations,
messages, staff memberships, and handover requests.

Tenant-owned records include shop_id. Database policies and server-side
authorization enforce shop isolation.

### Attire Rentz adapter

Provides a consistent interface for reading rental-system information.

We will begin with fictional data and later replace the mock adapter
with an authenticated API adapter.

## Security boundaries

- API keys and privileged database credentials stay on the server.
- Public widget identifiers are not authentication.
- The server validates shop configuration and customer sessions.
- Staff can access only shops they are authorized to manage.
- Background jobs must enforce the same shop isolation.
- Website and WhatsApp customer identities remain separate unless verified.

## Implementation approach

Keep the first version in one application.
Separate responsibilities in code without creating multiple services.

The backend components described here are planned, not implemented yet.