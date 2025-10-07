import { assert, assertEquals } from "@std/assert"
import type { FourDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import addFourDecimalPlaces from "./index.ts"

Deno.test("addFourDecimalPlaces", async (t) => {
	await t.step("adds two positive exact four decimal values", () => {
		const augend = 10.2525 as FourDecimalPlaces
		const addend = 5.5432 as FourDecimalPlaces
		const result = addFourDecimalPlaces(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 15.7957)
	})

	await t.step("adds positive and negative values", () => {
		const augend = 10.5432 as FourDecimalPlaces
		const addend = -3.2543 as FourDecimalPlaces
		const result = addFourDecimalPlaces(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 7.2889)
	})

	await t.step("adds two negative values", () => {
		const augend = -10.5432 as FourDecimalPlaces
		const addend = -5.2543 as FourDecimalPlaces
		const result = addFourDecimalPlaces(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, -15.7975)
	})

	await t.step("handles addition with zero", () => {
		const augend = 10.5432 as FourDecimalPlaces
		const addend = 0 as FourDecimalPlaces
		const result = addFourDecimalPlaces(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 10.5432)
	})

	await t.step("handles values with fewer decimal places", () => {
		const augend = 10.5 as FourDecimalPlaces
		const addend = 5.5 as FourDecimalPlaces
		const result = addFourDecimalPlaces(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 16)
	})

	await t.step("handles values with no decimal places", () => {
		const augend = 10 as FourDecimalPlaces
		const addend = 5 as FourDecimalPlaces
		const result = addFourDecimalPlaces(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 15)
	})

	await t.step("handles precision edge case (result stays within 4 decimals)", () => {
		const augend = 10.1111 as FourDecimalPlaces
		const addend = 5.2222 as FourDecimalPlaces
		const result = addFourDecimalPlaces(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 15.3333)
	})

	await t.step("handles very small values", () => {
		const augend = 0.0001 as FourDecimalPlaces
		const addend = 0.0001 as FourDecimalPlaces
		const result = addFourDecimalPlaces(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 0.0002)
	})

	await t.step("returns error when result is not finite", () => {
		const augend = Number.MAX_VALUE as FourDecimalPlaces
		const addend = Number.MAX_VALUE as FourDecimalPlaces
		const result = addFourDecimalPlaces(augend)(addend)

		assert(isError(result))
		assertEquals(result.error.code, "FOUR_DECIMAL_PLACES_NOT_FINITE")
	})
})
