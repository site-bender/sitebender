import type { Result } from "../../../types/fp/result/index.ts"

import { assert, assertEquals } from "@std/assert"

import ok from "../ok/index.ts"
import error from "../error/index.ts"
import isError from "./index.ts"

Deno.test("isError", async (t) => {
	await t.step("returns true for Error result", () => {
		const result = error("failed")

		assertEquals(isError(result), true)
	})

	await t.step("returns false for Ok result", () => {
		const result = ok(42)

		assertEquals(isError(result), false)
	})

	await t.step("narrows type to Error", () => {
		const result: Result<string, number> = error("failed")

		if (isError(result)) {
			assert(result._tag === "Error")
			assertEquals(result.error, "failed")
		}
	})

	await t.step("works with different error types", () => {
		assertEquals(isError(error("error")), true)
		assertEquals(isError(error(new Error("fail"))), true)
		assertEquals(isError(error({ code: 404 })), true)
		assertEquals(isError(error(null)), true)
	})

	await t.step("works with different value types", () => {
		assertEquals(isError(ok("string")), false)
		assertEquals(isError(ok({ id: 1 })), false)
		assertEquals(isError(ok(null)), false)
		assertEquals(isError(ok(undefined)), false)
	})
})
