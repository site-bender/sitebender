import { assertEquals } from "@std/assert"

import type { Decimal0 } from "@sitebender/toolsmith/types/branded/index.ts"

import unsafeDecimal0 from "./index.ts"

Deno.test("unsafeDecimal0 creates Decimal0 from whole number", () => {
	const result: Decimal0 = unsafeDecimal0(100)

	assertEquals(result, 100)
})

Deno.test("unsafeDecimal0 creates Decimal0 from zero", () => {
	const result: Decimal0 = unsafeDecimal0(0)

	assertEquals(result, 0)
})

Deno.test("unsafeDecimal0 creates Decimal0 from negative whole number", () => {
	const result: Decimal0 = unsafeDecimal0(-50)

	assertEquals(result, -50)
})

Deno.test("unsafeDecimal0 creates Decimal0 from large whole number", () => {
	const result: Decimal0 = unsafeDecimal0(1000000)

	assertEquals(result, 1000000)
})

Deno.test("unsafeDecimal0 creates Decimal0 even from invalid Infinity", () => {
	const result: Decimal0 = unsafeDecimal0(Infinity)

	assertEquals(result, Infinity)
})

Deno.test("unsafeDecimal0 creates Decimal0 even from invalid decimal", () => {
	const result: Decimal0 = unsafeDecimal0(10.5)

	assertEquals(result, 10.5)
})
