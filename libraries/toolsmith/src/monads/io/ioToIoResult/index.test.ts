import { assertEquals } from "@std/assert"

import io from "../io/index.ts"
import ioToIoResult from "./index.ts"

Deno.test("ioToIoResult", async (t) => {
	await t.step("converts Io<A> to IoResult<E, A> with Ok", () => {
		const simpleIo = io(42)
		const result = ioToIoResult(simpleIo)
		const value = result()
		assertEquals(value._tag, "Ok")
		if (value._tag === "Ok") {
			assertEquals(value.value, 42)
		}
	})

	await t.step("wraps the Io computation result in Ok", () => {
		const computation = io("hello")
		const result = ioToIoResult(computation)
		const value = result()
		assertEquals(value._tag, "Ok")
		if (value._tag === "Ok") {
			assertEquals(value.value, "hello")
		}
	})

	await t.step("defers execution until IoResult is run", () => {
		let executed = false
		const sideEffectIo = () => {
			executed = true
			return 100
		}
		const result = ioToIoResult(sideEffectIo)
		assertEquals(executed, false)
		result()
		assertEquals(executed, true)
	})

	await t.step("works with complex types", () => {
		type User = { readonly id: number; readonly name: string }
		const userIo = io<User>({ id: 1, name: "Alice" })
		const result = ioToIoResult<string, User>(userIo)
		const value = result()
		assertEquals(value._tag, "Ok")
		if (value._tag === "Ok") {
			assertEquals(value.value.id, 1)
			assertEquals(value.value.name, "Alice")
		}
	})

	await t.step("can be called multiple times", () => {
		let counter = 0
		const counterIo = () => ++counter
		const result = ioToIoResult(counterIo)

		const value1 = result()
		const value2 = result()

		assertEquals(value1._tag, "Ok")
		assertEquals(value2._tag, "Ok")
		if (value1._tag === "Ok" && value2._tag === "Ok") {
			assertEquals(value1.value, 1)
			assertEquals(value2.value, 2)
		}
	})
})
