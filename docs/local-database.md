# Local Database Development

## Requirements

- Docker Desktop running with its Linux engine.
- Project dependencies installed using npm ci.

Run the commands below from the project root.

## Start Supabase

```powershell
npx supabase start
```

The first startup downloads Docker images and may take several minutes.

Open the Studio URL printed by the command to inspect the database.
With the current configuration, it is http://127.0.0.1:54323.

Keep local services on a trusted network. Do not publish their credentials.

## Database structure

Versioned SQL migrations are stored in supabase/migrations.

The current tables are:
- shops
- customer_sessions
- conversations
- messages

Row-level security restricts customer access. Composite foreign keys
prevent conversations and messages from referencing another shop's records.

supabase/seed.sql contains two fictional shops.

## Run database tests

With local Supabase running:

```powershell
npm run test:db
```

These tests exercise database permissions, customer isolation,
message-writing restrictions, and cross-shop relationship constraints.

The tests roll back their temporary records when finished.

Application tests run separately:

```powershell
npm test
```

## Rebuild the local database

```powershell
npx supabase db reset --local
```

This deletes local database records, reapplies migrations, and loads
the seed file. Only run it when local data can be discarded.

## Stop Supabase

```powershell
npx supabase stop
```

This stops the local services while preserving data for the next start.

## Automated checks

GitHub Actions has a separate database-checks job that starts a temporary
Supabase environment and runs the database tests.

The workflow does not connect to a hosted database.

## Current limitations

The application still uses mock data and in-memory chat history.
It does not save messages to these tables yet.

Customer authentication and staff access are not connected to the app.
Conversation updated_at values are not automatically refreshed yet.
Retention and deletion behavior must be implemented before real use.