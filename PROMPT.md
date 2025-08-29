# Phase-2 — Next-Session Bootstrap Prompt (Single Source)

Date: 2025-08-29

Use this prompt at the start of the next session to regain full context with no prior memory. Follow it exactly. Work in tiny, verified batches (≤5 files), maintain zero net-new-errors, and prefer repo aliases.

## Read first (context + constraints)
- Read `CLAUDE.md`, `PLAN_OF_ATTACK.md`, `NAMING.md`, `TESTING.md`, and `README.md` to refresh guardrails, naming canon, and goals.
- Open root `deno.jsonc` to confirm:
  - Aliases: `@adaptiveSrc/`, `@adaptiveTypes/`, `@toolkit/`
  - Compiler `types`: docs + scripts + components JSX globals
  - Tasks: `type-check`, `test:adaptive:strict`, `test:components:strict`, alias guard
- Scan `scripts/hooks/install.ts` to note pre-commit checks: FP checks, alias guard, and no-react-junk; SKIP envs: `SKIP_FP_CHECKS=1`, `SKIP_ALIAS_GUARD=1`.

## Current state snapshot (end of 2025-08-29)
- Type-check: Green for Adaptive/Components code used in tests; spot checks clean.
- Tests:
  - Adaptive strict tests: PASS (operators, comparators, registries, runtime, hydrator; compile-time IR contracts for Add/Multiply/Min/Max/Ternary, And/IsEqualTo).
  - Components strict tests: PASS (compile-to-IR wrappers and primitives).
  - Docs E2E live under `docs/tests` and run via Playwright; we didn’t change runtime behavior.
- Alias policy: Guard added and green.
- Key type hygiene wins:
  - Introduced `libraries/adaptive/src/types/index.ts` shim to canonical types.
  - Tightened logical comparators to `BooleanDatatype`.
  - Vector comparators typed precisely (e.g., IsArray/IsMap/IsSet).
  - Ternary operator constructor now typed and carries `datatype`.
  - Added compile-time IR contracts for Add, Multiply, Min, Max, Ternary, And, IsEqualTo.

- Naming canon decisions (authoring)
  - Data model: Vault / Collection / Field / Item (replaces Entry).
  - Forms: `<Form collection="…">` is canonical (replaces `for=`).
  - Events: canonical `When.*`; keep `On.*` as dev-friendly aliases.
    - `When.ValueUpdated` ≡ `On.Input`
    - `When.ChangeComplete` ≡ `On.Change`
    - `When.GainedFocus` ≡ `On.Focus` (alias: `When.Focused`)
    - `When.LostFocus` ≡ `On.Blur` (alias: `When.Blurred`)
  - Actions: bare verbs (no namespace). Keep existing Do.* aliases for now, but don’t feature them in docs.
  - Injectors: keep `From.Store`, plan `From.SPARQL`. Remove `From.Entry`/`From.Item` for now.

## Guardrails
- No net-new errors per step; re-run type-check and tests after small edits.
- Prefer aliases across packages, avoid deep relative imports.
- Do not edit `libraries/toolkit/**` unless explicitly approved.
- Keep changes non-behavioral unless tests require; update/extend tests alongside type changes.

## Immediate actions (next session)
1) Re-baseline
  - Run: `deno task type-check`
  - Run: `deno task test:adaptive:strict` and `deno task test:components:strict`
  - Run: `deno task lint:aliases`

2) Implement naming canon wrappers (authoring-only; no behavioral changes)
  - Add `When.ValueUpdated` (lowers to `On.Input`).
  - Add `When.ChangeComplete` (lowers to `On.Change`).
  - Add `When.GainedFocus`/`When.LostFocus` (lower to `On.Focus`/`On.Blur`).
  - Add `From.Store` JSX marker (no-op lowering initially). Skip `From.Item` for now.

3) Update docs/examples
  - Prefer `When.ValueUpdated`/`When.ChangeComplete` in examples; add a mapping callout (`On.*` aliases acceptable).
  - Keep actions authored as bare verbs (remove `Do.*` from showcased docs), but retain existing Do.* aliases for compatibility.

4) Optional hygiene (if time)
  - Expand Adaptive IR compile-time contracts (e.g., Subtract, Divide, Matches) without runtime changes.
  - Add 2–3 compile-to-IR unit tests in Components (cover common wrappers and a nested conditional).
  - Consider adding a gentle lint hint that suggests the new `When.*` names when `On.Input/On.Change` appear in docs-facing code.

## Success criteria
- Strict Adaptive/Components tests stay green; alias guard stays clean.
- Expanded IR contract suite compiles.
- Toolkit can type-check in strict mode locally (optional), with no public API changes.
- Docs/Jexer have basic type/smoke coverage without behavioral regressions.
 - New authoring wrappers exist and map cleanly to current runtime event handling.

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
- `When.ValueUpdated` ≡ `On.Input`
- `When.ChangeComplete` ≡ `On.Change`
- `When.GainedFocus` ≡ `On.Focus` (alias: `When.Focused`)
- `When.LostFocus` ≡ `On.Blur` (alias: `When.Blurred`)

## Commands to run (copy/paste)
```sh
deno task type-check
deno task test:adaptive:strict
deno task test:components:strict
deno task lint:aliases
```

## Commit discipline
- Keep batches ≤5 files. After each batch: type-check + tests.
- Conventional messages, scoped, e.g.:
  - `phase-2: tighten logical/ternary typings; add IR contracts; alias guard hook`

## If stuck
- Re-read `CLAUDE.md` and `PLAN_OF_ATTACK.md` for principles and boundaries.
- Prefer surgical typing improvements + tests over broader refactors.

---
Start here next session: run the Immediate actions checklist and continue in tiny, verified steps.
