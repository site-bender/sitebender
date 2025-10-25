import { assertEquals } from "@std/assert"

import left from "../../either/left/index.ts"
import right from "../../either/right/index.ts"
import asyncIoEither from "../asyncIoEither/index.ts"
import runAsyncIoEither from "./index.ts"

Deno.test("runAsyncIoEither", async (t) => {
	await t.step("executes AsyncIoEither and returns Right", async () => {
		const asyncIo = asyncIoEither(async () => {
			await Promise.resolve()
			return right(42)
		})
		const result = await runAsyncIoEither(asyncIo)
		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right, 42)
		}
	})

	await t.step("executes AsyncIoEither and returns Left", async () => {
		const asyncIo = asyncIoEither(async () => {
			await Promise.resolve()
			return left("alternative")
		})
		const result = await runAsyncIoEither(asyncIo)
		assertEquals(result._tag, "Left")
		if (result._tag === "Left") {
			assertEquals(result.left, "alternative")
		}
	})

	await t.step("actually awaits the async computation", async () => {
		let executed = false
		const asyncIo = asyncIoEither(async () => {
			await new Promise((resolve) => setTimeout(resolve, 10))
			executed = true
			return right("done")
		})

		assertEquals(executed, false)
		const result = await runAsyncIoEither(asyncIo)
		assertEquals(executed, true)
		assertEquals(result._tag, "Right")
	})

	await t.step("works with branching logic - Right path", async () => {
		type CachedData = { readonly source: "cache"; readonly data: string }
		type FreshData = { readonly source: "api"; readonly data: string }

		const asyncIo = asyncIoEither<CachedData, FreshData>(async () => {
			await new Promise((resolve) => setTimeout(resolve, 10))
			return right({ source: "api", data: "fresh data" })
		})

		const result = await runAsyncIoEither(asyncIo)
		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right.source, "api")
			assertEquals(result.right.data, "fresh data")
		}
	})

	await t.step("works with branching logic - Left path", async () => {
		type CachedData = { readonly source: "cache"; readonly data: string }
		type FreshData = { readonly source: "api"; readonly data: string }

		const asyncIo = asyncIoEither<CachedData, FreshData>(async () => {
			await new Promise((resolve) => setTimeout(resolve, 10))
			return left({ source: "cache", data: "cached data" })
		})

		const result = await runAsyncIoEither(asyncIo)
		assertEquals(result._tag, "Left")
		if (result._tag === "Left") {
			assertEquals(result.left.source, "cache")
			assertEquals(result.left.data, "cached data")
		}
	})

	await t.step("can be called multiple times", async () => {
		let counter = 0
		const asyncIo = asyncIoEither(async () => {
			await Promise.resolve()
			counter++
			return right(counter)
		})

		const result1 = await runAsyncIoEither(asyncIo)
		const result2 = await runAsyncIoEither(asyncIo)

		assertEquals(result1._tag, "Right")
		assertEquals(result2._tag, "Right")
		if (result1._tag === "Right" && result2._tag === "Right") {
			assertEquals(result1.right, 1)
			assertEquals(result2.right, 2)
		}
	})
})
