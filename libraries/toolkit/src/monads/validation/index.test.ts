import { assertEquals, assertInstanceOf } from "https://deno.land/std@0.218.0/assert/mod.ts"

import type NonEmptyArray from "../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../types/ValidationError/index.ts"

import Validation, { Invalid, Valid } from "./index.ts"
import createValidator from "./createValidator/index.ts"
import validateAll from "./validateAll/index.ts"

const validAge = createValidator(
	(age: number) => age >= 18,
	(age: number) => ({ field: "age", messages: [`Age ${age} is too young`] }),
)

const validEmail = createValidator(
	(email: string) => email.includes("@"),
	(email: string) => ({
		field: "email",
		messages: [`Email ${email} is invalid`],
	}),
)

Deno.test("Validation monad - Valid instances", async (t) => {
	await t.step("should create valid instance", () => {
		const result = Validation.of(42)
		assertEquals(result.isValid(), true)
		assertEquals(result.isInvalid(), false)
		assertInstanceOf(result, Valid)
	})

	await t.step("should map over valid value", () => {
		const result = Validation.of(21)
			.map((x) => x * 2)

		assertEquals(result.isValid(), true)
		if (result.isValid()) {
			assertEquals(result.value, 42)
		}
	})

	await t.step("should validate successfully", () => {
		const result = Validation.of(21)
			.validate(validAge)

		assertEquals(result.isValid(), true)
	})

	await t.step("should fold to valid branch", () => {
		const result = Validation.of(42)
			.fold(
				(value) => `Valid: ${value}`,
				(errors) => `Invalid: ${errors.length}`,
			)

		assertEquals(result, "Valid: 42")
	})
})

Deno.test("Validation monad - Invalid instances", async (t) => {
	await t.step("should create invalid instance", () => {
		const errors: NonEmptyArray<ValidationError> = [{
			field: "test",
			messages: ["error"],
		}]
		const result = Validation.invalid(errors)

		assertEquals(result.isValid(), false)
		assertEquals(result.isInvalid(), true)
		assertInstanceOf(result, Invalid)
	})

	await t.step("should preserve errors on map", () => {
		const errors: NonEmptyArray<ValidationError> = [{
			field: "test",
			messages: ["error"],
		}]
		const result = Validation.invalid<number>(errors)
			.map((x) => x * 2)

		assertEquals(result.isInvalid(), true)
		if (result.isInvalid()) {
			assertEquals(result.errors, errors)
		}
	})

	await t.step("should preserve errors on validate", () => {
		const errors: NonEmptyArray<ValidationError> = [{
			field: "test",
			messages: ["error"],
		}]
		const result = Validation.invalid<number>(errors)
			.validate(validAge)

		assertEquals(result.isInvalid(), true)
		if (result.isInvalid()) {
			assertEquals(result.errors, errors)
		}
	})

	await t.step("should fold to invalid branch", () => {
		const errors: NonEmptyArray<ValidationError> = [{
			field: "test",
			messages: ["error"],
		}]
		const result = Validation.invalid<number>(errors)
			.fold(
				(value) => `Valid: ${value}`,
				(errors) => `Invalid: ${errors.length}`,
			)

		assertEquals(result, "Invalid: 1")
	})
})

Deno.test("createValidator function", async (t) => {
	await t.step("should create valid result for valid input", () => {
		const result = validAge(21)
		assertEquals(result.isValid(), true)
	})

	await t.step("should create invalid result for invalid input", () => {
		const result = validAge(16)
		assertEquals(result.isInvalid(), true)
		if (result.isInvalid()) {
			assertEquals(result.errors[0].field, "age")
			assertEquals(result.errors[0].messages[0], "Age 16 is too young")
		}
	})
})

Deno.test("validateAll function", async (t) => {
	await t.step("should pass all validations", () => {
		const result = validateAll(21, [validAge] as NonEmptyArray<
			(value: number) => Validation<number>
		>)
		assertEquals(result.isValid(), true)
	})

	await t.step("should accumulate all errors", () => {
		const userData = { age: 16, email: "invalid" }

		const checkAge = (user: typeof userData) => validAge(user.age)
		const checkEmail = (user: typeof userData) => validEmail(user.email)

		const result = validateAll(userData, [
			checkAge,
			checkEmail,
		] as NonEmptyArray<(value: typeof userData) => Validation<typeof userData>>)

		assertEquals(result.isInvalid(), true)
		if (result.isInvalid()) {
			assertEquals(result.errors.length, 2)
			assertEquals(result.errors[0].field, "age")
			assertEquals(result.errors[1].field, "email")
		}
	})
})