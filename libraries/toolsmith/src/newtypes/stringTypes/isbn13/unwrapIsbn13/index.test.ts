import { assertEquals } from "@std/assert"

import unwrapIsbn13 from "./index.ts"
import unsafeIsbn13 from "@sitebender/toolsmith/newtypes/stringTypes/isbn13/unsafeIsbn13/index.ts"
import isbn13 from "@sitebender/toolsmith/newtypes/stringTypes/isbn13/index.ts"

Deno.test("unwrapIsbn13 unwraps branded ISBN13 to string", function unwrapsBrandedIsbn13() {
	const branded = unsafeIsbn13()("9780306406157")
	const result = unwrapIsbn13()(branded)
	assertEquals(result, "9780306406157")
})

Deno.test("unwrapIsbn13 works with round-trip: create → unwrap → same value", function roundTrip() {
	const original = "9780306406157"
	const created = isbn13(original)
	if (created._tag === "Ok") {
		const unwrapped = unwrapIsbn13()(created.value)
		assertEquals(unwrapped, original)
	} else {
		throw new Error("ISBN13 creation should succeed")
	}
})

Deno.test("unwrapIsbn13 works with valid ISBN13 instances", function validIsbn13Instances() {
	const validIsbns = [
		"9780306406157",
		"9780471958697",
		"9780321146533",
	]

	for (const isbn of validIsbns) {
		const created = isbn13(isbn)
		if (created._tag === "Ok") {
			const unwrapped = unwrapIsbn13()(created.value)
			assertEquals(unwrapped, isbn)
		} else {
			throw new Error(`ISBN13 creation should succeed for ${isbn}`)
		}
	}
})
