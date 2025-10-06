import { assertEquals } from "@std/assert"

import _isExactTwoDecimals from "./index.ts"

Deno.test("_isExactTwoDecimals accepts valid number with 2 decimal places", () => {
	const result = _isExactTwoDecimals(19.99)

	assertEquals(result, true)
})

Deno.test("_isExactTwoDecimals accepts number with 1 decimal place", () => {
	const result = _isExactTwoDecimals(10.5)

	assertEquals(result, true)
})

Deno.test("_isExactTwoDecimals accepts whole numbers", () => {
	const result = _isExactTwoDecimals(100)

	assertEquals(result, true)
})

Deno.test("_isExactTwoDecimals accepts zero", () => {
	const result = _isExactTwoDecimals(0)

	assertEquals(result, true)
})

Deno.test("_isExactTwoDecimals accepts negative numbers", () => {
	const result = _isExactTwoDecimals(-50.25)

	assertEquals(result, true)
})

Deno.test("_isExactTwoDecimals accepts small amounts", () => {
	const result = _isExactTwoDecimals(0.01)

	assertEquals(result, true)
})

Deno.test("_isExactTwoDecimals rejects Infinity", () => {
	const result = _isExactTwoDecimals(Infinity)

	assertEquals(result, false)
})

Deno.test("_isExactTwoDecimals rejects -Infinity", () => {
	const result = _isExactTwoDecimals(-Infinity)

	assertEquals(result, false)
})

Deno.test("_isExactTwoDecimals rejects NaN", () => {
	const result = _isExactTwoDecimals(NaN)

	assertEquals(result, false)
})

Deno.test("_isExactTwoDecimals rejects numbers with 3 decimal places", () => {
	const result = _isExactTwoDecimals(19.999)

	assertEquals(result, false)
})

Deno.test("_isExactTwoDecimals rejects numbers with 4 decimal places", () => {
	const result = _isExactTwoDecimals(10.1234)

	assertEquals(result, false)
})

Deno.test("_isExactTwoDecimals rejects numbers with many decimal places", () => {
	const result = _isExactTwoDecimals(3.141592653589793)

	assertEquals(result, false)
})
