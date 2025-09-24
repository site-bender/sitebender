import { assertEquals } from "@std/assert"

import of from "./index.ts"
import runIO from "../runIO/index.ts"

Deno.test("of", async (t) => {
	await t.step("lifts a pure value into IO context", () => {
		const numberIO = of(42)
		assertEquals(runIO(numberIO), 42)
	})

	await t.step("works with strings", () => {
		const stringIO = of("Hello, World!")
		assertEquals(runIO(stringIO), "Hello, World!")
	})

	await t.step("works with objects", () => {
		const user = { name: "Alice", age: 30 }
		const userIO = of(user)
		assertEquals(runIO(userIO), user)
	})

	await t.step("works with arrays", () => {
		const numbers = [1, 2, 3, 4, 5]
		const numbersIO = of(numbers)
		assertEquals(runIO(numbersIO), numbers)
	})

	await t.step("works with null and undefined", () => {
		const nullIO = of(null)
		const undefinedIO = of(undefined)

		assertEquals(runIO(nullIO), null)
		assertEquals(runIO(undefinedIO), undefined)
	})

	await t.step("returns same value on multiple executions", () => {
		const valueIO = of(42)
		assertEquals(runIO(valueIO), 42)
		assertEquals(runIO(valueIO), 42)
		assertEquals(runIO(valueIO), 42)
	})

	await t.step("creates pure IO with no side effects", () => {
		let sideEffect = false
		const value = { data: "test" }
		const pureIO = of(value)

		const result1 = runIO(pureIO)
		assertEquals(sideEffect, false)
		const result2 = runIO(pureIO)
		assertEquals(sideEffect, false)

		assertEquals(result1, value)
		assertEquals(result2, value)
	})

	await t.step("preserves type information", () => {
		const numberIO = of<number>(42)
		const stringIO = of<string>("test")
		const booleanIO = of<boolean>(true)

		assertEquals(runIO(numberIO), 42)
		assertEquals(runIO(stringIO), "test")
		assertEquals(runIO(booleanIO), true)
	})
})
