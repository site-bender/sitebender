import { assertEquals } from "@std/assert"

import type { Decimal1 } from "@sitebender/toolsmith/types/branded/index.ts"

import unsafeDecimal1 from "./index.ts"

Deno.test("unsafeDecimal1 creates Decimal1 from whole number", () => {
	const result: Decimal1 = unsafeDecimal1(100)

	assertEquals(result, 100)
})

Deno.test("unsafeDecimal1 creates Decimal1 from zero", () => {
	const result: Decimal1 = unsafeDecimal1(0)

	assertEquals(result, 0)
})

Deno.test("unsafeDecimal1 creates Decimal1 from negative whole number", () => {
	const result: Decimal1 = unsafeDecimal1(-50)

	assertEquals(result, -50)
})

Deno.test("unsafeDecimal1 creates Decimal1 from number with 1 decimal place", () => {
	const result: Decimal1 = unsafeDecimal1(10.5)

	assertEquals(result, 10.5)
})

Deno.test("unsafeDecimal1 creates Decimal1 from negative number with 1 decimal", () => {
	const result: Decimal1 = unsafeDecimal1(-19.9)

	assertEquals(result, -19.9)
})

Deno.test("unsafeDecimal1 creates Decimal1 from small decimal", () => {
	const result: Decimal1 = unsafeDecimal1(0.1)

	assertEquals(result, 0.1)
})
