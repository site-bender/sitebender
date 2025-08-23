# Testing Implementation Session Context for @sitebender/toolkit

## Overview
This document provides context for continuing the comprehensive testing implementation for the @sitebender/toolkit library. The library is a pure functional programming utility library with zero dependencies, consisting of mathematical functions, array/string operations, monadic types (Either, Maybe, Result), and IO operations.

## Critical Instructions - READ FIRST

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

### 4. Test File Structure
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
- Update this PROMPT.md file for the next session

### 5. Commit Changes
Follow the commit process from CLAUDE.md

## Current Testing Status (Updated: 2025-08-23)

**Overall Progress: 3.4% tested (29/854 functions)**
**Session Time: 19 minutes (2025-08-23 11:37:35 - 11:56:54)**
**Running Total: 19 minutes**

### Functions Completed This Session (4)
1. ✓ `clamp` - Boundary enforcement, idempotency, ordering properties
2. `average` - Statistical properties, linearity (tests written, need fixing)
3. `median` - Statistical properties, outlier robustness (tests written, need fixing)
4. `mode` - Frequency detection, deterministic behavior (tests written, need fixing)

### Functions with 100% Coverage (26 total, 1 new this session)
**Math (12)**: absoluteValue, add, clamp ✓, divide, max, min, multiply, negate, power, sign, squareRoot, subtract
**Array (2)**: chunk, filter
**Combinators (1)**: pipe
**Monads (10)**: Either (chain, isLeft, left, map, right), Maybe (chain, isNothing, just, map, nothing)
**Random (1)**: randomBoolean

### Time Estimates
- **Rate**: ~4.75 minutes per function
- **Remaining**: 825 functions ≈ 65 hours
- **Per 1%**: ~8.5 functions ≈ 40 minutes

## Known Issues to Fix Next Session

### Test File Conversion Issues
The average, median, and mode test files were partially converted from a different testing framework and have structural issues:
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