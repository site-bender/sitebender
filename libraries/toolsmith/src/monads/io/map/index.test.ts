import { assertEquals } from "@std/assert"

import io from "../io/index.ts"
import of from "../of/index.ts"
import runIO from "../runIO/index.ts"
import map from "./index.ts"

Deno.test("map", async (t) => {
	await t.step("transforms the value inside an IO", () => {
		const numberIO = of(21)
		const doubledIO = map((x: number) => x * 2)(numberIO)
		assertEquals(runIO(doubledIO), 42)
	})

	await t.step("works with different types", () => {
		const numberIO = of(42)
		const stringIO = map((x: number) => x.toString())(numberIO)
		assertEquals(runIO(stringIO), "42")
	})

	await t.step("chains multiple maps", () => {
		const initialIO = of(5)
		const result = map((x: number) => x.toString())(
			map((x: number) => x + 10)(
				map((x: number) => x * 2)(initialIO)
			)
		)
		assertEquals(runIO(result), "20")
	})

	await t.step("defers transformation until executed", () => {
		let executed = false
		const sourceIO = () => {
			executed = true
			return 10
		}

		const mappedIO = map((x: number) => x * 2)(sourceIO)
		assertEquals(executed, false)

		const result = runIO(mappedIO)
		assertEquals(executed, true)
		assertEquals(result, 20)
	})

	await t.step("satisfies functor identity law", () => {
		const identity = <T>(x: T) => x
		const sourceIO = of(42)
		const mappedIO = map(identity)(sourceIO)

		assertEquals(runIO(mappedIO), runIO(sourceIO))
	})

	await t.step("satisfies functor composition law", () => {
		const f = (x: number) => x * 2
		const g = (x: number) => x + 10
		const compose = <A, B, C>(f: (b: B) => C) => (g: (a: A) => B) => (a: A) => f(g(a))

		const sourceIO = of(5)
		const left = map(compose(g)(f))(sourceIO)
		const right = map(g)(map(f)(sourceIO))

		assertEquals(runIO(left), runIO(right))
	})

	await t.step("works with effectful computations", () => {
		let counter = 0
		const effectfulIO = () => ++counter
		const doubledIO = map((x: number) => x * 2)(effectfulIO)

		assertEquals(runIO(doubledIO), 2)
		assertEquals(runIO(doubledIO), 4)
		assertEquals(runIO(doubledIO), 6)
	})

	await t.step("can transform to objects", () => {
		const numberIO = of(42)
		const objectIO = map((x: number) => ({ value: x, doubled: x * 2 }))(numberIO)
		assertEquals(runIO(objectIO), { value: 42, doubled: 84 })
	})

	await t.step("preserves referential transparency", () => {
		const sourceIO = of(10)
		const mappedIO = map((x: number) => x * 2)(sourceIO)

		const result1 = runIO(mappedIO)
		const result2 = runIO(mappedIO)

		assertEquals(result1, 20)
		assertEquals(result2, 20)
	})
})
