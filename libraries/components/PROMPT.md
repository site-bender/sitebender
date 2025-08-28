# Phase-2 CI/type hygiene — next-session prompt (strict, restartable)

Use this as the single source of truth to resume the “phase-2 CI/type hygiene” work with a fresh memory. Follow exactly. Work in small, verified batches with a zero net-new-errors policy.

If you detect any performance constraints or rate limits, immediately inform me rather than attempting workarounds!!!

## hard scope lock (do not violate)
- OFF LIMITS (read-only): `libraries/toolkit/**` and `libraries/toolkit/FIX.md`.
  - Do not edit, stage, or commit anything under `libraries/toolkit/**`.
  - If a fix seems to require toolkit changes, stop and note it; do not proceed.
- In-scope write paths only:
  - `libraries/components/**` (primary)
  - `libraries/adaptive/**` (typing/import hygiene only)
  - `docs/**` and `scripts/**` for minimal, non-behavioral CI/type/globals wiring only

## guardrails you must follow
- No net-new errors per step vs. the active baseline; if errors increase, fix or revert immediately.
- Edit in tiny batches (≤3–5 files), then re-check types; keep diffs surgical and local.
- Prefer repo aliases during cleanup; don’t invent paths:
  - `@toolkit/` → `./libraries/toolkit/src/` (read-only usage only)
  - `@adaptiveTypes/` → `./libraries/adaptive/types/`
  - `@adaptiveSrc/` → `./libraries/adaptive/src/`
- Don’t change public APIs; don’t introduce behavior changes in docs.
- Never touch `libraries/toolkit/**` in edits or commits.

## current state (at handoff)
- Type-check: Last full run failed. Prior failures were 4 duplicate ambient JSX types (Element/IntrinsicElements) between docs and components. We fixed this by narrowing `docs` globals to only `ElementChildrenAttribute` and ensuring root `compilerOptions.types` includes the docs globals file.
- Docs: A previous `deno task --cwd docs build` failed; revisit only after type-check is green.
- Aliases/config:
  - Root `deno.jsonc` compilerOptions: jsx factories set; `types` now includes `./docs/src/types/globals.d.ts` and `./scripts/types/globals.d.ts`.
  - Import maps set for `@toolkit/`, `@adaptiveTypes/`, `@adaptiveSrc/`, and `~` docs aliases.
- Canonical JSX globals live in `libraries/components/types/globals.d.ts`. Docs’ globals only mark `children` to avoid conflicts.

### files recently fixed (keep behavior consistent)
- `docs/src/types/globals.d.ts`: now only declares `JSX.ElementChildrenAttribute`.
- Adaptive injectors (Promise/Either alignment + alias hygiene):
  - `libraries/adaptive/src/injectors/constant/index.ts`
  - `libraries/adaptive/src/injectors/fromApi/index.ts`
  - `libraries/adaptive/src/injectors/fromArgument/index.ts`
  - `libraries/adaptive/src/injectors/fromElement/index.ts`
  - `libraries/adaptive/src/injectors/fromUrlParameter/index.ts`
    - All return `Promise<Either<AdaptiveError[], Value>>` consistently, use `@adaptiveTypes`/`@adaptiveSrc`, and safe guards. Keep this contract intact.

## immediate actions (start-of-session checklist)
1) Re-capture the true baseline
   - Run: `deno task type-check`
   - If errors exist, categorize counts by code (TS2307, TS2614, TS2304, TS2322, TS2503, etc.).
   - Confirm no duplicate JSX declarations remain. If they do, re-open:
     - `docs/src/types/globals.d.ts` → must define ONLY `ElementChildrenAttribute`.
     - `libraries/components/types/globals.d.ts` → remains the canonical JSX global.
     - Root `deno.jsonc` → `compilerOptions.types` must include the docs globals.

2) If JSX duplication is gone and other errors remain, proceed in ≤5-file batches:
   - Continue Adaptive alias/typing hygiene in remaining modules, enforcing the OperationFunction Promise/Either contract.
   - After each batch: run focused `deno check` on edited files, then `deno task type-check`. Zero net-new errors invariant.

3) When type-check is green, validate docs build minimally:
   - Run: `deno task --cwd docs build`
   - Only apply non-behavioral fixes (types/globals/wiring) if needed.

## success criteria
- `deno task type-check` returns 0 errors.
- Docs `build` succeeds.
- Adaptive injectors/utilities use stable aliases (during refactor), with consistent Promise/Either returns.
- No writes or commits under `libraries/toolkit/**`.

## verification cadence
- After every ≤3–5 edits:
  - Run `deno check` on the changed files
  - Run `deno task type-check`
  - Keep a short tally of error deltas (by TS code). Deltas must not increase.

## quick reference
- OperationFunction<T> shape: `(arg, localValues?) => Promise<Either<AdaptiveError[], T>>`
- Useful guards/utilities (read-only in toolkit): `isDefined`, etc. Prefer `@adaptiveSrc` shims/utilities where available.
- Aliases: `@adaptiveTypes/`, `@adaptiveSrc/`, `@toolkit/` (read-only)

## commit discipline
- Stage and commit only non-toolkit paths.
- Keep commit messages scoped, e.g.:
  - `phase-2: fix JSX globals duplication; adaptive injectors Promise/Either consistency`

## final reminders
- Keep edits small and reversible. Document uncertainties inline before changing code. Never touch toolkit.
