## Suggestions and notes — Distributed

- Adapters
  - Keep adapters read-only and outside the core runtime; use explicit capability gates when integrated.
- SPARQL
  - Normalize rows to a simple, typed shape; document cardinality/latency expectations; cache conservatively.
- Security
  - Never embed credentials; use per-app secrets and deny-by-default policies.
