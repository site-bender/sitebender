# Testing Implementation Session Context for @sitebender/toolkit

## Overview
This document provides context for continuing the comprehensive testing implementation for the @sitebender/toolkit library. The library is a pure functional programming utility library with zero dependencies, consisting of mathematical functions, array/string operations, monadic types (Either, Maybe, Result), and IO operations.

## Critical Instructions - READ FIRST

### 1. Project Standards (MUST READ)
Before ANY work, you MUST read and follow these files IN ORDER:
1. `/CLAUDE.md` - Project-wide coding standards and prime directive
2. `/libraries/toolkit/tests/TESTING_POLICY.md` - Testing requirements and patterns
3. `/libraries/toolkit/FUNCTION_LIST.md` (if exists) - Complete list of functions to test

**PRIME DIRECTIVE from CLAUDE.md**: DO NOT ASSUME ANYTHING. DO NOT TAKE SHORTCUTS. DO NOT GUESS. Check everything carefully before acting, especially before writing code or committing.

### 2. File Naming Convention (CRITICAL)
The project uses a specific naming convention that MUST be followed:
- Function/component names go on the **folder**, NOT the file
- Every folder must have an `index.ts` file
- Example: `tests/behaviors/algebraic/commutative/add/index.ts` (NOT `add.test.ts`)
- When moving/renaming files, ALWAYS update all import paths

### 3. Import Path Structure
From test files in `tests/behaviors/algebraic/[property]/[function]/`:
- To source: `../../../../../src/simple/math/[function]/index.ts` (5 levels up)
- To helpers: `../../../../helpers/[helper]/[function]/index.ts` (4 levels up)

## Current Testing Status

### What Has Been Completed
1. **Test Infrastructure**
   - Created comprehensive folder structure under `tests/` organized by behavior types
   - Implemented helper functions:
     - `tests/helpers/assertions/approximately/index.ts` - Floating-point comparison with epsilon
     - `tests/helpers/generators/numeric/index.ts` - Custom fast-check generators

2. **Functions Tested (Updated: 2025-08-22)**
   - **Math**: 
     - `add` (commutative, associative, identity, error handling)
     - `divide` (identity, error handling)
     - `subtract` (anti-commutative, identity, inverse relationship, JSDoc examples, null safety)
     - `multiply` (commutative, associative, identity, distributive, annihilator, JSDoc examples, null safety, sign rules)
     - `modulo` (modular arithmetic properties, true modulo vs remainder, JSDoc examples with practical applications)
     - `power` (exponentiation laws, identity, fractional/negative exponents, JSDoc examples)
     - `squareRoot` (algebraic properties, monotonicity, JSDoc examples, mathematical applications)
   - **Array**: `chunk` (property-based tests, immutability), `filter` (transformations)
   - **Combinators**: `pipe` (composition behavior, error propagation)
   - **Monads**: `Either` and `Maybe` (monad laws, functor laws, chain operations)
   - **Random**: `randomBoolean` (statistical distribution)

3. **Test Organization**
   ```
   tests/
   ├── behaviors/
   │   ├── algebraic/          # Mathematical properties
   │   │   ├── anti-commutative/
   │   │   │   └── subtract/
   │   │   ├── associative/
   │   │   │   ├── add/
   │   │   │   └── multiply/
   │   │   ├── commutative/
   │   │   │   ├── add/
   │   │   │   └── multiply/
   │   │   ├── distributive/
   │   │   │   └── multiply/
   │   │   └── identity/
   │   │       ├── add/
   │   │       ├── divide/
   │   │       └── multiply/
   │   ├── error-handling/     # Null/undefined/NaN handling
   │   │   └── null-safety/
   │   │       ├── add/
   │   │       ├── divide/
   │   │       └── multiply/
   │   ├── functional/         # FP laws and composition
   │   │   ├── composition/
   │   │   │   └── pipe/
   │   │   └── monad-laws/
   │   │       ├── either/
   │   │       └── maybe/
   │   ├── randomness/         # Statistical testing
   │   │   └── distribution/
   │   │       └── randomBoolean/
   │   └── transformations/    # Data transformation behaviors
   │       └── array-ops/
   │           ├── chunk/
   │           └── filter/
   └── helpers/
       ├── assertions/
       │   └── approximately/
       └── generators/
           └── numeric/
   ```

## Testing Requirements (from TESTING_POLICY.md)

### Coverage Goals
- **Code Coverage**: 100% - NO EXCEPTIONS
  - Use `/* c8 ignore next */` ONLY with justification comment
  - Run coverage: `deno task test:toolkit:cov` from project root
  - Coverage excludes test files via `--exclude='tests/.*\.ts$'` pattern

- **JSDoc Example Coverage**: 100% - Every example MUST be tested
  - If a function has >10 examples, consolidate to ≤10 most representative

- **Behavioral Coverage**: All documented behaviors
- **Property Coverage**: All mathematical laws and invariants
- **Edge Case Coverage**: null, undefined, NaN, Infinity, empty collections

### Testing Patterns to Follow
1. **Property-based testing first** using fast-check (1000 iterations default)
2. **No mocking** - Test real functions as-is
3. **Behavioral testing only** - Test observable behaviors, not implementation
4. **Relative epsilon for floating-point** - Use `approximately()` helper with appropriate tolerance

### Known Issues and Solutions
1. **Floating-point precision**: Use relative epsilon based on magnitude of numbers
2. **NaN comparison**: Use `Object.is()` or explicit `Number.isNaN()` checks
3. **Random function testing**: Use statistical tolerance (typically 2-5% for 1000+ samples)
4. **fast-check float constraints**: Use `Math.fround()` for 32-bit float values
5. **Curried function behavior**: Remember `subtract(a)(b)` means `a - b`, not `b - a`

## How to Run Tests

From project root:
```bash
# Run all toolkit tests
deno test --unstable-temporal 'libraries/toolkit/tests/**/*.ts'

# Run with coverage
deno task test:toolkit:cov

# Run specific test file
deno test --unstable-temporal libraries/toolkit/tests/behaviors/algebraic/commutative/add/index.ts

# Run tests with quiet output
deno test --unstable-temporal 'libraries/toolkit/tests/**/*.ts' --quiet
```

## Next Steps - Priority Order

### 1. Complete Remaining Core Math Functions
Test remaining math functions with algebraic properties:
- ✅ `subtract` - anti-commutative, identity, inverse relationship
- ✅ `multiply` - commutative, associative, identity (1), distributive
- `modulo`, `power`, `squareRoot`
- `absoluteValue`, `negate`, `sign`
- `max`, `min`, `clamp`
- Statistical: `average`, `mean`, `median`, `mode`

### 2. Complete Array Operations
Many array functions need comprehensive testing:
- `map`, `reduce`, `flatten`, `zip`, `unzip`
- `concat`, `slice`, `reverse`, `sort`
- `unique`, `intersection`, `difference`
- Property: preserving order, immutability, type preservation

### 3. Complete Monadic Operations
- `Result` monad - similar to Either
- IO monad operations
- Chain operations and transformations
- Conversion functions between monads

### 4. String Operations
- `trim`, `split`, `join`, `replace`
- `toUpperCase`, `toLowerCase`, `capitalize`
- `chomp`, `padLeft`, `padRight`
- Pattern matching functions

### 5. Object Operations
- `pick`, `omit`, `merge`, `deepMerge`
- `keys`, `values`, `entries`
- `mapValues`, `mapKeys`
- Property: immutability, type preservation

### 6. Specialized Domains
- Random functions: `randomInteger`, `randomFloat`
- Combinators: `compose`, `curry`, `flip`
- Predicates: `isEven`, `isOdd`, `isPrime`
- Temporal functions (if any)

## Important Reminders

### When Adding New Tests
1. Check if function has multiple algebraic properties - test in appropriate folders
2. Always test ALL JSDoc examples (consolidate if >10)
3. Add property-based tests for invariants
4. Test edge cases systematically
5. Ensure imports use correct relative paths (5 levels up to src, 4 to helpers)

### Common Pitfalls to Avoid
- Don't assume file locations - always verify paths
- Don't forget to update imports when moving files
- Don't use `===` for NaN comparison (use `Object.is()` or `Number.isNaN()`)
- Don't use absolute epsilon for large numbers (use relative epsilon)
- Don't skip error cases - test null/undefined/invalid inputs
- Remember curried function parameter order (first param is the one being curried)

### Git Workflow
1. Check changes: `git status`
2. Stage files: `git add -A` or selectively
3. Use conventional commits:
   - `test(toolkit):` for test additions
   - `fix(toolkit):` for test fixes
   - `docs(toolkit):` for documentation
4. Include details in commit message body
5. Reference coverage improvements if applicable

## Current Coverage Status
As of last run (2025-08-22): **High coverage** with comprehensive tests for:
- Core math operations with 100% or near-100% coverage:
  - `add`, `subtract`, `multiply`, `divide` (existing)
  - `power` (100% coverage)
  - `squareRoot` (100% coverage)  
  - `modulo` (90.6% coverage)
- Algebraic properties (commutative, associative, distributive, identity, modular arithmetic)
- Error handling and null safety
- Monad laws for Either and Maybe
- Array operations (chunk, filter)
- Pipe combinator

**Test Count**: 14 test suites with 66 test steps passing

## Recent Achievements
- Added comprehensive tests for `modulo` with modular arithmetic properties
- Added comprehensive tests for `power` with exponentiation laws
- Added comprehensive tests for `squareRoot` with algebraic properties
- Fixed all floating-point precision issues in tests
- Achieved 100% coverage for `power` and `squareRoot` functions
- Established testing patterns for:
  - Algebraic properties
  - JSDoc example verification (100% coverage)
  - Null/undefined safety
  - Property-based testing with fast-check
  - Floating-point comparison with appropriate epsilon values

## Contact and Resources
- Testing policy: `/libraries/toolkit/tests/TESTING_POLICY.md`
- Project standards: `/CLAUDE.md`
- Function list: Check for `/libraries/toolkit/FUNCTION_LIST.md`
- Coverage reports: Generated in `/coverage/` directory

---

**Remember**: The toolkit consists of pure functions, making 100% coverage achievable. Every code path can be triggered with appropriate inputs. No external dependencies means no mocking required. Follow the testing policy strictly and maintain the high quality standards established.