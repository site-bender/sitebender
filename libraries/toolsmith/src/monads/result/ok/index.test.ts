import { assert, assertEquals } from "@std/assert"

import isOk from "../isOk/index.ts"
import ok from "./index.ts"

Deno.test("ok", async (t) => {
	await t.step("creates Ok result with primitive value", () => {
		const result = ok(42)

		assert(isOk(result))
		assertEquals(result.value, 42)
	})

	await t.step("creates Ok result with string value", () => {
		const result = ok("success")

		assert(isOk(result))
		assertEquals(result.value, "success")
	})

	await t.step("creates Ok result with object value", () => {
		const user = { id: 1, name: "Alice" }
		const result = ok(user)

		assert(isOk(result))
		assertEquals(result.value, user)
	})

	await t.step("creates Ok result with null value", () => {
		const result = ok(null)

		assert(isOk(result))
		assertEquals(result.value, null)
	})

	await t.step("creates Ok result with undefined value", () => {
		const result = ok(undefined)

		assert(isOk(result))
		assertEquals(result.value, undefined)
	})

	await t.step("preserves type information", () => {
		const result = ok(42)

		assert(isOk(result))
		assertEquals(result.value, 42)
	})
})
