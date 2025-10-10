import { assertEquals } from "@std/assert"

import unwrapIsbn10 from "./index.ts"
import unsafeIsbn10 from "@sitebender/toolsmith/newtypes/stringTypes/isbn10/unsafeIsbn10/index.ts"

Deno.test("unwrapIsbn10 extracts string from Isbn10", () => {
	const isbn10 = unsafeIsbn10()("0471958697")
	const result = unwrapIsbn10()(isbn10)
	assertEquals(result, "0471958697")
})

Deno.test("unwrapIsbn10 works with X check digit", () => {
	const isbn10 = unsafeIsbn10()("020161622X")
	const result = unwrapIsbn10()(isbn10)
	assertEquals(result, "020161622X")
})

Deno.test("unwrapIsbn10 round-trip with unsafeIsbn10", () => {
	const original = "0471958697"
	const isbn10 = unsafeIsbn10()(original)
	const unwrapped = unwrapIsbn10()(isbn10)
	assertEquals(unwrapped, original)
})
