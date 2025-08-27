# Phase-2 CI hygiene — next-session prompt (strict guardrails)

This prompt restarts the “phase-2 CI/type hygiene” work from scratch, with guardrails to prevent drift. The primary goal remains: zero repo-wide type-check errors, normalized imports, Place stubs re-exporting canonical Organization implementations, and prep for docs/E2E. Work in small, verified steps.

## ABSOLUTE SCOPE LOCK — DO NOT TOUCH TOOLKIT OR FIX.md
- OFF LIMITS: `libraries/toolkit/` — owned by a different AI. Never edit/add/remove any files there. You can only read, but not the FIX.md file.
- OFF LIMITS: `libraries/toolkit/FIX.md` — ignore entirely; it controls the other AI’s workflow.
- This session operates ONLY in:
  - `libraries/components/` (primary)
  - `libraries/adaptive/` (secondary per alias/type hygiene tasks)
  - `docs/` and `scripts/` only when needed for CI/build verification (no behavior changes)
- If any instruction conflicts with the above, pause and clarify before proceeding.

Operational safeguard (explicit): Treat `libraries/toolkit/**` as read-only. Do not open write/edit tools against that path. If a fix appears to require changes in toolkit, stop and note it instead.

## Guardrails (must follow)
- No net new errors per step vs. baseline. If a change adds errors, fix immediately or revert before proceeding.
- Small batches: ≤3–5 files per step. Re-run type-check after each batch.
- Prefer repo-local import aliases (configured in root `deno.jsonc`):
  - `@toolkit/` → `./libraries/toolkit/src/`
  - `@adaptiveTypes/` → `./libraries/adaptive/types/`
  - `@adaptiveSrc/` → `./libraries/adaptive/src/`
- Library code ultimately must keep relative imports, but during cleanup, aliases are allowed for stability; replace with relative paths when stable.
- Do not introduce new public APIs. Keep edits surgical and scoped to error clusters.
- If unsure, pause and document what you plan to change and why before editing.

## Current status (handoff)
- Toolkit: Off-limits. No toolkit files will be edited. This prompt enforces a hard scope lock; do not perform write operations in `libraries/toolkit/**` for any reason.
- Components: Many TS2307/TS2614/TS2322 clusters previously reduced; narrative/Event/CreativeWork widened to accept simple string fields; several Place stubs re-export canonical Organization implementations.
- Adaptive (progress in-flight):
  - Multiple alias hygiene edits applied to reduce TS2307 path errors: guards, abstract constructors, and phrasing elements now import via `@adaptiveTypes` and `@adaptiveSrc` (and use `@toolkit` utilities where appropriate).
  - Normalized element tags to lowercase where applicable; tightened attribute filters; allowed TextNode handling for string children in several phrasing elements.
  - Introduced minimal shims/adapters to unblock path issues pending full refactor (e.g., `adaptive/src/utilities/castValue/`, `adaptive/src/utilities/getValue/` delegating to pending DOM helpers, and `types/shims/temporal.d.ts` for Temporal nominal types under strict checking).
  - Some focused checks on changed files passed; a repo-wide baseline type-check still needs to be (re-)captured to quantify remaining errors by code.
- Docs build: The last run of `deno task --cwd docs build` failed; address after type-check errors are driven down (keep docs changes minimal and non-behavioral).

## Next steps (strict order)
1) Re-capture baseline
  - Run: `deno task type-check` and record counts by code (TS2307, TS2614, TS2304, TS2322, TS2700, TS2503). Do not edit until the baseline is logged in a session comment.

2) Complete TS2307 cleanup in adaptive using aliases (remaining files only)
  - Continue replacing brittle relatives with aliases for shared utilities: `@toolkit/simple/...` for validation/array helpers; `@adaptiveTypes`/`@adaptiveSrc` for internal types/constructors. Keep batches ≤5 files; after each batch run focused checks with no net-new errors.

3) Resolve Temporal TS2503 in `libraries/adaptive/types/index.ts`
  - Prefer the ambient shim already added under `libraries/adaptive/types/shims/temporal.d.ts` with `--unstable-temporal` enabled. If errors persist in focused checks, adjust the Value union or centralize type-only references as needed.

4) Fix hydrated type export conflicts (TS2459/TS2303)
  - Inspect `libraries/adaptive/types/hydrated/*` to ensure single-source declarations of `OperationFunction` and `Value` without circularity.

5) Components follow-up
  - Convert remaining Place stubs to canonical Organization re-exports.
  - Ensure schema.org modules export `export type default as XType` aliases where required for TS2614.
  - Keep CreativeWork/Event minimal props for narrative compatibility.

6) Stabilize imports
  - When type-check approaches zero, replace temporary aliases with relative paths within libraries; keep aliases for docs/scripts only.

## Verification cadence
- After each batch (3–5 file edits), run:
  - `deno check` on the edited files
  - `deno task type-check` (or a focused subset) to confirm no net-new errors
- Track errors by code category and ensure counts don’t increase.

Fail-fast protocol
- If any operation would write to `libraries/toolkit/**`, stop immediately, log the intent, and request direction. Do not modify toolkit.

## Baseline snapshot (captured now)
- Repo-wide type-check across docs, scripts, adaptive, and components completed with 0 errors.
- Error counts by code: none found (TS2307/TS2614/TS2304/TS2322/TS2700/TS2503 = 0).

## Reference: principles and constraints
- See `CLAUDE.md` for prime directive and progressive enhancement rules. Key points:
  - No guessing; small, verified increments.
  - Libraries must be self-contained with relative imports for publication; use aliases only during refactor and remove before finalization.
  - Accessibility and semantic HTML are non-negotiable.

## Success criteria
- Repo-wide `deno task type-check` completes with 0 errors.
- Docs build succeeds; optional E2E smoke tests pass.
- Adaptive utilities no longer reference nonexistent paths; shared utilities come from toolkit.
- Place stubs correctly re-export canonical Organization implementations.

## Quick alias map (for this cleanup phase)
- `@toolkit/simple/validation/isDefined/index.ts`
- `@toolkit/simple/validation/isUndefined/index.ts`
- `@toolkit/simple/validation/isNumber/index.ts`
- `@toolkit/simple/array/includes/index.ts`, `concat/index.ts`, `unique/index.ts`, etc.
- `@toolkit/simple/conversion/castValue/index.ts`
- `@adaptiveTypes/...` for types under `libraries/adaptive/types/`
- `@adaptiveSrc/...` for referencing adaptive constructors/injectors when needed

## Final note
Work slowly and measure. If a step is ambiguous, pause and document the plan before editing any files. Most importantly, if anything is unclear, seek clarification before proceeding.
