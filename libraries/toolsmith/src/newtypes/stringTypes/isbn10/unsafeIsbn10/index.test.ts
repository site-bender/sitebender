import { assertEquals } from "@std/assert"

import type { Isbn10 } from "@sitebender/toolsmith/types/branded/index.ts"

import unsafeIsbn10 from "./index.ts"

Deno.test("unsafeIsbn10 brands a string as Isbn10", () => {
	const result: Isbn10 = unsafeIsbn10()("0471958697")

	assertEquals(result, "0471958697")
})

Deno.test("unsafeIsbn10 works with X check digit", () => {
	const result: Isbn10 = unsafeIsbn10()("020161622X")

	assertEquals(result, "020161622X")
})

Deno.test("unsafeIsbn10 does not validate - accepts invalid ISBN10", () => {
	const result = unsafeIsbn10()("invalid")

	assertEquals(result, "invalid")
})

Deno.test("unsafeIsbn10 does not validate - accepts wrong length", () => {
	const result = unsafeIsbn10()("123")

	assertEquals(result, "123")
})
