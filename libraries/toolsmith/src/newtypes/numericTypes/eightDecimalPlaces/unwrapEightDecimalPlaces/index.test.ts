import { assertEquals } from "@std/assert"

import unsafeEightDecimalPlaces from "@sitebender/toolsmith/newtypes/eightDecimalPlaces/unsafeEightDecimalPlaces/index.ts"

import unwrapEightDecimalPlaces from "./index.ts"

Deno.test("unwrapEightDecimalPlaces extracts number from EightDecimalPlaces", () => {
	const value = unsafeEightDecimalPlaces(0.12345678)
	const result = unwrapEightDecimalPlaces(value)

	assertEquals(result, 0.12345678)
})

Deno.test("unwrapEightDecimalPlaces works with zero", () => {
	const value = unsafeEightDecimalPlaces(0)
	const result = unwrapEightDecimalPlaces(value)

	assertEquals(result, 0)
})

Deno.test("unwrapEightDecimalPlaces works with integers", () => {
	const value = unsafeEightDecimalPlaces(100)
	const result = unwrapEightDecimalPlaces(value)

	assertEquals(result, 100)
})

Deno.test("unwrapEightDecimalPlaces works with negative numbers", () => {
	const value = unsafeEightDecimalPlaces(-42.99999999)
	const result = unwrapEightDecimalPlaces(value)

	assertEquals(result, -42.99999999)
})

Deno.test("unwrapEightDecimalPlaces works with 1 satoshi", () => {
	const value = unsafeEightDecimalPlaces(0.00000001)
	const result = unwrapEightDecimalPlaces(value)

	assertEquals(result, 0.00000001)
})

Deno.test("unwrapEightDecimalPlaces works with max Bitcoin supply", () => {
	const value = unsafeEightDecimalPlaces(21000000)
	const result = unwrapEightDecimalPlaces(value)

	assertEquals(result, 21000000)
})

Deno.test("unwrapEightDecimalPlaces works with typical cryptocurrency amount", () => {
	const value = unsafeEightDecimalPlaces(0.12345678)
	const result = unwrapEightDecimalPlaces(value)

	assertEquals(result, 0.12345678)
})
