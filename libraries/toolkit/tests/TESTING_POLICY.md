# Testing Policy for @sitebender/toolkit

## Overview

The toolkit library consists of pure functions, monadic wrappers, and explicitly impure random functions. Our testing approach prioritizes **behavioral verification** and **property-based testing** to ensure mathematical correctness, functional programming invariants, and safe error handling.

## Core Testing Principles

### 1. Behavioral Testing Only
We test **observable behaviors**, not implementation details:
- Input → Output transformations
- Error handling (NaN, null, undefined returns)
- Type preservation
- Mathematical properties and invariants
- Currying and partial application behavior

### 2. No Mocking
Since the toolkit has zero dependencies and consists of pure functions (except `random/`), we never mock:
- Our own functions are tested as-is
- Random functions use seed injection when needed for deterministic testing
- No external APIs to mock

### 3. Property-Based Testing First
Given the mathematical nature of our functions, property-based testing with fast-check is our primary strategy:
- **Algebraic properties** (commutativity, associativity, distributivity)
- **Functional laws** (functor, monad, applicative laws)
- **Invariants** (idempotence, identity elements)
- **Edge cases** automatically discovered

### 4. Integration Over Unit Tests
Test functions as they compose:
- Composed functions (pipe, compose, flow)
- Curried function chains
- Monadic chains (Either, Maybe, Result)
- Lens compositions

## Test Organization

### Folder Structure

**IMPORTANT**: Following the project's naming convention:
- Function/test names go on the **folder**, not the file
- Every test folder must have an `index.ts` file
- Example: `tests/behaviors/algebraic/commutative/add/index.ts` tests the `add` function

```
libraries/toolkit/tests/
├── behaviors/
│   ├── algebraic/           # Algebraic properties (all math/stats functions)
│   │   ├── commutative/     # Addition, multiplication, etc.
│   │   │   ├── add/
│   │   │   │   └── index.ts
│   │   │   └── multiply/
│   │   │       └── index.ts
│   │   ├── associative/     # String concat, array operations
│   │   ├── distributive/    # Mathematical distributions
│   │   └── identity/        # Identity elements (0 for +, 1 for ×)
│   │
│   ├── functional/          # FP law verification
│   │   ├── composition/     # f∘g = λx.f(g(x))
│   │   ├── currying/        # Curry/uncurry roundtrips
│   │   ├── functor-laws/    # fmap id = id, fmap (f∘g) = fmap f ∘ fmap g
│   │   └── monad-laws/      # Left identity, right identity, associativity
│   │
│   ├── error-handling/      # Error boundary behaviors
│   │   ├── null-safety/     # Null/undefined inputs → NaN/null/empty
│   │   ├── type-guards/     # Invalid type inputs
│   │   └── bounds/          # Out-of-range inputs
│   │
│   ├── transformations/     # Data transformation behaviors
│   │   ├── array-ops/       # Map, filter, reduce behaviors
│   │   ├── object-ops/      # Pick, omit, merge behaviors
│   │   ├── string-ops/      # Case conversion, padding, etc.
│   │   └── type-casting/    # Type conversion behaviors
│   │
│   └── randomness/          # Non-deterministic function testing
│       ├── distribution/    # Statistical distribution tests
│       ├── uniqueness/      # ID generation uniqueness
│       └── deterministic/   # Seeded random for reproducibility
│
└── helpers/
    ├── generators/          # Fast-check custom generators
    │   ├── matrix/         # Valid matrix generators
    │   ├── temporal/       # Valid date/time generators
    │   └── numeric/        # Special number generators (safe integers, etc.)
    │
    ├── assertions/         # Custom assertion helpers
    │   ├── approximately/  # Floating point comparisons
    │   ├── matrix-equal/   # Matrix equality checks
    │   └── set-equal/      # Set/Array equality
    │
    └── seeds/             # Deterministic seeds for random testing
        └── random-seed/   # Injectable RNG for testing
```

## Testing Patterns

### Property-Based Testing Examples

#### Mathematical Properties

```typescript
// tests/behaviors/algebraic/commutative/index.ts
import * as fc from "npm:fast-check@3.x.x"
import { add, multiply } from "@sitebender/toolkit"

Deno.test("addition is commutative", () => {
  fc.assert(
    fc.property(fc.float(), fc.float(), (a, b) => {
      const result1 = add(a)(b)
      const result2 = add(b)(a)
      return Object.is(result1, result2) || 
             (Number.isNaN(result1) && Number.isNaN(result2))
    })
  )
})
```

#### Functional Laws

```typescript
// tests/behaviors/functional/functor-laws/index.ts
import * as fc from "npm:fast-check@3.x.x"
import { Maybe, map, identity } from "@sitebender/toolkit"

Deno.test("Maybe satisfies functor identity law", () => {
  fc.assert(
    fc.property(fc.option(fc.integer()), (value) => {
      const maybe = Maybe.of(value)
      const mapped = map(identity)(maybe)
      return maybe.equals(mapped)
    })
  )
})
```

#### Error Handling

```typescript
// tests/behaviors/error-handling/null-safety/index.ts
import * as fc from "npm:fast-check@3.x.x"
import { divide } from "@sitebender/toolkit"

Deno.test("division handles null inputs safely", () => {
  fc.assert(
    fc.property(
      fc.oneof(fc.constant(null), fc.constant(undefined), fc.float()),
      fc.oneof(fc.constant(null), fc.constant(undefined), fc.float()),
      (a, b) => {
        const result = divide(a)(b)
        // Should return NaN for any null/undefined input
        if (a == null || b == null) {
          return Number.isNaN(result)
        }
        // Should return NaN for division by zero
        if (b === 0) {
          return Number.isNaN(result)
        }
        // Otherwise should return number
        return typeof result === 'number'
      }
    )
  )
})
```

### Testing JSDoc Examples

Every example in a function's JSDoc must have a corresponding test that verifies the exact output:

```typescript
// src/simple/array/chunk/index.ts JSDoc example:
// chunk(2)([1, 2, 3, 4, 5])
// // [[1, 2], [3, 4], [5]]

// tests/behaviors/transformations/array-ops/chunk/index.ts
Deno.test("JSDoc examples", async (t) => {
  await t.step("chunks array into pairs with remainder", () => {
    const result = chunk(2)([1, 2, 3, 4, 5])
    assertEquals(result, [[1, 2], [3, 4], [5]])
  })
  
  await t.step("handles empty array", () => {
    const result = chunk(3)([])
    assertEquals(result, [])
  })
  
  // Test EVERY example from the JSDoc
})
```

If a function has too many examples (>10), consolidate them:
- Keep edge cases (null, empty, single element)
- Keep one typical case
- Keep one complex/real-world case
- Keep examples that show different behaviors
- Remove redundant examples that test the same behavior

### Testing Random Functions

```typescript
// tests/behaviors/randomness/distribution/index.ts
import * as fc from "npm:fast-check@3.x.x"
import { randomInteger, randomBoolean } from "@sitebender/toolkit"

Deno.test("randomInteger stays within bounds", () => {
  fc.assert(
    fc.property(fc.integer(), fc.integer(), (min, max) => {
      const actualMin = Math.min(min, max)
      const actualMax = Math.max(min, max)
      
      // Test multiple samples
      for (let i = 0; i < 100; i++) {
        const value = randomInteger(min)(max)
        if (value < actualMin || value > actualMax) {
          return false
        }
      }
      return true
    })
  )
})

Deno.test("randomBoolean respects probability", () => {
  const samples = 10000
  const tolerance = 0.02 // 2% tolerance
  
  for (const probability of [0.1, 0.3, 0.5, 0.7, 0.9]) {
    let trueCount = 0
    for (let i = 0; i < samples; i++) {
      if (randomBoolean(probability)) trueCount++
    }
    
    const actual = trueCount / samples
    const difference = Math.abs(actual - probability)
    
    if (difference > tolerance) {
      throw new Error(`Probability ${probability} produced ${actual}`)
    }
  }
})
```

### Testing Curried Functions

```typescript
// tests/behaviors/functional/currying/index.ts
import * as fc from "npm:fast-check@3.x.x"
import { add, subtract, divide } from "@sitebender/toolkit"

Deno.test("curried functions support partial application", () => {
  fc.assert(
    fc.property(fc.float(), fc.float(), (a, b) => {
      // Full application
      const full = add(a)(b)
      
      // Partial application
      const addA = add(a)
      const partial = addA(b)
      
      return Object.is(full, partial) ||
             (Number.isNaN(full) && Number.isNaN(partial))
    })
  )
})

Deno.test("curried chain maintains correctness", () => {
  fc.assert(
    fc.property(fc.float(), fc.float(), fc.float(), (a, b, c) => {
      // (a + b) - c
      const add5 = add(5)
      const subtract3 = subtract(3)
      
      const result1 = subtract3(add5(a))
      const result2 = subtract(3)(add(5)(a))
      const expected = a + 5 - 3
      
      return approximately(result1, expected) && 
             approximately(result2, expected)
    })
  )
})
```

### Testing Monadic Chains

```typescript
// tests/behaviors/functional/monad-laws/index.ts
import * as fc from "npm:fast-check@3.x.x"
import { Either, Result, Maybe } from "@sitebender/toolkit"

Deno.test("Either chain maintains error propagation", () => {
  fc.assert(
    fc.property(fc.integer(), (value) => {
      const computation = Either.of(value)
        .map(x => x * 2)
        .chain(x => x > 100 ? Either.left("too large") : Either.of(x))
        .map(x => x + 1)
      
      if (value * 2 > 100) {
        return computation.isLeft() && 
               computation.value === "too large"
      } else {
        return computation.isRight() && 
               computation.value === value * 2 + 1
      }
    })
  )
})
```

## Custom Generators

```typescript
// tests/helpers/generators/matrix/index.ts
import * as fc from "npm:fast-check@3.x.x"

export const matrix2x2 = () =>
  fc.array(fc.array(fc.float(), { minLength: 2, maxLength: 2 }), 
          { minLength: 2, maxLength: 2 })

export const matrix3x3 = () =>
  fc.array(fc.array(fc.float(), { minLength: 3, maxLength: 3 }), 
          { minLength: 3, maxLength: 3 })

export const squareMatrix = (size: number) =>
  fc.array(fc.array(fc.float(), { minLength: size, maxLength: size }), 
          { minLength: size, maxLength: size })

export const nonSingularMatrix2x2 = () =>
  matrix2x2().filter(m => {
    const det = m[0][0] * m[1][1] - m[0][1] * m[1][0]
    return Math.abs(det) > 0.001 // Avoid near-singular matrices
  })
```

## Test Helpers

### Approximate Equality

```typescript
// tests/helpers/assertions/approximately/index.ts
const EPSILON = 1e-10

export const approximately = (
  a: number | null | undefined,
  b: number | null | undefined,
  epsilon = EPSILON
): boolean => {
  if (a == null || b == null) return a === b
  if (Number.isNaN(a) && Number.isNaN(b)) return true
  if (!Number.isFinite(a) || !Number.isFinite(b)) return a === b
  return Math.abs(a - b) < epsilon
}
```

## Running Tests

```bash
# Run all toolkit tests
cd libraries/toolkit
deno task test

# Run specific behavior category
deno test tests/behaviors/algebraic/

# Run with coverage
deno task test:cov

# Watch mode for development
deno task test:watch

# Run only property tests
deno test tests/behaviors/ --filter "property"
```

## Test Requirements

### Coverage Goals
- **Code Coverage**: 100% - NO EXCEPTIONS
  - If a branch/line cannot be tested, it must be excluded with `/* c8 ignore next */` or `/* c8 ignore start/stop */` with a comment explaining WHY
  - There should be virtually no excluded lines in the toolkit - all pure functions are fully testable
- **JSDoc Example Coverage**: 100% - Every example in every function's JSDoc MUST be tested
  - This ensures function correctness
  - This ensures documentation accuracy
  - If a function has >10 examples, reduce to ≤10 that provide same coverage
- **Behavioral Coverage**: 100% of documented behaviors
- **Property Coverage**: All mathematical laws and invariants
- **Edge Case Coverage**: Null, undefined, NaN, Infinity, empty collections

### Performance Requirements
- Property tests: <500ms per property (1000 iterations)
- Behavioral tests: <10ms per test
- Full test suite: <20 seconds

### Quality Requirements
- Every function has at least one property-based test
- Every JSDoc example has a corresponding test verifying exact output
- Every curried function tests partial application
- Every monadic type tests the three monad laws
- Every mathematical function tests relevant algebraic properties
- Every error case returns appropriate safe values (NaN, null, empty)
- Random functions test:
  - Output is within specified bounds (100% of samples)
  - Distribution is approximately correct (with statistical tolerance)

## Achieving 100% Coverage

### Why 100% is Achievable
The toolkit consists almost entirely of pure functions, which means:
- Every code path can be triggered with the right inputs
- No external dependencies to mock or work around
- No side effects that prevent testing
- No timing issues or race conditions

### When to Use Coverage Exclusions
Coverage exclusions should be EXTREMELY RARE. Valid cases:
```typescript
// Type guard that TypeScript guarantees can't be reached
if (typeof value !== 'string' && typeof value !== 'number') {
  /* c8 ignore next 2 - TypeScript ensures value is string | number */
  throw new Error('Impossible state')
}

// Defensive programming against JavaScript runtime edge cases
if (!Array.isArray(arr)) {
  /* c8 ignore next - TypeScript guarantees arr is Array, but defensive for JS interop */
  return []
}
```

INVALID reasons for exclusion:
- "Too hard to test" - Find a way
- "Unlikely edge case" - Test it
- "Internal helper" - Test it through the public API
- "Never happens in practice" - Test it anyway

### Testing Strategy for 100% Coverage
1. **Start with JSDoc examples** - These often cover the happy path
2. **Add edge cases** - Null, undefined, empty, boundary values
3. **Add property tests** - These find cases you didn't think of
4. **Check coverage report** - Find any missed branches
5. **Add specific tests** - Target any uncovered lines
6. **Review and refactor** - If something is truly untestable, refactor the code

## Anti-Patterns to Avoid

❌ **Testing implementation details**
```typescript
// BAD - Testing internal algorithm
test("uses Fisher-Yates shuffle", () => {
  // Don't test HOW it shuffles
})
```

❌ **Insufficient property coverage**
```typescript
// BAD - Only testing specific values
test("add works", () => {
  assertEquals(add(2)(3), 5)
  // Need property tests for all numbers
})
```

❌ **Mocking pure functions**
```typescript
// BAD - Never mock pure functions
const mockAdd = stub(add, () => 5)
```

## Good Patterns to Follow

✅ **Test mathematical properties**
```typescript
// GOOD - Test invariants
test("multiplication distributes over addition", () => {
  fc.assert(fc.property(fc.float(), fc.float(), fc.float(), (a, b, c) => {
    const left = multiply(a)(add(b)(c))
    const right = add(multiply(a)(b))(multiply(a)(c))
    return approximately(left, right)
  }))
})
```

✅ **Test edge cases systematically**
```typescript
// GOOD - Comprehensive edge case testing
test("handles all edge cases", () => {
  const edges = [null, undefined, NaN, Infinity, -Infinity, 0, -0]
  for (const edge of edges) {
    const result = someFunction(edge)
    // Assert appropriate safe value
  }
})
```

✅ **Test composition**
```typescript
// GOOD - Test function composition
test("composed functions maintain correctness", () => {
  const pipeline = pipe(
    map(multiply(2)),
    filter(greaterThan(10)),
    reduce(add)(0)
  )
  // Test the entire pipeline behavior
})
```

## Conclusion

The toolkit testing strategy emphasizes:
1. **Mathematical rigor** through property-based testing
2. **Behavioral verification** over implementation testing
3. **Comprehensive edge case handling** for safety
4. **Functional law verification** for monadic types
5. **No mocking** - test real functions with real behaviors

This approach ensures the toolkit remains a reliable foundation for functional programming in TypeScript/Deno.