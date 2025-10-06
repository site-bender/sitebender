import { assert, assertEquals } from "@std/assert"

import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

import exactTwoDecimals from "./index.ts"

Deno.test("exactTwoDecimals accepts valid number with 2 decimal places", () => {
	const result = exactTwoDecimals(19.99)

	assert(isOk(result))
	assertEquals(result.value, 19.99)
})

Deno.test("exactTwoDecimals accepts number with 1 decimal place", () => {
	const result = exactTwoDecimals(10.5)

	assert(isOk(result))
	assertEquals(result.value, 10.5)
})

Deno.test("exactTwoDecimals accepts whole numbers", () => {
	const result = exactTwoDecimals(100)

	assert(isOk(result))
	assertEquals(result.value, 100)
})

Deno.test("exactTwoDecimals accepts zero", () => {
	const result = exactTwoDecimals(0)

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("exactTwoDecimals accepts negative numbers", () => {
	const result = exactTwoDecimals(-50.25)

	assert(isOk(result))
	assertEquals(result.value, -50.25)
})

Deno.test("exactTwoDecimals accepts small amounts", () => {
	const result = exactTwoDecimals(0.01)

	assert(isOk(result))
	assertEquals(result.value, 0.01)
})

Deno.test("exactTwoDecimals rejects Infinity with helpful error", () => {
	const result = exactTwoDecimals(Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "EXACT_TWO_DECIMALS_NOT_FINITE")
	assertEquals(result.error.field, "exactTwoDecimals")
	assertEquals(result.error.received, Infinity)
	assertEquals(result.error.expected, "Finite number with at most 2 decimal places")
	assert(result.error.suggestion.includes("finite"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("exactTwoDecimals rejects -Infinity with helpful error", () => {
	const result = exactTwoDecimals(-Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "EXACT_TWO_DECIMALS_NOT_FINITE")
	assertEquals(result.error.field, "exactTwoDecimals")
	assertEquals(result.error.received, -Infinity)
	assertEquals(result.error.expected, "Finite number with at most 2 decimal places")
})

Deno.test("exactTwoDecimals rejects NaN with helpful error", () => {
	const result = exactTwoDecimals(NaN)

	assert(isError(result))
	assertEquals(result.error.code, "EXACT_TWO_DECIMALS_NOT_FINITE")
	assertEquals(result.error.field, "exactTwoDecimals")
	assert(Number.isNaN(result.error.received))
	assertEquals(result.error.expected, "Finite number with at most 2 decimal places")
})

Deno.test("exactTwoDecimals rejects 3 decimal places with helpful error", () => {
	const result = exactTwoDecimals(19.999)

	assert(isError(result))
	assertEquals(result.error.code, "EXACT_TWO_DECIMALS_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "exactTwoDecimals")
	assertEquals(result.error.received, 19.999)
	assertEquals(result.error.expected, "Number with at most 2 decimal places")
	assert(result.error.suggestion.includes("2 decimal places"))
	assert(result.error.suggestion.toLowerCase().includes("exactthreedecimals"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("exactTwoDecimals rejects 4 decimal places with helpful error", () => {
	const result = exactTwoDecimals(10.1234)

	assert(isError(result))
	assertEquals(result.error.code, "EXACT_TWO_DECIMALS_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "exactTwoDecimals")
	assertEquals(result.error.received, 10.1234)
	assertEquals(result.error.expected, "Number with at most 2 decimal places")
})

Deno.test("exactTwoDecimals rejects many decimal places with helpful error", () => {
	const result = exactTwoDecimals(3.141592653589793)

	assert(isError(result))
	assertEquals(result.error.code, "EXACT_TWO_DECIMALS_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "exactTwoDecimals")
	assertEquals(result.error.received, 3.141592653589793)
})
