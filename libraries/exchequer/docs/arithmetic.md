# Exchequer Arithmetic Requirements

## Overview

Exchequer needs **exact decimal arithmetic** for currency calculations to avoid floating point errors. This functionality will be provided by **Toolsmith** precision arithmetic primitives.

## Required from Toolsmith

### Precision Arithmetic (`precision/`)

Exact decimal arithmetic that avoids floating point rounding errors:

- `add/index.ts` - exact decimal addition → `number | null`
- `subtract/index.ts` - exact decimal subtraction → `number | null`
- `multiply/index.ts` - exact decimal multiplication → `number | null`
- `divide/index.ts` - exact decimal division → `number | null`

**Implementation approach:** Fixed-point arithmetic (store as integers, track decimal places) or approved dependency.

**Vanilla pattern:** Returns `number | null` (null on error, no exceptions).

### Corresponding Boxed Versions (`precision/`)

Monadic wrappers using lift functions:

- `add/index.ts` - lifts vanilla precision add
- `subtract/index.ts` - lifts vanilla precision subtract
- `multiply/index.ts` - lifts vanilla precision multiply
- `divide/index.ts` - lifts vanilla precision divide

**Boxed pattern:** Uses `liftBinary`/`liftUnary` to wrap vanilla functions for monadic composition.

## Additional Arithmetic Types (Future)

### Integer Arithmetic (`integer/`, `integer/`)

For quantities, counts, indices where only whole numbers are valid:

- Validates inputs are whole numbers
- Returns `number | null` in vanilla version
- Useful for item quantities, inventory counts

### BigInt Arithmetic (`bigint/`, `bigint/`)

For values exceeding `Number.MAX_SAFE_INTEGER`:

- Uses native JS `BigInt`
- Returns `bigint | null` in vanilla version
- Useful for large IDs, transaction counts

## Usage in Exchequer

```typescript
import { add } from "@sitebender/toolsmith/precision/add/index.ts"
import { multiply } from "@sitebender/toolsmith/precision/multiply/index.ts"

// Price calculation with exact decimal arithmetic
const subtotal = multiply(price)(quantity) // 2999 × 2 = 5998
const discounted = multiply(subtotal)(0.9) // 5998 × 0.9 = 5398.2
const withTax = multiply(discounted)(1.0725) // 5398.2 × 1.0725 = 5789.77
const total = add(withTax)(shipping) // 5789.77 + 895 = 6684.77

// No floating point errors like 6684.769999999999
```

## Why Not Standard Math Operations?

JavaScript's standard arithmetic uses IEEE 754 floating point, which has rounding errors:

```javascript
// Standard JavaScript (WRONG for currency)
0.1 + 0.2 // 0.30000000000000004
2999 * 2 * 0.9 * 1.0725 // 5789.7699999999995
```

Exchequer requires **exact** calculations for:

- Price calculations
- Tax calculations
- Discount calculations
- Currency conversions
- Order totals

## Architecture Notes

- **Toolsmith provides primitives** (precision arithmetic)
- **Exchequer composes primitives** (price calculations, tax, discounts)
- **Zero dependencies** - no external decimal libraries unless Warden-approved
- **Pure functions** - no mutations, predictable behavior
- **Currency-safe** - exact decimal representation

## Status

**Pending:** Toolsmith precision arithmetic implementation.

Once Toolsmith provides `precision/` and `precision/`, Exchequer can compose them for all currency calculations.
