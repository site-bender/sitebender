import { assertEquals } from "@std/assert"

import type { ExactOneDecimal } from "@sitebender/toolsmith/types/branded/index.ts"

import unwrapExactOneDecimal from "./index.ts"

Deno.test("unwrapExactOneDecimal extracts number from ExactOneDecimal whole number", () => {
	const exactOneDecimalValue = 100 as ExactOneDecimal
	const result: number = unwrapExactOneDecimal(exactOneDecimalValue)

	assertEquals(result, 100)
})

Deno.test("unwrapExactOneDecimal extracts number from ExactOneDecimal zero", () => {
	const exactOneDecimalValue = 0 as ExactOneDecimal
	const result: number = unwrapExactOneDecimal(exactOneDecimalValue)

	assertEquals(result, 0)
})

Deno.test("unwrapExactOneDecimal extracts number from ExactOneDecimal negative", () => {
	const exactOneDecimalValue = -50 as ExactOneDecimal
	const result: number = unwrapExactOneDecimal(exactOneDecimalValue)

	assertEquals(result, -50)
})

Deno.test("unwrapExactOneDecimal extracts number from ExactOneDecimal with 1 decimal place", () => {
	const exactOneDecimalValue = 10.5 as ExactOneDecimal
	const result: number = unwrapExactOneDecimal(exactOneDecimalValue)

	assertEquals(result, 10.5)
})

Deno.test("unwrapExactOneDecimal extracts number from ExactOneDecimal negative with 1 decimal", () => {
	const exactOneDecimalValue = -19.9 as ExactOneDecimal
	const result: number = unwrapExactOneDecimal(exactOneDecimalValue)

	assertEquals(result, -19.9)
})

Deno.test("unwrapExactOneDecimal extracts number from ExactOneDecimal small decimal", () => {
	const exactOneDecimalValue = 0.1 as ExactOneDecimal
	const result: number = unwrapExactOneDecimal(exactOneDecimalValue)

	assertEquals(result, 0.1)
})
