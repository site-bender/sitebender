import { assert, assertEquals } from "@std/assert"

import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

import integer from "./index.ts"

Deno.test("integer accepts safe integers", () => {
	const result = integer(42)

	assert(isOk(result))
	assertEquals(result.value, 42)
})

Deno.test("integer accepts zero", () => {
	const result = integer(0)

	assert(isOk(result))
	assertEquals(result.value, 0)
})

Deno.test("integer accepts negative integers", () => {
	const result = integer(-100)

	assert(isOk(result))
	assertEquals(result.value, -100)
})

Deno.test("integer accepts MAX_SAFE_INTEGER", () => {
	const result = integer(9007199254740991)

	assert(isOk(result))
	assertEquals(result.value, 9007199254740991)
})

Deno.test("integer accepts MIN_SAFE_INTEGER", () => {
	const result = integer(-9007199254740991)

	assert(isOk(result))
	assertEquals(result.value, -9007199254740991)
})

Deno.test("integer rejects decimals with helpful error", () => {
	const result = integer(3.14)

	assert(isError(result))
	assertEquals(result.error.code, "INTEGER_NOT_SAFE")
	assertEquals(result.error.field, "integer")
	assertEquals(result.error.received, 3.14)
	assertEquals(result.error.expected, "Safe integer")
	assert(result.error.suggestion.includes("whole number"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("integer rejects unsafe integers with helpful error", () => {
	const result = integer(9007199254740992)

	assert(isError(result))
	assertEquals(result.error.code, "INTEGER_NOT_SAFE")
	assertEquals(result.error.field, "integer")
	assertEquals(result.error.received, 9007199254740992)
	assertEquals(result.error.expected, "Safe integer")
	assert(result.error.suggestion.includes("-9,007,199,254,740,991"))
	assert(result.error.suggestion.includes("9,007,199,254,740,991"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("integer rejects Infinity with helpful error", () => {
	const result = integer(Infinity)

	assert(isError(result))
	assertEquals(result.error.code, "INTEGER_NOT_SAFE")
	assertEquals(result.error.field, "integer")
	assertEquals(result.error.received, Infinity)
})

Deno.test("integer rejects NaN with helpful error", () => {
	const result = integer(NaN)

	assert(isError(result))
	assertEquals(result.error.code, "INTEGER_NOT_SAFE")
	assertEquals(result.error.field, "integer")
})

Deno.test("integer error includes constraints", () => {
	const result = integer(3.14)

	assert(isError(result))
	assertEquals(result.error.constraints?.min, -9007199254740991)
	assertEquals(result.error.constraints?.max, 9007199254740991)
})
