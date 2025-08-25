# Testing Implementation Session Context for @sitebender/toolkit

## Overview
This document provides context for continuing the comprehensive testing implementation for the @sitebender/toolkit library. The library is a pure functional programming utility library with zero dependencies, consisting of mathematical functions, array/string operations, monadic types (Either, Maybe, Result), and IO operations.

## Current Testing Status (Updated: 2025-08-25)

**Overall Progress: 12.3% tested (105/854 functions with 100% coverage)**

### Latest Session Achievements (2025-08-25 - Session 8)
- Added comprehensive tests for 4 array search/index functions with 100% coverage:
  - `includes` - Checks if array contains element
  - `indexOf` - Returns index of first occurrence of element (FIXED to handle NaN)
  - `lastIndexOf` - Returns index of last occurrence of element (FIXED to handle NaN)
  - `findLastIndex` - Finds index of last element that satisfies predicate
- **CRITICAL FIX**: Rewrote `indexOf` and `lastIndexOf` to use `Object.is()` instead of native methods:
  - Now correctly finds NaN values (native methods cannot)
  - Now distinguishes between -0 and +0
  - Now finds undefined in sparse arrays
  - Functions are now mathematically correct and more reliable for FP
- Fixed issues:
  - Fixed TypeScript type issues with mixed-type arrays
  - Fixed linting issues with sparse array annotations and unused variables
  - Updated all tests to expect correct NaN behavior
- All 102 tests passing (1081+ total tests)
- **Important Achievement**: Our indexOf/lastIndexOf are now superior to native JavaScript implementations

### Previous Session Achievements (2025-08-25 - Session 7)
- Added comprehensive tests for 4 array functions with 100% coverage: tail, last, init, nth. Fixed type issue in init function and regression in sort test with fc.anything().

### Earlier Session Achievements (2025-08-24 - Session 6)
- Added comprehensive tests for 7 array functions with 100% coverage: reverse, sort, nub/unique, drop, dropLast, head/first. Fixed NaN handling and sparse array edge cases.

### Earlier Session Achievements (2025-08-24 - Session 5)
- Added comprehensive tests for 6 array transformation functions with 100% coverage: map, reduce, flatten, concat, slice, take. Fixed sparse array handling and verified currying patterns.

### Earlier Session Achievements (2025-08-24 - Session 4)
- Added comprehensive tests for 6 array predicate and search functions with 100% coverage: all, some, none, find, findIndex, findLast. Fixed sparse array handling edge cases.

### Functions with 100% Coverage (105 total)
- **Math (47)**: absoluteValue, add, binomialCoefficient, ceiling, clamp, combinations, cubeRoot, decrement, digitSum, divide, divisors, exponential, factorial, fibonacci, floor, gcd, geometricMean, harmonicMean, increment, inRange, isEven, isOdd, isPrime, lcm, logarithm, logarithmBase10, max, min, multiply, negate, permutations, power, primeFactorization, product, quadratic, round, sign, squareRoot, subtract, sum, totient, truncate
- **Statistical (5)**: average, median, mode, standardDeviation, variance
- **Trigonometry (6)**: cosine, degreesToRadians, hypotenuse, radiansToDegrees, sine, tangent
- **Array (29)**: all, chunk, concat, drop, dropLast, filter, find, findIndex, findLast, findLastIndex, first, flatten, head, includes, indexOf, init, last, lastIndexOf, map, none, nth, nub, reduce, reverse, slice, some, sort, tail, take, unique
- **Combinators (1)**: pipe
- **Monads (10)**: Either (chain, isLeft, left, map, right), Maybe (chain, isNothing, just, map, nothing)
- **Random (1)**: randomBoolean
- **Partial Coverage (1)**: modulo (90.6%)

### Key Lessons Learned
- JavaScript floating-point arithmetic has inherent limitations that tests must respect
- Mathematical properties that hold in theory may not hold exactly in JavaScript
- fast-check requires `Math.fround()` for float constraint boundaries
- Tests should focus on practical correctness within JavaScript's capabilities, not theoretical perfection
- Using tolerance-based comparisons is essential for floating-point tests

## Critical Instructions - READ FIRST

### ⚠️ CRITICAL TEST WRITING RULES - DO NOT IGNORE ⚠️

**ALWAYS write tests correctly THE FIRST TIME. These issues occur EVERY session:**

1. **Property-based tests with fast-check:**
   - ❌ NEVER put `fc.assert()` inside `await t.step()` - it will silently fail!
   - ✅ ALWAYS use separate `Deno.test()` calls for each property test
   - ✅ ALWAYS use `Math.fround()` on min/max constraints for `fc.float()`
   ```typescript
   // WRONG - Will appear to pass but doesn't actually run!
   Deno.test("properties", async (t) => {
     await t.step("some property", () => {
       fc.assert(...) // THIS DOESN'T WORK!
     })
   })
   
   // CORRECT - Separate test
   Deno.test("some property", () => {
     fc.assert(
       fc.property(
         fc.float({ noNaN: true, min: Math.fround(0.1), max: Math.fround(100) }),
         (x) => { ... }
       )
     )
   })
   ```

2. **JSDoc examples:**
   - ❌ NEVER copy JSDoc example values without verifying them first
   - ✅ ALWAYS run the actual function to check the correct output
   - ✅ ALWAYS use the actual computed values in tests, not the JSDoc values if they differ

3. **Floating-point comparisons:**
   - ❌ NEVER use `===` for floating-point equality
   - ✅ ALWAYS use `approximately()` helper or `assertAlmostEquals()`
   - ✅ ALWAYS use `Object.is()` for NaN and -0/+0 comparisons

4. **Complete Quality Standards - NO EXCEPTIONS:**
   - ✅ 100% code coverage (rare justified `// deno-coverage-ignore` only)
   - ✅ ALL tests must pass
   - ✅ Type checking must pass completely (`deno test` with NO `--no-check`)
   - ✅ NO linter errors (`deno lint` must be clean)
   - ❌ NEVER claim work is done without meeting ALL these standards
   - ❌ Anything less than this is unacceptable, sloppy work

5. **Run ALL checks BEFORE claiming success:**
   - ✅ Run tests: `deno test --unstable-temporal 'libraries/toolkit/tests/**/*.test.ts'`
   - ✅ Check types: Tests must pass WITHOUT `--no-check` flag
   - ✅ Check linting: `deno lint libraries/toolkit/tests/**/*.test.ts`
   - ✅ Check coverage: `deno task test:toolkit:cov`

6. **ALWAYS update BOTH files after completing tests:**
   - ✅ Update `/libraries/toolkit/FUNCTION_LIST.md` - progress percentage and function list
   - ✅ Update `/libraries/toolkit/tests/PROMPT.md` - session achievements and coverage count
   - ✅ Verify both show the SAME numbers before committing

### 1. Quality Standards (ABSOLUTE REQUIREMENTS)
**Work is NOT complete until:**
- ✅ 100% code coverage achieved
- ✅ ALL tests passing
- ✅ Type checking passing (no `--no-check` flag needed)
- ✅ ZERO linter errors
- **This is the minimum acceptable standard. Anything less is unfinished work.**

### 2. Project Standards (MUST READ)
Before ANY work, you MUST read and follow these files IN ORDER:
1. `/CLAUDE.md` - Project-wide coding standards and prime directive
2. `/libraries/toolkit/tests/TESTING_POLICY.md` - Testing requirements and patterns
3. `/libraries/toolkit/FUNCTION_LIST.md` - Complete list of functions to test with progress tracking

**PRIME DIRECTIVE from CLAUDE.md**: DO NOT ASSUME ANYTHING. DO NOT TAKE SHORTCUTS. DO NOT GUESS. Check everything carefully before acting, especially before writing code or committing.

### 3. File Naming Convention (CRITICAL)
The project uses a specific naming convention that MUST be followed:
- Function/component names go on the **folder**, NOT the file
- Every folder must have an `index.test.ts` file
- Example: `tests/behaviors/algebraic/commutative/add/index.test.ts` (NOT `add.test.ts`)
- When moving/renaming files, ALWAYS update all import paths

### 4. Import Path Structure
From test files in `tests/behaviors/[category]/[subcategory]/[function]/`:
- To source: Use appropriate relative path (typically 4-5 levels up)
- To helpers: Use appropriate relative path (typically 3-4 levels up)
- Example: `import clamp from "../../../../src/simple/math/clamp/index.ts"`

### 5. Common Edge Cases That Are Often Incorrect
**These edge cases are frequently implemented wrong - ALWAYS verify:**
- **Permutations**: P(n,n) = P(n,n-1) = n! (they're equal, not monotonic at the end)
- **Exponential**: exp(Number.MIN_VALUE) returns exactly 1, not slightly > 1
- **Logarithm**: log(Infinity)(x) has special behaviors, not always NaN
- **Cube Root**: JSDoc examples may have calculation errors - always verify
- **Curried Functions**: Need null/undefined checks on BOTH parameter applications
- **Floating Point**: Use `Object.is()` for -0/+0 distinction and NaN comparison

### 6. Linting Compliance (MANDATORY)
**Common linting issues to avoid:**
- ❌ NO `any` types - use specific types or `unknown` when truly unknown
- ❌ NO sparse arrays without `// deno-lint-ignore no-sparse-arrays`
- ❌ NO `let` for variables that aren't reassigned - use `const`
- ❌ NO unused variables - prefix with `_` if intentional
- ❌ NO type assertions to `any` - find a proper type
- ✅ For sparse arrays in tests: Add `// deno-lint-ignore no-sparse-arrays`
- ✅ For unavoidable `any`: Use `unknown` or add `// deno-lint-ignore no-explicit-any`
- ✅ Always run `deno lint` before claiming completion

### 7. Test File Structure
```typescript
import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import functionName from "[relative-path-to-source]"

Deno.test("functionName - test description", () => {
  // Test implementation
})
```

## Definition of Done (NON-NEGOTIABLE)

**Work is NOT complete and CANNOT be committed until ALL of these are met:**

✅ **100% Code Coverage**
- Run: `deno task test:toolkit:cov`
- Rare exceptions with `// deno-coverage-ignore` must be justified

✅ **All Tests Passing**
- Run: `deno test --unstable-temporal 'libraries/toolkit/tests/**/*.test.ts'`
- Zero failures, no skipped tests

✅ **Type Checking Passes**
- Tests must pass WITHOUT `--no-check` flag
- No TypeScript errors whatsoever

✅ **Zero Linter Errors**
- Run: `deno lint libraries/toolkit/tests/**/*.test.ts`
- Must return "Checked X files" with no errors

**This is the Definition of Done. Anything less is incomplete, unacceptable work.**

## Session Workflow (COMPLETE THESE STEPS IN ORDER)

### 1. Select Functions to Test (Maximum 6)
- Check FUNCTION_LIST.md for untested functions
- Group related functions when possible
- Prioritize core functionality

### 2. Write Comprehensive Tests
For each function:
- Property-based tests using fast-check
- JSDoc example coverage (100% required)
- Edge cases (null, undefined, NaN, Infinity)
- Error handling
- Behavioral properties

### 3. Verify Definition of Done
**MUST complete ALL before proceeding:**
```bash
# 1. Run tests (must all pass)
deno test --unstable-temporal 'libraries/toolkit/tests/**/*.test.ts'

# 2. Check linting (must be clean)
deno lint libraries/toolkit/tests/**/*.test.ts

# 3. Check coverage (must be 100%)
deno task test:toolkit:cov
```
Fix ANY issues before proceeding. Do NOT continue if any check fails.

### 4. Update Documentation
- Update FUNCTION_LIST.md:
  - Mark tested functions with ✓ on the same line
  - Update progress percentage at the top
  - **UPDATE ESTIMATED TIME TO COMPLETION**:
    - Calculate remaining functions (854 - completed)
    - Use ~12 minutes per function average
    - Update hours remaining and working days estimate
    - Update the "Last updated" date
- Update this PROMPT.md file for the next session
- Nested `Deno.test` calls need flattening
- Remaining `expect` statements need conversion to `assertEquals`
- Import paths need verification

### Fix Template
```typescript
// Replace: expect(value).toBe(expected)
// With: assertEquals(value, expected)

// Replace: expect(value).toBeNaN()
// With: assertEquals(Number.isNaN(value), true)

// Replace: expect(value).toEqual(expected)
// With: assertEquals(value, expected)
```

## Next Session Priority

1. **Array transformation functions**:
   - `insertAt` - Inserts element at specified index
   - `removeAt` - Removes element at specified index
   - `replaceAt` - Replaces element at specified index
   - `update` - Updates element at index with function result
   - `move` - Moves element from one index to another
   - `swap` - Swaps two elements at given indices

2. **Array range and generation functions**:
   - `range` - Generates array of numbers from start to end
   - `rangeStep` - Like range but with custom step value
   - `repeat` - Repeats array n times
   - `repeatItem` - Creates array with element repeated n times
   - `times` - Calls a function n times and collects results

3. **Array grouping and partitioning**:
   - `groupBy` - Groups elements by key function
   - `partition` - Splits array into two based on predicate
   - `splitAt` - Splits array at given index
   - `splitEvery` - Splits array into chunks of size n
   - `span` - Splits array where predicate first becomes false

4. **Array zip and combination functions**:
   - `zip` - Combines corresponding elements from two arrays
   - `zipWith` - Combines arrays using a function
   - `unzip` - Separates array of pairs into two arrays
   - `interleave` - Alternates elements from multiple arrays
   - `transpose` - Transposes matrix (array of arrays)

## Testing Patterns Reference

### Property-Based Testing - IMPORTANT NOTES
**WARNING**: Be very careful with `fc.anything()` - it can generate objects that break native JavaScript operations:
- Objects with toString as non-function properties
- Objects that can't be converted to primitives
- Always use try-catch or more specific generators when testing functions that rely on JavaScript's type coercion

### Property-Based Testing
```typescript
fc.assert(
  fc.property(
    fc.float({ noNaN: true }),
    (value) => {
      // Property assertion
    }
  ),
  { numRuns: 1000 }
)
```

### Floating-Point Comparison
```typescript
import approximately from "[path]/helpers/assertions/approximately/index.ts"
assertEquals(approximately(result, expected, epsilon), true)
```

### NaN Handling
```typescript
assertEquals(Number.isNaN(result), true)
// NOT: assertEquals(result, NaN)
```

## Important Reminders

### Coverage Requirements
- Code Coverage: 100% (use `deno task test:toolkit:cov`)
- JSDoc Examples: 100% (consolidate if >10 examples)
- Behavioral Coverage: All documented behaviors
- Edge Cases: null, undefined, NaN, Infinity, empty collections

### Common Pitfalls
- Don't use `===` for NaN comparison
- Use relative epsilon for floating-point comparisons
- Test curried function parameter order carefully
- Ensure imports use correct relative paths
- Remember to test immutability where applicable

### Git Workflow
1. Check changes: `git status`
2. Stage files: `git add -A`
3. Commit with conventional format:
   - `test(toolkit): add tests for [functions]`
   - Include coverage improvements in message
4. Reference any issues fixed

## Commands Reference

```bash
# Run all toolkit tests
deno test --unstable-temporal 'libraries/toolkit/tests/**/*.test.ts'

# Run with coverage
deno task test:toolkit:cov

# Run specific test file
deno test --unstable-temporal 'libraries/toolkit/tests/behaviors/[category]/[function]/index.test.ts'

# Run tests quietly
deno test --unstable-temporal 'libraries/toolkit/tests/**/*.test.ts' --quiet
```

## Contact and Resources
- Testing policy: `/libraries/toolkit/tests/TESTING_POLICY.md`
- Project standards: `/CLAUDE.md`
- Function list: `/libraries/toolkit/FUNCTION_LIST.md`
- Coverage reports: Generated in `/coverage/` directory

---

**Remember**: Every session should result in tested, passing code with updated documentation. Quality over quantity - better to have fewer functions fully tested than many partially tested.