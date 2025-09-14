import { assertEquals } from "https://deno.land/std/assert/mod.ts"

import ok from "../ok/index.ts"
import err from "../err/index.ts"
import isErr from "./index.ts"

Deno.test("isErr", async (t) => {
	await t.step("returns true for Err result", () => {
		const result = err("failed")
		assertEquals(isErr(result), true)
	})

	await t.step("returns false for Ok result", () => {
		const result = ok(42)
		assertEquals(isErr(result), false)
	})

	await t.step("narrows type to Err", () => {
		const result = err("failed") as any
		if (isErr(result)) {
			assertEquals(result._tag, "Left")
			assertEquals(result.left, "failed")
		}
	})

	await t.step("works with different error types", () => {
		assertEquals(isErr(err("error")), true)
		assertEquals(isErr(err(new Error("fail"))), true)
		assertEquals(isErr(err({ code: 404 })), true)
		assertEquals(isErr(err(null)), true)
	})

	await t.step("works with different value types", () => {
		assertEquals(isErr(ok("string")), false)
		assertEquals(isErr(ok({ id: 1 })), false)
		assertEquals(isErr(ok(null)), false)
		assertEquals(isErr(ok(undefined)), false)
	})
})