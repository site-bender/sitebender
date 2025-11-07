//++ Example: Testing a function with error cases using Result
//++ Demonstrates testing Result with domain-specific errors

import { assert, assertEquals, fail } from "@std/assert"
import fold from "@sitebender/toolsmith/monads/result/fold/index.ts"

//++ Simplified types for example
type Ok<T> = { readonly _tag: "Ok"; readonly value: T }
type Error<E> = { readonly _tag: "Error"; readonly error: E }
type Result<E, T> = Ok<T> | Error<E>

type DivisionError = {
	readonly code: "DIVISION_BY_ZERO"
	readonly message: string
}

//++ Function under test: curried division with error handling
function divide(dividend: number) {
	return function divideByDividend(divisor: number): Result<DivisionError, number> {
		if (divisor === 0) {
			return {
				_tag: "Error",
				error: {
					code: "DIVISION_BY_ZERO",
					message: "Cannot divide by zero",
				},
			}
		}
		return { _tag: "Ok", value: dividend / divisor }
	}
}

//++ Tests for divide (returns Result)
Deno.test("divide", async (t) => {
	await t.step("success path", async (t) => {
		await t.step("divides positive numbers", () => {
			const result = divide(10)(2)
			fold<DivisionError, void>(
				(_error) => fail("Expected Ok but got Error")
			)(
				(value) => assertEquals(value, 5)
			)(result)
		})

		await t.step("divides negative numbers", () => {
			const result1 = divide(-10)(2)
			fold<DivisionError, void>(
				(_error) => fail("Expected Ok but got Error")
			)(
				(value) => assertEquals(value, -5)
			)(result1)

			const result2 = divide(10)(-2)
			fold<DivisionError, void>(
				(_error) => fail("Expected Ok but got Error")
			)(
				(value) => assertEquals(value, -5)
			)(result2)
		})

		await t.step("divides by one", () => {
			const result = divide(42)(1)
			fold<DivisionError, void>(
				(_error) => fail("Expected Ok but got Error")
			)(
				(value) => assertEquals(value, 42)
			)(result)
		})
	})

	await t.step("error path", async (t) => {
		await t.step("returns Error for division by zero", () => {
			const result = divide(10)(0)
			fold<DivisionError, void>(
				(error) => {
					assertEquals(error.code, "DIVISION_BY_ZERO")
					assertEquals(error.message, "Cannot divide by zero")
				}
			)(
				(_value) => fail("Expected Error but got Ok")
			)(result)
		})

		await t.step("returns Error for zero dividend divided by zero", () => {
			const result = divide(0)(0)
			fold<DivisionError, void>(
				(error) => assertEquals(error.code, "DIVISION_BY_ZERO")
			)(
				(_value) => fail("Expected Error but got Ok")
			)(result)
		})
	})

	await t.step("partial application", async (t) => {
		await t.step("creates reusable division function", () => {
			const divideBy2 = divide(10)
			const result1 = divideBy2(2)
			const result2 = divideBy2(5)

			fold<DivisionError, void>(
				(_error) => fail("Expected Ok but got Error")
			)(
				(value) => assertEquals(value, 5)
			)(result1)

			fold<DivisionError, void>(
				(_error) => fail("Expected Ok but got Error")
			)(
				(value) => assertEquals(value, 2)
			)(result2)
		})

		await t.step("partial handles error consistently", () => {
			const divideBy2 = divide(10)
			const result1 = divideBy2(0)
			const result2 = divideBy2(0)

			fold<DivisionError, void>(
				(_error) => { /* Expected error */ }
			)(
				(_value) => fail("Expected Error but got Ok")
			)(result1)

			fold<DivisionError, void>(
				(_error) => { /* Expected error */ }
			)(
				(_value) => fail("Expected Error but got Ok")
			)(result2)
		})
	})

	await t.step("edge cases", async (t) => {
		await t.step("handles infinity result", () => {
			const result = divide(1)(0.00000001)
			fold<DivisionError, void>(
				(_error) => fail("Expected Ok but got Error")
			)(
				(_value) => { /* Just verifying it succeeds */ }
			)(result)
		})

		await t.step("handles very small divisor", () => {
			const result = divide(1)(Number.MIN_VALUE)
			fold<DivisionError, void>(
				(_error) => fail("Expected Ok but got Error")
			)(
				(_value) => { /* Just verifying it succeeds */ }
			)(result)
		})
	})
})
