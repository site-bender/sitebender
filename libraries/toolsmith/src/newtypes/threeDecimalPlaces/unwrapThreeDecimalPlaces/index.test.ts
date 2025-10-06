import { assertEquals } from "@std/assert"

import type { ThreeDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import unwrapThreeDecimalPlaces from "./index.ts"

Deno.test("unwrapThreeDecimalPlaces extracts number from ThreeDecimalPlaces whole number", () => {
	const threeDecimalPlacesValue = 100 as ThreeDecimalPlaces
	const result: number = unwrapThreeDecimalPlaces(threeDecimalPlacesValue)

	assertEquals(result, 100)
})

Deno.test("unwrapThreeDecimalPlaces extracts number from ThreeDecimalPlaces zero", () => {
	const threeDecimalPlacesValue = 0 as ThreeDecimalPlaces
	const result: number = unwrapThreeDecimalPlaces(threeDecimalPlacesValue)

	assertEquals(result, 0)
})

Deno.test("unwrapThreeDecimalPlaces extracts number from ThreeDecimalPlaces negative", () => {
	const threeDecimalPlacesValue = -50 as ThreeDecimalPlaces
	const result: number = unwrapThreeDecimalPlaces(threeDecimalPlacesValue)

	assertEquals(result, -50)
})

Deno.test("unwrapThreeDecimalPlaces extracts number from ThreeDecimalPlaces with 1 decimal place", () => {
	const threeDecimalPlacesValue = 10.5 as ThreeDecimalPlaces
	const result: number = unwrapThreeDecimalPlaces(threeDecimalPlacesValue)

	assertEquals(result, 10.5)
})

Deno.test("unwrapThreeDecimalPlaces extracts number from ThreeDecimalPlaces with 2 decimal places", () => {
	const threeDecimalPlacesValue = 19.99 as ThreeDecimalPlaces
	const result: number = unwrapThreeDecimalPlaces(threeDecimalPlacesValue)

	assertEquals(result, 19.99)
})

Deno.test("unwrapThreeDecimalPlaces extracts number from ThreeDecimalPlaces with 3 decimal places", () => {
	const threeDecimalPlacesValue = 123.456 as ThreeDecimalPlaces
	const result: number = unwrapThreeDecimalPlaces(threeDecimalPlacesValue)

	assertEquals(result, 123.456)
})

Deno.test("unwrapThreeDecimalPlaces extracts number from ThreeDecimalPlaces negative with 3 decimals", () => {
	const threeDecimalPlacesValue = -99.999 as ThreeDecimalPlaces
	const result: number = unwrapThreeDecimalPlaces(threeDecimalPlacesValue)

	assertEquals(result, -99.999)
})

Deno.test("unwrapThreeDecimalPlaces extracts number from ThreeDecimalPlaces small decimal", () => {
	const threeDecimalPlacesValue = 0.123 as ThreeDecimalPlaces
	const result: number = unwrapThreeDecimalPlaces(threeDecimalPlacesValue)

	assertEquals(result, 0.123)
})
