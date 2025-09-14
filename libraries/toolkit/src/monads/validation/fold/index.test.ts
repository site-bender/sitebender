import { assertEquals } from "@std/assert"

import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/ValidationError/index.ts"

import invalid from "../invalid/index.ts"
import valid from "../valid/index.ts"
import fold from "./index.ts"

Deno.test("fold - extracts values from validation", async (t) => {
	await t.step("should fold valid to success branch", () => {
		const validation = valid(42)
		const result = fold<number, string>((value) => `Valid: ${value}`)<
			ValidationError
		>(
			(errors) => `Errors: ${errors.length}`,
		)(validation)

		assertEquals(result, "Valid: 42")
	})

	await t.step("should fold invalid to error branch", () => {
		const errors: NonEmptyArray<ValidationError> = [
			{ field: "test", messages: ["error1", "error2"] },
		]

		const validation = invalid<ValidationError>(errors)
		const result = fold<number, string>((value) => `Valid: ${value}`)<
			ValidationError
		>(
			(errs) => `Errors: ${errs.length}`,
		)(validation)

		assertEquals(result, "Errors: 1")
	})

	await t.step("should transform to different types", () => {
		const validation = valid(100)
		const result = fold<
			number,
			{ success: boolean; data?: number; errors?: readonly ValidationError[] }
		>(
			(value) => ({ success: true, data: value }),
		)<ValidationError>(
			(errors) => ({ success: false, errors }),
		)(validation)

		assertEquals(result.success, true)
		assertEquals(result.data, 100)
	})

	await t.step("should handle complex error transformations", () => {
		const errors: NonEmptyArray<ValidationError> = [
			{ field: "age", messages: ["too young"] },
			{ field: "name", messages: ["required"] },
		]

		const validation = invalid<ValidationError>(errors)
		const result = fold<string, string>((value) => value)<ValidationError>(
			(errs) =>
				errs.map((e) => `${e.field}: ${e.messages.join(", ")}`).join("; "),
		)(validation)

		assertEquals(result, "age: too young; name: required")
	})

	await t.step("should return same type from both branches", () => {
		const validCase = valid(42)
		const invalidCase = invalid<string>(["error"])

		const foldToNumber = fold<number, number>((n) => n * 2)<string>((_errors) =>
			0
		)

		assertEquals(foldToNumber(validCase), 84)
		assertEquals(foldToNumber(invalidCase), 0)
	})
})
