import { assert, assertEquals } from "@std/assert"
import type { ExactFourDecimals } from "@sitebender/toolsmith/types/branded/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import multiplyExactFourDecimals from "./index.ts"

Deno.test("multiplyExactFourDecimals", async (t) => {
	await t.step("multiplies two positive exact four decimal values", () => {
		const multiplicand = 10.5432 as ExactFourDecimals
		const multiplier = 2 as ExactFourDecimals
		const result = multiplyExactFourDecimals(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 21.0864)
	})

	await t.step("multiplies with decimal results", () => {
		const multiplicand = 10.2525 as ExactFourDecimals
		const multiplier = 2 as ExactFourDecimals
		const result = multiplyExactFourDecimals(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 20.505)
	})

	await t.step("multiplies positive and negative values", () => {
		const multiplicand = 10.5432 as ExactFourDecimals
		const multiplier = -2 as ExactFourDecimals
		const result = multiplyExactFourDecimals(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, -21.0864)
	})

	await t.step("multiplies two negative values", () => {
		const multiplicand = -10.5432 as ExactFourDecimals
		const multiplier = -2 as ExactFourDecimals
		const result = multiplyExactFourDecimals(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 21.0864)
	})

	await t.step("handles multiplication by zero", () => {
		const multiplicand = 10.5432 as ExactFourDecimals
		const multiplier = 0 as ExactFourDecimals
		const result = multiplyExactFourDecimals(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 0)
	})

	await t.step("handles multiplication by one", () => {
		const multiplicand = 10.5432 as ExactFourDecimals
		const multiplier = 1 as ExactFourDecimals
		const result = multiplyExactFourDecimals(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 10.5432)
	})

	await t.step("multiplies fractional values", () => {
		const multiplicand = 0.5 as ExactFourDecimals
		const multiplier = 0.5 as ExactFourDecimals
		const result = multiplyExactFourDecimals(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 0.25)
	})

	await t.step("handles very small values", () => {
		const multiplicand = 0.0001 as ExactFourDecimals
		const multiplier = 2 as ExactFourDecimals
		const result = multiplyExactFourDecimals(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 0.0002)
	})

	await t.step("returns error when result exceeds precision", () => {
		const multiplicand = 1.1111 as ExactFourDecimals
		const multiplier = 1.1111 as ExactFourDecimals
		const result = multiplyExactFourDecimals(multiplicand)(multiplier)

		assert(isError(result))
		assertEquals(result.error.code, "EXACT_FOUR_DECIMALS_PRECISION_EXCEEDED")
	})

	await t.step("returns error when result is not finite", () => {
		const multiplicand = Number.MAX_VALUE as ExactFourDecimals
		const multiplier = 2 as ExactFourDecimals
		const result = multiplyExactFourDecimals(multiplicand)(multiplier)

		assert(isError(result))
		assertEquals(result.error.code, "EXACT_FOUR_DECIMALS_NOT_FINITE")
	})
})
