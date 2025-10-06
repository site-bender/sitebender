import { assertEquals } from "@std/assert"

import type { Decimal3 } from "@sitebender/toolsmith/types/branded/index.ts"

import unwrapDecimal3 from "./index.ts"

Deno.test("unwrapDecimal3 extracts number from Decimal3 whole number", () => {
	const decimal3Value = 100 as Decimal3
	const result: number = unwrapDecimal3(decimal3Value)

	assertEquals(result, 100)
})

Deno.test("unwrapDecimal3 extracts number from Decimal3 zero", () => {
	const decimal3Value = 0 as Decimal3
	const result: number = unwrapDecimal3(decimal3Value)

	assertEquals(result, 0)
})

Deno.test("unwrapDecimal3 extracts number from Decimal3 negative", () => {
	const decimal3Value = -50 as Decimal3
	const result: number = unwrapDecimal3(decimal3Value)

	assertEquals(result, -50)
})

Deno.test("unwrapDecimal3 extracts number from Decimal3 with 1 decimal place", () => {
	const decimal3Value = 10.5 as Decimal3
	const result: number = unwrapDecimal3(decimal3Value)

	assertEquals(result, 10.5)
})

Deno.test("unwrapDecimal3 extracts number from Decimal3 with 2 decimal places", () => {
	const decimal3Value = 19.99 as Decimal3
	const result: number = unwrapDecimal3(decimal3Value)

	assertEquals(result, 19.99)
})

Deno.test("unwrapDecimal3 extracts number from Decimal3 with 3 decimal places", () => {
	const decimal3Value = 123.456 as Decimal3
	const result: number = unwrapDecimal3(decimal3Value)

	assertEquals(result, 123.456)
})

Deno.test("unwrapDecimal3 extracts number from Decimal3 negative with 3 decimals", () => {
	const decimal3Value = -99.999 as Decimal3
	const result: number = unwrapDecimal3(decimal3Value)

	assertEquals(result, -99.999)
})

Deno.test("unwrapDecimal3 extracts number from Decimal3 small decimal", () => {
	const decimal3Value = 0.123 as Decimal3
	const result: number = unwrapDecimal3(decimal3Value)

	assertEquals(result, 0.123)
})
