import { assert, assertEquals } from "@std/assert"

import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

import float from "./index.ts"

Deno.test("float accepts finite numbers", () => {
	const result = float(3.14)

	assert(isOk(result))
	assertEquals(result.value, 3.14)
})

Deno.test("float accepts zero", () => {
	const result = float(0)

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("float accepts negative numbers", () => {
	const result = float(-42.5)

	assert(isOk(result))
	assertEquals(result.value, -42.5)
})

Deno.test("float accepts integers", () => {
	const result = float(100)

	assert(isOk(result))
	assertEquals(result.value, 100)
})

Deno.test("float accepts very small numbers", () => {
	const result = float(0.0000001)

	assert(isOk(result))
	assertEquals(result.value, 0.0000001)
})

Deno.test("float accepts very large finite numbers", () => {
	const result = float(1.7976931348623157e308)

	assert(isOk(result))
	assertEquals(result.value, 1.7976931348623157e308)
})

Deno.test("float rejects Infinity with helpful error", () => {
	const result = float(Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "FLOAT_NOT_FINITE")
	assertEquals(result.error.field, "float")
	assertEquals(result.error.received, Infinity)
	assertEquals(result.error.expected, "Finite number")
	assert(result.error.suggestion.includes("finite"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("float rejects -Infinity with helpful error", () => {
	const result = float(-Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "FLOAT_NOT_FINITE")
	assertEquals(result.error.field, "float")
	assertEquals(result.error.received, -Infinity)
	assertEquals(result.error.expected, "Finite number")
})

Deno.test("float rejects NaN with helpful error", () => {
	const result = float(NaN)

	assert(isError(result))
	assertEquals(result.error.code, "FLOAT_NOT_FINITE")
	assertEquals(result.error.field, "float")
	assert(Number.isNaN(result.error.received))
	assertEquals(result.error.expected, "Finite number")
})
