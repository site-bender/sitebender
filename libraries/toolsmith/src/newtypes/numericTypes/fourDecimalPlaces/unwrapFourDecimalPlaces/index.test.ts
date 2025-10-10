import { assertEquals } from "@std/assert"

import unsafeFourDecimalPlaces from "@sitebender/toolsmith/newtypes/numericTypes/fourDecimalPlaces/unsafeFourDecimalPlaces/index.ts"

import unwrapFourDecimalPlaces from "./index.ts"

Deno.test("unwrapFourDecimalPlaces extracts number from FourDecimalPlaces with 4 decimals", () => {
	const value = unsafeFourDecimalPlaces(19.9999)
	const result = unwrapFourDecimalPlaces(value)

	assertEquals(result, 19.9999)
})

Deno.test("unwrapFourDecimalPlaces extracts number from FourDecimalPlaces with 3 decimals", () => {
	const value = unsafeFourDecimalPlaces(10.543)
	const result = unwrapFourDecimalPlaces(value)

	assertEquals(result, 10.543)
})

Deno.test("unwrapFourDecimalPlaces extracts number from FourDecimalPlaces with 2 decimals", () => {
	const value = unsafeFourDecimalPlaces(10.54)
	const result = unwrapFourDecimalPlaces(value)

	assertEquals(result, 10.54)
})

Deno.test("unwrapFourDecimalPlaces extracts number from FourDecimalPlaces with 1 decimal", () => {
	const value = unsafeFourDecimalPlaces(10.5)
	const result = unwrapFourDecimalPlaces(value)

	assertEquals(result, 10.5)
})

Deno.test("unwrapFourDecimalPlaces extracts number from whole number FourDecimalPlaces", () => {
	const value = unsafeFourDecimalPlaces(100)
	const result = unwrapFourDecimalPlaces(value)

	assertEquals(result, 100)
})

Deno.test("unwrapFourDecimalPlaces extracts number from zero FourDecimalPlaces", () => {
	const value = unsafeFourDecimalPlaces(0)
	const result = unwrapFourDecimalPlaces(value)

	assertEquals(result, 0)
})

Deno.test("unwrapFourDecimalPlaces extracts number from negative FourDecimalPlaces", () => {
	const value = unsafeFourDecimalPlaces(-50.2525)
	const result = unwrapFourDecimalPlaces(value)

	assertEquals(result, -50.2525)
})

Deno.test("unwrapFourDecimalPlaces extracts number from small FourDecimalPlaces amount", () => {
	const value = unsafeFourDecimalPlaces(0.0001)
	const result = unwrapFourDecimalPlaces(value)

	assertEquals(result, 0.0001)
})
