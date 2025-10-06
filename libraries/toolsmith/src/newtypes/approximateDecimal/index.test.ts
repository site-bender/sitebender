import { assert, assertEquals } from "@std/assert"

import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

import approximateDecimal from "./index.ts"

Deno.test("approximateDecimal accepts finite numbers", () => {
	const result = approximateDecimal(3.14)

	assert(isOk(result))
	assertEquals(result.value, 3.14)
})

Deno.test("approximateDecimal accepts zero", () => {
	const result = approximateDecimal(0)

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("approximateDecimal accepts negative numbers", () => {
	const result = approximateDecimal(-42.5)

	assert(isOk(result))
	assertEquals(result.value, -42.5)
})

Deno.test("approximateDecimal accepts integers", () => {
	const result = approximateDecimal(100)

	assert(isOk(result))
	assertEquals(result.value, 100)
})

Deno.test("approximateDecimal accepts very small numbers", () => {
	const result = approximateDecimal(0.0000001)

	assert(isOk(result))
	assertEquals(result.value, 0.0000001)
})

Deno.test("approximateDecimal accepts very large finite numbers", () => {
	const result = approximateDecimal(1.7976931348623157e308)

	assert(isOk(result))
	assertEquals(result.value, 1.7976931348623157e308)
})

Deno.test("approximateDecimal rejects Infinity with helpful error", () => {
	const result = approximateDecimal(Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "APPROXIMATE_DECIMAL_NOT_FINITE")
	assertEquals(result.error.field, "approximateDecimal")
	assertEquals(result.error.received, Infinity)
	assertEquals(result.error.expected, "Finite number")
	assert(result.error.suggestion.includes("finite"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("approximateDecimal rejects -Infinity with helpful error", () => {
	const result = approximateDecimal(-Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "APPROXIMATE_DECIMAL_NOT_FINITE")
	assertEquals(result.error.field, "approximateDecimal")
	assertEquals(result.error.received, -Infinity)
	assertEquals(result.error.expected, "Finite number")
})

Deno.test("approximateDecimal rejects NaN with helpful error", () => {
	const result = approximateDecimal(NaN)

	assert(isError(result))
	assertEquals(result.error.code, "APPROXIMATE_DECIMAL_NOT_FINITE")
	assertEquals(result.error.field, "approximateDecimal")
	assert(Number.isNaN(result.error.received))
	assertEquals(result.error.expected, "Finite number")
})
