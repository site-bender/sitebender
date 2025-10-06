import { assert, assertEquals } from "@std/assert"
import type { FourDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import multiplyFourDecimalPlaces from "./index.ts"

Deno.test("multiplyFourDecimalPlaces", async (t) => {
	await t.step("multiplies two positive exact four decimal values", () => {
		const multiplicand = 10.5432 as FourDecimalPlaces
		const multiplier = 2 as FourDecimalPlaces
		const result = multiplyFourDecimalPlaces(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 21.0864)
	})

	await t.step("multiplies with decimal results", () => {
		const multiplicand = 10.2525 as FourDecimalPlaces
		const multiplier = 2 as FourDecimalPlaces
		const result = multiplyFourDecimalPlaces(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 20.505)
	})

	await t.step("multiplies positive and negative values", () => {
		const multiplicand = 10.5432 as FourDecimalPlaces
		const multiplier = -2 as FourDecimalPlaces
		const result = multiplyFourDecimalPlaces(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, -21.0864)
	})

	await t.step("multiplies two negative values", () => {
		const multiplicand = -10.5432 as FourDecimalPlaces
		const multiplier = -2 as FourDecimalPlaces
		const result = multiplyFourDecimalPlaces(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 21.0864)
	})

	await t.step("handles multiplication by zero", () => {
		const multiplicand = 10.5432 as FourDecimalPlaces
		const multiplier = 0 as FourDecimalPlaces
		const result = multiplyFourDecimalPlaces(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 0)
	})

	await t.step("handles multiplication by one", () => {
		const multiplicand = 10.5432 as FourDecimalPlaces
		const multiplier = 1 as FourDecimalPlaces
		const result = multiplyFourDecimalPlaces(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 10.5432)
	})

	await t.step("multiplies fractional values", () => {
		const multiplicand = 0.5 as FourDecimalPlaces
		const multiplier = 0.5 as FourDecimalPlaces
		const result = multiplyFourDecimalPlaces(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 0.25)
	})

	await t.step("handles very small values", () => {
		const multiplicand = 0.0001 as FourDecimalPlaces
		const multiplier = 2 as FourDecimalPlaces
		const result = multiplyFourDecimalPlaces(multiplicand)(multiplier)

		assert(isOk(result))
		assertEquals(result.value, 0.0002)
	})

	await t.step("returns error when result exceeds precision", () => {
		const multiplicand = 1.1111 as FourDecimalPlaces
		const multiplier = 1.1111 as FourDecimalPlaces
		const result = multiplyFourDecimalPlaces(multiplicand)(multiplier)

		assert(isError(result))
		assertEquals(result.error.code, "FOUR_DECIMAL_PLACES_PRECISION_EXCEEDED")
	})

	await t.step("returns error when result is not finite", () => {
		const multiplicand = Number.MAX_VALUE as FourDecimalPlaces
		const multiplier = 2 as FourDecimalPlaces
		const result = multiplyFourDecimalPlaces(multiplicand)(multiplier)

		assert(isError(result))
		assertEquals(result.error.code, "FOUR_DECIMAL_PLACES_NOT_FINITE")
	})
})
