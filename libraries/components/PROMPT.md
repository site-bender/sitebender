# Phase-2 CI hygiene — next-session prompt (strict guardrails)

This prompt restarts the “phase-2 CI/type hygiene” work from scratch, with guardrails to prevent drift. The primary goal remains: zero repo-wide type-check errors, normalized imports, Place stubs re-exporting canonical Organization implementations, and prep for docs/E2E. Work in small, verified steps.

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

## Current status (at end of last session)
- Components: Many TS2307/TS2614/TS2322 clusters already reduced; narrative/Event/CreativeWork widened to accept simple string fields; Place stubs re-export canonical Organization implementations in many cases.
- Adaptive: A large TS2307 cluster due to references to non-existent `adaptive/src/utilities/*` (e.g., `isDefined`, array helpers). Direction is to use `@toolkit/` utilities instead. Additional issues:
  - Temporal types: `libraries/adaptive/types/index.ts` uses `Temporal.*` and needs `--unstable-temporal` (already set), but some files lack proper references or the type checker still flags `TS2503 Cannot find namespace 'Temporal'` during focused checks; confirm lib settings and imports.
  - Hydrated type exports: earlier runs indicated `TS2459/TS2303` within `types/hydrated/*` (OperationFunction/Value declarations). Needs validation once path errors are down.
- Pending DOM helpers: New edits attempted to rewire imports in `adaptive/src/pending/dom/getValue/*`, but relative paths were brittle; we’ve added import aliases in root to stabilize this in the next pass. Re-validate before further changes.

## Next steps (strict order)
1) Establish a clean baseline
  - Run: `deno task type-check` and capture error counts by code (TS2307, TS2614, TS2304, TS2322, TS2700, TS2503). Note totals.
  - Do not change code until the baseline is recorded in a session log comment.

2) Fix TS2307 import path errors in adaptive using aliases
  - Replace adaptive references to `../../utilities/isDefined...` etc. with `@toolkit/simple/validation/isDefined/index.ts` and similarly for `isUndefined`, `isNumber`, array helpers (`@toolkit/simple/array/...`), and `castValue` (`@toolkit/simple/conversion/castValue/index.ts`).
  - Limit each batch to ≤5 files. After each batch, run `deno check` on the changed files and then `deno task type-check:focused` (if available) or a narrowed `deno check` to ensure no net-new errors.

3) Resolve Temporal TS2503 in `libraries/adaptive/types/index.ts`
  - Ensure `deno check` is invoked with `--unstable-temporal` (root task already does). If individual checks fail, prefer running via the task rather than ad-hoc.
  - If errors persist, explicitly import types from the Temporal lib types by referencing the global namespace through a type-only export (e.g., `type T = Temporal.PlainDate | ...`) in one place and re-export, or consider narrowing the Value union in adaptive to remove direct `Temporal.*` nominal types where not essential.

4) Fix hydrated type export conflicts (TS2459/TS2303)
  - Inspect `libraries/adaptive/types/hydrated/index.ts` and related files to ensure `OperationFunction` and `Value` are declared once and exported correctly without circular aliases.

5) Continue component-side cleanups
  - Convert remaining Place stubs into canonical Organization re-exports.
  - Ensure schema.org modules export `export type default as XType` aliases where needed to satisfy TS2614.
  - Keep CreativeWork/Event minimal props (string name/text/description and Event.startDate) for narrative compatibility.

6) When type-check trends to zero, remove any temporary barrels and replace aliases with relative paths in libraries, keeping aliases only for docs/scripts as appropriate.

## Verification cadence
- After each batch (3–5 file edits), run:
  - `deno check` on the edited files
  - `deno task type-check` (or a focused subset) to confirm no net-new errors
- Track errors by code category and ensure counts don’t increase.

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
Work slowly and measure. If a step is ambiguous, pause and document the plan before editing any files.
