import { assert, assertEquals } from "@std/assert"

import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

import realNumber from "./index.ts"

Deno.test("realNumber accepts finite numbers", () => {
	const result = realNumber(3.14)

	assert(isOk(result))
	assertEquals(result.value, 3.14)
})

Deno.test("realNumber accepts zero", () => {
	const result = realNumber(0)

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("realNumber accepts negative numbers", () => {
	const result = realNumber(-42.5)

	assert(isOk(result))
	assertEquals(result.value, -42.5)
})

Deno.test("realNumber accepts integers", () => {
	const result = realNumber(100)

	assert(isOk(result))
	assertEquals(result.value, 100)
})

Deno.test("realNumber accepts very small numbers", () => {
	const result = realNumber(0.0000001)

	assert(isOk(result))
	assertEquals(result.value, 0.0000001)
})

Deno.test("realNumber accepts very large finite numbers", () => {
	const result = realNumber(1.7976931348623157e308)

	assert(isOk(result))
	assertEquals(result.value, 1.7976931348623157e308)
})

Deno.test("realNumber rejects Infinity with helpful error", () => {
	const result = realNumber(Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "REAL_NUMBER_NOT_FINITE")
	assertEquals(result.error.field, "realNumber")
	assertEquals(result.error.received, Infinity)
	assertEquals(result.error.expected, "Finite number")
	assert(result.error.suggestion.includes("finite"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("realNumber rejects -Infinity with helpful error", () => {
	const result = realNumber(-Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "REAL_NUMBER_NOT_FINITE")
	assertEquals(result.error.field, "realNumber")
	assertEquals(result.error.received, -Infinity)
	assertEquals(result.error.expected, "Finite number")
})

Deno.test("realNumber rejects NaN with helpful error", () => {
	const result = realNumber(NaN)

	assert(isError(result))
	assertEquals(result.error.code, "REAL_NUMBER_NOT_FINITE")
	assertEquals(result.error.field, "realNumber")
	assert(Number.isNaN(result.error.received))
	assertEquals(result.error.expected, "Finite number")
})
