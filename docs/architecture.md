# CrossPay Architecture

## Product Role
CrossPay lets users create group payment requests in natural language, resolve names, track approvals, and settle USDC on Base.

## System Shape
- Frontend app: Next.js, TypeScript, Tailwind, shadcn-style components, responsive dashboards.
- API layer: Node/TypeScript endpoints for product reads, prepare flows, analytics, and x402-gated access.
- Base layer: Base Account for user approval and Base MCP for assistant-driven actions.
- Payment layer: x402 for paid API/content/service access using USDC on Base or Base Sepolia.
- Data layer: PostgreSQL for durable product state and Redis for cache/session/rate-limit workloads.
- Contracts: Solidity/Foundry only where the module needs onchain state or settlement logic.

## Main Modules
- Mobile-first split creation flow with equal, custom, and percentage shares.
- Name resolution for basenames, ENS, cb.id, and direct addresses.
- Payment request contract or indexed offchain request ledger with onchain settlement.
- Participant dashboard for pending, paid, and settled splits.
- MCP tools for creating splits, checking payment status, and nudging participants.

## Data Model
- Groups, participants, shares, payment requests, and settlement state.
- Name resolution cache and verification metadata.
- Transaction references and notifications.
- User history and recurring group templates.

## MCP And x402 Pattern
Every write action should be exposed as a prepare endpoint that returns unsigned calldata or a payment request. MCP/plugin documentation must explain onboarding, read endpoints, prepare endpoints, and the mapping into Base MCP actions.

For paid resources, endpoints should return an x402 payment requirement before serving premium data. The app must enforce a user-defined max payment cap and record receipts for analytics and support.

## Safety Defaults
- Base Sepolia first, then Base mainnet.
- No private keys in app config.
- No hidden approvals or auto-execution.
- Clear user review before paid access or onchain writes.
- Placeholder env vars only in committed files.
