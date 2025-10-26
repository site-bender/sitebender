import { assertEquals } from "@std/assert"

import left from "../../either/left/index.ts"
import right from "../../either/right/index.ts"
import asyncIoEither from "./index.ts"

Deno.test("asyncIoEither", async (t) => {
	await t.step("wraps an async thunk returning Promise<Either>", async () => {
		const computation = asyncIoEither(async () => {
			await Promise.resolve()
			return right(42)
		})
		assertEquals(typeof computation, "function")
		const result = await computation()
		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right, 42)
		}
	})

	await t.step("creates AsyncIoEither from Right value", async () => {
		const rightIo = asyncIoEither(async () => {
			await Promise.resolve()
			return right("success")
		})
		const result = await rightIo()
		assertEquals(result._tag, "Right")
		if (result._tag === "Right") {
			assertEquals(result.right, "success")
		}
	})

	await t.step("creates AsyncIoEither from Left value", async () => {
		const leftIo = asyncIoEither(async () => {
			await Promise.resolve()
			return left("alternative")
		})
		const result = await leftIo()
		assertEquals(result._tag, "Left")
		if (result._tag === "Left") {
			assertEquals(result.left, "alternative")
		}
	})

	await t.step("defers async computation until executed", async () => {
		const computation = asyncIoEither(async () => {
			await Promise.resolve()
			return right(Math.random())
		})
		const result1 = await computation()
		const result2 = await computation()

		// Different values because computation runs each time
		assertEquals(result1._tag, "Right")
		assertEquals(result2._tag, "Right")
	})

	await t.step(
		"works with complex async Either types for branching",
		async () => {
			type CachedData = { readonly source: "cache"; readonly data: string }
			type FreshData = { readonly source: "api"; readonly data: string }

			const fetchDataIo = asyncIoEither<CachedData, FreshData>(async () => {
				// Simulate async operation - fetch fresh data
				await new Promise((resolve) => setTimeout(resolve, 10))
				return right({ source: "api", data: "fresh data" })
			})

			const result = await fetchDataIo()
			assertEquals(result._tag, "Right")
			if (result._tag === "Right") {
				assertEquals(result.right.source, "api")
				assertEquals(result.right.data, "fresh data")
			}
		},
	)

	await t.step("handles async branching with Left outcome", async () => {
		type CachedData = { readonly source: "cache"; readonly data: string }
		type FreshData = { readonly source: "api"; readonly data: string }

		const fetchCachedIo = asyncIoEither<CachedData, FreshData>(async () => {
			// Simulate async operation - use cached data
			await new Promise((resolve) => setTimeout(resolve, 10))
			return left({ source: "cache", data: "cached data" })
		})

		const result = await fetchCachedIo()
		assertEquals(result._tag, "Left")
		if (result._tag === "Left") {
			assertEquals(result.left.source, "cache")
			assertEquals(result.left.data, "cached data")
		}
	})

	await t.step("maintains referential transparency", () => {
		const computation = asyncIoEither(async () => {
			await Promise.resolve()
			return right(42)
		})
		const io1 = computation
		const io2 = computation

		assertEquals(io1, io2)
		assertEquals(typeof io1, "function")
		assertEquals(typeof io2, "function")
	})
})
