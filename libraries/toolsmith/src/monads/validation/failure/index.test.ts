import { assertEquals } from "@std/assert"

import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/fp/validation/index.ts"

import isInvalid from "../isInvalid/index.ts"
import failure from "./index.ts"

Deno.test("invalid - creates Invalid instances", async (t) => {
	await t.step("should create invalid instance with single error", () => {
		const errors: NonEmptyArray<ValidationError> = [
			{ field: "test", messages: ["error"] },
		]

		const result = failure<ValidationError, number>(errors)

		assertEquals(result._tag, "Invalid")
		if (isInvalid(result)) {
			assertEquals(result.errors, errors)
		}
		assertEquals(isInvalid(result), true)
	})

	await t.step("should create invalid instance with multiple errors", () => {
		const errors: NonEmptyArray<ValidationError> = [
			{ field: "age", messages: ["too young"] },
			{ field: "name", messages: ["required"] },
		]

		const result = failure<ValidationError, string>(errors)

		assertEquals(result._tag, "Invalid")
		if (isInvalid(result)) {
			assertEquals(result.errors, errors)
		}
		assertEquals(isInvalid(result), true)
	})

	await t.step("should create invalid instance with string errors", () => {
		const errors: NonEmptyArray<string> = ["error1", "error2", "error3"]

		const result = failure<string, number>(errors)

		assertEquals(result._tag, "Invalid")
		if (isInvalid(result)) {
			assertEquals(result.errors, errors)
		}
		assertEquals(isInvalid(result), true)
	})

	await t.step("should preserve error structure", () => {
		const errors: NonEmptyArray<ValidationError> = [
			{ field: "email", messages: ["invalid format", "domain not allowed"] },
		]

		const result = failure<ValidationError, unknown>(errors)

		assertEquals(result._tag, "Invalid")
		if (isInvalid(result)) {
			assertEquals(result.errors[0].field, "email")
			assertEquals(result.errors[0].messages.length, 2)
		}
	})
})
