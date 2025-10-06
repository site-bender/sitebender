import { assertEquals } from "@std/assert"

import type { ExactThreeDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

import unsafeExactThreeDecimals from "./index.ts"

Deno.test("unsafeExactThreeDecimals creates ExactThreeDecimals from whole number", () => {
	const result: ExactThreeDecimals = unsafeExactThreeDecimals(100)

	assertEquals(result, 100)
})

Deno.test("unsafeExactThreeDecimals creates ExactThreeDecimals from zero", () => {
	const result: ExactThreeDecimals = unsafeExactThreeDecimals(0)

	assertEquals(result, 0)
})

Deno.test("unsafeExactThreeDecimals creates ExactThreeDecimals from negative whole number", () => {
	const result: ExactThreeDecimals = unsafeExactThreeDecimals(-50)

	assertEquals(result, -50)
})

Deno.test("unsafeExactThreeDecimals creates ExactThreeDecimals from number with 1 decimal place", () => {
	const result: ExactThreeDecimals = unsafeExactThreeDecimals(10.5)

	assertEquals(result, 10.5)
})

Deno.test("unsafeExactThreeDecimals creates ExactThreeDecimals from number with 2 decimal places", () => {
	const result: ExactThreeDecimals = unsafeExactThreeDecimals(19.99)

	assertEquals(result, 19.99)
})

Deno.test("unsafeExactThreeDecimals creates ExactThreeDecimals from number with 3 decimal places", () => {
	const result: ExactThreeDecimals = unsafeExactThreeDecimals(123.456)

	assertEquals(result, 123.456)
})

Deno.test("unsafeExactThreeDecimals creates ExactThreeDecimals from negative with 3 decimals", () => {
	const result: ExactThreeDecimals = unsafeExactThreeDecimals(-99.999)

	assertEquals(result, -99.999)
})

Deno.test("unsafeExactThreeDecimals creates ExactThreeDecimals from small decimal", () => {
	const result: ExactThreeDecimals = unsafeExactThreeDecimals(0.123)

	assertEquals(result, 0.123)
})
