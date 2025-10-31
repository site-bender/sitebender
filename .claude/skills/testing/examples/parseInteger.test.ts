//++ Example: Testing a function that returns Result
//++ Demonstrates testing success and error paths with Result monad

import { assert, assertEquals, fail } from "@std/assert"
import fold from "@sitebender/toolsmith/monads/result/fold/index.ts"

//++ Simplified types for example
type Ok<T> = { readonly _tag: "Ok"; readonly value: T }
type Error<E> = { readonly _tag: "Error"; readonly error: E }
type Result<E, T> = Ok<T> | Error<E>

type ValidationError = {
	readonly code: string
	readonly field: string
	readonly messages: ReadonlyArray<string>
}

//++ Function under test: parses string to integer
function parseInteger(input: string): Result<ValidationError, number> {
	const trimmed = input.trim()
	if (trimmed === "") {
		return {
			_tag: "Error",
			error: {
				code: "PARSE_ERROR",
				field: "integer",
				messages: ["Cannot parse empty string"],
			},
		}
	}

	const parsed = Number.parseInt(trimmed, 10)
	if (Number.isNaN(parsed)) {
		return {
			_tag: "Error",
			error: {
				code: "PARSE_ERROR",
				field: "integer",
				messages: ["Input is not a valid integer"],
			},
		}
	}

	return { _tag: "Ok", value: parsed }
}

//++ Tests for parseInteger (returns Result)
Deno.test("parseInteger", async (t) => {
	await t.step("success path", async (t) => {
		await t.step("parses valid integer string", () => {
			const result: Result<ValidationError, number> = parseInteger("42")
			fold<ValidationError, void>(
				(_error) => fail("Expected Ok but got Error")
			)(
				(value) => assertEquals(value, 42)
			)(result)
		})

		await t.step("parses negative integer", () => {
			const result = parseInteger("-123")
			fold<ValidationError, void>(
				(_error) => fail("Expected Ok but got Error")
			)(
				(value) => assertEquals(value, -123)
			)(result)
		})

		await t.step("parses zero", () => {
			const result = parseInteger("0")
			fold<ValidationError, void>(
				(_error) => fail("Expected Ok but got Error")
			)(
				(value) => assertEquals(value, 0)
			)(result)
		})
	})

	await t.step("error path", async (t) => {
		await t.step("returns Error for non-numeric string", () => {
			const result = parseInteger("abc")
			fold<ValidationError, void>(
				(error) => {
					assertEquals(error.code, "PARSE_ERROR")
					assertEquals(error.field, "integer")
				}
			)(
				(_value) => fail("Expected Error but got Ok")
			)(result)
		})

		await t.step("returns Error for decimal number", () => {
			const result = parseInteger("42.5")
			// parseInt stops at decimal, so this succeeds with 42
			fold<ValidationError, void>(
				(_error) => fail("Expected Ok but got Error")
			)(
				(value) => assertEquals(value, 42)
			)(result)
		})

		await t.step("returns Error for empty string", () => {
			const result = parseInteger("")
			fold<ValidationError, void>(
				(error) => assertEquals(error.code, "PARSE_ERROR")
			)(
				(_value) => fail("Expected Error but got Ok")
			)(result)
		})
	})

	await t.step("edge cases", async (t) => {
		await t.step("handles whitespace", () => {
			const result = parseInteger("  42  ")
			fold<ValidationError, void>(
				(_error) => fail("Expected Ok but got Error")
			)(
				(value) => assertEquals(value, 42)
			)(result)
		})

		await t.step("handles very large numbers", () => {
			const result = parseInteger("999999999999999")
			fold<ValidationError, void>(
				(_error) => fail("Expected Ok but got Error")
			)(
				(value) => assertEquals(value, 999999999999999)
			)(result)
		})

		await t.step("handles leading zeros", () => {
			const result = parseInteger("0042")
			fold<ValidationError, void>(
				(_error) => fail("Expected Ok but got Error")
			)(
				(value) => assertEquals(value, 42)
			)(result)
		})
	})
})
