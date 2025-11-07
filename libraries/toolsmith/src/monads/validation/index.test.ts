import { expect } from "@std/expect"

import type NonEmptyArray from "../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../types/fp/validation/index.ts"

import chain from "./chain/index.ts"
import createValidator from "./createValidator/index.ts"
import fold from "./fold/index.ts"
import failure from "./failure/index.ts"
import isInvalid from "./isInvalid/index.ts"
import isValid from "./isValid/index.ts"
import map from "./map/index.ts"
import success from "./success/index.ts"
import validateAll from "./validateAll/index.ts"

const validAge = createValidator(
	function checkAge(age: number) {
		return age >= 18
	},
)(
	function ageError(age: number) {
		return { field: "age", messages: [`Age ${age} is too young`] }
	},
)

Deno.test("Validation monad - Valid instances", async (t) => {
	await t.step("should create valid instance", () => {
		const result = success(42)
		expect(isValid(result)).toBe(true)
		expect(isInvalid(result)).toBe(false)
		expect(result._tag).toBe("Valid")
	})

	await t.step("should map over valid value", () => {
		const double = function double(x: number) {
			return x * 2
		}
		const result = map(double)(success(21))

		expect(isValid(result)).toBe(true)
		if (isValid(result)) {
			expect(result.value).toBe(42)
		}
	})

	await t.step("should chain successfully", () => {
		const result = chain(validAge)(success(21))
		expect(isValid(result)).toBe(true)
	})

	await t.step("should fold to valid branch", () => {
		const validation = success(42)
		const result = fold<number, string>(
			function onValid(value: number) {
				return `Valid: ${value}`
			},
		)<ValidationError>(
			function onInvalid(_errors: NonEmptyArray<ValidationError>) {
				return "Invalid"
			},
		)(validation)

		expect(result).toBe("Valid: 42")
	})
})

Deno.test("Validation monad - Invalid instances", async (t) => {
	const errors: NonEmptyArray<ValidationError> = [
		{ field: "test", messages: ["error1", "error2"] },
	]

	await t.step("should create invalid instance", () => {
		const result = failure(errors)
		expect(isValid(result)).toBe(false)
		expect(isInvalid(result)).toBe(true)
		expect(result._tag).toBe("Invalid")
	})

	await t.step("should not map over invalid value", () => {
		const double = function double(x: number) {
			return x * 2
		}
		const result = map(double)(failure(errors))

		expect(isInvalid(result)).toBe(true)
		if (isInvalid(result)) {
			expect(result.errors).toEqual(errors)
		}
	})

	await t.step("should not chain invalid value", () => {
		const result = chain(validAge)(failure(errors))

		expect(isInvalid(result)).toBe(true)
		if (isInvalid(result)) {
			expect(result.errors).toEqual(errors)
		}
	})

	await t.step("should fold to invalid branch", () => {
		const validation = failure(errors)
		const result = fold<number, string>(
			function onValid(_value: number) {
				return "Valid"
			},
		)<ValidationError>(
			function onInvalid(errs: NonEmptyArray<ValidationError>) {
				return `Invalid: ${errs.length} errors`
			},
		)(validation)

		expect(result).toBe("Invalid: 1 errors")
	})
})

Deno.test("Validation monad - createValidator", async (t) => {
	await t.step("should validate valid age", () => {
		const result = validAge(21)
		expect(isValid(result)).toBe(true)
	})

	await t.step("should invalidate young age", () => {
		const result = validAge(16)
		expect(isInvalid(result)).toBe(true)
		if (isInvalid(result)) {
			expect(result.errors[0].field).toBe("age")
			expect(result.errors[0].messages[0]).toBe("Age 16 is too young")
		}
	})
})

Deno.test("Validation monad - validateAll", async (t) => {
	await t.step("should pass all validations", () => {
		const validators: NonEmptyArray<
			(value: number) => ReturnType<typeof validAge>
		> = [
			function checkPositive(n: number) {
				return n > 0 ? success(n) : failure<ValidationError>([{
					field: "number",
					messages: ["Must be positive"],
				}])
			},
			function checkLessThan100(n: number) {
				return n < 100 ? success(n) : failure<ValidationError>([{
					field: "number",
					messages: ["Must be less than 100"],
				}])
			},
		]

		const result = validateAll(validators)(50)
		expect(isValid(result)).toBe(true)
	})

	await t.step("should accumulate errors", () => {
		const validators: NonEmptyArray<
			(value: number) => ReturnType<typeof validAge>
		> = [
			function checkPositive(n: number) {
				return n > 0 ? success(n) : failure<ValidationError>([{
					field: "number",
					messages: ["Must be positive"],
				}])
			},
			function checkLessThan100(n: number) {
				return n < 100 ? success(n) : failure<ValidationError>([{
					field: "number",
					messages: ["Must be less than 100"],
				}])
			},
		]

		const result = validateAll(validators)(-50)
		expect(isInvalid(result)).toBe(true)
		if (isInvalid(result)) {
			expect(result.errors.length).toBe(1)
			expect(result.errors[0].messages.length).toBe(1)
		}
	})
})
