import { assertEquals } from "@std/assert"

import ok from "../ok/index.ts"
import err from "../err/index.ts"
import map from "./index.ts"

Deno.test("map", async (t) => {
	await t.step("transforms Ok value", () => {
		const double = (x: number) => x * 2
		const result = map(double)(ok(5))
		assertEquals(result._tag, "Right")
		assertEquals((result as any).right, 10)
	})

	await t.step("leaves Err unchanged", () => {
		const double = (x: number) => x * 2
		const result = map(double)(err("fail"))
		assertEquals(result._tag, "Left")
		assertEquals((result as any).left, "fail")
	})

	await t.step("works with type transformation", () => {
		const toString = (x: number) => x.toString()
		const result = map(toString)(ok(42))
		assertEquals(result._tag, "Right")
		assertEquals((result as any).right, "42")
	})

	await t.step("preserves error type", () => {
		const double = (x: number) => x * 2
		const error = { code: 404, message: "Not found" }
		const result = map(double)(err(error))
		assertEquals(result._tag, "Left")
		assertEquals((result as any).left, error)
	})

	await t.step("chains multiple maps", () => {
		const double = (x: number) => x * 2
		const addOne = (x: number) => x + 1
		const result = map(addOne)(map(double)(ok(5)))
		assertEquals(result._tag, "Right")
		assertEquals((result as any).right, 11)
	})

	await t.step("chains multiple maps with Err", () => {
		const double = (x: number) => x * 2
		const addOne = (x: number) => x + 1
		const result = map(addOne)(map(double)(err("fail")))
		assertEquals(result._tag, "Left")
		assertEquals((result as any).left, "fail")
	})

	await t.step("satisfies functor identity law", () => {
		const identity = <T>(x: T) => x
		const result = ok(42)
		const mapped = map(identity)(result)
		assertEquals(mapped, result)
	})

	await t.step("satisfies functor composition law", () => {
		const f = (x: number) => x * 2
		const g = (x: number) => x + 10
		const compose = <A, B, C>(f: (b: B) => C) => (g: (a: A) => B) => (a: A) => f(g(a))

		const result = ok(5)
		const left = map(compose(g)(f))(result)
		const right = map(g)(map(f)(result))
		assertEquals(left, right)
	})
})
