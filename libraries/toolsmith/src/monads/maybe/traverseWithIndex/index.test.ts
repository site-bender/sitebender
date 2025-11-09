import { assert, assertEquals } from "@std/assert"
import type { Maybe } from "../../../types/fp/maybe/index.ts"
import just from "../just/index.ts"
import nothing from "../nothing/index.ts"
import isJust from "../isJust/index.ts"
import isNothing from "../isNothing/index.ts"
import traverseWithIndex from "./index.ts"

Deno.test("traverseWithIndex", async (t) => {
	await t.step("maps indexed function and sequences all Just", () => {
		const addIndex = (n: number, i: number): Maybe<number> => just(n + i)
		const result = traverseWithIndex(addIndex)([10, 20, 30])
		assert(isJust(result))
		assertEquals(result.value, [10, 21, 32])
	})

	await t.step("provides correct index", () => {
		const captureIndex = (_v: string, i: number): Maybe<number> => just(i)
		const result = traverseWithIndex(captureIndex)(["a", "b", "c"])
		assert(isJust(result))
		assertEquals(result.value, [0, 1, 2])
	})

	await t.step("short-circuits on first Nothing", () => {
		const validate = (n: number, i: number): Maybe<number> =>
			i === 1 ? nothing() : just(n)
		const result = traverseWithIndex(validate)([1, 2, 3])
		assert(isNothing(result))
	})

	await t.step("handles empty array", () => {
		const addIndex = (n: number, i: number): Maybe<number> => just(n + i)
		const result = traverseWithIndex(addIndex)([])
		assert(isJust(result))
		assertEquals(result.value, [])
	})

	await t.step("handles large array (stack safety)", () => {
		const addIndex = (n: number, i: number): Maybe<number> => just(n + i)
		const input = Array.from({ length: 10000 }, (_, i) => i * 10)
		const result = traverseWithIndex(addIndex)(input)
		assert(isJust(result))
		assertEquals(result.value.length, 10000)
	})
})
