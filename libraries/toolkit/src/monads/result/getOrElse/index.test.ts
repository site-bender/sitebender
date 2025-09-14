import { assertEquals } from "@std/assert"

import ok from "../ok/index.ts"
import err from "../err/index.ts"
import getOrElse from "./index.ts"

Deno.test("getOrElse", async (t) => {
	await t.step("returns Ok value when present", () => {
		const result = getOrElse(0)(ok(42))
		assertEquals(result, 42)
	})

	await t.step("returns default value for Err", () => {
		const result = getOrElse(0)(err("failed"))
		assertEquals(result, 0)
	})

	await t.step("works with different types", () => {
		const defaultUser = { id: 0, name: "Unknown" }
		const user = { id: 1, name: "Alice" }

		assertEquals(getOrElse(defaultUser)(ok(user)), user)
		assertEquals(getOrElse(defaultUser)(err("not found")), defaultUser)
	})

	await t.step("works with null and undefined", () => {
		assertEquals(getOrElse("default")(ok(null)), null)
		assertEquals(getOrElse("default")(ok(undefined)), undefined)
		assertEquals(getOrElse("default")(err("error")), "default")
	})

	await t.step("default value can be different type in practice", () => {
		const result1 = getOrElse(0)(ok(42))
		const result2 = getOrElse(0)(err("error"))

		assertEquals(result1, 42)
		assertEquals(result2, 0)
	})

	await t.step("can be used in pipeline", () => {
		const processResult = (r: any) => getOrElse(-1)(r)

		assertEquals(processResult(ok(10)), 10)
		assertEquals(processResult(err("failed")), -1)
	})
})
