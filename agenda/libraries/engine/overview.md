# Engine — overview

What this is

- The core runtime that evaluates a compact, versioned IR to produce semantic HTML (SSR/SSG) and optional client behaviors (CSR hydration) without a VDOM.
- A tiny “reactivity kernel” built on pure functions and explicit environment adapters. No framework lock-in, zero runtime dependencies.

Problem we’re solving (why this exists)

- Give authors a small, readable JSX vocabulary that compiles to a safe, auditable IR (no functions in JSON) which can be rendered server-side and hydrated client-side.
- Keep pages fully usable with no JavaScript, while unlocking validation, conditional UI, calculations, navigation, and data shaping when JS is available.

Core principles (from CLAUDE.md and plan-of-attack)

- Progressive enhancement by default; SSR-first. Hydration is additive and lazy.
- Zero-dependency libraries, one-function-per-folder, side-effect-free modules for maximum tree-shaking.
- Type-safe, functional composition. Errors are explicit (Result/ResultAsync) with short-circuit or accumulation modes.
- Accessibility and semantics first (precise HTML/ARIA types; microdata/JSON-LD support).

Authoring model (Components → IR → Runtime)

- Authors write JSX using thin wrappers (From._, Is._, Add/Multiply, If/On/Validation, bare-verb Actions in docs) in the Components lib.
- The Components compiler lowers JSX to Engine IR (discriminated unions). The Engine library owns the IR schema, executors/registries, evaluator, renderer, and hydrator.

IR design (contract)

- Discriminant: `kind` ∈ { element, injector, operator, comparator, conditional, validator, action, on, script }.
- Common base fields: `v` (semver), `id` (deterministic), optional `meta` (source/diagnostics).
- Leaves of operator/comparator graphs are injectors; behavior nodes (validator/event) reference anchors by id.
- Single root embed: `<script type="application/engine+json" id="ir-root">…</script>` for hydration.

Runtime architecture (high-level)

- Registries: explicit, tree-shakeable maps for operators, comparators, injectors, actions, and event binders.
- Evaluator: async, walks graphs, composes functions from registries, honors `ComposeContext`.
- Hydrator: resolves anchors, binds events/validators/conditionals, runs comparators lazily or on-demand.
- ComposeContext (boundary): `{ env, signal, now, bus, logger, localValues? }` decouples SSR/CSR, time, cancellation, and pub/sub.

Anchoring and IDs

- Behaviors attach to the nearest element with a stable `id`/`name`; deterministic `data-ir-id` is added when needed. Explicit overrides (`for`/`anchor`) supported.
- Deterministic IDs are seeded by route/build; collisions extend length.

Security and safety

- Strict whitelist of node kinds and args. No `eval`, no dynamic codegen.
- Optional JSON Schema validation (dev) for IR documents; capability boundaries for side effects.

Data semantics and future integration

- Vault/Collection/Field IR (data model) will produce SHACL/OWL artifacts and power schema-driven forms; the same comparator graphs express constraints.
- A thin SPARQL adapter enables SSR-safe reads from Fuseki; writes are guarded post-MVP.

What’s not in scope

- No client state frameworks; engine provides a minimal store and bus only to support behaviors.
- No visual charting SDKs in core; visualization compiles to renderer-agnostic nodes handled by adapters in apps.

Success criteria

- Deterministic compilation (same input → same IR), zero-dep runtime, green strict tests, AAA a11y patterns supported, and a stable JSON Schema for IR.

JSX to IR, visually

- Authoring (Components):

```tsx
<label for="qty">Qty</label>
<input id="qty" />
<output id="total" />

<On event="Input">
	<SetValue selector="#total" value={<Add><FromElement id="qty" /><Constant value={2} /></Add>} />
	{/* Equivalent to: total = qty + 2 */}
	{/* Compiles to an On.Input binding with an Act.SetValue whose args tree includes Op.Add with injectors. */}
</On>

<Program />
```

- Hydration (Engine): reads `<script id="ir-root" type="application/engine+json">{…}</script>`, registers defaults, resolves anchors (`qty`, `total`), listens for `input`, evaluates `Op.Add` with `From.Element` and `From.Constant`, then runs `Act.SetValue`.
