import { assertEquals } from "@std/assert"

import unsafeTwoDecimalPlaces from "@sitebender/toolsmith/newtypes/numericTypes/twoDecimalPlaces/unsafeTwoDecimalPlaces/index.ts"

import unwrapTwoDecimalPlaces from "./index.ts"

Deno.test("unwrapTwoDecimalPlaces extracts number from TwoDecimalPlaces with 2 decimals", () => {
	const value = unsafeTwoDecimalPlaces(19.99)
	const result = unwrapTwoDecimalPlaces(value)

	assertEquals(result, 19.99)
})

Deno.test("unwrapTwoDecimalPlaces extracts number from TwoDecimalPlaces with 1 decimal", () => {
	const value = unsafeTwoDecimalPlaces(10.5)
	const result = unwrapTwoDecimalPlaces(value)

	assertEquals(result, 10.5)
})

Deno.test("unwrapTwoDecimalPlaces extracts number from whole number TwoDecimalPlaces", () => {
	const value = unsafeTwoDecimalPlaces(100)
	const result = unwrapTwoDecimalPlaces(value)

	assertEquals(result, 100)
})

Deno.test("unwrapTwoDecimalPlaces extracts number from zero TwoDecimalPlaces", () => {
	const value = unsafeTwoDecimalPlaces(0)
	const result = unwrapTwoDecimalPlaces(value)

	assertEquals(result, 0)
})

Deno.test("unwrapTwoDecimalPlaces extracts number from negative TwoDecimalPlaces", () => {
	const value = unsafeTwoDecimalPlaces(-50.25)
	const result = unwrapTwoDecimalPlaces(value)

	assertEquals(result, -50.25)
})

Deno.test("unwrapTwoDecimalPlaces extracts number from small TwoDecimalPlaces amount", () => {
	const value = unsafeTwoDecimalPlaces(0.01)
	const result = unwrapTwoDecimalPlaces(value)

	assertEquals(result, 0.01)
})
