import { assert, assertEquals } from "@std/assert"

import _isDecimal3 from "./index.ts"

Deno.test("_isDecimal3 accepts whole number", () => {
	const result = _isDecimal3(100)

	assertEquals(result, true)
})

Deno.test("_isDecimal3 accepts zero", () => {
	const result = _isDecimal3(0)

	assertEquals(result, true)
})

Deno.test("_isDecimal3 accepts negative whole number", () => {
	const result = _isDecimal3(-50)

	assertEquals(result, true)
})

Deno.test("_isDecimal3 accepts number with 1 decimal place", () => {
	const result = _isDecimal3(10.5)

	assertEquals(result, true)
})

Deno.test("_isDecimal3 accepts number with 2 decimal places", () => {
	const result = _isDecimal3(19.99)

	assertEquals(result, true)
})

Deno.test("_isDecimal3 accepts number with 3 decimal places", () => {
	const result = _isDecimal3(123.456)

	assertEquals(result, true)
})

Deno.test("_isDecimal3 accepts negative number with 3 decimal places", () => {
	const result = _isDecimal3(-99.999)

	assertEquals(result, true)
})

Deno.test("_isDecimal3 accepts small decimal with 3 places", () => {
	const result = _isDecimal3(0.123)

	assertEquals(result, true)
})

Deno.test("_isDecimal3 rejects Infinity", () => {
	const result = _isDecimal3(Infinity)

	assertEquals(result, false)
})

Deno.test("_isDecimal3 rejects -Infinity", () => {
	const result = _isDecimal3(-Infinity)

	assertEquals(result, false)
})

Deno.test("_isDecimal3 rejects NaN", () => {
	const result = _isDecimal3(NaN)

	assertEquals(result, false)
})

Deno.test("_isDecimal3 rejects number with 4 decimal places", () => {
	const result = _isDecimal3(1.2345)

	assertEquals(result, false)
})

Deno.test("_isDecimal3 rejects number with 5 decimal places", () => {
	const result = _isDecimal3(12.34567)

	assertEquals(result, false)
})

Deno.test("_isDecimal3 rejects number with many decimal places", () => {
	const result = _isDecimal3(3.141592653589793)

	assertEquals(result, false)
})
