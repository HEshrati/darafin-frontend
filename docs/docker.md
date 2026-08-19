# Docker — Frontend (Darafin)

How to run the Next.js frontend with Docker alongside the Django/DRF backend.

## Prerequisites

- Docker & Docker Compose
- Node 20 (see `.nvmrc`) for local non-Docker development

## Environment variables

Copy the template and adjust values:

```bash
cp .env.example .env
```

| Variable | Build or runtime | Used by | Description |
|----------|------------------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | **Build** | Browser, client components | API URL reachable from the user's machine (e.g. `http://localhost:8000/api/v1`) |
| `NEXT_PUBLIC_APP_URL` | **Build** | Auth redirects, absolute links | Frontend origin (e.g. `http://localhost:3000`) |
| `API_URL` | Runtime | Server Components, Auth.js, route handlers | Internal Docker URL (e.g. `http://backend:8000/api/v1`) |
| `AUTH_SECRET` | Runtime | Auth.js | `openssl rand -hex 32` — required in production |
| `AUTH_URL` | Runtime | Auth.js | Same as `NEXT_PUBLIC_APP_URL` in most setups |
| `PORT` | Runtime | `next start` | Default `3000` |

### Browser vs server API URLs

- **Client-side** requests cannot use Docker service names (`backend`). Use `NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1`.
- **Server-side** requests inside Compose should use `API_URL=http://backend:8000/api/v1`.

Code access:

- Client: `apiClient` from `@/lib/api` (uses `NEXT_PUBLIC_API_URL`)
- Server: `createServerApiClient()` from `@/lib/api` (uses `API_URL`)

## Frontend-only (development)

Build and run the dev container with hot reload:

```bash
docker build -f Dockerfile.dev -t darafin-frontend-dev .
docker run --rm -p 3000:3000 \
  --env-file .env \
  -v "$(pwd):/app" \
  -v /app/node_modules \
  darafin-frontend-dev
```

On Windows (Git Bash), use `%cd%` or `${PWD}` as appropriate for volume mounts.

## Production image

Pass public env vars as build arguments:

```bash
docker build -t darafin-frontend \
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1 \
  --build-arg NEXT_PUBLIC_APP_URL=http://localhost:3000 \
  .

docker run --rm -p 3000:3000 \
  -e API_URL=http://backend:8000/api/v1 \
  -e AUTH_SECRET=your-secret \
  -e AUTH_URL=http://localhost:3000 \
  darafin-frontend
```

Health check: `GET http://localhost:3000/api/health`

## Full stack (example for backend team)

Add to the root `docker-compose.yml`:

```yaml
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      CORS_ALLOWED_ORIGINS: http://localhost:3000
      CSRF_TRUSTED_ORIGINS: http://localhost:3000
      ALLOWED_HOSTS: localhost,backend,127.0.0.1
    depends_on:
      - db

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:8000/api/v1
      NEXT_PUBLIC_APP_URL: http://localhost:3000
      API_URL: http://backend:8000/api/v1
      AUTH_SECRET: dev-secret-change-me
      AUTH_URL: http://localhost:3000
    depends_on:
      - backend
```

Adjust paths (`./frontend`, `./backend`) to match your monorepo layout.

## Backend coordination checklist

Ensure Django settings include:

- `CORS_ALLOWED_ORIGINS` — frontend origin
- `CSRF_TRUSTED_ORIGINS` — if using cookie-based auth
- JWT login/token endpoints documented for Auth.js integration
- OpenAPI schema URL for codegen (e.g. `/api/schema/`)

## Local development (without Docker)

```bash
yarn install
cp .env.example .env
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).
