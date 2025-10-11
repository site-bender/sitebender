import { assertEquals } from "@std/assert"

import unsafeIsbn13 from "./index.ts"

Deno.test("unsafeIsbn13 creates branded ISBN13 without validation", function createsBrandedIsbn13() {
	const result = unsafeIsbn13()("9780306406157")
	assertEquals(typeof result, "string")
	assertEquals(result, "9780306406157")
})

Deno.test("unsafeIsbn13 works with valid ISBN13 strings", function validIsbn13Strings() {
	const validIsbns = [
		"9780306406157",
		"9791234567890",
		"9783161484100",
		"9780471958697",
	]

	for (const isbn of validIsbns) {
		const result = unsafeIsbn13()(isbn)
		assertEquals(result, isbn)
	}
})

Deno.test("unsafeIsbn13 preserves type safety", function typeSafety() {
	const branded = unsafeIsbn13()("9780306406157")
	// TypeScript should know this is Isbn13 type
	assertEquals(typeof branded, "string")
	assertEquals(branded.length, 13)
})
