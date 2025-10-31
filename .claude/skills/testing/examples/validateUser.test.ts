//++ Example: Testing a function that returns Validation
//++ Demonstrates testing error accumulation with Validation monad

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

type User = {
	readonly name: string
	readonly email: string
	readonly age: number
}

//++ Function under test: validates user with error accumulation
function validateUser(input: {
	name: string
	email: string
	age: number
}): Validation<ValidationError, User> {
	const errors: Array<ValidationError> = []

	if (input.name.trim() === "") {
		errors.push({
			code: "NAME_REQUIRED",
			field: "name",
			messages: ["Name is required"],
		})
	}

	if (!input.email.includes("@")) {
		errors.push({
			code: "EMAIL_INVALID",
			field: "email",
			messages: ["Email must contain @"],
		})
	}

	if (input.age < 0 || input.age > 150) {
		errors.push({
			code: "AGE_INVALID",
			field: "age",
			messages: ["Age must be between 0 and 150"],
		})
	}

	if (errors.length > 0) {
		return { _tag: "Failure", errors: errors as [ValidationError, ...Array<ValidationError>] }
	}

	return { _tag: "Success", value: input as User }
}

//++ Tests for validateUser (returns Validation)
Deno.test("validateUser", async (t) => {
	await t.step("success path", async (t) => {
		await t.step("validates user with all valid fields", () => {
			const input = {
				name: "Alice",
				email: "alice@example.com",
				age: 25,
			}
			const result: Validation<ValidationError, User> = validateUser(input)
			fold<User, void>(
				(value) => {
					assertEquals(value.name, "Alice")
					assertEquals(value.email, "alice@example.com")
					assertEquals(value.age, 25)
				}
			)(
				(_errors) => fail("Expected Success but got Failure")
			)(result)
		})
	})

	await t.step("error path - single field", async (t) => {
		await t.step("returns Failure for invalid email", () => {
			const input = {
				name: "Alice",
				email: "invalid-email",
				age: 25,
			}
			const result = validateUser(input)
			fold<User, void>(
				(_value) => fail("Expected Failure but got Success")
			)(
				(errors) => {
					assertEquals(errors.length, 1)
					assertEquals(errors[0].field, "email")
					assertEquals(errors[0].code, "EMAIL_INVALID")
				}
			)(result)
		})

		await t.step("returns Failure for empty name", () => {
			const input = {
				name: "",
				email: "alice@example.com",
				age: 25,
			}
			const result = validateUser(input)
			fold<User, void>(
				(_value) => fail("Expected Failure but got Success")
			)(
				(errors) => {
					assertEquals(errors.length, 1)
					assertEquals(errors[0].field, "name")
				}
			)(result)
		})

		await t.step("returns Failure for negative age", () => {
			const input = {
				name: "Alice",
				email: "alice@example.com",
				age: -5,
			}
			const result = validateUser(input)
			fold<User, void>(
				(_value) => fail("Expected Failure but got Success")
			)(
				(errors) => {
					assertEquals(errors.length, 1)
					assertEquals(errors[0].field, "age")
				}
			)(result)
		})
	})

	await t.step("error path - multiple fields", async (t) => {
		await t.step("accumulates all validation errors", () => {
			const input = {
				name: "",
				email: "invalid",
				age: -5,
			}
			const result = validateUser(input)
			fold<User, void>(
				(_value) => fail("Expected Failure but got Success")
			)(
				(errors) => {
					assertEquals(errors.length, 3)
					const fields = errors.map((e) => e.field)
					assert(fields.includes("name"))
					assert(fields.includes("email"))
					assert(fields.includes("age"))
				}
			)(result)
		})

		await t.step("accumulates two errors", () => {
			const input = {
				name: "",
				email: "invalid",
				age: 25,
			}
			const result = validateUser(input)
			fold<User, void>(
				(_value) => fail("Expected Failure but got Success")
			)(
				(errors) => assertEquals(errors.length, 2)
			)(result)
		})
	})

	await t.step("edge cases", async (t) => {
		await t.step("handles age boundary values", () => {
			const zero = validateUser({ name: "Alice", email: "a@b.com", age: 0 })
			fold<User, void>(
				(_value) => { /* Expected success */ }
			)(
				(_errors) => fail("Expected Success but got Failure")
			)(zero)

			const max = validateUser({ name: "Alice", email: "a@b.com", age: 150 })
			fold<User, void>(
				(_value) => { /* Expected success */ }
			)(
				(_errors) => fail("Expected Success but got Failure")
			)(max)

			const tooOld = validateUser({ name: "Alice", email: "a@b.com", age: 151 })
			fold<User, void>(
				(_value) => fail("Expected Failure but got Success")
			)(
				(_errors) => { /* Expected failure */ }
			)(tooOld)
		})

		await t.step("handles whitespace in name", () => {
			const result = validateUser({ name: "   ", email: "a@b.com", age: 25 })
			fold<User, void>(
				(_value) => fail("Expected Failure but got Success")
			)(
				(_errors) => { /* Expected failure */ }
			)(result)
		})
	})
})
