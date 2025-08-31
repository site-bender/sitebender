## @sitebender/toolkit

Functional, dependency-free utilities for Sitebender apps. One function per folder, fully typed, curried, and designed for composition across browser, Deno, and Node runtimes.

This README is user-facing: it explains how to use the toolkit today and what’s planned next. A short checklist of known fixes appears below so you can track what’s being tightened up.

## Design principles

- Zero dependencies in library code
- One exported function per folder (`index.ts`), with focused JSDoc examples
- Pure functions by default: no mutation, referential transparency, curried APIs
- Relative imports only inside the repository
- Progressive enhancement for runtimes (use standards like Temporal when available)

## Folder structure

- `src/simple/**` – plain value functions (arrays, strings, async, validation, temporal, etc.)
- `src/chainable/**` – monadic/result-first companions that mirror `simple` (exists, currently empty)
- `src/types/**` – core FP types (Maybe, Either, Result, IO) and shared type utilities
- `tests/**` – behavior-first and property-based tests organized by capability

Note on chainable: `src/chainable` is present but empty. The intent is to provide result-first, chainable variants with the same names as `simple`, delegating where possible.

## Usage

- The library favors curried, data-last functions. Compose with your own `pipe/compose` or the ones provided in the toolkit.
- Temporal utilities rely on the TC39 Temporal proposal. Availability depends on your runtime; when not present, functions try to degrade gracefully or document constraints.

Minimal examples (paths may vary depending on your build/export setup):

```ts
// Array
import chunk from "./src/simple/array/chunk/index.ts"
const groups = chunk(3)([1, 2, 3, 4, 5, 6, 7]) // => [[1,2,3],[4,5,6],[7]]

// Async
import retry from "./src/simple/async/retry/index.ts"
await retry({ attempts: 3, delayMs: 100 })(() => fetch("/api"))
```

## Chainable roadmap (Result-first)

Goal: mirror every `simple` function in `chainable` with the same name and a Result/Either-powered signature for safe composition. Highlights:

- Use Result as the default error carrier for ergonomic chaining
- Reuse `simple` implementations internally; add only the error/context glue
- Short-circuit on failure; preserve error context and types

Example shape (illustrative only):

```ts
// simple/array/map: (fn) => (xs) => ys
// chainable/array/map: (fn) => (xs: Result<E,T[]>) => Result<E,R[]>
```

Initial targets: core array ops (map/filter/reduce/flatMap), common string/parse helpers, and async helpers.

## Known issues and planned fixes (functions)

These items are queued for small, focused PRs:

- Temporal format: docs vs. behavior mismatch for PlainDate (UTC vs. local). Align code and docs or provide an explicit option.
- URL validator: IPv6 localhost should allow "::1" (disallow list currently expects "[::1]").
- Form validation: `validateForm` should delegate to existing `isEmail`/`isUrl` validators instead of inlining checks.
- Type guard: `types.isValue` is broader than the declared `Value` union; align the guard or narrow the union.
- Events bus: reuse the local bus instance within `createBroadcastBus` instead of constructing a new one per subscribe.
- Stray files: remove editor-temp file at `simple/array/zipAll/.!80150!index.ts`.

## Test suite status and planned fixes (tests)

The suite is behavior-first with property tests in key areas. Planned work:

- Add/expand tests for validators (email/url/phone/ip/uuid/postal/json), including edge cases and international inputs
- Temporal coverage: formatting/parse/compare/add-round-diff against local vs UTC behaviors
- Strings: sanitize/slugify invariants; round-trip and safety properties
- Events: local vs broadcast bus behavior and cross-tab propagation
- Result/IO: practical usage and error-propagation paths
- Hygiene: relocate the stray test file `src/simple/validation/not/index.test.ts` into the tests tree

## Contributing notes

- Keep functions tiny and single-purpose; prefer composition over options bloat
- Reuse existing validators/utilities instead of re-implementing logic
- Favor explicit types and sound type guards; prefer Result for recoverable errors
- Add JSDoc with executable examples and at least one property-based test when practical

## Status

This library is in active evolution on the `phase-2` branch. The `chainable` layer is prepared and will be filled incrementally. If you hit gaps, please open an issue with a minimal example and runtime details.
