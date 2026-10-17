# Attire Assist

A customer assistance project for clothing rental shops, designed to
integrate with Attire Rentz through a website and, later, WhatsApp.

## Current status

The website demo includes fictional shop cards, suggested questions,
and a working mock chat flow.

Customers receive answers from the selected shop's fictional FAQs.
Replies are clearly labelled as demo responses and do not call live AI.

FAQ matching ignores capitalization and extra whitespace but requires
the same wording and punctuation. Unknown questions receive a fallback
directing the customer to staff. No staff notification is sent.

Customers sign in anonymously through Supabase before sending messages.
No email or password is required. The chat API verifies the customer's
identity and rejects unauthenticated requests with HTTP 401.

The chat shows loading and error feedback and allows retrying failed
requests. Messages remain in browser memory and are cleared when the
panel closes or the page reloads.

Database migrations, access policies, seed data, and database tests are
included. Saving chat conversations and messages to the database is not
connected yet.

Live AI, staff handover, WhatsApp, and the real Attire Rentz integration
are not connected yet. Rate limiting and additional production
safeguards are not implemented.

## Requirements

- Node.js 24 with npm
- Git
- Docker Desktop running Linux containers, for local Supabase

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

Start Docker Desktop, then start local Supabase:

```powershell
npx supabase start
```

The first startup downloads the required container images and may take
several minutes.

Configure `.env.local` using the instructions in the next section.
Then start the development server:

```powershell
npm run dev
```

Open [Attire Assist](http://localhost:3000), or the address printed in
the terminal.

Keep both local Supabase and the development server running while using
the chat. Press Ctrl+C in the development server terminal to stop Next.js.

To check local Supabase:

```powershell
npx supabase status
```

To stop local Supabase when you finish:

```powershell
npx supabase stop
```

See [Local database setup](docs/local-database.md) for more details.

## Environment configuration

To create your local settings file on a new checkout, run:

```powershell
Copy-Item .env.example .env.local
```

Skip this command if you already have a `.env.local` file.

Configure these values:

```dotenv
AI_MODE=mock
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=replace-with-your-local-publishable-key
```

Run `npx supabase status` to find your local Project URL and publishable
key. Replace the placeholder with the publishable key, not the secret key.

If `AI_MODE` is missing, the configuration defaults to mock mode.
Unsupported values cause a configuration error when the configuration
module is loaded.

The application currently provides mock replies only. No AI API key
is required.

Variables beginning with `NEXT_PUBLIC_` are available to browser code.
The Supabase publishable key is intended for this use. Secret keys and
other privileged credentials must never be placed in these variables.

`.env.example` is committed as a safe configuration template.
`.env.local` is ignored by Git and must not be committed.

Restart the development server after changing environment settings.

## Try the mock chat

1. Ensure local Supabase and the development server are running.
2. Open the homepage.
3. Click Ask assistant on a fictional shop card.
4. Click a suggested question to fill the input, or type your own message.
5. Press Enter or click Send.
6. Check that the demo reply refers to the selected shop.

Suggestions come from the selected shop's FAQs. Clicking a suggestion
fills the input without sending automatically. Suggestions are disabled
while a reply is pending.

Try these questions in both shops:

- Do you offer fittings?
- Do you offer delivery?

Each shop has different fictional answers. Matching ignores capitalization
and extra whitespace, but wording and punctuation must otherwise match.

Try "Do you offer free fittings?" to see the unknown-question fallback.
The demo does not guess an answer or create a staff handover.

If a request fails, the chat displays an error and keeps the draft.
Check that Supabase is running, then click Send again once connectivity
is restored.

Messages are not stored in the database. Closing the panel or reloading
the page clears its history.

## Anonymous authentication

Before sending a message, the browser reuses an existing Supabase session
or signs in anonymously.

The server checks the visitor's identity using Supabase before generating
a chat reply. Requests without a valid sign-in receive HTTP 401.

An anonymous user has a unique ID but does not need an email or password.
A new user is not created for every message.

Authentication identifies the visitor. Shop and customer access rules
must also be enforced when conversation storage is connected.

## Project checks

Run these commands one at a time:

```powershell
npm run lint
npm run typecheck
npm test
npm run build
```

- `lint` checks for code-quality issues.
- `typecheck` generates Next.js types and checks TypeScript.
- `test` runs automated application tests.
- `build` creates a production build.

Application tests cover configuration, mock adapters, FAQ matching,
mock replies, conversation logic, and the chat endpoint, including
requests without a signed-in user.

The chat endpoint tests simulate Supabase authentication. They do not
require a running Supabase instance or verify the real sign-in service.

With local Supabase running, run the database tests:

```powershell
npm run test:db
```

Database tests check selected access-control rules and relationship
constraints. They are separate from the application tests.

GitHub Actions runs application and database checks on pushes and
pull requests targeting main.

Browser sign-in, chat interactions, and network-failure retry behavior
are checked manually. Automated browser tests are not included yet.

## Project structure

- `src/app`: pages, layouts, and backend endpoints.
- `src/components`: reusable interface components.
- `src/types`: shared TypeScript definitions.
- `src/data`: fictional shop and FAQ data.
- `src/integrations/attire-rentz`: adapter interfaces and mock implementations.
- `src/ai`: fixed mock reply generation.
- `src/services`: conversation coordination and FAQ matching.
- `src/config`: server configuration and validation.
- `src/lib/supabase`: browser and server clients and anonymous sign-in helper.
- `supabase`: local configuration, migrations, seed data, and database tests.
- `docs`: project documentation.

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
- [Local database setup](docs/local-database.md)
- [Conversation storage plan](docs/conversation-storage.md)
- [Dependency security notes](docs/dependency-security.md)

## Repository hygiene

Do not commit secret credentials, customer data, `.env.local`,
`node_modules`, build output, or local IDE settings.

Keep secret API keys and privileged credentials on the server.
The Supabase publishable key is intended for browser use and does not
replace authentication or database access policies.

`next-env.d.ts` is generated by Next.js and is intentionally ignored.