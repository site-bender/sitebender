# Implementation Patterns

This document provides copy-paste templates for implementing all newtype functions. Replace placeholders like `{TypeName}`, `{typename}`, `{TYPENAME}`, etc. with actual values.

## Pattern 0: All Type Definitions

**File**: `types/branded/index.ts`

```typescript
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

## Pattern 1: Scale Constants

**File**: `newtypes/constants/index.ts`

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

## Pattern 2: Smart Constructor (number-based: Integer, Float)

**Template** (`newtypes/{typename}/index.ts`):

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { {TypeName} } from "@sitebender/toolsmith/types/branded/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import _is{TypeName} from "@sitebender/toolsmith/newtypes/{typename}/_is{TypeName}/index.ts"

export default function {typename}(n: number): Result<{TypeName}, ValidationError> {
	if (_is{TypeName}(n)) {
		return ok(n)
	}

	return error({
		_tag: "ValidationError",
		field: "{typename}",
		message: "{Error message}",
	})
}
```

**Example** (`newtypes/integer/index.ts`):

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import _isInteger from "@sitebender/toolsmith/newtypes/integer/_isInteger/index.ts"

export default function integer(n: number): Result<Integer, ValidationError> {
	if (_isInteger(n)) {
		return ok(n)
	}

	return error({
		_tag: "ValidationError",
		field: "integer",
		message: "Must be a safe integer",
	})
}
```

## Pattern 3: Smart Constructor (bigint-based: BigInteger)

**Template** (`newtypes/{typename}/index.ts`):

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { {TypeName} } from "@sitebender/toolsmith/types/branded/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import _is{TypeName} from "@sitebender/toolsmith/newtypes/{typename}/_is{TypeName}/index.ts"

export default function {typename}(n: bigint): Result<{TypeName}, ValidationError> {
	if (_is{TypeName}(n)) {
		return ok(n)
	}

	return error({
		_tag: "ValidationError",
		field: "{typename}",
		message: "{Error message}",
	})
}
```

**Example** (`newtypes/bigInteger/index.ts`):

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { BigInteger } from "@sitebender/toolsmith/types/branded/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import _isBigInteger from "@sitebender/toolsmith/newtypes/bigInteger/_isBigInteger/index.ts"

export default function bigInteger(n: bigint): Result<BigInteger, ValidationError> {
	if (_isBigInteger(n)) {
		return ok(n)
	}

	return error({
		_tag: "ValidationError",
		field: "bigInteger",
		message: "Must be a bigint",
	})
}
```

## Pattern 4: Smart Constructor (Fixed-Scale Decimals)

**Template** (`newtypes/{typename}/index.ts`):

Fixed-scale types (Currency, Decimal0-8, Percentage) convert from number to bigint:

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { {TypeName} } from "@sitebender/toolsmith/types/branded/index.ts"

import { {TYPENAME}_SCALE } from "@sitebender/toolsmith/newtypes/constants/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"

export default function {typename}(value: number): Result<{TypeName}, ValidationError> {
	if (!isFinite(value)) {
		return error({
			_tag: "ValidationError",
			field: "{typename}",
			message: "{TypeName} must be finite",
		})
	}

	const scaled = Math.round(value * 10 ** {TYPENAME}_SCALE)
	const bigintValue = BigInt(scaled)

	return ok(bigintValue as {TypeName})
}
```

**Example** (`newtypes/currency/index.ts`):

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { Currency } from "@sitebender/toolsmith/types/branded/index.ts"

import { CURRENCY_SCALE } from "@sitebender/toolsmith/newtypes/constants/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"

export default function currency(dollars: number): Result<Currency, ValidationError> {
	if (!isFinite(dollars)) {
		return error({
			_tag: "ValidationError",
			field: "currency",
			message: "Currency must be finite",
		})
	}

	const cents = Math.round(dollars * 10 ** CURRENCY_SCALE)
	const value = BigInt(cents)

	return ok(value as Currency)
}
```

## Pattern 5: Refinement Predicate (PRIVATE)

**Template** (`newtypes/{typename}/_is{TypeName}/index.ts`):

```typescript
import type { {TypeName} } from "@sitebender/toolsmith/types/branded/index.ts"

export default function _is{TypeName}(n: {BaseType}): n is {TypeName} {
	return {validation logic}
}
```

**Examples**:

`newtypes/integer/_isInteger/index.ts`:
```typescript
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"

export default function _isInteger(n: number): n is Integer {
	return Number.isInteger(n) && Number.isSafeInteger(n)
}
```

`newtypes/float/_isFloat/index.ts`:
```typescript
import type { Float } from "@sitebender/toolsmith/types/branded/index.ts"

export default function _isFloat(n: number): n is Float {
	return typeof n === "number" && isFinite(n)
}
```

`newtypes/bigInteger/_isBigInteger/index.ts`:
```typescript
import type { BigInteger } from "@sitebender/toolsmith/types/branded/index.ts"

export default function _isBigInteger(n: bigint): n is BigInteger {
	return typeof n === "bigint"
}
```

`newtypes/currency/_isCurrency/index.ts`:
```typescript
import type { Currency } from "@sitebender/toolsmith/types/branded/index.ts"

export default function _isCurrency(n: bigint): n is Currency {
	return typeof n === "bigint"
}
```

## Pattern 6: Unsafe Constructor

**Template** (`newtypes/{typename}/unsafe{TypeName}/index.ts`):

```typescript
import type { {TypeName} } from "@sitebender/toolsmith/types/branded/index.ts"

export default function unsafe{TypeName}(n: {BaseType}): {TypeName} {
	return n as {TypeName}
}
```

**Examples**:

`newtypes/integer/unsafeInteger/index.ts`:
```typescript
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"

export default function unsafeInteger(n: number): Integer {
	return n as Integer
}
```

`newtypes/currency/unsafeCurrency/index.ts`:
```typescript
import type { Currency } from "@sitebender/toolsmith/types/branded/index.ts"

export default function unsafeCurrency(n: bigint): Currency {
	return n as Currency
}
```

## Pattern 7: Unwrap (number-based)

**Template** (`newtypes/{typename}/unwrap{TypeName}/index.ts`):

```typescript
import type { {TypeName} } from "@sitebender/toolsmith/types/branded/index.ts"

export default function unwrap{TypeName}(value: {TypeName}): number {
	return value as number
}
```

**Example** (`newtypes/integer/unwrapInteger/index.ts`):

```typescript
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"

export default function unwrapInteger(i: Integer): number {
	return i as number
}
```

## Pattern 8: Unwrap (bigint-based, no scale)

**Template** (`newtypes/{typename}/unwrap{TypeName}/index.ts`):

```typescript
import type { {TypeName} } from "@sitebender/toolsmith/types/branded/index.ts"

export default function unwrap{TypeName}(value: {TypeName}): bigint {
	return value as bigint
}
```

**Example** (`newtypes/bigInteger/unwrapBigInteger/index.ts`):

```typescript
import type { BigInteger } from "@sitebender/toolsmith/types/branded/index.ts"

export default function unwrapBigInteger(value: BigInteger): bigint {
	return value as bigint
}
```

## Pattern 9: Unwrap (Fixed-Scale Decimals)

**Template** (`newtypes/{typename}/unwrap{TypeName}/index.ts`):

Fixed-scale types convert from bigint back to number:

```typescript
import type { {TypeName} } from "@sitebender/toolsmith/types/branded/index.ts"

import { {TYPENAME}_SCALE } from "@sitebender/toolsmith/newtypes/constants/index.ts"

export default function unwrap{TypeName}(value: {TypeName}): number {
	return Number(value as bigint) / 10 ** {TYPENAME}_SCALE
}
```

**Example** (`newtypes/currency/unwrapCurrency/index.ts`):

```typescript
import type { Currency } from "@sitebender/toolsmith/types/branded/index.ts"

import { CURRENCY_SCALE } from "@sitebender/toolsmith/newtypes/constants/index.ts"

export default function unwrapCurrency(value: Currency): number {
	return Number(value as bigint) / 10 ** CURRENCY_SCALE
}
```

## Pattern 10: Addition

**Template** (`newtypes/{typename}/add{TypeName}/index.ts`):

```typescript
import type { {TypeName} } from "@sitebender/toolsmith/types/branded/index.ts"

import unsafe{TypeName} from "@sitebender/toolsmith/newtypes/{typename}/unsafe{TypeName}/index.ts"

export default function add{TypeName}(augend: {TypeName}) {
	return function add{TypeName}WithAugend(addend: {TypeName}): {TypeName} {
		return unsafe{TypeName}((augend as bigint) + (addend as bigint))
	}
}
```

**Example** (`newtypes/currency/addCurrency/index.ts`):

```typescript
import type { Currency } from "@sitebender/toolsmith/types/branded/index.ts"

import unsafeCurrency from "@sitebender/toolsmith/newtypes/currency/unsafeCurrency/index.ts"

export default function addCurrency(augend: Currency) {
	return function addCurrencyWithAugend(addend: Currency): Currency {
		return unsafeCurrency((augend as bigint) + (addend as bigint))
	}
}
```

## Pattern 11: Subtraction

**Template** (`newtypes/{typename}/subtract{TypeName}/index.ts`):

```typescript
import type { {TypeName} } from "@sitebender/toolsmith/types/branded/index.ts"

import unsafe{TypeName} from "@sitebender/toolsmith/newtypes/{typename}/unsafe{TypeName}/index.ts"

export default function subtract{TypeName}(minuend: {TypeName}) {
	return function subtract{TypeName}WithMinuend(subtrahend: {TypeName}): {TypeName} {
		return unsafe{TypeName}((minuend as bigint) - (subtrahend as bigint))
	}
}
```

**Example** (`newtypes/currency/subtractCurrency/index.ts`):

```typescript
import type { Currency } from "@sitebender/toolsmith/types/branded/index.ts"

import unsafeCurrency from "@sitebender/toolsmith/newtypes/currency/unsafeCurrency/index.ts"

export default function subtractCurrency(minuend: Currency) {
	return function subtractCurrencyWithMinuend(subtrahend: Currency): Currency {
		return unsafeCurrency((minuend as bigint) - (subtrahend as bigint))
	}
}
```

## Pattern 12: Multiplication

**Template** (`newtypes/{typename}/multiply{TypeName}/index.ts`):

For fixed-scale decimals, multiplication requires adjusting the scale:

```typescript
import type { {TypeName} } from "@sitebender/toolsmith/types/branded/index.ts"

import { {TYPENAME}_SCALE } from "@sitebender/toolsmith/newtypes/constants/index.ts"

import unsafe{TypeName} from "@sitebender/toolsmith/newtypes/{typename}/unsafe{TypeName}/index.ts"

export default function multiply{TypeName}(multiplicand: {TypeName}) {
	return function multiply{TypeName}WithMultiplicand(multiplier: {TypeName}): {TypeName} {
		const product = (multiplicand as bigint) * (multiplier as bigint)
		const adjusted = product / BigInt(10 ** {TYPENAME}_SCALE)

		return unsafe{TypeName}(adjusted)
	}
}
```

**Example** (`newtypes/currency/multiplyCurrency/index.ts`):

```typescript
import type { Currency } from "@sitebender/toolsmith/types/branded/index.ts"

import { CURRENCY_SCALE } from "@sitebender/toolsmith/newtypes/constants/index.ts"

import unsafeCurrency from "@sitebender/toolsmith/newtypes/currency/unsafeCurrency/index.ts"

export default function multiplyCurrency(multiplicand: Currency) {
	return function multiplyCurrencyWithMultiplicand(multiplier: Currency): Currency {
		const product = (multiplicand as bigint) * (multiplier as bigint)
		const adjusted = product / BigInt(10 ** CURRENCY_SCALE)

		return unsafeCurrency(adjusted)
	}
}
```

## Pattern 13: Division

**Template** (`newtypes/{typename}/divide{TypeName}/index.ts`):

For fixed-scale decimals, division requires adjusting the scale:

```typescript
import type { {TypeName} } from "@sitebender/toolsmith/types/branded/index.ts"

import { {TYPENAME}_SCALE } from "@sitebender/toolsmith/newtypes/constants/index.ts"

import unsafe{TypeName} from "@sitebender/toolsmith/newtypes/{typename}/unsafe{TypeName}/index.ts"

export default function divide{TypeName}(dividend: {TypeName}) {
	return function divide{TypeName}WithDividend(divisor: {TypeName}): {TypeName} {
		const scaled = (dividend as bigint) * BigInt(10 ** {TYPENAME}_SCALE)
		const quotient = scaled / (divisor as bigint)

		return unsafe{TypeName}(quotient)
	}
}
```

**Example** (`newtypes/currency/divideCurrency/index.ts`):

```typescript
import type { Currency } from "@sitebender/toolsmith/types/branded/index.ts"

import { CURRENCY_SCALE } from "@sitebender/toolsmith/newtypes/constants/index.ts"

import unsafeCurrency from "@sitebender/toolsmith/newtypes/currency/unsafeCurrency/index.ts"

export default function divideCurrency(dividend: Currency) {
	return function divideCurrencyWithDividend(divisor: Currency): Currency {
		const scaled = (dividend as bigint) * BigInt(10 ** CURRENCY_SCALE)
		const quotient = scaled / (divisor as bigint)

		return unsafeCurrency(quotient)
	}
}
```

## Summary

These 14 patterns cover all file types needed for the newtype implementation:

0. Type definitions (1 file)
1. Scale constants (1 file)
2. Smart constructors (number-based)
3. Smart constructors (bigint-based)
4. Smart constructors (fixed-scale decimals)
5. Refinement predicates (private)
6. Unsafe constructors
7-9. Unwrap functions (three variants)
10-13. Arithmetic operations (add, subtract, multiply, divide)

**Next**: [File Structure](./file-structure.md)
