import { assert, assertEquals } from "@std/assert"

import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

import decimal3 from "./index.ts"

Deno.test("decimal3 accepts whole number", () => {
	const result = decimal3(100)

	assert(isOk(result))
	assertEquals(result.value, 100)
})

Deno.test("decimal3 accepts zero", () => {
	const result = decimal3(0)

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("decimal3 accepts negative whole number", () => {
	const result = decimal3(-50)

	assert(isOk(result))
	assertEquals(result.value, -50)
})

Deno.test("decimal3 accepts number with 1 decimal place", () => {
	const result = decimal3(10.5)

	assert(isOk(result))
	assertEquals(result.value, 10.5)
})

Deno.test("decimal3 accepts number with 2 decimal places", () => {
	const result = decimal3(19.99)

	assert(isOk(result))
	assertEquals(result.value, 19.99)
})

Deno.test("decimal3 accepts number with 3 decimal places", () => {
	const result = decimal3(123.456)

	assert(isOk(result))
	assertEquals(result.value, 123.456)
})

Deno.test("decimal3 accepts negative number with 3 decimal places", () => {
	const result = decimal3(-99.999)

	assert(isOk(result))
	assertEquals(result.value, -99.999)
})

Deno.test("decimal3 accepts small decimal with 3 places", () => {
	const result = decimal3(0.123)

	assert(isOk(result))
	assertEquals(result.value, 0.123)
})

Deno.test("decimal3 rejects Infinity with helpful error", () => {
	const result = decimal3(Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "DECIMAL3_NOT_FINITE")
	assertEquals(result.error.field, "decimal3")
	assertEquals(result.error.received, Infinity)
	assertEquals(result.error.expected, "Finite number with at most 3 decimal places")
	assert(result.error.suggestion.includes("finite"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("decimal3 rejects -Infinity with helpful error", () => {
	const result = decimal3(-Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "DECIMAL3_NOT_FINITE")
	assertEquals(result.error.field, "decimal3")
	assertEquals(result.error.received, -Infinity)
	assertEquals(result.error.expected, "Finite number with at most 3 decimal places")
})

Deno.test("decimal3 rejects NaN with helpful error", () => {
	const result = decimal3(NaN)

	assert(isError(result))
	assertEquals(result.error.code, "DECIMAL3_NOT_FINITE")
	assertEquals(result.error.field, "decimal3")
	assert(Number.isNaN(result.error.received))
	assertEquals(result.error.expected, "Finite number with at most 3 decimal places")
})

Deno.test("decimal3 rejects 4 decimal places with helpful error", () => {
	const result = decimal3(1.2345)

	assert(isError(result))
	assertEquals(result.error.code, "DECIMAL3_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "decimal3")
	assertEquals(result.error.received, 1.2345)
	assertEquals(result.error.expected, "Number with at most 3 decimal places")
	assert(result.error.suggestion.includes("3 decimal place"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("decimal3 rejects 5 decimal places with helpful error", () => {
	const result = decimal3(12.34567)

	assert(isError(result))
	assertEquals(result.error.code, "DECIMAL3_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "decimal3")
	assertEquals(result.error.received, 12.34567)
	assertEquals(result.error.expected, "Number with at most 3 decimal places")
})

Deno.test("decimal3 rejects many decimal places with helpful error", () => {
	const result = decimal3(3.141592653589793)

	assert(isError(result))
	assertEquals(result.error.code, "DECIMAL3_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "decimal3")
	assertEquals(result.error.received, 3.141592653589793)
})
