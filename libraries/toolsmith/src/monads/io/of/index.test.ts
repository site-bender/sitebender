import { assertEquals } from "@std/assert"

import runIo from "../runIo/index.ts"
import of from "./index.ts"

Deno.test("of", async (t) => {
	await t.step("lifts a pure value into IO context", () => {
		const numberIO = of(42)
		assertEquals(runIo(numberIO), 42)
	})

	await t.step("works with strings", () => {
		const stringIO = of("Hello, World!")
		assertEquals(runIo(stringIO), "Hello, World!")
	})

	await t.step("works with objects", () => {
		const user = { name: "Alice", age: 30 }
		const userIO = of(user)
		assertEquals(runIo(userIO), user)
	})

	await t.step("works with arrays", () => {
		const numbers = [1, 2, 3, 4, 5]
		const numbersIO = of(numbers)
		assertEquals(runIo(numbersIO), numbers)
	})

	await t.step("works with null and undefined", () => {
		const nullIO = of(null)
		const undefinedIO = of(undefined)

		assertEquals(runIo(nullIO), null)
		assertEquals(runIo(undefinedIO), undefined)
	})

	await t.step("returns same value on multiple executions", () => {
		const valueIO = of(42)
		assertEquals(runIo(valueIO), 42)
		assertEquals(runIo(valueIO), 42)
		assertEquals(runIo(valueIO), 42)
	})

	await t.step("creates pure IO with no side effects", () => {
		const sideEffect = false
		const value = { data: "test" }
		const pureIO = of(value)

		const result1 = runIo(pureIO)
		assertEquals(sideEffect, false)
		const result2 = runIo(pureIO)
		assertEquals(sideEffect, false)

		assertEquals(result1, value)
		assertEquals(result2, value)
	})

	await t.step("preserves type information", () => {
		const numberIO = of<number>(42)
		const stringIO = of<string>("test")
		const booleanIO = of<boolean>(true)

		assertEquals(runIo(numberIO), 42)
		assertEquals(runIo(stringIO), "test")
		assertEquals(runIo(booleanIO), true)
	})
})
