import { assert, assertEquals } from "@std/assert"
import type { ExactOneDecimal } from "@sitebender/toolsmith/types/branded/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import subtractExactOneDecimal from "./index.ts"

Deno.test("subtractExactOneDecimal", async (t) => {
	await t.step("subtracts two positive exact one decimal values", () => {
		const minuend = 10.2 as ExactOneDecimal
		const subtrahend = 5.5 as ExactOneDecimal
		const result = subtractExactOneDecimal(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, 4.7)
	})

	await t.step("subtracts resulting in negative value", () => {
		const minuend = 5.5 as ExactOneDecimal
		const subtrahend = 10.2 as ExactOneDecimal
		const result = subtractExactOneDecimal(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, -4.7)
	})

	await t.step("subtracts negative value (equivalent to addition)", () => {
		const minuend = 10.5 as ExactOneDecimal
		const subtrahend = -3.2 as ExactOneDecimal
		const result = subtractExactOneDecimal(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, 13.7)
	})

	await t.step("subtracts from negative value", () => {
		const minuend = -10.5 as ExactOneDecimal
		const subtrahend = 5.2 as ExactOneDecimal
		const result = subtractExactOneDecimal(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, -15.7)
	})

	await t.step("handles subtraction with zero", () => {
		const minuend = 10.5 as ExactOneDecimal
		const subtrahend = 0 as ExactOneDecimal
		const result = subtractExactOneDecimal(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, 10.5)
	})

	await t.step("handles subtraction resulting in zero", () => {
		const minuend = 10.5 as ExactOneDecimal
		const subtrahend = 10.5 as ExactOneDecimal
		const result = subtractExactOneDecimal(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, 0)
	})

	await t.step("handles values with one decimal place", () => {
		const minuend = 10.5 as ExactOneDecimal
		const subtrahend = 5.5 as ExactOneDecimal
		const result = subtractExactOneDecimal(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, 5)
	})

	await t.step("handles very small values", () => {
		const minuend = 0.5 as ExactOneDecimal
		const subtrahend = 0.3 as ExactOneDecimal
		const result = subtractExactOneDecimal(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, 0.2)
	})

	await t.step("returns error when result is not finite", () => {
		const minuend = -Number.MAX_VALUE as ExactOneDecimal
		const subtrahend = Number.MAX_VALUE as ExactOneDecimal
		const result = subtractExactOneDecimal(minuend)(subtrahend)

		assert(isError(result))
		assertEquals(result.error.code, "EXACT_ONE_DECIMAL_NOT_FINITE")
	})
})
