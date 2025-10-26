import { assertEquals } from "@std/assert"

import io from "../io/index.ts"
import ioToIoValidation from "./index.ts"

Deno.test("ioToIoValidation", async (t) => {
	await t.step("converts Io<A> to IoValidation<E, A> with Success", () => {
		const simpleIo = io(42)
		const result = ioToIoValidation(simpleIo)
		const value = result()
		assertEquals(value._tag, "Success")
		if (value._tag === "Success") {
			assertEquals(value.value, 42)
		}
	})

	await t.step("wraps the Io computation result in Success", () => {
		const computation = io("hello")
		const result = ioToIoValidation(computation)
		const value = result()
		assertEquals(value._tag, "Success")
		if (value._tag === "Success") {
			assertEquals(value.value, "hello")
		}
	})

	await t.step("defers execution until IoValidation is run", () => {
		let executed = false
		const sideEffectIo = () => {
			executed = true
			return 100
		}
		const result = ioToIoValidation(sideEffectIo)
		assertEquals(executed, false)
		result()
		assertEquals(executed, true)
	})

	await t.step("works with complex types", () => {
		type User = { readonly id: number; readonly name: string }
		type ValidationError = {
			readonly _tag: "ValidationError"
			readonly field: string
			readonly message: string
		}

		const userIo = io<User>({ id: 1, name: "Alice" })
		const result = ioToIoValidation<ValidationError, User>(userIo)
		const value = result()
		assertEquals(value._tag, "Success")
		if (value._tag === "Success") {
			assertEquals(value.value.id, 1)
			assertEquals(value.value.name, "Alice")
		}
	})

	await t.step("can be called multiple times", () => {
		let counter = 0
		const counterIo = () => ++counter
		const result = ioToIoValidation(counterIo)

		const value1 = result()
		const value2 = result()

		assertEquals(value1._tag, "Success")
		assertEquals(value2._tag, "Success")
		if (value1._tag === "Success" && value2._tag === "Success") {
			assertEquals(value1.value, 1)
			assertEquals(value2.value, 2)
		}
	})
})
