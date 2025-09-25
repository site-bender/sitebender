import { assert, assertEquals } from "@std/assert"

import type { Result } from "../../../types/fp/result/index.ts"

import error from "../error/index.ts"
import isError from "../isError/index.ts"
import isOk from "../isOk/index.ts"
import ok from "../ok/index.ts"
import chain from "./index.ts"

Deno.test("chain", async (t) => {
	await t.step("chains Ok to Ok", () => {
		const double = (x: number) => ok(x * 2)

		const result = chain(double)(ok(5))

		assert(isOk(result))
		assertEquals(result.value, 10)
	})

	await t.step("chains Ok to Error", () => {
		const safeDivide = (x: number): Result<string, number> =>
			x === 0 ? error("Division by zero") : ok(10 / x)

		const result = chain(safeDivide)(ok(0))

		assert(isError(result))
		assertEquals(result.error, "Division by zero")
	})

	await t.step("short-circuits on Error", () => {
		const double = (x: number): Result<string, number> => ok(x * 2)
		const errorInput: Result<string, number> = error("previous error")

		const result = chain(double)(errorInput)

		assert(isError(result))
		assertEquals(result.error, "previous error")
	})

	await t.step("chains multiple operations", () => {
		const safeDivide =
			(divisor: number) => (x: number): Result<string, number> =>
				divisor === 0 ? error("Division by zero") : ok(x / divisor)

		const divideBy5 = chain(safeDivide(5))
		const divideBy2 = chain(safeDivide(2))

		const result = divideBy2(divideBy5(ok(100)))

		assert(isOk(result))
		assertEquals(result.value, 10)
	})

	await t.step("stops at first error in chain", () => {
		const safeDivide =
			(divisor: number) => (x: number): Result<string, number> =>
				divisor === 0 ? error(`Cannot divide by ${divisor}`) : ok(x / divisor)

		const divideBy0 = chain(safeDivide(0))
		const divideBy2 = chain(safeDivide(2))

		const result = divideBy2(divideBy0(ok(100)))

		assert(isError(result))
		assertEquals(result.error, "Cannot divide by 0")
	})

	await t.step("satisfies left identity monad law", () => {
		const value = 42
		const f = (x: number) => ok(x * 2)

		const left = chain(f)(ok(value))
		const right = f(value)

		assertEquals(left, right)
	})

	await t.step("satisfies right identity monad law", () => {
		const m = ok(42)

		const result = chain(ok)(m)

		assertEquals(result, m)
	})

	await t.step("satisfies associativity monad law", () => {
		const m = ok(10)
		const f = (x: number) => ok(x * 2)
		const g = (x: number) => ok(x + 5)

		const left = chain(g)(chain(f)(m))
		const right = chain((x: number) => chain(g)(f(x)))(m)

		assertEquals(left, right)
	})

	await t.step("works with different types", () => {
		const parseAndDouble = (s: string): Result<string, number> => {
			const n = parseInt(s)

			return isNaN(n) ? error("Not a number") : ok(n * 2)
		}

		const validResult = chain(parseAndDouble)(ok("21"))

		assert(isOk(validResult))
		assertEquals(validResult.value, 42)

		const invalidResult = chain(parseAndDouble)(ok("abc"))

		assert(isError(invalidResult))
		assertEquals(invalidResult.error, "Not a number")
	})
})
