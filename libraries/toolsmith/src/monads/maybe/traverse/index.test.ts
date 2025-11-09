import { assert, assertEquals } from "@std/assert"
import type { Maybe } from "../../../types/fp/maybe/index.ts"
import just from "../just/index.ts"
import nothing from "../nothing/index.ts"
import isJust from "../isJust/index.ts"
import isNothing from "../isNothing/index.ts"
import traverse from "./index.ts"

Deno.test("traverse", async (t) => {
	await t.step("maps and sequences all Just results", () => {
		const double = (n: number): Maybe<number> => just(n * 2)
		const result = traverse(double)([1, 2, 3])
		assert(isJust(result))
		assertEquals(result.value, [2, 4, 6])
	})

	await t.step("short-circuits on first Nothing", () => {
		const validate = (n: number): Maybe<number> => n < 0 ? nothing() : just(n)
		const result = traverse(validate)([1, -2, 3])
		assert(isNothing(result))
	})

	await t.step("handles empty array", () => {
		const double = (n: number): Maybe<number> => just(n * 2)
		const result = traverse(double)([])
		assert(isJust(result))
		assertEquals(result.value, [])
	})

	await t.step("handles large array (stack safety)", () => {
		const double = (n: number): Maybe<number> => just(n * 2)
		const input = Array.from({ length: 10000 }, (_, i) => i)
		const result = traverse(double)(input)
		assert(isJust(result))
		assertEquals(result.value.length, 10000)
	})
})
