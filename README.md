# CrossPay

AI-assisted bill splitting and group settlement on Base.

**Status:** Payments MVP foundation

Create shared payment requests, resolve human-readable names, track who paid, and settle small-group balances with Base Account approval.

## Current MVP
- Base industrial-neon UI theme from the shared suite prompt.
- Responsive dashboard with wallet/action controls, metrics, workflow, MCP tools, and live record surface.
- Product status API at `/api/crosspay/status`.
- Smoke checks for required dashboard data.

## Local Development
```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3000`.

## Checks
```bash
npm run typecheck
npm run build
npm run test:smoke
```

## Next Build Slice
Wire the mocked dashboard data into real Base Sepolia reads, x402 payment verification, or contract prepare endpoints depending on this product's launch path.

## License
MIT
