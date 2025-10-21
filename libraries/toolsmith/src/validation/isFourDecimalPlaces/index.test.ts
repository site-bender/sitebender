import { assertEquals } from "@std/assert"

import isFourDecimalPlaces from "@sitebender/toolsmith/validation/isFourDecimalPlaces/index.ts"

Deno.test("_isFourDecimalPlaces accepts whole number", () => {
	const result = isFourDecimalPlaces(100)

	assertEquals(result, true)
})

Deno.test("_isFourDecimalPlaces accepts zero", () => {
	const result = isFourDecimalPlaces(0)

	assertEquals(result, true)
})

Deno.test("_isFourDecimalPlaces accepts negative whole number", () => {
	const result = isFourDecimalPlaces(-50)

	assertEquals(result, true)
})

Deno.test("_isFourDecimalPlaces accepts number with 1 decimal place", () => {
	const result = isFourDecimalPlaces(10.5)

	assertEquals(result, true)
})

Deno.test("_isFourDecimalPlaces accepts number with 2 decimal places", () => {
	const result = isFourDecimalPlaces(19.99)

	assertEquals(result, true)
})

Deno.test("_isFourDecimalPlaces accepts number with 3 decimal places", () => {
	const result = isFourDecimalPlaces(123.456)

	assertEquals(result, true)
})

Deno.test("_isFourDecimalPlaces accepts number with 4 decimal places", () => {
	const result = isFourDecimalPlaces(123.4567)

	assertEquals(result, true)
})

Deno.test("_isFourDecimalPlaces accepts negative number with 4 decimal places", () => {
	const result = isFourDecimalPlaces(-99.9999)

	assertEquals(result, true)
})

Deno.test("_isFourDecimalPlaces accepts small decimal with 4 places", () => {
	const result = isFourDecimalPlaces(0.1234)

	assertEquals(result, true)
})

Deno.test("_isFourDecimalPlaces rejects Infinity", () => {
	const result = isFourDecimalPlaces(Infinity)

	assertEquals(result, false)
})

Deno.test("_isFourDecimalPlaces rejects -Infinity", () => {
	const result = isFourDecimalPlaces(-Infinity)

	assertEquals(result, false)
})

Deno.test("_isFourDecimalPlaces rejects NaN", () => {
	const result = isFourDecimalPlaces(NaN)

	assertEquals(result, false)
})

Deno.test("_isFourDecimalPlaces rejects number with 5 decimal places", () => {
	const result = isFourDecimalPlaces(1.23456)

	assertEquals(result, false)
})

Deno.test("_isFourDecimalPlaces rejects number with 6 decimal places", () => {
	const result = isFourDecimalPlaces(12.345678)

	assertEquals(result, false)
})

Deno.test("_isFourDecimalPlaces rejects number with many decimal places", () => {
	const result = isFourDecimalPlaces(3.141592653589793)

	assertEquals(result, false)
})
