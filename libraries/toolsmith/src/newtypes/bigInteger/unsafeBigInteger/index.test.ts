import { assertEquals } from "@std/assert"

import type { BigInteger } from "@sitebender/toolsmith/types/branded/index.ts"

import unsafeBigInteger from "./index.ts"

Deno.test("unsafeBigInteger brands a bigint as BigInteger", () => {
	const result: BigInteger = unsafeBigInteger(42n)

	assertEquals(result, 42n)
})

Deno.test("unsafeBigInteger works with zero", () => {
	const result: BigInteger = unsafeBigInteger(0n)

	assertEquals(result, 0n)
})

Deno.test("unsafeBigInteger works with negative bigints", () => {
	const result: BigInteger = unsafeBigInteger(-100n)

	assertEquals(result, -100n)
})

Deno.test("unsafeBigInteger works with very large bigint", () => {
	const result: BigInteger = unsafeBigInteger(9007199254740992n)

	assertEquals(result, 9007199254740992n)
})

Deno.test("unsafeBigInteger works with extremely large bigint", () => {
	const result: BigInteger = unsafeBigInteger(
		123456789012345678901234567890n,
	)

	assertEquals(result, 123456789012345678901234567890n)
})
