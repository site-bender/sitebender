import { assert, assertEquals } from "@std/assert"

import okWithInspect from "./index.ts"
import isOk from "../isOk/index.ts"

Deno.test("okWithInspect", async (t) => {
	await t.step("creates Ok result with number", () => {
		const result = okWithInspect(42)

		assert(isOk(result))
		assertEquals(result.value, 42)
	})

	await t.step("creates Ok result with string", () => {
		const result = okWithInspect("success")

		assert(isOk(result))
		assertEquals(result.value, "success")
	})

	await t.step("creates Ok result with object", () => {
		const value = { id: 1, name: "Alice" }
		const result = okWithInspect(value)

		assert(isOk(result))
		assertEquals(result.value, value)
	})

	await t.step("has custom inspect method", () => {
		const result = okWithInspect(42)
		const inspectSymbol = Symbol.for("nodejs.util.inspect.custom")
		const inspectable = result as unknown as { [key: symbol]: () => string }

		assert(typeof inspectable[inspectSymbol] === "function")
		assertEquals(inspectable[inspectSymbol](), "Ok(42)")
	})

	await t.step("custom inspect handles complex objects", () => {
		const result = okWithInspect({ id: 1, name: "Alice" })
		const inspectSymbol = Symbol.for("nodejs.util.inspect.custom")
		const inspectable = result as unknown as { [key: symbol]: () => string }

		assertEquals(inspectable[inspectSymbol](), 'Ok({"id":1,"name":"Alice"})')
	})

	await t.step("custom inspect handles null", () => {
		const result = okWithInspect(null)
		const inspectSymbol = Symbol.for("nodejs.util.inspect.custom")
		const inspectable = result as unknown as { [key: symbol]: () => string }

		assertEquals(inspectable[inspectSymbol](), "Ok(null)")
	})
})