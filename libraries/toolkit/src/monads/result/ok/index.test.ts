import { assertEquals } from "@std/assert"

import ok from "./index.ts"

Deno.test("ok", async (t) => {
	await t.step("creates Ok result with primitive value", () => {
		const result = ok(42)
		assertEquals(result._tag, "Right")
		assertEquals((result as any).right, 42)
	})

	await t.step("creates Ok result with string value", () => {
		const result = ok("success")
		assertEquals(result._tag, "Right")
		assertEquals((result as any).right, "success")
	})

	await t.step("creates Ok result with object value", () => {
		const user = { id: 1, name: "Alice" }
		const result = ok(user)
		assertEquals(result._tag, "Right")
		assertEquals((result as any).right, user)
	})

	await t.step("creates Ok result with null value", () => {
		const result = ok(null)
		assertEquals(result._tag, "Right")
		assertEquals((result as any).right, null)
	})

	await t.step("creates Ok result with undefined value", () => {
		const result = ok(undefined)
		assertEquals(result._tag, "Right")
		assertEquals((result as any).right, undefined)
	})

	await t.step("preserves type information", () => {
		const result = ok<number, string>(42)
		assertEquals(result._tag, "Right")
		assertEquals((result as any).right, 42)
	})
})
