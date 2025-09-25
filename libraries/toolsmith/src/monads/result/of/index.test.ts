import { assert, assertEquals } from "@std/assert"

import isOk from "../isOk/index.ts"
import of from "./index.ts"

Deno.test("of", async (t) => {
	await t.step("creates Ok result with number", () => {
		const result = of(42)

		assert(isOk(result))
		assertEquals(result.value, 42)
	})

	await t.step("creates Ok result with string", () => {
		const result = of("success")

		assert(isOk(result))
		assertEquals(result.value, "success")
	})

	await t.step("creates Ok result with object", () => {
		const value = { id: 1, name: "Alice" }
		const result = of(value)

		assert(isOk(result))
		assertEquals(result.value, value)
	})

	await t.step("creates Ok result with null", () => {
		const result = of(null)

		assert(isOk(result))
		assertEquals(result.value, null)
	})

	await t.step("creates Ok result with undefined", () => {
		const result = of(undefined)

		assert(isOk(result))
		assertEquals(result.value, undefined)
	})

	await t.step("preserves type information", () => {
		const result = of<number>(42)

		assert(isOk(result))
		assertEquals(result.value, 42)
	})
})
