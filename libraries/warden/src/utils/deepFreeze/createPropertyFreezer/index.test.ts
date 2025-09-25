import { assertEquals } from "@std/assert"

import createPropertyFreezer from "./index.ts"

Deno.test("createPropertyFreezer", async (t) => {
	await t.step("creates a curried function that freezes properties", () => {
		const obj = { a: { nested: "value" }, b: 2 }
		const mockDeepFreeze = <T>(o: T): T => {
			Object.freeze(o)
			return o
		}

		const withObj = createPropertyFreezer(obj)
		assertEquals(typeof withObj, "function")

		const freezeProperty = withObj(mockDeepFreeze)
		assertEquals(typeof freezeProperty, "function")
		assertEquals(freezeProperty("a"), "a")
		assertEquals(freezeProperty("b"), "b")
	})

	await t.step("freezes nested objects", () => {
		const obj = { nested: { value: 42 } }
		let freezeCalled = false
		const mockDeepFreeze = <T>(o: T): T => {
			freezeCalled = true
			return o
		}

		const freezeProperty = createPropertyFreezer(obj)(mockDeepFreeze)
		freezeProperty("nested")

		assertEquals(freezeCalled, true)
	})

	await t.step("skips null values", () => {
		const obj = { nullable: null }
		let freezeCalled = false
		const mockDeepFreeze = <T>(o: T): T => {
			freezeCalled = true
			return o
		}

		const freezeProperty = createPropertyFreezer(obj)(mockDeepFreeze)
		freezeProperty("nullable")

		assertEquals(freezeCalled, false)
	})

	await t.step("skips primitive values", () => {
		const obj = { num: 42, str: "test", bool: true }
		let freezeCalled = false
		const mockDeepFreeze = <T>(o: T): T => {
			freezeCalled = true
			return o
		}

		const freezeProperty = createPropertyFreezer(obj)(mockDeepFreeze)
		freezeProperty("num")
		freezeProperty("str")
		freezeProperty("bool")

		assertEquals(freezeCalled, false)
	})

	await t.step("skips already frozen objects", () => {
		const frozenInner = Object.freeze({ frozen: true })
		const obj = { inner: frozenInner }
		let freezeCalled = false
		const mockDeepFreeze = <T>(o: T): T => {
			freezeCalled = true
			return o
		}

		const freezeProperty = createPropertyFreezer(obj)(mockDeepFreeze)
		freezeProperty("inner")

		assertEquals(freezeCalled, false)
	})

	await t.step("freezes functions", () => {
		const obj = {
			func: function test() {
				return "test"
			},
		}
		let freezeCalled = false
		const mockDeepFreeze = <T>(o: T): T => {
			freezeCalled = true
			return o
		}

		const freezeProperty = createPropertyFreezer(obj)(mockDeepFreeze)
		freezeProperty("func")

		assertEquals(freezeCalled, true)
	})
})
