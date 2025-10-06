import { assert, assertEquals } from "@std/assert"
import type { ExactTwoDecimals } from "@sitebender/toolsmith/types/branded/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import divideExactTwoDecimals from "./index.ts"

Deno.test("divideExactTwoDecimals", async (t) => {
	await t.step("divides two positive exact two decimal values", () => {
		const dividend = 21 as ExactTwoDecimals
		const divisor = 2 as ExactTwoDecimals
		const result = divideExactTwoDecimals(dividend)(divisor)

		assert(isOk(result))
		assertEquals(result.value, 10.5)
	})

	await t.step("divides with exact decimal result", () => {
		const dividend = 20.5 as ExactTwoDecimals
		const divisor = 2 as ExactTwoDecimals
		const result = divideExactTwoDecimals(dividend)(divisor)

		assert(isOk(result))
		assertEquals(result.value, 10.25)
	})

	await t.step("divides positive by negative value", () => {
		const dividend = 21 as ExactTwoDecimals
		const divisor = -2 as ExactTwoDecimals
		const result = divideExactTwoDecimals(dividend)(divisor)

		assert(isOk(result))
		assertEquals(result.value, -10.5)
	})

	await t.step("divides two negative values", () => {
		const dividend = -21 as ExactTwoDecimals
		const divisor = -2 as ExactTwoDecimals
		const result = divideExactTwoDecimals(dividend)(divisor)

		assert(isOk(result))
		assertEquals(result.value, 10.5)
	})

	await t.step("divides by one", () => {
		const dividend = 10.5 as ExactTwoDecimals
		const divisor = 1 as ExactTwoDecimals
		const result = divideExactTwoDecimals(dividend)(divisor)

		assert(isOk(result))
		assertEquals(result.value, 10.5)
	})

	await t.step("divides zero by non-zero", () => {
		const dividend = 0 as ExactTwoDecimals
		const divisor = 5 as ExactTwoDecimals
		const result = divideExactTwoDecimals(dividend)(divisor)

		assert(isOk(result))
		assertEquals(result.value, 0)
	})

	await t.step("returns error when dividing by zero", () => {
		const dividend = 10.5 as ExactTwoDecimals
		const divisor = 0 as ExactTwoDecimals
		const result = divideExactTwoDecimals(dividend)(divisor)

		assert(isError(result))
		assertEquals(result.error.code, "EXACT_TWO_DECIMALS_NOT_FINITE")
	})

	await t.step("divides fractional values", () => {
		const dividend = 0.5 as ExactTwoDecimals
		const divisor = 0.5 as ExactTwoDecimals
		const result = divideExactTwoDecimals(dividend)(divisor)

		assert(isOk(result))
		assertEquals(result.value, 1)
	})

	await t.step("handles very small results", () => {
		const dividend = 0.02 as ExactTwoDecimals
		const divisor = 2 as ExactTwoDecimals
		const result = divideExactTwoDecimals(dividend)(divisor)

		assert(isOk(result))
		assertEquals(result.value, 0.01)
	})

	await t.step("returns error when result exceeds precision", () => {
		const dividend = 1 as ExactTwoDecimals
		const divisor = 3 as ExactTwoDecimals
		const result = divideExactTwoDecimals(dividend)(divisor)

		assert(isError(result))
		assertEquals(result.error.code, "EXACT_TWO_DECIMALS_PRECISION_EXCEEDED")
	})

	await t.step("returns error when result is not finite", () => {
		const dividend = Number.MAX_VALUE as ExactTwoDecimals
		const divisor = 0.01 as ExactTwoDecimals
		const result = divideExactTwoDecimals(dividend)(divisor)

		assert(isError(result))
		assertEquals(result.error.code, "EXACT_TWO_DECIMALS_NOT_FINITE")
	})
})
