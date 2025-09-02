# Plan priority and implementation order

This document summarizes the execution order for the plans and the rationale behind it.

## Order

1) Site and Page components
- Why: Immediate value, low risk, and foundational for docs and apps (SEO/social correctness, consistent layout).
- Key steps: Props/defaults/merge rules → head/meta generation → tests (snapshots/axe/E2E) → docs examples.
- Dependency: None.

2) Extend schema.org with OWL + SHACL (portable)
- Why: Establishes validated structured data shapes; underpins correctness of generated metadata/content.
- Key steps: Minimal OWL vocab → SHACL core constraints → JSON-LD @context → CI validation with fixtures.
- Dependency: None (feeds 3).

3) JSON ↔ Turtle pipeline (JSON-LD centric)
- Why: Interop and round-tripping for linked data; pairs with (2) for CI conformance.
- Key steps: Author @context + frames → implement jsonld.js + n3 helpers → round-trip tests in CI.
- Dependency: (2) contexts/types.

4) Pure TypeScript formula parser (optional enhancement)
- Why: Ergonomic improvement to declarative compute without introducing heavy tooling.
- Key steps: Tokenizer + Pratt/recursive-descent (+, -, *, /, ^, parens) → evaluator with immutable env → unit + property tests → optional functions table.
- Dependency: None (integrates with existing Calculate), can run parallel to (3).

5) MCP integration (minimal, read-only)
- Why: Dev productivity for docs/jexer; gated and sandboxed.
- Key steps: Define tool contracts → implement search/read/run-task (allowlist) → authZ/logging/rate limits → small authoring workflow demo.
- Dependency: None; schedule after core UX pieces (1–4).

6) Semantic search pilot (Weaviate/Qdrant/OpenSearch)
- Why: Adds intelligent discovery; do only with a concrete feature and clear eval metrics.
- Key steps: Choose backend → compose profile (disabled by default) → ingestion + hybrid search → measure latency/cost/quality.
- Dependency: Some content in docs; no hard coupling to earlier steps.
- We will use Weaviate. Later, in production, if it is worth it, we will consider OpenSearch. We will not use Qdrant.

7) Worktrees workflow
- Why: Improves contributor workflow and safety for parallel sessions.
- Key steps: Harden scripts (bail on dirty state, status across trees) → helpers (list/clean) → docs.
- Dependency: None; schedule when convenient.

8) Maths reference alignment
- Why: Documentation/supporting material aligned to parser; lowest risk, can follow parser.
- Key steps: Precedence/associativity table → function arity → numeric semantics → examples to tests.
- Dependency: (4) informs content.

## Parallelization hints
- (1) and (2) can start in parallel. (3) can begin once (2) defines initial @context.
- (4) can proceed independently of (2)/(3) and merge when tests are stable.
- (5)–(7) are loosely coupled; schedule after core pieces land.
