import { assert, assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import type { Result } from "../../types/fp/result/index.ts"
import type { Validation, ValidationError } from "../../types/fp/validation/index.ts"
import trim from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isError from "../../monads/result/isError/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import isFailure from "../../monads/validation/isFailure/index.ts"

Deno.test("trim - plain string path", async function trimPlainStringTests(t) {
	await t.step(
		"trims whitespace from both ends",
		function trimsWhitespace() {
			const result = trim("  hello world  ")

			assertEquals(result, "hello world")
		},
	)

	await t.step(
		"trims leading whitespace",
		function trimsLeading() {
			const result = trim("  hello world")

			assertEquals(result, "hello world")
		},
	)

	await t.step(
		"trims trailing whitespace",
		function trimsTrailing() {
			const result = trim("hello world  ")

			assertEquals(result, "hello world")
		},
	)

	await t.step(
		"handles empty string",
		function handlesEmptyString() {
			const result = trim("")

			assertEquals(result, "")
		},
	)

	await t.step(
		"trims tabs and newlines",
		function trimsTabsAndNewlines() {
			const result = trim("\t\nhello\n\t")

			assertEquals(result, "hello")
		},
	)
})

Deno.test("trim - Result monad path", async function trimResultTests(t) {
	await t.step(
		"trims whitespace in ok wrapped string",
		function trimsInOkString() {
			const result = trim(ok("  hello world  "))

			assert(isOk(result))
			if (isOk(result)) {
				assertEquals(result.value, "hello world")
			}
		},
	)

	await t.step(
		"trims tabs and newlines in ok wrapped string",
		function trimsTabsInOkString() {
			const result = trim(ok("\t\nhello\n\t"))

			assert(isOk(result))
			if (isOk(result)) {
				assertEquals(result.value, "hello")
			}
		},
	)

	await t.step(
		"passes through error without processing",
		function passesErrorThrough() {
			const inputError = error({
				code: "UPSTREAM_ERROR",
				field: "data",
				messages: ["Upstream error occurred"],
				received: "null",
				expected: "String",
				suggestion: "Fix upstream issue",
				severity: "requirement" as const,
			})

			const result = trim(inputError) as Result<ValidationError, string>

			assert(isError(result))
			if (isError(result)) {
				assertEquals(result.error.code, "UPSTREAM_ERROR")
			}
		},
	)
})

Deno.test(
	"trim - Validation monad path",
	async function trimValidationTests(t) {
		await t.step(
			"trims whitespace in success wrapped string",
			function trimsInSuccessString() {
				const result = trim(success("  hello world  "))

				assert(isSuccess(result))
				if (isSuccess(result)) {
					assertEquals(result.value, "hello world")
				}
			},
		)

		await t.step(
			"trims tabs and newlines in success wrapped string",
			function trimsTabsInSuccessString() {
				const result = trim(success("\t\nhello\n\t"))

				assert(isSuccess(result))
				if (isSuccess(result)) {
					assertEquals(result.value, "hello")
				}
			},
		)

		await t.step(
			"passes through failure without processing",
			function passesFailureThrough() {
				const inputFailure = failure([
					{
						code: "UPSTREAM_VALIDATION_ERROR",
						field: "data",
						messages: ["Validation failed upstream"],
						received: "null",
						expected: "String",
						suggestion: "Fix validation issues",
						severity: "requirement" as const,
					},
				])

				const result = trim(inputFailure) as Validation<ValidationError, string>

				assert(isFailure(result))
				if (isFailure(result)) {
					assertEquals(result.errors.length, 1)
					assertEquals(result.errors[0].code, "UPSTREAM_VALIDATION_ERROR")
				}
			},
		)
	},
)

Deno.test(
	"trim - property: result length always less than or equal to input",
	function lengthProperty() {
		fc.assert(
			fc.property(fc.string(), function propertyLength(str) {
				const result = trim(str) as string

				assertEquals(typeof result, "string")
				assert(result.length <= str.length)
			}),
		)
	},
)

Deno.test(
	"trim - property: Result ok length always less than or equal to input",
	function resultLengthProperty() {
		fc.assert(
			fc.property(fc.string(), function propertyResultLength(str) {
				const result = trim(ok(str))

				assert(isOk(result))
				if (isOk(result)) {
					assert(result.value.length <= str.length)
				}
			}),
		)
	},
)

Deno.test(
	"trim - property: Validation success length always less than or equal to input",
	function validationLengthProperty() {
		fc.assert(
			fc.property(fc.string(), function propertyValidationLength(str) {
				const result = trim(success(str))

				assert(isSuccess(result))
				if (isSuccess(result)) {
					assert(result.value.length <= str.length)
				}
			}),
		)
	},
)
