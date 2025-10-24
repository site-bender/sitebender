import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import replace from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isError from "../../monads/result/isError/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import isFailure from "../../monads/validation/isFailure/index.ts"

Deno.test("replace - plain string path", async function replacePlainStringTests(t) {
	await t.step(
		"replaces with string pattern",
		function replacesWithStringPattern() {
			const result = replace("world")("universe")("hello world")

			assertEquals(result, "hello universe")
		},
	)

	await t.step(
		"replaces with RegExp pattern",
		function replacesWithRegExpPattern() {
			const result = replace(/world/g)("universe")("hello world")

			assertEquals(result, "hello universe")
		},
	)

	await t.step(
		"removes dangerous characters",
		function removesDangerousCharacters() {
			const result = replace(/[<>]/g)("")("<div>hello</div>")

			assertEquals(result, "divhello/div")
		},
	)

	await t.step(
		"replaces all occurrences with global flag",
		function replacesAllOccurrences() {
			const result = replace(/o/g)("0")("hello world")

			assertEquals(result, "hell0 w0rld")
		},
	)

	await t.step(
		"handles empty string",
		function handlesEmptyString() {
			const result = replace("world")("universe")("")

			assertEquals(result, "")
		},
	)
})

Deno.test("replace - Result monad path", async function replaceResultTests(t) {
	await t.step(
		"replaces in ok wrapped string",
		function replacesInOkString() {
			const result = replace("world")("universe")(ok("hello world"))

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, "hello universe")
			}
		},
	)

	await t.step(
		"removes characters in ok wrapped string",
		function removesInOkString() {
			const result = replace(/[<>]/g)("")(ok("<div>hello</div>"))

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, "divhello/div")
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

			const result = replace("world")("universe")(inputError)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "UPSTREAM_ERROR")
			}
		},
	)
})

Deno.test(
	"replace - Validation monad path",
	async function replaceValidationTests(t) {
		await t.step(
			"replaces in success wrapped string",
			function replacesInSuccessString() {
				const result = replace("world")("universe")(success("hello world"))

				assertEquals(isSuccess(result), true)
				if (isSuccess(result)) {
					assertEquals(result.value, "hello universe")
				}
			},
		)

		await t.step(
			"removes characters in success wrapped string",
			function removesInSuccessString() {
				const result = replace(/[<>]/g)("")(success("<div>hello</div>"))

				assertEquals(isSuccess(result), true)
				if (isSuccess(result)) {
					assertEquals(result.value, "divhello/div")
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

				const result = replace("world")("universe")(inputFailure)

				assertEquals(isFailure(result), true)
				if (isFailure(result)) {
					assertEquals(result.errors.length, 1)
					assertEquals(result.errors[0].code, "UPSTREAM_VALIDATION_ERROR")
				}
			},
		)
	},
)

Deno.test(
	"replace - property: idempotent when pattern not found",
	function idempotentProperty() {
		fc.assert(
			fc.property(fc.string(), function propertyIdempotent(str) {
				const result = replace("NONEXISTENT")("replacement")(str)

				assertEquals(result, str)
			}),
		)
	},
)

Deno.test(
	"replace - property: Result ok when pattern not found",
	function resultOkProperty() {
		fc.assert(
			fc.property(fc.string(), function propertyResultOk(str) {
				const result = replace("NONEXISTENT")("replacement")(ok(str))

				assertEquals(isOk(result), true)
				if (isOk(result)) {
					assertEquals(result.value, str)
				}
			}),
		)
	},
)

Deno.test(
	"replace - property: Validation success when pattern not found",
	function validationSuccessProperty() {
		fc.assert(
			fc.property(fc.string(), function propertyValidationSuccess(str) {
				const result = replace("NONEXISTENT")("replacement")(success(str))

				assertEquals(isSuccess(result), true)
				if (isSuccess(result)) {
					assertEquals(result.value, str)
				}
			}),
		)
	},
)
