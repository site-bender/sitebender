# Toolkit Library Tests

## Testing Philosophy

We test **behaviors, not implementation**. The toolkit is a pure functional programming library, so tests focus on:
- **Mathematical properties** (laws like associativity, commutativity)
- **Edge cases** (nullish values, empty collections, unicode)
- **Composition patterns** (how functions work together)
- **Type safety** (proper type inference and constraints)

## Structure

Tests mirror the source structure, organized by behavioral categories:

```
tests/
├── transforming/          # Array/object/string transformation behaviors
├── filtering/             # Selection and filtering behaviors
├── combining/             # Concatenation, merging, joining behaviors
├── reducing/              # Aggregation and folding behaviors
├── composing/             # Function composition and piping
├── error-handling/        # Either/Maybe/Result monadic behaviors
├── temporal/              # Date/time manipulation behaviors
├── validating/            # Predicate and validation behaviors
├── async/                 # Asynchronous operation behaviors
└── helpers/               # Shared test utilities
```

## Example Tests

### Testing Array Transformation Behaviors

```typescript
// tests/transforming/arrays/index.ts
import { assertEquals } from "@std/testing/asserts"
import { describe, it } from "@std/testing/bdd"
import * as fc from "fast-check"

import map from "../../../src/simple/array/map/index.ts"
import filter from "../../../src/simple/array/filter/index.ts"
import flatMap from "../../../src/simple/array/flatMap/index.ts"
import pipe from "../../../src/simple/combinator/pipe/index.ts"

describe("Array transformation behaviors", () => {
  describe("when mapping over arrays", () => {
    it("transforms each element", () => {
      const double = (n: number) => n * 2
      const result = map(double)([1, 2, 3, 4])
      assertEquals(result, [2, 4, 6, 8])
    })
    
    it("preserves array length", () => {
      const fn = (n: number) => n + 1
      const input = [1, 2, 3, 4, 5]
      const result = map(fn)(input)
      assertEquals(result.length, input.length)
    })
    
    it("handles null/undefined gracefully", () => {
      const double = (n: number) => n * 2
      assertEquals(map(double)(null), [])
      assertEquals(map(double)(undefined), [])
    })
    
    // Property-based test
    it("satisfies functor identity law", () => {
      fc.assert(
        fc.property(fc.array(fc.anything()), (arr) => {
          const identity = <T>(x: T) => x
          const result = map(identity)(arr)
          assertEquals(result, arr)
        })
      )
    })
    
    it("satisfies functor composition law", () => {
      fc.assert(
        fc.property(fc.array(fc.integer()), (arr) => {
          const f = (n: number) => n + 1
          const g = (n: number) => n * 2
          const composed = (n: number) => g(f(n))
          
          const result1 = map(composed)(arr)
          const result2 = pipe(arr, map(f), map(g))
          
          assertEquals(result1, result2)
        })
      )
    })
  })
  
  describe("when filtering and mapping together", () => {
    it("can be composed efficiently", () => {
      const isEven = (n: number) => n % 2 === 0
      const double = (n: number) => n * 2
      
      const result = pipe(
        [1, 2, 3, 4, 5, 6],
        filter(isEven),  // [2, 4, 6]
        map(double)      // [4, 8, 12]
      )
      
      assertEquals(result, [4, 8, 12])
    })
    
    it("flatMap combines map and flatten", () => {
      const duplicate = (n: number) => [n, n]
      const result = flatMap(duplicate)([1, 2, 3])
      assertEquals(result, [1, 1, 2, 2, 3, 3])
    })
  })
})
```

### Testing Function Composition Behaviors

```typescript
// tests/composing/functions/index.ts
import { assertEquals } from "@std/testing/asserts"
import { describe, it } from "@std/testing/bdd"

import pipe from "../../../src/simple/combinator/pipe/index.ts"
import compose from "../../../src/simple/combinator/compose/index.ts"
import curry from "../../../src/simple/combinator/curry/index.ts"
import partial from "../../../src/simple/combinator/partial/index.ts"

describe("Function composition behaviors", () => {
  describe("when piping functions", () => {
    it("applies functions left-to-right", () => {
      const add = (x: number) => x + 1
      const multiply = (x: number) => x * 2
      const subtract = (x: number) => x - 3
      
      const result = pipe([add, multiply, subtract])(5)
      // (5 + 1) * 2 - 3 = 6 * 2 - 3 = 12 - 3 = 9
      assertEquals(result, 9)
    })
    
    it("maintains type safety through composition", () => {
      const stringToNumber = (s: string) => s.length
      const numberToBoolean = (n: number) => n > 5
      const booleanToString = (b: boolean) => b ? "yes" : "no"
      
      const result = pipe([stringToNumber, numberToBoolean, booleanToString])("hello world")
      assertEquals(result, "yes")
    })
  })
  
  describe("when composing functions", () => {
    it("applies functions right-to-left", () => {
      const add = (x: number) => x + 1
      const multiply = (x: number) => x * 2
      
      const result = compose([multiply, add])(5)
      // multiply(add(5)) = multiply(6) = 12
      assertEquals(result, 12)
    })
  })
  
  describe("when currying functions", () => {
    it("allows partial application", () => {
      const add = curry((a: number, b: number) => a + b)
      const add5 = add(5)
      
      assertEquals(add5(3), 8)
      assertEquals(add5(10), 15)
    })
    
    it("preserves function behavior", () => {
      const sum = (a: number, b: number, c: number) => a + b + c
      const curriedSum = curry(sum)
      
      // All these should produce the same result
      assertEquals(curriedSum(1)(2)(3), 6)
      assertEquals(curriedSum(1, 2)(3), 6)
      assertEquals(curriedSum(1)(2, 3), 6)
      assertEquals(curriedSum(1, 2, 3), 6)
    })
  })
})
```

### Testing Error Handling with Either

```typescript
// tests/error-handling/either/index.ts
import { assertEquals, assertExists } from "@std/testing/asserts"
import { describe, it } from "@std/testing/bdd"

import left from "../../../src/either/left/index.ts"
import right from "../../../src/either/right/index.ts"
import map from "../../../src/either/map/index.ts"
import chain from "../../../src/either/chain/index.ts"
import fold from "../../../src/either/fold/index.ts"
import tryCatch from "../../../src/either/tryCatch/index.ts"
import pipe from "../../../src/simple/combinator/pipe/index.ts"

describe("Either error handling behaviors", () => {
  describe("when transforming successful values", () => {
    it("maps over Right values", () => {
      const double = (n: number) => n * 2
      const result = map(double)(right(5))
      
      assertEquals(result, right(10))
    })
    
    it("ignores Left values", () => {
      const double = (n: number) => n * 2
      const error = left("error")
      const result = map(double)(error)
      
      assertEquals(result, error)
    })
    
    it("chains computations that may fail", () => {
      const safeDivide = (divisor: number) => (n: number) =>
        divisor === 0 ? left("Division by zero") : right(n / divisor)
      
      const result1 = pipe(
        right(10),
        chain(safeDivide(2)),  // Right(5)
        chain(safeDivide(5))   // Right(1)
      )
      assertEquals(result1, right(1))
      
      const result2 = pipe(
        right(10),
        chain(safeDivide(0)),  // Left("Division by zero")
        chain(safeDivide(5))   // Not executed
      )
      assertEquals(result2, left("Division by zero"))
    })
  })
  
  describe("when handling exceptions", () => {
    it("catches thrown errors", () => {
      const dangerousOp = () => {
        throw new Error("Something went wrong")
      }
      
      const result = tryCatch(
        dangerousOp,
        (e: Error) => e.message
      )()
      
      assertEquals(result, left("Something went wrong"))
    })
    
    it("returns Right for successful operations", () => {
      const safeOp = () => 42
      
      const result = tryCatch(
        safeOp,
        (e: Error) => e.message
      )()
      
      assertEquals(result, right(42))
    })
  })
  
  describe("when extracting values", () => {
    it("folds both cases into a single value", () => {
      const onLeft = (err: string) => `Error: ${err}`
      const onRight = (val: number) => `Success: ${val}`
      
      const result1 = fold(onLeft)(onRight)(right(42))
      assertEquals(result1, "Success: 42")
      
      const result2 = fold(onLeft)(onRight)(left("Not found"))
      assertEquals(result2, "Error: Not found")
    })
  })
})
```

### Testing String Manipulation Behaviors

```typescript
// tests/transforming/strings/index.ts
import { assertEquals } from "@std/testing/asserts"
import { describe, it } from "@std/testing/bdd"
import * as fc from "fast-check"

import split from "../../../src/simple/string/split/index.ts"
import trim from "../../../src/simple/string/trim/index.ts"
import replace from "../../../src/simple/string/replace/index.ts"
import words from "../../../src/simple/string/words/index.ts"
import slugify from "../../../src/simple/string/slugify/index.ts"

describe("String transformation behaviors", () => {
  describe("when splitting strings", () => {
    it("splits on delimiter", () => {
      const result = split(",")("a,b,c,d")
      assertEquals(result, ["a", "b", "c", "d"])
    })
    
    it("handles empty strings", () => {
      assertEquals(split(",")(""), [""])
      assertEquals(split("")("abc"), ["a", "b", "c"])
    })
    
    it("handles regex delimiters", () => {
      const result = split(/\s+/)("hello  world   test")
      assertEquals(result, ["hello", "world", "test"])
    })
  })
  
  describe("when extracting words", () => {
    it("handles camelCase", () => {
      assertEquals(words("camelCaseString"), ["camel", "Case", "String"])
    })
    
    it("handles snake_case", () => {
      assertEquals(words("snake_case_string"), ["snake", "case", "string"])
    })
    
    it("handles kebab-case", () => {
      assertEquals(words("kebab-case-string"), ["kebab", "case", "string"])
    })
    
    it("handles mixed formats", () => {
      assertEquals(words("getData_fromAPI"), ["get", "Data", "from", "API"])
    })
  })
  
  describe("when creating slugs", () => {
    it("converts to URL-safe format", () => {
      assertEquals(slugify("Hello World!"), "hello-world")
      assertEquals(slugify("São Paulo"), "sao-paulo")
      assertEquals(slugify("100% Success"), "100-success")
    })
    
    // Property test
    it("always produces valid URL slugs", () => {
      fc.assert(
        fc.property(fc.string(), (str) => {
          const slug = slugify(str)
          // Slug should only contain lowercase letters, numbers, and hyphens
          const isValid = /^[a-z0-9-]*$/.test(slug)
          assertEquals(isValid, true)
        })
      )
    })
  })
})
```

### Testing Temporal Behaviors

```typescript
// tests/temporal/dates/index.ts
import { assertEquals, assert } from "@std/testing/asserts"
import { describe, it } from "@std/testing/bdd"

import addDays from "../../../src/simple/date/addDays/index.ts"
import diffDays from "../../../src/simple/date/diffDays/index.ts"
import format from "../../../src/simple/date/format/index.ts"
import isWeekend from "../../../src/simple/date/isWeekend/index.ts"
import startOfMonth from "../../../src/simple/date/startOfMonth/index.ts"

describe("Temporal manipulation behaviors", () => {
  describe("when adding time periods", () => {
    it("adds days correctly", () => {
      const date = Temporal.PlainDate.from("2024-01-15")
      const result = addDays(10)(date)
      
      assertEquals(result.toString(), "2024-01-25")
    })
    
    it("handles month boundaries", () => {
      const date = Temporal.PlainDate.from("2024-01-30")
      const result = addDays(5)(date)
      
      assertEquals(result.toString(), "2024-02-04")
    })
  })
  
  describe("when calculating differences", () => {
    it("calculates days between dates", () => {
      const date1 = Temporal.PlainDate.from("2024-01-01")
      const date2 = Temporal.PlainDate.from("2024-01-15")
      
      const diff = diffDays(date2)(date1)
      assertEquals(diff, 14)
    })
  })
  
  describe("when checking date properties", () => {
    it("identifies weekends", () => {
      const saturday = Temporal.PlainDate.from("2024-01-13")
      const sunday = Temporal.PlainDate.from("2024-01-14")
      const monday = Temporal.PlainDate.from("2024-01-15")
      
      assert(isWeekend(saturday))
      assert(isWeekend(sunday))
      assert(!isWeekend(monday))
    })
  })
})
```

## Test Helpers

```typescript
// tests/helpers/generators/index.ts
import * as fc from "fast-check"

// Custom generators for property-based testing
export const nonEmptyArray = <T>(arb: fc.Arbitrary<T>) =>
  fc.array(arb, { minLength: 1 })

export const safeString = () =>
  fc.string().filter(s => s.length > 0 && s.length < 1000)

export const positiveInteger = () =>
  fc.integer({ min: 1, max: Number.MAX_SAFE_INTEGER })

// tests/helpers/assertions/index.ts
export function assertSameElements<T>(actual: Array<T>, expected: Array<T>) {
  const actualSet = new Set(actual)
  const expectedSet = new Set(expected)
  
  assertEquals(actualSet.size, expectedSet.size)
  for (const item of expectedSet) {
    assert(actualSet.has(item))
  }
}

// tests/helpers/fixtures/index.ts
export const users = [
  { id: 1, name: "Alice", age: 30, role: "admin" },
  { id: 2, name: "Bob", age: 25, role: "user" },
  { id: 3, name: "Charlie", age: 35, role: "user" },
  { id: 4, name: "Diana", age: 28, role: "admin" }
]

export const products = [
  { id: 1, name: "Laptop", price: 999.99, category: "Electronics" },
  { id: 2, name: "Mouse", price: 29.99, category: "Electronics" },
  { id: 3, name: "Desk", price: 299.99, category: "Furniture" },
  { id: 4, name: "Chair", price: 199.99, category: "Furniture" }
]
```

## Running Tests

```bash
# Run all behavioral tests
deno task test

# Run specific behavior category
deno test tests/transforming/
deno test tests/error-handling/

# Run with coverage
deno task test:cov

# Watch mode for development
deno task test:watch

# Run property-based tests with more iterations
deno test tests/ --allow-read -- --numRuns 10000
```

## Key Testing Principles

1. **Pure Function Properties**: Test mathematical laws (identity, associativity, commutativity)
2. **Edge Cases**: Always test null, undefined, empty collections, boundary values
3. **Type Safety**: Ensure proper type inference and constraints are maintained
4. **Composition**: Test how functions work together, not just in isolation
5. **Property-Based Testing**: Use fast-check for generative testing where applicable
6. **Performance Characteristics**: Test that immutability is maintained

## Testing Categories

### Transforming
- Map, flatMap, evolve operations
- Type conversions
- Format transformations

### Filtering
- Filter, reject, compact operations
- Predicate combinations
- Conditional selections

### Combining
- Concat, merge, union operations
- Zip, join operations
- Set operations

### Reducing
- Fold, reduce, scan operations
- Aggregations (sum, product, min, max)
- Group by operations

### Composing
- Pipe, compose operations
- Curry, partial application
- Function decorators (memoize, debounce, throttle)

### Error Handling
- Either operations (map, chain, fold)
- Maybe operations (map, filter, getOrElse)
- Result operations (similar to Either)
- Try-catch patterns

### Temporal
- Date arithmetic
- Date comparisons
- Formatting and parsing
- Time zone handling

### Validating
- Type guards (isString, isNumber, etc.)
- Predicate combinators (allPass, anyPass)
- Schema validation patterns

### Async
- Promise handling
- Parallel operations
- Sequential operations
- Retry and timeout patterns