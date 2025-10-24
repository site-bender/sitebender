import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import _trimToValidation from "./index.ts"
import isSuccess from "../../../monads/validation/isSuccess/index.ts"
import isFailure from "../../../monads/validation/isFailure/index.ts"

Deno.test("_trimToValidation", async function trimToValidationTests(t) {
	await t.step(
		"trims whitespace and returns Validation success",
		function trimsWhitespace() {
			const result = _trimToValidation("  hello world  ")

			assertEquals(isSuccess(result), true)
			if (isSuccess(result)) {
				assertEquals(result.value, "hello world")
			}
		},
	)

	await t.step(
		"trims leading whitespace and returns Validation success",
		function trimsLeading() {
			const result = _trimToValidation("  hello world")

			assertEquals(isSuccess(result), true)
			if (isSuccess(result)) {
				assertEquals(result.value, "hello world")
			}
		},
	)

	await t.step(
		"trims trailing whitespace and returns Validation success",
		function trimsTrailing() {
			const result = _trimToValidation("hello world  ")

			assertEquals(isSuccess(result), true)
			if (isSuccess(result)) {
				assertEquals(result.value, "hello world")
			}
		},
	)

	await t.step(
		"handles string with no whitespace",
		function handlesNoWhitespace() {
			const result = _trimToValidation("hello")

			assertEquals(isSuccess(result), true)
			if (isSuccess(result)) {
				assertEquals(result.value, "hello")
			}
		},
	)

	await t.step(
		"handles empty string",
		function handlesEmptyString() {
			const result = _trimToValidation("")

			assertEquals(isSuccess(result), true)
			if (isSuccess(result)) {
				assertEquals(result.value, "")
			}
		},
	)

	await t.step(
		"trims tabs and newlines",
		function trimsTabsAndNewlines() {
			const result = _trimToValidation("\t\nhello\n\t")

			assertEquals(isSuccess(result), true)
			if (isSuccess(result)) {
				assertEquals(result.value, "hello")
			}
		},
	)

	await t.step(
		"returns failure for non-string input",
		function returnsFailureForNonString() {
			const result = _trimToValidation(123 as unknown as string)

			assertEquals(isFailure(result), true)
			if (isFailure(result)) {
				assertEquals(result.errors.length, 1)
				assertEquals(result.errors[0].code, "TRIM_INVALID_INPUT")
				assertEquals(result.errors[0].field, "input")
				assertEquals(result.errors[0].expected, "String")
				assertEquals(result.errors[0].received, "number")
			}
		},
	)
})

Deno.test(
	"_trimToValidation - property: returns success for all valid strings",
	function successProperty() {
		fc.assert(
			fc.property(fc.string(), function propertyReturnsSuccess(str) {
				const result = _trimToValidation(str)

				assertEquals(isSuccess(result), true)
				if (isSuccess(result)) {
					assertEquals(result.value.length <= str.length, true)
				}
			}),
		)
	},
)
