import type { Result } from "../../../types/fp/result/index.ts"

import { assert, assertEquals } from "@std/assert"

import ok from "../ok/index.ts"
import error from "../error/index.ts"
import mapError from "./index.ts"
import isOk from "../isOk/index.ts"
import isError from "../isError/index.ts"
import fold from "../fold/index.ts"

Deno.test("mapError", async (t) => {
	await t.step("transforms Error value", () => {
		const addContext = (e: string) => `Error: ${e}`
		const result = mapError(addContext)(error("failed"))

		assert(isError(result))
		const errorValue = fold<string, string>(
			(e: string) => e
		)(
			(_: unknown) => "should not be ok"
		)(result)
		assertEquals(errorValue, "Error: failed")
	})

	await t.step("leaves Ok unchanged", () => {
		const addContext = (e: string) => `Error: ${e}`
		const okValue: Result<string, number> = ok(42)
		const result = mapError(addContext)(okValue)

		assert(isOk(result))
		const value = fold<string, number>(
			(_: string) => 0
		)(
			(v: number) => v
		)(result)
		assertEquals(value, 42)
	})

	await t.step("works with type transformation", () => {
		const toError = (message: string) => new Error(message)
		const result = mapError(toError)(error("Something went wrong"))

		assert(isError(result))
		const errorValue = fold<Error, Error | null>(
			(e: Error) => e
		)(
			(_: unknown) => null
		)(result)
		assert(errorValue instanceof Error)
		assertEquals(errorValue?.message, "Something went wrong")
	})

	await t.step("preserves Ok value type", () => {
		const handleStringError = (e: string) => `Handled: ${e}`
		const value = { id: 1, name: "Alice" }
		const okValue: Result<string, { id: number; name: string }> = ok(value)
		const result = mapError(handleStringError)(okValue)

		assert(isOk(result))
		const extractedValue = fold<string, { id: number; name: string }>(
			(_: string) => ({ id: 0, name: "" })
		)(
			(v: { id: number; name: string }) => v
		)(result)
		assertEquals(extractedValue, value)
	})

	await t.step("chains multiple mapErrors", () => {
		const addPrefix = (e: string) => `Error: ${e}`
		const toUpperCase = (e: string) => e.toUpperCase()
		const result = mapError(toUpperCase)(mapError(addPrefix)(error("failed")))

		assert(isError(result))
		const errorValue = fold<string, string>(
			(e: string) => e
		)(
			(_: unknown) => "should not be ok"
		)(result)
		assertEquals(errorValue, "ERROR: FAILED")
	})

	await t.step("chains multiple mapErrors with Ok", () => {
		const addPrefix = (e: string) => `Error: ${e}`
		const toUpperCase = (e: string) => e.toUpperCase()
		const okValue: Result<string, number> = ok(42)
		const result = mapError(toUpperCase)(mapError(addPrefix)(okValue))

		assert(isOk(result))
		const value = fold<string, number>(
			(_: string) => 0
		)(
			(v: number) => v
		)(result)
		assertEquals(value, 42)
	})

	await t.step("can convert error types", () => {
		type ApiError = { code: number; message: string }
		const standardizeError = (e: string): ApiError => ({
			code: 500,
			message: e
		})

		const result = mapError(standardizeError)(error("Database connection failed"))

		assert(isError(result))
		const errorValue = fold<ApiError, ApiError | null>(
			(e: ApiError) => e
		)(
			(_: unknown) => null
		)(result)
		assertEquals(errorValue, {
			code: 500,
			message: "Database connection failed"
		})
	})
})
