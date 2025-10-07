import { assertEquals } from "@std/assert"

import unsafeInteger from "@sitebender/toolsmith/newtypes/integer/unsafeInteger/index.ts"

import unwrapInteger from "./index.ts"

Deno.test("unwrapInteger extracts number from Integer", () => {
	const integer = unsafeInteger(42)
	const result = unwrapInteger(integer)

	assertEquals(result, 42)
})

Deno.test("unwrapInteger works with zero", () => {
	const integer = unsafeInteger(0)
	const result = unwrapInteger(integer)

	assertEquals(result, 0)
})

Deno.test("unwrapInteger works with negative integers", () => {
	const integer = unsafeInteger(-100)
	const result = unwrapInteger(integer)

	assertEquals(result, -100)
})

Deno.test("unwrapInteger works with MAX_SAFE_INTEGER", () => {
	const integer = unsafeInteger(9007199254740991)
	const result = unwrapInteger(integer)

	assertEquals(result, 9007199254740991)
})

Deno.test("unwrapInteger works with MIN_SAFE_INTEGER", () => {
	const integer = unsafeInteger(-9007199254740991)
	const result = unwrapInteger(integer)

	assertEquals(result, -9007199254740991)
})
