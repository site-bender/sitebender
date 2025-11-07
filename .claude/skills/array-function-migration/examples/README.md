# Array Function Migration Examples

## Reference Implementations

**IMPORTANT**: Instead of copying examples here, refer directly to the working implementations in the main codebase:

- **`src/array/map/`** - Function transformation pattern (takes function parameter)
- **`src/array/reduce/`** - Reduction pattern (two-level currying)

These are the canonical, tested, constitutional-compliant implementations.

## Why No Local Examples?

The skill originally contained copies of `map` and `reduce`, but copying creates maintenance burden:
- Examples can drift out of sync with main code
- Fixes to violations need to be applied in multiple places
- Single source of truth is better

## Pattern Summary

### `map` - Function Transformation Pattern

**Signature**: `map<T, U>(f: (arg: T, index?: number) => U)`

**Pattern**: Takes a function parameter first, applies it to each element

**Demonstrates**:
- Function parameter with "With" conjunction: `mapWithFunction`
- Transformation that preserves array structure
- Applying a mapping function to each element
- Type transformation (T → U)

### `reduce` - Reduction Pattern

**Signature**: `reduce<T, U>(fn: (accumulator: U, item: T) => U)(initialValue: U)`

**Pattern**: Takes reducer function and initial value, reduces array to single value

**Demonstrates**:
- Two-level currying: `reduceWithFunction(init)` → `reduceWithFunctionAndInitial(array)`
- Reduction from array to single value
- Accumulator pattern
- Type transformation (Array<T> → U)

## Pattern Summary

Both examples follow the same architecture:

```
function/
├── index.ts                    # Public function with overloads
├── index.test.ts              # Tests for all 3 paths
├── _functionArray/
│   ├── index.ts               # Plain path implementation
│   └── index.test.ts
├── _functionToResult/
│   ├── index.ts               # Result path implementation
│   └── index.test.ts
└── _functionToValidation/
    ├── index.ts               # Validation path implementation
    └── index.test.ts
```

## Type Guard Dispatch Pattern

Both examples use identical type guard dispatch:

```typescript
function innerFunction(array: Array | Result | Validation) {
  // 1. Plain path (most common)
  if (isArray<T>(array)) {
    return _functionArray(...)(array)
  }

  // 2. Result path (fail-fast)
  if (isOk<ReadonlyArray<T>>(array)) {
    return chainResults(_functionToResult(...))(array)
  }

  // 3. Validation path (error accumulation)
  if (isSuccess<ReadonlyArray<T>>(array)) {
    return chainValidations(_functionToValidation(...))(array)
  }

  // 4. Fallback (pass through errors)
  return array
}
```

## How to Use These Examples

1. **Copy the pattern** for your new function
2. **Adapt the logic** to your function's behavior
3. **Update names** to match your function
4. **Adjust return types** if needed (single value vs array)
5. **Design error codes** specific to your function
6. **Write tests** covering all 3 paths + passthroughs

## Common Differences Between Functions

| Aspect | map | reduce | head (hypothetical) |
|--------|-----|--------|---------------------|
| Parameters | 1 (function) | 2 (function, initial) | 0 (unary) |
| Currying levels | 1 | 2 | 0 (no inner function) |
| Return type (plain) | `Array<U>` | `U` | `T \| undefined` |
| Return type (Result) | `Result<E, Array<U>>` | `Result<E, U>` | `Result<E, T>` |
| Built-in method | `.map()` | `.reduce()` | `[0]` indexing |

## Testing Pattern

All functions test:
- ✅ Plain path happy case
- ✅ Plain path edge cases (empty array, invalid input)
- ✅ Result path happy case
- ✅ Result path error cases
- ✅ Result path passthrough (existing error)
- ✅ Validation path happy case
- ✅ Validation path error cases
- ✅ Validation path passthrough (existing failure)

## Constitutional Compliance

All examples are fully compliant:
- ✅ No arrow functions
- ✅ Curried (one parameter per function)
- ✅ No loops (use `.map()`, `.reduce()` with `[EXCEPTION]` comment)
- ✅ No mutations
- ✅ No exceptions (return Result/Validation)
- ✅ Pure functions
- ✅ Named functions only

These examples serve as the canonical reference for migrating all other array functions.
