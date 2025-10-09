import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import join from "./index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isError from "../../monads/result/isError/index.ts"

Deno.test("join", async function joinTests(t) {
	await t.step(
		"joins array elements with separator",
		function joinsWithSeparator() {
			const result = join(", ")(["apple", "banana", "cherry"])

			assertEquals(isOk(result), true)
			assertEquals(result.value, "apple, banana, cherry")
		},
	)

	await t.step(
		"joins with empty separator",
		function joinsWithEmptySeparator() {
			const result = join("")(["a", "b", "c"])

			assertEquals(isOk(result), true)
			assertEquals(result.value, "abc")
		},
	)

	await t.step(
		"handles empty arrays",
		function handlesEmptyArrays() {
			const result = join(", ")([])

			assertEquals(isOk(result), true)
			assertEquals(result.value, "")
		},
	)

	await t.step(
		"joins numbers",
		function joinsNumbers() {
			const result = join("-")([1, 2, 3, 4, 5])

			assertEquals(isOk(result), true)
			assertEquals(result.value, "1-2-3-4-5")
		},
	)

	await t.step(
		"handles single element",
		function handlesSingleElement() {
			const result = join(", ")(["only"])

			assertEquals(isOk(result), true)
			assertEquals(result.value, "only")
		},
	)

	await t.step(
		"returns error for non-array input",
		function returnsErrorForNonArray() {
			const result = join(", ")(null as unknown as ReadonlyArray<string>)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "JOIN_INVALID_INPUT")
				assertEquals(result.error.field, "array")
			}
		},
	)

	await t.step(
		"joins mixed types",
		function joinsMixedTypes() {
			const result = join(" ")(["hello", 42, true, null, undefined])

			assertEquals(isOk(result), true)
			// JavaScript's Array.prototype.join converts null to "" and undefined to ""
			assertEquals(result.value, "hello 42 true  ")
		},
	)

	await t.step(
		"uses multicharacter separator",
		function usesMulticharSeparator() {
			const result = join(" -> ")(["step1", "step2", "step3"])

			assertEquals(isOk(result), true)
			assertEquals(result.value, "step1 -> step2 -> step3")
		},
	)

	await t.step(
		"handles special characters in separator",
		function handlesSpecialChars() {
			const result = join("\n")(["line1", "line2", "line3"])

			assertEquals(isOk(result), true)
			assertEquals(result.value, "line1\nline2\nline3")
		},
	)
})

Deno.test("join - property: length constraints", function lengthProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.string()),
			fc.string(),
			function propertyLength(arr, sep) {
				const result = join(sep)(arr)

				if (isOk(result)) {
					const joined = result.value
					// Empty array produces empty string
					if (arr.length === 0) {
						assertEquals(joined, "")
					}
					// Single element has no separator
					if (arr.length === 1) {
						assertEquals(joined, String(arr[0]))
					}
				}
			},
		),
	)
})

Deno.test("join - property: separator count", function separatorCountProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.string(), { minLength: 2 }),
			function propertySeparatorCount(arr) {
				// Use a separator unlikely to appear in random strings
				const separator = "|||UNIQUE_SEP|||"
				const result = join(separator)(arr)

				if (isOk(result)) {
					const joined = result.value
					const separatorCount = joined.split(separator).length - 1
					// Should have n-1 separators for n elements
					assertEquals(separatorCount, arr.length - 1)
				}
			},
		),
	)
})

Deno.test("join - property: reversible with split", function reversibleProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.string()),
			function propertyReversible(arr) {
				// Use a separator unlikely to appear in random strings
				const separator = "|||UNIQUE_SEP|||"
				const result = join(separator)(arr)

				if (isOk(result) && arr.length > 0) {
					const joined = result.value
					const split = joined.split(separator)
					// Should be reversible when separator doesn't appear in elements
					assertEquals(split, arr.map(String))
				}
			},
		),
	)
})
