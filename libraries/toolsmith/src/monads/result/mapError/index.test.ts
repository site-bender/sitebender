import type { Result } from "../../../types/fp/result/index.ts"

import { assert, assertEquals } from "@std/assert"

import ok from "../ok/index.ts"
import error from "../error/index.ts"
import mapError from "./index.ts"
import isOk from "../isOk/index.ts"
import isError from "../isError/index.ts"

Deno.test("mapError", async (t) => {
	await t.step("transforms Error value", () => {
		const addContext = (e: string) => `Error: ${e}`
		const result = mapError(addContext)(error("failed"))

		assert(isError(result))
		assertEquals(result.error, "Error: failed")
	})

	await t.step("leaves Ok unchanged", () => {
		const addContext = (e: string) => `Error: ${e}`
		const okValue: Result<string, number> = ok(42)
		const result = mapError(addContext)(okValue)

		assert(isOk(result))
		assertEquals(result.value, 42)
	})

	await t.step("works with type transformation", () => {
		const toError = (message: string) => new Error(message)
		const result = mapError(toError)(error("Something went wrong"))

		assert(isError(result))
		assert(result.error instanceof Error)
		assertEquals(result.error.message, "Something went wrong")
	})

	await t.step("preserves Ok value type", () => {
		const handleStringError = (e: string) => `Handled: ${e}`
		const value = { id: 1, name: "Alice" }
		const okValue: Result<string, { id: number; name: string }> = ok(value)
		const result = mapError(handleStringError)(okValue)

		assert(isOk(result))
		assertEquals(result.value, value)
	})

	await t.step("chains multiple mapErrors", () => {
		const addPrefix = (e: string) => `Error: ${e}`
		const toUpperCase = (e: string) => e.toUpperCase()
		const result = mapError(toUpperCase)(mapError(addPrefix)(error("failed")))

		assert(isError(result))
		assertEquals(result.error, "ERROR: FAILED")
	})

	await t.step("chains multiple mapErrors with Ok", () => {
		const addPrefix = (e: string) => `Error: ${e}`
		const toUpperCase = (e: string) => e.toUpperCase()
		const okValue: Result<string, number> = ok(42)
		const result = mapError(toUpperCase)(mapError(addPrefix)(okValue))

		assert(isOk(result))
		assertEquals(result.value, 42)
	})

	await t.step("can convert error types", () => {
		type ApiError = { code: number; message: string }

		const standardizeError = (e: string): ApiError => ({
			code: 500,
			message: e,
		})

		const result = mapError(standardizeError)(
			error("Database connection failed")
		)

		assert(isError(result))
		assertEquals(result.error, {
			code: 500,
			message: "Database connection failed",
		})
	})
})
