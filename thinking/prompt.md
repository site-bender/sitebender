# Phase-2 — Next-Session Bootstrap Prompt (Single Source)

Date: 2025-08-31

Use this prompt at the start of the next session to regain full context with no prior memory. Follow it exactly. Work in tiny, verified batches (≤5 files), maintain zero net-new-errors, and prefer repo aliases.

## Read first (context + constraints)
- Read `CLAUDE.md`, `PLAN_OF_ATTACK.md`, `NAMING.md`, `TESTING.md`, and `README.md` to refresh guardrails, naming canon, and goals.
- Open root `deno.jsonc` to confirm:
  - Aliases: `@adaptiveSrc/`, `@adaptiveTypes/`, `@toolkit/`
  - Compiler `types`: docs + scripts + components JSX globals
  - Tasks: `type-check`, `test:adaptive:strict`, `test:components:strict`, alias guard
- Scan `scripts/hooks/install.ts` to note pre-commit checks: FP checks, alias guard, and no-react-junk; SKIP envs: `SKIP_FP_CHECKS=1`, `SKIP_ALIAS_GUARD=1`.

## Current state snapshot (end of 2025-08-31)
- Type-check: Green on edited areas; spot checks clean.
- Tests:
  - Adaptive: PASS (operators, comparators, registries, runtime, hydrator; IR contracts for Add/Multiply/Min/Max/Ternary; And/EqualTo; actions/events path).
  - Components: PASS (compile-to-IR wrappers, On/When mapping, conditionals; plus new Viz container tests and adapter tests).
  - Docs E2E live under `docs/tests`; no behavioral regressions introduced.
- Naming canon: Authoring uses component names; keep `When.*` for events. Avoid `Do.*` and `Act.*` in docs/examples; runtime internals may still use `Act.*` identifiers.
- Auth scaffolding:
  - Wrappers: `When.Authenticated` and `When.Authorized` emit an authorized control marker.
  - Compiler: authorized markers compile to an `If` action with a policy-based condition.
  - Runtime: policy registry added; `IsAuthenticated` policy implemented and registered by default during `registerDefaultExecutors`.
  - Docs: `AUTH.md` with JSX examples.
- Visualization scaffolding:
  - Components: `Viz.Line`, `Viz.Bar` return SSR-safe containers with `data-viz=*` attributes.
  - Adapter: noop adapter with `hydrateVizContainers()`; adapter interface and simple registry (`setVizAdapter`/`getVizAdapter`).
  - Docs: `VIZ.md` explains authoring and adapters; `TODO.md` tracks next steps.
- Hygiene to date:
  - Targeted lint fixes across constructors/comparators and new files; keep precise HTML/ARIA typings intact.

- Naming canon decisions (authoring)
  - Data model: Vault / Collection / Field / Item (replaces Entry).
  - Forms: `<Form collection="…">` is canonical (replaces `for=`).
  - Events: canonical `When.*`; keep `On.*` as dev-friendly aliases.
    - `When.Clicked` ≡ `On.Click`
    - `When.Submitted` ≡ `On.Submit`
    - `When.ValueUpdated` ≡ `On.Input`
    - `When.ChangeComplete` ≡ `On.Change`
    - `When.GainedFocus` ≡ `On.Focus` (alias: `When.Focused`)
    - `When.LostFocus` ≡ `On.Blur` (alias: `When.Blurred`)
  - Actions: bare verbs only (no namespace). Drop `Do.*` aliases from docs and future examples; do not introduce `Act.*` in examples.
  - Injectors: keep `From.Store`, plan `From.SPARQL`. Remove `From.Entry`/`From.Item` for now.

## Guardrails
- No net-new errors per step; re-run type-check and tests after small edits.
- Prefer aliases across packages, avoid deep relative imports.
- Do not edit `libraries/toolkit/**` unless explicitly approved.
- Keep changes non-behavioral unless tests require; update/extend tests alongside type changes.

## Immediate actions (next session)
1) Re-baseline
  - Run: type-check + components/adaptive tests; quick lint on changed paths.

2) Finish linter sweep (priority)
  - Continue removing unused imports/params and tightening types across components/adaptive, staying SSR-safe and preserving HTML/ARIA precision.
  - Work in ≤5-file batches; re-run lint + tests after each batch.

3) Viz next slice (small)
  - Wire `hydrateVizContainers()` in docs bootstrap (DOMContentLoaded) to mark viz containers; keep adapter noop.
  - Sketch renderer adapter contract (no dependency yet) and add one unit test.

4) Auth follow-ups (small)
  - Add `HasRole` policy and allow args in `When.Authorized`.
  - Add `From.RequestAuth` adapter (SSR-safe) and a simple 401/403 guard helper.

5) Docs refresh
  - Cross-link `AUTH.md`, `VIZ.md`, and `TODO.md`; ensure examples use `When.*` and component-first naming.

## Success criteria
- Tests stay green across Adaptive/Components; no new lint errors.
- Linter sweep reduces warnings on touched paths without regressing types.
- Viz containers remain SSR-safe; noop hydration runs in docs.
- Auth policies registered by default; authorized compile path intact.

## Useful paths and aliases
- Aliases (root `deno.jsonc`):
  - `@adaptiveSrc/` → `./libraries/adaptive/src/`
  - `@adaptiveTypes/` → `./libraries/adaptive/types/`
  - `@toolkit/` → `./libraries/toolkit/src/` (read-only)
- Adaptive tests/examples:
  - IR contracts: `libraries/adaptive/tests/contracts/ir_contracts.test.ts`
  - Registries defaults: `libraries/adaptive/src/operations/defaults/registerDefaults/index.ts`
  - Hydrator: `libraries/adaptive/src/runtime/hydrator/index.ts`
- Components tests:
  - `libraries/components/tests/unit/compile_to_adaptive.test.ts`

## Event mapping cheat-sheet
- `When.Clicked` ≡ `On.Click`
- `When.Submitted` ≡ `On.Submit`
- `When.ValueUpdated` ≡ `On.Input`
- `When.ChangeComplete` ≡ `On.Change`
- `When.GainedFocus` ≡ `On.Focus` (alias: `When.Focused`)
- `When.LostFocus` ≡ `On.Blur` (alias: `When.Blurred`)

## Commands to run (copy/paste)
```sh
deno task type-check
deno task test:adaptive:strict
deno task test:components:strict
deno lint
```

## Commit discipline
- Keep batches ≤5 files. After each batch: type-check + tests.
- Conventional messages, scoped, e.g.:
  - `phase-2: tighten logical/ternary typings; add IR contracts; alias guard hook`

## If stuck
- Re-read `CLAUDE.md` and `PLAN_OF_ATTACK.md` for principles and boundaries.
- Prefer surgical typing improvements + tests over broader refactors.

---
Start here next session: 1) run tests + type-check; 2) resume the linter sweep; then 3) wire viz noop hydration in docs.
