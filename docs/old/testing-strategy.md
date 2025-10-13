# Testing Strategy

## Philosophy

**ALL tests are temporary** until Auditor (formal verification) and Quarrier (property-based testing) are production-ready. When those libraries are complete, they will generate ALL tests automatically with 100% coverage. Until then, we write tests to verify behavior for code we're actively working on.

## Core Principles

1. **Test behavior, not implementation** - Users don't care about your private methods, they care if it works
2. **MOCK NOTHING** - Use real implementations; only intercept at edges (MSW-style for HTTP/network) — rarely necessary, confirm with The Architect
3. **All tests are integration tests** - Assume all Sitebender functions work, use them directly
4. **Property-based testing finds edge cases** - Use fast-check to discover what you didn't think of
5. **One test file per function** - Tests live in `index.test.ts` alongside `index.ts`
6. **Temporary by design** - These tests will be replaced by Auditor-generated formal proofs

## Test Requirements

### When to Write Tests

✅ **Write tests for:**
- NEW functions/components (TDD: test FIRST, then implement)
- Existing code you EDIT or fix (test BEFORE the fix)
- ANY code you touch

❌ **Don't write tests for:**
- Legacy code you're not modifying
- Boxed functions IF vanilla + lift are fully tested (composition is proven by lift tests)
- Code that will be deleted soon

### Test Location

**Rule**: One test file per function/component in the same folder

```
src/
  myFunction/
    index.ts          # The function
    index.test.ts     # Tests for the function
    _helper/
      index.ts        # Private helper
      index.test.ts   # Tests for helper (required!)
```

## Testing Framework

### Use ONLY These Tools

```typescript
// Test framework
import { assert, assertEquals, assertThrows } from "jsr:@std/assert"

// Property-based testing
import * as fc from "npm:fast-check"

// Test runner
Deno.test("description", () => {
  // test code
})

// Test steps (for organization)
Deno.test("group description", async (t) => {
  await t.step("specific behavior", () => {
    // test code
  })
  
  await t.step("another behavior", () => {
    // test code
  })
})
```

**FORBIDDEN**:
- ❌ Vitest
- ❌ Jasmine
- ❌ Jest
- ❌ Mocha
- ❌ Any other test framework

Only `Deno.test` and `fast-check`. Period.

## Test Structure

### Basic Test Pattern

```typescript
import { assert, assertEquals } from "jsr:@std/assert"

import myFunction from "./index.ts"

Deno.test("myFunction - basic behavior", () => {
  const result = myFunction(input)
  
  assertEquals(result, expected)
})

Deno.test("myFunction - edge cases", async (t) => {
  await t.step("handles empty input", () => {
    const result = myFunction("")

    assertEquals(result, "")
  })
  
  await t.step("handles null safely", () => {
    const result = myFunction(null)

    assertEquals(result, defaultValue)
  })
})
```

### Property-Based Testing Pattern

Use `fast-check` to generate test cases and discover edge cases:

```typescript
import * as fc from "npm:fast-check"
import { assertEquals } from "jsr:@std/assert"

import double from "./index.ts"

Deno.test("double - property: preserves sign", () => {
  fc.assert(
    fc.property(fc.integer(), (n) => {
      const result = double(n)
      
      if (n > 0) {
        assert(result > 0, "Positive input should give positive output")
      } else if (n < 0) {
        assert(result < 0, "Negative input should give negative output")
      } else {
        assertEquals(result, 0, "Zero should remain zero")
      }
    })
  )
})

Deno.test("double - property: correct calculation", () => {
  fc.assert(
    fc.property(fc.integer(), (n) => {
      const result = double(n)

      assertEquals(result, n * 2)
    })
  )
})
```

### Monad Testing Pattern

When testing lifted functions (Result/Validation monads):

```typescript
import { assert, assertEquals } from "jsr:@std/assert"

import ok from "../../result/ok/index.ts"
import error from "../../result/error/index.ts"
import isOk from "../../result/isOk/index.ts"
import isError from "../../result/isError/index.ts"
import getOrElse from "../../result/getOrElse/index.ts"

import liftedDouble from "./index.ts"

Deno.test("liftedDouble - Result monad", async (t) => {
  await t.step("Ok value maps correctly", () => {
    const result = liftedDouble(ok(5))
    
    assert(isOk(result), "Expected Ok")
    assertEquals(getOrElse(0)(result), 10)
  })
  
  await t.step("Error propagates", () => {
    const result = liftedDouble(error("test error"))
    
    assert(isError(result), "Expected Error")
  })
})
```

## What to Test

### Essential Test Cases

Every function should test:

1. **Happy path** - Normal, expected inputs
2. **Edge cases** - Empty, zero, null, undefined, max/min values
3. **Error cases** - Invalid inputs, boundary violations
4. **Type preservation** - Result stays Result, Validation stays Validation
5. **Properties** - Mathematical properties (commutativity, associativity, etc.)

### Example: Comprehensive Function Tests

```typescript
import { assert, assertEquals } from "jsr:@std/assert"
import * as fc from "npm:fast-check"

import add from "./index.ts"

// 1. Happy path
Deno.test("add - basic addition", () => {
  assertEquals(add(2)(3), 5)
})

// 2. Edge cases
Deno.test("add - edge cases", async (t) => {
  await t.step("zero + zero", () => {
    assertEquals(add(0)(0), 0)
  })
  
  await t.step("negative numbers", () => {
    assertEquals(add(-5)(-3), -8)
  })
  
  await t.step("large numbers", () => {
    const max = Number.MAX_SAFE_INTEGER
    assertEquals(add(max)(0), max)
  })
})

// 3. Properties
Deno.test("add - property: commutativity", () => {
  fc.assert(
    fc.property(fc.integer(), fc.integer(), (a, b) => {
      assertEquals(add(a)(b), add(b)(a))
    })
  )
})

Deno.test("add - property: associativity", () => {
  fc.assert(
    fc.property(
      fc.integer(), 
      fc.integer(), 
      fc.integer(), 
      (a, b, c) => {
        assertEquals(
          add(add(a)(b))(c),
          add(a)(add(b)(c))
        )
      }
    )
  )
})

Deno.test("add - property: identity", () => {
  fc.assert(
    fc.property(fc.integer(), (n) => {
      assertEquals(add(n)(0), n)
      assertEquals(add(0)(n), n)
    })
  )
})
```

## Fast-Check Generators

Common generators for property-based testing:

```typescript
// Primitives
fc.integer()              // Any integer
fc.nat()                  // Natural numbers (0, 1, 2, ...)
fc.float()                // Floating point numbers
fc.string()               // Strings
fc.boolean()              // Booleans

// Constraints
fc.integer({ min: 0, max: 100 })
fc.string({ maxLength: 50 })
fc.float({ noNaN: true })

// Collections
fc.array(fc.integer())    // Arrays of integers
fc.record({               // Objects
  name: fc.string(),
  age: fc.nat()
})

// Combinations
fc.tuple(fc.string(), fc.integer())  // Pairs
fc.oneof(fc.string(), fc.integer())  // Union types
```

## Anti-Patterns

### ❌ DON'T Mock Our Own Functions

```typescript
// WRONG - Mocking Sitebender functions
const mockAdd = jest.fn(() => 5)  // NO!

// RIGHT - Use the real function
import add from "@sitebender/toolsmith/math/add/index.ts"

const result = add(2)(3)  // YES!
```

### ❌ DON'T Test Implementation Details

```typescript
// WRONG - Testing private implementation
test("uses internal cache", () => {
  expect(fn._cache.size).toBe(0)  // NO!
})

// RIGHT - Test behavior
test("returns correct result", () => {
  assertEquals(fn(input), expected)  // YES!
})
```

### ❌ DON'T Write Tests Without fast-check

```typescript
// INCOMPLETE - Only testing specific values
test("add works", () => {
  assertEquals(add(2)(3), 5)
  assertEquals(add(0)(0), 0)
  assertEquals(add(-1)(1), 0)
})

// BETTER - Property-based testing
test("add - property: correct sum", () => {
  fc.assert(
    fc.property(fc.integer(), fc.integer(), (a, b) => {
      assertEquals(add(a)(b), a + b)
    })
  )
})
```

## Special Cases

### Testing Effect Boundaries

When testing IO effects, test at the boundary, don't mock internals:

```typescript
// For HTTP requests, use MSW (Mock Service Worker pattern)
// For file system, use temp directories
// For database, use test database

import { assertEquals } from "jsr:@std/assert"

Deno.test("fetchUser - handles API response", async () => {
  // Use a test API endpoint, not a mock
  const result = await fetchUser("test-id")
  
  assert(isOk(result))

  const user = getOrElse(null)(result)

  assert(isNotNull(null))
})
```

### Testing Pure Functions

Pure functions are easiest to test - no setup, no teardown, just input → output:

```typescript
import { assertEquals } from "jsr:@std/assert"
import * as fc from "npm:fast-check"

Deno.test("pure function - deterministic", () => {
  fc.assert(
    fc.property(fc.anything(), (input) => {
      const result1 = pureFunction(input)
      const result2 = pureFunction(input)
      
      assertEquals(result1, result2, "Same input must give same output")
    })
  )
})
```

### Testing Composed Functions

Test the composition, not the individual parts (if parts are already tested):

```typescript
import { assertEquals } from "jsr:@std/assert"

import compose from "@sitebender/toolsmith/function/compose/index.ts"
import double from "./double/index.ts"
import add from "./add/index.ts"

Deno.test("composition - double then add 10", () => {
  const doubleAndAdd10 = compose(add(10))(double)
  
  assertEquals(doubleAndAdd10(5), 20)  // (5 * 2) + 10 = 20
})
```

## Coverage Requirements

- Target: **100% REPORTED coverage**
- Use `deno task test:cov` to check coverage
- Use `// deno-coverage-ignore [reason]` ONLY when:
  1. You've made EVERY effort to test
  2. It's genuinely impossible (e.g., testing Deno internals)
  3. You have The Architect's approval
  4. You document WHY on the same line

```typescript
// deno-coverage-ignore [testing Deno.readTextFile internals would require mocking Deno itself]
const content = await Deno.readTextFile(path)
```

## Real-World Example

Here's a complete test file from Toolsmith that follows all these rules:

See: `libraries/toolsmith/src/lift/liftUnary/index.test.ts`

Key features:
- ✅ Uses Deno.test and t.step
- ✅ Property-based tests with fast-check
- ✅ Tests behavior (monad laws), not implementation
- ✅ Real monads (Result/Validation), no mocks
- ✅ Comprehensive edge cases
- ✅ Clear, descriptive test names
- ✅ Tests composition and currying

## Pre-Commit Requirements

Before committing:

1. ✅ `deno task test` - ALL tests MUST pass
2. ✅ `deno task test:cov` - Check coverage
3. ✅ `deno task lint` - Zero lint errors
4. ✅ `deno task typecheck` - Zero type errors  
5. ✅ `deno task fmt` - Code formatted

**NO EXCEPTIONS**. No "I'll fix it next commit." NO.

## Temporary Nature of These Tests

Remember: **All tests are throwaway** until Auditor is ready.

Auditor will:
- Generate tests from formal specifications
- Prove correctness mathematically (not just test it)
- Achieve 100% coverage automatically
- Generate counterexamples for failures
- Verify properties across ALL possible inputs

Until then, write good tests, but don't over-invest. The goal is confidence that current code works, not permanent test infrastructure.

## Summary

1. **Test behavior, not implementation**
2. **Use real implementations, no mocks**
3. **Property-based tests with fast-check**
4. **Tests in index.test.ts alongside index.ts**
5. **Only Deno.test + fast-check, nothing else**
6. **100% reported coverage (with justified exceptions)**
7. **All tests pass before commit**
8. **All code written in this pass passes the linter**
9. **All code written in this pass passes the type check**
10. **Remember: temporary until Auditor is ready**

## Resources

- fast-check docs: https://fast-check.dev/
- Deno test docs: https://docs.deno.com/runtime/fundamentals/testing/
- Example tests: `libraries/toolsmith/src/lift/*/index.test.ts`
