import { assertEquals } from "@std/assert"

import _isFourDecimalPlaces from "./index.ts"

Deno.test("_isFourDecimalPlaces accepts valid number with 4 decimal places", () => {
	const result = _isFourDecimalPlaces(19.9999)

	assertEquals(result, true)
})

Deno.test("_isFourDecimalPlaces accepts number with 3 decimal places", () => {
	const result = _isFourDecimalPlaces(10.543)

	assertEquals(result, true)
})

Deno.test("_isFourDecimalPlaces accepts number with 2 decimal places", () => {
	const result = _isFourDecimalPlaces(10.54)

	assertEquals(result, true)
})

Deno.test("_isFourDecimalPlaces accepts number with 1 decimal place", () => {
	const result = _isFourDecimalPlaces(10.5)

	assertEquals(result, true)
})

Deno.test("_isFourDecimalPlaces accepts whole numbers", () => {
	const result = _isFourDecimalPlaces(100)

	assertEquals(result, true)
})

Deno.test("_isFourDecimalPlaces accepts zero", () => {
	const result = _isFourDecimalPlaces(0)

	assertEquals(result, true)
})

Deno.test("_isFourDecimalPlaces accepts negative numbers", () => {
	const result = _isFourDecimalPlaces(-50.2525)

	assertEquals(result, true)
})

Deno.test("_isFourDecimalPlaces accepts small amounts", () => {
	const result = _isFourDecimalPlaces(0.0001)

	assertEquals(result, true)
})

Deno.test("_isFourDecimalPlaces rejects Infinity", () => {
	const result = _isFourDecimalPlaces(Infinity)

	assertEquals(result, false)
})

Deno.test("_isFourDecimalPlaces rejects -Infinity", () => {
	const result = _isFourDecimalPlaces(-Infinity)

	assertEquals(result, false)
})

Deno.test("_isFourDecimalPlaces rejects NaN", () => {
	const result = _isFourDecimalPlaces(NaN)

	assertEquals(result, false)
})

Deno.test("_isFourDecimalPlaces rejects numbers with 5 decimal places", () => {
	const result = _isFourDecimalPlaces(19.99999)

	assertEquals(result, false)
})

Deno.test("_isFourDecimalPlaces rejects numbers with 6 decimal places", () => {
	const result = _isFourDecimalPlaces(10.123456)

	assertEquals(result, false)
})

Deno.test("_isFourDecimalPlaces rejects numbers with many decimal places", () => {
	const result = _isFourDecimalPlaces(3.141592653589793)

	assertEquals(result, false)
})
