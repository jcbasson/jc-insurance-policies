# Insurance Policies API (json-server)

Mock API for insurance policies data.

## Setup

```bash
cd api
npm install
```

## Run

```bash
npm start
```

Server runs at `http://localhost:3001` (override with `PORT` env var).

## Endpoints

| Method | Path | Response |
|--------|------|----------|
| GET | `/v1/policies` | `{ "policies": [...] }` |
| GET | `/v1/policies/:policyNumber` | Single policy object |
