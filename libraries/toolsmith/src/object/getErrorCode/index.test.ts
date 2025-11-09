import type { ErrorNode } from "../../types/index.ts"

import { assertEquals } from "@std/assert"
import { assert } from "@std/assert/assert"

import getErrorCode from "./index.ts"

Deno.test("getErrorCode", async function getErrorCodeTests(t) {
	await t.step(
		"returns ok with code for valid ErrorNode",
		function returnsOkWithCode() {
			const node: ErrorNode = {
				_tag: "error",
				code: "VALIDATION_ERROR",
				message: "Validation failed",
			}

			const result = getErrorCode(node)

			assert(result._tag === "Ok")
			if (result._tag === "Ok") {
				assertEquals(result.value, "VALIDATION_ERROR")
			}
		},
	)

	await t.step(
		"returns ok for any valid error code",
		function worksWithAnyCode() {
			const node: ErrorNode = {
				_tag: "error",
				code: "CUSTOM_ERROR_CODE",
				message: "Custom error",
			}

			const result = getErrorCode(node)

			assert(result._tag === "Ok")
			if (result._tag === "Ok") {
				assertEquals(result.value, "CUSTOM_ERROR_CODE")
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

			const result = getErrorCode(node)

			assert(result._tag === "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "INVALID_ERROR_NODE")
			}
		},
	)

	await t.step(
		"returns error for node missing code",
		function returnsErrorForMissingCode() {
			const node = {
				_tag: "error",
				message: "Some error",
			} as unknown as ErrorNode

			const result = getErrorCode(node)

			assert(result._tag === "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "MISSING_ERROR_CODE")
			}
		},
	)

	await t.step(
		"returns error for non-string code",
		function returnsErrorForNonStringCode() {
			const node = {
				_tag: "error",
				code: 123,
				message: "Error",
			} as unknown as ErrorNode

			const result = getErrorCode(node)

			assert(result._tag === "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "INVALID_ERROR_CODE_TYPE")
			}
		},
	)

	await t.step(
		"protects against type assertion bypasses",
		function protectsAgainstTypeAssertions() {
			const node = {} as ErrorNode

			const result = getErrorCode(node)

			assert(result._tag === "Error")
		},
	)
})
