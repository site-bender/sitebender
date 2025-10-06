import { assert, assertEquals } from "@std/assert"

import type { EightDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import unsafeEightDecimalPlaces from "./index.ts"

Deno.test("unsafeEightDecimalPlaces brands a number as EightDecimalPlaces", () => {
	const result: EightDecimalPlaces = unsafeEightDecimalPlaces(0.12345678)

	assertEquals(result, 0.12345678)
})

Deno.test("unsafeEightDecimalPlaces works with zero", () => {
	const result: EightDecimalPlaces = unsafeEightDecimalPlaces(0)

	assertEquals(result, 0)
})

Deno.test("unsafeEightDecimalPlaces works with integers", () => {
	const result: EightDecimalPlaces = unsafeEightDecimalPlaces(100)

	assertEquals(result, 100)
})

Deno.test("unsafeEightDecimalPlaces works with negative numbers", () => {
	const result: EightDecimalPlaces = unsafeEightDecimalPlaces(-42.99999999)

	assertEquals(result, -42.99999999)
})

Deno.test("unsafeEightDecimalPlaces works with cryptocurrency amounts", () => {
	const result: EightDecimalPlaces = unsafeEightDecimalPlaces(0.00000001)

	assertEquals(result, 0.00000001)
})

Deno.test("unsafeEightDecimalPlaces works with 1 satoshi", () => {
	const result: EightDecimalPlaces = unsafeEightDecimalPlaces(0.00000001)

	assertEquals(result, 0.00000001)
})

Deno.test("unsafeEightDecimalPlaces works with max Bitcoin supply", () => {
	const result: EightDecimalPlaces = unsafeEightDecimalPlaces(21000000)

	assertEquals(result, 21000000)
})

Deno.test("unsafeEightDecimalPlaces does not validate - accepts 9 decimal places", () => {
	const result = unsafeEightDecimalPlaces(0.123456789)

	assertEquals(result, 0.123456789)
})

Deno.test("unsafeEightDecimalPlaces does not validate - accepts Infinity", () => {
	const result = unsafeEightDecimalPlaces(Infinity)

	assertEquals(result, Infinity)
})

Deno.test("unsafeEightDecimalPlaces does not validate - accepts -Infinity", () => {
	const result = unsafeEightDecimalPlaces(-Infinity)

	assertEquals(result, -Infinity)
})

Deno.test("unsafeEightDecimalPlaces does not validate - accepts NaN", () => {
	const result = unsafeEightDecimalPlaces(NaN)

	assert(Number.isNaN(result))
})
