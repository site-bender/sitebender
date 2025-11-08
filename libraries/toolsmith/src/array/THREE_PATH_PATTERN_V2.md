# Three-Path Pattern V2: Any-Parameter Monadic Mode

## Architecture Decision (2025-01-06)

**Previous Pattern (V1):** Only the last "data" parameter could trigger monadic mode (Result or Validation).

**New Pattern (V2):** **ANY parameter can trigger monadic mode**, enabling natural functional composition and proper error accumulation.

---

## ⚠️ CRITICAL: Native JavaScript Methods Are ALLOWED Internally

**IMPORTANT:** Using native JavaScript methods (`.filter()`, `.map()`, `.reduce()`, `.some()`, etc.) **is explicitly allowed and encouraged** for performance reasons inside Toolsmith function implementations.

### What This Means

✅ **ALLOWED and CORRECT:**
```typescript
// Using native methods internally in Toolsmith functions
export default function compact<T>(array: Array<T | null | undefined>): Array<T> {
  //++ [EXCEPTION] Using native .filter() is explicitly allowed for performance
  return array.filter(function(item): item is T {
    return item !== undefined && item !== null
  })
}
```

❌ **NOT about internal implementation:**
```typescript
// The three-path pattern is about EXTERNAL API, not internal methods
// These are DIFFERENT concerns:

// 1. Should compact be three-path? → YES (Batch 22 migration)
// 2. Should compact use native .filter() internally? → YES (performance)
```

### The Real Distinction

| Concern | Question | Answer |
|---------|----------|--------|
| **API Design** | Should this function support Result/Validation inputs? | Three-path pattern decision |
| **Implementation** | What methods should the function use internally? | Native JS methods explicitly allowed |

**Three-path pattern is about the EXTERNAL API** (what inputs/outputs the function accepts).

**Native methods are about INTERNAL implementation** (how the function computes its result).

### Example: Plain Function vs Three-Path Function

**Plain Function (Current):**
```typescript
// Returns only plain array - uses native methods internally ✅
export default function compact<T>(array: Array<T>): Array<T> {
  return array.filter(item => item !== null && item !== undefined)
}
```

**Three-Path Function (Future - Batch 22):**
```typescript
// Returns plain/Result/Validation - STILL uses native methods internally ✅
export default function compact<T>(array: Array<T>): Array<T>
export default function compact<T>(array: Result<...>): Result<...>
export default function compact<T>(array: Validation<...>): Validation<...>

export default function compact<T>(array: unknown) {
  if (isResult(array)) return _compactToResult(array)
  if (isValidation(array)) return _compactToValidation(array)
  return _compactArray(array)  // <-- _compactArray STILL uses native .filter() ✅
}

// Helper ALSO uses native methods
function _compactArray<T>(array: Array<T>): Array<T> {
  //++ [EXCEPTION] Native .filter() allowed for performance
  return array.filter(item => item !== null && item !== undefined)
}
```

**Key Point:** Both plain and three-path functions use native methods internally. The difference is whether they support monadic inputs/outputs.

---

## Core Principles

### 1. Any Parameter Can Be Monadic

```typescript
// V1: Only last param triggers mode
add(5)(Result<number>)         // ✓ Result mode
add(Result<number>)(5)         // ✗ Plain mode (loses monad!)

// V2: ANY param triggers mode
add(5)(Result<number>)         // ✓ Result mode
add(Result<number>)(5)         // ✓ Result mode
add(Result<number>)(Result<number>)  // ✓ Result mode
```

### 2. Validation Wins (Most Permissive)

When parameters use mixed monad types, **Validation mode takes precedence** to maximize error collection:

```typescript
add(error("BAD_AUGEND"))(ok(5))              // Result mode (both Result)
add(failure([err1]))(success(5))             // Validation mode (both Validation)
add(error("BAD_AUGEND"))(failure([err2]))    // Validation mode (VALIDATION WINS)
add(failure([err1]))(ok(5))                  // Validation mode (VALIDATION WINS)
```

**Rule:** `if ANY param is Validation → Validation mode, else if ANY param is Result → Result mode, else plain mode`

### 3. Check ALL Parameters (Validation Mode)

In Validation mode, **always validate ALL parameters** to accumulate maximum errors:

```typescript
add(false)(divide(10)(0))
// Validation mode activated
// Errors collected:
// 1. "ADD_INVALID_AUGEND" (from false)
// 2. "DIVIDE_BY_ZERO" (from divide result)
// → failure([error1, error2])  ✓ Both errors captured!
```

**Rule:** Never short-circuit validation—check every parameter even after finding errors.

---

## Mode Detection Algorithm

```typescript
function detectMode(...params: unknown[]): "validation" | "result" | "plain" {
  // Check if ANY parameter is Validation
  const hasValidation = params.some(isValidation)
  if (hasValidation) return "validation"

  // Check if ANY parameter is Result
  const hasResult = params.some(isResult)
  if (hasResult) return "result"

  // Otherwise plain mode
  return "plain"
}
```

### Implementation Pattern

```typescript
function add(augend: number | Result<...> | Validation<...>) {
  return function addToAugend(addend: number | Result<...> | Validation<...>) {
    // Detect mode by checking BOTH parameters
    const mode = detectMode(augend, addend)

    if (mode === "validation") {
      return _addToValidation(augend)(addend)  // Accumulate all errors
    }

    if (mode === "result") {
      return _addToResult(augend)(addend)  // Fail-fast on first error
    }

    // Plain mode
    return _addArray(augend)(addend)  // Type-check and return plain value
  }
}
```

---

## Error Handling Patterns

### Validation Mode: Accumulate ALL Errors

```typescript
function _addToValidation<E>(augend: unknown) {
  return function _addToValidationWithAugend(addend: unknown): Validation<E, number> {
    const errors: Array<E> = []

    // Check augend (DON'T short-circuit)
    if (isValidation(augend)) {
      if (isFailure(augend)) {
        errors.push(...augend.errors)  // Accumulate from monad
      }
      augend = isSuccess(augend) ? augend.value : null
    }
    if (!isNumber(augend)) {
      errors.push({
        code: "ADD_INVALID_AUGEND",
        field: "augend",
        messages: ["Augend must be a number"],
        received: typeof augend,
        expected: "number",
        suggestion: "Provide a number value",
        severity: "requirement",
      } as E)
    }

    // Check addend (DON'T short-circuit)
    if (isValidation(addend)) {
      if (isFailure(addend)) {
        errors.push(...addend.errors)  // Accumulate from monad
      }
      addend = isSuccess(addend) ? addend.value : null
    }
    if (!isNumber(addend)) {
      errors.push({
        code: "ADD_INVALID_ADDEND",
        field: "addend",
        messages: ["Addend must be a number"],
        received: typeof addend,
        expected: "number",
        suggestion: "Provide a number value",
        severity: "requirement",
      } as E)
    }

    // If any errors, return failure
    if (errors.length > 0) {
      return failure(errors)
    }

    // Otherwise compute and return success
    return success(augend + addend)
  }
}
```

### Result Mode: Fail-Fast

```typescript
function _addToResult<E>(augend: unknown) {
  return function _addToResultWithAugend(addend: unknown): Result<E, number> {
    // Check augend FIRST (fail-fast)
    if (isResult(augend)) {
      if (isError(augend)) {
        return augend  // Pass through error immediately
      }
      augend = augend.value
    }
    if (!isNumber(augend)) {
      return error({
        code: "ADD_INVALID_AUGEND",
        field: "augend",
        messages: ["Augend must be a number"],
        received: typeof augend,
        expected: "number",
        suggestion: "Provide a number value",
        severity: "requirement",
      } as E)
    }

    // Only check addend if augend is valid
    if (isResult(addend)) {
      if (isError(addend)) {
        return addend  // Pass through error
      }
      addend = addend.value
    }
    if (!isNumber(addend)) {
      return error({
        code: "ADD_INVALID_ADDEND",
        field: "addend",
        messages: ["Addend must be a number"],
        received: typeof addend,
        expected: "number",
        suggestion: "Provide a number value",
        severity: "requirement",
      } as E)
    }

    // Compute and return ok
    return ok(augend + addend)
  }
}
```

### Plain Mode: Return null on Error

```typescript
function _addArray(augend: unknown) {
  return function _addArrayWithAugend(addend: unknown): number | null {
    // Type-check augend
    if (!isNumber(augend)) {
      return null  // Fail silently in plain mode
    }

    // Type-check addend
    if (!isNumber(addend)) {
      return null  // Fail silently
    }

    // Compute and return plain number
    return augend + addend
  }
}
```

---

## Composition Benefits

### Natural Nesting

```typescript
// All these compose naturally now:
add(subtract(10)(5))(multiply(2)(3))
// If subtract returns Result → Result mode activated
// If multiply returns Validation → Validation mode activated (wins)
```

### Error Accumulation Across Composition

```typescript
add(
  subtract(10)(false),      // → error("INVALID_SUBTRAHEND")
  divide(10)(0)             // → error("DIVIDE_BY_ZERO")
)
// Validation mode: Both errors collected!
// → failure([error1, error2])
```

### Mixed Modes Handled Gracefully

```typescript
add(
  func1(),  // Returns Result<number>
  func2()   // Returns Validation<number>
)
// Validation wins → Validation mode activated
// Errors from both funcs accumulated
```

---

## Implementation Checklist

For each three-path function:

- [ ] **Mode detection checks ALL parameters** (not just last)
- [ ] **Validation wins rule** implemented (any Validation → Validation mode)
- [ ] **Validation mode validates ALL params** (no short-circuit)
- [ ] **Result mode fails fast** (short-circuit on first error)
- [ ] **Plain mode returns null** on invalid input
- [ ] **Error passthrough** (Error/Failure monads passed along unchanged)
- [ ] **Type guards** (isValidation, isResult, isSuccess, isFailure, isOk, isError)
- [ ] **Three overload signatures** (plain, Result, Validation)
- [ ] **Helper functions** (`_array`, `_toResult`, `_toValidation`)
- [ ] **Constitutional compliance** (no classes, mutations, loops without exceptions)
- [ ] **Tests for all paths** (plain, Result, Validation, mixed modes)

---

## Migration Strategy

### Phase 1: New Functions (Immediate)
- All new three-path functions use V2 pattern
- Check all parameters for monad detection
- Implement Validation-wins rule

### Phase 2: Existing Functions (Batch 22+)
- Update existing three-path functions incrementally
- Start with simple 1-param functions
- Move to complex multi-param functions
- Update tests for new behavior

### Phase 3: Validation (Testing)
- Property-based tests for composition
- Mixed-mode tests (Result + Validation)
- Error accumulation tests
- Performance benchmarks (checking all params has overhead)

---

## Performance Considerations

**Trade-off:** Checking all parameters adds overhead vs. last-parameter-only.

**Mitigation:**
- Mode detection is O(n) where n = parameter count (typically 1-3)
- Type guards are cheap (single property checks)
- Benefit: Natural composition outweighs minor overhead
- Most critical path is plain mode (no guards needed)

**Recommendation:** Accept minor overhead for architectural benefits.

---

## See Also

- `IMPLEMENTING_THREE_PATH_V2.md` - Step-by-step implementation guide
- `array/map/index.ts` - Example of well-implemented three-path function
- `.claude/skills/function-implementation/` - Function implementation skill
- `.claude/skills/error-handling/` - Error handling patterns
