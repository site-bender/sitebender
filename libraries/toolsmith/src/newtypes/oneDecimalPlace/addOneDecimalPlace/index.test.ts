import { assert, assertEquals } from "@std/assert"
import type { OneDecimalPlace } from "@sitebender/toolsmith/types/branded/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import addOneDecimalPlace from "./index.ts"

Deno.test("addOneDecimalPlace", async (t) => {
	await t.step("adds two positive exact one decimal values", () => {
		const augend = 10.2 as OneDecimalPlace
		const addend = 5.5 as OneDecimalPlace
		const result = addOneDecimalPlace(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 15.7)
	})

	await t.step("adds positive and negative values", () => {
		const augend = 10.5 as OneDecimalPlace
		const addend = -3.2 as OneDecimalPlace
		const result = addOneDecimalPlace(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 7.3)
	})

	await t.step("adds two negative values", () => {
		const augend = -10.5 as OneDecimalPlace
		const addend = -5.2 as OneDecimalPlace
		const result = addOneDecimalPlace(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, -15.7)
	})

	await t.step("handles addition with zero", () => {
		const augend = 10.5 as OneDecimalPlace
		const addend = 0 as OneDecimalPlace
		const result = addOneDecimalPlace(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 10.5)
	})

	await t.step("handles values with one decimal place", () => {
		const augend = 10.5 as OneDecimalPlace
		const addend = 5.5 as OneDecimalPlace
		const result = addOneDecimalPlace(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 16)
	})

	await t.step("handles values with no decimal places", () => {
		const augend = 10 as OneDecimalPlace
		const addend = 5 as OneDecimalPlace
		const result = addOneDecimalPlace(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 15)
	})

	await t.step("handles precision edge case (result stays within 1 decimal)", () => {
		const augend = 10.1 as OneDecimalPlace
		const addend = 5.2 as OneDecimalPlace
		const result = addOneDecimalPlace(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 15.3)
	})

	await t.step("handles very small values", () => {
		const augend = 0.1 as OneDecimalPlace
		const addend = 0.1 as OneDecimalPlace
		const result = addOneDecimalPlace(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 0.2)
	})

	await t.step("returns error when result is not finite", () => {
		const augend = Number.MAX_VALUE as OneDecimalPlace
		const addend = Number.MAX_VALUE as OneDecimalPlace
		const result = addOneDecimalPlace(augend)(addend)

		assert(isError(result))
		assertEquals(result.error.code, "ONE_DECIMAL_PLACE_NOT_FINITE")
	})
})
