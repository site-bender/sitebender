import { assertEquals } from "@std/assert"

import runIo from "../runIo/index.ts"
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

		assertEquals(runIo(numberIO), 42)
		assertEquals(runIo(stringIO), "hello")
		assertEquals(runIo(booleanIO), true)
	})

	await t.step("creates IO from objects", () => {
		const user = { id: 1, name: "Alice" }
		const userIO = io(user)
		assertEquals(runIo(userIO), user)
	})

	await t.step("creates IO from arrays", () => {
		const numbers = [1, 2, 3, 4, 5]
		const numbersIO = io(numbers)
		assertEquals(runIo(numbersIO), numbers)
	})

	await t.step("handles null and undefined", () => {
		const nullIO = io(null)
		const undefinedIO = io(undefined)

		assertEquals(runIo(nullIO), null)
		assertEquals(runIo(undefinedIO), undefined)
	})

	await t.step("returns same value on multiple executions", () => {
		const valueIO = io(42)
		assertEquals(runIo(valueIO), 42)
		assertEquals(runIo(valueIO), 42)
		assertEquals(runIo(valueIO), 42)
	})

	await t.step("maintains referential transparency", () => {
		const value = { data: "test" }
		const computation = io(value)
		const io1 = computation
		const io2 = computation

		assertEquals(io1, io2)
		assertEquals(typeof io1, "function")
		assertEquals(typeof io2, "function")
		assertEquals(runIo(io1), value)
		assertEquals(runIo(io2), value)
	})
})
