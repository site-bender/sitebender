# Engine — planned

North-star summary
- A stable, minimal IR with explicit registries and one evaluator/renderer/hydrator that runs identically in SSR/SSG/CSR behind an environment boundary. Deterministic IDs, dev-time JSON Schema validation, AAA a11y patterns, and adapters for data/auth/viz/logging.

Phase 1 — lock contracts and close MVP gaps
- IR schema and base fields
	- [ ] Author JSON Schema v1 for IR (`types/ir` → `schema/v1.json`). Include: element/injector/operator/comparator/conditional/validator/action/on/script, `v`, `id`, `meta`.
	- [ ] Add constructor/runtime helpers to enforce `v` and `id` on creation (allow override). Deterministic id generator seeded by route/build.
- Registries and composition
	- [ ] Ensure all composition paths use explicit registries (no dynamic imports or `comparison` string hacks).
	- [ ] Extend defaults: `Op.Multiply` is done; add numeric/boolean coercion helpers; add equality and logical completeness; wire minimal arithmetic set.
- Hydration and anchoring
	- [ ] Finalize anchor resolution algorithm (nearest stable id/name; deterministic fallback; explicit `for|anchor` override). Add tests.
	- [ ] Add a post-hydration/build step to strip `data-ir-id` for prod, keep a debug fingerprint in dev.
- SSR/CSR split and env guards
	- [ ] Factor server/client env adapters and annotate injectors/actions with capabilities; DOM-only injectors return typed errors in SSR.
- Tests and goldens
	- [ ] Golden tests: JSX → IR → HTML for Conditional/If, Validation, Events; smoke tests for registry resolution and hydrate attach.

Phase 2 — data semantics and adapters (read-only)
- SPARQL read path
	- [ ] Implement `From.SPARQL` injector with SSR-safe server adapter; evaluate caching strategy.
	- [ ] Small docs demo querying local Fuseki (dev only) and rendering via conditional or SetValue.
- Vault → artifacts
	- [ ] Add Vault/Collection/Field IR kinds (no UI yet). Generators: SHACL (Turtle) + minimal OWL, emitted as files and/or ScriptNode JSON-LD.
	- [ ] Validate artifacts in dev (schema tests), do not block prod builds.

Phase 3 — authoring ergonomics and a11y
- Compiler mapping completeness
	- [ ] Map Multiply, Equals/NotEquals, And/Or, string/number/boolean coercions; ensure wrappers call engine constructors directly.
- Accessibility polish
	- [ ] Validation examples add `required` and `aria-describedby`; add one a11y E2E.

Phase 4 — performance and DX
- Evaluation improvements
	- [ ] Partial evaluation for pure subtrees during SSR; memoize node results by (`id`, inputs hash) with invalidation.
	- [ ] Eager vs lazy injectors policy; document defaults and tuning.
- Tooling
	- [ ] Minimal source maps from JSX to IR nodes for precise diagnostics; alias guard and strict type-check restored across repo.

Phase 5 — controlled capabilities and advanced IR (vision)
- Capabilities
	- [ ] Introduce explicit capability model for side-effect actions (navigation, storage, network). Deny by default server-side; opt-in per app.
- Algorithm IR (optional track)
	- [ ] Pipe/Parallel/Try/Map/Reduce nodes with strict budgets and JSON Schema; dev-only until stabilized.

Open questions (need resolution before Phase 2 completes)
- Deterministic ID seeding: single per-route seed vs. per-build seed + stable path? How to preserve across SSG + runtime nav?
- JSON-LD emission policy: always SSR emit microdata and JSON-LD, or feature-flag? How to keep client-updated metadata in sync?
- Error model unification: migrate to toolkit `ResultAsync` now or add thin adapter and defer until toolkit types stabilize repo-wide?

Risks and mitigations
- IR sprawl → Gate new kinds behind RFC + tests; keep schema small; prefer compiler sugar over IR growth.
- Temporal availability → Feature-detect and narrow types; provide fallbacks; test both with/without Temporal.
- Over-hydration → Default to lazy hydration and anchor-based scoping; avoid global listeners.

Acceptance criteria (per slice)
- Phase 1
	- Green tests for goldens, registry resolution, hydrate attach; JSON Schema in repo; anchor tests pass; no dynamic imports.
- Phase 2
	- From.SPARQL returns rows SSR-side in dev; demo page renders data; Vault → SHACL/OWL artifacts generated and snapshot-tested.
- Phase 3
	- Docs examples reflect canonical naming; a11y tests pass; compiler mappings extended without widening public types.
- Phase 4
	- Memoization measurable wins on simple scenarios; eager/lazy policies documented.
- Phase 5
	- Capability gates enforced in tests; advanced IR behind dev flag with schema + budget checks.
