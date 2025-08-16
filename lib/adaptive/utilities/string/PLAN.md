# String Utilities Audit and Testing Plan

## Overview
This plan outlines a comprehensive audit, documentation, and testing strategy for all string utility functions in `lib/adaptive/utilities/string/`. The goal is to ensure all functions are properly curried, handle edge cases correctly, have complete JSDoc documentation, and achieve 100% test coverage with behavioral tests.

## Current State Analysis
The string utilities folder contains 30 functions covering:
- String concatenation and manipulation
- Case conversions (10 different formats)
- Padding operations
- Pattern matching and testing
- String splitting and replacement
- Trimming operations

### Audit Results

#### Currying Status ✅
**IMPORTANT**: Currying means taking parameters ONE AT A TIME. A function that takes only one parameter IS ALREADY CURRIED.

All functions are properly curried:
- **Single-parameter functions** (already curried): `trim`, `trimStart`, `trimEnd`, `toLower`, `toUpper`, all case converters (`toCamel`, `toKebab`, `toPascal`, `toSnake`, `toScreamingSnake`, `toSentence`, `toTitle`, `toTrain`)
- **Multi-parameter curried functions**: All others properly take parameters one at a time with data-last pattern

#### Parameter Order ✅
All functions correctly follow data-last pattern:
- `concat(a)(b)` - Concatenates b to a
- `pad/padStart/padEnd` - `(chars) => (length) => (str)`
- `replace/replaceAll` - `(search) => (replace) => (str)`
- `split` - `(separator) => (str)`
- `splitAt` - `(index) => (str)`
- `splitEvery` - `(n) => (str)`
- `repeat` - `(s) => (length)`

### Real Issues Found

#### 1. Duplicate Functions 🔴
- **`padStart` and `padStartTo` are IDENTICAL** - Both pad to a target length, stopping if string is already longer
- **`padEnd` and `padEndTo` are IDENTICAL** - Same implementation, no behavioral difference
- **Resolution needed**: Either remove duplicates OR implement distinct behaviors

#### 2. Naming Clarity 🟡
- `pad` function pads both sides but name doesn't indicate this
- Consider renaming to `padBoth` or `padCenter` for clarity

#### 3. Documentation Gaps 🟡
Current JSDoc comments lack:
- `@curried` notation showing parameter application order
- `@property` annotations for mathematical properties (idempotent, etc.)
- Comprehensive edge case examples
- Consistent format across all functions

#### 4. Edge Case Handling ✅
Verified that functions handle edge cases correctly:
- `repeat` - Returns empty string for negative/zero counts
- `splitEvery` - Returns empty array for n <= 0
- `padStart/padEnd` - Handle negative lengths (no padding)
- `splitAt` - Returns single-element array for out-of-bounds indices
- Case converters - Use `not()` predicate for falsy values

## Phase 1: Fix Critical Issues

### 1.1 Resolve Duplicate Functions
**Options for `padStart`/`padStartTo` and `padEnd`/`padEndTo`:**

Option A: **Remove duplicates** (Recommended)
- Keep only `padStart` and `padEnd`
- They already stop padding if string is longer than target

Option B: **Differentiate behavior**
- `padStart` - Pads to target length, stops if already longer
- `padStartTo` - Always pads by exact amount (adds padding regardless of current length)

Option C: **Strict vs Lenient**
- `padStart` - Lenient, stops if longer
- `padStartTo` - Strict, throws error if already longer

### 1.2 Improve Naming
- Rename `pad` to `padBoth` or `padCenter` to clarify it pads both sides

## Phase 2: JSDoc Documentation

### 2.1 Documentation Standards
Each function must have comprehensive JSDoc following this pattern:

```typescript
/**
 * Brief description of what the function does
 * 
 * Detailed explanation including edge cases and important behavioral notes.
 * 
 * @curried (param1) => (param2) => result
 * @property {idempotent} - Only if applicable
 * @param param1 - Description with type info if not obvious
 * @param param2 - Description with type info if not obvious
 * @returns Description of return value
 * @example
 * ```typescript
 * // Basic usage
 * functionName(param1)(param2) // result
 * 
 * // Edge cases
 * functionName("")("") // edge case result
 * functionName(0)("test") // another edge case
 * 
 * // Partial application
 * const configured = functionName(param1)
 * configured("data1") // result1
 * configured("data2") // result2
 * ```
 */
```

### 2.2 Properties to Document

#### Idempotent Functions
Functions where `f(f(x)) = f(x)`:
- `trim`, `trimStart`, `trimEnd` - Removing whitespace twice = removing once
- `toLower`, `toUpper` - Converting case twice = converting once
- All case converters - Already in target case after first application

#### Other Properties
- **Associative**: `concat` - `concat(a)(concat(b)(c)) = concat(concat(a)(b))(c)`
- **Identity element**: `concat("")(s) = s` and `concat(s)("") = s`
- **Deterministic**: All functions (same input always produces same output)

## Phase 3: Behavioral Testing

### 3.1 Test Organization
Following the array utilities pattern, organize by behavior:

```
lib/adaptive/utilities/tests/string-operations/
├── transforming/       # Case converters, trim functions
├── combining/         # concat
├── splitting/         # split, splitAt, splitEvery  
├── searching/         # startsWith, endsWith, match, test
├── replacing/         # replace, replaceAll
├── padding/           # pad, padStart, padEnd, padStartTo, padEndTo
├── repeating/         # repeat
└── property-based/    # Cross-cutting property tests
```

### 3.2 Behavioral Properties by Category

#### 3.2.1 Transforming Operations
**Functions**: `trim`, `trimStart`, `trimEnd`, `toLower`, `toUpper`, all case converters

**Properties to test**:
- Idempotency: `f(f(x)) = f(x)`
- Empty string: `f("") = ""`
- Whitespace-only (for trim): Results in empty string
- Unicode handling: Correct behavior with non-ASCII
- Already transformed: No change if already in target form

#### 3.2.2 Combining Operations
**Functions**: `concat`

**Properties to test**:
- Associativity: Order of operations doesn't matter
- Identity: Empty string is identity element
- Length: Result length = sum of input lengths
- Order preservation: Characters maintain sequence

#### 3.2.3 Splitting Operations
**Functions**: `split`, `splitAt`, `splitEvery`

**Properties to test**:
- Reconstruction: Joining split parts recreates original (when applicable)
- Chunk sizes: `splitEvery(n)` produces chunks of size n (except last)
- Boundary conditions: Empty string, separator not found, index out of bounds
- Inverse relationship: `split(sep)(str).join(sep) = str` (for simple cases)

#### 3.2.4 Searching Operations
**Functions**: `startsWith`, `endsWith`, `match`, `test`

**Properties to test**:
- Self-containment: `startsWith(s)(s) = true`, `endsWith(s)(s) = true`
- Empty string edge cases
- Case sensitivity
- Pattern vs literal matching (for regex functions)

#### 3.2.5 Replacing Operations
**Functions**: `replace`, `replaceAll`

**Properties to test**:
- Identity when replacing with same: `replace(x)(x)(str) = str`
- No-op when pattern not found
- First vs all occurrences (`replace` vs `replaceAll`)
- Regex vs string patterns

#### 3.2.6 Padding Operations
**Functions**: `pad`, `padStart`, `padEnd`

**Properties to test**:
- Length guarantee: Result length >= target length
- Original preservation: Original string appears in result
- No-op when already long enough
- Symmetry (for `pad`): Equal padding on both sides

#### 3.2.7 Repeating Operations
**Functions**: `repeat`

**Properties to test**:
- Length: Result length = `string.length * count`
- Zero/negative counts: Returns empty string
- Identity: `repeat(s)(1) = s`
- Concatenation: `repeat(s)(n)` contains exactly n copies

### 3.3 Property-Based Testing with fast-check

```typescript
import fc from "fast-check"

// Example property tests
describe("property: idempotency", () => {
  it("trim is idempotent", () => {
    fc.assert(
      fc.property(fc.string(), (str) => {
        const once = trim(str)
        const twice = trim(once)
        expect(twice).toBe(once)
      })
    )
  })
})

describe("property: associativity", () => {
  it("concat is associative", () => {
    fc.assert(
      fc.property(fc.string(), fc.string(), fc.string(), (a, b, c) => {
        const left = concat(concat(a)(b))(c)
        const right = concat(a)(concat(b)(c))
        expect(left).toBe(right)
      })
    )
  })
})
```

## Implementation Timeline

### Day 1: Fix Issues & Start Documentation
**Morning (2 hours)**:
- Resolve duplicate padding functions (remove or differentiate)
- Rename `pad` to `padBoth` or `padCenter`

**Afternoon (4 hours)**:
- Add JSDoc to case converters (10 functions)
- Add JSDoc to core operations (`concat`, `split`, `replace`, `replaceAll`)
- Add JSDoc to trim family

### Day 2: Complete Documentation
- Padding functions (with resolved duplicates)
- Splitting functions (`splitAt`, `splitEvery`)
- Search predicates (`startsWith`, `endsWith`, `match`, `test`)
- `repeat` function
- Ensure all functions have complete JSDoc with examples

### Day 3: Test Structure & Core Tests
**Morning**:
- Set up test folder structure
- Create test utilities/helpers

**Afternoon**:
- Transforming operations tests (case converters, trim)
- Combining operations tests (concat)
- Property-based tests for above

### Day 4: Complete Behavioral Tests
- Splitting operations tests
- Searching operations tests
- Replacing operations tests
- Padding operations tests
- Repeating operation tests

### Day 5: Coverage & Polish
- Add remaining property-based tests
- Verify 100% code coverage
- Fix any missing edge cases
- Run full test suite
- Final documentation review

## Success Criteria

### ✅ Functional Requirements
- [ ] No duplicate functions with identical behavior
- [ ] Clear, descriptive function names
- [ ] All functions properly curried (already met)
- [ ] Correct parameter order (already met)
- [ ] Edge cases handled gracefully (already met)

### 📝 Documentation Requirements
- [ ] Every function has complete JSDoc
- [ ] @curried notation for all multi-parameter functions
- [ ] @property annotations for mathematical properties
- [ ] Comprehensive examples including edge cases
- [ ] Consistent format across all functions

### 🧪 Testing Requirements
- [ ] 100% code coverage
- [ ] Behavioral tests for all functions
- [ ] Property-based tests for applicable properties
- [ ] Tests organized by behavior, not implementation
- [ ] Edge cases explicitly tested

### 🎯 Quality Metrics
- [ ] All tests pass
- [ ] No linting errors
- [ ] Code properly formatted
- [ ] Types properly defined
- [ ] No runtime exceptions possible

## Appendix: Complete Function Inventory

### Current Functions (30)
1. `concat` - Concatenate strings
2. `endsWith` - Check if string ends with substring
3. `match` - Match against regex pattern
4. `pad` - Pad both sides of string
5. `padEnd` - Pad end of string
6. `padEndTo` - Pad end to exact length (DUPLICATE)
7. `padStart` - Pad start of string
8. `padStartTo` - Pad start to exact length (DUPLICATE)
9. `repeat` - Repeat string n times
10. `replace` - Replace first occurrence
11. `replaceAll` - Replace all occurrences
12. `split` - Split by separator
13. `splitAt` - Split at specific index
14. `splitEvery` - Split into chunks of size n
15. `startsWith` - Check if string starts with substring
16. `test` - Test string against regex
17. `toCamel` - Convert to camelCase
18. `toCase` - Convert to specified case (meta-function)
19. `toKebab` - Convert to kebab-case
20. `toLower` - Convert to lowercase
21. `toPascal` - Convert to PascalCase
22. `toScreamingSnake` - Convert to SCREAMING_SNAKE_CASE
23. `toSentence` - Convert to Sentence case
24. `toSnake` - Convert to snake_case
25. `toTitle` - Convert to Title Case
26. `toTrain` - Convert to Train-Case
27. `toUpper` - Convert to UPPERCASE
28. `trim` - Remove whitespace from both ends
29. `trimEnd` - Remove whitespace from end
30. `trimStart` - Remove whitespace from start

### Notes
- `toCase` is a meta-function that returns the appropriate case converter
- Consider adding: `substring`, `indexOf`, `includes`, `charAt`, `normalize` if gaps identified during testing