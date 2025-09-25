import { assertEquals } from "@std/assert"

import runIO from "../runIO/index.ts"
import io from "./index.ts"

Deno.test("io", async (t) => {
	await t.step("wraps a value in a thunk", () => {
		const computation = io(42)
		assertEquals(typeof computation, "function")
		assertEquals(computation(), 42)
	})

	await t.step("creates IO from primitive values", () => {
		const numberIO = io(42)
		const stringIO = io("hello")
		const booleanIO = io(true)

		assertEquals(runIO(numberIO), 42)
		assertEquals(runIO(stringIO), "hello")
		assertEquals(runIO(booleanIO), true)
	})

	await t.step("creates IO from objects", () => {
		const user = { id: 1, name: "Alice" }
		const userIO = io(user)
		assertEquals(runIO(userIO), user)
	})

	await t.step("creates IO from arrays", () => {
		const numbers = [1, 2, 3, 4, 5]
		const numbersIO = io(numbers)
		assertEquals(runIO(numbersIO), numbers)
	})

	await t.step("handles null and undefined", () => {
		const nullIO = io(null)
		const undefinedIO = io(undefined)

		assertEquals(runIO(nullIO), null)
		assertEquals(runIO(undefinedIO), undefined)
	})

	await t.step("returns same value on multiple executions", () => {
		const valueIO = io(42)
		assertEquals(runIO(valueIO), 42)
		assertEquals(runIO(valueIO), 42)
		assertEquals(runIO(valueIO), 42)
	})

	await t.step("maintains referential transparency", () => {
		const value = { data: "test" }
		const computation = io(value)
		const io1 = computation
		const io2 = computation

		assertEquals(io1, io2)
		assertEquals(typeof io1, "function")
		assertEquals(typeof io2, "function")
		assertEquals(runIO(io1), value)
		assertEquals(runIO(io2), value)
	})
})
