## Distributed — overview

Purpose

- Provide adapters and guidance for distributed and hybrid data (RDF/SPARQL, IPFS/S3-like object stores) that align with SSR-first, progressive enhancement.

Scope

- Read adapters: SSR-safe SPARQL queries; normalized results; caching policy.
- Write adapters (guarded): capability-gated, explicit user intent; never default in server context.
- Artifacts: generate SHACL/OWL from Vault IR for validation and semantics.

Boundaries

- Authoring (Components/Engine) remains unchanged; Distributed supplies data through injectors/adapters.
- Security and capability checks enforced at app boundaries; no credentials embedded.
