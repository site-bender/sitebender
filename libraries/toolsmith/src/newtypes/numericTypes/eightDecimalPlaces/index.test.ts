import { assert, assertEquals } from "@std/assert"

import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

import eightDecimalPlaces from "./index.ts"

Deno.test("eightDecimalPlaces accepts zero", () => {
	const result = eightDecimalPlaces(0)

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("eightDecimalPlaces accepts integers", () => {
	const result = eightDecimalPlaces(100)

	assert(isOk(result))
	assertEquals(result.value, 100)
})

Deno.test("eightDecimalPlaces accepts negative numbers", () => {
	const result = eightDecimalPlaces(-42.5)

	assert(isOk(result))
	assertEquals(result.value, -42.5)
})

Deno.test("eightDecimalPlaces accepts 1 decimal place", () => {
	const result = eightDecimalPlaces(1.5)

	assert(isOk(result))
	assertEquals(result.value, 1.5)
})

Deno.test("eightDecimalPlaces accepts 2 decimal places", () => {
	const result = eightDecimalPlaces(19.99)

	assert(isOk(result))
	assertEquals(result.value, 19.99)
})

Deno.test("eightDecimalPlaces accepts 4 decimal places", () => {
	const result = eightDecimalPlaces(1.2345)

	assert(isOk(result))
	assertEquals(result.value, 1.2345)
})

Deno.test("eightDecimalPlaces accepts exactly 8 decimal places", () => {
	const result = eightDecimalPlaces(0.12345678)

	assert(isOk(result))
	assertEquals(result.value, 0.12345678)
})

Deno.test("eightDecimalPlaces accepts 1 satoshi (0.00000001 BTC)", () => {
	const result = eightDecimalPlaces(0.00000001)

	assert(isOk(result))
	assertEquals(result.value, 0.00000001)
})

Deno.test("eightDecimalPlaces accepts max Bitcoin supply", () => {
	const result = eightDecimalPlaces(21000000)

	assert(isOk(result))
	assertEquals(result.value, 21000000)
})

Deno.test("eightDecimalPlaces accepts typical cryptocurrency amount", () => {
	const result = eightDecimalPlaces(0.12345678)

	assert(isOk(result))
	assertEquals(result.value, 0.12345678)
})

Deno.test("eightDecimalPlaces accepts 100 satoshis", () => {
	const result = eightDecimalPlaces(0.00000100)

	assert(isOk(result))
	assertEquals(result.value, 0.000001)
})

Deno.test("eightDecimalPlaces rejects 9 decimal places with helpful error", () => {
	const result = eightDecimalPlaces(0.123456789)

	assert(isError(result))
	assertEquals(result.error.code, "EIGHT_DECIMAL_PLACES_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "eightDecimalPlaces")
	assertEquals(result.error.received, 0.123456789)
	assertEquals(result.error.expected, "Number with at most 8 decimal places")
	assert(result.error.suggestion.includes("8 decimal places"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("eightDecimalPlaces rejects 10 decimal places with helpful error", () => {
	const result = eightDecimalPlaces(0.1234567890)

	assert(isError(result))
	assertEquals(result.error.code, "EIGHT_DECIMAL_PLACES_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "eightDecimalPlaces")
})

Deno.test("eightDecimalPlaces rejects Infinity with helpful error", () => {
	const result = eightDecimalPlaces(Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "EIGHT_DECIMAL_PLACES_NOT_FINITE")
	assertEquals(result.error.field, "eightDecimalPlaces")
	assertEquals(result.error.received, Infinity)
	assertEquals(
		result.error.expected,
		"Finite number with at most 8 decimal places",
	)
	assert(result.error.suggestion.includes("finite"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("eightDecimalPlaces rejects -Infinity with helpful error", () => {
	const result = eightDecimalPlaces(-Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "EIGHT_DECIMAL_PLACES_NOT_FINITE")
	assertEquals(result.error.field, "eightDecimalPlaces")
})

Deno.test("eightDecimalPlaces rejects NaN with helpful error", () => {
	const result = eightDecimalPlaces(NaN)

	assert(isError(result))
	assertEquals(result.error.code, "EIGHT_DECIMAL_PLACES_NOT_FINITE")
	assertEquals(result.error.field, "eightDecimalPlaces")
	assert(Number.isNaN(result.error.received))
	assertEquals(
		result.error.expected,
		"Finite number with at most 8 decimal places",
	)
})
