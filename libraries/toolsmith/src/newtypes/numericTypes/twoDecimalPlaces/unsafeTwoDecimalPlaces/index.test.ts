import { assertEquals } from "@std/assert"

import type { TwoDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import unsafeTwoDecimalPlaces from "./index.ts"

Deno.test("unsafeTwoDecimalPlaces creates TwoDecimalPlaces from valid number with 2 decimals", () => {
	const result: TwoDecimalPlaces = unsafeTwoDecimalPlaces(19.99)

	assertEquals(result, 19.99)
})

Deno.test("unsafeTwoDecimalPlaces creates TwoDecimalPlaces from valid number with 1 decimal", () => {
	const result: TwoDecimalPlaces = unsafeTwoDecimalPlaces(10.5)

	assertEquals(result, 10.5)
})

Deno.test("unsafeTwoDecimalPlaces creates TwoDecimalPlaces from whole number", () => {
	const result: TwoDecimalPlaces = unsafeTwoDecimalPlaces(100)

	assertEquals(result, 100)
})

Deno.test("unsafeTwoDecimalPlaces creates TwoDecimalPlaces from zero", () => {
	const result: TwoDecimalPlaces = unsafeTwoDecimalPlaces(0)

	assertEquals(result, 0)
})

Deno.test("unsafeTwoDecimalPlaces creates TwoDecimalPlaces from negative value", () => {
	const result: TwoDecimalPlaces = unsafeTwoDecimalPlaces(-50.25)

	assertEquals(result, -50.25)
})

Deno.test("unsafeTwoDecimalPlaces creates TwoDecimalPlaces from small amount", () => {
	const result: TwoDecimalPlaces = unsafeTwoDecimalPlaces(0.01)

	assertEquals(result, 0.01)
})

Deno.test("unsafeTwoDecimalPlaces does not validate - accepts Infinity", () => {
	const result: TwoDecimalPlaces = unsafeTwoDecimalPlaces(Infinity)

	assertEquals(result, Infinity)
})

Deno.test("unsafeTwoDecimalPlaces does not validate - accepts 3 decimal places", () => {
	const result: TwoDecimalPlaces = unsafeTwoDecimalPlaces(19.999)

	assertEquals(result, 19.999)
})
