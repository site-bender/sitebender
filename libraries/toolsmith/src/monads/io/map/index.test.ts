import { assertEquals } from "@std/assert"

import of from "../of/index.ts"
import runIo from "../runIo/index.ts"
import map from "./index.ts"

Deno.test("map", async (t) => {
	await t.step("transforms the value inside an IO", () => {
		const numberIO = of(21)
		const doubledIO = map((x: number) => x * 2)(numberIO)
		assertEquals(runIo(doubledIO), 42)
	})

	await t.step("works with different types", () => {
		const numberIO = of(42)
		const stringIO = map((x: number) => x.toString())(numberIO)
		assertEquals(runIo(stringIO), "42")
	})

	await t.step("chains multiple maps", () => {
		const initialIO = of(5)
		const result = map((x: number) => x.toString())(
			map((x: number) => x + 10)(
				map((x: number) => x * 2)(initialIO),
			),
		)
		assertEquals(runIo(result), "20")
	})

	await t.step("defers transformation until executed", () => {
		let executed = false
		const sourceIO = () => {
			executed = true
			return 10
		}

		const mappedIO = map((x: number) => x * 2)(sourceIO)
		assertEquals(executed, false)

		const result = runIo(mappedIO)
		assertEquals(executed, true)
		assertEquals(result, 20)
	})

	await t.step("satisfies functor identity law", () => {
		const identity = <T>(x: T) => x
		const sourceIO = of(42)
		const mappedIO = map(identity)(sourceIO)

		assertEquals(runIo(mappedIO), runIo(sourceIO))
	})

	await t.step("satisfies functor composition law", () => {
		const f = (x: number): number => x * 2
		const g = (x: number): number => x + 10
		const composed = (x: number): number => g(f(x))

		const sourceIO = of(5)
		const left = map(composed)(sourceIO)
		const right = map(g)(map(f)(sourceIO))

		assertEquals(runIo(left), runIo(right))
		assertEquals(runIo(left), 20) // (5 * 2) + 10 = 20
	})

	await t.step("works with effectful computations", () => {
		let counter = 0
		const effectfulIO = () => ++counter
		const doubledIO = map((x: number) => x * 2)(effectfulIO)

		assertEquals(runIo(doubledIO), 2)
		assertEquals(runIo(doubledIO), 4)
		assertEquals(runIo(doubledIO), 6)
	})

	await t.step("can transform to objects", () => {
		const numberIO = of(42)
		const objectIO = map((x: number) => ({ value: x, doubled: x * 2 }))(
			numberIO,
		)
		assertEquals(runIo(objectIO), { value: 42, doubled: 84 })
	})

	await t.step("preserves referential transparency", () => {
		const sourceIO = of(10)
		const mappedIO = map((x: number) => x * 2)(sourceIO)

		const result1 = runIo(mappedIO)
		const result2 = runIo(mappedIO)

		assertEquals(result1, 20)
		assertEquals(result2, 20)
	})
})
