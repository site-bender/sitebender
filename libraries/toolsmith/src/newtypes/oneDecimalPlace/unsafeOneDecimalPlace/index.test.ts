import { assertEquals } from "@std/assert"

import type { OneDecimalPlace } from "@sitebender/toolsmith/types/branded/index.ts"

import unsafeOneDecimalPlace from "./index.ts"

Deno.test("unsafeOneDecimalPlace creates OneDecimalPlace from whole number", () => {
	const result: OneDecimalPlace = unsafeOneDecimalPlace(100)

	assertEquals(result, 100)
})

Deno.test("unsafeOneDecimalPlace creates OneDecimalPlace from zero", () => {
	const result: OneDecimalPlace = unsafeOneDecimalPlace(0)

	assertEquals(result, 0)
})

Deno.test("unsafeOneDecimalPlace creates OneDecimalPlace from negative whole number", () => {
	const result: OneDecimalPlace = unsafeOneDecimalPlace(-50)

	assertEquals(result, -50)
})

Deno.test("unsafeOneDecimalPlace creates OneDecimalPlace from number with 1 decimal place", () => {
	const result: OneDecimalPlace = unsafeOneDecimalPlace(10.5)

	assertEquals(result, 10.5)
})

Deno.test("unsafeOneDecimalPlace creates OneDecimalPlace from negative number with 1 decimal", () => {
	const result: OneDecimalPlace = unsafeOneDecimalPlace(-19.9)

	assertEquals(result, -19.9)
})

Deno.test("unsafeOneDecimalPlace creates OneDecimalPlace from small decimal", () => {
	const result: OneDecimalPlace = unsafeOneDecimalPlace(0.1)

	assertEquals(result, 0.1)
})
