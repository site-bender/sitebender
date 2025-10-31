import { assert, assertEquals } from "@std/assert"
import type { ThreeDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import addThreeDecimalPlaces from "./index.ts"

Deno.test("addThreeDecimalPlaces", async (t) => {
	await t.step("adds two positive exact three decimal values", () => {
		const augend = 10.125 as ThreeDecimalPlaces
		const addend = 5.5 as ThreeDecimalPlaces
		const result = addThreeDecimalPlaces(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 15.625)
	})

	await t.step("adds positive and negative values", () => {
		const augend = 10.5 as ThreeDecimalPlaces
		const addend = -3.125 as ThreeDecimalPlaces
		const result = addThreeDecimalPlaces(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 7.375)
	})

	await t.step("adds two negative values", () => {
		const augend = -10.5 as ThreeDecimalPlaces
		const addend = -5.125 as ThreeDecimalPlaces
		const result = addThreeDecimalPlaces(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, -15.625)
	})

	await t.step("handles addition with zero", () => {
		const augend = 10.5 as ThreeDecimalPlaces
		const addend = 0 as ThreeDecimalPlaces
		const result = addThreeDecimalPlaces(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 10.5)
	})

	await t.step("handles values with one decimal place", () => {
		const augend = 10.5 as ThreeDecimalPlaces
		const addend = 5.5 as ThreeDecimalPlaces
		const result = addThreeDecimalPlaces(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 16)
	})

	await t.step("handles values with no decimal places", () => {
		const augend = 10 as ThreeDecimalPlaces
		const addend = 5 as ThreeDecimalPlaces
		const result = addThreeDecimalPlaces(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 15)
	})

	await t.step(
		"handles precision edge case (result stays within 3 decimals)",
		() => {
			const augend = 10.111 as ThreeDecimalPlaces
			const addend = 5.222 as ThreeDecimalPlaces
			const result = addThreeDecimalPlaces(augend)(addend)

			assert(isOk(result))
			assertEquals(result.value, 15.333)
		},
	)

	await t.step("handles very small values", () => {
		const augend = 0.001 as ThreeDecimalPlaces
		const addend = 0.001 as ThreeDecimalPlaces
		const result = addThreeDecimalPlaces(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 0.002)
	})

	await t.step("returns error when result is not finite", () => {
		const augend = Number.MAX_VALUE as ThreeDecimalPlaces
		const addend = Number.MAX_VALUE as ThreeDecimalPlaces
		const result = addThreeDecimalPlaces(augend)(addend)

		assert(isError(result))
		assertEquals(result.error.code, "THREE_DECIMAL_PLACES_NOT_FINITE")
	})
})
