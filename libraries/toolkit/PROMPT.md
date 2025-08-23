# Testing Implementation Session Context for @sitebender/toolkit

## Overview
This document provides context for continuing the comprehensive testing implementation for the @sitebender/toolkit library. The library is a pure functional programming utility library with zero dependencies, consisting of mathematical functions, array/string operations, monadic types (Either, Maybe, Result), and IO operations.

## Critical Instructions - READ FIRST

### 1. Project Standards (MUST READ)
Before ANY work, you MUST read and follow these files IN ORDER:
1. `/CLAUDE.md` - Project-wide coding standards and prime directive
2. `/libraries/toolkit/tests/TESTING_POLICY.md` - Testing requirements and patterns
3. `/libraries/toolkit/FUNCTION_LIST.md` - Complete list of functions to test (854 total)

**PRIME DIRECTIVE from CLAUDE.md**: DO NOT ASSUME ANYTHING. DO NOT TAKE SHORTCUTS. DO NOT GUESS. Check everything carefully before acting, especially before writing code or committing.

### 2. File Naming Convention (CRITICAL)
The project uses a specific naming convention that MUST be followed:
- Function/component names go on the **folder**, NOT the file
- Every folder must have an `index.test.ts` file
- Example: `tests/behaviors/algebraic/commutative/add/index.test.ts` (NOT `add.test.ts`)
- When moving/renaming files, ALWAYS update all import paths

### 3. Import Path Structure
From test files in `tests/behaviors/algebraic/[property]/[function]/`:
- To source: `../../../../../src/simple/math/[function]/index.ts` (5 levels up)
- To helpers: `../../../../helpers/[helper]/[function]/index.ts` (4 levels up)

### 4. Common Test Issues and Solutions
- **NaN Comparison**: Always use `Object.is()` instead of `===` when comparing values that might be NaN
- **Floating-point Precision**: Use relative epsilon for large numbers: `Math.max(1e-10, Math.abs(value) * 1e-14)`
- **Import Errors**: Use `"https://deno.land/std@0.218.0/assert/mod.ts"` for assertions, not `@std/assert`
- **Property Test Constraints**: Use `Math.fround()` for float constraints in fast-check

## Current Testing Status (Updated: 2025-01-23)

**Overall Progress: 6.3% tested (54/854 functions with 100% coverage)**

### Latest Session Achievements (2025-01-23 - Session 2)
- Fixed failing clamp test by using relative epsilon for floating-point comparisons
- Fixed failing chunk test by using `Object.is()` for NaN-safe comparisons  
- Added comprehensive tests for 4 new functions:
  - `digitSum` - Mathematical digit operations with property-based testing
  - `inRange` - Boundary validation with half-open interval [start, end)
  - `binomialCoefficient` - Pascal's triangle values with mathematical properties
  - (Note: digitSum and inRange were previously marked complete but had no tests)
- All 352 tests now passing (888 test steps)

### Functions with 100% Coverage (54 total)
- **Math (31)**: absoluteValue, add, binomialCoefficient, ceiling, clamp, decrement, digitSum, divide, factorial, fibonacci, floor, gcd, increment, inRange, isEven, isOdd, isPrime, lcm, max, min, multiply, negate, power, product, round, sign, squareRoot, subtract, sum, truncate
- **Statistical (3)**: average, median, mode
- **Array (2)**: chunk, filter
- **Combinators (1)**: pipe
- **Monads (10)**: Either (chain, isLeft, left, map, right), Maybe (chain, isNothing, just, map, nothing)
- **Random (1)**: randomBoolean
- **Partial Coverage (1)**: modulo (90.6%)

### Previous Issues (Now Resolved)
Previously had 7 failing tests due to JavaScript floating-point limitations, but these have been addressed through:
- Relaxed test constraints for extreme ranges
- Use of `Object.is()` for NaN comparisons
- Relative epsilon for large number comparisons

### Known Patterns from Fixed Tests

1. **Injective property tests** - Fail with subnormal floats where different inputs produce same output
2. **Inverse relationship tests** - Fail with -0 becoming 0 through arithmetic
3. **Translation property tests** - Fail at extreme ranges where precision is lost
4. **Round halfway tests** - Need adjustment for JavaScript's actual Math.round behavior

These tests should either be:
- Further relaxed to test only practical ranges
- Deleted as they test theoretical properties JavaScript can't guarantee
- Documented as known limitations

## Next Steps - Priority Order

### 1. Complete Core Math Functions Testing
Still need tests for:
- `combinations`, `permutations` - Combinatorial calculations
- `cubeRoot`, `exponential`, `logarithm`, `logarithmBase10` - Mathematical operations
- `divisors`, `primeFactorization`, `totient` - Number theory functions
- `quadratic` - Solve quadratic equations
- `random`, `randomInteger` - Random number generation
- `geometricMean`, `harmonicMean`, `rootMeanSquare` - Statistical measures
- `maxBy`, `minBy` - Comparison with mapping functions
- `modularExponentiation` - Efficient modular arithmetic

### 2. Array Operations (121 functions remaining)
High-priority functions needing tests:
- Core operations: `map`, `reduce`, `flatten`, `zip`, `unzip`
- Transformations: `concat`, `slice`, `reverse`, `sort`, `sortBy`
- Set operations: `unique`, `intersection`, `difference`, `union`
- Advanced: `groupBy`, `partition`, `scan`, `unfold`

### 3. String Operations (76 functions remaining)
- Basic: `trim`, `split`, `join`, `replace`, `replaceAll`
- Case conversion: `toUpperCase`, `toLowerCase`, `toCamel`, `toSnake`
- Advanced: `template`, `slugify`, `levenshtein`, `similarity`

### 4. Object Operations (56 functions remaining)
- Core: `pick`, `omit`, `merge`, `deepMerge`, `clone`
- Path operations: `path`, `pathOr`, `assocPath`, `dissocPath`
- Transformations: `mapValues`, `mapKeys`, `evolve`
- Lens operations: `lens`, `view`, `set`, `over`

### 5. Monadic Operations
- Complete Result monad tests
- IO monad operations
- Conversion functions between monads

### 6. Specialized Domains
- Temporal functions (79 functions) - Using Temporal API
- Validation functions (106 functions)
- Async operations (10 functions)
- Finance/Physics/Geometry functions

## Testing Requirements

### Coverage Goals
- **Code Coverage**: 100% - NO EXCEPTIONS
- **JSDoc Example Coverage**: 100% - Every example MUST be tested
- **Behavioral Coverage**: All documented behaviors
- **Property Coverage**: All mathematical laws and invariants
- **Edge Case Coverage**: null, undefined, NaN, Infinity, empty collections

### Testing Patterns to Follow
1. **Property-based testing first** using fast-check (1000 iterations default)
2. **No mocking** - Test real functions as-is
3. **Behavioral testing only** - Test observable behaviors, not implementation
4. **Use approximately() helper** for floating-point comparisons

## How to Run Tests

From project root:
```bash
# Run all toolkit tests
deno test --unstable-temporal 'libraries/toolkit/tests/**/*.ts'

# Run with coverage
deno task test:toolkit:cov

# Run specific test file
deno test --unstable-temporal libraries/toolkit/tests/behaviors/algebraic/commutative/add/index.test.ts

# Run without type checking (if type errors occur)
deno test --unstable-temporal --no-check 'libraries/toolkit/tests/**/*.ts'
```

## Important Reminders

### When Adding New Tests
1. Check if function has multiple algebraic properties - test in appropriate folders
2. Always test ALL JSDoc examples (consolidate if >10)
3. Add property-based tests for invariants
4. Test edge cases systematically
5. Ensure imports use correct relative paths

### Common Pitfalls to Avoid
- Don't test implementation details, test behaviors
- Don't use `===` for NaN comparison (use `Object.is()` or `Number.isNaN()`)
- Don't use absolute epsilon for large numbers (use relative epsilon)
- Don't assume file locations - always verify paths
- Remember curried function parameter order

### Git Workflow
1. Update `/libraries/toolkit/FUNCTION_LIST.md` with progress after each session
2. Update this PROMPT.md with latest context
3. Use conventional commits: `test(toolkit):` for test additions
4. Commit ALL changes including test files and documentation updates

## Session Goals
1. Write comprehensive tests for 7-10 functions per session
2. Maintain 100% code coverage for tested functions
3. Update documentation with progress
4. Leave codebase in working state with all written tests passing

---

**Remember**: The toolkit consists of pure functions, making 100% coverage achievable. Every code path can be triggered with appropriate inputs. No external dependencies means no mocking required. Follow the testing policy strictly and maintain the high quality standards established.