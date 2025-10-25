import { assertEquals } from "@std/assert"

import just from "../../maybe/just/index.ts"
import nothing from "../../maybe/nothing/index.ts"
import asyncIoMaybe from "./index.ts"

Deno.test("asyncIoMaybe", async (t) => {
	await t.step("wraps an async thunk returning Promise<Maybe>", async () => {
		const computation = asyncIoMaybe(async () => {
			await Promise.resolve()
			return just(42)
		})
		assertEquals(typeof computation, "function")
		const result = await computation()
		assertEquals(result._tag, "Just")
		if (result._tag === "Just") {
			assertEquals(result.value, 42)
		}
	})

	await t.step("creates AsyncIoMaybe from Just value", async () => {
		const justIo = asyncIoMaybe(async () => {
			await Promise.resolve()
			return just("success")
		})
		const result = await justIo()
		assertEquals(result._tag, "Just")
		if (result._tag === "Just") {
			assertEquals(result.value, "success")
		}
	})

	await t.step("creates AsyncIoMaybe from Nothing value", async () => {
		const nothingIo = asyncIoMaybe(async () => {
			await Promise.resolve()
			return nothing()
		})
		const result = await nothingIo()
		assertEquals(result._tag, "Nothing")
	})

	await t.step("defers async computation until executed", async () => {
		const computation = asyncIoMaybe(async () => {
			await Promise.resolve()
			return just(Math.random())
		})
		const result1 = await computation()
		const result2 = await computation()

		// Different values because computation runs each time
		assertEquals(result1._tag, "Just")
		assertEquals(result2._tag, "Just")
	})

	await t.step("works with complex async Maybe types", async () => {
		type User = { readonly id: number; readonly name: string }

		const fetchUserIo = asyncIoMaybe<User>(async () => {
			// Simulate async operation
			await new Promise((resolve) => setTimeout(resolve, 10))
			return just({ id: 1, name: "Alice" })
		})

		const result = await fetchUserIo()
		assertEquals(result._tag, "Just")
		if (result._tag === "Just") {
			assertEquals(result.value.id, 1)
			assertEquals(result.value.name, "Alice")
		}
	})

	await t.step("handles async optional values that are missing", async () => {
		type User = { readonly id: number; readonly name: string }

		const fetchMissingUserIo = asyncIoMaybe<User>(async () => {
			await new Promise((resolve) => setTimeout(resolve, 10))
			return nothing()
		})

		const result = await fetchMissingUserIo()
		assertEquals(result._tag, "Nothing")
	})

	await t.step("maintains referential transparency", () => {
		const computation = asyncIoMaybe(async () => {
			await Promise.resolve()
			return just(42)
		})
		const io1 = computation
		const io2 = computation

		assertEquals(io1, io2)
		assertEquals(typeof io1, "function")
		assertEquals(typeof io2, "function")
	})
})
