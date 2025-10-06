import { assertEquals } from "@std/assert"

import type { FourDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import unsafeFourDecimalPlaces from "./index.ts"

Deno.test("unsafeFourDecimalPlaces creates FourDecimalPlaces from valid number with 4 decimals", () => {
	const result: FourDecimalPlaces = unsafeFourDecimalPlaces(19.9999)

	assertEquals(result, 19.9999)
})

Deno.test("unsafeFourDecimalPlaces creates FourDecimalPlaces from valid number with 3 decimals", () => {
	const result: FourDecimalPlaces = unsafeFourDecimalPlaces(10.543)

	assertEquals(result, 10.543)
})

Deno.test("unsafeFourDecimalPlaces creates FourDecimalPlaces from valid number with 2 decimals", () => {
	const result: FourDecimalPlaces = unsafeFourDecimalPlaces(10.54)

	assertEquals(result, 10.54)
})

Deno.test("unsafeFourDecimalPlaces creates FourDecimalPlaces from valid number with 1 decimal", () => {
	const result: FourDecimalPlaces = unsafeFourDecimalPlaces(10.5)

	assertEquals(result, 10.5)
})

Deno.test("unsafeFourDecimalPlaces creates FourDecimalPlaces from whole number", () => {
	const result: FourDecimalPlaces = unsafeFourDecimalPlaces(100)

	assertEquals(result, 100)
})

Deno.test("unsafeFourDecimalPlaces creates FourDecimalPlaces from zero", () => {
	const result: FourDecimalPlaces = unsafeFourDecimalPlaces(0)

	assertEquals(result, 0)
})

Deno.test("unsafeFourDecimalPlaces creates FourDecimalPlaces from negative value", () => {
	const result: FourDecimalPlaces = unsafeFourDecimalPlaces(-50.2525)

	assertEquals(result, -50.2525)
})

Deno.test("unsafeFourDecimalPlaces creates FourDecimalPlaces from small amount", () => {
	const result: FourDecimalPlaces = unsafeFourDecimalPlaces(0.0001)

	assertEquals(result, 0.0001)
})

Deno.test("unsafeFourDecimalPlaces does not validate - accepts Infinity", () => {
	const result: FourDecimalPlaces = unsafeFourDecimalPlaces(Infinity)

	assertEquals(result, Infinity)
})

Deno.test("unsafeFourDecimalPlaces does not validate - accepts 5 decimal places", () => {
	const result: FourDecimalPlaces = unsafeFourDecimalPlaces(19.99999)

	assertEquals(result, 19.99999)
})
