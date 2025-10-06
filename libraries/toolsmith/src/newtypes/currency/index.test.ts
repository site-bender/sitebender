import { assert, assertEquals } from "@std/assert"

import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

import currency from "./index.ts"

Deno.test("currency accepts valid amount with 2 decimal places", () => {
	const result = currency(19.99)

	assert(isOk(result))
	assertEquals(result.value, 19.99)
})

Deno.test("currency accepts valid amount with 1 decimal place", () => {
	const result = currency(10.5)

	assert(isOk(result))
	assertEquals(result.value, 10.5)
})

Deno.test("currency accepts whole number amounts", () => {
	const result = currency(100)

	assert(isOk(result))
	assertEquals(result.value, 100)
})

Deno.test("currency accepts zero", () => {
	const result = currency(0)

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("currency accepts negative amounts", () => {
	const result = currency(-50.25)

	assert(isOk(result))
	assertEquals(result.value, -50.25)
})

Deno.test("currency accepts small amounts", () => {
	const result = currency(0.01)

	assert(isOk(result))
	assertEquals(result.value, 0.01)
})

Deno.test("currency rejects Infinity with helpful error", () => {
	const result = currency(Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "CURRENCY_NOT_FINITE")
	assertEquals(result.error.field, "currency")
	assertEquals(result.error.received, Infinity)
	assertEquals(result.error.expected, "Finite currency amount")
	assert(result.error.suggestion.includes("finite"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("currency rejects -Infinity with helpful error", () => {
	const result = currency(-Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "CURRENCY_NOT_FINITE")
	assertEquals(result.error.field, "currency")
	assertEquals(result.error.received, -Infinity)
	assertEquals(result.error.expected, "Finite currency amount")
})

Deno.test("currency rejects NaN with helpful error", () => {
	const result = currency(NaN)

	assert(isError(result))
	assertEquals(result.error.code, "CURRENCY_NOT_FINITE")
	assertEquals(result.error.field, "currency")
	assert(Number.isNaN(result.error.received))
	assertEquals(result.error.expected, "Finite currency amount")
})

Deno.test("currency rejects 3 decimal places with helpful error", () => {
	const result = currency(19.999)

	assert(isError(result))
	assertEquals(result.error.code, "CURRENCY_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "currency")
	assertEquals(result.error.received, 19.999)
	assertEquals(result.error.expected, "Currency amount with at most 2 decimal places")
	assert(result.error.suggestion.includes("2 decimal places"))
	assert(result.error.suggestion.toLowerCase().includes("decimal3"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("currency rejects 4 decimal places with helpful error", () => {
	const result = currency(10.1234)

	assert(isError(result))
	assertEquals(result.error.code, "CURRENCY_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "currency")
	assertEquals(result.error.received, 10.1234)
	assertEquals(result.error.expected, "Currency amount with at most 2 decimal places")
})

Deno.test("currency rejects many decimal places with helpful error", () => {
	const result = currency(3.141592653589793)

	assert(isError(result))
	assertEquals(result.error.code, "CURRENCY_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "currency")
	assertEquals(result.error.received, 3.141592653589793)
})
