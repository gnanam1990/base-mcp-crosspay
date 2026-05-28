# CrossPay

AI-assisted bill splitting and group payments on Base.

**Status:** Planned sixth build as the first social payments app.

CrossPay lets users create group payment requests in natural language, resolve names, track approvals, and settle USDC on Base.

## Why It Exists
Base MCP gives AI assistants access to Base Account actions such as balances, sends, swaps, contract calls, and x402 payments, with user approval for writes. This project turns that capability into a focused product for friends, small teams, event hosts, and Base users who need simple group settlement.

## Core Capabilities
- Mobile-first split creation flow with equal, custom, and percentage shares.
- Name resolution for basenames, ENS, cb.id, and direct addresses.
- Payment request contract or indexed offchain request ledger with onchain settlement.
- Participant dashboard for pending, paid, and settled splits.
- MCP tools for creating splits, checking payment status, and nudging participants.

## Roadmap Snapshot
1. Build split creation UI and name resolution.
2. Implement request tracking and participant status pages.
3. Add USDC settlement flow with Base Account approval.
4. Create MCP tools for natural-language split requests.
5. Launch mobile demo, test groups, docs, and mainnet flow.

## Repository Status
This repository is public from day one. It starts with product, architecture, roadmap, and demo documentation. Implementation commits should stay small and use conventional commit prefixes.

## License
MIT
