import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import formatIsbn10 from "./index.ts"
import unsafeIsbn10 from "@sitebender/toolsmith/newtypes/stringTypes/isbn10/unsafeIsbn10/index.ts"

Deno.test("formatIsbn10 formats ISBN-10 for display", () => {
	const isbn10 = unsafeIsbn10()("0471958697")
	const result = formatIsbn10()(isbn10)
	assertEquals(result, "0-471-95869-7")
})

Deno.test("formatIsbn10 works with X check digit", () => {
	const isbn10 = unsafeIsbn10()("020161622X")
	const result = formatIsbn10()(isbn10)
	assertEquals(result, "0-201-61622-X")
})

Deno.test("formatIsbn10 formats various ISBN-10 values", () => {
	const testCases = [
		["0321146530", "0-321-14653-0"],
		["0596000480", "0-596-00048-0"],
		["0201633612", "0-201-63361-2"],
		["0131103628", "0-131-10362-8"],
		["0262033844", "0-262-03384-4"],
		["0132350882", "0-132-35088-2"],
		["0321127420", "0-321-12742-0"],
		["0735619670", "0-735-61967-0"],
	]

	testCases.forEach(([input, expected]) => {
		const isbn10 = unsafeIsbn10()(input)
		const result = formatIsbn10()(isbn10)
		assertEquals(result, expected, `Expected ${input} to format to ${expected}`)
	})
})

Deno.test("formatIsbn10 is idempotent", () => {
	const isbn10 = unsafeIsbn10()("0471958697")
	const firstFormat = formatIsbn10()(isbn10)
	const secondFormat = formatIsbn10()(isbn10)
	assertEquals(firstFormat, secondFormat)
})

Deno.test("formatIsbn10 - property: formatted output has correct structure", () => {
	fc.assert(
		fc.property(
			fc.constantFrom(
				"0471958697",
				"0321146530",
				"0596000480",
				"0201633612",
				"0131103628",
				"0262033844",
				"020161622X",
				"0132350882",
				"0321127420",
				"0735619670",
			),
			(isbnString) => {
				const isbn10 = unsafeIsbn10()(isbnString)
				const formatted = formatIsbn10()(isbn10)

				// Should have exactly 3 hyphens
				const hyphenCount = (formatted.match(/-/g) || []).length
				assertEquals(hyphenCount, 3, `Expected 3 hyphens in ${formatted}`)

				// Should be 13 characters long (10 digits + 3 hyphens)
				assertEquals(formatted.length, 13, `Expected length 13 for ${formatted}`)

				// Should match pattern: digit-digit-digit-digit-digit-digit-digit-digit-digit-digit
				const pattern = /^\d-\d{3}-\d{5}-\d$|^\d-\d{3}-\d{5}-X$/
				assertEquals(pattern.test(formatted), true, `Expected ${formatted} to match ISBN-10 format pattern`)
			},
		),
	)
})

Deno.test("formatIsbn10 - property: idempotent", () => {
	fc.assert(
		fc.property(
			fc.constantFrom(
				"0471958697",
				"0321146530",
				"0596000480",
				"0201633612",
				"0131103628",
				"0262033844",
				"020161622X",
				"0132350882",
				"0321127420",
				"0735619670",
			),
			(isbnString) => {
				const isbn10 = unsafeIsbn10()(isbnString)
				const first = formatIsbn10()(isbn10)
				const second = formatIsbn10()(isbn10)
				assertEquals(first, second, "Formatting should be idempotent")
			},
		),
	)
})
