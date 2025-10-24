import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import _trimToResult from "./index.ts"
import isOk from "../../../monads/result/isOk/index.ts"
import isError from "../../../monads/result/isError/index.ts"

Deno.test("_trimToResult", async function trimToResultTests(t) {
	await t.step(
		"trims whitespace and returns Result ok",
		function trimsWhitespace() {
			const result = _trimToResult("  hello world  ")

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, "hello world")
			}
		},
	)

	await t.step(
		"trims leading whitespace and returns Result ok",
		function trimsLeading() {
			const result = _trimToResult("  hello world")

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, "hello world")
			}
		},
	)

	await t.step(
		"trims trailing whitespace and returns Result ok",
		function trimsTrailing() {
			const result = _trimToResult("hello world  ")

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, "hello world")
			}
		},
	)

	await t.step(
		"handles string with no whitespace",
		function handlesNoWhitespace() {
			const result = _trimToResult("hello")

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, "hello")
			}
		},
	)

	await t.step(
		"handles empty string",
		function handlesEmptyString() {
			const result = _trimToResult("")

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, "")
			}
		},
	)

	await t.step(
		"trims tabs and newlines",
		function trimsTabsAndNewlines() {
			const result = _trimToResult("\t\nhello\n\t")

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, "hello")
			}
		},
	)

	await t.step(
		"returns error for non-string input",
		function returnsErrorForNonString() {
			const result = _trimToResult(123 as unknown as string)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "TRIM_INVALID_INPUT")
				assertEquals(result.error.field, "input")
				assertEquals(result.error.expected, "String")
				assertEquals(result.error.received, "number")
			}
		},
	)
})

Deno.test(
	"_trimToResult - property: returns ok for all valid strings",
	function okProperty() {
		fc.assert(
			fc.property(fc.string(), function propertyReturnsOk(str) {
				const result = _trimToResult(str)

				assertEquals(isOk(result), true)
				if (isOk(result)) {
					assertEquals(result.value.length <= str.length, true)
				}
			}),
		)
	},
)
