# Phase-2 CI/Type Hygiene — Next-Session Bootstrap Prompt (Single Source)

Date: 2025-08-29

Use this prompt at the start of the next session to regain full context with no prior memory. Follow it exactly. Work in tiny, verified batches (≤5 files), maintain zero net-new-errors, and prefer repo aliases.

## Read first (context + constraints)
- Read `CLAUDE.md`, `PLAN_OF_ATTACK.md`, `TESTING.md`, and `README.md` to refresh guardrails and goals.
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

## Guardrails
- No net-new errors per step; re-run type-check and tests after small edits.
- Prefer aliases across packages, avoid deep relative imports.
- Do not edit `libraries/toolkit/**` unless explicitly approved.
- Keep changes non-behavioral unless tests require; update/extend tests alongside type changes.

## Immediate actions (next session)
1) Re-baseline:
   - Run: `deno task type-check` (or targeted `deno check` on changed files if small).
   - Run: `deno task test:adaptive:strict`, `deno task test:components:strict`.
   - Run: `deno task lint:aliases`.
2) Adaptive IR contract expansion (compile-time only):
   - Add 2–3 more `satisfies` contracts (e.g., Subtract, Divide, Matches).
   - Add a tiny runtime smoke test for Ternary (optional) without changing behavior.
3) Components coverage:
   - Add 3–5 more compile-to-IR tests for common wrappers (Min/Max, Matches, nested And/Or).
4) Toolkit strict test scaffolding (no behavior changes):
   - Add `test:toolkit:strict` task; don’t enforce in CI yet. Triage types; only fix trivial typings.
5) Apps hygiene:
   - Docs: keep Playwright E2E as-is; ensure examples keep alias usage; optional compile-time IR shape snippet.
   - Jexer: add a type-check task and a minimal smoke test for server/compiler startup.

## Success criteria
- Strict Adaptive/Components tests stay green; alias guard stays clean.
- Expanded IR contract suite compiles.
- Toolkit can type-check in strict mode locally (optional), with no public API changes.
- Docs/Jexer have basic type/smoke coverage without behavioral regressions.

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
