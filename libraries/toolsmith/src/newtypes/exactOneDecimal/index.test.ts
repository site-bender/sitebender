import { assert, assertEquals } from "@std/assert"

import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

import exactOneDecimal from "./index.ts"

Deno.test("exactOneDecimal accepts whole number", () => {
	const result = exactOneDecimal(100)

	assert(isOk(result))
	assertEquals(result.value, 100)
})

Deno.test("exactOneDecimal accepts zero", () => {
	const result = exactOneDecimal(0)

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("exactOneDecimal accepts negative whole number", () => {
	const result = exactOneDecimal(-50)

	assert(isOk(result))
	assertEquals(result.value, -50)
})

Deno.test("exactOneDecimal accepts number with 1 decimal place", () => {
	const result = exactOneDecimal(10.5)

	assert(isOk(result))
	assertEquals(result.value, 10.5)
})

Deno.test("exactOneDecimal accepts negative number with 1 decimal place", () => {
	const result = exactOneDecimal(-19.9)

	assert(isOk(result))
	assertEquals(result.value, -19.9)
})

Deno.test("exactOneDecimal accepts small decimal with 1 place", () => {
	const result = exactOneDecimal(0.1)

	assert(isOk(result))
	assertEquals(result.value, 0.1)
})

Deno.test("exactOneDecimal rejects Infinity with helpful error", () => {
	const result = exactOneDecimal(Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "EXACT_ONE_DECIMAL_NOT_FINITE")
	assertEquals(result.error.field, "exactOneDecimal")
	assertEquals(result.error.received, Infinity)
	assertEquals(result.error.expected, "Finite number with at most 1 decimal place")
	assert(result.error.suggestion.includes("finite"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("exactOneDecimal rejects -Infinity with helpful error", () => {
	const result = exactOneDecimal(-Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "EXACT_ONE_DECIMAL_NOT_FINITE")
	assertEquals(result.error.field, "exactOneDecimal")
	assertEquals(result.error.received, -Infinity)
	assertEquals(result.error.expected, "Finite number with at most 1 decimal place")
})

Deno.test("exactOneDecimal rejects NaN with helpful error", () => {
	const result = exactOneDecimal(NaN)

	assert(isError(result))
	assertEquals(result.error.code, "EXACT_ONE_DECIMAL_NOT_FINITE")
	assertEquals(result.error.field, "exactOneDecimal")
	assert(Number.isNaN(result.error.received))
	assertEquals(result.error.expected, "Finite number with at most 1 decimal place")
})

Deno.test("exactOneDecimal rejects 2 decimal places with helpful error", () => {
	const result = exactOneDecimal(19.99)

	assert(isError(result))
	assertEquals(result.error.code, "EXACT_ONE_DECIMAL_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "exactOneDecimal")
	assertEquals(result.error.received, 19.99)
	assertEquals(result.error.expected, "Number with at most 1 decimal place")
	assert(result.error.suggestion.includes("1 decimal place"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("exactOneDecimal rejects 3 decimal places with helpful error", () => {
	const result = exactOneDecimal(123.456)

	assert(isError(result))
	assertEquals(result.error.code, "EXACT_ONE_DECIMAL_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "exactOneDecimal")
	assertEquals(result.error.received, 123.456)
	assertEquals(result.error.expected, "Number with at most 1 decimal place")
})

Deno.test("exactOneDecimal rejects many decimal places with helpful error", () => {
	const result = exactOneDecimal(3.141592653589793)

	assert(isError(result))
	assertEquals(result.error.code, "EXACT_ONE_DECIMAL_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "exactOneDecimal")
	assertEquals(result.error.received, 3.141592653589793)
})
