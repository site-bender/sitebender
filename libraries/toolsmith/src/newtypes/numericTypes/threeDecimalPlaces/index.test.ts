import { assert, assertEquals } from "@std/assert"

import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

import threeDecimalPlaces from "./index.ts"

Deno.test("threeDecimalPlaces accepts whole number", () => {
	const result = threeDecimalPlaces(100)

	assert(isOk(result))
	assertEquals(result.value, 100)
})

Deno.test("threeDecimalPlaces accepts zero", () => {
	const result = threeDecimalPlaces(0)

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("threeDecimalPlaces accepts negative whole number", () => {
	const result = threeDecimalPlaces(-50)

	assert(isOk(result))
	assertEquals(result.value, -50)
})

Deno.test("threeDecimalPlaces accepts number with 1 decimal place", () => {
	const result = threeDecimalPlaces(10.5)

	assert(isOk(result))
	assertEquals(result.value, 10.5)
})

Deno.test("threeDecimalPlaces accepts number with 2 decimal places", () => {
	const result = threeDecimalPlaces(19.99)

	assert(isOk(result))
	assertEquals(result.value, 19.99)
})

Deno.test("threeDecimalPlaces accepts number with 3 decimal places", () => {
	const result = threeDecimalPlaces(123.456)

	assert(isOk(result))
	assertEquals(result.value, 123.456)
})

Deno.test("threeDecimalPlaces accepts negative number with 3 decimal places", () => {
	const result = threeDecimalPlaces(-99.999)

	assert(isOk(result))
	assertEquals(result.value, -99.999)
})

Deno.test("threeDecimalPlaces accepts small decimal with 3 places", () => {
	const result = threeDecimalPlaces(0.123)

	assert(isOk(result))
	assertEquals(result.value, 0.123)
})

Deno.test("threeDecimalPlaces rejects Infinity with helpful error", () => {
	const result = threeDecimalPlaces(Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "THREE_DECIMAL_PLACES_NOT_FINITE")
	assertEquals(result.error.field, "threeDecimalPlaces")
	assertEquals(result.error.received, Infinity)
	assertEquals(
		result.error.expected,
		"Finite number with at most 3 decimal places",
	)
	assert(result.error.suggestion.includes("finite"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("threeDecimalPlaces rejects -Infinity with helpful error", () => {
	const result = threeDecimalPlaces(-Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "THREE_DECIMAL_PLACES_NOT_FINITE")
	assertEquals(result.error.field, "threeDecimalPlaces")
	assertEquals(result.error.received, -Infinity)
	assertEquals(
		result.error.expected,
		"Finite number with at most 3 decimal places",
	)
})

Deno.test("threeDecimalPlaces rejects NaN with helpful error", () => {
	const result = threeDecimalPlaces(NaN)

	assert(isError(result))
	assertEquals(result.error.code, "THREE_DECIMAL_PLACES_NOT_FINITE")
	assertEquals(result.error.field, "threeDecimalPlaces")
	assert(Number.isNaN(result.error.received))
	assertEquals(
		result.error.expected,
		"Finite number with at most 3 decimal places",
	)
})

Deno.test("threeDecimalPlaces rejects 4 decimal places with helpful error", () => {
	const result = threeDecimalPlaces(1.2345)

	assert(isError(result))
	assertEquals(result.error.code, "THREE_DECIMAL_PLACES_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "threeDecimalPlaces")
	assertEquals(result.error.received, 1.2345)
	assertEquals(result.error.expected, "Number with at most 3 decimal places")
	assert(result.error.suggestion.includes("3 decimal place"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("threeDecimalPlaces rejects 5 decimal places with helpful error", () => {
	const result = threeDecimalPlaces(12.34567)

	assert(isError(result))
	assertEquals(result.error.code, "THREE_DECIMAL_PLACES_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "threeDecimalPlaces")
	assertEquals(result.error.received, 12.34567)
	assertEquals(result.error.expected, "Number with at most 3 decimal places")
})

Deno.test("threeDecimalPlaces rejects many decimal places with helpful error", () => {
	const result = threeDecimalPlaces(3.141592653589793)

	assert(isError(result))
	assertEquals(result.error.code, "THREE_DECIMAL_PLACES_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "threeDecimalPlaces")
	assertEquals(result.error.received, 3.141592653589793)
})
