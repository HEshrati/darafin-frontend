# ADR-001: Frontend Stack Choice

## Status

**Accepted** — 2026-08-18

## Context

Darafin is a B2B fintech platform for pharmaceutical supply chain financing. The frontend must support:

- Data-heavy admin UI (tables, filters, approvals, dashboards)
- Multi-tenant organizations with role-based access control (RBAC)
- Persian (RTL) UI with Jalali dates and IRR formatting
- Integration with a Django/DRF backend (JWT auth, OpenAPI, MinIO documents)
- A **one-month MVP deadline** with a small team under delivery pressure

The team evaluated multiple libraries per layer and needs a single documented decision so future contributors do not re-litigate choices mid-sprint.

### Constraints

- Prefer libraries the team already knows to maximize velocity
- Minimize the number of dependencies and abstractions
- Must work with **Next.js App Router**, **React 19**, and **TypeScript strict mode**
- UI strings in Persian; code and comments in English

## Decision

| Layer | Choice |
|-------|--------|
| Framework | **Next.js** (App Router) + **TypeScript** |
| Authentication | **Auth.js** (NextAuth v5) with Credentials provider + DRF JWT |
| UI / Design system | **Ant Design v5** (`antd`) + `@ant-design/icons` |
| Client state (UI only) | **Zustand** |
| Server / cache state | **TanStack Query v5** |
| Forms & validation | **React Hook Form** + **Zod** |
| HTTP client | **Ky** |
| Tables | **Ant Design Table** (server-side pagination/filter/sort) |
| Real-time (MVP) | **Pusher**; SSE + Redis evaluated for a later phase |
| API types | **OpenAPI codegen** from backend `drf-spectacular` schema |

### State boundaries

- **TanStack Query** — all API data, caching, mutations, optimistic updates
- **Zustand** — UI-only state (sidebar, modals, wizard steps, active organization selection)
- **React Hook Form** — form field state
- **URL** — filters and pagination where shareable/bookmarkable

## Alternatives Considered

### UI: MUI vs Ant Design

| | MUI | Ant Design v5 |
|---|-----|---------------|
| B2B admin / data tables | Good | **Excellent** (built-in Table, Form, Modal) |
| Team prior experience | Yes | Yes (2-day evaluation favored Ant Design for this project) |
| RTL / Persian | Supported | **ConfigProvider** + `fa_IR` locale |
| MVP speed | Moderate | **Faster** for table-heavy fintech UI |

**Rejected:** MUI, react-bootstrap, shadcn/ui (would require building admin primitives from scratch).

### State: Redux vs Zustand

Redux adds boilerplate disproportionate to this project's UI-state needs. Server data belongs in TanStack Query, not a global store.

**Rejected:** Redux, RTK Query (server state covered by TanStack Query).

### Forms: Formik + Yup vs React Hook Form + Zod

RHF has fewer re-renders. Zod is TypeScript-native and integrates with `z.infer<>` for shared types.

**Rejected:** Formik + Yup.

### HTTP: axios vs Ky

Ky throws on non-2xx by default, has built-in retry, and is smaller. Wrap once in `lib/api/client.ts`.

**Rejected:** axios, undecorated `fetch` in every call site.

### Tables: TanStack Table / AG Grid vs Ant Design Table

Ant Design Table is already included with the UI kit; server-side pagination integrates with backend list APIs without a second table library.

**Rejected:** TanStack Table, AG Grid.

### Real-time: Pusher vs SSE

Pusher ships fastest for MVP notifications (~200 free connections/day). SSE + Redis (e.g. Upstash) is the planned migration path when backend pub/sub is ready.

**Deferred:** SSE-first implementation.

## React 19 + Ant Design v5 Compatibility

Ant Design v5 officially targets React 16–18. React 19 changed `react-dom` exports, which breaks some antd behaviors unless patched.

### Known issues without a patch

- Wave/ripple effects may not work
- **Static** APIs fail: `Modal.confirm`, `message.success`, `notification.open`
- Hook-based APIs (`Modal.useModal`, `App.useApp`) work when set up correctly

### Required mitigation (Day 1)

1. **Install the official compatibility patch**

   ```bash
   yarn add @ant-design/v5-patch-for-react-19
   ```

   Requires `antd >= 5.22.6`, `react >= 19`, `react-dom >= 19`.

2. **Import the patch first** in the client providers entry (before any `antd` import):

   ```tsx
   import '@ant-design/v5-patch-for-react-19';
   ```

3. **Use `@ant-design/nextjs-registry`** for SSR style extraction in Next.js App Router:

   ```bash
   yarn add @ant-design/nextjs-registry
   ```

4. **Wrap the app** in a client `Providers` component:

   ```tsx
   'use client';

   import '@ant-design/v5-patch-for-react-19';
   import { AntdRegistry } from '@ant-design/nextjs-registry';
   import { ConfigProvider, App } from 'antd';
   import faIR from 'antd/locale/fa_IR';

   export function AppProviders({ children }: { children: React.ReactNode }) {
     return (
       <AntdRegistry>
         <ConfigProvider locale={faIR} direction="rtl">
           <App>{children}</App>
         </ConfigProvider>
       </AntdRegistry>
     );
   }
   ```

5. **Prefer hook-based feedback APIs** over static methods:

   ```tsx
   // Prefer
   const { message, modal, notification } = App.useApp();

   // Avoid in React 19 (even with patch, less reliable)
   message.success('...');
   Modal.confirm({ ... });
   ```

6. **Pin compatible versions** in `package.json` and commit the lockfile. Avoid floating `^` on `antd` during MVP; bump intentionally with a smoke test.

7. **Day 1 smoke test checklist** — verify before building features on top:

   - [ ] `Button` renders with wave effect
   - [ ] `Modal` opens via `modal.confirm()` from `App.useApp()`
   - [ ] `message` / `notification` via `App.useApp()`
   - [ ] `Form` submit + validation messages
   - [ ] `Table` with pagination
   - [ ] `yarn build` passes (SSR, no style flash)
   - [ ] No console warning: `[antd: compatible] antd v5 support React is 16 ~ 18`

8. **If patch fails in dev** — try `next dev` without Turbopack (`next dev --no-turbopack` or equivalent) and clear `.next` cache. Document the outcome in ADR-002 if a workaround is required.

### Fallback (not recommended for MVP)

- Downgrade to **React 18** + Next.js 15 — last resort; loses current scaffold versions.
- `unstableSetRender` manual registration — only for UMD/micro-frontend scenarios per [antd React 19 docs](https://ant.design/docs/react/v5-for-19).

## Consequences

### Positive

- Fast delivery of B2B admin UI with mature components
- Clear separation of client UI state vs server cache state
- Aligns with team experience and the approved stack document
- OpenAPI codegen reduces API drift with Django backend

### Negative / Risks

| Risk | Mitigation |
|------|------------|
| React 19 + antd edge cases | Official patch + Day 1 smoke test + hook-based APIs |
| Auth.js + DRF JWT integration | Spike on Day 4; MSW mocks until backend is live |
| Ant Design bundle size | Route-level code splitting; import components individually |
| Patch removed in antd v6 | Track antd v6 timeline; patch is temporary by design |
| Tailwind in current scaffold | Demote to optional utilities; Ant Design is primary UI |

### Follow-up ADRs (when needed)

- **ADR-002** — Auth.js session strategy (JWT vs httpOnly cookies)
- **ADR-003** — OpenAPI codegen tool choice (orval vs openapi-typescript)
- **ADR-004** — Pusher → SSE migration

## References

- [Ant Design — React 19 compatibility](https://ant.design/docs/react/v5-for-19)
- [@ant-design/v5-patch-for-react-19](https://www.npmjs.com/package/@ant-design/v5-patch-for-react-19)
- [@ant-design/nextjs-registry](https://www.npmjs.com/package/@ant-design/nextjs-registry)
- Darafin frontend stack decision document (internal)
- Backend ADR-001: Modular Monolith (Django/DRF/PostgreSQL)
