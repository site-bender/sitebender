import { assertEquals } from "@std/assert"

import type { ExactFourDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

import unsafeExactFourDecimals from "./index.ts"

Deno.test("unsafeExactFourDecimals creates ExactFourDecimals from valid number with 4 decimals", () => {
	const result: ExactFourDecimals = unsafeExactFourDecimals(19.9999)

	assertEquals(result, 19.9999)
})

Deno.test("unsafeExactFourDecimals creates ExactFourDecimals from valid number with 3 decimals", () => {
	const result: ExactFourDecimals = unsafeExactFourDecimals(10.543)

	assertEquals(result, 10.543)
})

Deno.test("unsafeExactFourDecimals creates ExactFourDecimals from valid number with 2 decimals", () => {
	const result: ExactFourDecimals = unsafeExactFourDecimals(10.54)

	assertEquals(result, 10.54)
})

Deno.test("unsafeExactFourDecimals creates ExactFourDecimals from valid number with 1 decimal", () => {
	const result: ExactFourDecimals = unsafeExactFourDecimals(10.5)

	assertEquals(result, 10.5)
})

Deno.test("unsafeExactFourDecimals creates ExactFourDecimals from whole number", () => {
	const result: ExactFourDecimals = unsafeExactFourDecimals(100)

	assertEquals(result, 100)
})

Deno.test("unsafeExactFourDecimals creates ExactFourDecimals from zero", () => {
	const result: ExactFourDecimals = unsafeExactFourDecimals(0)

	assertEquals(result, 0)
})

Deno.test("unsafeExactFourDecimals creates ExactFourDecimals from negative value", () => {
	const result: ExactFourDecimals = unsafeExactFourDecimals(-50.2525)

	assertEquals(result, -50.2525)
})

Deno.test("unsafeExactFourDecimals creates ExactFourDecimals from small amount", () => {
	const result: ExactFourDecimals = unsafeExactFourDecimals(0.0001)

	assertEquals(result, 0.0001)
})

Deno.test("unsafeExactFourDecimals does not validate - accepts Infinity", () => {
	const result: ExactFourDecimals = unsafeExactFourDecimals(Infinity)

	assertEquals(result, Infinity)
})

Deno.test("unsafeExactFourDecimals does not validate - accepts 5 decimal places", () => {
	const result: ExactFourDecimals = unsafeExactFourDecimals(19.99999)

	assertEquals(result, 19.99999)
})
