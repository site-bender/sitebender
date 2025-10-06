import { assertEquals } from "@std/assert"

import _isExactFourDecimals from "./index.ts"

Deno.test("_isExactFourDecimals accepts valid number with 4 decimal places", () => {
	const result = _isExactFourDecimals(19.9999)

	assertEquals(result, true)
})

Deno.test("_isExactFourDecimals accepts number with 3 decimal places", () => {
	const result = _isExactFourDecimals(10.543)

	assertEquals(result, true)
})

Deno.test("_isExactFourDecimals accepts number with 2 decimal places", () => {
	const result = _isExactFourDecimals(10.54)

	assertEquals(result, true)
})

Deno.test("_isExactFourDecimals accepts number with 1 decimal place", () => {
	const result = _isExactFourDecimals(10.5)

	assertEquals(result, true)
})

Deno.test("_isExactFourDecimals accepts whole numbers", () => {
	const result = _isExactFourDecimals(100)

	assertEquals(result, true)
})

Deno.test("_isExactFourDecimals accepts zero", () => {
	const result = _isExactFourDecimals(0)

	assertEquals(result, true)
})

Deno.test("_isExactFourDecimals accepts negative numbers", () => {
	const result = _isExactFourDecimals(-50.2525)

	assertEquals(result, true)
})

Deno.test("_isExactFourDecimals accepts small amounts", () => {
	const result = _isExactFourDecimals(0.0001)

	assertEquals(result, true)
})

Deno.test("_isExactFourDecimals rejects Infinity", () => {
	const result = _isExactFourDecimals(Infinity)

	assertEquals(result, false)
})

Deno.test("_isExactFourDecimals rejects -Infinity", () => {
	const result = _isExactFourDecimals(-Infinity)

	assertEquals(result, false)
})

Deno.test("_isExactFourDecimals rejects NaN", () => {
	const result = _isExactFourDecimals(NaN)

	assertEquals(result, false)
})

Deno.test("_isExactFourDecimals rejects numbers with 5 decimal places", () => {
	const result = _isExactFourDecimals(19.99999)

	assertEquals(result, false)
})

Deno.test("_isExactFourDecimals rejects numbers with 6 decimal places", () => {
	const result = _isExactFourDecimals(10.123456)

	assertEquals(result, false)
})

Deno.test("_isExactFourDecimals rejects numbers with many decimal places", () => {
	const result = _isExactFourDecimals(3.141592653589793)

	assertEquals(result, false)
})
