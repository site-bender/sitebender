import { assertEquals } from "@std/assert"

import just from "../../maybe/just/index.ts"
import nothing from "../../maybe/nothing/index.ts"
import asyncIoMaybe from "../asyncIoMaybe/index.ts"
import runAsyncIoMaybe from "./index.ts"

Deno.test("runAsyncIoMaybe", async (t) => {
	await t.step("executes AsyncIoMaybe and returns Just", async () => {
		const asyncIo = asyncIoMaybe(async () => {
			await Promise.resolve()
			return just(42)
		})
		const result = await runAsyncIoMaybe(asyncIo)
		assertEquals(result._tag, "Just")
		if (result._tag === "Just") {
			assertEquals(result.value, 42)
		}
	})

	await t.step("executes AsyncIoMaybe and returns Nothing", async () => {
		const asyncIo = asyncIoMaybe(async () => {
			await Promise.resolve()
			return nothing()
		})
		const result = await runAsyncIoMaybe(asyncIo)
		assertEquals(result._tag, "Nothing")
	})

	await t.step("actually awaits the async computation", async () => {
		let executed = false
		const asyncIo = asyncIoMaybe(async () => {
			await new Promise((resolve) => setTimeout(resolve, 10))
			executed = true
			return just("done")
		})

		assertEquals(executed, false)
		const result = await runAsyncIoMaybe(asyncIo)
		assertEquals(executed, true)
		assertEquals(result._tag, "Just")
	})

	await t.step("works with complex types", async () => {
		type User = { readonly id: number; readonly name: string }

		const asyncIo = asyncIoMaybe<User>(async () => {
			await new Promise((resolve) => setTimeout(resolve, 10))
			return just({ id: 1, name: "Alice" })
		})

		const result = await runAsyncIoMaybe(asyncIo)
		assertEquals(result._tag, "Just")
		if (result._tag === "Just") {
			assertEquals(result.value.id, 1)
			assertEquals(result.value.name, "Alice")
		}
	})

	await t.step("handles optional values that are missing", async () => {
		type User = { readonly id: number; readonly name: string }

		const asyncIo = asyncIoMaybe<User>(async () => {
			await new Promise((resolve) => setTimeout(resolve, 10))
			return nothing()
		})

		const result = await runAsyncIoMaybe(asyncIo)
		assertEquals(result._tag, "Nothing")
	})

	await t.step("can be called multiple times", async () => {
		let counter = 0
		const asyncIo = asyncIoMaybe(async () => {
			await Promise.resolve()
			counter++
			return just(counter)
		})

		const result1 = await runAsyncIoMaybe(asyncIo)
		const result2 = await runAsyncIoMaybe(asyncIo)

		assertEquals(result1._tag, "Just")
		assertEquals(result2._tag, "Just")
		if (result1._tag === "Just" && result2._tag === "Just") {
			assertEquals(result1.value, 1)
			assertEquals(result2.value, 2)
		}
	})
})
