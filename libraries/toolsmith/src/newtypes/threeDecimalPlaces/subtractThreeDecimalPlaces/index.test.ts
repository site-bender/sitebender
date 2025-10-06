import { assert, assertEquals } from "@std/assert"
import type { ThreeDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import subtractThreeDecimalPlaces from "./index.ts"

Deno.test("subtractThreeDecimalPlaces", async (t) => {
	await t.step("subtracts two positive exact three decimal values", () => {
		const minuend = 10.125 as ThreeDecimalPlaces
		const subtrahend = 5.5 as ThreeDecimalPlaces
		const result = subtractThreeDecimalPlaces(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, 4.625)
	})

	await t.step("subtracts resulting in negative value", () => {
		const minuend = 5.5 as ThreeDecimalPlaces
		const subtrahend = 10.125 as ThreeDecimalPlaces
		const result = subtractThreeDecimalPlaces(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, -4.625)
	})

	await t.step("subtracts negative value (equivalent to addition)", () => {
		const minuend = 10.5 as ThreeDecimalPlaces
		const subtrahend = -3.125 as ThreeDecimalPlaces
		const result = subtractThreeDecimalPlaces(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, 13.625)
	})

	await t.step("subtracts from negative value", () => {
		const minuend = -10.5 as ThreeDecimalPlaces
		const subtrahend = 5.125 as ThreeDecimalPlaces
		const result = subtractThreeDecimalPlaces(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, -15.625)
	})

	await t.step("handles subtraction with zero", () => {
		const minuend = 10.5 as ThreeDecimalPlaces
		const subtrahend = 0 as ThreeDecimalPlaces
		const result = subtractThreeDecimalPlaces(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, 10.5)
	})

	await t.step("handles subtraction resulting in zero", () => {
		const minuend = 10.5 as ThreeDecimalPlaces
		const subtrahend = 10.5 as ThreeDecimalPlaces
		const result = subtractThreeDecimalPlaces(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, 0)
	})

	await t.step("handles values with one decimal place", () => {
		const minuend = 10.5 as ThreeDecimalPlaces
		const subtrahend = 5.5 as ThreeDecimalPlaces
		const result = subtractThreeDecimalPlaces(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, 5)
	})

	await t.step("handles very small values", () => {
		const minuend = 0.005 as ThreeDecimalPlaces
		const subtrahend = 0.003 as ThreeDecimalPlaces
		const result = subtractThreeDecimalPlaces(minuend)(subtrahend)

		assert(isOk(result))
		assertEquals(result.value, 0.002)
	})

	await t.step("returns error when result is not finite", () => {
		const minuend = -Number.MAX_VALUE as ThreeDecimalPlaces
		const subtrahend = Number.MAX_VALUE as ThreeDecimalPlaces
		const result = subtractThreeDecimalPlaces(minuend)(subtrahend)

		assert(isError(result))
		assertEquals(result.error.code, "THREE_DECIMAL_PLACES_NOT_FINITE")
	})
})
