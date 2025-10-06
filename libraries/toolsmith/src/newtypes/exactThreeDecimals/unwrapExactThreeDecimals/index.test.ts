import { assertEquals } from "@std/assert"

import type { ExactThreeDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

import unwrapExactThreeDecimals from "./index.ts"

Deno.test("unwrapExactThreeDecimals extracts number from ExactThreeDecimals whole number", () => {
	const exactThreeDecimalsValue = 100 as ExactThreeDecimals
	const result: number = unwrapExactThreeDecimals(exactThreeDecimalsValue)

	assertEquals(result, 100)
})

Deno.test("unwrapExactThreeDecimals extracts number from ExactThreeDecimals zero", () => {
	const exactThreeDecimalsValue = 0 as ExactThreeDecimals
	const result: number = unwrapExactThreeDecimals(exactThreeDecimalsValue)

	assertEquals(result, 0)
})

Deno.test("unwrapExactThreeDecimals extracts number from ExactThreeDecimals negative", () => {
	const exactThreeDecimalsValue = -50 as ExactThreeDecimals
	const result: number = unwrapExactThreeDecimals(exactThreeDecimalsValue)

	assertEquals(result, -50)
})

Deno.test("unwrapExactThreeDecimals extracts number from ExactThreeDecimals with 1 decimal place", () => {
	const exactThreeDecimalsValue = 10.5 as ExactThreeDecimals
	const result: number = unwrapExactThreeDecimals(exactThreeDecimalsValue)

	assertEquals(result, 10.5)
})

Deno.test("unwrapExactThreeDecimals extracts number from ExactThreeDecimals with 2 decimal places", () => {
	const exactThreeDecimalsValue = 19.99 as ExactThreeDecimals
	const result: number = unwrapExactThreeDecimals(exactThreeDecimalsValue)

	assertEquals(result, 19.99)
})

Deno.test("unwrapExactThreeDecimals extracts number from ExactThreeDecimals with 3 decimal places", () => {
	const exactThreeDecimalsValue = 123.456 as ExactThreeDecimals
	const result: number = unwrapExactThreeDecimals(exactThreeDecimalsValue)

	assertEquals(result, 123.456)
})

Deno.test("unwrapExactThreeDecimals extracts number from ExactThreeDecimals negative with 3 decimals", () => {
	const exactThreeDecimalsValue = -99.999 as ExactThreeDecimals
	const result: number = unwrapExactThreeDecimals(exactThreeDecimalsValue)

	assertEquals(result, -99.999)
})

Deno.test("unwrapExactThreeDecimals extracts number from ExactThreeDecimals small decimal", () => {
	const exactThreeDecimalsValue = 0.123 as ExactThreeDecimals
	const result: number = unwrapExactThreeDecimals(exactThreeDecimalsValue)

	assertEquals(result, 0.123)
})
