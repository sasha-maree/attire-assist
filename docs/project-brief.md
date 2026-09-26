# Attire Assist — Project Brief

## Purpose

Attire Assist helps clothing rental customers get shop information
and contact staff. It is an addition to Attire Rentz, not a separate
subscription business.

## Users

- Customers who need information about a rental shop.
- Shop staff who manage information and respond to inquiries.

## Planned channels

- An embeddable website chat widget.
- A WhatsApp bot using the official WhatsApp Business Platform.

Both channels will use the same backend conversation service.

## Core requirements

- Keep each shop's data and conversations isolated.
- Answer using information belonging to the current shop.
- Identify the assistant as automated.
- Never invent prices, policies, availability, or completed actions.
- Use the shop's timezone for opening hours and date calculations.
- Hand conversations to staff when requested or when information is missing.
- Pause automated replies while staff handle a conversation.

## Integration boundaries

Attire Rentz remains the source of truth for its products, prices,
bookings, and availability.

We will start with fictional data behind a replaceable mock adapter.
A real integration requires an agreed, authenticated API contract.

The first integration will only read rental and booking information.

## Out of scope for the first version

- Subscription billing.
- Payments.
- Creating or changing bookings.
- Model training.
- Automatically linking website visitors to WhatsApp identities.

## Current progress

- Next.js application with TypeScript and Tailwind CSS.
- Reusable fictional shop cards.
- Independent show/hide assistant placeholders.
- Automated lint, TypeScript, and production build checks.

There is no working AI, database, staff handover, WhatsApp,
or Attire Rentz integration yet.