import { assert, assertEquals } from "@std/assert"

import type { Result } from "../../../types/fp/result/index.ts"

import failure from "../failure/index.ts"
import success from "../success/index.ts"
import isFailure from "./index.ts"

Deno.test("isFailure", async (t) => {
	await t.step("returns true for Error result", () => {
		const result = failure("failed")

		assertEquals(isFailure(result), true)
	})

	await t.step("returns false for Ok result", () => {
		const result = success(42)

		assertEquals(isFailure(result), false)
	})

	await t.step("narrows type to Error", () => {
		const result: Result<string, number> = failure("failed")

		if (isFailure(result)) {
			assert(result._tag === "Error")
			assertEquals(result.failure, "failed")
		}
	})

	await t.step("works with different failure types", () => {
		assertEquals(isFailure(failure("failure")), true)
		assertEquals(isFailure(failure(new Error("fail"))), true)
		assertEquals(isFailure(failure({ code: 404 })), true)
		assertEquals(isFailure(failure(null)), true)
	})

	await t.step("works with different value types", () => {
		assertEquals(isFailure(success("string")), false)
		assertEquals(isFailure(success({ id: 1 })), false)
		assertEquals(isFailure(success(null)), false)
		assertEquals(isFailure(success(undefined)), false)
	})
})
