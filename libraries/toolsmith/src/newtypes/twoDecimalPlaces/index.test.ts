import { assert, assertEquals } from "@std/assert"

import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

import twoDecimalPlaces from "./index.ts"

Deno.test("twoDecimalPlaces accepts valid number with 2 decimal places", () => {
	const result = twoDecimalPlaces(19.99)

	assert(isOk(result))
	assertEquals(result.value, 19.99)
})

Deno.test("twoDecimalPlaces accepts number with 1 decimal place", () => {
	const result = twoDecimalPlaces(10.5)

	assert(isOk(result))
	assertEquals(result.value, 10.5)
})

Deno.test("twoDecimalPlaces accepts whole numbers", () => {
	const result = twoDecimalPlaces(100)

	assert(isOk(result))
	assertEquals(result.value, 100)
})

Deno.test("twoDecimalPlaces accepts zero", () => {
	const result = twoDecimalPlaces(0)

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("twoDecimalPlaces accepts negative numbers", () => {
	const result = twoDecimalPlaces(-50.25)

	assert(isOk(result))
	assertEquals(result.value, -50.25)
})

Deno.test("twoDecimalPlaces accepts small amounts", () => {
	const result = twoDecimalPlaces(0.01)

	assert(isOk(result))
	assertEquals(result.value, 0.01)
})

Deno.test("twoDecimalPlaces rejects Infinity with helpful error", () => {
	const result = twoDecimalPlaces(Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "TWO_DECIMAL_PLACES_NOT_FINITE")
	assertEquals(result.error.field, "twoDecimalPlaces")
	assertEquals(result.error.received, Infinity)
	assertEquals(result.error.expected, "Finite number with at most 2 decimal places")
	assert(result.error.suggestion.includes("finite"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("twoDecimalPlaces rejects -Infinity with helpful error", () => {
	const result = twoDecimalPlaces(-Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "TWO_DECIMAL_PLACES_NOT_FINITE")
	assertEquals(result.error.field, "twoDecimalPlaces")
	assertEquals(result.error.received, -Infinity)
	assertEquals(result.error.expected, "Finite number with at most 2 decimal places")
})

Deno.test("twoDecimalPlaces rejects NaN with helpful error", () => {
	const result = twoDecimalPlaces(NaN)

	assert(isError(result))
	assertEquals(result.error.code, "TWO_DECIMAL_PLACES_NOT_FINITE")
	assertEquals(result.error.field, "twoDecimalPlaces")
	assert(Number.isNaN(result.error.received))
	assertEquals(result.error.expected, "Finite number with at most 2 decimal places")
})

Deno.test("twoDecimalPlaces rejects 3 decimal places with helpful error", () => {
	const result = twoDecimalPlaces(19.999)

	assert(isError(result))
	assertEquals(result.error.code, "TWO_DECIMAL_PLACES_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "twoDecimalPlaces")
	assertEquals(result.error.received, 19.999)
	assertEquals(result.error.expected, "Number with at most 2 decimal places")
	assert(result.error.suggestion.includes("2 decimal places"))
	assert(result.error.suggestion.toLowerCase().includes("threedecimalplaces"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("twoDecimalPlaces rejects 4 decimal places with helpful error", () => {
	const result = twoDecimalPlaces(10.1234)

	assert(isError(result))
	assertEquals(result.error.code, "TWO_DECIMAL_PLACES_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "twoDecimalPlaces")
	assertEquals(result.error.received, 10.1234)
	assertEquals(result.error.expected, "Number with at most 2 decimal places")
})

Deno.test("twoDecimalPlaces rejects many decimal places with helpful error", () => {
	const result = twoDecimalPlaces(3.141592653589793)

	assert(isError(result))
	assertEquals(result.error.code, "TWO_DECIMAL_PLACES_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "twoDecimalPlaces")
	assertEquals(result.error.received, 3.141592653589793)
})
