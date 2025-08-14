# Behavioral Testing Plan for Utilities

## Testing Philosophy

### Core Principles
1. **Test Behaviors, Not Implementation** - Focus on what functions do, not how
2. **100% Coverage Through Behavior** - Every behavior path must be tested
3. **Property-Based Testing** - Use fast-check for generative testing where appropriate
4. **Pure Function Advantage** - Utilities are pure, making testing deterministic
5. **Edge Case Focus** - Emphasize boundary conditions and error states

## Test Organization Structure

```
lib/adaptive/utilities/tests/
├── array-operations/        # Array manipulation behaviors
│   ├── accessing/           # head, tail, first, last, nth
│   │   └── index.test.ts
│   ├── filtering/           # filter, compact, unique, remove
│   │   └── index.test.ts
│   ├── searching/           # find, findIndex, includes, indexOf
│   │   └── index.test.ts
│   ├── transforming/        # map, flatMap, flatten, reduce
│   │   └── index.test.ts
│   ├── slicing/            # slice, take, drop, splitEvery
│   │   └── index.test.ts
│   ├── mutating/           # insertAt, removeAt, replaceAt, move
│   │   └── index.test.ts
│   └── predicates/         # all, some, none
│       └── index.test.ts
├── type-conversions/        # Type casting behaviors
│   ├── primitives/         # toBoolean, toNumber, toString
│   │   └── index.test.ts
│   ├── temporal/           # toPlainDate, toPlainTime, toZonedDateTime
│   │   └── index.test.ts
│   └── parsing/            # parseJson
│       └── index.test.ts
├── string-operations/       # String manipulation behaviors
│   ├── case-conversion/    # toCamel, toKebab, toPascal, etc.
│   │   └── index.test.ts
│   ├── padding/            # pad, padStart, padEnd
│   │   └── index.test.ts
│   ├── matching/           # match, test, startsWith, endsWith
│   │   └── index.test.ts
│   ├── splitting/          # split, splitAt, splitEvery
│   │   └── index.test.ts
│   └── replacing/          # replace, replaceAll
│       └── index.test.ts
├── object-operations/       # Object manipulation behaviors
│   ├── accessing/          # path, pathOr
│   │   └── index.test.ts
│   └── filtering/          # pick, omit
│       └── index.test.ts
├── dom-operations/         # DOM-related behaviors
│   ├── value-extraction/   # getValue and related
│   │   └── index.test.ts
│   ├── element-selection/  # getSelector, collectElements
│   │   └── index.test.ts
│   └── data-retrieval/    # getFromInput, getFromSelect, etc.
│       └── index.test.ts
├── functional-composition/  # FP utility behaviors
│   ├── piping/            # pipe
│   │   └── index.test.ts
│   └── identity/          # identity
│       └── index.test.ts
├── predicates/             # Boolean logic behaviors
│   ├── nullish/           # isNullish, isNotNullish
│   │   └── index.test.ts
│   ├── type-checking/     # isDefined, isUndefined, isNumber
│   │   └── index.test.ts
│   └── negation/          # not
│       └── index.test.ts
├── id-generation/          # ID creation behaviors
│   └── index.test.ts
└── serialization/          # Object stringification behaviors
    └── index.test.ts
```

## Behavioral Test Categories

### 1. Array Operations (~53 functions)

#### Accessing Behaviors
```typescript
describe("Array Accessing Behaviors", () => {
  describe("when accessing first element", () => {
    it("returns first element of non-empty array")
    it("returns undefined for empty array")
    it("handles single-element arrays")
  })
  
  describe("when accessing last element", () => {
    it("returns last element of non-empty array")
    it("returns undefined for empty array")
    it("handles single-element arrays")
  })
  
  describe("when accessing nth element", () => {
    it("returns element at positive index")
    it("returns element at negative index (from end)")
    it("returns undefined for out-of-bounds index")
  })
})
```

#### Filtering Behaviors
```typescript
describe("Array Filtering Behaviors", () => {
  describe("when removing nullish values", () => {
    it("removes null and undefined values")
    it("preserves falsy non-nullish values (0, false, '')")
    it("maintains element order")
    it("returns empty array when all values are nullish")
  })
  
  describe("when finding unique values", () => {
    it("removes duplicate primitives")
    it("maintains first occurrence order")
    it("handles empty arrays")
    it("works with mixed types")
  })
})
```

### 2. Type Conversion Behaviors (~10 functions)

#### Primitive Conversions
```typescript
describe("Type Conversion Behaviors", () => {
  describe("when converting to boolean", () => {
    it("converts truthy strings to true")
    it("converts falsy strings to false")
    it("handles numeric values (0 = false, others = true)")
    it("returns error for unparseable values")
  })
  
  describe("when converting to number", () => {
    it("parses integer strings")
    it("parses decimal strings")
    it("handles negative numbers")
    it("returns error for non-numeric strings")
    it("handles scientific notation")
  })
})
```

#### Temporal Conversions
```typescript
describe("Temporal Conversion Behaviors", () => {
  describe("when converting to dates", () => {
    it("parses ISO 8601 date strings")
    it("handles date objects")
    it("returns error for invalid dates")
    it("preserves timezone information where applicable")
  })
})
```

### 3. String Operation Behaviors (~28 functions)

#### Case Conversion Behaviors
```typescript
describe("Case Conversion Behaviors", () => {
  const TEST_CASES = [
    { input: "hello world", camel: "helloWorld", pascal: "HelloWorld" },
    { input: "hello-world", snake: "hello_world", kebab: "hello-world" },
    { input: "HelloWorld", screamingSnake: "HELLO_WORLD" }
  ]
  
  describe("when converting case", () => {
    TEST_CASES.forEach(({ input, ...outputs }) => {
      Object.entries(outputs).forEach(([caseName, expected]) => {
        it(`converts "${input}" to ${caseName}: "${expected}"`)
      })
    })
    
    it("handles empty strings")
    it("preserves single words in appropriate case")
    it("handles numbers and special characters")
  })
})
```

### 4. DOM Operation Behaviors (~10 functions)

#### Value Extraction Behaviors
```typescript
describe("DOM Value Extraction Behaviors", () => {
  describe("when extracting from input elements", () => {
    it("gets value from text inputs")
    it("gets checked state from checkboxes")
    it("gets selected value from radio buttons")
    it("handles number inputs with validation")
    it("returns error when element not found")
  })
  
  describe("when extracting from select elements", () => {
    it("gets single selected value")
    it("gets multiple selected values")
    it("handles no selection")
  })
})
```

### 5. Functional Composition Behaviors (~2 functions)

#### Pipe Behaviors
```typescript
describe("Pipe Composition Behaviors", () => {
  describe("when composing functions", () => {
    it("applies functions left-to-right")
    it("passes output of each function to next")
    it("handles single function")
    it("handles empty function array (identity)")
    it("maintains type safety through composition")
  })
})
```

## Property-Based Testing Strategy

Use fast-check for generative testing:

```typescript
import * as fc from "fast-check"

describe("Array Operation Properties", () => {
  it("reverse is involutive", () => {
    fc.assert(
      fc.property(fc.array(fc.anything()), (arr) => {
        const reversed = reverse(reverse(arr))
        return deepEqual(reversed, arr)
      })
    )
  })
  
  it("compact never increases array length", () => {
    fc.assert(
      fc.property(fc.array(fc.option(fc.anything())), (arr) => {
        return compact(arr).length <= arr.length
      })
    )
  })
  
  it("unique maintains or reduces array length", () => {
    fc.assert(
      fc.property(fc.array(fc.anything()), (arr) => {
        return unique(arr).length <= arr.length
      })
    )
  })
})
```

## Edge Cases to Test

### Universal Edge Cases
1. **Empty inputs**: `[]`, `""`, `{}`, `null`, `undefined`
2. **Single element**: Arrays with one item
3. **Large inputs**: Arrays with 10,000+ elements
4. **Special characters**: Unicode, emojis, RTL text
5. **Type boundaries**: MAX_SAFE_INTEGER, -0, NaN, Infinity

### Array-Specific Edge Cases
1. Sparse arrays: `[1, , , 4]`
2. Arrays with holes
3. Arrays containing undefined vs missing elements
4. Circular references (where applicable)

### String-Specific Edge Cases
1. Multi-byte characters
2. Combining characters
3. Zero-width joiners
4. Surrogate pairs

### Number-Specific Edge Cases
1. Precision limits
2. Scientific notation
3. Hexadecimal/octal/binary literals
4. BigInt compatibility

## Coverage Achievement Strategy

### Phase 1: Fix Critical Bugs (Before Testing)
1. Fix `first` function implementation
2. Fix type imports
3. Fix naming mismatches

### Phase 2: High-Risk Functions (Week 1)
Test functions with complex logic or error-prone operations:
- All type conversion functions (Either returns)
- DOM operation functions (multiple code paths)
- Complex array operations (reduce, flatMap)

### Phase 3: Core Utilities (Week 2)
Test frequently-used functions:
- Array accessors (head, tail, first, last)
- String case conversions
- Object path operations
- Predicates

### Phase 4: Remaining Functions (Week 3)
- Simple array operations
- String padding/trimming
- Identity functions

### Phase 5: Property-Based Tests (Week 4)
Add generative tests for:
- Involutive operations (reverse)
- Associative operations (concat)
- Commutative operations (where applicable)
- Algebraic properties

## Test Implementation Guidelines

### 1. Test File Structure
```typescript
import { describe, it, expect } from "@std/testing"
import functionName from "../../../functionName/index.ts"

describe("functionName", () => {
  describe("behavior category", () => {
    it("specific behavior", () => {
      // Arrange
      const input = setupTestData()
      
      // Act
      const result = functionName(input)
      
      // Assert
      expect(result).toEqual(expected)
    })
  })
})
```

### 2. Naming Conventions
- Describe blocks: Use behavior descriptions, not function names
- It blocks: Start with verbs (returns, throws, handles, converts)
- Test data: Use descriptive names (emptyArray, nullishValues)

### 3. Assertion Patterns
```typescript
// For pure functions
expect(result).toEqual(expected)

// For Either returns
expect(result.right).toBeDefined()
expect(result.left).toBeUndefined()

// For errors
expect(result.left).toContainEqual(
  expect.objectContaining({ 
    tag: "Error",
    message: expect.stringContaining("expected text")
  })
)
```

## Metrics and Goals

### Coverage Targets
- **Line Coverage**: 100%
- **Branch Coverage**: 100%
- **Function Coverage**: 100%
- **Statement Coverage**: 100%

### Quality Metrics
- **Test Execution Time**: < 5 seconds for entire suite
- **Test Stability**: 0% flaky tests
- **Mutation Score**: > 90% (using Stryker or similar)

### Documentation Coverage
- Every public function has at least 3 test cases
- Every edge case documented in code comments
- Property-based tests for applicable functions

## Testing Tools and Configuration

### Required Dependencies
```json
{
  "imports": {
    "@std/testing": "jsr:@std/testing@^1.0.0",
    "fast-check": "npm:fast-check@^3.0.0"
  }
}
```

### Deno Test Configuration
```typescript
// deno.json
{
  "test": {
    "include": ["lib/adaptive/utilities/tests/"],
    "exclude": ["lib/adaptive/utilities/tests/fixtures/"],
    "parallel": true,
    "coverage": {
      "include": ["lib/adaptive/utilities/"],
      "exclude": ["lib/adaptive/utilities/tests/"]
    }
  }
}
```

### Coverage Script
```bash
deno task test:utilities --coverage=coverage/
deno coverage coverage/ --lcov > coverage.lcov
```

## Continuous Integration

### Pre-commit Hooks
1. Run affected tests
2. Check coverage doesn't decrease
3. Validate no `.only` or `.skip` in tests

### CI Pipeline
1. Run full test suite
2. Generate coverage report
3. Fail if coverage < 100%
4. Run mutation testing
5. Performance regression tests

## Maintenance and Evolution

### Adding New Functions
1. Write behavioral tests first (TDD)
2. Implement function
3. Add property-based tests
4. Document edge cases
5. Update coverage reports

### Refactoring Existing Functions
1. Ensure 100% coverage before refactoring
2. Add characterization tests if needed
3. Refactor implementation
4. Verify all tests still pass
5. Add new tests for new behaviors

## Conclusion

This testing plan prioritizes behavioral testing over implementation details, ensuring that utilities work correctly from the consumer's perspective. By organizing tests by behavior rather than by function, we make the test suite more maintainable and easier to understand. The combination of example-based and property-based testing will achieve 100% coverage while catching edge cases that might be missed by traditional testing approaches.