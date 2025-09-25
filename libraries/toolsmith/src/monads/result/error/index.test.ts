import { assert, assertEquals } from "@std/assert"

import isError from "../isError/index.ts"
import error from "./index.ts"

Deno.test("error", async (t) => {
	await t.step("creates Error result with string error", () => {
		const result = error("Not found")

		assert(isError(result))
		assertEquals(result.error, "Not found")
	})

	await t.step("creates Error result with Error object", () => {
		const err = new Error("Failed")
		const result = error(err)

		assert(isError(result))
		assertEquals(result.error, err)
	})

	await t.step("creates Error result with custom error object", () => {
		const err = { code: 404, message: "Not found" }
		const result = error(err)

		assert(isError(result))
		assertEquals(result.error, err)
	})

	await t.step("creates Error result with number", () => {
		const result = error(404)

		assert(isError(result))
		assertEquals(result.error, 404)
	})

	await t.step("creates Error result with null", () => {
		const result = error(null)

		assert(isError(result))
		assertEquals(result.error, null)
	})

	await t.step("preserves type information", () => {
		const result = error<string>("error")

		assert(isError(result))
		assertEquals(result.error, "error")
	})
})
