import { assert, assertEquals } from "@std/assert"
import type { ExactTwoDecimals } from "@sitebender/toolsmith/types/branded/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import addExactTwoDecimals from "./index.ts"

Deno.test("addExactTwoDecimals", async (t) => {
	await t.step("adds two positive exact two decimal values", () => {
		const augend = 10.25 as ExactTwoDecimals
		const addend = 5.5 as ExactTwoDecimals
		const result = addExactTwoDecimals(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 15.75)
	})

	await t.step("adds positive and negative values", () => {
		const augend = 10.5 as ExactTwoDecimals
		const addend = -3.25 as ExactTwoDecimals
		const result = addExactTwoDecimals(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 7.25)
	})

	await t.step("adds two negative values", () => {
		const augend = -10.5 as ExactTwoDecimals
		const addend = -5.25 as ExactTwoDecimals
		const result = addExactTwoDecimals(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, -15.75)
	})

	await t.step("handles addition with zero", () => {
		const augend = 10.5 as ExactTwoDecimals
		const addend = 0 as ExactTwoDecimals
		const result = addExactTwoDecimals(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 10.5)
	})

	await t.step("handles values with one decimal place", () => {
		const augend = 10.5 as ExactTwoDecimals
		const addend = 5.5 as ExactTwoDecimals
		const result = addExactTwoDecimals(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 16)
	})

	await t.step("handles values with no decimal places", () => {
		const augend = 10 as ExactTwoDecimals
		const addend = 5 as ExactTwoDecimals
		const result = addExactTwoDecimals(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 15)
	})

	await t.step("handles precision edge case (result stays within 2 decimals)", () => {
		const augend = 10.11 as ExactTwoDecimals
		const addend = 5.22 as ExactTwoDecimals
		const result = addExactTwoDecimals(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 15.33)
	})

	await t.step("handles very small values", () => {
		const augend = 0.01 as ExactTwoDecimals
		const addend = 0.01 as ExactTwoDecimals
		const result = addExactTwoDecimals(augend)(addend)

		assert(isOk(result))
		assertEquals(result.value, 0.02)
	})

	await t.step("returns error when result is not finite", () => {
		const augend = Number.MAX_VALUE as ExactTwoDecimals
		const addend = Number.MAX_VALUE as ExactTwoDecimals
		const result = addExactTwoDecimals(augend)(addend)

		assert(isError(result))
		assertEquals(result.error.code, "EXACT_TWO_DECIMALS_NOT_FINITE")
	})
})
