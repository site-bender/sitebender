import { assertEquals } from "https://deno.land/std/assert/mod.ts"

import ok from "../ok/index.ts"
import err from "../err/index.ts"
import isOk from "./index.ts"

Deno.test("isOk", async (t) => {
	await t.step("returns true for Ok result", () => {
		const result = ok(42)
		assertEquals(isOk(result), true)
	})

	await t.step("returns false for Err result", () => {
		const result = err("failed")
		assertEquals(isOk(result), false)
	})

	await t.step("narrows type to Ok", () => {
		const result = ok(42) as any
		if (isOk(result)) {
			assertEquals(result._tag, "Right")
			assertEquals(result.right, 42)
		}
	})

	await t.step("works with different value types", () => {
		assertEquals(isOk(ok("string")), true)
		assertEquals(isOk(ok({ id: 1 })), true)
		assertEquals(isOk(ok(null)), true)
		assertEquals(isOk(ok(undefined)), true)
	})

	await t.step("works with different error types", () => {
		assertEquals(isOk(err("error")), false)
		assertEquals(isOk(err(new Error("fail"))), false)
		assertEquals(isOk(err({ code: 404 })), false)
		assertEquals(isOk(err(null)), false)
	})
})