# Vanilla Functions

This directory contains plain JavaScript/TypeScript functions that form the foundation of the Toolsmith library. These functions are "vanilla" in that they do not depend on monads or advanced functional programming constructs.

## Error Handling Convention

**IMPORTANT:** Vanilla functions in this library follow a strict error handling convention:

### The Null Convention

1. **Never return `undefined`** - Vanilla functions MUST NOT return `undefined` for error conditions
2. **Return `null` for errors** - When a function encounters an error condition (invalid input, out-of-range values, etc.), it MUST return `null`
3. **Never throw exceptions** - Vanilla functions should not throw errors; they return `null` instead

### Why This Convention?

This convention enables the boxed (monadic) versions of these functions to automatically convert `null` returns into proper `Error` Results or `Failure` Validations. The lift functions (`liftUnary`, `liftBinary`, `liftTernary`, `liftQuaternary`) detect `null` returns and wrap them appropriately.

### Examples

```typescript
// ✅ CORRECT - Returns null on error
export default function add(addend: number) {
  if (!isFinite(addend)) {
    return null  // Error condition
  }
  return function addToAugend(augend: number): number | null {
    if (!isFinite(augend)) {
      return null  // Error condition
    }
    return augend + addend  // Success
  }
}

// ❌ WRONG - Never return undefined
export default function bad(x: number) {
  if (x < 0) {
    return undefined  // WRONG! Use null instead
  }
  return x * 2
}

// ❌ WRONG - Never throw errors
export default function alsoBad(x: number) {
  if (x < 0) {
    throw new Error("Negative number")  // WRONG! Return null instead
  }
  return x * 2
}
```

### Return Type Signatures

When a vanilla function can error, its return type should include `| null`:

```typescript
// Single parameter function that can error
export default function sqrt(n: number): number | null

// Curried function that can error at any stage
export default function divide(divisor: number): ((dividend: number) => number | null) | null
```

### Benefits

1. **Predictable**: `null` always means "error condition"
2. **Type-safe**: TypeScript can track the `| null` union type
3. **Composable**: Lift functions automatically handle the `null` → `Error`/`Failure` conversion
4. **No exceptions**: No try/catch needed, errors are values
5. **Consistent**: All vanilla functions follow the same pattern

## Boxed Versions

Every vanilla function has a corresponding "boxed" version in `../boxed` that:
- Wraps the vanilla function with a lift function
- Automatically converts `null` returns to `Error` Results or `Failure` Validations
- Enables monadic composition and error handling

See the `../boxed` directory for the monadic versions of these functions.
