import { assertEquals } from "@std/assert"
import deepFreeze from "./index.ts"

Deno.test("deepFreeze", async (t) => {
	await t.step("freezes a simple object", () => {
		const obj = { a: 1, b: 2 }
		const frozen = deepFreeze(obj)

		assertEquals(Object.isFrozen(frozen), true)
		assertEquals(frozen, obj)
	})

	await t.step("freezes nested objects recursively", () => {
		const obj = {
			level1: {
				level2: {
					level3: {
						value: "deep",
					},
				},
			},
		}
		const frozen = deepFreeze(obj)

		assertEquals(Object.isFrozen(frozen), true)
		assertEquals(Object.isFrozen(frozen.level1), true)
		assertEquals(Object.isFrozen(frozen.level1.level2), true)
		assertEquals(Object.isFrozen(frozen.level1.level2.level3), true)
	})

	await t.step("freezes arrays and their contents", () => {
		const arr = [{ a: 1 }, { b: 2 }, [3, 4]]
		const frozen = deepFreeze(arr)

		assertEquals(Object.isFrozen(frozen), true)
		assertEquals(Object.isFrozen(frozen[0]), true)
		assertEquals(Object.isFrozen(frozen[1]), true)
		assertEquals(Object.isFrozen(frozen[2]), true)
	})

	await t.step("freezes functions", () => {
		const obj = {
			method: function test() {
				return "test"
			},
		}
		const frozen = deepFreeze(obj)

		assertEquals(Object.isFrozen(frozen), true)
		assertEquals(Object.isFrozen(frozen.method), true)
	})

	await t.step("handles null values", () => {
		const frozen = deepFreeze(null)
		assertEquals(frozen, null)
	})

	await t.step("handles primitive values", () => {
		assertEquals(deepFreeze(42), 42)
		assertEquals(deepFreeze("string"), "string")
		assertEquals(deepFreeze(true), true)
		assertEquals(deepFreeze(undefined), undefined)
	})

	await t.step("does not re-freeze already frozen objects", () => {
		const inner = Object.freeze({ frozen: true })
		const obj = { inner }
		const frozen = deepFreeze(obj)

		assertEquals(Object.isFrozen(frozen), true)
		assertEquals(Object.isFrozen(frozen.inner), true)
	})
})
