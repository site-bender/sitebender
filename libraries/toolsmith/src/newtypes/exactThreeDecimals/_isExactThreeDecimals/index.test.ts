import { assert, assertEquals } from "@std/assert"

import _isExactThreeDecimals from "./index.ts"

Deno.test("_isExactThreeDecimals accepts whole number", () => {
	const result = _isExactThreeDecimals(100)

	assertEquals(result, true)
})

Deno.test("_isExactThreeDecimals accepts zero", () => {
	const result = _isExactThreeDecimals(0)

	assertEquals(result, true)
})

Deno.test("_isExactThreeDecimals accepts negative whole number", () => {
	const result = _isExactThreeDecimals(-50)

	assertEquals(result, true)
})

Deno.test("_isExactThreeDecimals accepts number with 1 decimal place", () => {
	const result = _isExactThreeDecimals(10.5)

	assertEquals(result, true)
})

Deno.test("_isExactThreeDecimals accepts number with 2 decimal places", () => {
	const result = _isExactThreeDecimals(19.99)

	assertEquals(result, true)
})

Deno.test("_isExactThreeDecimals accepts number with 3 decimal places", () => {
	const result = _isExactThreeDecimals(123.456)

	assertEquals(result, true)
})

Deno.test("_isExactThreeDecimals accepts negative number with 3 decimal places", () => {
	const result = _isExactThreeDecimals(-99.999)

	assertEquals(result, true)
})

Deno.test("_isExactThreeDecimals accepts small decimal with 3 places", () => {
	const result = _isExactThreeDecimals(0.123)

	assertEquals(result, true)
})

Deno.test("_isExactThreeDecimals rejects Infinity", () => {
	const result = _isExactThreeDecimals(Infinity)

	assertEquals(result, false)
})

Deno.test("_isExactThreeDecimals rejects -Infinity", () => {
	const result = _isExactThreeDecimals(-Infinity)

	assertEquals(result, false)
})

Deno.test("_isExactThreeDecimals rejects NaN", () => {
	const result = _isExactThreeDecimals(NaN)

	assertEquals(result, false)
})

Deno.test("_isExactThreeDecimals rejects number with 4 decimal places", () => {
	const result = _isExactThreeDecimals(1.2345)

	assertEquals(result, false)
})

Deno.test("_isExactThreeDecimals rejects number with 5 decimal places", () => {
	const result = _isExactThreeDecimals(12.34567)

	assertEquals(result, false)
})

Deno.test("_isExactThreeDecimals rejects number with many decimal places", () => {
	const result = _isExactThreeDecimals(3.141592653589793)

	assertEquals(result, false)
})
