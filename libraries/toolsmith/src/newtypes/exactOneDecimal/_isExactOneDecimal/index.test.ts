import { assertEquals } from "@std/assert"

import _isExactOneDecimal from "./index.ts"

Deno.test("_isExactOneDecimal accepts whole number", () => {
	const result = _isExactOneDecimal(100)

	assertEquals(result, true)
})

Deno.test("_isExactOneDecimal accepts zero", () => {
	const result = _isExactOneDecimal(0)

	assertEquals(result, true)
})

Deno.test("_isExactOneDecimal accepts negative whole number", () => {
	const result = _isExactOneDecimal(-50)

	assertEquals(result, true)
})

Deno.test("_isExactOneDecimal accepts number with 1 decimal place", () => {
	const result = _isExactOneDecimal(10.5)

	assertEquals(result, true)
})

Deno.test("_isExactOneDecimal accepts negative number with 1 decimal place", () => {
	const result = _isExactOneDecimal(-19.9)

	assertEquals(result, true)
})

Deno.test("_isExactOneDecimal accepts small decimal with 1 place", () => {
	const result = _isExactOneDecimal(0.1)

	assertEquals(result, true)
})

Deno.test("_isExactOneDecimal rejects Infinity", () => {
	const result = _isExactOneDecimal(Infinity)

	assertEquals(result, false)
})

Deno.test("_isExactOneDecimal rejects -Infinity", () => {
	const result = _isExactOneDecimal(-Infinity)

	assertEquals(result, false)
})

Deno.test("_isExactOneDecimal rejects NaN", () => {
	const result = _isExactOneDecimal(NaN)

	assertEquals(result, false)
})

Deno.test("_isExactOneDecimal rejects number with 2 decimal places", () => {
	const result = _isExactOneDecimal(19.99)

	assertEquals(result, false)
})

Deno.test("_isExactOneDecimal rejects number with 3 decimal places", () => {
	const result = _isExactOneDecimal(123.456)

	assertEquals(result, false)
})

Deno.test("_isExactOneDecimal rejects number with many decimal places", () => {
	const result = _isExactOneDecimal(3.141592653589793)

	assertEquals(result, false)
})
