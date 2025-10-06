import { assert, assertEquals } from "@std/assert"
import type { ExactTwoDecimals } from "@sitebender/toolsmith/types/branded/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import multiplyExactTwoDecimals from "./index.ts"

Deno.test("multiplyExactTwoDecimals", async (t) => {
	await t.step("multiplies two positive exact two decimal values", () => {
		const multiplicand = 10.5 as ExactTwoDecimals
		const multiplier = 2 as ExactTwoDecimals
		const result = multiplyExactTwoDecimals(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 21)
	})

	await t.step("multiplies with decimal results", () => {
		const multiplicand = 10.25 as ExactTwoDecimals
		const multiplier = 2 as ExactTwoDecimals
		const result = multiplyExactTwoDecimals(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 20.5)
	})

	await t.step("multiplies positive and negative values", () => {
		const multiplicand = 10.5 as ExactTwoDecimals
		const multiplier = -2 as ExactTwoDecimals
		const result = multiplyExactTwoDecimals(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, -21)
	})

	await t.step("multiplies two negative values", () => {
		const multiplicand = -10.5 as ExactTwoDecimals
		const multiplier = -2 as ExactTwoDecimals
		const result = multiplyExactTwoDecimals(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 21)
	})

	await t.step("handles multiplication by zero", () => {
		const multiplicand = 10.5 as ExactTwoDecimals
		const multiplier = 0 as ExactTwoDecimals
		const result = multiplyExactTwoDecimals(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 0)
	})

	await t.step("handles multiplication by one", () => {
		const multiplicand = 10.5 as ExactTwoDecimals
		const multiplier = 1 as ExactTwoDecimals
		const result = multiplyExactTwoDecimals(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 10.5)
	})

	await t.step("multiplies fractional values", () => {
		const multiplicand = 0.5 as ExactTwoDecimals
		const multiplier = 0.5 as ExactTwoDecimals
		const result = multiplyExactTwoDecimals(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 0.25)
	})

	await t.step("handles very small values", () => {
		const multiplicand = 0.01 as ExactTwoDecimals
		const multiplier = 2 as ExactTwoDecimals
		const result = multiplyExactTwoDecimals(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 0.02)
	})

	await t.step("returns error when result exceeds precision", () => {
		const multiplicand = 1.11 as ExactTwoDecimals
		const multiplier = 1.11 as ExactTwoDecimals
		const result = multiplyExactTwoDecimals(multiplicand)(multiplier)

		assert(isError(result))
		assertEquals(result.error.code, "EXACT_TWO_DECIMALS_PRECISION_EXCEEDED")
	})

	await t.step("returns error when result is not finite", () => {
		const multiplicand = Number.MAX_VALUE as ExactTwoDecimals
		const multiplier = 2 as ExactTwoDecimals
		const result = multiplyExactTwoDecimals(multiplicand)(multiplier)

		assert(isError(result))
		assertEquals(result.error.code, "EXACT_TWO_DECIMALS_NOT_FINITE")
	})
})
