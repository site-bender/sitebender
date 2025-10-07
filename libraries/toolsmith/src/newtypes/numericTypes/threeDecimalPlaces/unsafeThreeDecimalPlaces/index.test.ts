import { assertEquals } from "@std/assert"

import type { ThreeDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import unsafeThreeDecimalPlaces from "./index.ts"

Deno.test("unsafeThreeDecimalPlaces creates ThreeDecimalPlaces from whole number", () => {
	const result: ThreeDecimalPlaces = unsafeThreeDecimalPlaces(100)

	assertEquals(result, 100)
})

Deno.test("unsafeThreeDecimalPlaces creates ThreeDecimalPlaces from zero", () => {
	const result: ThreeDecimalPlaces = unsafeThreeDecimalPlaces(0)

	assertEquals(result, 0)
})

Deno.test("unsafeThreeDecimalPlaces creates ThreeDecimalPlaces from negative whole number", () => {
	const result: ThreeDecimalPlaces = unsafeThreeDecimalPlaces(-50)

	assertEquals(result, -50)
})

Deno.test("unsafeThreeDecimalPlaces creates ThreeDecimalPlaces from number with 1 decimal place", () => {
	const result: ThreeDecimalPlaces = unsafeThreeDecimalPlaces(10.5)

	assertEquals(result, 10.5)
})

Deno.test("unsafeThreeDecimalPlaces creates ThreeDecimalPlaces from number with 2 decimal places", () => {
	const result: ThreeDecimalPlaces = unsafeThreeDecimalPlaces(19.99)

	assertEquals(result, 19.99)
})

Deno.test("unsafeThreeDecimalPlaces creates ThreeDecimalPlaces from number with 3 decimal places", () => {
	const result: ThreeDecimalPlaces = unsafeThreeDecimalPlaces(123.456)

	assertEquals(result, 123.456)
})

Deno.test("unsafeThreeDecimalPlaces creates ThreeDecimalPlaces from negative with 3 decimals", () => {
	const result: ThreeDecimalPlaces = unsafeThreeDecimalPlaces(-99.999)

	assertEquals(result, -99.999)
})

Deno.test("unsafeThreeDecimalPlaces creates ThreeDecimalPlaces from small decimal", () => {
	const result: ThreeDecimalPlaces = unsafeThreeDecimalPlaces(0.123)

	assertEquals(result, 0.123)
})
