import { assert, assertEquals } from "@std/assert"

import type { Result } from "../../../types/fp/result/index.ts"

import error from "../error/index.ts"
import ok from "../ok/index.ts"
import isOk from "./index.ts"

Deno.test("isOk", async (t) => {
	await t.step("returns true for Ok result", () => {
		const result = ok(42)

		assertEquals(isOk(result), true)
	})

	await t.step("returns false for Error result", () => {
		const result = error("failed")

		assertEquals(isOk(result), false)
	})

	await t.step("narrows type to Ok", () => {
		const result: Result<string, number> = ok(42)

		if (isOk(result)) {
			assert(result._tag === "Ok")
			assertEquals(result.value, 42)
		}
	})

	await t.step("works with different value types", () => {
		assertEquals(isOk(ok("string")), true)
		assertEquals(isOk(ok({ id: 1 })), true)
		assertEquals(isOk(ok(null)), true)
		assertEquals(isOk(ok(undefined)), true)
	})

	await t.step("works with different error types", () => {
		assertEquals(isOk(error("error")), false)
		assertEquals(isOk(error(new Error("fail"))), false)
		assertEquals(isOk(error({ code: 404 })), false)
		assertEquals(isOk(error(null)), false)
	})
})
