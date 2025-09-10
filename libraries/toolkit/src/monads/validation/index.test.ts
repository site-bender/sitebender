import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"

import type NonEmptyArray from "../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../types/ValidationError/index.ts"
import type { ValidationResult } from "../types/fp/validation/index.ts"

import valid from "./valid/index.ts"
import invalid from "./invalid/index.ts"
import isValid from "./isValid/index.ts"
import isInvalid from "./isInvalid/index.ts"
import map from "./map/index.ts"
import fold from "./fold/index.ts"
import chain from "./chain/index.ts"
import createValidator from "./createValidator/index.ts"
import validateAll from "./validateAll/index.ts"

const validAge = createValidator(
	function checkAge(age: number) { return age >= 18 }
)(
	function ageError(age: number) { 
		return { field: "age", messages: [`Age ${age} is too young`] }
	}
)

Deno.test("Validation monad - Valid instances", async (t) => {
	await t.step("should create valid instance", () => {
		const result = valid<ValidationError, number>(42)
		assertEquals(isValid(result), true)
		assertEquals(isInvalid(result), false)
		assertEquals(result._tag, "Valid")
	})

	await t.step("should map over valid value", () => {
		const double = function double(x: number) { return x * 2 }
		const result = map(double)(valid<ValidationError, number>(21))

		assertEquals(isValid(result), true)
		if (isValid(result)) {
			assertEquals(result.value, 42)
		}
	})

	await t.step("should chain successfully", () => {
		const result = chain(validAge)(valid<ValidationError, number>(21))

		assertEquals(isValid(result), true)
	})

	await t.step("should fold to valid branch", () => {
		const validation = valid<ValidationError, number>(42)
		const result = fold<ValidationError, number, string>(
			function onValid(value: number) { return `Valid: ${value}` }
		)(
			function onInvalid(_errors: NonEmptyArray<ValidationError>) { return "Invalid" }
		)(validation)

		assertEquals(result, "Valid: 42")
	})
})

Deno.test("Validation monad - Invalid instances", async (t) => {
	const errors: NonEmptyArray<ValidationError> = [
		{ field: "test", messages: ["error1", "error2"] },
	]

	await t.step("should create invalid instance", () => {
		const result = invalid<ValidationError, number>(errors)
		assertEquals(isValid(result), false)
		assertEquals(isInvalid(result), true)
		assertEquals(result._tag, "Invalid")
	})

	await t.step("should not map over invalid value", () => {
		const double = function double(x: number) { return x * 2 }
		const result = map(double)(invalid<ValidationError, number>(errors))

		assertEquals(isInvalid(result), true)
		if (isInvalid(result)) {
			assertEquals(result.errors, errors)
		}
	})

	await t.step("should not chain invalid value", () => {
		const result = chain(validAge)(invalid<ValidationError, number>(errors))

		assertEquals(isInvalid(result), true)
		if (isInvalid(result)) {
			assertEquals(result.errors, errors)
		}
	})

	await t.step("should fold to invalid branch", () => {
		const validation = invalid<ValidationError, number>(errors)
		const result = fold<ValidationError, number, string>(
			function onValid(_value: number) { return "Valid" }
		)(
			function onInvalid(errs: NonEmptyArray<ValidationError>) { 
				return `Invalid: ${errs.length} errors` 
			}
		)(validation)

		assertEquals(result, "Invalid: 1 errors")
	})
})

Deno.test("Validation monad - createValidator", async (t) => {
	await t.step("should validate valid age", () => {
		const result = validAge(21)
		assertEquals(isValid(result), true)
	})

	await t.step("should invalidate young age", () => {
		const result = validAge(16)
		assertEquals(isInvalid(result), true)
		if (isInvalid(result)) {
			assertEquals(result.errors[0].field, "age")
			assertEquals(result.errors[0].messages[0], "Age 16 is too young")
		}
	})
})

Deno.test("Validation monad - validateAll", async (t) => {
	await t.step("should pass all validations", () => {
		const validators: NonEmptyArray<(value: number) => ValidationResult<number>> = [
			function checkPositive(n: number) { 
				return n > 0 ? valid(n) : invalid([{ field: "number", messages: ["Must be positive"] }])
			},
			function checkLessThan100(n: number) { 
				return n < 100 ? valid(n) : invalid([{ field: "number", messages: ["Must be less than 100"] }])
			},
		]

		const result = validateAll(validators)(50)
		assertEquals(isValid(result), true)
	})

	await t.step("should accumulate errors", () => {
		const validators: NonEmptyArray<(value: number) => ValidationResult<number>> = [
			function checkPositive(n: number) { 
				return n > 0 ? valid(n) : invalid([{ field: "number", messages: ["Must be positive"] }])
			},
			function checkLessThan100(n: number) { 
				return n < 100 ? valid(n) : invalid([{ field: "number", messages: ["Must be less than 100"] }])
			},
		]

		const result = validateAll(validators)(-50)
		assertEquals(isInvalid(result), true)
		if (isInvalid(result)) {
			assertEquals(result.errors.length, 1)
			assertEquals(result.errors[0].messages.length, 1)
		}
	})
})