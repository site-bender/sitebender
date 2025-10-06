import { assert, assertEquals } from "@std/assert"

import _isDecimal0 from "./index.ts"

Deno.test("_isDecimal0 accepts whole number", () => {
	const result = _isDecimal0(100)

	assertEquals(result, true)
})

Deno.test("_isDecimal0 accepts zero", () => {
	const result = _isDecimal0(0)

	assertEquals(result, true)
})

Deno.test("_isDecimal0 accepts negative whole number", () => {
	const result = _isDecimal0(-50)

	assertEquals(result, true)
})

Deno.test("_isDecimal0 accepts large whole number", () => {
	const result = _isDecimal0(1000000)

	assertEquals(result, true)
})

Deno.test("_isDecimal0 rejects Infinity", () => {
	const result = _isDecimal0(Infinity)

	assertEquals(result, false)
})

Deno.test("_isDecimal0 rejects -Infinity", () => {
	const result = _isDecimal0(-Infinity)

	assertEquals(result, false)
})

Deno.test("_isDecimal0 rejects NaN", () => {
	const result = _isDecimal0(NaN)

	assertEquals(result, false)
})

Deno.test("_isDecimal0 rejects number with 1 decimal place", () => {
	const result = _isDecimal0(10.5)

	assertEquals(result, false)
})

Deno.test("_isDecimal0 rejects number with 2 decimal places", () => {
	const result = _isDecimal0(19.99)

	assertEquals(result, false)
})

Deno.test("_isDecimal0 rejects number with many decimal places", () => {
	const result = _isDecimal0(3.141592653589793)

	assertEquals(result, false)
})

Deno.test("_isDecimal0 rejects small decimal", () => {
	const result = _isDecimal0(0.1)

	assertEquals(result, false)
})
