# CrossPay

> Bill splitting and group settlement on Base, with x402-gated settlement runs and an MCP-style tool endpoint.

![License](https://img.shields.io/badge/license-MIT-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6)
![Next.js](https://img.shields.io/badge/Next.js-16-black)

## Overview

CrossPay is a Next.js application that demonstrates a payment-gated settlement
flow for small-group bill splits on Base. Users create shared payment requests
("splits"), fetch an [x402](https://www.x402.org/) payment quote, and unlock the
settlement run by presenting payment — the run endpoint returns `402 Payment
Required` until a valid payment (or a demo approval header) is supplied. It also
exposes an MCP-compatible JSON endpoint so the same operations can be driven as
tools. This is an MVP foundation: split state is file-backed, and live x402
verification depends on an external facilitator.

## Features

- File-backed split registry: create splits, list active splits, and read
  per-split detail.
- x402 quote lookup that returns an `exact`-scheme USDC payment requirement.
- Payment-gated settlement run: unpaid `POST` returns `402 Payment Required`;
  a verified payment unlocks the run and records a receipt.
- Two payment modes (`demo` and `strict`) controlled by `CROSSPAY_PAYMENT_MODE`.
  Demo mode accepts an `x-demo-payment` header for local testing; strict mode
  requires a real `x-payment` header verified and settled through a facilitator.
- Facilitator integration that calls `/verify` then `/settle` and fails closed
  when the facilitator rejects a payment.
- Dashboard/status API (`/api/crosspay/status`) returning project data and stats.
- MCP-style endpoint (`/api/mcp/crosspay`) listing tools and running MVP tool calls.
- A status dashboard UI rendered by the App Router.
- A smoke-test script covering create, list, quote, the unpaid lock, the paid
  unlock, the receipt, and an MCP quote tool call.

## Tech stack

- **Next.js 16** (App Router) and **React 19**
- **TypeScript 5.9**
- **lucide-react** for icons
- Node built-ins (`node:fs`, `node:crypto`) for the file-backed store and payload hashing
- No database driver is wired up; state persists to a local JSON file

## Getting started

### Prerequisites

- Node.js 20+ (the project targets current Next.js / React 19)
- npm

### Installation

```bash
npm install
```

### Configuration

Copy `.env.example` to `.env.local` and set values as needed. The variables the
code reads are:

| Variable | Purpose |
| --- | --- |
| `CROSSPAY_PAYMENT_MODE` | `demo` (accepts the `x-demo-payment` header) or `strict` (requires a real `x-payment` header + facilitator). Defaults to `demo`. |
| `X402_FACILITATOR_URL` | Base URL of an x402 facilitator used for `/verify` and `/settle`. |
| `X402_RECEIVING_ADDRESS` | Payout address advertised in the payment requirement (`payTo`). |
| `CROSSPAY_X402_NETWORK` | Network identifier in the payment requirement. Defaults to `eip155:8453` (Base). |
| `CROSSPAY_DATA_FILE` | Overrides the path to the JSON data file (useful for isolated runs). |

The repo's `.env.example` also lists chain/app placeholders
(`NEXT_PUBLIC_BASE_CHAIN_ID`, `BASE_RPC_URL`, `BASE_ACCOUNT_CLIENT_ID`,
`BASE_MCP_URL`, `X402_DEFAULT_NETWORK`, `DATABASE_URL`, `REDIS_URL`,
`NEXT_PUBLIC_APP_URL`); these are scaffolding for future slices and are not all
read by the current code. Never commit real secret values.

### Running

```bash
npm run dev -- -p 3005
```

Then open `http://127.0.0.1:3005`.

Local data is written to `.data/crosspay-db.json` (or `/tmp` on Vercel).
Override the location with `CROSSPAY_DATA_FILE`.

## Usage

### HTTP API

- `GET /api/crosspay/splits` — list active splits.
- `POST /api/crosspay/splits` — create a split (`name`, `descriptor`, `detail`,
  `priceUsdc`, optional `payload`).
- `GET /api/crosspay/splits/:slug/quote` — return the x402 payment requirement.
- `POST /api/crosspay/splits/:slug/run` — execute settlement after payment
  verification; returns `402 Payment Required` until payment is supplied, then
  records a receipt and sets a `payment-response` header.
- `GET /api/crosspay/status` — dashboard data and aggregate stats.
- `GET /api/mcp/crosspay` — list MCP tools.
- `POST /api/mcp/crosspay` — run an MVP tool: discovery/listing, `get_split_quote`,
  `prepare_split_run`, and `get_crosspay_stats`.

### Demo settlement

In demo mode, unlock a run without a real payment by sending the demo header:

```bash
curl -X POST http://127.0.0.1:3005/api/crosspay/splits/<slug>/run \
  -H "content-type: application/json" \
  -H "x-demo-payment: accepted" \
  -d '{}'
```

## Testing

A smoke test exercises the full flow against a running server (default
`http://127.0.0.1:3005`, override with `CROSSPAY_BASE_URL`):

```bash
npm run dev -- -p 3005   # in one terminal
npm run test:smoke       # in another
```

It also has a type-check target:

```bash
npm run typecheck
```

## Project structure

```
app/
  api/
    crosspay/
      splits/route.ts              # list + create splits
      splits/[slug]/quote/route.ts # x402 quote
      splits/[slug]/run/route.ts   # payment-gated settlement run
      status/route.ts              # dashboard data + stats
    mcp/crosspay/route.ts          # MCP tool list + tool calls
  page.tsx, layout.tsx, globals.css
lib/
  mvp-payment.ts                   # x402 requirement + verify/settle
  mvp-store.ts                     # file-backed split + receipt store
  project-data.json, types.ts
scripts/smoke-test.mjs             # end-to-end smoke test
docs/                              # architecture, roadmap, demo script
```

## Status

MVP foundation. Splits, quotes, the payment-gated run, receipts, the status
dashboard, and the MCP endpoint are implemented. Persistence is a local JSON
file rather than a database, and demo mode unlocks runs via a header for local
testing. Real x402 settlement requires configuring an external facilitator
(`X402_FACILITATOR_URL`) and running in `strict` mode. Several `.env.example`
placeholders (RPC, account client, database/Redis URLs) are scaffolding for
planned slices and are not yet wired in. No contracts are deployed from this repo.

## License

MIT — see [LICENSE](LICENSE).
