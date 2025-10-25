import { assertEquals } from "@std/assert"

import error from "../../result/error/index.ts"
import ok from "../../result/ok/index.ts"
import asyncIoResult from "../asyncIoResult/index.ts"
import runAsyncIo from "./index.ts"

Deno.test("runAsyncIo", async (t) => {
	await t.step(
		"executes an AsyncIOResult and returns Promise<Result>",
		async () => {
			const computation = asyncIoResult(async () => {
				await Promise.resolve()
				return ok(42)
			})
			const result = await runAsyncIo(computation)

			assertEquals(result._tag, "Ok")
			if (result._tag === "Ok") {
				assertEquals(result.value, 42)
			}
		},
	)

	await t.step("executes async computation with Ok result", async () => {
		const successIO = asyncIoResult(async () => {
			await new Promise((resolve) => setTimeout(resolve, 10))
			return ok("completed")
		})

		const result = await runAsyncIo(successIO)
		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, "completed")
		}
	})

	await t.step("executes async computation with Error result", async () => {
		const failureIO = asyncIoResult(async () => {
			await new Promise((resolve) => setTimeout(resolve, 10))
			return error("operation failed")
		})

		const result = await runAsyncIo(failureIO)
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error, "operation failed")
		}
	})

	await t.step("can be called multiple times on same IO", async () => {
		const computation = asyncIoResult(async () => {
			await Promise.resolve()
			return ok(Math.random())
		})

		const result1 = await runAsyncIo(computation)
		const result2 = await runAsyncIo(computation)

		assertEquals(result1._tag, "Ok")
		assertEquals(result2._tag, "Ok")
		// Each execution creates new random value
	})

	await t.step("works with complex types", async () => {
		type Data = {
			readonly items: ReadonlyArray<string>
			readonly count: number
		}
		type DataError = { readonly _tag: "DataError"; readonly reason: string }

		const fetchDataIO = asyncIoResult<DataError, Data>(async () => {
			await new Promise((resolve) => setTimeout(resolve, 10))
			return ok({
				items: ["a", "b", "c"],
				count: 3,
			})
		})

		const result = await runAsyncIo(fetchDataIO)
		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value.items.length, 3)
			assertEquals(result.value.count, 3)
		}
	})
})
