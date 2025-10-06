import { assert, assertEquals } from "@std/assert"

import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

import decimal0 from "./index.ts"

Deno.test("decimal0 accepts whole number", () => {
	const result = decimal0(100)

	assert(isOk(result))
	assertEquals(result.value, 100)
})

Deno.test("decimal0 accepts zero", () => {
	const result = decimal0(0)

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("decimal0 accepts negative whole number", () => {
	const result = decimal0(-50)

	assert(isOk(result))
	assertEquals(result.value, -50)
})

Deno.test("decimal0 accepts large whole number", () => {
	const result = decimal0(1000000)

	assert(isOk(result))
	assertEquals(result.value, 1000000)
})

Deno.test("decimal0 rejects Infinity with helpful error", () => {
	const result = decimal0(Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "DECIMAL0_NOT_FINITE")
	assertEquals(result.error.field, "decimal0")
	assertEquals(result.error.received, Infinity)
	assertEquals(result.error.expected, "Finite whole number")
	assert(result.error.suggestion.includes("finite"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("decimal0 rejects -Infinity with helpful error", () => {
	const result = decimal0(-Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "DECIMAL0_NOT_FINITE")
	assertEquals(result.error.field, "decimal0")
	assertEquals(result.error.received, -Infinity)
	assertEquals(result.error.expected, "Finite whole number")
})

Deno.test("decimal0 rejects NaN with helpful error", () => {
	const result = decimal0(NaN)

	assert(isError(result))
	assertEquals(result.error.code, "DECIMAL0_NOT_FINITE")
	assertEquals(result.error.field, "decimal0")
	assert(Number.isNaN(result.error.received))
	assertEquals(result.error.expected, "Finite whole number")
})

Deno.test("decimal0 rejects 1 decimal place with helpful error", () => {
	const result = decimal0(10.5)

	assert(isError(result))
	assertEquals(result.error.code, "DECIMAL0_HAS_DECIMALS")
	assertEquals(result.error.field, "decimal0")
	assertEquals(result.error.received, 10.5)
	assertEquals(result.error.expected, "Whole number with 0 decimal places")
	assert(result.error.suggestion.includes("whole number"))
	assert(result.error.suggestion.toLowerCase().includes("decimal1"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("decimal0 rejects 2 decimal places with helpful error", () => {
	const result = decimal0(19.99)

	assert(isError(result))
	assertEquals(result.error.code, "DECIMAL0_HAS_DECIMALS")
	assertEquals(result.error.field, "decimal0")
	assertEquals(result.error.received, 19.99)
	assertEquals(result.error.expected, "Whole number with 0 decimal places")
})

Deno.test("decimal0 rejects many decimal places with helpful error", () => {
	const result = decimal0(3.141592653589793)

	assert(isError(result))
	assertEquals(result.error.code, "DECIMAL0_HAS_DECIMALS")
	assertEquals(result.error.field, "decimal0")
	assertEquals(result.error.received, 3.141592653589793)
})
