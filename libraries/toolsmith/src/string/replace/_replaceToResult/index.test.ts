import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import _replaceToResult from "./index.ts"
import isOk from "../../../monads/result/isOk/index.ts"
import isError from "../../../monads/result/isError/index.ts"

Deno.test("_replaceToResult", async function replaceToResultTests(t) {
	await t.step(
		"replaces pattern and returns Result ok with string pattern",
		function replacesWithStringPattern() {
			const result = _replaceToResult("world")("universe")("hello world")

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, "hello universe")
			}
		},
	)

	await t.step(
		"replaces pattern and returns Result ok with RegExp pattern",
		function replacesWithRegExpPattern() {
			const result = _replaceToResult(/world/g)("universe")("hello world")

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, "hello universe")
			}
		},
	)

	await t.step(
		"replaces all occurrences with global RegExp",
		function replacesAllOccurrences() {
			const result = _replaceToResult(/o/g)("0")("hello world")

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, "hell0 w0rld")
			}
		},
	)

	await t.step(
		"handles empty string replacement",
		function handlesEmptyReplacement() {
			const result = _replaceToResult(/[<>]/g)("")("<div>hello</div>")

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, "divhello/div")
			}
		},
	)

	await t.step(
		"returns error for invalid pattern",
		function returnsErrorForInvalidPattern() {
			const result = _replaceToResult(123 as unknown as string)("universe")(
				"hello world",
			)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "REPLACE_INVALID_PATTERN")
				assertEquals(result.error.field, "pattern")
				assertEquals(result.error.expected, "String or RegExp")
			}
		},
	)

	await t.step(
		"returns error for invalid replacement",
		function returnsErrorForInvalidReplacement() {
			const result = _replaceToResult("world")(123 as unknown as string)(
				"hello world",
			)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "REPLACE_INVALID_REPLACEMENT")
				assertEquals(result.error.field, "replacement")
				assertEquals(result.error.expected, "String")
			}
		},
	)

	await t.step(
		"returns error for invalid input",
		function returnsErrorForInvalidInput() {
			const result = _replaceToResult("world")("universe")(
				123 as unknown as string,
			)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "REPLACE_INVALID_INPUT")
				assertEquals(result.error.field, "input")
				assertEquals(result.error.expected, "String")
				assertEquals(result.error.received, "number")
			}
		},
	)
})

Deno.test(
	"_replaceToResult - property: returns ok when inputs valid",
	function okProperty() {
		fc.assert(
			fc.property(fc.string(), function propertyReturnsOk(str) {
				const result = _replaceToResult("NONEXISTENT")("replacement")(str)

				assertEquals(isOk(result), true)
				if (isOk(result)) {
					assertEquals(result.value, str)
				}
			}),
		)
	},
)
