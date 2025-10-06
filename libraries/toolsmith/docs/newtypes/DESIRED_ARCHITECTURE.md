# Toolsmith Desired Architecture

**Status**: Authoritative Design Document
**Created**: 2025-10-06
**Purpose**: Single source of truth for Toolsmith's architectural transformation

## Executive Summary

Toolsmith is undergoing a fundamental architectural transformation from a mixed imperative/functional library to a pure functional library with:
1. **Branded types** (numeric and string) for compile-time type safety
2. **Monadic functions** returning `Result<ValidationError, T>` instead of throwing exceptions
3. **Elimination of legacy code** (`vanilla/` and `boxed/` folders)
4. **Reorganized structure** with functions directly under `src/` by domain

## Core Architectural Principles

### 1. Branded Types (Newtypes)

**Problem**: JavaScript's primitive types are too permissive, allowing semantically incorrect operations.

**Solution**: Branded types create distinct compile-time types with zero runtime overhead:

```typescript
// Numeric types
type Integer = number & { readonly __brand: "Integer" }
type ApproximateDecimal = number & { readonly __brand: "ApproximateDecimal" }
type ExactTwoDecimals = number & { readonly __brand: "ExactTwoDecimals" }

// String types
type EmailAddress = string & { readonly __brand: "EmailAddress" }
type Url = string & { readonly __brand: "Url" }
type Uuid = string & { readonly __brand: "Uuid" }

// Collection types
type NonEmptyString = string & { readonly __brand: "NonEmptyString" }
type NonEmptyArray<T> = Array<T> & { readonly __brand: "NonEmptyArray" }
```

**Key Insight**: The `__brand` property is phantom—it exists only at compile-time, not runtime.

### 2. Precision-Focused Naming

**Old Approach** (implementation-focused):
- `Float`, `Currency`, `Decimal0`, `Decimal1`, `Decimal3`, `Decimal4`, `Decimal8`, `Percentage`

**New Approach** (precision-focused):
- `ApproximateDecimal` - Makes floating-point imprecision explicit
- `ExactTwoDecimals` - Precision guarantee, not money-specific
- `ExactOneDecimal`, `ExactThreeDecimals`, `ExactFourDecimals`, `ExactEightDecimals` - Clear precision
- `Percent` - Simpler, clearer
- `Integer`, `BigInteger` - Unchanged (already clear)

**Rationale**: Users care about precision guarantees, not implementation details.

### 3. Monadic Error Handling

**Old Approach**: Functions throw exceptions or return `null`/`undefined`

**New Approach**: All functions return `Result<ValidationError, T>` and are curried

```typescript
// Old (throws)
function divide(a: number, b: number): number {
	if (b === 0) throw new Error("Division by zero")
	return a / b
}

// New (monadic, curried, using helper functions)
export default function divide(
	dividend: number,
): (divisor: number) => Result<ValidationError, number> {
	return function divideWithDividend(
		divisor: number,
	): Result<ValidationError, number> {
		if (divisor === 0) {
			return error({
				code: "DIVISION_BY_ZERO",
				field: "divisor",
				messages: ["System cannot divide by zero"],
				received: divisor,
				expected: "Non-zero number",
				suggestion: "Provide a non-zero divisor",
				severity: "requirement",
			})
		}

		return ok(dividend / divisor)
	}
}
```

### 4. Scaled Integer Arithmetic for Exact Decimals

**Problem**: Floating-point arithmetic is imprecise: `0.1 + 0.2 !== 0.3`

**Solution**: Store exact decimals as scaled integers (Haskell approach):

```typescript
// ExactTwoDecimals: 19.99 stored as 1999 (scaled by 100)
export default function addExactTwoDecimals(
	augend: ExactTwoDecimals,
): (addend: ExactTwoDecimals) => Result<ValidationError, ExactTwoDecimals> {
	return function addToAugend(
		addend: ExactTwoDecimals,
	): Result<ValidationError, ExactTwoDecimals> {
		const SCALE_FACTOR = 100
		const augendRaw = unwrapExactTwoDecimals(augend)
		const addendRaw = unwrapExactTwoDecimals(addend)

		const augendScaled = Math.round(augendRaw * SCALE_FACTOR)
		const addendScaled = Math.round(addendRaw * SCALE_FACTOR)
		const resultScaled = augendScaled + addendScaled
		const resultRaw = resultScaled / SCALE_FACTOR

		return exactTwoDecimals(resultRaw)
	}
}
```

**Scale Factors**:
- `ExactOneDecimal`: 10
- `ExactTwoDecimals`: 100
- `ExactThreeDecimals`: 1000
- `ExactFourDecimals`: 10000
- `ExactEightDecimals`: 100000000

## Directory Structure Transformation

### Current State (Legacy)

```
src/
├── vanilla/          # 800+ imperative functions (TO BE REMOVED)
│   ├── activation/
│   ├── array/
│   ├── logic/
│   ├── math/
│   ├── string/
│   ├── validation/
│   └── ...
├── boxed/            # Wrapper functions (TO BE REMOVED)
└── newtypes/         # NEW: Branded types (IN PROGRESS)
    ├── integer/
    ├── bigInteger/
    ├── approximateDecimal/
    ├── exactTwoDecimals/
    ├── exactOneDecimal/
    ├── exactThreeDecimals/
    ├── exactFourDecimals/
    └── constants/
```

### Desired State (Target)

```
src/
├── activation/       # NEW: Monadic activation functions
├── array/            # NEW: Monadic array functions
├── logic/            # NEW: Monadic logic functions
├── math/             # NEW: Monadic math functions
├── string/           # NEW: Monadic string functions
├── validation/       # NEW: Monadic validation functions
├── newtypes/         # Branded types
│   ├── [Numeric Types]/
│   │   ├── integer/
│   │   ├── bigInteger/
│   │   ├── approximateDecimal/
│   │   ├── exactOneDecimal/
│   │   ├── exactTwoDecimals/
│   │   ├── exactThreeDecimals/
│   │   ├── exactFourDecimals/
│   │   ├── exactEightDecimals/
│   │   └── percent/
│   ├── [String Types]/
│   │   ├── emailAddress/
│   │   ├── url/
│   │   ├── uri/
│   │   ├── iri/
│   │   ├── uuid/
│   │   ├── ipv4Address/
│   │   ├── ipv6Address/
│   │   ├── domain/
│   │   ├── hostname/
│   │   ├── isbn10/
│   │   ├── isbn13/
│   │   ├── phoneNumber/
│   │   ├── postalCode/
│   │   ├── countryCode/
│   │   ├── languageCode/
│   │   ├── currencyCode/
│   │   ├── creditCardNumber/
│   │   ├── nonEmptyString/
│   │   ├── char/
│   │   └── base58/
│   ├── [Color Types]/
│   │   ├── hexColor/
│   │   ├── oklchColor/
│   │   └── p3Color/
│   ├── [Collection Types]/
│   │   └── nonEmptyArray/
│   └── constants/
├── types/            # Type definitions
├── monads/           # Result, Maybe, Either, etc.
└── [other domains]/  # crypto, random, state, etc.
```

## Branded Type Implementation Pattern

Each branded type follows this structure:

```
newtypes/[typeName]/
├── _is[TypeName]/
│   ├── index.ts       # Private predicate
│   └── index.test.ts
├── unsafe[TypeName]/
│   ├── index.ts       # Unsafe constructor (no validation)
│   └── index.test.ts
├── unwrap[TypeName]/
│   ├── index.ts       # Extract raw value
│   └── index.test.ts
├── index.ts           # Smart constructor (validates)
├── index.test.ts
└── [arithmetic ops]/  # add, subtract, multiply, divide
    ├── index.ts
    └── index.test.ts
```

### Example: ExactTwoDecimals

```typescript
// Smart constructor (validates) - uses ok() and error() helpers
export default function exactTwoDecimals(
	value: number,
): Result<ValidationError, ExactTwoDecimals> {
	if (!Number.isFinite(value)) {
		return error({
			code: "EXACT_TWO_DECIMALS_NOT_FINITE",
			field: "value",
			messages: ["System needs a finite number for exact two decimal representation"],
			received: value,
			expected: "Finite number",
			suggestion: "Provide a finite number like 19.99 or 10.5",
			severity: "requirement",
		})
	}

	const scaled = Math.round(value * 100)
	const reconstructed = scaled / 100

	if (Math.abs(value - reconstructed) > Number.EPSILON) {
		return error({
			code: "EXACT_TWO_DECIMALS_PRECISION_EXCEEDED",
			field: "value",
			messages: ["System can only represent numbers with up to 2 decimal places"],
			received: value,
			expected: "Number with at most 2 decimal places",
			suggestion: "Round to 2 decimal places (e.g., 19.99 instead of 19.999)",
			constraints: { scale: 2 },
			severity: "requirement",
		})
	}

	return ok(unsafeExactTwoDecimals(value))
}

// Arithmetic (curried, monadic) - in separate file
export default function addExactTwoDecimals(
	augend: ExactTwoDecimals,
): (addend: ExactTwoDecimals) => Result<ValidationError, ExactTwoDecimals> {
	return function addToAugend(
		addend: ExactTwoDecimals,
	): Result<ValidationError, ExactTwoDecimals> {
		const SCALE_FACTOR = 100
		const augendRaw = unwrapExactTwoDecimals(augend)
		const addendRaw = unwrapExactTwoDecimals(addend)

		const augendScaled = Math.round(augendRaw * SCALE_FACTOR)
		const addendScaled = Math.round(addendRaw * SCALE_FACTOR)
		const resultScaled = augendScaled + addendScaled
		const resultRaw = resultScaled / SCALE_FACTOR

		return exactTwoDecimals(resultRaw)
	}
}
```

## Monadic Function Migration Pattern

### Old Vanilla Function

```typescript
// vanilla/math/add/index.ts
export default function add(a: number, b: number): number {
  return a + b
}
```

### New Monadic Function

```typescript
// math/add/index.ts
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"

//++ Adds two numbers with overflow detection
//++ Returns Result with error if result is not finite
export default function add(
	augend: number,
): (addend: number) => Result<ValidationError, number> {
	return function addToAugend(
		addend: number,
	): Result<ValidationError, number> {
		const result = augend + addend

		if (!Number.isFinite(result)) {
			return error({
				code: "ADDITION_OVERFLOW",
				field: "result",
				messages: ["System cannot represent the sum as a finite number"],
				received: { augend, addend },
				expected: "Finite number result",
				suggestion: "Use smaller numbers or BigInteger for large values",
				severity: "requirement",
			})
		}

		return ok(result)
	}
}
```

## ValidationError Structure

All errors follow this structure (defined in `types/ValidationError/index.ts`):

```typescript
interface ValidationError {
	code: string                    // Machine-readable error code
	field: string                   // Field/parameter that failed
	messages: Array<string>         // Human-readable messages (system-centric)
	received: Serializable          // What was actually provided
	expected: string                // What system needs (simple string)
	suggestion: string              // Actionable fix
	constraints?: Record<string, Serializable>  // Optional machine-readable limits
	severity: "info" | "notice" | "requirement"
	context?: Record<string, Serializable>
}
```

**Key Principles**:
- **System-centric**: "System needs..." not "You provided invalid..."
- **Actionable**: Always include suggestion for how to fix
- **Type-safe**: Use `Serializable`, never `unknown` or `any`
- **i18n ready**: Integrates with Linguist for translations

## Current Implementation Status

### ✅ Completed

**Numeric Branded Types (7 types)**:
- `Integer` - Safe integers within JavaScript's safe range
- `BigInteger` - Arbitrary precision integers
- `ApproximateDecimal` - Floating-point with explicit imprecision warning
- `ExactTwoDecimals` - Two decimal places (e.g., currency)
- `ExactOneDecimal` - One decimal place
- `ExactThreeDecimals` - Three decimal places
- `ExactFourDecimals` - Four decimal places

**Arithmetic Operations**:
- All 4 operations (add, subtract, multiply, divide) for:
  - `ExactTwoDecimals`
  - `ExactOneDecimal`
  - `ExactThreeDecimals`
  - `ExactFourDecimals`

**Test Coverage**: 384+ tests passing

### 🚧 In Progress

**Numeric Branded Types**:
- `ExactEightDecimals` - Eight decimal places (for cryptocurrencies)
- `Percent` - 0-1 range with 4 decimal precision

### ⏸️ Not Started

**String Branded Types** (~20 types):
- Network/Web: `EmailAddress`, `Url`, `Uri`, `Iri`, `IPv4Address`, `IPv6Address`, `Domain`, `Hostname`
- Identifiers: `Uuid`, `Isbn10`, `Isbn13`, `Issn`, `Doi`, `Orcid`
- Geographic: `PostalCode`, `PhoneNumber`, `CountryCode`, `LanguageCode`, `CurrencyCode`
- Financial: `CreditCardNumber`, `Iban`, `Swift`
- Temporal: `Iso8601Date`, `Iso8601DateTime`, `Rfc3339`
- Other: `Char`, `NonEmptyString`, `Base58`, `Base64`, `JsonString`

**Color Branded Types** (3 types):
- `HexColor` - #RGB or #RRGGBB format
- `OklchColor` - oklch() CSS color format
- `P3Color` - color(display-p3 ...) format

**Collection Branded Types** (1 type):
- `NonEmptyArray<T>` - Array guaranteed to have at least one element

**Monadic Function Migration**:
- 800+ functions in `vanilla/` need to be rewritten as monadic functions
- Organized by domain: activation, array, logic, math, string, validation, etc.
- Each function needs:
  - Curried signature
  - Result return type
  - Proper error handling
  - Comprehensive tests

**Legacy Removal**:
- Delete `vanilla/` folder after migration complete
- Delete `boxed/` folder (no longer needed)

## Success Criteria

1. ✅ All numeric branded types implemented (10 types) with full arithmetic
2. ✅ All string branded types implemented (~20 types)
3. ✅ All color branded types implemented (3 types)
4. ✅ All collection branded types implemented (1 type)
5. ✅ All functions return `Result<ValidationError, T>`
6. ✅ Zero exceptions thrown (all errors as values)
7. ✅ All 800+ vanilla functions migrated to monadic equivalents
8. ✅ `vanilla/` and `boxed/` folders deleted
9. ✅ Full test coverage maintained
10. ✅ Documentation updated

## Timeline Estimate

- **Numeric Branded Types Completion**: 1-2 days (2 types remaining)
- **String Branded Types**: 2-3 weeks (~20 types)
- **Color Branded Types**: 2-3 days (3 types)
- **Collection Branded Types**: 1 day (1 type)
- **Core Math Migration**: 1-2 weeks (100+ functions)
- **Full Migration**: 4-6 weeks (800+ functions)
- **Legacy Removal**: 1 day (after verification)

## Notes

- This is a **breaking change** but necessary for long-term maintainability
- All new code must follow monadic patterns
- No exceptions to the "no exceptions" rule
- Documentation must be updated as we go, not after
- One source of truth for all architectural decisions: this document
