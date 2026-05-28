# CrossPay

AI-assisted bill splitting and group settlement on Base.

**Status:** Payments MVP foundation

Create shared payment requests, resolve human-readable names, track who paid, and settle small-group balances with Base Account approval.

## Current MVP
- Base industrial-neon UI theme from the shared suite prompt.
- Responsive dashboard with wallet/action controls, live split metrics, workflow, MCP tools, and record surface.
- File-backed split registry with creation, x402 quote lookup, paid settlement execution, and receipt recording.
- Demo x402 flow that returns `402 Payment Required` until a payment header or demo payment approval is provided.
- Product status API at `/api/crosspay/status`.
- MCP-compatible JSON endpoint at `/api/mcp/crosspay`.
- Smoke checks for creation, listing, quote, unpaid lock, paid unlock, receipt, and MCP quote.

## API Surface
- `GET /api/crosspay/splits` lists active splits.
- `POST /api/crosspay/splits` creates a split.
- `GET /api/crosspay/splits/:slug/quote` returns the x402 payment requirement.
- `POST /api/crosspay/splits/:slug/run` executes the paid settlement after payment verification and records a receipt.
- `GET /api/crosspay/status` returns dashboard data and stats.
- `GET /api/mcp/crosspay` lists MCP tools.
- `POST /api/mcp/crosspay` runs MVP tools for discovery, quote preparation, and stats.

## Local Development
```bash
npm install
npm run dev -- -p 3005
```

Open `http://127.0.0.1:3005`.

Local data is written to `.data/crosspay-db.json`. Override it with `CROSSPAY_DATA_FILE` for isolated runs.

## Environment
Copy `.env.example` to `.env.local` when you need custom payment behavior.

- `CROSSPAY_PAYMENT_MODE=demo` accepts the `x-demo-payment: accepted` header for local demos.
- `CROSSPAY_PAYMENT_MODE=strict` requires a real `x-payment` header and facilitator configuration.
- `X402_FACILITATOR_URL` points to a facilitator that can verify and settle x402 payments.
- `X402_RECEIVING_ADDRESS` sets the payout address for paid runs.

## Checks
```bash
npm run typecheck
npm run build
npm run test:smoke
```

## Next Build Slice
Add participant resolution, prepared USDC settlement calls, and payment reminder state.

## License
MIT
