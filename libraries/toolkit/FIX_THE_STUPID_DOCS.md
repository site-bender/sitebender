# FIX THE STUPID DOCS - JSDoc Remediation Plan

## Executive Summary

**Total Functions to Fix**: 763 functions across `libraries/toolkit/src`
**Estimated Total Time**: 38-76 hours (5-10 minutes per function)
**Approach**: Batch processing, 10 files per session

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
 */
```

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

- **Total Sessions**: 4
- **Files Completed**: 40/763
- **Total Time Spent**: 30.3 minutes
- **Average Time per File**: 0.76 minutes
- **Estimated Completion**: ~9.7 hours total (at current pace)

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

## Start Date: 2025-08-25

## Target Completion: ~9 hours total work (not 76 sessions!)

---

_This plan will be updated after each session with progress metrics and time estimates._
