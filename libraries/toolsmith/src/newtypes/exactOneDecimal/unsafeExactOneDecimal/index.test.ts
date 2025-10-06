import { assertEquals } from "@std/assert"

import type { ExactOneDecimal } from "@sitebender/toolsmith/types/branded/index.ts"

import unsafeExactOneDecimal from "./index.ts"

Deno.test("unsafeExactOneDecimal creates ExactOneDecimal from whole number", () => {
	const result: ExactOneDecimal = unsafeExactOneDecimal(100)

	assertEquals(result, 100)
})

Deno.test("unsafeExactOneDecimal creates ExactOneDecimal from zero", () => {
	const result: ExactOneDecimal = unsafeExactOneDecimal(0)

	assertEquals(result, 0)
})

Deno.test("unsafeExactOneDecimal creates ExactOneDecimal from negative whole number", () => {
	const result: ExactOneDecimal = unsafeExactOneDecimal(-50)

	assertEquals(result, -50)
})

Deno.test("unsafeExactOneDecimal creates ExactOneDecimal from number with 1 decimal place", () => {
	const result: ExactOneDecimal = unsafeExactOneDecimal(10.5)

	assertEquals(result, 10.5)
})

Deno.test("unsafeExactOneDecimal creates ExactOneDecimal from negative number with 1 decimal", () => {
	const result: ExactOneDecimal = unsafeExactOneDecimal(-19.9)

	assertEquals(result, -19.9)
})

Deno.test("unsafeExactOneDecimal creates ExactOneDecimal from small decimal", () => {
	const result: ExactOneDecimal = unsafeExactOneDecimal(0.1)

	assertEquals(result, 0.1)
})
