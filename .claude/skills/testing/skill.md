---
name: testing
description: Patterns for testing pure functions using Deno's test framework. Covers unit tests, property-based testing, test organization, and assertion patterns. Use when writing tests. Includes script for generating test boilerplate.
---

# Testing

## Core Principle

**Test behavior, not implementation. Pure functions are trivial to test.**

Pure functions have no side effects and always return the same output for the same input. This makes testing straightforward: supply inputs, assert outputs. Use property-based testing to verify invariants across many inputs.

## When to Use This Skill

Use this skill when:
- Writing unit tests for functions
- Writing property-based tests
- Testing type guards and predicates
- Testing error handling (Result/Validation)
- Organizing test files
- Writing test assertions
- Testing curried functions

**This skill is proactive** - Write tests alongside every function (TDD).

## Script Integration

**Generate test file:**
```bash
deno task new:test <functionName>.config.ts
```

This generates:
- `functionName/index.test.ts` with test structure
- Happy path, edge cases, and error path sections
- Property-based test templates (if requested)
- Proper imports

**Config file format:**
```typescript
import type { TestConfig } from "./.claude/skills/testing/types.ts"

export default {
  functionName: "add",
  functionPath: "./add/index.ts",
  testCases: [
    {
      description: "adds two positive numbers",
      input: "add(2)(3)",
      expected: "5"
    }
  ],
  includePropertyTests: true,
  includeErrorTests: false,
} satisfies TestConfig
```

## Patterns

### Pattern 1: Testing Unary Functions

Unary functions take one parameter and return a value. Test with various inputs covering happy path, edge cases, and invalid inputs.

**Structure:**
```typescript
import { assertEquals } from "@std/assert"
import myFunction from "./index.ts"

Deno.test("myFunction", async (t) => {
  await t.step("happy path", async (t) => {
    await t.step("handles valid input", () => {
      const result = myFunction(validInput)
      assertEquals(result, expectedOutput)
    })
  })

  await t.step("edge cases", async (t) => {
    await t.step("handles empty input", () => {
      const result = myFunction(emptyInput)
      assertEquals(result, expectedEmptyOutput)
    })
  })
})
```

**Example (isPositive):**
```typescript
import { assertEquals } from "@std/assert"
import isPositive from "./index.ts"

//++ Tests for isPositive predicate
Deno.test("isPositive", async (t) => {
  await t.step("happy path", async (t) => {
    await t.step("returns true for positive numbers", () => {
      assertEquals(isPositive(1), true)
      assertEquals(isPositive(42), true)
      assertEquals(isPositive(0.001), true)
    })

    await t.step("returns false for non-positive numbers", () => {
      assertEquals(isPositive(0), false)
      assertEquals(isPositive(-1), false)
      assertEquals(isPositive(-42.5), false)
    })
  })

  await t.step("edge cases", async (t) => {
    await t.step("handles very small positive number", () => {
      assertEquals(isPositive(Number.MIN_VALUE), true)
    })

    await t.step("handles very large positive number", () => {
      assertEquals(isPositive(Number.MAX_VALUE), true)
    })

    await t.step("handles negative infinity", () => {
      assertEquals(isPositive(Number.NEGATIVE_INFINITY), false)
    })

    await t.step("handles positive infinity", () => {
      assertEquals(isPositive(Number.POSITIVE_INFINITY), true)
    })
  })
})
```

**Key Points:**
- Group related assertions in steps
- Use descriptive step names
- Test boundary values
- Test special cases (Infinity, MIN_VALUE, MAX_VALUE)

### Pattern 2: Testing Curried Functions

Curried functions return functions. Test both partial application and full application.

**Structure:**
```typescript
import { assertEquals } from "@std/assert"
import curriedFunction from "./index.ts"

Deno.test("curriedFunction", async (t) => {
  await t.step("partial application", async (t) => {
    await t.step("returns a function when partially applied", () => {
      const partial = curriedFunction(firstArg)
      assertEquals(typeof partial, "function")
    })

    await t.step("partial application is reusable", () => {
      const partial = curriedFunction(firstArg)
      const result1 = partial(secondArg1)
      const result2 = partial(secondArg2)
      assertEquals(result1, expected1)
      assertEquals(result2, expected2)
    })
  })

  await t.step("full application", async (t) => {
    await t.step("produces correct result with valid inputs", () => {
      const result = curriedFunction(firstArg)(secondArg)
      assertEquals(result, expectedResult)
    })
  })
})
```

**Example (add):**
```typescript
import { assertEquals } from "@std/assert"
import add from "./index.ts"

//++ Tests for add (curried addition)
Deno.test("add", async (t) => {
  await t.step("partial application", async (t) => {
    await t.step("returns a function when partially applied", () => {
      const addTwo = add(2)
      assertEquals(typeof addTwo, "function")
    })

    await t.step("partial application is reusable", () => {
      const addFive = add(5)
      assertEquals(addFive(3), 8)
      assertEquals(addFive(10), 15)
      assertEquals(addFive(-2), 3)
    })

    await t.step("different partial applications are independent", () => {
      const addTwo = add(2)
      const addTen = add(10)
      assertEquals(addTwo(3), 5)
      assertEquals(addTen(3), 13)
    })
  })

  await t.step("full application", async (t) => {
    await t.step("adds two positive numbers", () => {
      assertEquals(add(2)(3), 5)
      assertEquals(add(100)(200), 300)
    })

    await t.step("adds negative numbers", () => {
      assertEquals(add(-5)(3), -2)
      assertEquals(add(5)(-3), 2)
      assertEquals(add(-5)(-3), -8)
    })

    await t.step("adds zero", () => {
      assertEquals(add(0)(5), 5)
      assertEquals(add(5)(0), 5)
      assertEquals(add(0)(0), 0)
    })
  })

  await t.step("edge cases", async (t) => {
    await t.step("handles decimal numbers", () => {
      assertEquals(add(0.1)(0.2), 0.30000000000000004) // JavaScript precision
    })

    await t.step("handles very large numbers", () => {
      const result = add(Number.MAX_VALUE)(1)
      assertEquals(result > Number.MAX_VALUE, false)
    })
  })
})
```

**Key Points:**
- Test partial application returns a function
- Test partial application is reusable (call it multiple times)
- Test different partial applications are independent
- Test full application with various inputs

### Pattern 3: Testing Higher-Order Functions

Higher-order functions take functions as parameters. Test with various predicate/mapper/reducer functions.

**Structure:**
```typescript
import { assertEquals } from "@std/assert"
import higherOrder from "./index.ts"

Deno.test("higherOrder", async (t) => {
  await t.step("with simple functions", async (t) => {
    await t.step("applies function correctly", () => {
      const simpleF = (x: number) => x * 2
      const result = higherOrder(simpleF)([1, 2, 3])
      assertEquals(result, [2, 4, 6])
    })
  })

  await t.step("with complex functions", async (t) => {
    await t.step("handles complex transformations", () => {
      const complexF = (x: number) => x * x + 1
      const result = higherOrder(complexF)([1, 2, 3])
      assertEquals(result, [2, 5, 10])
    })
  })
})
```

**Example (filter):**
```typescript
import { assertEquals } from "@std/assert"
import filter from "./index.ts"

//++ Tests for filter (higher-order array function)
Deno.test("filter", async (t) => {
  await t.step("with predicates", async (t) => {
    await t.step("filters with simple predicate", () => {
      const isEven = (n: number) => n % 2 === 0
      const result = filter(isEven)([1, 2, 3, 4, 5, 6])
      assertEquals(result, [2, 4, 6])
    })

    await t.step("filters with always-true predicate", () => {
      const alwaysTrue = (_n: number) => true
      const result = filter(alwaysTrue)([1, 2, 3])
      assertEquals(result, [1, 2, 3])
    })

    await t.step("filters with always-false predicate", () => {
      const alwaysFalse = (_n: number) => false
      const result = filter(alwaysFalse)([1, 2, 3])
      assertEquals(result, [])
    })
  })

  await t.step("with empty arrays", async (t) => {
    await t.step("returns empty array for empty input", () => {
      const isPositive = (n: number) => n > 0
      const result = filter(isPositive)([])
      assertEquals(result, [])
    })
  })

  await t.step("partial application", async (t) => {
    await t.step("reuses filtered predicate", () => {
      const filterPositive = filter((n: number) => n > 0)
      assertEquals(filterPositive([1, -1, 2, -2]), [1, 2])
      assertEquals(filterPositive([-5, -10]), [])
      assertEquals(filterPositive([1, 2, 3]), [1, 2, 3])
    })
  })
})
```

**Key Points:**
- Test with different function arguments
- Test with edge case functions (always true, always false, identity)
- Test partial application with function argument

### Pattern 4: Property-Based Testing

Property-based tests verify invariants hold for many randomly generated inputs. Use fast-check library.

**When to Use:**
- Testing mathematical properties (commutativity, associativity, identity)
- Testing round-trip properties (serialize/deserialize)
- Testing invariants (array length, sorted order)
- Testing functions with wide input domains

**Structure:**
```typescript
import { assertEquals } from "@std/assert"
import * as fc from "npm:fast-check"
import myFunction from "./index.ts"

Deno.test("myFunction properties", async (t) => {
  await t.step("property: some invariant holds", () => {
    fc.assert(
      fc.property(fc.integer(), (input) => {
        const result = myFunction(input)
        // Assert invariant
        return result >= 0 // example: always positive
      })
    )
  })
})
```

**Example (add properties):**
```typescript
import { assertEquals } from "@std/assert"
import * as fc from "npm:fast-check"
import add from "./index.ts"

//++ Property-based tests for add
Deno.test("add properties", async (t) => {
  await t.step("property: commutative", () => {
    fc.assert(
      fc.property(fc.integer(), fc.integer(), (a, b) => {
        return add(a)(b) === add(b)(a)
      })
    )
  })

  await t.step("property: associative", () => {
    fc.assert(
      fc.property(fc.integer(), fc.integer(), fc.integer(), (a, b, c) => {
        return add(add(a)(b))(c) === add(a)(add(b)(c))
      })
    )
  })

  await t.step("property: identity element is zero", () => {
    fc.assert(
      fc.property(fc.integer(), (a) => {
        return add(a)(0) === a && add(0)(a) === a
      })
    )
  })

  await t.step("property: inverse operation with subtract", () => {
    fc.assert(
      fc.property(fc.integer(), fc.integer(), (a, b) => {
        const sum = add(a)(b)
        const difference = sum - b
        return difference === a
      })
    )
  })
})
```

**Common Properties to Test:**
- **Idempotence:** `f(f(x)) === f(x)`
- **Commutativity:** `f(a, b) === f(b, a)`
- **Associativity:** `f(f(a, b), c) === f(a, f(b, c))`
- **Identity:** `f(x, identity) === x`
- **Round-trip:** `deserialize(serialize(x)) === x`
- **Inverse:** `f(g(x)) === x`
- **Monotonicity:** `a < b` implies `f(a) <= f(b)`

**Generators (fast-check):**
- `fc.integer()` - random integers
- `fc.string()` - random strings
- `fc.boolean()` - random booleans
- `fc.array(fc.integer())` - random arrays
- `fc.record({ key: fc.string() })` - random objects
- `fc.oneof(fc.integer(), fc.string())` - union types

**Key Points:**
- Write properties as predicates that return boolean
- Use appropriate generators for input types
- Test mathematical properties when applicable
- Combine with unit tests (property tests find edge cases, unit tests document expected behavior)

### Pattern 5: Testing Error Paths (Result/Validation)

Functions returning Result or Validation need both success and failure path tests.

**Structure (Result):**
```typescript
import { assert, assertEquals, fail } from "@std/assert"
import fold from "@sitebender/toolsmith/monads/result/fold/index.ts"
import myFunction from "./index.ts"

Deno.test("myFunction", async (t) => {
  await t.step("success path", async (t) => {
    await t.step("returns Ok for valid input", () => {
      const result = myFunction(validInput)
      fold<MyError, void>(
        (_error) => fail("Expected Ok but got Error")
      )(
        (value) => assertEquals(value, expectedValue)
      )(result)
    })
  })

  await t.step("error path", async (t) => {
    await t.step("returns Error for invalid input", () => {
      const result = myFunction(invalidInput)
      fold<MyError, void>(
        (error) => assertEquals(error.code, expectedErrorCode)
      )(
        (_value) => fail("Expected Error but got Ok")
      )(result)
    })
  })
})
```

**Example (parseInteger Result):**
```typescript
import { assert, assertEquals, fail } from "@std/assert"
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import fold from "@sitebender/toolsmith/monads/result/fold/index.ts"
import parseInteger from "./index.ts"

//++ Tests for parseInteger (returns Result)
Deno.test("parseInteger", async (t) => {
  await t.step("success path", async (t) => {
    await t.step("parses valid integer string", () => {
      const result: Result<ValidationError, number> = parseInteger("42")
      fold<ValidationError, void>(
        (_error) => fail("Expected Ok but got Error")
      )(
        (value) => assertEquals(value, 42)
      )(result)
    })

    await t.step("parses negative integer", () => {
      const result = parseInteger("-123")
      fold<ValidationError, void>(
        (_error) => fail("Expected Ok but got Error")
      )(
        (value) => assertEquals(value, -123)
      )(result)
    })

    await t.step("parses zero", () => {
      const result = parseInteger("0")
      fold<ValidationError, void>(
        (_error) => fail("Expected Ok but got Error")
      )(
        (value) => assertEquals(value, 0)
      )(result)
    })
  })

  await t.step("error path", async (t) => {
    await t.step("returns Error for non-numeric string", () => {
      const result = parseInteger("abc")
      assertEquals(isError(result), true)
      if (isError(result)) {
        assertEquals(result.error.code, "PARSE_ERROR")
        assertEquals(result.error.field, "integer")
      }
    })

    await t.step("returns Error for decimal number", () => {
      const result = parseInteger("42.5")
      assertEquals(isError(result), true)
      if (isError(result)) {
        assertEquals(result.error.code, "PARSE_ERROR")
      }
    })

    await t.step("returns Error for empty string", () => {
      const result = parseInteger("")
      assertEquals(isError(result), true)
    })
  })

  await t.step("edge cases", async (t) => {
    await t.step("handles whitespace", () => {
      const result = parseInteger("  42  ")
      fold<ValidationError, void>(
        (_error) => fail("Expected Ok but got Error")
      )(
        (value) => assertEquals(value, 42)
      )(result)
    })

    await t.step("handles very large numbers", () => {
      const result = parseInteger("999999999999999")
      assertEquals(isOk(result), true)
    })
  })
})
```

**Example (validateUser Validation):**
```typescript
import { assertEquals } from "@std/assert"
import type { Validation } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { User } from "./types/index.ts"
import isSuccess from "@sitebender/toolsmith/monads/validation/isSuccess/index.ts"
import isFailure from "@sitebender/toolsmith/monads/validation/isFailure/index.ts"
import validateUser from "./index.ts"

//++ Tests for validateUser (returns Validation)
Deno.test("validateUser", async (t) => {
  await t.step("success path", async (t) => {
    await t.step("validates user with all valid fields", () => {
      const input = {
        name: "Alice",
        email: "alice@example.com",
        age: 25,
      }
      const result: Validation<ValidationError, User> = validateUser(input)
      assertEquals(isSuccess(result), true)
      if (isSuccess(result)) {
        assertEquals(result.value.name, "Alice")
        assertEquals(result.value.email, "alice@example.com")
        assertEquals(result.value.age, 25)
      }
    })
  })

  await t.step("error path - single field", async (t) => {
    await t.step("returns Failure for invalid email", () => {
      const input = {
        name: "Alice",
        email: "invalid-email",
        age: 25,
      }
      const result = validateUser(input)
      assertEquals(isFailure(result), true)
      if (isFailure(result)) {
        assertEquals(result.errors.length, 1)
        assertEquals(result.errors[0].field, "email")
      }
    })

    await t.step("returns Failure for negative age", () => {
      const input = {
        name: "Alice",
        email: "alice@example.com",
        age: -5,
      }
      const result = validateUser(input)
      assertEquals(isFailure(result), true)
      if (isFailure(result)) {
        assertEquals(result.errors.length, 1)
        assertEquals(result.errors[0].field, "age")
      }
    })
  })

  await t.step("error path - multiple fields", async (t) => {
    await t.step("accumulates all validation errors", () => {
      const input = {
        name: "",
        email: "invalid",
        age: -5,
      }
      const result = validateUser(input)
      assertEquals(isFailure(result), true)
      if (isFailure(result)) {
        assertEquals(result.errors.length, 3)
        const fields = result.errors.map((e) => e.field)
        assertEquals(fields.includes("name"), true)
        assertEquals(fields.includes("email"), true)
        assertEquals(fields.includes("age"), true)
      }
    })
  })
})
```

**Key Points:**
- Always use type guard predicates (`isOk`, `isError`, `isSuccess`, `isFailure`)
- Use type narrowing with predicates (`if (isOk(result))`) to access value/error
- Test both success and failure paths
- For Validation, test error accumulation (multiple errors)
- Test specific error codes and messages
- Test all validation rules

## Test Organization

### File Structure

Each function has its own test file co-located with the implementation:
```
myFunction/
  index.ts
  index.test.ts
  types/
    index.ts
```

### Test File Structure

Tests are organized hierarchically using Deno.test and t.step:

```typescript
Deno.test("functionName", async (t) => {
  await t.step("category", async (t) => {
    await t.step("specific test case", () => {
      // assertions
    })
  })
})
```

**Standard categories:**
- `happy path` - Normal, expected usage
- `edge cases` - Boundary values, special inputs
- `error paths` - Invalid inputs, failure conditions
- `partial application` - For curried functions
- `property-based tests` - Invariant verification

### Naming Conventions

**Test file:** `index.test.ts` (or `index.test.tsx` for components)

**Test description:** Function name being tested
```typescript
Deno.test("myFunction", async (t) => { ... })
```

**Step descriptions:** Descriptive, present tense
```typescript
await t.step("returns true for positive numbers", () => { ... })
await t.step("handles empty array", () => { ... })
await t.step("accumulates validation errors", () => { ... })
```

## Assertion Patterns

### Basic Assertions

Use `assertEquals` from `@std/assert` for most assertions:

```typescript
import { assertEquals } from "@std/assert"

// Value equality
assertEquals(result, expected)

// Boolean checks
assertEquals(isValid, true)
assertEquals(isEmpty, false)

// Array equality
assertEquals(result, [1, 2, 3])

// Object equality
assertEquals(result, { name: "Alice", age: 25 })
```

### Type Guard Assertions

For discriminated unions (Result, Validation, error types), use type guard predicates:

```typescript
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

// Check with type guard predicate
assertEquals(isOk(result), true)

// Then narrow and check value
if (isOk(result)) {
  assertEquals(result.value, expectedValue)
}
```

### Predicate Assertions

For boolean predicates:

```typescript
// Direct assertion
assertEquals(isPrime(7), true)
assertEquals(isPrime(4), false)

// Computed predicates
assertEquals(result > 0, true)
assertEquals(array.length === 0, true)
```

### Never Use

❌ **Don't use try/catch in tests:**
```typescript
// WRONG
try {
  myFunction(input)
} catch (e) {
  assertEquals(e.message, "error")
}
```

Functions should return Result/Validation, not throw.

❌ **Don't use loose equality:**
```typescript
// WRONG
assertEquals(result == expected, true)
```

Use strict equality via `assertEquals(result, expected)`.

## Common Violations

### Violation 1: Testing Implementation Instead of Behavior

❌ **Wrong:**
```typescript
Deno.test("add", async (t) => {
  await t.step("uses + operator internally", () => {
    // Testing implementation detail
  })
})
```

✅ **Correct:**
```typescript
Deno.test("add", async (t) => {
  await t.step("returns sum of two numbers", () => {
    assertEquals(add(2)(3), 5)
  })
})
```

### Violation 2: Not Testing Partial Application

❌ **Wrong:**
```typescript
Deno.test("add", async (t) => {
  await t.step("adds numbers", () => {
    assertEquals(add(2)(3), 5)
  })
  // Missing partial application tests
})
```

✅ **Correct:**
```typescript
Deno.test("add", async (t) => {
  await t.step("partial application", async (t) => {
    await t.step("returns function", () => {
      const addTwo = add(2)
      assertEquals(typeof addTwo, "function")
    })

    await t.step("is reusable", () => {
      const addTwo = add(2)
      assertEquals(addTwo(3), 5)
      assertEquals(addTwo(5), 7)
    })
  })
})
```

### Violation 3: Not Using Type Guards Before Accessing Value

❌ **Wrong:**
```typescript
Deno.test("parseInteger", async (t) => {
  await t.step("parses number", () => {
    const result = parseInteger("42")
    assertEquals(result.value, 42) // Type error! value might not exist
  })
})
```

✅ **Correct:**
```typescript
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

Deno.test("parseInteger", async (t) => {
  await t.step("parses number", () => {
    const result = parseInteger("42")
    assertEquals(isOk(result), true)
    if (isOk(result)) {
      assertEquals(result.value, 42)
    }
  })
})
```

### Violation 4: Using try/catch for Error Testing

❌ **Wrong:**
```typescript
Deno.test("divide", async (t) => {
  await t.step("throws on division by zero", () => {
    try {
      divide(5)(0)
      throw new Error("Should have thrown")
    } catch (e) {
      assertEquals(e.message, "Division by zero")
    }
  })
})
```

✅ **Correct:**
```typescript
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"

Deno.test("divide", async (t) => {
  await t.step("returns Error for division by zero", () => {
    const result = divide(5)(0)
    assertEquals(isError(result), true)
    if (isError(result)) {
      assertEquals(result.error.code, "DIVISION_BY_ZERO")
    }
  })
})
```

### Violation 5: Insufficient Edge Case Testing

❌ **Wrong:**
```typescript
Deno.test("isPositive", async (t) => {
  await t.step("works", () => {
    assertEquals(isPositive(5), true)
  })
})
```

✅ **Correct:**
```typescript
Deno.test("isPositive", async (t) => {
  await t.step("happy path", async (t) => {
    await t.step("returns true for positive", () => {
      assertEquals(isPositive(5), true)
    })

    await t.step("returns false for zero", () => {
      assertEquals(isPositive(0), false)
    })

    await t.step("returns false for negative", () => {
      assertEquals(isPositive(-5), false)
    })
  })

  await t.step("edge cases", async (t) => {
    await t.step("handles MIN_VALUE", () => {
      assertEquals(isPositive(Number.MIN_VALUE), true)
    })

    await t.step("handles POSITIVE_INFINITY", () => {
      assertEquals(isPositive(Number.POSITIVE_INFINITY), true)
    })

    await t.step("handles NEGATIVE_INFINITY", () => {
      assertEquals(isPositive(Number.NEGATIVE_INFINITY), false)
    })
  })
})
```

### Violation 6: Not Testing Error Accumulation in Validation

❌ **Wrong:**
```typescript
Deno.test("validateUser", async (t) => {
  await t.step("validates user", () => {
    const result = validateUser(validUser)
    assertEquals(isSuccess(result), true)
  })
  // Missing test for multiple validation errors
})
```

✅ **Correct:**
```typescript
import isSuccess from "@sitebender/toolsmith/monads/validation/isSuccess/index.ts"
import isFailure from "@sitebender/toolsmith/monads/validation/isFailure/index.ts"

Deno.test("validateUser", async (t) => {
  await t.step("success path", async (t) => {
    await t.step("validates valid user", () => {
      const result = validateUser(validUser)
      assertEquals(isSuccess(result), true)
    })
  })

  await t.step("error path", async (t) => {
    await t.step("accumulates multiple errors", () => {
      const invalidUser = {
        name: "",
        email: "invalid",
        age: -5,
      }
      const result = validateUser(invalidUser)
      assertEquals(isFailure(result), true)
      if (isFailure(result)) {
        assertEquals(result.errors.length, 3)
      }
    })
  })
})
```

## Examples

See the `examples/` directory for complete, correct test examples:

**Unary Function Tests:**
- `examples/isPositive.test.ts` - Testing a simple predicate
- `examples/double.test.ts` - Testing a simple unary function

**Curried Function Tests:**
- `examples/add.test.ts` - Testing curried arithmetic
- `examples/multiply.test.ts` - Testing multi-parameter curried function

**Higher-Order Function Tests:**
- `examples/filter.test.ts` - Testing function that takes predicate
- `examples/map.test.ts` - Testing function that takes mapper

**Result Tests:**
- `examples/parseInteger.test.ts` - Testing Result-returning parser
- `examples/divide.test.ts` - Testing Result with error cases

**Validation Tests:**
- `examples/validateUser.test.ts` - Testing Validation with error accumulation
- `examples/validateEmail.test.ts` - Testing single-field validation

**Property-Based Tests:**
- `examples/addProperties.test.ts` - Mathematical properties
- `examples/sortProperties.test.ts` - Collection invariants

## Cross-References

**References:**
- function-implementation skill - For functions being tested
- error-handling skill - For testing Result/Validation
- sitebender-predicates skill - For testing predicates
- operator-substitutions skill - For semantic function usage in tests

**Referenced by:**
- All skills - Testing is fundamental to all development

## Summary

1. **TDD:** Write tests alongside functions
2. **Pure functions:** Test inputs → outputs
3. **Organization:** Use t.step for hierarchical structure
4. **Categories:** Happy path, edge cases, error paths, partial application, properties
5. **Curried functions:** Test partial application and reusability
6. **Result/Validation:** Always check _tag first, then narrow
7. **Property tests:** Verify invariants with fast-check
8. **Examples:** See examples/ directory for correct patterns

**Test behavior, not implementation. Pure functions make this easy.**
