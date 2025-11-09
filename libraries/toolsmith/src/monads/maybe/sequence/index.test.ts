import { assert, assertEquals } from "@std/assert"
import type { Maybe } from "../../../types/fp/maybe/index.ts"
import just from "../just/index.ts"
import nothing from "../nothing/index.ts"
import isJust from "../isJust/index.ts"
import isNothing from "../isNothing/index.ts"
import sequence from "./index.ts"

Deno.test("sequence", async (t) => {
	await t.step("converts array of Just values to Just of array", () => {
		const result = sequence()([just(1), just(2), just(3)])
		assert(isJust(result))
		assertEquals(result.value, [1, 2, 3])
	})

	await t.step("returns Nothing on first Nothing (short-circuit)", () => {
		const result = sequence()([just(1), nothing(), just(3)])
		assert(isNothing(result))
	})

	await t.step("handles empty array", () => {
		const result = sequence<number>()([])
		assert(isJust(result))
		assertEquals(result.value, [])
	})

	await t.step("handles large array (stack safety)", () => {
		const input = Array.from({ length: 10000 }, (_, i) => just(i))
		const result = sequence()(input)
		assert(isJust(result))
		assertEquals(result.value.length, 10000)
	})
})
