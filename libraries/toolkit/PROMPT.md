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

## Current Testing Status

### What Has Been Completed
1. **Test Infrastructure**
   - Created comprehensive folder structure under `tests/` organized by behavior types
   - Implemented helper functions:
     - `tests/helpers/assertions/approximately/index.ts` - Floating-point comparison with epsilon
     - `tests/helpers/generators/numeric/index.ts` - Custom fast-check generators

2. **Functions Tested (107 tests passing)**
   - **Math**: `add` (commutative, associative, identity, error handling), `divide` (identity, error handling)
   - **Array**: `chunk` (property-based tests), `filter` (transformations)
   - **Combinators**: `pipe` (composition behavior)
   - **Monads**: `Either` and `Maybe` (monad laws, functor laws)
   - **Random**: `randomBoolean` (statistical distribution)

3. **Test Organization**
   ```
   tests/
   ├── behaviors/
   │   ├── algebraic/          # Mathematical properties
   │   │   ├── associative/
   │   │   ├── commutative/
   │   │   └── identity/
   │   ├── error-handling/     # Null/undefined/NaN handling
   │   │   └── null-safety/
   │   ├── functional/         # FP laws and composition
   │   │   ├── composition/
   │   │   └── monad-laws/
   │   ├── randomness/         # Statistical testing
   │   │   └── distribution/
   │   └── transformations/    # Data transformation behaviors
   │       └── array-ops/
   └── helpers/
       ├── assertions/
       └── generators/
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

## How to Run Tests

From project root:
```bash
# Run all toolkit tests
deno task test:toolkit

# Run with coverage
deno task test:toolkit:cov

# Alternative from toolkit directory
cd libraries/toolkit
deno task test           # Run tests
deno task test:cov       # With coverage
deno task test:watch     # Watch mode
```

## Next Steps - Priority Order

### 1. Complete Core Math Functions
Test remaining math functions with algebraic properties:
- `subtract` - NOT commutative, but associative
- `multiply` - commutative, associative, identity (1), distributive
- `modulo`, `power`, `squareRoot`, etc.

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
- Pattern matching functions

### 5. Object Operations
- `pick`, `omit`, `merge`, `deepMerge`
- `keys`, `values`, `entries`
- Property: immutability, type preservation

### 6. Specialized Domains
- Finance functions (if any)
- Geometry/physics functions (if any)
- Statistical functions
- Temporal functions

## Important Reminders

### When Adding New Tests
1. Check if function has multiple algebraic properties - test in appropriate folders
2. Always test ALL JSDoc examples (consolidate if >10)
3. Add property-based tests for invariants
4. Test edge cases systematically
5. Ensure imports use correct relative paths

### Common Pitfalls to Avoid
- Don't assume file locations - always verify paths
- Don't forget to update imports when moving files
- Don't use `===` for NaN comparison (use `Object.is()` or `Number.isNaN()`)
- Don't use absolute epsilon for large numbers (use relative epsilon)
- Don't skip error cases - test null/undefined/invalid inputs

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
As of last run: **100% coverage** for all tested source files.
- Tests properly exclude test files from coverage report
- All tested functions have 100% line and branch coverage
- Helper functions are partially covered (as expected)

## Contact and Resources
- Testing policy: `/libraries/toolkit/tests/TESTING_POLICY.md`
- Project standards: `/CLAUDE.md`
- Function list: Check for `/libraries/toolkit/FUNCTION_LIST.md`
- Coverage reports: Generated in `/coverage/` directory

---

**Remember**: The toolkit consists of pure functions, making 100% coverage achievable. Every code path can be triggered with appropriate inputs. No external dependencies means no mocking required. Follow the testing policy strictly and maintain the high quality standards established.