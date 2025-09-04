# Plan: Site and Page components

## Goals
- Formalize Props, defaults, and merging semantics.
- Ensure progressive enhancement and SEO/social correctness.

## Deliverables
- Types: `Props` with explicit override/append semantics for title, description, etc.
- Implementation: server-rendered `<head>` and resource tags; no JS requirement.
- Tests: HTML head snapshots; axe checks; E2E meta presence.
- Docs: usage patterns and examples for common overrides.

## Steps
1. Define `Props` types and defaults; document merging (title separator, append rules).
2. Implement canonical, robots, OpenGraph, Twitter/X tags; add optional hreflang.
3. Add CSP/referrer/permissions guidance (server-level); keep client code clean.
4. Create examples under docs showing `sites/` wrappers and page overrides.
