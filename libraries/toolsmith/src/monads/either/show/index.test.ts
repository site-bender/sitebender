import { assertEquals } from "@std/assert"

import left from "../left/index.ts"
import right from "../right/index.ts"
import show from "./index.ts"

Deno.test("show", async (t) => {
	await t.step("formats Left with string error", () => {
		const result = show(left<string, number>("error message"))

		assertEquals(result, 'Left("error message")')
	})

	await t.step("formats Right with number value", () => {
		const result = show(right<number, string>(42))

		assertEquals(result, "Right(42)")
	})

	await t.step("formats Right with string value", () => {
		const result = show(right<string, number>("hello"))

		assertEquals(result, 'Right("hello")')
	})

	await t.step("formats Left with Error instance", () => {
		const error = new Error("Something went wrong")
		const result = show(left<Error, number>(error))

		assertEquals(result, "Left(Error: Something went wrong)")
	})

	await t.step("formats Right with Date value", () => {
		const date = new Date("2024-01-01T00:00:00.000Z")
		const result = show(right<Date, string>(date))

		assertEquals(result.includes("Right("), true)
		assertEquals(result.includes("2024"), true)
	})

	await t.step("formats Left with null", () => {
		const result = show(left<null, number>(null))

		assertEquals(result, "Left(null)")
	})

	await t.step("formats Right with undefined", () => {
		const result = show(right<undefined, string>(undefined))

		assertEquals(result, "Right(undefined)")
	})

	await t.step("formats Right with boolean", () => {
		const result = show(right<boolean, string>(true))

		assertEquals(result, "Right(true)")
	})

	await t.step("formats Left with complex object", () => {
		type ValidationError = {
			readonly field: string
			readonly code: number
		}

		const error: ValidationError = {
			field: "email",
			code: 400,
		}

		const result = show(left<ValidationError, string>(error))

		assertEquals(result.includes("Left("), true)
		assertEquals(result.includes("email"), true)
		assertEquals(result.includes("400"), true)
	})

	await t.step("formats Right with array", () => {
		const result = show(right<Array<number>, string>([1, 2, 3]))

		assertEquals(result, "Right([1,2,3])")
	})

	await t.step("formats Right with function", () => {
		function namedFunction() {
			return 42
		}

		const result = show(right<() => number, string>(namedFunction))

		assertEquals(result, "Right([Function: namedFunction])")
	})

	await t.step("formats Right with anonymous function", () => {
		const anonymousFn = function () {
			return 42
		}

		const result = show(right<() => number, string>(anonymousFn))

		assertEquals(result, "Right([Function: anonymousFn])")
	})

	await t.step("formats Right with symbol", () => {
		const sym = Symbol("test")
		const result = show(right<symbol, string>(sym))

		assertEquals(result, "Right(Symbol(test))")
	})

	await t.step("formats Left with nested object", () => {
		const nested = {
			outer: {
				inner: {
					value: 42,
				},
			},
		}

		const result = show(left(nested))

		assertEquals(result.includes("Left("), true)
		assertEquals(result.includes("outer"), true)
		assertEquals(result.includes("inner"), true)
		assertEquals(result.includes("42"), true)
	})
})
