import { assertEquals } from "@std/assert"

import type { Decimal1 } from "@sitebender/toolsmith/types/branded/index.ts"

import unwrapDecimal1 from "./index.ts"

Deno.test("unwrapDecimal1 extracts number from Decimal1 whole number", () => {
	const decimal1Value = 100 as Decimal1
	const result: number = unwrapDecimal1(decimal1Value)

	assertEquals(result, 100)
})

Deno.test("unwrapDecimal1 extracts number from Decimal1 zero", () => {
	const decimal1Value = 0 as Decimal1
	const result: number = unwrapDecimal1(decimal1Value)

	assertEquals(result, 0)
})

Deno.test("unwrapDecimal1 extracts number from Decimal1 negative", () => {
	const decimal1Value = -50 as Decimal1
	const result: number = unwrapDecimal1(decimal1Value)

	assertEquals(result, -50)
})

Deno.test("unwrapDecimal1 extracts number from Decimal1 with 1 decimal place", () => {
	const decimal1Value = 10.5 as Decimal1
	const result: number = unwrapDecimal1(decimal1Value)

	assertEquals(result, 10.5)
})

Deno.test("unwrapDecimal1 extracts number from Decimal1 negative with 1 decimal", () => {
	const decimal1Value = -19.9 as Decimal1
	const result: number = unwrapDecimal1(decimal1Value)

	assertEquals(result, -19.9)
})

Deno.test("unwrapDecimal1 extracts number from Decimal1 small decimal", () => {
	const decimal1Value = 0.1 as Decimal1
	const result: number = unwrapDecimal1(decimal1Value)

	assertEquals(result, 0.1)
})
