import { assert, assertEquals } from "@std/assert"
import type { ExactTwoDecimals } from "@sitebender/toolsmith/types/branded/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import subtractExactTwoDecimals from "./index.ts"

Deno.test("subtractExactTwoDecimals", async (t) => {
	await t.step("subtracts two positive exact two decimal values", () => {
		const minuend = 10.25 as ExactTwoDecimals
		const subtrahend = 5.5 as ExactTwoDecimals
		const result = subtractExactTwoDecimals(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, 4.75)
	})

	await t.step("subtracts resulting in negative value", () => {
		const minuend = 5.5 as ExactTwoDecimals
		const subtrahend = 10.25 as ExactTwoDecimals
		const result = subtractExactTwoDecimals(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, -4.75)
	})

	await t.step("subtracts negative value (equivalent to addition)", () => {
		const minuend = 10.5 as ExactTwoDecimals
		const subtrahend = -3.25 as ExactTwoDecimals
		const result = subtractExactTwoDecimals(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, 13.75)
	})

	await t.step("subtracts from negative value", () => {
		const minuend = -10.5 as ExactTwoDecimals
		const subtrahend = 5.25 as ExactTwoDecimals
		const result = subtractExactTwoDecimals(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, -15.75)
	})

	await t.step("handles subtraction with zero", () => {
		const minuend = 10.5 as ExactTwoDecimals
		const subtrahend = 0 as ExactTwoDecimals
		const result = subtractExactTwoDecimals(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, 10.5)
	})

	await t.step("handles subtraction resulting in zero", () => {
		const minuend = 10.5 as ExactTwoDecimals
		const subtrahend = 10.5 as ExactTwoDecimals
		const result = subtractExactTwoDecimals(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, 0)
	})

	await t.step("handles values with one decimal place", () => {
		const minuend = 10.5 as ExactTwoDecimals
		const subtrahend = 5.5 as ExactTwoDecimals
		const result = subtractExactTwoDecimals(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, 5)
	})

	await t.step("handles very small values", () => {
		const minuend = 0.05 as ExactTwoDecimals
		const subtrahend = 0.03 as ExactTwoDecimals
		const result = subtractExactTwoDecimals(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, 0.02)
	})

	await t.step("returns error when result is not finite", () => {
		const minuend = -Number.MAX_VALUE as ExactTwoDecimals
		const subtrahend = Number.MAX_VALUE as ExactTwoDecimals
		const result = subtractExactTwoDecimals(minuend)(subtrahend)

		assert(isError(result))
		assertEquals(result.error.code, "EXACT_TWO_DECIMALS_NOT_FINITE")
	})
})
