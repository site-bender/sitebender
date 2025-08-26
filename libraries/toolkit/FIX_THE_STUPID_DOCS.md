# FIX THE STUPID DOCS - JSDoc Remediation Plan

## 🚀 QUICK START FOR NEXT SESSION
**Status**: 247/763 files complete (32.4%) - Phase 2 IN PROGRESS
**Completed**: Math ✅, Logic ✅, Combinator ✅, Conversion ✅, String ✅, Array (partial)
**Next**: Continue `array/` folder - 85 files remaining (38 done, 85 to go)
**Time**: Sessions 1-12 took ~280 minutes total
**Last Session**: Session 12 processed 10 array files (flatMap through init)
**Branch**: phase-2
**CRITICAL**: Process files ONE AT A TIME carefully - no shortcuts!

## IMPORTANT: Starting a New Session?

1. **READ THIS FILE FIRST** for context on what we're doing
2. **THEN READ `/CLAUDE.md`** for project rules (STRICT FP, no mutations, etc.)
3. **Continue from "Next Up" section below**
4. **Use the Task tool** for batch processing - process 10 files at a time
5. **WORK ONLY IN `libraries/toolkit/` folder - DO NOT TOUCH OTHER FOLDERS**
6. **Track time** with timestamps before/after each session

### CRITICAL REMINDERS FOR NEXT SESSION
- **BATCH SIZE**: Process exactly 10 files per batch using Task tool
- **CHECK FOR DUPLICATE TAGS**: Many files have @curried in description AND at bottom - remove duplicates!
- **@curried ONLY for functions that return functions**: Not all functions need @curried
- **Read files first**: Check existing tags before adding new ones
- **Fix imperative code**: Replace `for`, `while`, `let`, `forEach`, mutations with FP patterns
- **Reduce examples**: Most have 40-180 lines, reduce to 8-10 meaningful examples
- **@impure for stateful**: memoize, debounce, throttle, once, tap need @impure tag
- **@predicate for boolean returns**: Functions returning boolean get @predicate tag
- **Valid TypeScript only**: All examples must compile

## Executive Summary

**Total Functions to Fix**: 763 functions across `libraries/toolkit/src`
**Completed So Far**: 247/763 files (32.4%) - Phase 2 IN PROGRESS
**Average Time**: ~1.1 minutes per file
**Optimal Approach**: Process ONE FILE AT A TIME carefully (Task tool didn't work well)
**Next Session**: Continue `array/` folder from file #39 (insertAt)

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

#### Session Structure (Optimal approach)

1. **Batch Size**: 10 files per batch (multiple batches per session)
2. **Time per batch**: ~10-15 minutes when using Task tool
3. **Process with Task tool**:
   - Give Task tool clear instructions for all 10 files
   - Task reads each file first
   - Fixes @property tags → custom tags
   - Reduces examples to 8-10 essential ones
   - Rewrites examples in pure FP style
   - Removes invalid TypeScript examples
   - Uses MultiEdit for all changes

#### Folder Processing Order (by complexity)

1. **Phase 1 - Simple Functions** ✅ COMPLETE (209 files)
   - `math/` (54 files) ✅
   - `logic/` (13 files) ✅
   - `combinator/` (49 files) ✅
   - `conversion/` (16 files) ✅
   - `string/` (77 files) ✅

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

- **Total Sessions**: 12
- **Files Completed**: 247/763 (32.4%)
- **Total Time Spent**: ~280 minutes (4.7 hours)
- **Average Time per File**: 1.1 minutes
- **Estimated Completion**: ~14 hours total (at current pace)
- **Remaining Files**: 516 (85 in array, 431 in other folders)

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

### Session 7 - 2025-08-25 17:04-17:45 (Phase 1)
**Folder**: combinator/
**Files Processed**: ALL 49 files (apply, arity, binary, bind, call, complement, compose, composeAsync, constant, construct, constructN, converge, curry, curryN, debounce, flip, identity, juxt, lift, liftA2-5, liftBinary/Ternary/Unary, liftN, memoize*, nAry, nthArg, of, once, partial*, pipe*, tap, throttle, thunkify, tryCatch, unary, unless, until, useWith, when, wrap)
**Start Time**: 2025-08-25T17:04:15+12:00
**End Time**: 2025-08-25T17:45:07+12:00
**Duration**: 40.87 minutes
**Issues Fixed**:
- Replaced @property tags with @pure, @curried, @impure (for stateful functions), @idempotent
- Reduced examples from 40-130+ lines to 8-10 per function
- Fixed ALL imperative code:
  - composeAsync: replaced for loop with reduceRight
  - lift/liftA2-5/liftN: replaced nested for loops with flatMap/reduce
  - pipeAsync/pipeWith: replaced for loops with reduce
  - until: converted while loop to recursive implementation
- Added @impure for stateful functions (debounce, memoize*, once, tap, throttle)
- Removed duplicate @curried tags
**Notes**: Massive improvements in lift functions. Some had 130+ lines of examples!

### Session 8 - 2025-08-25 17:45-18:30 (Phase 1)
**Folder**: conversion/
**Files Processed**: ALL 16 files (toBoolean, toFloat, toInteger, toString, toPlainDate, toPlainDateTime, toPlainTime, toPrecision, castValue/index, safeParse, safeParseInt, safeParseFloat, fromJson, toJson, toPercent, stringify)
**Start Time**: 2025-08-25T17:45:07+12:00  
**End Time**: 2025-08-25T18:30:00+12:00
**Duration**: ~45 minutes
**Issues Fixed**:
- Replaced ~50 @property tags with @pure, @safe, @curried, @immutable
- Reduced examples from 40-145 lines to 8-10 per function
- Fixed duplicate @curried tags in safeParse, safeParseInt, toJson, toPrecision
- Removed all imperative code from examples
- Ensured valid TypeScript in all examples
**Notes**: Processed files individually for better quality control. Note that @curried only needed for functions that return functions.

### Session 9 - 2025-08-26 (Phase 1 COMPLETE!)
**Folder**: string/
**Files Processed**: ALL 77 files (65 main functions + 12 in toCase subfolder)
**Duration**: ~45 minutes
**Batches**: 7 batches using Task tool (10-16 files per batch)
**Issues Fixed**:
- Replaced ALL @property tags with @pure, @curried, @immutable, @safe, @predicate, @idempotent
- Reduced examples from 30-100+ lines to 8-10 per function
- Removed duplicate @curried tags throughout
- Fixed ALL imperative code in examples
- Added @predicate for boolean functions (contains, endsWith, startsWith, test)
- Added @idempotent for case conversion functions
**Notes**: PHASE 1 COMPLETE! Used Task tool for efficient batch processing. All 77 string functions now have proper JSDoc.

### Session 10 - 2025-08-26 (Phase 2 Started)
**Folder**: array/
**Files Processed**: 18 files (all through dropWhile)
- aperture ✓ (reduced 141→41 lines, replaced for loop)
- cartesianProduct ✓ (reduced 206→46 lines)
- chunk ✓ (reduced 85→40 lines)
- closest ✓ (reduced 94→41 lines)
- combinations ✓ (reduced 103→40 lines)
- compact ✓ (already clean)
- concat ✓ (already clean)
- concatTo ✓ (already clean)
- countBy ✓ (reduced 164→50 lines, replaced for loop)
- cycle ✓ (reduced 206→52 lines, replaced while/for with recursive generator)
- difference ✓ (reduced 81→46 lines)
- differenceWith ✓ (reduced 152→43 lines)
- drop ✓ (already clean, added tags)
- dropLast ✓ (already clean, added tags)
- dropRepeats ✓ (reduced 145→42 lines, replaced for loop)
- dropRepeatsWith ✓ (reduced 225→55 lines, replaced for loop)
- dropWhile ✓ (reduced 115→97 lines, added proper tags)
- endsWith (started, needs fixing - 204 lines with for loop)
**Duration**: ~45 minutes
**Issues Fixed**:
- Replaced @property tags with @pure, @curried, @immutable, @safe, @impure (for cycle)
- Reduced examples from 40-200+ lines to 8-10 per function
- Replaced ALL for/while loops with functional patterns (reduce, recursion, Array.from)
- Removed @curried from description lines (redundant)
**Notes**: Discovered Task tool doesn't do a thorough job - better to process ONE FILE AT A TIME carefully.

### Session 11 - 2025-08-26
**Folder**: array/
**Files Processed**: 10 files (endsWith through first)
- endsWith ✓ (fixed typo, reduced 204→34 lines, replaced for loop with every)
- filter ✓ (clean, just added tags)
- find ✓ (clean, just added tags)
- findDuplicates ✓ (reduced 134→44 lines, replaced for loop with reduce)
- findIndex ✓ (clean, just added tags)
- findIndices ✓ (reduced 204→46 lines, replaced for loop with reduce)
- findLast ✓ (clean, just added tags)
- findLastIndex ✓ (clean, just added tags)
- findMostCommon ✓ (reduced 157→55 lines, replaced forEach/for loops with reduce/filter)
- first ✓ (clean, just added tags)
**Duration**: ~27 minutes
**Issues Fixed**:
- Replaced @property tags with @pure, @curried, @immutable, @predicate, @idempotent
- Reduced examples from 40-200+ lines to 8-10 per function
- Replaced ALL imperative patterns (for loops, forEach) with functional approaches
- Fixed invalid TypeScript example in endsWith

### Session 12 - 2025-08-26
**Folder**: array/
**Files Processed**: 10 files (flatMap through init)
- flatMap ✓ (clean, just added tags)
- flatten ✓ (clean, just added tags)
- frequency ✓ (reduced 115→28 lines, replaced for loop with reduce)
- groupBy ✓ (reduced 109→39 lines, already functional)
- groupWith ✓ (reduced 217→50 lines, replaced for loop with reduce)
- head ✓ (clean, just added tags)
- includes ✓ (clean, just added tags)
- indexBy ✓ (reduced 253→47 lines, replaced for loop with reduce)
- indexOf ✓ (replaced for loop with findIndex)
- init ✓ (reduced 113→33 lines, already functional)
**Duration**: ~27 minutes
**Issues Fixed**:
- Replaced @property tags with @pure, @curried, @immutable, @predicate, @idempotent
- Reduced examples from 80-250+ lines to 8-10 per function
- Replaced ALL imperative patterns (for loops) with functional approaches
- All functions now use pure FP style

## Next Up: Phase 2 Continues

**Phase 1 ✅ COMPLETE** - All simple functions done!

**Phase 2 folders to process:**

1. `array/` (123 files) - IN PROGRESS
   - Completed: 38 files (aperture through init)
   - Next up: insertAt
   - Then: interleave, intersection, intersectionWith, intersperse, isEmpty, join, last, lastIndexOf, lastIndexOfMatch, map, mapAccum, mapAccumRight, maximumBy, minimumBy, move, none, nth, nub, nubBy, omit, pairwise, partition, partitionBy, permutations, pluck, range, rangeStep, reduce, reduceRight, reduceWhile, reject, remove, removeAll, removeAt, repeat, repeatItem, replaceAll, replaceAllMatches, replaceAt, replaceFirst, replaceFirstMatch, replaceLast, replaceLastMatch, reverse, rotateLeft, rotateRight, sample, sampleSize, scan, shuffle, slice, sliceFrom, sliding, slidingWithStep, some, sort, sortBy, sortWith, span, splitEvery, startsWith, subsequences, symmetricDifference, symmetricDifferenceWith, tail, take, takeLast, takeLastWhile, takeWhile, times, toSet, transpose, unflatten, unfold, union, unionWith, unique, unzip, update, xprod, zip, zipAll, zipObj, zipWith
   - Remaining: 85 files
2. `object/` (56 files)
3. `map/` (40 files)
4. `set/` (26 files)

## Start Date: 2025-08-25

## Target Completion: ~9 hours total work (not 76 sessions!)

---

_This plan will be updated after each session with progress metrics and time estimates._
