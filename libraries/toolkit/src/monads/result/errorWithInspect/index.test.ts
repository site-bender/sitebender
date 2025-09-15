import { assert, assertEquals } from "@std/assert"

import errorWithInspect from "./index.ts"
import isError from "../isError/index.ts"

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
		const inspectSymbol = Symbol.for("nodejs.util.inspect.custom")
		const inspectable = result as unknown as { [key: symbol]: () => string }

		assert(typeof inspectable[inspectSymbol] === "function")
		assertEquals(inspectable[inspectSymbol](), 'Error("test error")')
	})

	await t.step("custom inspect handles complex objects", () => {
		const result = errorWithInspect({ code: 500, message: "Server error" })
		const inspectSymbol = Symbol.for("nodejs.util.inspect.custom")
		const inspectable = result as unknown as { [key: symbol]: () => string }

		assertEquals(inspectable[inspectSymbol](), 'Error({"code":500,"message":"Server error"})')
	})

	await t.step("custom inspect handles null", () => {
		const result = errorWithInspect(null)
		const inspectSymbol = Symbol.for("nodejs.util.inspect.custom")
		const inspectable = result as unknown as { [key: symbol]: () => string }

		assertEquals(inspectable[inspectSymbol](), "Error(null)")
	})
})