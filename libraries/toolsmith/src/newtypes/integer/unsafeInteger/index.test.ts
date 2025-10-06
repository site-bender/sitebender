import { assertEquals } from "@std/assert"

import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"

import unsafeInteger from "./index.ts"

Deno.test("unsafeInteger brands a number as Integer", () => {
	const result: Integer = unsafeInteger(42)

	assertEquals(result, 42)
})

Deno.test("unsafeInteger works with zero", () => {
	const result: Integer = unsafeInteger(0)

	assertEquals(result, 0)
})

Deno.test("unsafeInteger works with negative integers", () => {
	const result: Integer = unsafeInteger(-100)

	assertEquals(result, -100)
})

Deno.test("unsafeInteger works with MAX_SAFE_INTEGER", () => {
	const result: Integer = unsafeInteger(9007199254740991)

	assertEquals(result, 9007199254740991)
})

Deno.test("unsafeInteger works with MIN_SAFE_INTEGER", () => {
	const result: Integer = unsafeInteger(-9007199254740991)

	assertEquals(result, -9007199254740991)
})

Deno.test("unsafeInteger does not validate - accepts decimals", () => {
	const result = unsafeInteger(3.14)

	assertEquals(result, 3.14)
})

Deno.test("unsafeInteger does not validate - accepts unsafe integers", () => {
	const result = unsafeInteger(9007199254740992)

	assertEquals(result, 9007199254740992)
})
