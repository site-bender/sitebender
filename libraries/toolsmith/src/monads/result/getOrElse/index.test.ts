import { assertEquals } from "@std/assert"

import type { Result } from "../../../types/fp/result/index.ts"

import error from "../error/index.ts"
import ok from "../ok/index.ts"
import getOrElse from "./index.ts"

Deno.test("getOrElse", async (t) => {
	await t.step("returns Ok value when present", () => {
		const result = getOrElse(0)(ok(42))

		assertEquals(result, 42)
	})

	await t.step("returns default value for Err", () => {
		const result = getOrElse(0)(error("failed"))

		assertEquals(result, 0)
	})

	await t.step("works with different types", () => {
		const defaultUser = { id: 0, name: "Unknown" }
		const user = { id: 1, name: "Alice" }

		assertEquals(getOrElse(defaultUser)(ok(user)), user)
		assertEquals(getOrElse(defaultUser)(error("not found")), defaultUser)
	})

	await t.step("works with null and undefined", () => {
		assertEquals(getOrElse<null | string>("default")(ok(null)), null)
		assertEquals(
			getOrElse<undefined | string>("default")(ok(undefined)),
			undefined,
		)
		assertEquals(getOrElse("default")(error("error")), "default")
	})

	await t.step("default value can be different type in practice", () => {
		const result1 = getOrElse(0)(ok(42))
		const result2 = getOrElse(0)(error("error"))

		assertEquals(result1, 42)
		assertEquals(result2, 0)
	})

	await t.step("can be used in pipeline", () => {
		const processResult = (r: Result<string, number>) => getOrElse(-1)(r)

		assertEquals(processResult(ok(10)), 10)
		assertEquals(processResult(error("failed")), -1)
	})
})
