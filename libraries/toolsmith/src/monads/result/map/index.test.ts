import { assert, assertEquals } from "@std/assert"

import error from "../error/index.ts"
import isError from "../isError/index.ts"
import isOk from "../isOk/index.ts"
import ok from "../ok/index.ts"
import map from "./index.ts"

Deno.test("map", async (t) => {
	await t.step("transforms Ok value", () => {
		const double = (x: number) => x * 2
		const result = map(double)(ok(5))

		assert(isOk(result))
		assertEquals(result.value, 10)
	})

	await t.step("leaves Error unchanged", () => {
		const double = (x: number) => x * 2
		const result = map(double)(error("fail"))

		assert(isError(result))
		assertEquals(result.error, "fail")
	})

	await t.step("works with type transformation", () => {
		const toString = (x: number) => x.toString()
		const result = map(toString)(ok(42))

		assert(isOk(result))
		assertEquals(result.value, "42")
	})

	await t.step("preserves error type", () => {
		const double = (x: number) => x * 2
		const err = { code: 404, message: "Not found" }
		const result = map(double)(error(err))

		assert(isError(result))
		assertEquals(result.error, err)
	})

	await t.step("chains multiple maps", () => {
		const double = (x: number) => x * 2
		const addOne = (x: number) => x + 1
		const result = map(addOne)(map(double)(ok(5)))

		assert(isOk(result))
		assertEquals(result.value, 11)
	})

	await t.step("chains multiple maps with Error", () => {
		const double = (x: number) => x * 2
		const addOne = (x: number) => x + 1
		const result = map(addOne)(map(double)(error("fail")))

		assert(isError(result))
		assertEquals(result.error, "fail")
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
		const compose =
			(gFunc: (x: number) => number) =>
			(fFunc: (x: number) => number) =>
			(x: number) => gFunc(fFunc(x))

		const result = ok(5)
		const left = map(compose(g)(f))(result)
		const right = map(g)(map(f)(result))

		assertEquals(left, right)
	})
})
