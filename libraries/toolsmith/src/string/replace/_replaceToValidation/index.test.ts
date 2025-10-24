import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import _replaceToValidation from "./index.ts"
import isSuccess from "../../../monads/validation/isSuccess/index.ts"
import isFailure from "../../../monads/validation/isFailure/index.ts"

Deno.test("_replaceToValidation", async function replaceToValidationTests(t) {
	await t.step(
		"replaces pattern and returns Validation success with string pattern",
		function replacesWithStringPattern() {
			const result = _replaceToValidation("world")("universe")("hello world")

			assertEquals(isSuccess(result), true)
			if (isSuccess(result)) {
				assertEquals(result.value, "hello universe")
			}
		},
	)

	await t.step(
		"replaces pattern and returns Validation success with RegExp pattern",
		function replacesWithRegExpPattern() {
			const result = _replaceToValidation(/world/g)("universe")("hello world")

			assertEquals(isSuccess(result), true)
			if (isSuccess(result)) {
				assertEquals(result.value, "hello universe")
			}
		},
	)

	await t.step(
		"replaces all occurrences with global RegExp",
		function replacesAllOccurrences() {
			const result = _replaceToValidation(/o/g)("0")("hello world")

			assertEquals(isSuccess(result), true)
			if (isSuccess(result)) {
				assertEquals(result.value, "hell0 w0rld")
			}
		},
	)

	await t.step(
		"handles empty string replacement",
		function handlesEmptyReplacement() {
			const result = _replaceToValidation(/[<>]/g)("")("<div>hello</div>")

			assertEquals(isSuccess(result), true)
			if (isSuccess(result)) {
				assertEquals(result.value, "divhello/div")
			}
		},
	)

	await t.step(
		"returns failure for invalid pattern",
		function returnsFailureForInvalidPattern() {
			const result = _replaceToValidation(123 as unknown as string)("universe")(
				"hello world",
			)

			assertEquals(isFailure(result), true)
			if (isFailure(result)) {
				assertEquals(result.errors.length, 1)
				assertEquals(result.errors[0].code, "REPLACE_INVALID_PATTERN")
				assertEquals(result.errors[0].field, "pattern")
				assertEquals(result.errors[0].expected, "String or RegExp")
			}
		},
	)

	await t.step(
		"returns failure for invalid replacement",
		function returnsFailureForInvalidReplacement() {
			const result = _replaceToValidation("world")(123 as unknown as string)(
				"hello world",
			)

			assertEquals(isFailure(result), true)
			if (isFailure(result)) {
				assertEquals(result.errors.length, 1)
				assertEquals(result.errors[0].code, "REPLACE_INVALID_REPLACEMENT")
				assertEquals(result.errors[0].field, "replacement")
				assertEquals(result.errors[0].expected, "String")
			}
		},
	)

	await t.step(
		"returns failure for invalid input",
		function returnsFailureForInvalidInput() {
			const result = _replaceToValidation("world")("universe")(
				123 as unknown as string,
			)

			assertEquals(isFailure(result), true)
			if (isFailure(result)) {
				assertEquals(result.errors.length, 1)
				assertEquals(result.errors[0].code, "REPLACE_INVALID_INPUT")
				assertEquals(result.errors[0].field, "input")
				assertEquals(result.errors[0].expected, "String")
				assertEquals(result.errors[0].received, "number")
			}
		},
	)
})

Deno.test(
	"_replaceToValidation - property: returns success when inputs valid",
	function successProperty() {
		fc.assert(
			fc.property(fc.string(), function propertyReturnsSuccess(str) {
				const result = _replaceToValidation("NONEXISTENT")("replacement")(str)

				assertEquals(isSuccess(result), true)
				if (isSuccess(result)) {
					assertEquals(result.value, str)
				}
			}),
		)
	},
)
