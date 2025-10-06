import { assert, assertEquals } from "@std/assert"
import type { ExactOneDecimal } from "@sitebender/toolsmith/types/branded/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import multiplyExactOneDecimal from "./index.ts"

Deno.test("multiplyExactOneDecimal", async (t) => {
	await t.step("multiplies two positive exact one decimal values", () => {
		const multiplicand = 10.5 as ExactOneDecimal
		const multiplier = 2 as ExactOneDecimal
		const result = multiplyExactOneDecimal(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 21)
	})

	await t.step("multiplies with decimal results", () => {
		const multiplicand = 10.2 as ExactOneDecimal
		const multiplier = 2 as ExactOneDecimal
		const result = multiplyExactOneDecimal(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 20.4)
	})

	await t.step("multiplies positive and negative values", () => {
		const multiplicand = 10.5 as ExactOneDecimal
		const multiplier = -2 as ExactOneDecimal
		const result = multiplyExactOneDecimal(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, -21)
	})

	await t.step("multiplies two negative values", () => {
		const multiplicand = -10.5 as ExactOneDecimal
		const multiplier = -2 as ExactOneDecimal
		const result = multiplyExactOneDecimal(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 21)
	})

	await t.step("handles multiplication by zero", () => {
		const multiplicand = 10.5 as ExactOneDecimal
		const multiplier = 0 as ExactOneDecimal
		const result = multiplyExactOneDecimal(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 0)
	})

	await t.step("handles multiplication by one", () => {
		const multiplicand = 10.5 as ExactOneDecimal
		const multiplier = 1 as ExactOneDecimal
		const result = multiplyExactOneDecimal(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 10.5)
	})

	await t.step("multiplies fractional values", () => {
		const multiplicand = 0.5 as ExactOneDecimal
		const multiplier = 0.4 as ExactOneDecimal
		const result = multiplyExactOneDecimal(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 0.2)
	})

	await t.step("handles very small values", () => {
		const multiplicand = 0.1 as ExactOneDecimal
		const multiplier = 2 as ExactOneDecimal
		const result = multiplyExactOneDecimal(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 0.2)
	})

	await t.step("returns error when result exceeds precision", () => {
		const multiplicand = 1.1 as ExactOneDecimal
		const multiplier = 1.1 as ExactOneDecimal
		const result = multiplyExactOneDecimal(multiplicand)(multiplier)

		assert(isError(result))
		assertEquals(result.error.code, "EXACT_ONE_DECIMAL_PRECISION_EXCEEDED")
	})

	await t.step("returns error when result is not finite", () => {
		const multiplicand = Number.MAX_VALUE as ExactOneDecimal
		const multiplier = 2 as ExactOneDecimal
		const result = multiplyExactOneDecimal(multiplicand)(multiplier)

		assert(isError(result))
		assertEquals(result.error.code, "EXACT_ONE_DECIMAL_NOT_FINITE")
	})
})
