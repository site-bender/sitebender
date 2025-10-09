import { assert, assertEquals } from "@std/assert"

import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

import oneDecimalPlace from "./index.ts"

Deno.test("oneDecimalPlace accepts whole number", () => {
	const result = oneDecimalPlace(100)

	assert(isOk(result))
	assertEquals(result.value, 100)
})

Deno.test("oneDecimalPlace accepts zero", () => {
	const result = oneDecimalPlace(0)

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("oneDecimalPlace accepts negative whole number", () => {
	const result = oneDecimalPlace(-50)

	assert(isOk(result))
	assertEquals(result.value, -50)
})

Deno.test("oneDecimalPlace accepts number with 1 decimal place", () => {
	const result = oneDecimalPlace(10.5)

	assert(isOk(result))
	assertEquals(result.value, 10.5)
})

Deno.test("oneDecimalPlace accepts negative number with 1 decimal place", () => {
	const result = oneDecimalPlace(-19.9)

	assert(isOk(result))
	assertEquals(result.value, -19.9)
})

Deno.test("oneDecimalPlace accepts small decimal with 1 place", () => {
	const result = oneDecimalPlace(0.1)

	assert(isOk(result))
	assertEquals(result.value, 0.1)
})

Deno.test("oneDecimalPlace rejects Infinity with helpful error", () => {
	const result = oneDecimalPlace(Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "ONE_DECIMAL_PLACE_NOT_FINITE")
	assertEquals(result.error.field, "oneDecimalPlace")
	assertEquals(result.error.received, Infinity)
	assertEquals(
		result.error.expected,
		"Finite number with at most 1 decimal place",
	)
	assert(result.error.suggestion.includes("finite"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("oneDecimalPlace rejects -Infinity with helpful error", () => {
	const result = oneDecimalPlace(-Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "ONE_DECIMAL_PLACE_NOT_FINITE")
	assertEquals(result.error.field, "oneDecimalPlace")
	assertEquals(result.error.received, -Infinity)
	assertEquals(
		result.error.expected,
		"Finite number with at most 1 decimal place",
	)
})

Deno.test("oneDecimalPlace rejects NaN with helpful error", () => {
	const result = oneDecimalPlace(NaN)

	assert(isError(result))
	assertEquals(result.error.code, "ONE_DECIMAL_PLACE_NOT_FINITE")
	assertEquals(result.error.field, "oneDecimalPlace")
	assert(Number.isNaN(result.error.received))
	assertEquals(
		result.error.expected,
		"Finite number with at most 1 decimal place",
	)
})

Deno.test("oneDecimalPlace rejects 2 decimal places with helpful error", () => {
	const result = oneDecimalPlace(19.99)

	assert(isError(result))
	assertEquals(result.error.code, "ONE_DECIMAL_PLACE_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "oneDecimalPlace")
	assertEquals(result.error.received, 19.99)
	assertEquals(result.error.expected, "Number with at most 1 decimal place")
	assert(result.error.suggestion.includes("1 decimal place"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("oneDecimalPlace rejects 3 decimal places with helpful error", () => {
	const result = oneDecimalPlace(123.456)

	assert(isError(result))
	assertEquals(result.error.code, "ONE_DECIMAL_PLACE_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "oneDecimalPlace")
	assertEquals(result.error.received, 123.456)
	assertEquals(result.error.expected, "Number with at most 1 decimal place")
})

Deno.test("oneDecimalPlace rejects many decimal places with helpful error", () => {
	const result = oneDecimalPlace(3.141592653589793)

	assert(isError(result))
	assertEquals(result.error.code, "ONE_DECIMAL_PLACE_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "oneDecimalPlace")
	assertEquals(result.error.received, 3.141592653589793)
})
