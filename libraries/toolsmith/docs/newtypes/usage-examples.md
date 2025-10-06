# Usage Examples

This document shows how to use branded types in practice.

## Basic Type Safety

```typescript
import type { Integer, Float } from "@sitebender/toolsmith/types/branded/index.ts"

import integer from "@sitebender/toolsmith/newtypes/integer/index.ts"
import float from "@sitebender/toolsmith/newtypes/float/index.ts"

// Create values
const intResult = integer(42)
const fltResult = float(3.14)

// Type-safe function
function processInteger(n: Integer): void {
	console.log("Processing integer:", n)
}

// This works
if (intResult._tag === "Ok") {
	processInteger(intResult.value)  // ✅ OK
}

// This fails at compile time
if (fltResult._tag === "Ok") {
	processInteger(fltResult.value)  // ❌ TYPE ERROR
}
```

## Currency Calculations (Exact Arithmetic)

```typescript
import type { Currency } from "@sitebender/toolsmith/types/branded/index.ts"

import currency from "@sitebender/toolsmith/newtypes/currency/index.ts"
import addCurrency from "@sitebender/toolsmith/newtypes/currency/addCurrency/index.ts"
import multiplyCurrency from "@sitebender/toolsmith/newtypes/currency/multiplyCurrency/index.ts"
import unwrapCurrency from "@sitebender/toolsmith/newtypes/currency/unwrapCurrency/index.ts"

// Create currency values
const priceResult = currency(19.99)
const taxRateResult = currency(0.08)  // 8% as decimal

if (priceResult._tag === "Ok" && taxRateResult._tag === "Ok") {
	const price = priceResult.value
	const taxRate = taxRateResult.value

	// Calculate tax: exact arithmetic, no floating point errors!
	const tax = multiplyCurrency(price)(taxRate)

	// Calculate total
	const total = addCurrency(price)(tax)

	// Convert back to display
	console.log(`Price: $${unwrapCurrency(price).toFixed(2)}`)
	console.log(`Tax: $${unwrapCurrency(tax).toFixed(2)}`)
	console.log(`Total: $${unwrapCurrency(total).toFixed(2)}`)
	// Price: $19.99
	// Tax: $1.60
	// Total: $21.59
	// No 0.30000000000000004 errors! ✅
}
```

## Validation at Boundaries

```typescript
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"

import integer from "@sitebender/toolsmith/newtypes/integer/index.ts"

// Parse user input
function processUserInput(input: string): void {
	const parsed = parseFloat(input)
	const intResult = integer(parsed)

	if (intResult._tag === "Ok") {
		console.log("Valid integer:", intResult.value)
		processValidInteger(intResult.value)
	} else {
		console.error("Invalid integer:", intResult.error.message)
	}
}

function processValidInteger(n: Integer): void {
	// n is guaranteed to be a safe integer here
	console.log("Processing:", n)
}

processUserInput("42")        // Valid integer: 42
processUserInput("3.14")      // Invalid integer: Must be a safe integer
processUserInput("999999999999999999")  // Invalid integer: Must be a safe integer
```

## Using Match Pattern for Error Handling

```typescript
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"

import integer from "@sitebender/toolsmith/newtypes/integer/index.ts"
import matchResult from "@sitebender/toolsmith/monads/result/matchResult/index.ts"

function processInput(input: number): string {
	const result = integer(input)

	return matchResult(
		function handleSuccess(int: Integer) {
			return `Valid integer: ${int}`
		}
	)(
		function handleError(err) {
			return `Error: ${err.message}`
		}
	)(result)
}

console.log(processInput(42))    // "Valid integer: 42"
console.log(processInput(3.14))  // "Error: Must be a safe integer"
```

## Different Currency Scales

```typescript
import type { Currency, Decimal0, Decimal3 } from "@sitebender/toolsmith/types/branded/index.ts"

import currency from "@sitebender/toolsmith/newtypes/currency/index.ts"
import decimal0 from "@sitebender/toolsmith/newtypes/decimal0/index.ts"
import decimal3 from "@sitebender/toolsmith/newtypes/decimal3/index.ts"
import unwrapCurrency from "@sitebender/toolsmith/newtypes/currency/unwrapCurrency/index.ts"
import unwrapDecimal0 from "@sitebender/toolsmith/newtypes/decimal0/unwrapDecimal0/index.ts"
import unwrapDecimal3 from "@sitebender/toolsmith/newtypes/decimal3/unwrapDecimal3/index.ts"

// USD (2 decimals)
const usdResult = currency(123.45)
if (usdResult._tag === "Ok") {
	console.log("USD:", unwrapCurrency(usdResult.value))  // 123.45
}

// Japanese Yen (0 decimals)
const jpyResult = decimal0(1234)
if (jpyResult._tag === "Ok") {
	console.log("JPY:", unwrapDecimal0(jpyResult.value))  // 1234
}

// Kuwaiti Dinar (3 decimals)
const kwdResult = decimal3(1.234)
if (kwdResult._tag === "Ok") {
	console.log("KWD:", unwrapDecimal3(kwdResult.value))  // 1.234
}
```

## Scientific Calculations with Decimal4

```typescript
import type { Decimal4 } from "@sitebender/toolsmith/types/branded/index.ts"

import decimal4 from "@sitebender/toolsmith/newtypes/decimal4/index.ts"
import multiplyDecimal4 from "@sitebender/toolsmith/newtypes/decimal4/multiplyDecimal4/index.ts"
import unwrapDecimal4 from "@sitebender/toolsmith/newtypes/decimal4/unwrapDecimal4/index.ts"

// Calculate area of circle: A = πr²
const piResult = decimal4(3.1416)
const radiusResult = decimal4(5.0)

if (piResult._tag === "Ok" && radiusResult._tag === "Ok") {
	const pi = piResult.value
	const radius = radiusResult.value

	const radiusSquared = multiplyDecimal4(radius)(radius)
	const area = multiplyDecimal4(pi)(radiusSquared)

	console.log(`Area: ${unwrapDecimal4(area).toFixed(4)}`)  // Exact calculation
}
```

## Percentage Calculations

```typescript
import type { Percentage } from "@sitebender/toolsmith/types/branded/index.ts"

import percentage from "@sitebender/toolsmith/newtypes/percentage/index.ts"
import addPercentage from "@sitebender/toolsmith/newtypes/percentage/addPercentage/index.ts"
import unwrapPercentage from "@sitebender/toolsmith/newtypes/percentage/unwrapPercentage/index.ts"

// Interest rates (as decimals: 0.05 = 5%)
const rate1Result = percentage(0.0525)  // 5.25%
const rate2Result = percentage(0.0075)  // 0.75%

if (rate1Result._tag === "Ok" && rate2Result._tag === "Ok") {
	const rate1 = rate1Result.value
	const rate2 = rate2Result.value

	const total = addPercentage(rate1)(rate2)

	console.log(`Total rate: ${(unwrapPercentage(total) * 100).toFixed(2)}%`)
	// Total rate: 6.00%
}
```

## Using Unsafe Constructors (Trusted Sources)

```typescript
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"

import unsafeInteger from "@sitebender/toolsmith/newtypes/integer/unsafeInteger/index.ts"

// Reading from database (already validated on write)
async function getUserAge(userId: string): Promise<Integer> {
	const user = await db.query("SELECT age FROM users WHERE id = ?", [userId])

	// Database guarantees age is a valid integer
	// Skip validation, use unsafe constructor
	return unsafeInteger(user.age)
}

// Use the unsafe constructor sparingly!
// Only when you're 100% certain the value is valid
```

## Composing with Monads

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { Integer, Currency } from "@sitebender/toolsmith/types/branded/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import integer from "@sitebender/toolsmith/newtypes/integer/index.ts"
import currency from "@sitebender/toolsmith/newtypes/currency/index.ts"
import map from "@sitebender/toolsmith/monads/result/map/index.ts"
import flatMap from "@sitebender/toolsmith/monads/result/flatMap/index.ts"
import unwrapCurrency from "@sitebender/toolsmith/newtypes/currency/unwrapCurrency/index.ts"

// Calculate price: quantity × unit price
function calculatePrice(quantity: number) {
	return function calculatePriceWithQuantity(unitPrice: number): Result<Currency, ValidationError> {
		const qtyResult = integer(quantity)
		const priceResult = currency(unitPrice)

		// Use flatMap to compose Results
		return flatMap(
			function calculateWithValidatedQty(qty: Integer) {
				return map(
					function calculateWithValidatedPrice(price: Currency) {
						// Both are valid, calculate total
						const total = BigInt(qty) * (price as bigint)

						return total as Currency
					}
				)(priceResult)
			}
		)(qtyResult)
	}
}

const result = calculatePrice(5)(19.99)

if (result._tag === "Ok") {
	console.log(`Total: $${unwrapCurrency(result.value).toFixed(2)}`)
	// Total: $99.95
}
```

## API Request/Response Handling

```typescript
import type { Currency } from "@sitebender/toolsmith/types/branded/index.ts"

import currency from "@sitebender/toolsmith/newtypes/currency/index.ts"
import unwrapCurrency from "@sitebender/toolsmith/newtypes/currency/unwrapCurrency/index.ts"

// Parse API response
interface ApiProduct {
	id: string
	name: string
	price: number  // Raw number from API
}

interface Product {
	id: string
	name: string
	price: Currency  // Branded type for internal use
}

function parseProduct(raw: ApiProduct): Result<Product, ValidationError> {
	const priceResult = currency(raw.price)

	return map(
		function createProduct(validPrice: Currency): Product {
			return {
				id: raw.id,
				name: raw.name,
				price: validPrice,
			}
		}
	)(priceResult)
}

// Serialize for API response
function serializeProduct(product: Product): ApiProduct {
	return {
		id: product.id,
		name: product.name,
		price: unwrapCurrency(product.price),  // Convert back to number
	}
}
```

## Testing Strategy

```typescript
import { assertEquals } from "jsr:@std/assert"
import integer from "@sitebender/toolsmith/newtypes/integer/index.ts"
import unwrapInteger from "@sitebender/toolsmith/newtypes/integer/unwrapInteger/index.ts"

Deno.test("integer rejects non-integer", () => {
	const result = integer(3.14)

	assertEquals(result._tag, "Err")
})

Deno.test("integer accepts safe integer", () => {
	const result = integer(42)

	assertEquals(result._tag, "Ok")

	if (result._tag === "Ok") {
		assertEquals(unwrapInteger(result.value), 42)
	}
})

Deno.test("integer rejects unsafe integer", () => {
	const result = integer(Number.MAX_SAFE_INTEGER + 1)

	assertEquals(result._tag, "Err")
})
```

## Summary

Branded types provide:
- ✅ **Compile-time type safety** - Can't mix semantically different values
- ✅ **Exact decimal arithmetic** - No floating point errors
- ✅ **Validation at boundaries** - Smart constructors return Result
- ✅ **Zero runtime overhead** - Brands are type-level only
- ✅ **Composability** - Work seamlessly with Result/Validation monads
- ✅ **Clear intent** - Function signatures show exactly what they expect

Use smart constructors at system boundaries (user input, API responses, database reads from external sources) and unsafe constructors only when values are already validated (internal database reads, trusted computations).

**Previous**: [Implementation Order](./implementation-order.md)
**Back to**: [README](./README.md)
