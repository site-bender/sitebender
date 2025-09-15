import type { Result } from "../../../types/fp/result/index.ts"

import { assert, assertEquals } from "@std/assert"

import ok from "../ok/index.ts"
import error from "../error/index.ts"
import isOk from "../isOk/index.ts"
import isError from "../isError/index.ts"
import chainError from "./index.ts"
import fold from "../fold/index.ts"

Deno.test("chainError", async (t) => {
	await t.step("recovers from error to Ok", () => {
		const recover = (e: string): Result<string, number> =>
			e === "recoverable" ? ok(0) : error(`Fatal: ${e}`)

		const result = chainError(recover)(error("recoverable"))

		assert(isOk(result))
		const value = fold<string, number>(
			(_: string) => -1
		)(
			(v: number) => v
		)(result)
		assertEquals(value, 0)
	})

	await t.step("transforms error to new error", () => {
		const addContext = (e: string): Result<string, number> =>
			error(`Fatal: ${e}`)

		const result = chainError(addContext)(error("failed"))

		assert(isError(result))
		const errorValue = fold<string, string>(
			(e: string) => e
		)(
			(_: number) => "should not be ok"
		)(result)
		assertEquals(errorValue, "Fatal: failed")
	})

	await t.step("leaves Ok unchanged", () => {
		const recover = (_e: string): Result<string, number> =>
			ok(99)

		const result = chainError(recover)(ok(42))

		assert(isOk(result))
		const value = fold<string, number>(
			(_: string) => -1
		)(
			(v: number) => v
		)(result)
		assertEquals(value, 42)
	})

	await t.step("chains multiple error handlers", () => {
		const firstRecover = (e: string): Result<string, number> =>
			e === "first" ? ok(1) : error(e)

		const secondRecover = (e: string): Result<string, number> =>
			e === "second" ? ok(2) : error(e)

		const chain1 = chainError(secondRecover)(chainError(firstRecover)(error("first")))

		assert(isOk(chain1))
		const value1 = fold<string, number>(
			(_: string) => -1
		)(
			(v: number) => v
		)(chain1)
		assertEquals(value1, 1)

		const chain2 = chainError(secondRecover)(chainError(firstRecover)(error("second")))

		assert(isOk(chain2))
		const value2 = fold<string, number>(
			(_: string) => -1
		)(
			(v: number) => v
		)(chain2)
		assertEquals(value2, 2)

		const chain3 = chainError(secondRecover)(chainError(firstRecover)(error("other")))

		assert(isError(chain3))
		const error3 = fold<string, string>(
			(e: string) => e
		)(
			(_: number) => "should not be ok"
		)(chain3)
		assertEquals(error3, "other")
	})

	await t.step("can transform error types", () => {
		type ApiError = { code: number; message: string }

		const standardizeError = (e: string): Result<ApiError, number> =>
			error({ code: 500, message: e })

		const result = chainError(standardizeError)(error("Database failed"))

		assert(isError(result))
		const errorValue = fold<ApiError, ApiError | null>(
			(e: ApiError) => e
		)(
			(_: number) => null
		)(result)
		assertEquals(errorValue, { code: 500, message: "Database failed" })
	})

	await t.step("works with complex recovery logic", () => {
		const complexRecover = (e: { code: number }): Result<string, { id: number; name: string }> => {
			if (e.code === 404) return ok({ id: 0, name: "Default" })
			if (e.code === 403) return ok({ id: -1, name: "Guest" })

			return error("Unrecoverable error")
		}

		const notFound = chainError(complexRecover)(error({ code: 404 }))

		assert(isOk(notFound))
		const notFoundValue = fold<string, { id: number; name: string }>(
			(_: string) => ({ id: -999, name: "error" })
		)(
			(v: { id: number; name: string }) => v
		)(notFound)
		assertEquals(notFoundValue, { id: 0, name: "Default" })

		const forbidden = chainError(complexRecover)(error({ code: 403 }))

		assert(isOk(forbidden))
		const forbiddenValue = fold<string, { id: number; name: string }>(
			(_: string) => ({ id: -999, name: "error" })
		)(
			(v: { id: number; name: string }) => v
		)(forbidden)
		assertEquals(forbiddenValue, { id: -1, name: "Guest" })

		const serverError = chainError(complexRecover)(error({ code: 500 }))

		assert(isError(serverError))
		const serverErrorValue = fold<string, string>(
			(e: string) => e
		)(
			(_: { id: number; name: string }) => "should not be ok"
		)(serverError)
		assertEquals(serverErrorValue, "Unrecoverable error")
	})
})