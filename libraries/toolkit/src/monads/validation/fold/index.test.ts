import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"

import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/ValidationError/index.ts"

import fold from "./index.ts"
import valid from "../valid/index.ts"
import invalid from "../invalid/index.ts"

Deno.test("fold - extracts values from validation", async (t) => {
	await t.step("should fold valid to success branch", () => {
		const validation = valid<ValidationError, number>(42)
		const result = fold<ValidationError, number, string>(
			(value: number) => `Valid: ${value}`
		)(
			(errors: NonEmptyArray<ValidationError>) => `Errors: ${errors.length}`
		)(validation)
		
		assertEquals(result, "Valid: 42")
	})

	await t.step("should fold invalid to error branch", () => {
		const errors: NonEmptyArray<ValidationError> = [
			{ field: "test", messages: ["error1", "error2"] }
		]
		const validation = invalid<ValidationError, number>(errors)
		const result = fold<ValidationError, number, string>(
			(value: number) => `Valid: ${value}`
		)(
			(errs: NonEmptyArray<ValidationError>) => `Errors: ${errs.length}`
		)(validation)
		
		assertEquals(result, "Errors: 1")
	})

	await t.step("should transform to different types", () => {
		const validation = valid<ValidationError, number>(100)
		const result = fold<ValidationError, number, { success: boolean; data?: number; errors?: ValidationError[] }>(
			(value: number) => ({ success: true, data: value })
		)(
			(errors: NonEmptyArray<ValidationError>) => ({ success: false, errors })
		)(validation)
		
		assertEquals(result.success, true)
		assertEquals(result.data, 100)
	})

	await t.step("should handle complex error transformations", () => {
		const errors: NonEmptyArray<ValidationError> = [
			{ field: "age", messages: ["too young"] },
			{ field: "name", messages: ["required"] }
		]
		const validation = invalid<ValidationError, string>(errors)
		const result = fold<ValidationError, string, string>(
			(value: string) => value
		)(
			(errs: NonEmptyArray<ValidationError>) => 
				errs.map(e => `${e.field}: ${e.messages.join(", ")}`).join("; ")
		)(validation)
		
		assertEquals(result, "age: too young; name: required")
	})

	await t.step("should return same type from both branches", () => {
		const validCase = valid<string, number>(42)
		const invalidCase = invalid<string, number>(["error"])
		
		const foldToNumber = fold<string, number, number>(
			(n: number) => n * 2
		)(
			(_errors: NonEmptyArray<string>) => 0
		)
		
		assertEquals(foldToNumber(validCase), 84)
		assertEquals(foldToNumber(invalidCase), 0)
	})
})