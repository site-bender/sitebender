import { assert, assertEquals } from "@std/assert"

import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

import exactFourDecimals from "./index.ts"

Deno.test("exactFourDecimals accepts valid number with 4 decimal places", () => {
	const result = exactFourDecimals(19.9999)

	assert(isOk(result))
	assertEquals(result.value, 19.9999)
})

Deno.test("exactFourDecimals accepts number with 3 decimal places", () => {
	const result = exactFourDecimals(10.543)

	assert(isOk(result))
	assertEquals(result.value, 10.543)
})

Deno.test("exactFourDecimals accepts number with 2 decimal places", () => {
	const result = exactFourDecimals(10.54)

	assert(isOk(result))
	assertEquals(result.value, 10.54)
})

Deno.test("exactFourDecimals accepts number with 1 decimal place", () => {
	const result = exactFourDecimals(10.5)

	assert(isOk(result))
	assertEquals(result.value, 10.5)
})

Deno.test("exactFourDecimals accepts whole numbers", () => {
	const result = exactFourDecimals(100)

	assert(isOk(result))
	assertEquals(result.value, 100)
})

Deno.test("exactFourDecimals accepts zero", () => {
	const result = exactFourDecimals(0)

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("exactFourDecimals accepts negative numbers", () => {
	const result = exactFourDecimals(-50.2525)

	assert(isOk(result))
	assertEquals(result.value, -50.2525)
})

Deno.test("exactFourDecimals accepts small amounts", () => {
	const result = exactFourDecimals(0.0001)

	assert(isOk(result))
	assertEquals(result.value, 0.0001)
})

Deno.test("exactFourDecimals rejects Infinity with helpful error", () => {
	const result = exactFourDecimals(Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "EXACT_FOUR_DECIMALS_NOT_FINITE")
	assertEquals(result.error.field, "exactFourDecimals")
	assertEquals(result.error.received, Infinity)
	assertEquals(result.error.expected, "Finite number with at most 4 decimal places")
	assert(result.error.suggestion.includes("finite"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("exactFourDecimals rejects -Infinity with helpful error", () => {
	const result = exactFourDecimals(-Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "EXACT_FOUR_DECIMALS_NOT_FINITE")
	assertEquals(result.error.field, "exactFourDecimals")
	assertEquals(result.error.received, -Infinity)
	assertEquals(result.error.expected, "Finite number with at most 4 decimal places")
})

Deno.test("exactFourDecimals rejects NaN with helpful error", () => {
	const result = exactFourDecimals(NaN)

	assert(isError(result))
	assertEquals(result.error.code, "EXACT_FOUR_DECIMALS_NOT_FINITE")
	assertEquals(result.error.field, "exactFourDecimals")
	assert(Number.isNaN(result.error.received))
	assertEquals(result.error.expected, "Finite number with at most 4 decimal places")
})

Deno.test("exactFourDecimals rejects 5 decimal places with helpful error", () => {
	const result = exactFourDecimals(19.99999)

	assert(isError(result))
	assertEquals(result.error.code, "EXACT_FOUR_DECIMALS_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "exactFourDecimals")
	assertEquals(result.error.received, 19.99999)
	assertEquals(result.error.expected, "Number with at most 4 decimal places")
	assert(result.error.suggestion.includes("4 decimal places"))
	assert(result.error.suggestion.toLowerCase().includes("exacteightdecimals"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("exactFourDecimals rejects 6 decimal places with helpful error", () => {
	const result = exactFourDecimals(10.123456)

	assert(isError(result))
	assertEquals(result.error.code, "EXACT_FOUR_DECIMALS_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "exactFourDecimals")
	assertEquals(result.error.received, 10.123456)
	assertEquals(result.error.expected, "Number with at most 4 decimal places")
})

Deno.test("exactFourDecimals rejects many decimal places with helpful error", () => {
	const result = exactFourDecimals(3.141592653589793)

	assert(isError(result))
	assertEquals(result.error.code, "EXACT_FOUR_DECIMALS_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "exactFourDecimals")
	assertEquals(result.error.received, 3.141592653589793)
})
