import { assertEquals } from "https://deno.land/std/assert/mod.ts"

import err from "./index.ts"

Deno.test("err", async (t) => {
	await t.step("creates Err result with string error", () => {
		const result = err("Not found")
		assertEquals(result._tag, "Left")
		assertEquals((result as any).left, "Not found")
	})

	await t.step("creates Err result with Error object", () => {
		const error = new Error("Failed")
		const result = err(error)
		assertEquals(result._tag, "Left")
		assertEquals((result as any).left, error)
	})

	await t.step("creates Err result with custom error object", () => {
		const error = { code: 404, message: "Not found" }
		const result = err(error)
		assertEquals(result._tag, "Left")
		assertEquals((result as any).left, error)
	})

	await t.step("creates Err result with number", () => {
		const result = err(404)
		assertEquals(result._tag, "Left")
		assertEquals((result as any).left, 404)
	})

	await t.step("creates Err result with null", () => {
		const result = err(null)
		assertEquals(result._tag, "Left")
		assertEquals((result as any).left, null)
	})

	await t.step("preserves type information", () => {
		const result = err<number, string>("error")
		assertEquals(result._tag, "Left")
		assertEquals((result as any).left, "error")
	})
})