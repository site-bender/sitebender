import { assert, assertEquals } from "@std/assert"
import type { FourDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import divideFourDecimalPlaces from "./index.ts"

Deno.test("divideFourDecimalPlaces", async (t) => {
	await t.step("divides two positive exact four decimal values", () => {
		const dividend = 21 as FourDecimalPlaces
		const divisor = 2 as FourDecimalPlaces
		const result = divideFourDecimalPlaces(dividend)(divisor)

		assert(isOk(result))
		assertEquals(result.value, 10.5)
	})

	await t.step("divides with exact decimal result", () => {
		const dividend = 20.505 as FourDecimalPlaces
		const divisor = 2 as FourDecimalPlaces
		const result = divideFourDecimalPlaces(dividend)(divisor)

		assert(isOk(result))
		assertEquals(result.value, 10.2525)
	})

	await t.step("divides positive by negative value", () => {
		const dividend = 21 as FourDecimalPlaces
		const divisor = -2 as FourDecimalPlaces
		const result = divideFourDecimalPlaces(dividend)(divisor)

		assert(isOk(result))
		assertEquals(result.value, -10.5)
	})

	await t.step("divides two negative values", () => {
		const dividend = -21 as FourDecimalPlaces
		const divisor = -2 as FourDecimalPlaces
		const result = divideFourDecimalPlaces(dividend)(divisor)

		assert(isOk(result))
		assertEquals(result.value, 10.5)
	})

	await t.step("divides by one", () => {
		const dividend = 10.5432 as FourDecimalPlaces
		const divisor = 1 as FourDecimalPlaces
		const result = divideFourDecimalPlaces(dividend)(divisor)

		assert(isOk(result))
		assertEquals(result.value, 10.5432)
	})

	await t.step("divides zero by non-zero", () => {
		const dividend = 0 as FourDecimalPlaces
		const divisor = 5 as FourDecimalPlaces
		const result = divideFourDecimalPlaces(dividend)(divisor)

		assert(isOk(result))
		assertEquals(result.value, 0)
	})

	await t.step("returns error when dividing by zero", () => {
		const dividend = 10.5432 as FourDecimalPlaces
		const divisor = 0 as FourDecimalPlaces
		const result = divideFourDecimalPlaces(dividend)(divisor)

		assert(isError(result))
		assertEquals(result.error.code, "FOUR_DECIMAL_PLACES_NOT_FINITE")
	})

	await t.step("divides fractional values", () => {
		const dividend = 0.5 as FourDecimalPlaces
		const divisor = 0.5 as FourDecimalPlaces
		const result = divideFourDecimalPlaces(dividend)(divisor)

		assert(isOk(result))
		assertEquals(result.value, 1)
	})

	await t.step("handles very small results", () => {
		const dividend = 0.0002 as FourDecimalPlaces
		const divisor = 2 as FourDecimalPlaces
		const result = divideFourDecimalPlaces(dividend)(divisor)

		assert(isOk(result))
		assertEquals(result.value, 0.0001)
	})

	await t.step("returns error when result exceeds precision", () => {
		const dividend = 1 as FourDecimalPlaces
		const divisor = 3 as FourDecimalPlaces
		const result = divideFourDecimalPlaces(dividend)(divisor)

		assert(isError(result))
		assertEquals(result.error.code, "FOUR_DECIMAL_PLACES_PRECISION_EXCEEDED")
	})

	await t.step("returns error when result is not finite", () => {
		const dividend = Number.MAX_VALUE as FourDecimalPlaces
		const divisor = 0.0001 as FourDecimalPlaces
		const result = divideFourDecimalPlaces(dividend)(divisor)

		assert(isError(result))
		assertEquals(result.error.code, "FOUR_DECIMAL_PLACES_NOT_FINITE")
	})
})
