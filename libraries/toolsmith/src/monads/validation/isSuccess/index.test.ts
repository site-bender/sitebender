import { assert, assertEquals } from "@std/assert"

import type { Validation } from "../../../types/fp/validation/index.ts"

import failure from "../failure/index.ts"
import success from "../success/index.ts"
import isSuccess from "./index.ts"

Deno.test("isSuccess", async (t) => {
	await t.step("returns true for Ok result", () => {
		const result = success(42)

		assertEquals(isSuccess(result), true)
	})

	await t.step("returns false for Error result", () => {
		const result = failure(["failed"])

		assertEquals(isSuccess(result), false)
	})

	await t.step("narrows type to Ok", () => {
		const result: Validation<string, number> = success(42)

		if (isSuccess(result)) {
			assert(result._tag === "Ok")
			assertEquals(result.value, 42)
		}
	})

	await t.step("works with different value types", () => {
		assertEquals(isSuccess(success("string")), true)
		assertEquals(isSuccess(success({ id: 1 })), true)
		assertEquals(isSuccess(success(null)), true)
		assertEquals(isSuccess(success(undefined)), true)
	})

	await t.step("works with different failure types", () => {
		assertEquals(isSuccess(failure(["failure"])), false)
		assertEquals(isSuccess(failure([new Error("fail")])), false)
		assertEquals(isSuccess(failure([{ code: 404 }])), false)
		assertEquals(isSuccess(failure([null])), false)
	})
})
