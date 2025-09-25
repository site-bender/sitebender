import { assert, assertEquals } from "@std/assert"

import isError from "../isError/index.ts"
import errorWithInspect from "./index.ts"

const inspectSymbol = Symbol.for("nodejs.util.inspect.custom")

Deno.test("errorWithInspect", async (t) => {
	await t.step("creates Error result with string error", () => {
		const result = errorWithInspect("Not found")

		assert(isError(result))
		assertEquals(result.error, "Not found")
	})

	await t.step("creates Error result with Error object", () => {
		const err = new Error("Failed")
		const result = errorWithInspect(err)

		assert(isError(result))
		assertEquals(result.error, err)
	})

	await t.step("creates Error result with custom error object", () => {
		const err = { code: 404, message: "Not found" }
		const result = errorWithInspect(err)

		assert(isError(result))
		assertEquals(result.error, err)
	})

	await t.step("has custom inspect method", () => {
		const result = errorWithInspect("test error")

		assert(inspectSymbol in result)
		assert(typeof result[inspectSymbol] === "function")
		assertEquals(result[inspectSymbol](), 'Error("test error")')
	})

	await t.step("custom inspect handles complex objects", () => {
		const result = errorWithInspect({ code: 500, message: "Server error" })

		// Access via reflection to avoid type issues
		const inspect = Reflect.get(result, inspectSymbol)
		assertEquals(inspect(), 'Error({"code":500,"message":"Server error"})')
	})

	await t.step("custom inspect handles null", () => {
		const result = errorWithInspect(null)

		// Access via reflection to avoid type issues
		const inspect = Reflect.get(result, inspectSymbol)
		assertEquals(inspect(), "Error(null)")
	})
})
