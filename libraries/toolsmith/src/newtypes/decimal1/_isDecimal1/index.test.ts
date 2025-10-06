import { assert, assertEquals } from "@std/assert"

import _isDecimal1 from "./index.ts"

Deno.test("_isDecimal1 accepts whole number", () => {
	const result = _isDecimal1(100)

	assertEquals(result, true)
})

Deno.test("_isDecimal1 accepts zero", () => {
	const result = _isDecimal1(0)

	assertEquals(result, true)
})

Deno.test("_isDecimal1 accepts negative whole number", () => {
	const result = _isDecimal1(-50)

	assertEquals(result, true)
})

Deno.test("_isDecimal1 accepts number with 1 decimal place", () => {
	const result = _isDecimal1(10.5)

	assertEquals(result, true)
})

Deno.test("_isDecimal1 accepts negative number with 1 decimal place", () => {
	const result = _isDecimal1(-19.9)

	assertEquals(result, true)
})

Deno.test("_isDecimal1 accepts small decimal with 1 place", () => {
	const result = _isDecimal1(0.1)

	assertEquals(result, true)
})

Deno.test("_isDecimal1 rejects Infinity", () => {
	const result = _isDecimal1(Infinity)

	assertEquals(result, false)
})

Deno.test("_isDecimal1 rejects -Infinity", () => {
	const result = _isDecimal1(-Infinity)

	assertEquals(result, false)
})

Deno.test("_isDecimal1 rejects NaN", () => {
	const result = _isDecimal1(NaN)

	assertEquals(result, false)
})

Deno.test("_isDecimal1 rejects number with 2 decimal places", () => {
	const result = _isDecimal1(19.99)

	assertEquals(result, false)
})

Deno.test("_isDecimal1 rejects number with 3 decimal places", () => {
	const result = _isDecimal1(123.456)

	assertEquals(result, false)
})

Deno.test("_isDecimal1 rejects number with many decimal places", () => {
	const result = _isDecimal1(3.141592653589793)

	assertEquals(result, false)
})
