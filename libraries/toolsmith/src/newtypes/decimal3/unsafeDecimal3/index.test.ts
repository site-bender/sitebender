import { assertEquals } from "@std/assert"

import type { Decimal3 } from "@sitebender/toolsmith/types/branded/index.ts"

import unsafeDecimal3 from "./index.ts"

Deno.test("unsafeDecimal3 creates Decimal3 from whole number", () => {
	const result: Decimal3 = unsafeDecimal3(100)

	assertEquals(result, 100)
})

Deno.test("unsafeDecimal3 creates Decimal3 from zero", () => {
	const result: Decimal3 = unsafeDecimal3(0)

	assertEquals(result, 0)
})

Deno.test("unsafeDecimal3 creates Decimal3 from negative whole number", () => {
	const result: Decimal3 = unsafeDecimal3(-50)

	assertEquals(result, -50)
})

Deno.test("unsafeDecimal3 creates Decimal3 from number with 1 decimal place", () => {
	const result: Decimal3 = unsafeDecimal3(10.5)

	assertEquals(result, 10.5)
})

Deno.test("unsafeDecimal3 creates Decimal3 from number with 2 decimal places", () => {
	const result: Decimal3 = unsafeDecimal3(19.99)

	assertEquals(result, 19.99)
})

Deno.test("unsafeDecimal3 creates Decimal3 from number with 3 decimal places", () => {
	const result: Decimal3 = unsafeDecimal3(123.456)

	assertEquals(result, 123.456)
})

Deno.test("unsafeDecimal3 creates Decimal3 from negative with 3 decimals", () => {
	const result: Decimal3 = unsafeDecimal3(-99.999)

	assertEquals(result, -99.999)
})

Deno.test("unsafeDecimal3 creates Decimal3 from small decimal", () => {
	const result: Decimal3 = unsafeDecimal3(0.123)

	assertEquals(result, 0.123)
})
