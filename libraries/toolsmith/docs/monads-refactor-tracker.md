# Toolsmith Monads Refactor Tracker

Purpose: Keep a durable, repo-local checklist that mirrors the Validation module’s standard and tracks progress per monad. Link me to this file in future sessions and I’ll continue from the current state.

## Non‑negotiables

- No barrel files; import by path for tree-shaking.
- Curried, inference-first APIs (data-last for good left-to-right inference).
- Guards-first: use `is*` type guards in control flow and tests.
- Envoy doc blocks in source examples: multi-line `/*??` with each line prefixed by `|`.
- Validation keeps structured errors: `NonEmptyArray<ValidationError>`.

## Reference (gold standard)

- Validation module (locked): `libraries/toolsmith/src/monads/validation/`
  - README: `libraries/toolsmith/src/monads/validation/README.md`
  - Mirrors required API (map, chain, fold, bimap, mapErrors, getOrElse, orElse) and accumulation ops (validateAll, combineValidations)
  - Canonical Deno.test style using std assert/expect

## “Definition of done” per monad

- README mirrors Validation sections and uses Envoy pipe doc blocks
- Ops parity for that monad (map, chain, fold, getOrElse, orElse, bimap, domain-specific ops)
- Type guards implemented (`is*`) and used in tests
- Tests: minimal unit tests, guard narrowing checks, edge behavior; light property tests only if helpful
- No barrels; import-by-path only
- Quality gates green: fmt, lint, tests

## How to run gates

```sh
# From repo root
deno task fmt:check
deno task lint
# Toolsmith tests only
deno task --cwd libraries/toolsmith test
# Or strict toolsmith tests
deno task test:toolsmith:strict
```

## Envoy pipe codemod (idempotent)

```sh
# Dry run (default roots)
deno run -A scripts/codemods/migrateEnvoyPipeBlocks/index.ts --dry
# Apply (default roots)
deno run -A scripts/codemods/migrateEnvoyPipeBlocks/index.ts
# Limit scope
deno run -A scripts/codemods/migrateEnvoyPipeBlocks/index.ts libraries/toolsmith/src/monads
```

## Module inventory and status

Legend: [x] done · [ ] pending

- validation (locked reference)
  - [x] README
  - [x] API parity (reference)
  - [x] Guards
  - [x] Tests
  - [x] Envoy doc blocks
  - [x] No barrels
  - [x] Gates green

- either
  - [x] README (updated to general two-branch semantics)
  - [x] API parity (map, chain, fold, getOrElse, orElse, bimap, mapLeft, tryCatch, fromNullable)
  - [x] Guards (`isRight`, `isLeft`) verified in tests
  - [x] Tests added/green
  - [ ] Envoy doc blocks checked
  - [x] No barrels
  - [ ] Gates green

- result
  - [x] README (error handling semantics)
  - [x] API parity (ok/err, map, chain, fold, getOrElse, orElse, bimap, mapErr, tryCatch)
  - [x] Guards (`isOk`, `isErr`) verified in tests
  - [x] Tests added/green
  - [ ] Envoy doc blocks checked
  - [x] No barrels
  - [ ] Gates green

- maybe
  - [x] README
  - [x] API parity (just/nothing, map, chain, fold, getOrElse, orElse, fromNullable, toEither)
  - [x] Guards (`isJust`, `isNothing`) verified in tests
  - [x] Tests added/green
  - [ ] Envoy doc blocks checked
  - [x] No barrels
  - [ ] Gates green

- option
  - [x] README (thin shim guidance)
  - [ ] API parity aligned with Maybe
  - [ ] Guards/tests as appropriate
  - [ ] Envoy doc blocks checked
  - [ ] No barrels
  - [ ] Gates green

- io
  - [x] README (stub)
  - [ ] API parity (of, map, chain, runIO, interop)
  - [ ] Tests
  - [ ] Envoy doc blocks
  - [ ] No barrels
  - [ ] Gates green

- task / future
  - [x] READMEs (stubs)
  - [ ] API parity (of, map, chain, delay, run)
  - [ ] Tests (async, no implicit execution)
  - [ ] Envoy doc blocks
  - [ ] No barrels
  - [ ] Gates green

- reader
  - [x] README (stub)
  - [ ] API parity (of, map, chain, ask, asks, local)
  - [ ] Tests (env threading)
  - [ ] Envoy doc blocks
  - [ ] No barrels
  - [ ] Gates green

- state
  - [x] README (stub)
  - [ ] API parity (of, map, chain, get, put, modify, evalState, execState)
  - [ ] Tests (state threading)
  - [ ] Envoy doc blocks
  - [ ] No barrels
  - [ ] Gates green

- writer
  - [x] README (stub)
  - [ ] API parity (WriterM helpers, map/chain, tell/run)
  - [ ] Tests (log accumulation)
  - [ ] Envoy doc blocks
  - [ ] No barrels
  - [ ] Gates green

- do* helpers (doEither, doMaybe, doNotation, doNotationWithInspect, doNotationWithTap, doState, doTask, tap)
  - [ ] READMEs (as needed)
  - [ ] Examples with Envoy doc blocks
  - [ ] Tests cover happy-path composition
  - [ ] No barrels
  - [ ] Gates green

## Working notes and decisions

- Either vs Result semantics: Either is a general two-branch choice; Result is for success/failure with short-circuiting. Validation is for accumulation. Maybe is for optional.
- Prefer “left-to-right inference” signatures across helpers.
- Keep property-based tests light; they’re temporary until Logician lands.

## Progress log

- 2025-09-11: READMEs added/updated for either, maybe, result, option; stubs for io/task/future/reader/state/writer. Envoy doc style page added in docs app.
- 2025-09-11 (later): Added behavior test suites for either/result/maybe; fixed import paths; verified guards; updated orElse signature; integrated isNullish in fromNullable helpers; tracker updated.

---

Maintenance tip: In future sessions, tell me to “open `libraries/toolsmith/docs/monads-refactor-tracker.md` and continue.” I’ll use this checklist and log to pick up exactly where we left off.
