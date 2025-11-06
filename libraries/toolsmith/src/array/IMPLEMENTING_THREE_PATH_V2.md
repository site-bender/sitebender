# Implementing Three-Path Functions (V2 Pattern)

## Step-by-Step Implementation Guide

This guide shows how to implement three-path functions using the **V2 pattern** (any parameter can be monadic).

---

## Step 1: Define the Function Signature

### Example: `add(augend)(addend)` (2-parameter curried)

```typescript
// Main entry point with three overload signatures

//++ Adds two numbers
export default function add(
  augend: number,
) {
  // Overload 1: Plain array input → Plain number output
  function addToAugend(addend: number): number

  // Overload 2: Result monad input → Result monad output
  function addToAugend(
    addend: Result<ValidationError, number>,
  ): Result<ValidationError, number>

  // Overload 3: Validation monad input → Validation monad output
  function addToAugend(
    addend: Validation<ValidationError, number>,
  ): Validation<ValidationError, number>

  // Implementation (handles all paths)
  function addToAugend(addend: unknown) {
    // Mode detection and dispatch (Step 2)
  }

  return addToAugend
}
```

---

## Step 2: Implement Mode Detection

**Check ALL parameters** to determine mode:

```typescript
function addToAugend(addend: unknown) {
  // V2: Check BOTH augend and addend for monad types
  const hasValidation = isValidation(augend) || isValidation(addend)
  const hasResult = !hasValidation && (isResult(augend) || isResult(addend))

  // Dispatch to appropriate helper
  if (hasValidation) {
    return _addToValidation(augend)(addend)
  }

  if (hasResult) {
    return _addToResult(augend)(addend)
  }

  // Plain mode
  return _addArray(augend)(addend)
}
```

### For 1-Parameter Functions

```typescript
// Example: compact(array)
function compact<T>(array: unknown) {
  // Only one parameter to check
  const mode = isValidation(array)
    ? "validation"
    : isResult(array)
      ? "result"
      : "plain"

  // Dispatch
  if (mode === "validation") return _compactToValidation(array)
  if (mode === "result") return _compactToResult(array)
  return _compactArray(array)
}
```

### For 3-Parameter Functions

```typescript
// Example: reduce(fn)(initial)(array)
function reduceWithFunction(initial: unknown) {
  return function reduceWithInitial(array: unknown) {
    // Check fn, initial, AND array
    const hasValidation =
      isValidation(fn) || isValidation(initial) || isValidation(array)
    const hasResult = !hasValidation &&
      (isResult(fn) || isResult(initial) || isResult(array))

    // Dispatch
    if (hasValidation) return _reduceToValidation(fn)(initial)(array)
    if (hasResult) return _reduceToResult(fn)(initial)(array)
    return _reduceArray(fn)(initial)(array)
  }
}
```

---

## Step 3: Implement Validation Mode Helper

**Key Rules:**
1. Check ALL parameters (don't short-circuit)
2. Accumulate ALL errors in array
3. Unwrap monads and extract values/errors
4. Return `failure([...errors])` if any errors
5. Return `success(result)` if no errors

```typescript
function _addToValidation(augend: unknown) {
  return function _addToValidationWithAugend(
    addend: unknown,
  ): Validation<ValidationError, number> {
    const errors: Array<ValidationError> = []
    let augendValue: unknown = augend
    let addendValue: unknown = addend

    //++ Step 1: Unwrap and validate augend
    if (isValidation(augend)) {
      if (isFailure(augend)) {
        // Accumulate errors from monad
        errors.push(...augend.errors)
      } else {
        // Extract value from Success
        augendValue = augend.value
      }
    }

    // Validate augend type (even if we already have errors!)
    if (!isNumber(augendValue)) {
      errors.push({
        code: "ADD_INVALID_AUGEND",
        field: "augend",
        messages: ["Augend must be a number"],
        received: typeof augendValue,
        expected: "number",
        suggestion: "Provide a number value for augend",
        severity: "requirement",
      })
      augendValue = null  // Safe fallback
    }

    //++ Step 2: Unwrap and validate addend (DON'T SHORT-CIRCUIT!)
    if (isValidation(addend)) {
      if (isFailure(addend)) {
        errors.push(...addend.errors)
      } else {
        addendValue = addend.value
      }
    }

    if (!isNumber(addendValue)) {
      errors.push({
        code: "ADD_INVALID_ADDEND",
        field: "addend",
        messages: ["Addend must be a number"],
        received: typeof addendValue,
        expected: "number",
        suggestion: "Provide a number value for addend",
        severity: "requirement",
      })
      addendValue = null  // Safe fallback
    }

    //++ Step 3: Return result
    if (errors.length > 0) {
      return failure(errors)  // Accumulated errors
    }

    // Both values are valid numbers at this point
    return success((augendValue as number) + (addendValue as number))
  }
}
```

---

## Step 4: Implement Result Mode Helper

**Key Rules:**
1. Check parameters sequentially (fail-fast OK)
2. Return error immediately on first problem
3. Pass through Error monads unchanged
4. Return `error({...})` for validation failures
5. Return `ok(result)` if all valid

```typescript
function _addToResult(augend: unknown) {
  return function _addToResultWithAugend(
    addend: unknown,
  ): Result<ValidationError, number> {
    let augendValue: unknown = augend

    //++ Step 1: Check augend FIRST (fail-fast)
    if (isResult(augend)) {
      if (isError(augend)) {
        return augend  // Pass through error unchanged
      }
      augendValue = augend.value
    }

    if (!isNumber(augendValue)) {
      return error({
        code: "ADD_INVALID_AUGEND",
        field: "augend",
        messages: ["Augend must be a number"],
        received: typeof augendValue,
        expected: "number",
        suggestion: "Provide a number value for augend",
        severity: "requirement",
      })
    }

    //++ Step 2: Check addend (only if augend valid)
    let addendValue: unknown = addend

    if (isResult(addend)) {
      if (isError(addend)) {
        return addend  // Pass through error
      }
      addendValue = addend.value
    }

    if (!isNumber(addendValue)) {
      return error({
        code: "ADD_INVALID_ADDEND",
        field: "addend",
        messages: ["Addend must be a number"],
        received: typeof addendValue,
        expected: "number",
        suggestion: "Provide a number value for addend",
        severity: "requirement",
      })
    }

    //++ Step 3: Return result
    return ok((augendValue as number) + (addendValue as number))
  }
}
```

---

## Step 5: Implement Plain Mode Helper

**Key Rules:**
1. Type-check all parameters
2. Return `null` on validation failure (fail silently)
3. Return plain value (not wrapped in monad)
4. May use native JavaScript methods with `[EXCEPTION]` comment

```typescript
function _addArray(augend: unknown) {
  return function _addArrayWithAugend(addend: unknown): number | null {
    //++ Step 1: Validate augend
    if (!isNumber(augend)) {
      return null  // Fail silently in plain mode
    }

    //++ Step 2: Validate addend
    if (!isNumber(addend)) {
      return null  // Fail silently
    }

    //++ Step 3: Compute and return plain number
    //++ [EXCEPTION] Using + operator for arithmetic
    return augend + addend
  }
}
```

---

## Step 6: Create Helper Files

### File Structure

```
add/
├── index.ts                    # Main entry point with overloads + mode detection
├── _addArray/
│   └── index.ts               # Plain mode helper
├── _addToResult/
│   └── index.ts               # Result mode helper
└── _addToValidation/
    └── index.ts               # Validation mode helper
```

### Example: `_addArray/index.ts`

```typescript
import isNumber from "../../../predicates/isNumber/index.ts"

//++ Private helper: adds two numbers (plain mode)
export default function _addArray(augend: unknown) {
  return function _addArrayWithAugend(addend: unknown): number | null {
    if (!isNumber(augend) || !isNumber(addend)) {
      return null
    }

    //++ [EXCEPTION] Using + operator for arithmetic
    return augend + addend
  }
}
```

---

## Step 7: Write Tests

### Test All Modes

```typescript
Deno.test("add - plain mode", async function addPlainTests(t) {
  await t.step("adds two numbers", function addsNumbers() {
    assertEquals(add(2)(3), 5)
  })

  await t.step("returns null for invalid input", function invalidInput() {
    assertEquals(add(2)(null), null)
    assertEquals(add(null)(3), null)  // V2: Checks first param too!
  })
})

Deno.test("add - Result mode", async function addResultTests(t) {
  await t.step("adds Result monads", function addsResults() {
    assertEquals(add(ok(2))(ok(3)), ok(5))
  })

  await t.step("passes through errors", function passesErrors() {
    const err = error({ code: "TEST_ERROR", ... })
    assertEquals(add(err)(ok(3)), err)
    assertEquals(add(ok(2))(err), err)  // V2: Either param can have error
  })

  await t.step("validates plain values in Result mode", function validatesPlain() {
    const result = add(ok(2))(null)  // Mixed: Result + plain
    assertEquals(isError(result), true)
  })
})

Deno.test("add - Validation mode", async function addValidationTests(t) {
  await t.step("adds Validation monads", function addsValidations() {
    assertEquals(add(success(2))(success(3)), success(5))
  })

  await t.step("accumulates errors", function accumulatesErrors() {
    const result = add(false)(null)
    assertEquals(isFailure(result), true)
    if (isFailure(result)) {
      assertEquals(result.errors.length, 2)  // V2: Both errors collected!
    }
  })

  await t.step("Validation wins over Result", function validationWins() {
    // Mixed modes: error (Result) + failure (Validation)
    const result = add(error({ ... }))(failure([{ ... }]))
    assertEquals(isFailure(result), true)  // V2: Validation mode activated
  })
})
```

---

## Common Patterns

### Pattern 1: Functions that Don't Error

For functions like `reverse`, `length` that can't logically error:

```typescript
// Plain mode: Always succeeds
function _reverseArray<T>(array: ReadonlyArray<T>): ReadonlyArray<T> {
  return [...array].reverse()
}

// Result mode: Just wraps in ok()
function _reverseToResult<T>(array: unknown): Result<ValidationError, ReadonlyArray<T>> {
  if (isResult(array)) {
    if (isError(array)) return array  // Pass through
    array = array.value
  }

  if (!isArray(array)) {
    return error({ code: "REVERSE_INVALID_INPUT", ... })
  }

  return ok(_reverseArray(array))  // Delegate to array helper
}
```

### Pattern 2: Functions with Complex Validation

For functions like `chunk(size)(array)` with validation rules:

```typescript
// Validation mode: Check size AND array
function _chunkToValidation(size: unknown) {
  return function(array: unknown): Validation<ValidationError, ...> {
    const errors: Array<ValidationError> = []

    // Validate size
    if (!isPositiveInteger(size)) {
      errors.push({ code: "CHUNK_INVALID_SIZE", ... })
    }

    // Validate array (don't short-circuit!)
    if (isValidation(array)) {
      if (isFailure(array)) errors.push(...array.errors)
      array = isSuccess(array) ? array.value : null
    }
    if (!isArray(array)) {
      errors.push({ code: "CHUNK_INVALID_INPUT", ... })
    }

    if (errors.length > 0) return failure(errors)

    // Both valid, compute
    return success(_chunkArray(size)(array))
  }
}
```

### Pattern 3: Functions that Take Functions

For higher-order functions like `map(fn)(array)`:

```typescript
// Validation mode: Check fn AND array
function _mapToValidation<T, U>(fn: unknown) {
  return function(array: unknown): Validation<ValidationError, Array<U>> {
    const errors: Array<ValidationError> = []

    // Validate fn
    if (!isFunction(fn)) {
      errors.push({ code: "MAP_INVALID_FUNCTION", field: "fn", ... })
      fn = () => null  // Safe fallback
    }

    // Validate array
    if (isValidation(array)) {
      if (isFailure(array)) errors.push(...array.errors)
      array = isSuccess(array) ? array.value : []
    }
    if (!isArray(array)) {
      errors.push({ code: "MAP_INVALID_INPUT", field: "array", ... })
      array = []
    }

    if (errors.length > 0) return failure(errors)

    // Both valid
    return success(_mapArray(fn as Function)(array as Array<T>))
  }
}
```

---

## Migration Checklist

When migrating existing three-path functions to V2:

- [ ] Update mode detection to check ALL parameters
- [ ] Implement "Validation wins" rule
- [ ] Update Validation helper to check all params (no short-circuit)
- [ ] Update Result helper (fail-fast OK)
- [ ] Update Plain helper (return null on errors)
- [ ] Add tests for new behavior:
  - [ ] First parameter is monad
  - [ ] Last parameter is monad
  - [ ] Both parameters are monads
  - [ ] Mixed modes (Result + Validation)
  - [ ] Error accumulation (Validation mode)
- [ ] Update function documentation
- [ ] Verify no constitutional violations

---

## See Also

- `THREE_PATH_PATTERN_V2.md` - Architecture and rationale
- `.claude/skills/function-implementation/` - Function implementation skill
- `.claude/skills/error-handling/` - Error handling patterns
- `array/map/index.ts` - Example implementation (will be updated to V2)
