import { assert, assertEquals } from "@std/assert"

import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

import fourDecimalPlaces from "./index.ts"

Deno.test("fourDecimalPlaces accepts valid number with 4 decimal places", () => {
	const result = fourDecimalPlaces(19.9999)

	assert(isOk(result))
	assertEquals(result.value, 19.9999)
})

Deno.test("fourDecimalPlaces accepts number with 3 decimal places", () => {
	const result = fourDecimalPlaces(10.543)

	assert(isOk(result))
	assertEquals(result.value, 10.543)
})

Deno.test("fourDecimalPlaces accepts number with 2 decimal places", () => {
	const result = fourDecimalPlaces(10.54)

	assert(isOk(result))
	assertEquals(result.value, 10.54)
})

Deno.test("fourDecimalPlaces accepts number with 1 decimal place", () => {
	const result = fourDecimalPlaces(10.5)

	assert(isOk(result))
	assertEquals(result.value, 10.5)
})

Deno.test("fourDecimalPlaces accepts whole numbers", () => {
	const result = fourDecimalPlaces(100)

	assert(isOk(result))
	assertEquals(result.value, 100)
})

Deno.test("fourDecimalPlaces accepts zero", () => {
	const result = fourDecimalPlaces(0)

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("fourDecimalPlaces accepts negative numbers", () => {
	const result = fourDecimalPlaces(-50.2525)

	assert(isOk(result))
	assertEquals(result.value, -50.2525)
})

Deno.test("fourDecimalPlaces accepts small amounts", () => {
	const result = fourDecimalPlaces(0.0001)

	assert(isOk(result))
	assertEquals(result.value, 0.0001)
})

Deno.test("fourDecimalPlaces rejects Infinity with helpful error", () => {
	const result = fourDecimalPlaces(Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "FOUR_DECIMAL_PLACES_NOT_FINITE")
	assertEquals(result.error.field, "fourDecimalPlaces")
	assertEquals(result.error.received, Infinity)
	assertEquals(result.error.expected, "Finite number with at most 4 decimal places")
	assert(result.error.suggestion.includes("finite"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("fourDecimalPlaces rejects -Infinity with helpful error", () => {
	const result = fourDecimalPlaces(-Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "FOUR_DECIMAL_PLACES_NOT_FINITE")
	assertEquals(result.error.field, "fourDecimalPlaces")
	assertEquals(result.error.received, -Infinity)
	assertEquals(result.error.expected, "Finite number with at most 4 decimal places")
})

Deno.test("fourDecimalPlaces rejects NaN with helpful error", () => {
	const result = fourDecimalPlaces(NaN)

	assert(isError(result))
	assertEquals(result.error.code, "FOUR_DECIMAL_PLACES_NOT_FINITE")
	assertEquals(result.error.field, "fourDecimalPlaces")
	assert(Number.isNaN(result.error.received))
	assertEquals(result.error.expected, "Finite number with at most 4 decimal places")
})

Deno.test("fourDecimalPlaces rejects 5 decimal places with helpful error", () => {
	const result = fourDecimalPlaces(19.99999)

	assert(isError(result))
	assertEquals(result.error.code, "FOUR_DECIMAL_PLACES_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "fourDecimalPlaces")
	assertEquals(result.error.received, 19.99999)
	assertEquals(result.error.expected, "Number with at most 4 decimal places")
	assert(result.error.suggestion.includes("4 decimal places"))
	assert(result.error.suggestion.toLowerCase().includes("exacteightdecimals"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("fourDecimalPlaces rejects 6 decimal places with helpful error", () => {
	const result = fourDecimalPlaces(10.123456)

	assert(isError(result))
	assertEquals(result.error.code, "FOUR_DECIMAL_PLACES_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "fourDecimalPlaces")
	assertEquals(result.error.received, 10.123456)
	assertEquals(result.error.expected, "Number with at most 4 decimal places")
})

Deno.test("fourDecimalPlaces rejects many decimal places with helpful error", () => {
	const result = fourDecimalPlaces(3.141592653589793)

	assert(isError(result))
	assertEquals(result.error.code, "FOUR_DECIMAL_PLACES_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "fourDecimalPlaces")
	assertEquals(result.error.received, 3.141592653589793)
})
