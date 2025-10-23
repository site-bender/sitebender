import { assert } from "@std/assert"

import isBigInteger from "./index.ts"

Deno.test("_isBigInteger returns true for bigint values", () => {
	assert(isBigInteger(123n))
})

Deno.test("_isBigInteger returns true for zero bigint", () => {
	assert(isBigInteger(0n))
})

Deno.test("_isBigInteger returns true for negative bigint", () => {
	assert(isBigInteger(-456n))
})

Deno.test("_isBigInteger returns true for very large bigint", () => {
	assert(isBigInteger(9007199254740992n))
})

Deno.test("_isBigInteger returns false for number", () => {
	assert(!isBigInteger(123 as never))
})

Deno.test("_isBigInteger returns false for string", () => {
	assert(!isBigInteger("123" as never))
})

Deno.test("_isBigInteger returns false for null", () => {
	assert(!isBigInteger(null as never))
})

Deno.test("_isBigInteger returns false for undefined", () => {
	assert(!isBigInteger(undefined as never))
})
