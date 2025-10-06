import { assert, assertEquals } from "@std/assert"
import type { ExactFourDecimals } from "@sitebender/toolsmith/types/branded/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import divideExactFourDecimals from "./index.ts"

Deno.test("divideExactFourDecimals", async (t) => {
	await t.step("divides two positive exact four decimal values", () => {
		const dividend = 21 as ExactFourDecimals
		const divisor = 2 as ExactFourDecimals
		const result = divideExactFourDecimals(dividend)(divisor)

		assert(isOk(result))
		assertEquals(result.value, 10.5)
	})

	await t.step("divides with exact decimal result", () => {
		const dividend = 20.505 as ExactFourDecimals
		const divisor = 2 as ExactFourDecimals
		const result = divideExactFourDecimals(dividend)(divisor)

		assert(isOk(result))
		assertEquals(result.value, 10.2525)
	})

	await t.step("divides positive by negative value", () => {
		const dividend = 21 as ExactFourDecimals
		const divisor = -2 as ExactFourDecimals
		const result = divideExactFourDecimals(dividend)(divisor)

		assert(isOk(result))
		assertEquals(result.value, -10.5)
	})

	await t.step("divides two negative values", () => {
		const dividend = -21 as ExactFourDecimals
		const divisor = -2 as ExactFourDecimals
		const result = divideExactFourDecimals(dividend)(divisor)

		assert(isOk(result))
		assertEquals(result.value, 10.5)
	})

	await t.step("divides by one", () => {
		const dividend = 10.5432 as ExactFourDecimals
		const divisor = 1 as ExactFourDecimals
		const result = divideExactFourDecimals(dividend)(divisor)

		assert(isOk(result))
		assertEquals(result.value, 10.5432)
	})

	await t.step("divides zero by non-zero", () => {
		const dividend = 0 as ExactFourDecimals
		const divisor = 5 as ExactFourDecimals
		const result = divideExactFourDecimals(dividend)(divisor)

		assert(isOk(result))
		assertEquals(result.value, 0)
	})

	await t.step("returns error when dividing by zero", () => {
		const dividend = 10.5432 as ExactFourDecimals
		const divisor = 0 as ExactFourDecimals
		const result = divideExactFourDecimals(dividend)(divisor)

		assert(isError(result))
		assertEquals(result.error.code, "EXACT_FOUR_DECIMALS_NOT_FINITE")
	})

	await t.step("divides fractional values", () => {
		const dividend = 0.5 as ExactFourDecimals
		const divisor = 0.5 as ExactFourDecimals
		const result = divideExactFourDecimals(dividend)(divisor)

		assert(isOk(result))
		assertEquals(result.value, 1)
	})

	await t.step("handles very small results", () => {
		const dividend = 0.0002 as ExactFourDecimals
		const divisor = 2 as ExactFourDecimals
		const result = divideExactFourDecimals(dividend)(divisor)

		assert(isOk(result))
		assertEquals(result.value, 0.0001)
	})

	await t.step("returns error when result exceeds precision", () => {
		const dividend = 1 as ExactFourDecimals
		const divisor = 3 as ExactFourDecimals
		const result = divideExactFourDecimals(dividend)(divisor)

		assert(isError(result))
		assertEquals(result.error.code, "EXACT_FOUR_DECIMALS_PRECISION_EXCEEDED")
	})

	await t.step("returns error when result is not finite", () => {
		const dividend = Number.MAX_VALUE as ExactFourDecimals
		const divisor = 0.0001 as ExactFourDecimals
		const result = divideExactFourDecimals(dividend)(divisor)

		assert(isError(result))
		assertEquals(result.error.code, "EXACT_FOUR_DECIMALS_NOT_FINITE")
	})
})
