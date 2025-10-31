//++ Example: Testing single-field validation with Validation monad
//++ Demonstrates testing focused validation with helpful error messages

import { assert, assertEquals, fail } from "@std/assert"
import fold from "@sitebender/toolsmith/monads/validation/fold/index.ts"

//++ Simplified types for example - matching Toolsmith's structure
type Success<T> = { readonly _tag: "Success"; readonly value: T }
type Failure<E> = { readonly _tag: "Failure"; readonly errors: readonly [E, ...ReadonlyArray<E>] }
type Validation<E, T> = Success<T> | Failure<E>

type ValidationError = {
	readonly code: string
	readonly field: string
	readonly messages: ReadonlyArray<string>
}

type Email = string & { readonly __brand: "Email" }

//++ Function under test: validates email address
function validateEmail(input: string): Validation<ValidationError, Email> {
	const errors: Array<ValidationError> = []

	if (input.trim() === "") {
		errors.push({
			code: "EMAIL_REQUIRED",
			field: "email",
			messages: ["Email is required"],
		})
	}

	if (!input.includes("@")) {
		errors.push({
			code: "EMAIL_INVALID",
			field: "email",
			messages: ["Email must contain @ symbol"],
		})
	}

	if (input.includes("@") && input.split("@")[1].trim() === "") {
		errors.push({
			code: "EMAIL_DOMAIN_REQUIRED",
			field: "email",
			messages: ["Email must have a domain after @"],
		})
	}

	if (errors.length > 0) {
		return { _tag: "Failure", errors: errors as [ValidationError, ...Array<ValidationError>] }
	}

	return { _tag: "Success", value: input as Email }
}

//++ Tests for validateEmail (single-field validation)
Deno.test("validateEmail", async (t) => {
	await t.step("success path", async (t) => {
		await t.step("validates correct email", () => {
			const result = validateEmail("user@example.com")
			fold<Email, void>(
				(value) => assertEquals(value, "user@example.com")
			)(
				(_errors) => fail("Expected Success but got Failure")
			)(result)
		})

		await t.step("validates email with subdomain", () => {
			const result = validateEmail("user@mail.example.com")
			fold<Email, void>(
				(_value) => { /* Expected success */ }
			)(
				(_errors) => fail("Expected Success but got Failure")
			)(result)
		})

		await t.step("validates email with plus sign", () => {
			const result = validateEmail("user+tag@example.com")
			fold<Email, void>(
				(_value) => { /* Expected success */ }
			)(
				(_errors) => fail("Expected Success but got Failure")
			)(result)
		})
	})

	await t.step("error path", async (t) => {
		await t.step("returns Failure for missing @", () => {
			const result = validateEmail("userexample.com")
			fold<Email, void>(
				(_value) => fail("Expected Failure but got Success")
			)(
				(errors) => {
					assert(errors.length >= 1)
					const codes = errors.map((e) => e.code)
					assert(codes.includes("EMAIL_INVALID"))
				}
			)(result)
		})

		await t.step("returns Failure for empty string", () => {
			const result = validateEmail("")
			fold<Email, void>(
				(_value) => fail("Expected Failure but got Success")
			)(
				(errors) => {
					const codes = errors.map((e) => e.code)
					assert(codes.includes("EMAIL_REQUIRED"))
				}
			)(result)
		})

		await t.step("returns Failure for missing domain", () => {
			const result = validateEmail("user@")
			fold<Email, void>(
				(_value) => fail("Expected Failure but got Success")
			)(
				(errors) => {
					const codes = errors.map((e) => e.code)
					assert(codes.includes("EMAIL_DOMAIN_REQUIRED"))
				}
			)(result)
		})
	})

	await t.step("edge cases", async (t) => {
		await t.step("handles whitespace around email", () => {
			const result = validateEmail("  ")
			fold<Email, void>(
				(_value) => fail("Expected Failure but got Success")
			)(
				(_errors) => { /* Expected failure */ }
			)(result)
		})

		await t.step("handles multiple @ symbols", () => {
			const result = validateEmail("user@@example.com")
			// Validator catches empty domain between @ symbols
			fold<Email, void>(
				(_value) => fail("Expected Failure but got Success")
			)(
				(_errors) => { /* Expected failure */ }
			)(result)
		})
	})
})
