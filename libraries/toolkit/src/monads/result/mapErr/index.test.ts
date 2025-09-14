import { assertEquals } from "https://deno.land/std/assert/mod.ts"

import ok from "../ok/index.ts"
import err from "../err/index.ts"
import mapErr from "./index.ts"

Deno.test("mapErr", async (t) => {
	await t.step("transforms Err value", () => {
		const addContext = (e: string) => `Error: ${e}`
		const result = mapErr(addContext)(err("failed"))
		assertEquals(result._tag, "Left")
		assertEquals((result as any).left, "Error: failed")
	})

	await t.step("leaves Ok unchanged", () => {
		const addContext = (e: string) => `Error: ${e}`
		const result = mapErr(addContext)(ok(42))
		assertEquals(result._tag, "Right")
		assertEquals((result as any).right, 42)
	})

	await t.step("works with type transformation", () => {
		const toError = (message: string) => new Error(message)
		const result = mapErr(toError)(err("Something went wrong"))
		assertEquals(result._tag, "Left")
		assertEquals((result as any).left.message, "Something went wrong")
	})

	await t.step("preserves Ok value type", () => {
		const double = (x: number) => x * 2
		const value = { id: 1, name: "Alice" }
		const result = mapErr(double)(ok(value))
		assertEquals(result._tag, "Right")
		assertEquals((result as any).right, value)
	})

	await t.step("chains multiple mapErrs", () => {
		const addPrefix = (e: string) => `Error: ${e}`
		const toUpperCase = (e: string) => e.toUpperCase()
		const result = mapErr(toUpperCase)(mapErr(addPrefix)(err("failed")))
		assertEquals(result._tag, "Left")
		assertEquals((result as any).left, "ERROR: FAILED")
	})

	await t.step("chains multiple mapErrs with Ok", () => {
		const addPrefix = (e: string) => `Error: ${e}`
		const toUpperCase = (e: string) => e.toUpperCase()
		const result = mapErr(toUpperCase)(mapErr(addPrefix)(ok(42)))
		assertEquals(result._tag, "Right")
		assertEquals((result as any).right, 42)
	})

	await t.step("can convert error types", () => {
		type ApiError = { code: number; message: string }
		const standardizeError = (e: string): ApiError => ({
			code: 500,
			message: e
		})

		const result = mapErr(standardizeError)(err("Database connection failed"))
		assertEquals(result._tag, "Left")
		assertEquals((result as any).left, {
			code: 500,
			message: "Database connection failed"
		})
	})
})