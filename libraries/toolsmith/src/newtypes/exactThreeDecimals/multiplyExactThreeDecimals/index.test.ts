import { assert, assertEquals } from "@std/assert"
import type { ExactThreeDecimals } from "@sitebender/toolsmith/types/branded/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import multiplyExactThreeDecimals from "./index.ts"

Deno.test("multiplyExactThreeDecimals", async (t) => {
	await t.step("multiplies two positive exact three decimal values", () => {
		const multiplicand = 10.5 as ExactThreeDecimals
		const multiplier = 2 as ExactThreeDecimals
		const result = multiplyExactThreeDecimals(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 21)
	})

	await t.step("multiplies with decimal results", () => {
		const multiplicand = 10.125 as ExactThreeDecimals
		const multiplier = 2 as ExactThreeDecimals
		const result = multiplyExactThreeDecimals(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 20.25)
	})

	await t.step("multiplies positive and negative values", () => {
		const multiplicand = 10.5 as ExactThreeDecimals
		const multiplier = -2 as ExactThreeDecimals
		const result = multiplyExactThreeDecimals(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, -21)
	})

	await t.step("multiplies two negative values", () => {
		const multiplicand = -10.5 as ExactThreeDecimals
		const multiplier = -2 as ExactThreeDecimals
		const result = multiplyExactThreeDecimals(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 21)
	})

	await t.step("handles multiplication by zero", () => {
		const multiplicand = 10.5 as ExactThreeDecimals
		const multiplier = 0 as ExactThreeDecimals
		const result = multiplyExactThreeDecimals(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 0)
	})

	await t.step("handles multiplication by one", () => {
		const multiplicand = 10.5 as ExactThreeDecimals
		const multiplier = 1 as ExactThreeDecimals
		const result = multiplyExactThreeDecimals(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 10.5)
	})

	await t.step("multiplies fractional values", () => {
		const multiplicand = 0.5 as ExactThreeDecimals
		const multiplier = 0.5 as ExactThreeDecimals
		const result = multiplyExactThreeDecimals(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 0.25)
	})

	await t.step("handles very small values", () => {
		const multiplicand = 0.001 as ExactThreeDecimals
		const multiplier = 2 as ExactThreeDecimals
		const result = multiplyExactThreeDecimals(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 0.002)
	})

	await t.step("returns error when result exceeds precision", () => {
		const multiplicand = 1.111 as ExactThreeDecimals
		const multiplier = 1.111 as ExactThreeDecimals
		const result = multiplyExactThreeDecimals(multiplicand)(multiplier)

		assert(isError(result))
		assertEquals(result.error.code, "EXACT_THREE_DECIMALS_PRECISION_EXCEEDED")
	})

	await t.step("returns error when result is not finite", () => {
		const multiplicand = Number.MAX_VALUE as ExactThreeDecimals
		const multiplier = 2 as ExactThreeDecimals
		const result = multiplyExactThreeDecimals(multiplicand)(multiplier)

		assert(isError(result))
		assertEquals(result.error.code, "EXACT_THREE_DECIMALS_NOT_FINITE")
	})
})
