import { assert, assertEquals } from "@std/assert"

import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

import exactThreeDecimals from "./index.ts"

Deno.test("exactThreeDecimals accepts whole number", () => {
	const result = exactThreeDecimals(100)

	assert(isOk(result))
	assertEquals(result.value, 100)
})

Deno.test("exactThreeDecimals accepts zero", () => {
	const result = exactThreeDecimals(0)

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("exactThreeDecimals accepts negative whole number", () => {
	const result = exactThreeDecimals(-50)

	assert(isOk(result))
	assertEquals(result.value, -50)
})

Deno.test("exactThreeDecimals accepts number with 1 decimal place", () => {
	const result = exactThreeDecimals(10.5)

	assert(isOk(result))
	assertEquals(result.value, 10.5)
})

Deno.test("exactThreeDecimals accepts number with 2 decimal places", () => {
	const result = exactThreeDecimals(19.99)

	assert(isOk(result))
	assertEquals(result.value, 19.99)
})

Deno.test("exactThreeDecimals accepts number with 3 decimal places", () => {
	const result = exactThreeDecimals(123.456)

	assert(isOk(result))
	assertEquals(result.value, 123.456)
})

Deno.test("exactThreeDecimals accepts negative number with 3 decimal places", () => {
	const result = exactThreeDecimals(-99.999)

	assert(isOk(result))
	assertEquals(result.value, -99.999)
})

Deno.test("exactThreeDecimals accepts small decimal with 3 places", () => {
	const result = exactThreeDecimals(0.123)

	assert(isOk(result))
	assertEquals(result.value, 0.123)
})

Deno.test("exactThreeDecimals rejects Infinity with helpful error", () => {
	const result = exactThreeDecimals(Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "EXACT_THREE_DECIMALS_NOT_FINITE")
	assertEquals(result.error.field, "exactThreeDecimals")
	assertEquals(result.error.received, Infinity)
	assertEquals(result.error.expected, "Finite number with at most 3 decimal places")
	assert(result.error.suggestion.includes("finite"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("exactThreeDecimals rejects -Infinity with helpful error", () => {
	const result = exactThreeDecimals(-Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "EXACT_THREE_DECIMALS_NOT_FINITE")
	assertEquals(result.error.field, "exactThreeDecimals")
	assertEquals(result.error.received, -Infinity)
	assertEquals(result.error.expected, "Finite number with at most 3 decimal places")
})

Deno.test("exactThreeDecimals rejects NaN with helpful error", () => {
	const result = exactThreeDecimals(NaN)

	assert(isError(result))
	assertEquals(result.error.code, "EXACT_THREE_DECIMALS_NOT_FINITE")
	assertEquals(result.error.field, "exactThreeDecimals")
	assert(Number.isNaN(result.error.received))
	assertEquals(result.error.expected, "Finite number with at most 3 decimal places")
})

Deno.test("exactThreeDecimals rejects 4 decimal places with helpful error", () => {
	const result = exactThreeDecimals(1.2345)

	assert(isError(result))
	assertEquals(result.error.code, "EXACT_THREE_DECIMALS_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "exactThreeDecimals")
	assertEquals(result.error.received, 1.2345)
	assertEquals(result.error.expected, "Number with at most 3 decimal places")
	assert(result.error.suggestion.includes("3 decimal place"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("exactThreeDecimals rejects 5 decimal places with helpful error", () => {
	const result = exactThreeDecimals(12.34567)

	assert(isError(result))
	assertEquals(result.error.code, "EXACT_THREE_DECIMALS_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "exactThreeDecimals")
	assertEquals(result.error.received, 12.34567)
	assertEquals(result.error.expected, "Number with at most 3 decimal places")
})

Deno.test("exactThreeDecimals rejects many decimal places with helpful error", () => {
	const result = exactThreeDecimals(3.141592653589793)

	assert(isError(result))
	assertEquals(result.error.code, "EXACT_THREE_DECIMALS_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "exactThreeDecimals")
	assertEquals(result.error.received, 3.141592653589793)
})
