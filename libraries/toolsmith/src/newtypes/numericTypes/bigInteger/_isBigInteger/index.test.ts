import { assert } from "@std/assert"

import _isBigInteger from "./index.ts"

Deno.test("_isBigInteger returns true for bigint values", () => {
	assert(_isBigInteger(123n))
})

Deno.test("_isBigInteger returns true for zero bigint", () => {
	assert(_isBigInteger(0n))
})

Deno.test("_isBigInteger returns true for negative bigint", () => {
	assert(_isBigInteger(-456n))
})

Deno.test("_isBigInteger returns true for very large bigint", () => {
	assert(_isBigInteger(9007199254740992n))
})

Deno.test("_isBigInteger returns false for number", () => {
	assert(!_isBigInteger(123 as never))
})

Deno.test("_isBigInteger returns false for string", () => {
	assert(!_isBigInteger("123" as never))
})

Deno.test("_isBigInteger returns false for null", () => {
	assert(!_isBigInteger(null as never))
})

Deno.test("_isBigInteger returns false for undefined", () => {
	assert(!_isBigInteger(undefined as never))
})
