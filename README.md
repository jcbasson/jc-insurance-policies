# JC's Insurance Policies

Travel insurance policies UI built with React Router, TanStack Query, and a json-server mock API.

## Prerequisites

- [Node.js](https://nodejs.org/) 20+ (22 recommended)
- npm 10+

## One-time setup

From the project root:

```bash
npm install
```

Install API dependencies:

```bash
npm install --prefix api
```

Environment variables: `npm install` creates `.env` from `.env.example` if you do not have one yet. The app uses `VITE_BASE_URL` to reach the mock API:

```env
VITE_BASE_URL=http://localhost:3001/v1/
```

To create or reset it manually:

```bash
cp .env.example .env
```

---

## Running locally

Use **two terminals** when developing against the mock API: one for the API, one for the app.

### Step 1 — Start the mock API

**Terminal 1:**

```bash
npm run api
```

The API listens at `http://localhost:3001`.

| Method | Endpoint                     | Response                |
| ------ | ---------------------------- | ----------------------- |
| GET    | `/v1/policies`               | `{ "policies": [...] }` |
| GET    | `/v1/policies/:policyNumber` | Single policy           |

To use a different port:

```bash
PORT=3002 npm run api
```

Update `VITE_BASE_URL` in `.env` to match (e.g. `http://localhost:3002/v1/`).

### Step 2 — Start the app

**Terminal 2:**

```bash
npm run dev
```

Open [http://localhost:5173/policies](http://localhost:5173/policies) in your browser.

The dev server binds to `127.0.0.1:5173` (see `vite.config.ts`).

### Step 3 — Verify

With both processes running, the policies page should load data from the mock API. If you see errors, confirm:

1. The API terminal is still running.
2. `.env` contains `VITE_BASE_URL=http://localhost:3001/v1/`.
3. Restart `npm run dev` after changing `.env`.

---

## Unit tests (Vitest)

Unit tests do **not** require the API or dev server.

```bash
npm test
```

Watch mode while developing:

```bash
npm run test:watch
```

Run a single file:

```bash
npm test -- app/components/policies/tests/mapPoliciesToCardProps.test.ts
```

---

## Cypress tests

### Component tests

Component tests mount React components in isolation. They do **not** need the API or `npm run dev`.

**Interactive (Cypress App):**

```bash
npm run cy:open
```

Choose **Component Testing**, then pick a spec (for example `Pagination.cy.tsx`, `Policies.cy.tsx`).

**Headless:**

```bash
npm run cy:run -- --component
```

### End-to-end tests

E2E tests visit the real app in the browser. The policies page specs **mock the API** with `cy.intercept`, so the json-server does not need to be running—but **the dev server must be running**.

**Terminal 1 — app:**

```bash
npm run dev
```

**Terminal 2 — Cypress:**

Interactive:

```bash
npm run cy:open
```

Choose **E2E Testing**, then run `policiesPage.spec.cy.ts`.

Headless:

```bash
npm run cy:run:e2e
```

E2E `baseUrl` is `http://127.0.0.1:5173` (configured in `cypress.config.ts`). Use that host if you open the app manually while debugging tests.

---

## Quick reference

| Task             | Command                    | Notes                  |
| ---------------- | -------------------------- | ---------------------- |
| Install (root)   | `npm install`              |                        |
| Install (API)    | `npm install --prefix api` | Once                   |
| Mock API         | `npm run api`              | Port 3001              |
| App (dev)        | `npm run dev`              | Port 5173              |
| Unit tests       | `npm test`                 | Vitest                 |
| Cypress UI       | `npm run cy:open`          | Component or E2E       |
| Cypress E2E (CI) | `npm run cy:run:e2e`       | Requires `npm run dev` |
| Typecheck        | `npm run typecheck`        |                        |
| Production build | `npm run build`            |                        |

---

## Building for production

```bash
npm run build
npm start
```

## Deployment

### Docker

```bash
docker build -t jc-insurance-policies .
docker run -p 3000:3000 jc-insurance-policies
```

### DIY

Deploy the output of `npm run build`:

```
├── build/
│   ├── client/
│   └── server/
```

---

Built with React Router, TanStack Query, Tailwind CSS, Vitest, and Cypress.

## Extra Notes

- I wasn't sure what was meant about not mocking hrefs and click handlers for the links and buttons so I left them out.

- If I had more time I would have done more like adding error handling that redirects to a splash screen if a request failed.

- I am new to tailwind so I am sure my tailwind usage can be optimized.
