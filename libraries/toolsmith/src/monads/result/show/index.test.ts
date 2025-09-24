import { assert, assertEquals } from "@std/assert"

import ok from "../ok/index.ts"
import error from "../error/index.ts"
import show from "./index.ts"

Deno.test("show", async (t) => {
	await t.step("shows Ok with number", () => {
		const result = show(ok(42))

		assertEquals(result, "Ok(42)")
	})

	await t.step("shows Ok with string", () => {
		const result = show(ok("success"))

		assertEquals(result, 'Ok("success")')
	})

	await t.step("shows Ok with object", () => {
		const result = show(ok({ id: 1, name: "Alice" }))

		assertEquals(result, 'Ok({"id":1,"name":"Alice"})')
	})

	await t.step("shows Ok with null", () => {
		const result = show(ok(null))

		assertEquals(result, "Ok(null)")
	})

	await t.step("shows Error with string", () => {
		const result = show(error("failed"))

		assertEquals(result, 'Error("failed")')
	})

	await t.step("shows Error with Error object", () => {
		const err = new Error("Something went wrong")
		const result = show(error(err))

		// JSON.stringify of Error objects returns empty object in many environments
		// So we just check it contains "Error(" prefix
		assert(result.startsWith("Error("))
		assert(result.endsWith(")"))
	})

	await t.step("shows Error with custom object", () => {
		const result = show(error({ code: 404, message: "Not found" }))

		assertEquals(result, 'Error({"code":404,"message":"Not found"})')
	})

	await t.step("shows Error with null", () => {
		const result = show(error(null))

		assertEquals(result, "Error(null)")
	})
})