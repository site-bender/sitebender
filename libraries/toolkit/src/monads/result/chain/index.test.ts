import { assertEquals } from "@std/assert"

import ok from "../ok/index.ts"
import err from "../err/index.ts"
import chain from "./index.ts"

Deno.test("chain", async (t) => {
	await t.step("chains Ok to Ok", () => {
		const double = (x: number) => ok(x * 2)
		const result = chain(double)(ok(5))
		assertEquals(result._tag, "Right")
		assertEquals((result as any).right, 10)
	})

	await t.step("chains Ok to Err", () => {
		const safeDivide = (x: number) => x === 0
			? err("Division by zero")
			: ok(10 / x)

		const result = chain(safeDivide)(ok(0))
		assertEquals(result._tag, "Left")
		assertEquals((result as any).left, "Division by zero")
	})

	await t.step("short-circuits on Err", () => {
		const double = (x: number) => ok(x * 2)
		const result = chain(double)(err("previous error"))
		assertEquals(result._tag, "Left")
		assertEquals((result as any).left, "previous error")
	})

	await t.step("chains multiple operations", () => {
		const safeDivide = (divisor: number) => (x: number) =>
			divisor === 0 ? err("Division by zero") : ok(x / divisor)

		const result = chain(safeDivide(2))(chain(safeDivide(5))(ok(100)))
		assertEquals(result._tag, "Right")
		assertEquals((result as any).right, 10)
	})

	await t.step("stops at first error in chain", () => {
		const safeDivide = (divisor: number) => (x: number) =>
			divisor === 0 ? err(`Cannot divide by ${divisor}`) : ok(x / divisor)

		const result = chain(safeDivide(2))(chain(safeDivide(0))(ok(100)))
		assertEquals(result._tag, "Left")
		assertEquals((result as any).left, "Cannot divide by 0")
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
		const parseAndDouble = (s: string) => {
			const n = parseInt(s)
			return isNaN(n) ? err("Not a number") : ok(n * 2)
		}

		assertEquals(
			chain(parseAndDouble)(ok("21")),
			ok(42)
		)
		assertEquals(
			chain(parseAndDouble)(ok("abc")),
			err("Not a number")
		)
	})
})
