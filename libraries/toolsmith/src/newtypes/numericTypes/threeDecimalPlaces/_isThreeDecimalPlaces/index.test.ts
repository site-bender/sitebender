import { assert, assertEquals } from "@std/assert"

import _isThreeDecimalPlaces from "./index.ts"

Deno.test("_isThreeDecimalPlaces accepts whole number", () => {
	const result = _isThreeDecimalPlaces(100)

	assertEquals(result, true)
})

Deno.test("_isThreeDecimalPlaces accepts zero", () => {
	const result = _isThreeDecimalPlaces(0)

	assertEquals(result, true)
})

Deno.test("_isThreeDecimalPlaces accepts negative whole number", () => {
	const result = _isThreeDecimalPlaces(-50)

	assertEquals(result, true)
})

Deno.test("_isThreeDecimalPlaces accepts number with 1 decimal place", () => {
	const result = _isThreeDecimalPlaces(10.5)

	assertEquals(result, true)
})

Deno.test("_isThreeDecimalPlaces accepts number with 2 decimal places", () => {
	const result = _isThreeDecimalPlaces(19.99)

	assertEquals(result, true)
})

Deno.test("_isThreeDecimalPlaces accepts number with 3 decimal places", () => {
	const result = _isThreeDecimalPlaces(123.456)

	assertEquals(result, true)
})

Deno.test("_isThreeDecimalPlaces accepts negative number with 3 decimal places", () => {
	const result = _isThreeDecimalPlaces(-99.999)

	assertEquals(result, true)
})

Deno.test("_isThreeDecimalPlaces accepts small decimal with 3 places", () => {
	const result = _isThreeDecimalPlaces(0.123)

	assertEquals(result, true)
})

Deno.test("_isThreeDecimalPlaces rejects Infinity", () => {
	const result = _isThreeDecimalPlaces(Infinity)

	assertEquals(result, false)
})

Deno.test("_isThreeDecimalPlaces rejects -Infinity", () => {
	const result = _isThreeDecimalPlaces(-Infinity)

	assertEquals(result, false)
})

Deno.test("_isThreeDecimalPlaces rejects NaN", () => {
	const result = _isThreeDecimalPlaces(NaN)

	assertEquals(result, false)
})

Deno.test("_isThreeDecimalPlaces rejects number with 4 decimal places", () => {
	const result = _isThreeDecimalPlaces(1.2345)

	assertEquals(result, false)
})

Deno.test("_isThreeDecimalPlaces rejects number with 5 decimal places", () => {
	const result = _isThreeDecimalPlaces(12.34567)

	assertEquals(result, false)
})

Deno.test("_isThreeDecimalPlaces rejects number with many decimal places", () => {
	const result = _isThreeDecimalPlaces(3.141592653589793)

	assertEquals(result, false)
})
