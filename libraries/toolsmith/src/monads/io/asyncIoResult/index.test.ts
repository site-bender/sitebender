import { assertEquals } from "@std/assert"

import error from "../../result/error/index.ts"
import ok from "../../result/ok/index.ts"
import asyncIoResult from "./index.ts"
import runAsyncIO from "../runAsyncIO/index.ts"

Deno.test("asyncIoResult", async (t) => {
	await t.step("wraps an async thunk returning Promise<Result>", async () => {
		const computation = asyncIoResult(async () => {
			await Promise.resolve()
			return ok(42)
		})
		assertEquals(typeof computation, "function")
		const result = await computation()
		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, 42)
		}
	})

	await t.step("creates AsyncIOResult from Ok result", async () => {
		const successIO = asyncIoResult(async () => {
			await Promise.resolve()
			return ok("success")
		})
		const result = await runAsyncIO(successIO)
		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, "success")
		}
	})

	await t.step("creates AsyncIOResult from Error result", async () => {
		const failureIO = asyncIoResult(async () => {
			await Promise.resolve()
			return error("failed")
		})
		const result = await runAsyncIO(failureIO)
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error, "failed")
		}
	})

	await t.step("defers async computation until executed", async () => {
		const computation = asyncIoResult(async () => {
			await Promise.resolve()
			return ok(Math.random())
		})
		const result1 = await runAsyncIO(computation)
		const result2 = await runAsyncIO(computation)

		// Different values because computation runs each time
		assertEquals(result1._tag, "Ok")
		assertEquals(result2._tag, "Ok")
	})

	await t.step("works with complex async Result types", async () => {
		type User = { readonly id: number; readonly name: string }
		type UserError = { readonly _tag: "UserError"; readonly message: string }

		const fetchUserIO = asyncIoResult<User, UserError>(async () => {
			// Simulate async operation
			await new Promise((resolve) => setTimeout(resolve, 10))
			return ok({ id: 1, name: "Alice" })
		})

		const result = await runAsyncIO(fetchUserIO)
		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value.id, 1)
			assertEquals(result.value.name, "Alice")
		}
	})

	await t.step("handles async errors as Result Error", async () => {
		type FetchError = {
			readonly _tag: "FetchError"
			readonly message: string
			readonly code: number
		}

		const fetchFailIO = asyncIoResult<never, FetchError>(async () => {
			await new Promise((resolve) => setTimeout(resolve, 10))
			return error({
				_tag: "FetchError",
				message: "Network error",
				code: 500,
			})
		})

		const result = await runAsyncIO(fetchFailIO)
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error._tag, "FetchError")
			assertEquals(result.error.message, "Network error")
			assertEquals(result.error.code, 500)
		}
	})

	await t.step("maintains referential transparency", () => {
		const computation = asyncIoResult(async () => {
			await Promise.resolve()
			return ok(42)
		})
		const io1 = computation
		const io2 = computation

		assertEquals(io1, io2)
		assertEquals(typeof io1, "function")
		assertEquals(typeof io2, "function")
	})
})
