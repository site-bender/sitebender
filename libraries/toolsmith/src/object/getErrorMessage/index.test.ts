import type { ErrorNode } from "../../types/index.ts"

import { assertEquals } from "@std/assert"
import { assert } from "@std/assert/assert"

import getErrorMessage from "./index.ts"

Deno.test("getErrorMessage", async function getErrorMessageTests(t) {
	await t.step(
		"returns ok with message for valid ErrorNode",
		function returnsOkWithMessage() {
			const node: ErrorNode = {
				_tag: "error",
				code: "VALIDATION_ERROR",
				message: "Field validation failed",
			}

			const result = getErrorMessage(node)

			assert(result._tag === "Ok")
			if (result._tag === "Ok") {
				assertEquals(result.value, "Field validation failed")
			}
		},
	)

	await t.step(
		"returns ok for any valid error message",
		function worksWithAnyMessage() {
			const node: ErrorNode = {
				_tag: "error",
				code: "CUSTOM_ERROR",
				message: "Something went wrong",
			}

			const result = getErrorMessage(node)

			assert(result._tag === "Ok")
			if (result._tag === "Ok") {
				assertEquals(result.value, "Something went wrong")
			}
		},
	)

	await t.step(
		"returns error for non-ErrorNode",
		function returnsErrorForNonErrorNode() {
			const node = {
				_tag: "text",
				content: "not an error",
			} as unknown as ErrorNode

			const result = getErrorMessage(node)

			assert(result._tag === "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "INVALID_ERROR_NODE")
			}
		},
	)

	await t.step(
		"returns error for node missing message",
		function returnsErrorForMissingMessage() {
			const node = {
				_tag: "error",
				code: "SOME_ERROR",
			} as unknown as ErrorNode

			const result = getErrorMessage(node)

			assert(result._tag === "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "MISSING_ERROR_MESSAGE")
			}
		},
	)

	await t.step(
		"returns error for non-string message",
		function returnsErrorForNonStringMessage() {
			const node = {
				_tag: "error",
				code: "ERROR",
				message: 123,
			} as unknown as ErrorNode

			const result = getErrorMessage(node)

			assert(result._tag === "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "INVALID_ERROR_MESSAGE_TYPE")
			}
		},
	)

	await t.step(
		"protects against type assertion bypasses",
		function protectsAgainstTypeAssertions() {
			const node = {} as ErrorNode

			const result = getErrorMessage(node)

			assert(result._tag === "Error")
		},
	)
})
