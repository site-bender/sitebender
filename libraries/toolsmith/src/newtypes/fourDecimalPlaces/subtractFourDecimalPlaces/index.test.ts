import { assert, assertEquals } from "@std/assert"
import type { FourDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import subtractFourDecimalPlaces from "./index.ts"

Deno.test("subtractFourDecimalPlaces", async (t) => {
	await t.step("subtracts two positive exact four decimal values", () => {
		const minuend = 10.2525 as FourDecimalPlaces
		const subtrahend = 5.5432 as FourDecimalPlaces
		const result = subtractFourDecimalPlaces(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, 4.7093)
	})

	await t.step("subtracts resulting in negative value", () => {
		const minuend = 5.5432 as FourDecimalPlaces
		const subtrahend = 10.2525 as FourDecimalPlaces
		const result = subtractFourDecimalPlaces(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, -4.7093)
	})

	await t.step("subtracts negative value (equivalent to addition)", () => {
		const minuend = 10.5432 as FourDecimalPlaces
		const subtrahend = -3.2543 as FourDecimalPlaces
		const result = subtractFourDecimalPlaces(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, 13.7975)
	})

	await t.step("subtracts from negative value", () => {
		const minuend = -10.5432 as FourDecimalPlaces
		const subtrahend = 5.2543 as FourDecimalPlaces
		const result = subtractFourDecimalPlaces(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, -15.7975)
	})

	await t.step("handles subtraction with zero", () => {
		const minuend = 10.5432 as FourDecimalPlaces
		const subtrahend = 0 as FourDecimalPlaces
		const result = subtractFourDecimalPlaces(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, 10.5432)
	})

	await t.step("handles subtraction resulting in zero", () => {
		const minuend = 10.5432 as FourDecimalPlaces
		const subtrahend = 10.5432 as FourDecimalPlaces
		const result = subtractFourDecimalPlaces(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, 0)
	})

	await t.step("handles values with fewer decimal places", () => {
		const minuend = 10.5 as FourDecimalPlaces
		const subtrahend = 5.5 as FourDecimalPlaces
		const result = subtractFourDecimalPlaces(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, 5)
	})

	await t.step("handles very small values", () => {
		const minuend = 0.0005 as FourDecimalPlaces
		const subtrahend = 0.0003 as FourDecimalPlaces
		const result = subtractFourDecimalPlaces(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, 0.0002)
	})

	await t.step("returns error when result is not finite", () => {
		const minuend = -Number.MAX_VALUE as FourDecimalPlaces
		const subtrahend = Number.MAX_VALUE as FourDecimalPlaces
		const result = subtractFourDecimalPlaces(minuend)(subtrahend)

		assert(isError(result))
		assertEquals(result.error.code, "FOUR_DECIMAL_PLACES_NOT_FINITE")
	})
})
