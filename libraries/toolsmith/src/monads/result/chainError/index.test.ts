import { assert, assertEquals } from "@std/assert"

import type { Result } from "../../../types/fp/result/index.ts"

import error from "../error/index.ts"
import isError from "../isError/index.ts"
import isOk from "../isOk/index.ts"
import ok from "../ok/index.ts"
import chainError from "./index.ts"

Deno.test("chainError", async (t) => {
	await t.step("recovers from error to Ok", () => {
		const recover = (e: string): Result<string, number> =>
			e === "recoverable" ? ok(0) : error(`Fatal: ${e}`)

		const result = chainError(recover)(error("recoverable"))

		assert(isOk(result))
		assertEquals(result.value, 0)
	})

	await t.step("transforms error to new error", () => {
		const addContext = (e: string): Result<string, number> =>
			error(`Fatal: ${e}`)

		const result = chainError(addContext)(error("failed"))

		assert(isError(result))
		assertEquals(result.error, "Fatal: failed")
	})

	await t.step("leaves Ok unchanged", () => {
		const recover = (_e: string): Result<string, number> => ok(99)

		const result = chainError(recover)(ok(42))

		assert(isOk(result))
		assertEquals(result.value, 42)
	})

	await t.step("chains multiple error handlers", () => {
		const firstRecover = (e: string): Result<string, number> =>
			e === "first" ? ok(1) : error(e)

		const secondRecover = (e: string): Result<string, number> =>
			e === "second" ? ok(2) : error(e)

		const chain1 = chainError(secondRecover)(
			chainError(firstRecover)(error("first")),
		)

		assert(isOk(chain1))
		assertEquals(chain1.value, 1)

		const chain2 = chainError(secondRecover)(
			chainError(firstRecover)(error("second")),
		)

		assert(isOk(chain2))
		assertEquals(chain2.value, 2)

		const chain3 = chainError(secondRecover)(
			chainError(firstRecover)(error("other")),
		)

		assert(isError(chain3))
		assertEquals(chain3.error, "other")
	})

	await t.step("can transform error types", () => {
		type ApiError = { code: number; message: string }

		const standardizeError = (e: string): Result<ApiError, number> =>
			error({ code: 500, message: e })

		const result = chainError(standardizeError)(error("Database failed"))

		assert(isError(result))
		assertEquals(result.error, { code: 500, message: "Database failed" })
	})

	await t.step("works with complex recovery logic", () => {
		const complexRecover = (
			e: { code: number },
		): Result<string, { id: number; name: string }> => {
			if (e.code === 404) return ok({ id: 0, name: "Default" })
			if (e.code === 403) return ok({ id: -1, name: "Guest" })

			return error("Unrecoverable error")
		}

		const notFound = chainError(complexRecover)(error({ code: 404 }))

		assert(isOk(notFound))
		assertEquals(notFound.value, { id: 0, name: "Default" })

		const forbidden = chainError(complexRecover)(error({ code: 403 }))

		assert(isOk(forbidden))
		assertEquals(forbidden.value, { id: -1, name: "Guest" })

		const serverError = chainError(complexRecover)(error({ code: 500 }))

		assert(isError(serverError))
		assertEquals(serverError.error, "Unrecoverable error")
	})
})
