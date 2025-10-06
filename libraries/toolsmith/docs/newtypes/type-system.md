# Type System Design

## All Branded Types

**Location**: `types/branded/index.ts`

All branded types are defined in a single file and exported as named exports:

```typescript
// types/branded/index.ts

// Generic brand utility
export type Brand<K, T> = K & { readonly __brand: T }

// Basic numeric types
export type Integer = number & { readonly __brand: "Integer" }
export type BigInteger = bigint & { readonly __brand: "BigInteger" }
export type Float = number & { readonly __brand: "Float" }

// Fixed-scale decimal types (stored as bigint with implicit scale)
export type Currency = bigint & { readonly __brand: "Currency" }  // 2 decimals
export type Decimal0 = bigint & { readonly __brand: "Decimal0" }  // 0 decimals
export type Decimal1 = bigint & { readonly __brand: "Decimal1" }  // 1 decimal
export type Decimal3 = bigint & { readonly __brand: "Decimal3" }  // 3 decimals
export type Decimal4 = bigint & { readonly __brand: "Decimal4" }  // 4 decimals
export type Decimal8 = bigint & { readonly __brand: "Decimal8" }  // 8 decimals
export type Percentage = bigint & { readonly __brand: "Percentage" }  // 4 decimals
```

## Type Descriptions

### Basic Number Types

#### 1. Integer
- **Storage**: `number`
- **Range**: -2^53+1 to 2^53-1 (JavaScript safe integer range)
- **Validation**: `Number.isInteger(n) && Number.isSafeInteger(n)`
- **Use case**: Array indices, counts, IDs within safe range

#### 2. BigInteger
- **Storage**: `bigint`
- **Range**: Unlimited (arbitrary precision)
- **Validation**: `typeof n === "bigint"`
- **Use case**: Cryptography, large calculations, blockchain values

#### 3. Float
- **Storage**: `number`
- **Precision**: IEEE 754 double precision
- **Validation**: `typeof n === "number" && isFinite(n)`
- **Use case**: General calculations, measurements, graphics where exact decimal precision not required

### Fixed-Scale Decimal Types

All fixed-scale decimals use **integer-backed storage** (Haskell Data.Fixed approach):
- Stored as `bigint` (the unscaled integer value)
- Scale is implicit in the type (not stored with each value)
- All arithmetic is exact integer arithmetic
- Convert to/from number only at boundaries

Example: `$123.45` (Currency with scale 2) → stored as `12345n`

#### 4. Currency (2 decimals)
- **Storage**: `bigint`
- **Scale**: 2 (cents)
- **Example**: `$123.45` → `12345n`
- **Use case**: Most world currencies (USD, EUR, GBP, etc.)

#### 5. Decimal0 (0 decimals)
- **Storage**: `bigint`
- **Scale**: 0 (whole numbers)
- **Example**: `¥1234` → `1234n`
- **Use case**: Zero-decimal currencies (Japanese Yen, Korean Won, etc.)

#### 6. Decimal1 (1 decimal)
- **Storage**: `bigint`
- **Scale**: 1
- **Example**: `12.3` → `123n`
- **Use case**: Custom precision needs, some measurement systems

#### 7. Decimal3 (3 decimals)
- **Storage**: `bigint`
- **Scale**: 3
- **Example**: `1.234` → `1234n`
- **Use case**: Three-decimal currencies (Bahraini Dinar, Jordanian Dinar, Kuwaiti Dinar)

#### 8. Decimal4 (4 decimals)
- **Storage**: `bigint`
- **Scale**: 4
- **Example**: `3.1416` → `31416n`
- **Use case**: Scientific calculations, exchange rates, basis points

#### 9. Decimal8 (8 decimals)
- **Storage**: `bigint`
- **Scale**: 8
- **Example**: `3.14159265` → `314159265n`
- **Use case**: High-precision calculations, cryptocurrency (satoshis)

#### 10. Percentage (4 decimals - basis points)
- **Storage**: `bigint`
- **Scale**: 4
- **Example**: `12.34%` → `123400n` (stored as 0.1234 decimal)
- **Use case**: Interest rates, percentages requiring precision

## Scale Constants

**Location**: `newtypes/constants/index.ts`

All scale constants in one file, exported as named exports in SCREAMING_SNAKE_CASE:

```typescript
export const CURRENCY_SCALE = 2
export const DECIMAL0_SCALE = 0
export const DECIMAL1_SCALE = 1
export const DECIMAL3_SCALE = 3
export const DECIMAL4_SCALE = 4
export const DECIMAL8_SCALE = 8
export const PERCENTAGE_SCALE = 4
```

## Why Integer-Backed Fixed-Scale Decimals?

This approach is used by Haskell (Data.Fixed), Rust (rust_decimal), Java (BigDecimal), and C# (decimal) because:

1. **Exact arithmetic**: All operations are integer operations (no floating point imprecision)
2. **Zero overhead**: The brand is compile-time only
3. **Type-safe**: Can't mix different scales
4. **Simple**: Still just a bigint underneath
5. **Proven**: Industry-standard approach for financial calculations

### Example: Currency Arithmetic

```typescript
// $10.50 + $5.25 = $15.75
const a: Currency = 1050n as Currency  // $10.50
const b: Currency = 525n as Currency   // $5.25
const sum: Currency = (a + b) as Currency  // 1575n = $15.75

// No floating point errors!
// In regular JavaScript: 10.50 + 5.25 might have rounding errors
```

## Type Safety in Action

```typescript
import type { Integer, Float, Currency } from "@sitebender/toolsmith/types/branded/index.ts"

function processInteger(n: Integer): void {
	console.log("Processing integer:", n)
}

function processCurrency(amount: Currency): void {
	console.log("Processing currency:", amount)
}

const int: Integer = 42 as Integer
const flt: Float = 3.14 as Float
const cur: Currency = 12345n as Currency

processInteger(int)  // ✅ OK
processInteger(flt)  // ❌ TYPE ERROR: Float not assignable to Integer
processCurrency(int) // ❌ TYPE ERROR: Integer not assignable to Currency
processCurrency(cur) // ✅ OK
```

The type system prevents mixing semantically different values, even when they share the same underlying primitive type.

**Next**: [Implementation Patterns](./patterns.md)
