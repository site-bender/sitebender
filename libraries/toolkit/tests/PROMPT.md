# Testing Implementation Session Context for @sitebender/toolkit

## Overview
This document provides context for continuing the comprehensive testing implementation for the @sitebender/toolkit library. The library is a pure functional programming utility library with zero dependencies, consisting of mathematical functions, array/string operations, monadic types (Either, Maybe, Result), and IO operations.

## Current Testing Status (Updated: 2025-01-24)

**Overall Progress: 8.0% tested (68/854 functions with 100% coverage)**

### Latest Session Achievements (2025-01-24)
- Added comprehensive tests for 4 new math functions with 100% coverage:
  - `cubeRoot` - Cube root calculation with inverse property tests
  - `exponential` - e^x with logarithm inverse relationship tests
  - `logarithm` - Curried logarithm with change of base formula tests
  - `permutations` - nPr calculation with factorial relationship tests
- Fixed critical test structure issues:
  - Moved property-based tests from async t.step to separate Deno.test calls
  - Fixed fast-check float constraints using Math.fround()
  - Corrected JSDoc example discrepancies (cubeRoot mean cube)
- All 410 tests now passing (1294 test steps)

### Functions with 100% Coverage (68 total)
- **Math (45)**: absoluteValue, add, binomialCoefficient, ceiling, clamp, combinations, cubeRoot, decrement, digitSum, divide, divisors, exponential, factorial, fibonacci, floor, gcd, increment, inRange, isEven, isOdd, isPrime, lcm, logarithm, logarithmBase10, max, min, multiply, negate, permutations, power, primeFactorization, product, quadratic, round, sign, squareRoot, subtract, sum, totient, truncate
- **Statistical (3)**: average, median, mode
- **Array (2)**: chunk, filter
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

4. **Run tests BEFORE claiming success:**
   - ❌ NEVER claim tests are complete without running them
   - ✅ ALWAYS run the full test suite and verify all pass
   - ✅ ALWAYS check coverage is actually 100%

5. **ALWAYS update BOTH files after completing tests:**
   - ✅ Update `/libraries/toolkit/FUNCTION_LIST.md` - progress percentage and function list
   - ✅ Update `/libraries/toolkit/tests/PROMPT.md` - session achievements and coverage count
   - ✅ Verify both show the SAME numbers before committing

### 1. Project Standards (MUST READ)
Before ANY work, you MUST read and follow these files IN ORDER:
1. `/CLAUDE.md` - Project-wide coding standards and prime directive
2. `/libraries/toolkit/tests/TESTING_POLICY.md` - Testing requirements and patterns
3. `/libraries/toolkit/FUNCTION_LIST.md` - Complete list of functions to test with progress tracking

**PRIME DIRECTIVE from CLAUDE.md**: DO NOT ASSUME ANYTHING. DO NOT TAKE SHORTCUTS. DO NOT GUESS. Check everything carefully before acting, especially before writing code or committing.

### 2. File Naming Convention (CRITICAL)
The project uses a specific naming convention that MUST be followed:
- Function/component names go on the **folder**, NOT the file
- Every folder must have an `index.test.ts` file
- Example: `tests/behaviors/algebraic/commutative/add/index.test.ts` (NOT `add.test.ts`)
- When moving/renaming files, ALWAYS update all import paths

### 3. Import Path Structure
From test files in `tests/behaviors/[category]/[subcategory]/[function]/`:
- To source: Use appropriate relative path (typically 4-5 levels up)
- To helpers: Use appropriate relative path (typically 3-4 levels up)
- Example: `import clamp from "../../../../src/simple/math/clamp/index.ts"`

### 4. Common Edge Cases That Are Often Incorrect
**These edge cases are frequently implemented wrong - ALWAYS verify:**
- **Permutations**: P(n,n) = P(n,n-1) = n! (they're equal, not monotonic at the end)
- **Exponential**: exp(Number.MIN_VALUE) returns exactly 1, not slightly > 1
- **Logarithm**: log(Infinity)(x) has special behaviors, not always NaN
- **Cube Root**: JSDoc examples may have calculation errors - always verify
- **Curried Functions**: Need null/undefined checks on BOTH parameter applications
- **Floating Point**: Use `Object.is()` for -0/+0 distinction and NaN comparison

### 5. Test File Structure
```typescript
import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import functionName from "[relative-path-to-source]"

Deno.test("functionName - test description", () => {
  // Test implementation
})
```

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

### 3. Verify All Tests Pass
```bash
deno test --unstable-temporal 'libraries/toolkit/tests/**/*.test.ts' --quiet
```
Fix any failing tests before proceeding.

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

1. **Fix existing tests** for average, median, mode
2. **Complete remaining statistical functions**: 
   - variance, standardDeviation
   - geometricMean, harmonicMean
3. **Test predicates**:
   - isEven, isOdd, isPrime
4. **Test basic array operations**:
   - map, reduce, filter (already done)
   - flatten, concat, slice

## Testing Patterns Reference

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