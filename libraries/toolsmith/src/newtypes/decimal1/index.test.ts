import { assert, assertEquals } from "@std/assert"

import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

import decimal1 from "./index.ts"

Deno.test("decimal1 accepts whole number", () => {
	const result = decimal1(100)

	assert(isOk(result))
	assertEquals(result.value, 100)
})

Deno.test("decimal1 accepts zero", () => {
	const result = decimal1(0)

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("decimal1 accepts negative whole number", () => {
	const result = decimal1(-50)

	assert(isOk(result))
	assertEquals(result.value, -50)
})

Deno.test("decimal1 accepts number with 1 decimal place", () => {
	const result = decimal1(10.5)

	assert(isOk(result))
	assertEquals(result.value, 10.5)
})

Deno.test("decimal1 accepts negative number with 1 decimal place", () => {
	const result = decimal1(-19.9)

	assert(isOk(result))
	assertEquals(result.value, -19.9)
})

Deno.test("decimal1 accepts small decimal with 1 place", () => {
	const result = decimal1(0.1)

	assert(isOk(result))
	assertEquals(result.value, 0.1)
})

Deno.test("decimal1 rejects Infinity with helpful error", () => {
	const result = decimal1(Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "DECIMAL1_NOT_FINITE")
	assertEquals(result.error.field, "decimal1")
	assertEquals(result.error.received, Infinity)
	assertEquals(result.error.expected, "Finite number with at most 1 decimal place")
	assert(result.error.suggestion.includes("finite"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("decimal1 rejects -Infinity with helpful error", () => {
	const result = decimal1(-Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "DECIMAL1_NOT_FINITE")
	assertEquals(result.error.field, "decimal1")
	assertEquals(result.error.received, -Infinity)
	assertEquals(result.error.expected, "Finite number with at most 1 decimal place")
})

Deno.test("decimal1 rejects NaN with helpful error", () => {
	const result = decimal1(NaN)

	assert(isError(result))
	assertEquals(result.error.code, "DECIMAL1_NOT_FINITE")
	assertEquals(result.error.field, "decimal1")
	assert(Number.isNaN(result.error.received))
	assertEquals(result.error.expected, "Finite number with at most 1 decimal place")
})

Deno.test("decimal1 rejects 2 decimal places with helpful error", () => {
	const result = decimal1(19.99)

	assert(isError(result))
	assertEquals(result.error.code, "DECIMAL1_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "decimal1")
	assertEquals(result.error.received, 19.99)
	assertEquals(result.error.expected, "Number with at most 1 decimal place")
	assert(result.error.suggestion.includes("1 decimal place"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("decimal1 rejects 3 decimal places with helpful error", () => {
	const result = decimal1(123.456)

	assert(isError(result))
	assertEquals(result.error.code, "DECIMAL1_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "decimal1")
	assertEquals(result.error.received, 123.456)
	assertEquals(result.error.expected, "Number with at most 1 decimal place")
})

Deno.test("decimal1 rejects many decimal places with helpful error", () => {
	const result = decimal1(3.141592653589793)

	assert(isError(result))
	assertEquals(result.error.code, "DECIMAL1_PRECISION_EXCEEDED")
	assertEquals(result.error.field, "decimal1")
	assertEquals(result.error.received, 3.141592653589793)
})
