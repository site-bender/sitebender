import { assertEquals } from "@std/assert"

import _isOneDecimalPlace from "./index.ts"

Deno.test("_isOneDecimalPlace accepts whole number", () => {
	const result = _isOneDecimalPlace(100)

	assertEquals(result, true)
})

Deno.test("_isOneDecimalPlace accepts zero", () => {
	const result = _isOneDecimalPlace(0)

	assertEquals(result, true)
})

Deno.test("_isOneDecimalPlace accepts negative whole number", () => {
	const result = _isOneDecimalPlace(-50)

	assertEquals(result, true)
})

Deno.test("_isOneDecimalPlace accepts number with 1 decimal place", () => {
	const result = _isOneDecimalPlace(10.5)

	assertEquals(result, true)
})

Deno.test("_isOneDecimalPlace accepts negative number with 1 decimal place", () => {
	const result = _isOneDecimalPlace(-19.9)

	assertEquals(result, true)
})

Deno.test("_isOneDecimalPlace accepts small decimal with 1 place", () => {
	const result = _isOneDecimalPlace(0.1)

	assertEquals(result, true)
})

Deno.test("_isOneDecimalPlace rejects Infinity", () => {
	const result = _isOneDecimalPlace(Infinity)

	assertEquals(result, false)
})

Deno.test("_isOneDecimalPlace rejects -Infinity", () => {
	const result = _isOneDecimalPlace(-Infinity)

	assertEquals(result, false)
})

Deno.test("_isOneDecimalPlace rejects NaN", () => {
	const result = _isOneDecimalPlace(NaN)

	assertEquals(result, false)
})

Deno.test("_isOneDecimalPlace rejects number with 2 decimal places", () => {
	const result = _isOneDecimalPlace(19.99)

	assertEquals(result, false)
})

Deno.test("_isOneDecimalPlace rejects number with 3 decimal places", () => {
	const result = _isOneDecimalPlace(123.456)

	assertEquals(result, false)
})

Deno.test("_isOneDecimalPlace rejects number with many decimal places", () => {
	const result = _isOneDecimalPlace(3.141592653589793)

	assertEquals(result, false)
})
