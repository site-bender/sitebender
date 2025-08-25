# Adaptive Work-in-Progress Prompt

Date: 2025-08-25

This is the single source of truth for where the adaptive library stands and the exact next steps to get to “stable for commit”. Keep this file current; do not over-promise in commit messages.

## Ground rules (unchanged)

- See CLAUDE.md (do not assume; progressive enhancement; accessibility; relative imports in libraries; one function/component per folder; zero-deps mindset).
- Follow PLAN_OF_ATTACK.md (JSX → IR → SSR/SSG + hydration; registries; ComposeContext; versioned schema; tests).
- Strict FP: avoid `let` and imperative loops. Prefer pure functions, immutability, and declarative transforms. Public surfaces return Either/Result; no thrown exceptions.
- One function/component per folder with `index.ts[x]`. Colocate helpers under their own subfolders.
- Tests: keep specs simple; colocate helpers in subfolders.

## What’s DONE (as of now)

- Centralized types and constants:
  - Canonical IR types at `libraries/adaptive/types/ir/index.ts` (Version = "0.1.0").
  - Canonical Bus types at `libraries/adaptive/types/bus/index.ts`.
  - Canonical constants at `libraries/adaptive/constants/index.ts` and `libraries/adaptive/constants/ir/index.ts`.
  - Legacy trees `libraries/adaptive/src/types/**` and `libraries/adaptive/src/constants/**` were migrated and removed. A migration script rewrote imports repo-wide.
- Migration script added and executed: `scripts/migrate/adaptiveTypesAndConstants.ts` (rewrote ~1.1k files; safe and idempotent). Root/docs import maps updated to support script aliases used by build scripts.
- Hydrator MVP wired:
  - `libraries/adaptive/src/runtime/hydrator/index.ts` hydrates IR, walks the tree, resolves anchors via `data-ir-id` then `getElementById`, binds events/actions.
  - Helpers folderized at `runtime/hydrator/walk/` and `runtime/hydrator/resolveAnchor/`; legacy single-file duplicates have been removed.
  - `resolveAnchor` now returns `HTMLElement | null` (was `Element | null`).
   - Tutorial hydration now runs in the browser via a tiny bundle:
      - Client entry: `docs/src/hydrate/adaptive.ts`.
      - Bundled by Deno emit: `scripts/build/bundleHydrate/index.ts` → outputs `docs/dist/scripts/hydrate/adaptive.js`.
      - Tutorial route references the bundle: `docs/src/routes/tutorial/index.tsx`.
   - Playwright E2E added for tutorial behaviors:
      - Tests: `docs/tests/e2e/tutorial.spec.ts`.
      - Config: `playwright.config.ts` (webServer on 5556 serving `docs/dist/`, baseURL set).
      - Task: `deno task --cwd docs test:e2e` builds then runs Playwright.
- ComposeContext: `libraries/adaptive/src/context/composeContext.ts` uses top-level Bus types; defaults to local bus.
- Store: folderized helpers exist (`runtime/store/createStore.ts`, `runtime/store/persistToLocalStorage.ts`). A deprecated `runtime/store.ts` re-export file still exists but has no known importers and can be removed safely.
- Rendering helpers: minor strictness fixes (e.g., `rendering/buildDomTree/setLevel/index.ts` parameter types) and constants are centralized under `rendering/constants.ts`.

## What’s BROKEN or INCOMPLETE (must fix before commit)

- Type-check currently fails in adaptive comparators due to incomplete stub implementations (arrow functions without bodies) and possibly inconsistent compare helper usage. Example files:
  - `libraries/adaptive/src/operations/comparators/amount/isLessThan/index.ts`
  - `libraries/adaptive/src/operations/comparators/amount/isMoreThan/index.ts`
  - `libraries/adaptive/src/operations/comparators/amount/isNoLessThan/index.ts`
  - `libraries/adaptive/src/operations/comparators/length/isLength/index.ts`, `isLongerThan/`, `isShorterThan/`, `isSameLength/`
  - `libraries/adaptive/src/operations/comparators/equality/isEqualTo/`, `isUnequalTo/`
- Ensure all these use the shared `compare` utility at `libraries/adaptive/src/operations/comparators/compare/index.ts` with proper types, and actually return the comparator function result. Many files currently stop after the signature and immediately `export default`, which is a parse error.
- Registries are present but not fully wired to concrete functions for the MVP set (injectors/operators/comparators/actions/events). They compile in isolation but need actual registrations pointing at the correct function module paths.
- Docs/tests have not been audited for import path updates beyond the automated rewrite; some examples may still show legacy `src/types` or `src/constants` paths.

## Quality gates snapshot (today)

- Build/type-check (libraries/adaptive): FAIL — first hard error in `comparators/*` stubs as listed above.
- Docs build: PASS; E2E: PASS (3 tests passing).
- Lint: Pending re-run after type-check goes green. Migration script was updated to satisfy lint (`path.SEPARATOR`, batched removals, sync import rewriter).
- Tests: Not re-run after the migration. Hydrator behavior tests exist but may require path updates.

## Requirements coverage (today)

- Leave the toolkit alone: Done — no behavior changes to core runtime; only build wiring, docs, and tests were added.
- Behavioral tests (Act.If, On.Submit preventDefault): Done — added and green.
- Beginner tutorial via JSX, folder-based route, link from home: Done — `docs/src/routes/tutorial/index.tsx` with JSX authoring and link.
- Fix dev server port conflict: Done — raw TCP probe in `scripts/serve/getFreePort`.
- Hydration bundle (Option 1) works in dev/dist: Done — client entry bundled to `docs/dist/scripts/hydrate/adaptive.js` and referenced from tutorial.
- Playwright E2E: Done — 3 tests passing via webServer serving `docs/dist` on 5556.
- Update docs (this PROMPT.md) and commit: This update finalizes PROMPT.md; commits next.

## Exact NEXT STEPS to reach “stable for commit”

1. Fix comparators stubs (highest priority):
   - For each comparator file under `libraries/adaptive/src/operations/comparators/**/index.ts` that imports `../../compare.ts`, implement by delegating to the shared `compare` higher-order:
     - Example pattern for amount/length comparisons: `const IsLessThan = compare((o, t) => o < t); export default IsLessThan`.
     - For equality: `compare((o, t) => o === t)`; for inequality: `compare((o, t) => o !== t)`; for length-based: operate on `.length` in the comparator or ensure operands are lengths via compose.
   - Remove incomplete async arrow signatures that don’t return a function body.
   - Ensure all affected files import the correct type helpers as needed (but prefer lean signatures if `compare` hides details).
2. Verify `compare` helper contract:
   - File: `libraries/adaptive/src/operations/comparators/compare/index.ts` — keep types coherent with `ComparatorConfig`, `OperationFunction`, and Either returns. Ensure `getErrorMessage` uses the provided op.tag (fix its local variable name if needed).
3. Wire registries for MVP:
   - Populate `operations/registries/{injectors,operators,comparators,actions,events}.ts` with the minimal set referenced by current demos/tests (From.Constant/Element/QueryString/LocalStorage; Op.Add/Multiply; Is.* basics; Act.SetValue/Publish/Submit; On.Input/Change/Blur/Submit).
4. Remove deprecated file:
   - Delete `libraries/adaptive/src/runtime/store.ts` if no imports (grep showed none) to avoid confusion.
5. Repo-wide pass:
   - Run `deno task type-check`; fix remaining errors, especially any stragglers from the import rewrite.
   - Run `deno task lint` and `deno task sort` to normalize imports.
   - Run `deno task test:adaptive` and update paths in tests if needed.
6. Docs cleanup:
   - Update any code examples that still reference `src/types` or `src/constants` to point at `libraries/adaptive/{types,constants}` or local relative paths, as appropriate.

## How to verify today

- Build docs (ensures hydrate bundle and pages):

```sh
deno task --cwd docs build
```

- Run E2E (serves docs/dist on port 5556 and runs tests):

```sh
deno task --cwd docs test:e2e
```

## Backlog (post-stabilization, not blocking this commit)

- Replace SHA-256 with `blake3` for ID derivation when available; keep base58 length 12 (extend to 14 on same-page collision).
- Ensure `bytesToBigInt`/`digestBlakeLike` naming and placement conform to folder+index rule and consistent naming.
- Store folder audit for naming and API consistency; document persistence semantics.
- Expand bus: optional BroadcastChannel/WebSocket adapters behind feature flags.
- Temporal datatypes: prefer Temporal `PlainDate`, `PlainDateTime`, `ZonedDateTime` where applicable.

## References

- CLAUDE.md — rules and conventions.
- PLAN_OF_ATTACK.md — plan and locked decisions.
- TESTING.md — testing policy and expectations.

## Start here next session

Fix the comparator stubs first (they block type-check). Then wire MVP registries, remove `runtime/store.ts`, and run type-check/lint/tests. When green, proceed with Conventional Commits for the migration and fixes. Docs E2E are already green.
