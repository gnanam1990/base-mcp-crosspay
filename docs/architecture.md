# CrossPay Architecture

## Product Role
Create shared payment requests, resolve human-readable names, track who paid, and settle small-group balances with Base Account approval.

## Current Foundation
- Next.js App Router dashboard with the shared Base industrial-neon UI system.
- File-backed split state in `.data/crosspay-db.json`, seeded from the MVP records.
- Product status endpoint: `GET /api/crosspay/status`.
- Splits endpoints for listing, creating, quoting, and paid execution.
- MCP JSON endpoint backed by live local state.

## Modules
- `lib/mvp-store.ts` owns records, stats, local persistence, and receipts.
- `lib/mvp-payment.ts` prepares x402 payment requirements and verifies demo or facilitator-backed payments.
- `app/api/crosspay/splits` exposes creation and listing.
- `app/api/crosspay/splits/[slug]/quote` returns a payment requirement.
- `app/api/crosspay/splits/[slug]/run` blocks unpaid access with `402 Payment Required`, records paid runs, and emits `payment-response`.
- `app/api/mcp/crosspay` maps agent tools to discovery, quotes, prepared runs, and stats.

## Base Pattern
- Base Account is the primary wallet and approval surface.
- Read actions should stay free where possible.
- Paid or premium calls should use x402 with explicit max-payment controls.
- Write actions should return prepared calls and wait for user approval.

## Payment Modes
- `demo` mode accepts `x-demo-payment: accepted` so the local demo can show the full paid loop without live funds.
- `strict` mode requires `x-payment` plus `X402_FACILITATOR_URL`; the app calls `/verify` and `/settle` before releasing paid results.
- Receipts store item, amount, network, payment hash, facilitator reference, and timestamp for auditability.

## Safety Defaults
- Base mainnet by default; use Base mainnet only for rehearsals.
- No private keys in committed files.
- No hidden approvals or automatic writes.
- Keep public demo values small and auditable.
