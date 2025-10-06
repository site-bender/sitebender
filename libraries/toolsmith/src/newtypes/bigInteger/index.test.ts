import { assert, assertEquals } from "@std/assert"

import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

import bigInteger from "./index.ts"

Deno.test("bigInteger accepts bigint values", () => {
	const result = bigInteger(42n)

	assert(isOk(result))
	assertEquals(result.value, 42n)
})

Deno.test("bigInteger accepts zero", () => {
	const result = bigInteger(0n)

	assert(isOk(result))
	assertEquals(result.value, 0n)
})

Deno.test("bigInteger accepts negative bigints", () => {
	const result = bigInteger(-100n)

	assert(isOk(result))
	assertEquals(result.value, -100n)
})

Deno.test("bigInteger accepts very large bigint", () => {
	const result = bigInteger(9007199254740992n)

	assert(isOk(result))
	assertEquals(result.value, 9007199254740992n)
})

Deno.test("bigInteger accepts extremely large bigint", () => {
	const result = bigInteger(123456789012345678901234567890n)

	assert(isOk(result))
	assertEquals(result.value, 123456789012345678901234567890n)
})

Deno.test("bigInteger rejects number with helpful error", () => {
	const result = bigInteger(42 as never)

	assert(isError(result))
	assertEquals(result.error.code, "BIGINTEGER_NOT_BIGINT")
	assertEquals(result.error.field, "bigInteger")
	assertEquals(result.error.received, 42)
	assertEquals(result.error.expected, "BigInt")
	assert(result.error.suggestion.includes("bigint"))
	assertEquals(result.error.severity, "requirement")
})

Deno.test("bigInteger rejects string with helpful error", () => {
	const result = bigInteger("123" as never)

	assert(isError(result))
	assertEquals(result.error.code, "BIGINTEGER_NOT_BIGINT")
	assertEquals(result.error.field, "bigInteger")
	assertEquals(result.error.received, "123")
	assertEquals(result.error.expected, "BigInt")
})

Deno.test("bigInteger rejects null with helpful error", () => {
	const result = bigInteger(null as never)

	assert(isError(result))
	assertEquals(result.error.code, "BIGINTEGER_NOT_BIGINT")
	assertEquals(result.error.field, "bigInteger")
	assertEquals(result.error.received, null)
})

Deno.test("bigInteger rejects undefined with helpful error", () => {
	const result = bigInteger(undefined as never)

	assert(isError(result))
	assertEquals(result.error.code, "BIGINTEGER_NOT_BIGINT")
	assertEquals(result.error.field, "bigInteger")
})
