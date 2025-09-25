import { assert, assertEquals } from "@std/assert"

import type { Result } from "../../../types/fp/result/index.ts"

import error from "../error/index.ts"
import isError from "../isError/index.ts"
import isOk from "../isOk/index.ts"
import ok from "../ok/index.ts"
import orElse from "./index.ts"

Deno.test("orElse", async (t) => {
	await t.step("returns original Ok unchanged", () => {
		const fallback = orElse(() => ok(0))
		const result = fallback(ok(42))

		assert(isOk(result))
		assertEquals(result.value, 42)
	})

	await t.step("returns alternative for Error", () => {
		const fallback = orElse(() => ok(0))
		const result = fallback(error("failed"))

		assert(isOk(result))
		assertEquals(result.value, 0)
	})

	await t.step("can use error value to compute alternative", () => {
		const tryRecover = orElse((e: string) =>
			e === "retry" ? ok(1) : error("fatal")
		)

		const retryResult = tryRecover(error("retry"))

		assert(isOk(retryResult))
		assertEquals(retryResult.value, 1)

		const fatalResult = tryRecover(error("other"))

		assert(isError(fatalResult))
		assertEquals(fatalResult.error, "fatal")
	})

	await t.step("can chain multiple orElse", () => {
		const firstFallback = orElse((e: string) =>
			e === "first" ? ok(1) : error(e)
		)
		const secondFallback = orElse((e: string) =>
			e === "second" ? ok(2) : error(e)
		)
		const defaultFallback = orElse(() => ok(0))

		const chain = (r: Result<string, number>) =>
			defaultFallback(secondFallback(firstFallback(r)))

		assertEquals(chain(ok(42)), ok(42))
		assertEquals(chain(error("first")), ok(1))
		assertEquals(chain(error("second")), ok(2))
		assertEquals(chain(error("other")), ok(0))
	})

	await t.step("can return different error type", () => {
		const standardizeError = orElse((e: string) =>
			error({ code: 500, message: e })
		)

		const result = standardizeError(error("Database error"))

		assert(isError(result))
		assertEquals(result.error, { code: 500, message: "Database error" })
	})

	await t.step("works with complex recovery logic", () => {
		const recover = orElse((e: { code: number; message: string }) => {
			if (e.code === 404) return ok(null)
			if (e.code === 403) return ok({ id: 0, name: "Guest" })

			return error(e)
		})

		const notFound = recover(error({ code: 404, message: "Not found" }))

		assert(isOk(notFound))
		assertEquals(notFound.value, null)

		const forbidden = recover(error({ code: 403, message: "Forbidden" }))

		assert(isOk(forbidden))
		assertEquals(forbidden.value, { id: 0, name: "Guest" })

		const serverError = recover(error({ code: 500, message: "Server error" }))

		assert(isError(serverError))
		assertEquals(serverError.error, { code: 500, message: "Server error" })
	})
})
