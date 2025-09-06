# Parallel Toolkit Tasks (No Test Generator Required)

## The Strategy
While ONE AI builds the test generator (2 weeks), FOUR other AIs can work on these tasks immediately.

## Task Assignments

### 🤖 AI 1: Test Generator (Claude - Critical Path)
**Branch:** `ai/test-generator`
**Duration:** 2 weeks
**Dependencies:** None

```typescript
// Focus: scripts/test-generator/
- [ ] Build type signature parser
- [ ] Create property test generator
- [ ] Build algebraic law detector
- [ ] Create branch analyzer
- [ ] Build coverage validator
- [ ] Test on sample functions
- [ ] Run on all 874 functions
```

### 🤖 AI 2: Quick Fixes & Type System (GPT-4 or Claude)
**Branch:** `ai/toolkit-fixes`
**Duration:** 3-4 days
**Dependencies:** None
**Files to modify:**

```typescript
// Task 1: Add Future alias (5 minutes)
// File: libraries/toolkit/src/monads/future/index.ts
export type { Task as Future } from "../task/index.ts"
export { default as future } from "../task/task/index.ts"

// Task 2: Consolidate type locations (2 hours)
- Move all types from /monads/types/fp/ to /types/fp/
- Update all import paths
- Remove duplicate type definitions

// Task 3: Complete Writer monad (2 hours)
// Add to libraries/toolkit/src/monads/writer/:
- [ ] tell/index.ts
- [ ] listen/index.ts
- [ ] pass/index.ts
- [ ] censor/index.ts
- [ ] mapWriter/index.ts

// Task 4: Add DI to time functions (4 hours)
// Update all temporal functions to accept config:
const getCurrentTime = (config = { now: Date.now }) => () => config.now()

// Task 5: Document monadic overlaps (2 hours)
// Create: libraries/toolkit/docs/monadic-unification.md
```

### 🤖 AI 3: Manual Testing - High Priority Functions (GPT-4)
**Branch:** `ai/toolkit-manual-tests`
**Duration:** 1 week
**Dependencies:** None

```typescript
// Priority 1: Math functions (1-2 days)
// Path: tests/libraries/toolkit/simple/math/
- [ ] add/index.test.ts
- [ ] subtract/index.test.ts
- [ ] multiply/index.test.ts
- [ ] divide/index.test.ts
- [ ] modulo/index.test.ts
// ... 48 more

// Priority 2: Core Array operations (1-2 days)
// Path: tests/libraries/toolkit/simple/array/
- [ ] map/index.test.ts
- [ ] filter/index.test.ts
- [ ] reduce/index.test.ts
- [ ] flatMap/index.test.ts
- [ ] forEach/index.test.ts
// ... focus on most-used 30 functions

// Priority 3: Validation functions (2-3 days)
// Path: tests/libraries/toolkit/simple/validation/
- [ ] isNullish/index.test.ts
- [ ] isNumber/index.test.ts
- [ ] isString/index.test.ts
- [ ] isEmail/index.test.ts
// ... all 106 validators
```

### 🤖 AI 4: JSDoc & Examples (GPT-3.5 or GPT-4)
**Branch:** `ai/toolkit-docs`
**Duration:** 1 week
**Dependencies:** None

```typescript
// Task: Add examples to every function
// Template for each function:

/**
 * [Existing JSDoc]
 * 
 * @example
 * ```typescript
 * import add from "@sitebender/toolkit/add"
 * 
 * const add5 = add(5)
 * add5(3) // 8
 * 
 * // Curried for composition
 * pipe([
 *   add(10),
 *   multiply(2)
 * ])(5) // 30
 * ```
 */

// Priority order:
1. Most-used functions (map, filter, pipe, compose)
2. Complex functions needing clarification
3. Monadic types (show real use cases)
4. Edge case documentation
```

### 🤖 AI 5: Performance Benchmarking (GPT-4)
**Branch:** `ai/toolkit-benchmarks`
**Duration:** 1 week
**Dependencies:** None

```typescript
// Create: scripts/benchmarks/toolkit/
// For each category, create benchmark suite:

// math.bench.ts
Deno.bench("add", () => {
  add(1)(2)
})

Deno.bench("native +", () => {
  1 + 2
})

// array.bench.ts
Deno.bench("toolkit map", () => {
  map((x: number) => x * 2)([1, 2, 3, 4, 5])
})

Deno.bench("native map", () => {
  [1, 2, 3, 4, 5].map(x => x * 2)
})

// Generate performance report
// Create dashboard showing toolkit vs native performance
```

## Coordination Points

### Daily Sync Points
1. **Morning:** Check for merge conflicts
2. **Midday:** Share discoveries/blockers
3. **Evening:** Push changes, update status

### Shared Discoveries Document
Create `TOOLKIT_DISCOVERIES.md`:
```markdown
## Bugs Found
- [ ] multiply doesn't handle Infinity correctly
- [ ] isEmail regex misses edge cases

## Performance Issues
- [ ] cartesianProduct is O(n³) - needs optimization

## Missing Functions
- [ ] No transpose for matrices
- [ ] Missing chunk function for arrays
```

## Success Metrics

By end of Week 1:
- Test generator 50% complete (AI 1)
- All quick fixes done (AI 2)
- 200+ manual tests written (AI 3)
- 300+ functions with examples (AI 4)
- Benchmark suite operational (AI 5)

By end of Week 2:
- Test generator complete and running
- 400+ manual tests written
- All functions documented
- Performance report complete
- Ready to run generator on everything

## The Beautiful Outcome

When the test generator is ready in 2 weeks:
1. We'll already have 400+ manual tests
2. All quick fixes will be done
3. Documentation will be complete
4. Performance baselines established
5. Generator can focus on the remaining ~400 functions

This parallel approach means we'll have:
- **50% coverage from manual tests**
- **100% coverage from generator**
- **Full documentation**
- **Performance metrics**
- **Fixed type system**

All in the same 2 weeks!