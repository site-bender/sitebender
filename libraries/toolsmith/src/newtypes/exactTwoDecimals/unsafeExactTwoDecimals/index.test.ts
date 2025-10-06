import { assertEquals } from "@std/assert"

import type { ExactTwoDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

import unsafeExactTwoDecimals from "./index.ts"

Deno.test("unsafeExactTwoDecimals creates ExactTwoDecimals from valid number with 2 decimals", () => {
	const result: ExactTwoDecimals = unsafeExactTwoDecimals(19.99)

	assertEquals(result, 19.99)
})

Deno.test("unsafeExactTwoDecimals creates ExactTwoDecimals from valid number with 1 decimal", () => {
	const result: ExactTwoDecimals = unsafeExactTwoDecimals(10.5)

	assertEquals(result, 10.5)
})

Deno.test("unsafeExactTwoDecimals creates ExactTwoDecimals from whole number", () => {
	const result: ExactTwoDecimals = unsafeExactTwoDecimals(100)

	assertEquals(result, 100)
})

Deno.test("unsafeExactTwoDecimals creates ExactTwoDecimals from zero", () => {
	const result: ExactTwoDecimals = unsafeExactTwoDecimals(0)

	assertEquals(result, 0)
})

Deno.test("unsafeExactTwoDecimals creates ExactTwoDecimals from negative value", () => {
	const result: ExactTwoDecimals = unsafeExactTwoDecimals(-50.25)

	assertEquals(result, -50.25)
})

Deno.test("unsafeExactTwoDecimals creates ExactTwoDecimals from small amount", () => {
	const result: ExactTwoDecimals = unsafeExactTwoDecimals(0.01)

	assertEquals(result, 0.01)
})

Deno.test("unsafeExactTwoDecimals does not validate - accepts Infinity", () => {
	const result: ExactTwoDecimals = unsafeExactTwoDecimals(Infinity)

	assertEquals(result, Infinity)
})

Deno.test("unsafeExactTwoDecimals does not validate - accepts 3 decimal places", () => {
	const result: ExactTwoDecimals = unsafeExactTwoDecimals(19.999)

	assertEquals(result, 19.999)
})
