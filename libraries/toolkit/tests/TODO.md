# Toolkit Tests – 100% Behavior Coverage Plan

Status: draft
Owner: toolkit test suite
Scope: libraries/toolkit/tests only (no code moves yet)

Prime directive reminders
- Test behaviors, not implementation details
- No mocking of our own code; DI at boundaries (DOM, time, RNG, IO)
- One behavior per folder; test file is always `index.ts`
- Library code uses relative imports only; strict TS; tabs; 80-char lines

Current snapshot (high level)
- ~380 behavior tests present
- Strong: array behaviors; algebraic/math (laws + functions); tri g; some statistics; pipe; monad laws (maybe/either); null-safety; helpers (assertions/generators)
- Gaps: temporal, string, object, map, set, combinator, lens, logic, async, tuple, conversion, special, geometry, interpolation, matrix, finance, activation, result/io law tests, randomness beyond randomBoolean
- Inconsistencies: `array` vs `arrays`; `statistics` vs `statistical`; `boundary/clamp` vs `algebraic/bounded/clamp`; nested duplicate path: `libraries/toolkit/libraries/toolkit/tests/...`

Goals
- Behavioral coverage: 100% of exposed functions/ADTs
- Code coverage: ≥80% (≥90% for frequently used primitives: array, string, object, temporal)
- Suite runtime: fast (sub-30s locally for toolkit; individual tests <100ms where practical)

Proposed canonical test taxonomy (behavior-first)
- arrays → array (singular, mirrors src/simple/array)
- statistics/stats → statistics (mirrors src/simple/statistics)
- math/algebraic: keep `algebraic` as umbrella with sub-domains (identity/associative/commutative/…)
- Prefer these top-level roots (create as needed):
  - array, object, string, map, set
  - algebraic (number-theory, rounding, exponential, roots, combinatorial, etc.)
  - statistics, trigonometry, geometry, interpolation, matrix
  - temporal
  - validation
  - combinator, lens, logic, async, tuple
  - conversion
  - special, finance, activation
  - random (distribution, bounds, reproducibility)
  - functional (laws, composition)
  - error-handling (null-safety, result/either patterns)
  - helpers (assertions, generators)

Naming and structure conventions
- Path mirrors behavior domain first, not the implementation module path
- Use singular folder names (array/string/object/map/set/statistics)
- For law tests use: `functional/monad-laws/<type>/index.ts`, `functional/equational/<topic>/index.ts`
- For algebraic properties of numeric ops use: `algebraic/<property>/<op>/index.ts`
- Keep all tests for a behavior in the same `index.ts` (mix property-based and example tests)

Do-now cleanup (non-destructive; no file moves yet)
- Mark anomalies:
  - [x] arrays vs array (arrays/ includes 4 behaviors; array/ includes 100+)
  - [x] statistical vs statistics (statistical/: average/median/mode; statistics/: variance/stdev)
  - [x] boundary/clamp vs algebraic/bounded/clamp (preferring algebraic/bounded)
  - [x] nested duplicate path `libraries/toolkit/libraries/toolkit/tests/...` (empty duplicate test present)
- Add a mapping table (below) before executing any moves in a dedicated refactor PR

Planned migration steps (to be executed in a separate PR)
1) Create mapping doc from current → canonical paths; agree on canonical names
2) Batch-move folders with git to preserve history; no content edits
3) Fix any import paths within tests (if relative test utilities moved)
4) Run fmt/lint/check/tests; ensure green; update any task glob patterns
5) Remove stray nested `libraries/toolkit/libraries/toolkit/tests` copy if confirmed duplicate

Prioritized gap-fill roadmap
P0 – high impact, foundational
- [ ] Temporal behaviors (DST, offsets, parsing, add/subtract, start/end-of, serialization)
- [ ] Result laws and behaviors (map/chain/bimap/fold/orElse/tryCatch invariants)
- [x] IO behaviors and laws (map/ap/chain, conversions to/from Maybe/Either/Result) — added IO monad laws + conversions/applicative behavior tests

P1 – core primitives and heavy usage
- [ ] String behaviors (case conversions, normalize, escape/unescape, replace*, split*, template)
- [ ] Object behaviors (lens laws, assoc/dissoc, path/view/over immutability)
- [ ] Map/Set behaviors (set algebra laws; frequency/partition/group correctness)
- [ ] Random suite (randomInteger/Float/Choice/Subset/String/generateShortId; distribution + bounds + reproducibility)

P2 – composition and boundaries
- [ ] Combinators (compose/pipe equivalences; curry/uncurry; lift laws; memoize contracts)
- [ ] Logic (truth tables; De Morgan; implies/iff identities)
- [ ] Lens (composeLens laws; lensEq/Gte/Lte correctness)
- [ ] Async (timeout/retry/parallel/series/waterfall/whilst determinism; DI clock)
- [ ] Conversion (safeParse*, castValue*, toJson/fromJson; round-trip and error modes)

P3 – numerical/advanced domains
- [ ] Geometry/interpolation/matrix (tolerances, known identities, shape constraints)
- [ ] Special functions (erf/erfc/gamma/beta/besselJ; golden values within epsilon)
- [ ] Finance (NPV/IRR/PV/FV/payment/annuity; reference examples; rounding rules)
- [ ] Activation functions (monotonic regions, ranges, invariants; numerical stability)

Testing strategies and contracts (by area)
- Temporal
  - Use fixed TZ fixtures (e.g., America/New_York, Europe/Berlin, Asia/Kolkata)
  - Cover DST start/end transitions; ambiguous/invalid local times; leap years
  - Contracts: pure transformations; no mutation; compare against Temporal API expectations
- Random
  - DI a seedable RNG (pass via config) for deterministic tests
  - Distribution sanity (uniformity within tolerance) + boundary/value range assertions
- Numeric (math/statistics/geometry/matrix/special/finance)
  - Use property-based invariants (commutativity/associativity/idempotence/etc.) where applicable
  - Compare against golden values with explicit epsilon per function
  - Document precision/rounding expectations in each test
- String
  - Round-trips: escape⟷unescape, toCase⟷normalize, template variable safety
  - Unicode and normalization edge cases
- Object/Lens/Map/Set
  - Lens laws: get-put, put-get, put-put
  - Immutability: inputs unchanged; deep copy semantics where expected
  - Set algebra properties: associativity, commutativity, identity, absorption, distributivity
- Combinator/Logic/Async
  - Equational reasoning for compose/pipe/useWith/juxt/converge
  - Truth-table driven tests for logic; De Morgan’s, XOR parity
  - Async: fake clock via DI; concurrency caps; cancellation/timeout edges

Quality gates
- Add coverage threshold gates in CI (library-level):
  - Overall ≥80%; primitives (array/string/object/temporal) ≥90%
- Keep tests fast; avoid unnecessary large random samples; use property-based shrinkers
- Enforce naming and location rules via simple scripts (later PR)

Behavior→Test coverage checklist (living list)
- Temporal: [ ]
- Result: [ ]
- IO: [ ]
- String: [ ]
- Object: [ ]
- Map: [ ]
- Set: [ ]
- Random: [ ]
- Combinator: [ ]
- Logic: [ ]
- Lens: [ ]
- Async: [ ]
- Conversion: [ ]
- Geometry: [ ]
- Interpolation: [ ]
- Matrix: [ ]
- Special: [ ]
- Finance: [ ]

Admin and safety
- Do not move or delete any files until a dedicated refactor PR
- Coordinate with parallel AI efforts; small PRs; keep green between steps
- After each behavior suite added or moved: run fmt/lint/type-check/tests locally

Appendix – canonical path examples
- array/partitionBy/index.ts (behavioral partitioning of arrays)
- algebraic/commutative/add/index.ts (law over add)
- functional/monad-laws/result/index.ts (monad/applicative laws)
- temporal/dst-transitions/index.ts (DST edge coverage)
- random/randomInteger/index.ts (distribution + reproducibility)

Mapping table (current → canonical)
- tests/behaviors/arrays/* → tests/behaviors/array/*
- tests/behaviors/statistical/* → tests/behaviors/statistics/*
- tests/behaviors/boundary/clamp/* → tests/behaviors/algebraic/bounded/clamp/*
- libraries/toolkit/libraries/toolkit/tests/**/* → remove (confirmed duplicate path; keep only tests/behaviors under libraries/toolkit/tests)

Notes
- Defer all file moves/deletes to a dedicated refactor PR. For the stray nested duplicate test file, verify no references and delete during that PR.
- After migration, update any coverage scripts or globs to match canonical paths.
