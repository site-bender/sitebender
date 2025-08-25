# FIX THE STUPID DOCS - JSDoc Remediation Plan

## IMPORTANT: Starting a New Session?

1. **READ THIS FILE FIRST** for context on what we're doing
2. **THEN READ `/CLAUDE.md`** for project rules (STRICT FP, no mutations, etc.)
3. **Continue from "Next Up" section below**
4. **Use the Task tool** for batch processing (much faster!)
5. **Track time** with timestamps before/after each session

## Executive Summary

**Total Functions to Fix**: 763 functions across `libraries/toolkit/src`
**Actual Time (so far)**: ~0.73 minutes per file (much faster than estimated!)
**Approach**: Batch processing, 10-15 files per session using Task tool

## Problems Identified

### 1. CRITICAL: Non-FP Examples in FP Library

- **336 files** contain imperative code in examples
- Found 882+ occurrences of:
  - `let` declarations (should be `const`)
  - `for` loops (should use FP iteration)
  - Mutating array methods (`.push()`, `.pop()`, `.splice()`, etc.)
  - Increment/decrement operators (`++`, `--`)
  - `.forEach()` (should use `.map()`, `.reduce()`, etc.)

### 2. Invalid TypeScript Examples

- Examples show impossible type usage (e.g., passing strings to number-only parameters)
- Runtime validation code that TypeScript would prevent at compile time
- Misleading users about function capabilities

### 3. Excessive Examples

- Some functions have 50+ examples (e.g., `add` has ~170 lines of examples!)
- Slows down test creation (every example must be tested)
- Most examples are:
  - **Redundant** - showing the same concept multiple times
  - **Trivial** - adding no educational value
  - **Overly niche** - edge cases nobody will encounter
- Need to reduce to 8-12 meaningful examples per function

### 4. Incorrect @property Tag Usage

- Misusing `@property` for function characteristics
- Should be custom tags: `@pure`, `@curried`, `@idempotent`, etc.
- Inconsistent capitalization (idempotent vs Pure)

### 5. Missing Type Guards in Examples

- Examples don't show proper FP error handling patterns
- Should demonstrate Result/Either/Maybe usage where appropriate

## Fix Strategy

### Custom JSDoc Tags to Implement

```typescript
/**
 * @pure - Function has no side effects
 * @curried - Function is curried for partial application
 * @idempotent - f(f(x)) = f(x)
 * @commutative - f(a, b) = f(b, a)
 * @associative - f(f(a, b), c) = f(a, f(b, c))
 * @immutable - Does not modify inputs
 * @predicate - Returns boolean (for is* functions)
 * @safe - Returns NaN/null/empty for invalid inputs
 * @impure - Has side effects (for random functions)
 */
```

### KEY REMINDERS FOR NEW SESSIONS

- **WORK ONLY IN** `libraries/toolkit/` folder
- **Use Task tool** for batch processing (10x faster!)
- **Remove ALL imperative code** - no let, for, while, forEach, mutations
- **Fix invalid TypeScript** - don't show strings passed to number params
- **8-12 examples max** - remove trivial, duplicative, niche examples
- **Track timestamps** before/after each session

### Example Guidelines

1. **Target 8-12 examples per function** (fewer for simple functions)
2. **Remove these types of examples**:
   - **Useless/trivial** - examples that add no value
   - **Duplicative** - examples showing the same concept repeatedly
   - **Ridiculously niche** - overly specific edge cases nobody will use
   - **Invalid TypeScript** - examples that won't compile
3. **Keep only essential examples**:
   - Basic usage (1-2 examples)
   - Common use cases (2-3 examples)
   - Important edge cases (1-2 examples)
   - Composition/partial application (1-2 examples)
   - One complex real-world usage
4. **Pure FP style only**:
   - Use `const` exclusively
   - Use recursion or FP methods (map, reduce, filter)
   - Show composition and partial application
   - No mutation, no side effects
5. **Valid TypeScript only** - examples must compile

### Batch Processing Plan

#### Session Structure (Target: 2 hours per session)

1. **Batch Size**: 10 files per session
2. **Time per file**: ~10-12 minutes
3. **Process**:
   - Read file
   - Fix @property tags → custom tags
   - Reduce examples to 5-7 essential ones
   - Rewrite examples in pure FP style
   - Remove invalid TypeScript examples
   - Save and verify

#### Folder Processing Order (by complexity)

1. **Phase 1 - Simple Functions** (200 files, ~20 sessions)
   - `math/` (54 files) - mostly pure, simple fixes
   - `logic/` (13 files) - boolean operations
   - `combinator/` (49 files) - already FP-focused
   - `conversion/` (16 files) - type conversions
   - `string/` basic operations (30 files)

2. **Phase 2 - Medium Complexity** (300 files, ~30 sessions)
   - `array/` (123 files) - lots of imperative examples to fix
   - `object/` (56 files) - object manipulation
   - `map/` (40 files) - Map operations
   - `set/` (26 files) - Set operations

3. **Phase 3 - Complex/Domain** (263 files, ~26 sessions)
   - `validation/` (106 files) - extensive examples to trim
   - `temporal/` (79 files) - date/time operations
   - `geometry/`, `physics/`, `finance/` (30 files)
   - `matrix/`, `statistics/`, `special/` (31 files)
   - Remaining folders

## Tracking Template

### Session Log

```markdown
## Session N - [Date Time]

**Folder**: [folder name]
**Files Processed**: [list]
**Start Time**: [ISO timestamp]
**End Time**: [ISO timestamp]
**Duration**: [minutes]
**Issues Fixed**:

- Replaced N @property tags
- Reduced examples from X to Y
- Fixed N imperative patterns
- Removed N invalid TypeScript examples
  **Notes**: [any special cases]
```

### Running Totals

- **Total Sessions**: 6
- **Files Completed**: 67/763 (MATH + LOGIC FOLDERS COMPLETE!)
- **Total Time Spent**: ~50 minutes
- **Average Time per File**: 0.75 minutes
- **Estimated Completion**: ~9.5 hours total (at current pace)

## Quality Checklist per File

- [ ] All @property tags converted to custom tags
- [ ] Examples reduced to 8-12 essential ones (fewer for simple functions)
- [ ] Removed all useless/trivial examples
- [ ] Removed all duplicative examples
- [ ] Removed ridiculously niche examples
- [ ] All examples use pure FP style (const only, no mutations)
- [ ] All examples are valid TypeScript
- [ ] Examples demonstrate key use cases and edge cases
- [ ] Examples show composition where relevant
- [ ] No `let`, `for`, `forEach`, `++`, `--`, `.push()`, etc.

## Example Transformation

### Before (BAD):

```typescript
/**
 * @property Immutable - doesn't modify input
 * @example
 * let result = [];
 * for (let i = 0; i < arr.length; i++) {
 *   result.push(transform(arr[i]));
 * }
 *
 * // Invalid TypeScript
 * add("5")(3) // NaN
 */
```

### After (GOOD):

```typescript
/**
 * @pure
 * @immutable
 * @curried
 * @example
 * // Basic usage
 * const result = map(transform)(arr)
 *
 * // Composition
 * const pipeline = pipe(
 *   filter(isValid),
 *   map(transform),
 *   reduce(combine, initial)
 * )
 *
 * // Edge cases
 * map(fn)(null) // []
 * map(fn)([])   // []
 */
```

## Success Metrics

- Zero imperative code in examples
- All examples compile with TypeScript strict mode
- Average 8-12 examples per function (fewer for simple functions)
- Removed all redundant, trivial, and overly niche examples
- Consistent use of custom JSDoc tags
- Test suite can run all examples efficiently

## Session Logs

### Session 1 - 2025-08-25 15:53-16:00 (Phase 1)

**Folder**: math/
**Files Processed**: absoluteValue, add, average, binomialCoefficient, ceiling, clamp, cubeRoot, decrement, digitSum, divide
**Start Time**: 2025-08-25T15:53:10+12:00
**End Time**: 2025-08-25T16:00:24+12:00
**Duration**: 7.23 minutes
**Issues Fixed**:

- Replaced ~30 @property tags with @pure, @curried, @idempotent, @safe
- Reduced examples from avg 40+ to 8-10 per function
- Fixed ~15 imperative patterns (for loops, let declarations)
- Removed ~20 invalid TypeScript examples
  **Notes**: Much faster than expected! Used Task tool for batch processing last 6 files.

### Session 2 - 2025-08-25 16:03-16:09 (Phase 1)

**Folder**: math/
**Files Processed**: divisors, exponential, factorial, fibonacci, floor, gcd, geometricMean, harmonicMean, inRange, increment
**Start Time**: 2025-08-25T16:03:16+12:00
**End Time**: 2025-08-25T16:09:03+12:00
**Duration**: 5.77 minutes
**Issues Fixed**:

- Replaced ~40 @property tags with @pure, @curried, @safe, @idempotent, @commutative, @associative
- Reduced examples from avg 150+ lines to 8 per function (massive reduction!)
- Removed ALL imperative patterns (for/while loops, let, mutations, ++/--)
- Removed invalid TypeScript examples
  **Notes**: Even faster with batch processing! Some files had 250+ lines of examples.

### Session 3 - 2025-08-25 16:13-16:20 (Phase 1)

**Folder**: math/
**Files Processed**: isEven, isOdd, isPrime, lcm, logarithm, logarithmBase10, max, maxBy, mean, median
**Start Time**: 2025-08-25T16:13:18+12:00
**End Time**: 2025-08-25T16:20:21+12:00
**Duration**: 7.05 minutes
**Issues Fixed**:

- Replaced @property tags with @pure, @predicate (for is* functions), @curried, @safe
- Reduced examples from 40+ to 8-10 per function
- Removed imperative patterns (for/while loops, let, mutations)
- Removed invalid TypeScript examples
  **Notes**: Added @predicate tag for boolean-returning is* functions.

### Session 4 - 2025-08-25 16:21-16:31 (Phase 1)

**Folder**: math/
**Files Processed**: min, minBy, mode, modularExponentiation, modulo, multiply, negate, permutations, power, primeFactorization
**Duration**: 10.25 minutes
**Notes**: Fixed imperative implementations in modularExponentiation, permutations, primeFactorization

### Session 5 - 2025-08-25 16:32-16:40 (Phase 1)

**Folder**: math/
**Files Processed**: product, quadratic, random, randomInteger, rootMeanSquare, round, sign, squareRoot, subtract, sum, totient, truncate
**Duration**: 8.83 minutes
**Notes**: COMPLETED math/ folder (54 files total)!

### Session 6 - 2025-08-25 16:41-17:04 (Phase 1)

**Folder**: logic/
**Files Processed**: and, cond, defaultTo, ifElse, iff, implies, nand, nor, not, or, unless, when, xor
**Start Time**: 2025-08-25T16:41:00+12:00
**End Time**: 2025-08-25T17:04:15+12:00
**Duration**: 23.25 minutes
**Issues Fixed**:

- Fixed duplicate @curried tags in multiple files
- Replaced @property tags with @pure, @curried, @predicate, @commutative, @associative
- Reduced examples from 50-180 lines to 8-10 per function
- Fixed imperative code in cond (replaced for loop with find)
- Removed invalid TypeScript examples
  **Notes**: Caught duplicate @curried issue early thanks to user feedback. More careful approach paid off.

### Session 7 - 2025-08-25 17:24-17:30 (Phase 1)

**Folder**: combinator/ (partial)
**Files Processed**: constructN, converge, curry, curryN, debounce, flip, identity, juxt, lift, liftA2
**Start Time**: 2025-08-25T17:24:00+12:00
**End Time**: 2025-08-25T17:30:00+12:00  
**Duration**: 6.0 minutes
**Issues Fixed**:

- Removed duplicate @curried tags
- Replaced @property tags with @pure, @curried, @impure (debounce), @idempotent (identity)
- Reduced examples from 120+ to 8-10 per function (massive reduction in lift/liftA2)
- Fixed imperative code in lift and liftA2 (replaced for loops with functional reduce/flatMap)
- Removed invalid TypeScript examples
  **Notes**: Very fast session targeting specific functions. Debounce correctly marked @impure for side effects.

## Next Up: Phase 1 Continues

**Next folders to process:**

1. ~~`logic/` (13 files) - COMPLETE~~
2. `combinator/` (39 files remaining) - already FP-focused
3. `conversion/` (16 files) - type conversions
4. `string/` basic operations (30 files)

## Start Date: 2025-08-25

## Target Completion: ~9 hours total work (not 76 sessions!)

---

_This plan will be updated after each session with progress metrics and time estimates._
