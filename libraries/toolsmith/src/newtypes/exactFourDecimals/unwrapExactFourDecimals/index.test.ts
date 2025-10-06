import { assertEquals } from "@std/assert"

import unsafeExactFourDecimals from "@sitebender/toolsmith/newtypes/exactFourDecimals/unsafeExactFourDecimals/index.ts"

import unwrapExactFourDecimals from "./index.ts"

Deno.test("unwrapExactFourDecimals extracts number from ExactFourDecimals with 4 decimals", () => {
	const value = unsafeExactFourDecimals(19.9999)
	const result = unwrapExactFourDecimals(value)

	assertEquals(result, 19.9999)
})

Deno.test("unwrapExactFourDecimals extracts number from ExactFourDecimals with 3 decimals", () => {
	const value = unsafeExactFourDecimals(10.543)
	const result = unwrapExactFourDecimals(value)

	assertEquals(result, 10.543)
})

Deno.test("unwrapExactFourDecimals extracts number from ExactFourDecimals with 2 decimals", () => {
	const value = unsafeExactFourDecimals(10.54)
	const result = unwrapExactFourDecimals(value)

	assertEquals(result, 10.54)
})

Deno.test("unwrapExactFourDecimals extracts number from ExactFourDecimals with 1 decimal", () => {
	const value = unsafeExactFourDecimals(10.5)
	const result = unwrapExactFourDecimals(value)

	assertEquals(result, 10.5)
})

Deno.test("unwrapExactFourDecimals extracts number from whole number ExactFourDecimals", () => {
	const value = unsafeExactFourDecimals(100)
	const result = unwrapExactFourDecimals(value)

	assertEquals(result, 100)
})

Deno.test("unwrapExactFourDecimals extracts number from zero ExactFourDecimals", () => {
	const value = unsafeExactFourDecimals(0)
	const result = unwrapExactFourDecimals(value)

	assertEquals(result, 0)
})

Deno.test("unwrapExactFourDecimals extracts number from negative ExactFourDecimals", () => {
	const value = unsafeExactFourDecimals(-50.2525)
	const result = unwrapExactFourDecimals(value)

	assertEquals(result, -50.2525)
})

Deno.test("unwrapExactFourDecimals extracts number from small ExactFourDecimals amount", () => {
	const value = unsafeExactFourDecimals(0.0001)
	const result = unwrapExactFourDecimals(value)

	assertEquals(result, 0.0001)
})
