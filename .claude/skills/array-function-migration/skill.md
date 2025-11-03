---
name: array-function-migration
description: Comprehensive pattern for converting vanilla array functions to the three-path overload pattern (plain/Result/Validation). Use when migrating functions from obsolete-for-reference-only to src/array/ with support for fail-fast, error accumulation, and plain responses.
---

# Array Function Migration Skill

## Core Principle

**Every array function must support three execution paths through TypeScript overloads:**

1. **Plain Path**: `ReadonlyArray<T>` → `ReadonlyArray<U>` (for Toolsmith internals, zero overhead)
2. **Result Path**: `Result<ValidationError, ReadonlyArray<T>>` → `Result<ValidationError, ReadonlyArray<U>>` (fail-fast error handling)
3. **Validation Path**: `Validation<ValidationError, ReadonlyArray<T>>` → `Validation<ValidationError, ReadonlyArray<U>>` (error accumulation)

This eliminates the need for separate "vanilla" and "boxed" functions while maintaining type safety and composability.

## When to Use This Skill

Use this skill when:
- Migrating functions from `obsolete-for-reference-only/` to `src/array/`
- Creating new array manipulation functions
- Converting existing array functions to support monadic paths
- Ensuring consistent error handling across array operations

**This skill is proactive** - Use it automatically when working with array functions.

## Architecture Pattern

### Public Function Structure

```typescript
//++ Function description
export default function functionName<T, U>(param1: Type1) {
  //++ [OVERLOAD] Array path: takes array, returns result
  function functionNameWithParam1(array: ReadonlyArray<T>): ReturnType

  //++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
  function functionNameWithParam1(
    array: Result<ValidationError, ReadonlyArray<T>>
  ): Result<ValidationError, ReturnType>

  //++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
  function functionNameWithParam1(
    array: Validation<ValidationError, ReadonlyArray<T>>
  ): Validation<ValidationError, ReturnType>

  //++ Implementation of the full curried function
  function functionNameWithParam1(
    array:
      | ReadonlyArray<T>
      | Result<ValidationError, ReadonlyArray<T>>
      | Validation<ValidationError, ReadonlyArray<T>>
  ): ReturnType | Result<ValidationError, ReturnType> | Validation<ValidationError, ReturnType> {
    // Type guard dispatch
    if (isArray<T>(array)) {
      return _functionNameArray(param1)(array)
    }

    if (isOk<ReadonlyArray<T>>(array)) {
      return chainResults(_functionNameToResult(param1))(array)
    }

    if (isSuccess<ReadonlyArray<T>>(array)) {
      return chainValidations(_functionNameToValidation(param1))(array)
    }

    // Fallback: pass through unchanged (handles error/failure states)
    return array
  }

  return functionNameWithParam1
}
```

### Private Helper Structure

**Three private helper functions** (in subfolders):

1. **`_functionNameArray`** - Plain array path
2. **`_functionNameToResult`** - Result monad path
3. **`_functionNameToValidation`** - Validation monad path

## Step-by-Step Migration Process

### Step 1: Analyze the Obsolete Function

**Read the function signature and behavior:**

```typescript
// obsolete-for-reference-only/array/head/index.ts
export default function head<T>(array: Array<T>): T | undefined {
  return array[0]
}
```

**Identify:**
- Function name: `head`
- Parameters: `array: ReadonlyArray<T>`
- Return type plain path: `T` (first element)
- Return type Result path: `Result<ValidationError, T>`
- Return type Validation path: `Validation<ValidationError, T>`
- Built-in method used: Array indexing `[0]`

### Step 2: Determine Conjunction

Use the decision tree from function-implementation skill:

- First parameter is a **function** → Use **"With"** (`mapWithFunction`)
- First parameter applied **TO** the second → Use **"To"** (`addTo5`)
- First parameter is **CONFIG/CONTEXT** → Use **"For"** (`createUserForConfig`)
- Default → Use **"With"** (`headWithArray` doesn't make sense, so just `head`)

For most array functions, the array is the ONLY parameter or the LAST parameter, so inner function names are simple:
- `head(array)` → No inner function needed (unary)
- `map(fn)(array)` → `mapWithFunction(array)`
- `reduce(fn)(init)(array)` → `reduceWithFunction(init)` → `reduceWithFunctionAndInitial(array)`

### Step 3: Create Public Function with Overloads

**File**: `src/array/head/index.ts`

```typescript
import type { Result } from "../../types/fp/result/index.ts"
import type { Validation, ValidationError } from "../../types/fp/validation/index.ts"
import type { Serializable } from "../../types/index.ts"

import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import _headArray from "./_headArray/index.ts"
import _headToResult from "./_headToResult/index.ts"
import _headToValidation from "./_headToValidation/index.ts"
import isArray from "../../predicates/isArray/index.ts"

//++ Returns the first element of an array
export default function head<T extends Serializable>() {
  //++ [OVERLOAD] Array path: takes array, returns first element or undefined
  function headWithArray(array: ReadonlyArray<T>): T | undefined

  //++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
  function headWithArray(
    array: Result<ValidationError, ReadonlyArray<T>>
  ): Result<ValidationError, T>

  //++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
  function headWithArray(
    array: Validation<ValidationError, ReadonlyArray<T>>
  ): Validation<ValidationError, T>

  //++ Implementation of the full curried function
  function headWithArray(
    array:
      | ReadonlyArray<T>
      | Result<ValidationError, ReadonlyArray<T>>
      | Validation<ValidationError, ReadonlyArray<T>>
  ): T | undefined | Result<ValidationError, T> | Validation<ValidationError, T> {
    // Happy path: plain array
    if (isArray<T>(array)) {
      return _headArray<T>()(array)
    }

    // Result path: fail-fast monadic access
    if (isOk<ReadonlyArray<T>>(array)) {
      return chainResults(_headToResult<T>())(array)
    }

    // Validation path: error accumulation monadic access
    if (isSuccess<ReadonlyArray<T>>(array)) {
      return chainValidations(_headToValidation<T>())(array)
    }

    // Fallback: pass through unchanged (handles error/failure states)
    return array
  }

  return headWithArray
}
```

### Step 4: Create Private Helper - Plain Path

**File**: `src/array/head/_headArray/index.ts`

```typescript
import isArray from "../../../predicates/isArray/index.ts"

//++ Private helper that returns first element of plain array, or undefined if empty/invalid
export default function _headArray<T>() {
  return function _headArrayWithArray(array: ReadonlyArray<T>): T | undefined {
    // Happy path: array is valid, return first element
    if (isArray(array)) {
      //++ [EXCEPTION] Array indexing [0] permitted in Toolsmith for performance
      return array[0]
    }

    // Fallback: return undefined
    return undefined
  }
}
```

### Step 5: Create Private Helper - Result Path

**File**: `src/array/head/_headToResult/index.ts`

```typescript
import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"

import error from "../../../monads/result/error/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import isArray from "../../../predicates/isArray/index.ts"

//++ Private helper that returns first element wrapped in Result
export default function _headToResult<T>() {
  return function _headToResultWithArray(
    array: ReadonlyArray<T>
  ): Result<ValidationError, T> {
    // Happy path: array is valid and not empty
    if (isArray(array)) {
      //++ [EXCEPTION] .length and [0] permitted in Toolsmith for performance
      if (array.length > 0) {
        return ok(array[0] as T)
      }

      // Sad path: empty array
      return error({
        code: "HEAD_EMPTY_ARRAY",
        field: "array",
        messages: ["System needs a non-empty array to get first element"],
        received: array,
        expected: "Non-empty array",
        suggestion: "Provide an array with at least one element",
        severity: "requirement",
      })
    }

    // Sad path: not an array
    return error({
      code: "HEAD_INVALID_INPUT",
      field: "array",
      messages: ["System needs an array to get first element"],
      received: array,
      expected: "Array",
      suggestion: "Provide an array value",
      severity: "requirement",
    })
  }
}
```

### Step 6: Create Private Helper - Validation Path

**File**: `src/array/head/_headToValidation/index.ts`

```typescript
import type { Validation, ValidationError } from "../../../types/fp/validation/index.ts"

import failure from "../../../monads/validation/failure/index.ts"
import success from "../../../monads/validation/success/index.ts"
import isArray from "../../../predicates/isArray/index.ts"

//++ Private helper that returns first element wrapped in Validation
export default function _headToValidation<T>() {
  return function _headToValidationWithArray(
    array: ReadonlyArray<T>
  ): Validation<ValidationError, T> {
    // Happy path: array is valid and not empty
    if (isArray(array)) {
      //++ [EXCEPTION] .length and [0] permitted in Toolsmith for performance
      if (array.length > 0) {
        return success(array[0] as T)
      }

      // Sad path: empty array
      return failure([{
        code: "HEAD_EMPTY_ARRAY",
        field: "array",
        messages: ["System needs a non-empty array to get first element"],
        received: array,
        expected: "Non-empty array",
        suggestion: "Provide an array with at least one element",
        severity: "requirement",
      }])
    }

    // Sad path: not an array
    return failure([{
      code: "HEAD_INVALID_INPUT",
      field: "array",
      messages: ["System needs an array to get first element"],
      received: array,
      expected: "Array",
      suggestion: "Provide an array value",
      severity: "requirement",
    }])
  }
}
```

### Step 7: Create Tests

**File**: `src/array/head/index.test.ts`

```typescript
import { assertEquals } from "@std/assert"
import head from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

Deno.test("head - plain path - returns first element", function testHeadPlainHappy() {
  const result = head()([1, 2, 3])
  assertEquals(result, 1)
})

Deno.test("head - plain path - returns undefined for empty array", function testHeadPlainEmpty() {
  const result = head()([])
  assertEquals(result, undefined)
})

Deno.test("head - Result path - returns ok with first element", function testHeadResultHappy() {
  const input = ok([1, 2, 3])
  const result = head()(input)
  assertEquals(result, ok(1))
})

Deno.test("head - Result path - returns error for empty array", function testHeadResultEmpty() {
  const input = ok([])
  const result = head()(input)
  assertEquals(result._tag, "error")
})

Deno.test("head - Result path - passes through existing error", function testHeadResultPassthrough() {
  const input = error({
    code: "SOME_ERROR",
    field: "test",
    messages: ["Test error"],
    received: null,
    expected: "Valid value",
    suggestion: "Fix it",
    severity: "requirement" as const
  })
  const result = head()(input)
  assertEquals(result, input)
})

Deno.test("head - Validation path - returns success with first element", function testHeadValidationHappy() {
  const input = success([1, 2, 3])
  const result = head()(input)
  assertEquals(result, success(1))
})

Deno.test("head - Validation path - returns failure for empty array", function testHeadValidationEmpty() {
  const input = success([])
  const result = head()(input)
  assertEquals(result._tag, "failure")
})

Deno.test("head - Validation path - passes through existing failure", function testHeadValidationPassthrough() {
  const input = failure([{
    code: "SOME_ERROR",
    field: "test",
    messages: ["Test error"],
    received: null,
    expected: "Valid value",
    suggestion: "Fix it",
    severity: "requirement" as const
  }])
  const result = head()(input)
  assertEquals(result, input)
})
```

## Pattern Variations

### Variation 1: Functions That Transform Elements (map, filter)

**Key Differences:**
- Takes a **function parameter** first
- Uses **"With"** conjunction
- Applies function to each element

**Example**: See `examples/map/` for complete implementation

### Variation 2: Functions That Reduce to Single Value (reduce, sum)

**Key Differences:**
- Takes **reducer function** and **initial value**
- Two levels of currying
- Returns single value, not array

**Example**: See `examples/reduce/` for complete implementation

### Variation 3: Functions That Test Predicates (all, any, includes)

**Key Differences:**
- Returns **boolean** in plain path
- Returns **Result/Validation** wrapping boolean in monadic paths
- No transformation, just testing

**Pattern**:
```typescript
// Plain path
function _allArray(predicate)(array): boolean

// Result path
function _allToResult(predicate)(array): Result<ValidationError, boolean>

// Validation path
function _allToValidation(predicate)(array): Validation<ValidationError, boolean>
```

### Variation 4: Functions That Access Elements (nth, slice, take)

**Key Differences:**
- Takes **index/count parameter** first
- May return single element or subarray
- Error if index out of bounds

**Pattern**:
```typescript
// nth(2)([1,2,3,4]) → 3
// nth(2)(ok([1,2,3,4])) → ok(3)
// nth(10)(ok([1,2,3,4])) → error(INDEX_OUT_OF_BOUNDS)
```

## Common Imports

**Every public function needs:**
```typescript
import type { Result } from "../../types/fp/result/index.ts"
import type { Validation, ValidationError } from "../../types/fp/validation/index.ts"
import type { Serializable } from "../../types/index.ts"

import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
```

**Private helpers need:**
```typescript
// Plain path
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"  // if taking function param

// Result path
import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import error from "../../../monads/result/error/index.ts"
import isArray from "../../../predicates/isArray/index.ts"

// Validation path
import type { Validation, ValidationError } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import failure from "../../../monads/validation/failure/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
```

## Error Code Naming Convention

**Pattern**: `{FUNCTION_NAME}_{ERROR_TYPE}`

**Common error types:**
- `INVALID_INPUT` - Parameter is not expected type
- `INVALID_ARRAY` - Array parameter is invalid
- `INVALID_FUNCTION` - Function parameter is invalid
- `EMPTY_ARRAY` - Array is empty when non-empty required
- `INDEX_OUT_OF_BOUNDS` - Index exceeds array length
- `ELEMENT_NOT_FOUND` - Searched element not found

**Examples:**
- `HEAD_INVALID_INPUT`
- `HEAD_EMPTY_ARRAY`
- `MAP_INVALID_FUNCTION`
- `NTH_INDEX_OUT_OF_BOUNDS`
- `FIND_ELEMENT_NOT_FOUND`

## Constitutional Rules Compliance

**Every function MUST follow:**

1. ✅ **Named functions only** - No arrow functions (except in type signatures)
2. ✅ **Curried** - Each function takes exactly ONE parameter
3. ✅ **Pure** - No mutations, no side effects (except documented IO boundaries)
4. ✅ **No loops** - Use built-in .map/.reduce/.filter with `[EXCEPTION]` comment
5. ✅ **No exceptions** - Return Result/Validation, never throw
6. ✅ **Immutable** - Use `ReadonlyArray<T>`, never mutate inputs
7. ✅ **One function per file** - Each index.ts exports exactly one function
8. ✅ **Type safe** - Use `Serializable` constraint where needed

## Permitted Exceptions

**These built-in methods are permitted with `[EXCEPTION]` comment:**

```typescript
//++ [EXCEPTION] .map() permitted in Toolsmith for performance
array.map(fn)

//++ [EXCEPTION] .filter() permitted in Toolsmith for performance
array.filter(predicate)

//++ [EXCEPTION] .reduce() permitted in Toolsmith for performance
array.reduce(reducer, initial)

//++ [EXCEPTION] .findIndex() permitted in Toolsmith for performance
array.findIndex(predicate)

//++ [EXCEPTION] Array indexing [n] permitted in Toolsmith for performance
array[0]

//++ [EXCEPTION] .length permitted in Toolsmith for performance
array.length
```

**Why permitted:**
- These are the foundational array operations
- They're highly optimized in the JavaScript engine
- Toolsmith wraps them to provide curried, monadic APIs
- Reimplementing them would be slower and less reliable

## Migration Checklist

When migrating a function from `obsolete-for-reference-only/`:

- [ ] Read and understand obsolete function behavior
- [ ] Determine conjunction for inner function names
- [ ] Create public function with 3 overloads + implementation
- [ ] Create `_functionArray` private helper (plain path)
- [ ] Create `_functionToResult` private helper (Result path)
- [ ] Create `_functionToValidation` private helper (Validation path)
- [ ] Add type guard dispatch (isArray → isOk → isSuccess → fallback)
- [ ] Design error codes and messages
- [ ] Create comprehensive test suite (all 3 paths + passthroughs)
- [ ] Run tests: `deno task test src/array/{function}`
- [ ] Verify no constitutional violations
- [ ] Delete obsolete function (if migration successful)

## Examples

**Refer to actual working implementations** in the main codebase (single source of truth):

- **`src/array/map/`** - Function transformation (takes function parameter)
- **`src/array/reduce/`** - Reduction to single value (two-level currying)

Do NOT copy examples into this skill directory - they will drift out of sync. Always reference the canonical implementations.

## Critical Violations to Avoid in Tests

### ❌ Wrong: Reaching Into Monad Internals

```typescript
// DON'T do this
if (isOk(result)) {
  assertEquals(result.value, [2, 4, 6])  // Accessing .value directly
}

if (isError(result)) {
  assertEquals(result.error.code, "SOME_ERROR")  // Accessing .error directly
}
```

**Why wrong:**
- Breaks encapsulation
- Violates functional programming principles
- Not using the monad's API correctly

### ✅ Right: Use fold, getOrElse, or mapOrElse

```typescript
// DO this instead
import fold from "@sitebender/toolsmith/monads/result/fold/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

// Pattern 1: Use fold to extract value
const actual = fold(
  function onError(_err) { return [] },
  function onSuccess(val) { return val }
)(result)
assertEquals(actual, [2, 4, 6])

// Pattern 2: Use getOrElse for default value
const actual = getOrElse(function getDefault() { return [] })(result)
assertEquals(actual, [2, 4, 6])

// Pattern 3: Test the monad itself (structural equality)
assertEquals(result, ok([2, 4, 6]))
```

### ❌ Wrong: Type Casts

```typescript
// DON'T do this
assertEquals((result as Array<number>).length, 5)
assertEquals(result as unknown, undefined)
```

**Why wrong:**
- Undermines type safety
- Hides type errors
- Not constitutional

### ✅ Right: Proper Typing or Structural Assertions

```typescript
// DO this instead
assertEquals(result, [2, 4, 6, 8, 10])  // Structural equality includes length

// Or if you need to check Result monad:
assertEquals(result, ok([2, 4, 6, 8, 10]))
```

### ❌ Wrong: Using `const` for Test Functions

```typescript
// DON'T do this (might be acceptable, but prefer named functions)
const double = function (n: number): number {
  return n * 2
}
```

**Why potentially wrong:**
- Inconsistent with "function declarations only" rule
- Though `const` with `function` expression is different from arrow functions

### ✅ Right: Named Function Declarations

```typescript
// DO this instead
function double(n: number): number {
  return n * 2
}
```

## Anti-Patterns to Avoid

### ❌ Wrong: Separate Functions for Each Path

```typescript
// DON'T do this
export function map(fn)(array) { ... }
export function mapResult(fn)(array) { ... }
export function mapValidation(fn)(array) { ... }
```

**Why wrong:**
- Duplicate logic (3× maintenance)
- Doesn't compose in pipelines
- Forces users to remember which to use

### ❌ Wrong: Manual Unwrapping

```typescript
// DON'T do this
const unwrapped = unwrap(result)
const mapped = map(fn)(unwrapped)
const rewrapped = ok(mapped)
```

**Why wrong:**
- Error-prone (forgot to re-wrap?)
- Loses error information
- Verbose and unergonomic

### ❌ Wrong: Missing Passthrough

```typescript
function mapWithFunction(array: Result<...> | Array<...>) {
  if (isArray(array)) return _mapArray(f)(array)
  if (isOk(array)) return chainResults(_mapToResult(f))(array)
  // MISSING: What if array is already error()? Must pass through!
}
```

**Why wrong:**
- Error states get dropped
- Type errors in strict mode
- Breaks monadic chaining

### ✅ Right: Include Fallback Passthrough

```typescript
function mapWithFunction(array: Result<...> | Validation<...> | Array<...>) {
  if (isArray(array)) return _mapArray(f)(array)
  if (isOk(array)) return chainResults(_mapToResult(f))(array)
  if (isSuccess(array)) return chainValidations(_mapToValidation(f))(array)

  // Fallback: pass through unchanged (handles error/failure states)
  return array
}
```

## Quick Reference: Type Guard Checks

**Always check in this order:**

1. `isArray<T>(array)` → Plain path
2. `isOk<ReadonlyArray<T>>(array)` → Result path
3. `isSuccess<ReadonlyArray<T>>(array)` → Validation path
4. **Fallback**: `return array` (passthrough errors)

**Why this order:**
- Plain arrays are most common (optimize for common case)
- Result is second most common (fail-fast)
- Validation is least common (error accumulation)
- Fallback handles all error states

## Summary

This pattern provides:

1. **Single Function API** - One name for all three behaviors
2. **Type Safety** - Compiler enforces correct usage through overloads
3. **Composability** - Monadic chains work seamlessly
4. **Maintainability** - Single implementation for all paths
5. **Performance** - Plain path for zero-overhead internal use
6. **Ergonomics** - Natural API that "just works"

**This is the standard for all Toolsmith array functions.**
