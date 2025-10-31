import { assert, assertEquals } from "@std/assert"

import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import unsafeEightDecimalPlaces from "@sitebender/toolsmith/newtypes/numericTypes/eightDecimalPlaces/unsafeEightDecimalPlaces/index.ts"

import divideEightDecimalPlaces from "./index.ts"

Deno.test("divideEightDecimalPlaces divides two positive numbers", () => {
	const a = unsafeEightDecimalPlaces(1)
	const b = unsafeEightDecimalPlaces(2)
	const result = divideEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.5)
})

Deno.test("divideEightDecimalPlaces divides satoshis", () => {
	const a = unsafeEightDecimalPlaces(0.00000010)
	const b = unsafeEightDecimalPlaces(10)
	const result = divideEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.00000001)
})

Deno.test("divideEightDecimalPlaces divides by one", () => {
	const a = unsafeEightDecimalPlaces(0.12345678)
	const b = unsafeEightDecimalPlaces(1)
	const result = divideEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.12345678)
})

Deno.test("divideEightDecimalPlaces divides negative by positive", () => {
	const a = unsafeEightDecimalPlaces(-1)
	const b = unsafeEightDecimalPlaces(2)
	const result = divideEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, -0.5)
})

Deno.test("divideEightDecimalPlaces divides positive by negative", () => {
	const a = unsafeEightDecimalPlaces(1)
	const b = unsafeEightDecimalPlaces(-2)
	const result = divideEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, -0.5)
})

Deno.test("divideEightDecimalPlaces divides two negative numbers", () => {
	const a = unsafeEightDecimalPlaces(-1)
	const b = unsafeEightDecimalPlaces(-2)
	const result = divideEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0.5)
})

Deno.test("divideEightDecimalPlaces divides integers", () => {
	const a = unsafeEightDecimalPlaces(100)
	const b = unsafeEightDecimalPlaces(10)
	const result = divideEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 10)
})

Deno.test("divideEightDecimalPlaces divides zero by non-zero", () => {
	const a = unsafeEightDecimalPlaces(0)
	const b = unsafeEightDecimalPlaces(5)
	const result = divideEightDecimalPlaces(a)(b)

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("divideEightDecimalPlaces rejects division by zero with helpful error", () => {
	const a = unsafeEightDecimalPlaces(0.12345678)
	const b = unsafeEightDecimalPlaces(0)
	const result = divideEightDecimalPlaces(a)(b)

	assert(isError(result))
	assertEquals(result.error.code, "EIGHT_DECIMAL_PLACES_DIVISION_BY_ZERO")
	assertEquals(result.error.field, "divisor")
	assertEquals(result.error.received, 0)
	assertEquals(result.error.expected, "Non-zero EightDecimalPlaces value")
	assert(result.error.suggestion.includes("non-zero"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("divideEightDecimalPlaces curried application works", () => {
	const half = divideEightDecimalPlaces(unsafeEightDecimalPlaces(1))
	const result = half(unsafeEightDecimalPlaces(2))

	assert(isOk(result))
	assertEquals(result.value, 0.5)
})
