# Darafin Frontend

Next.js App Router frontend for the Darafin pharmaceutical supply chain financing platform. Integrates with a Django/DRF backend.

## Stack

Next.js · Ant Design · Auth.js · TanStack Query · React Hook Form + Zod · Ky

See [docs/adr/0001-frontend-stack.md](docs/adr/0001-frontend-stack.md) for architecture decisions.

## Getting started (local)

```bash
yarn install
cp .env.example .env
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

See [.env.example](.env.example) for the full list. Minimum for local dev:

| Variable | Example |
|----------|---------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000/api/v1` |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` |

Server-only vars (`API_URL`, `AUTH_SECRET`, `AUTH_URL`) are required once Auth.js and server-side API calls are wired.

## Docker

See [docs/docker.md](docs/docker.md) for:

- Development and production Dockerfiles
- Environment variable contract (browser vs server URLs)
- Example `docker-compose` service for the backend team
- Health check endpoint: `/api/health`

Quick dev container:

```bash
docker build -f Dockerfile.dev -t darafin-frontend-dev .
docker run --rm -p 3000:3000 --env-file .env -v "$(pwd):/app" -v /app/node_modules darafin-frontend-dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start dev server |
| `yarn build` | Production build (standalone output for Docker) |
| `yarn start` | Run production server |
| `yarn lint` | ESLint |

## Project structure

```
src/
├── app/           # Routes (thin pages)
├── features/      # Domain modules (auth, …)
├── components/    # Shared UI
├── lib/           # api/, env/, theme/, constants/
└── assets/        # Bundled static files (fonts, …)
```

Public static files: `public/images/…` — register paths in `src/lib/constants/assets.ts`.

## API client

- **Client components:** `import { apiClient } from "@/lib/api"`
- **Server code:** `import { createServerApiClient } from "@/lib/api"`

Env validation: `@/lib/env` (`getPublicEnv`, `getServerEnv`).
