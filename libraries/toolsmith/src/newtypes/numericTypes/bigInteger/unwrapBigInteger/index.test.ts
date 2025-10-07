import { assertEquals } from "@std/assert"

import unsafeBigInteger from "@sitebender/toolsmith/newtypes/bigInteger/unsafeBigInteger/index.ts"

import unwrapBigInteger from "./index.ts"

Deno.test("unwrapBigInteger extracts bigint from BigInteger", () => {
	const bigInteger = unsafeBigInteger(42n)
	const result = unwrapBigInteger(bigInteger)

	assertEquals(result, 42n)
})

Deno.test("unwrapBigInteger works with zero", () => {
	const bigInteger = unsafeBigInteger(0n)
	const result = unwrapBigInteger(bigInteger)

	assertEquals(result, 0n)
})

Deno.test("unwrapBigInteger works with negative bigints", () => {
	const bigInteger = unsafeBigInteger(-100n)
	const result = unwrapBigInteger(bigInteger)

	assertEquals(result, -100n)
})

Deno.test("unwrapBigInteger works with very large bigint", () => {
	const bigInteger = unsafeBigInteger(9007199254740992n)
	const result = unwrapBigInteger(bigInteger)

	assertEquals(result, 9007199254740992n)
})

Deno.test("unwrapBigInteger works with extremely large bigint", () => {
	const bigInteger = unsafeBigInteger(123456789012345678901234567890n)
	const result = unwrapBigInteger(bigInteger)

	assertEquals(result, 123456789012345678901234567890n)
})
