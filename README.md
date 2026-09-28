# Attire Assist

A website and WhatsApp assistant for clothing rental shops,
designed to integrate with Attire Rentz.

## Current status

A demo with fictional shop cards and a working mock chat flow.

Customers can send messages to a backend endpoint and receive answers
from the selected shop's fictional FAQs. Replies are clearly labelled
as mock and do not call live AI.

Matching ignores capitalization and extra whitespace but requires the
same wording and punctuation. Unknown questions receive an honest
fallback directing the customer to staff. No staff notification is sent.

The chat shows loading and error feedback and allows retrying failed
requests. History is held in browser memory and resets when the panel
closes or the page reloads.

Live AI, database persistence, staff handover, WhatsApp, and the real
Attire Rentz integration are not connected yet.

The chat endpoint is a local demo using public fictional data.
Customer authentication, rate limiting, and production safeguards
are not implemented yet.

## Requirements

- Node.js 24 with npm
- Git

The project can be developed using IntelliJ IDEA and PowerShell on Windows.

## Local setup

Clone the repository if you do not already have it:

```powershell
git clone https://github.com/sasha-maree/attire-assist.git
cd attire-assist
```

Install the dependency versions recorded in package-lock.json:

```powershell
npm ci
```

Configure your environment as described below, then start the development
server:

```powershell
npm run dev
```

Open http://localhost:3000, or the address printed in the terminal.

Keep the server running while developing. Press Ctrl+C to stop it.

## Environment configuration

To create your local settings file on a new checkout, run:

```powershell
Copy-Item .env.example .env.local
```

Skip this command if you already have a .env.local file.

The currently supported setting is:

```dotenv
AI_MODE=mock
```

If AI_MODE is missing, the configuration defaults to mock mode.
Unsupported values cause a configuration error when the configuration
module is loaded.

The application currently provides fixed mock replies only.
No API key is required.

.env.example is committed as a safe configuration template.
.env.local is ignored by Git and must not be committed.

Restart the development server after changing environment settings.

## Try the mock chat

1. Open the homepage while the development server is running.
2. Click Ask assistant on a fictional shop card.
3. Type a message and press Enter or click Send.
4. Check that the demo reply refers to the selected shop.

Try these questions in both shops:

- Do you offer fittings?
- Do you offer delivery?

Each shop has different fictional answers. Matching ignores capitalization
and extra whitespace, but wording and punctuation must otherwise match.

Try "Do you offer free fittings?" to see the unknown-question fallback.
The demo does not guess an answer or create a staff handover.

If a request fails, the chat displays an error and keeps the draft.
Click Send again to retry once connectivity is restored.

Messages are not stored in a database. Closing the panel or reloading
the page clears its history.

## Project checks

Run these commands one at a time:

```powershell
npm run lint
npm run typecheck
npm test
npm run build
```

- lint checks for code-quality issues.
- typecheck generates Next.js types and checks TypeScript.
- test runs automated tests for configuration, the mock adapter, FAQ matching,
  mock replies, the conversation service, and the chat endpoint.
- build creates a production build.

GitHub Actions runs checks on every push and on pull requests targeting main.

The automated tests cover backend behavior, including invalid requests,
unknown shops, and successful mock replies. They do not prove
database-level tenant isolation.

Chat interface interactions and network-failure retry behavior are checked
manually; there are no automated browser tests yet.

## Project structure

- src/app: pages, layouts, and backend endpoints.
- src/components: reusable interface components.
- src/types: shared TypeScript definitions.
- src/data: fictional shop data.
- src/integrations/attire-rentz: shop adapter interface and mock implementation.
- src/ai: fixed mock reply generation.
- src/services: conversation coordination.
- src/config: server configuration and validation.
- docs: project documentation.

## Git workflow

1. Start a focused feature branch from an up-to-date main.
2. Make a small, meaningful change.
3. Run the relevant checks.
4. Review and stage the changes.
5. Commit and push the feature branch.
6. Open and review a pull request.
7. Merge after the checks pass.
8. Update your local main.

## Documentation

- [Project brief](docs/project-brief.md)
- [Architecture](docs/architecture.md)

## Repository hygiene

Do not commit credentials, customer data, node_modules, build output,
or local IDE settings.

Keep API keys and privileged credentials on the server.

next-env.d.ts is generated by Next.js and is intentionally ignored.