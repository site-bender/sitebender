import { assertEquals } from "@std/assert"

import isTwoDecimalPlaces from "@sitebender/toolsmith/predicates/isTwoDecimalPlaces/index.ts"

Deno.test("_isTwoDecimalPlaces accepts valid number with 2 decimal places", () => {
	const result = isTwoDecimalPlaces(19.99)

	assertEquals(result, true)
})

Deno.test("_isTwoDecimalPlaces accepts number with 1 decimal place", () => {
	const result = isTwoDecimalPlaces(10.5)

	assertEquals(result, true)
})

Deno.test("_isTwoDecimalPlaces accepts whole numbers", () => {
	const result = isTwoDecimalPlaces(100)

	assertEquals(result, true)
})

Deno.test("_isTwoDecimalPlaces accepts zero", () => {
	const result = isTwoDecimalPlaces(0)

	assertEquals(result, true)
})

Deno.test("_isTwoDecimalPlaces accepts negative numbers", () => {
	const result = isTwoDecimalPlaces(-50.25)

	assertEquals(result, true)
})

Deno.test("_isTwoDecimalPlaces accepts small amounts", () => {
	const result = isTwoDecimalPlaces(0.01)

	assertEquals(result, true)
})

Deno.test("_isTwoDecimalPlaces rejects Infinity", () => {
	const result = isTwoDecimalPlaces(Infinity)

	assertEquals(result, false)
})

Deno.test("_isTwoDecimalPlaces rejects -Infinity", () => {
	const result = isTwoDecimalPlaces(-Infinity)

	assertEquals(result, false)
})

Deno.test("_isTwoDecimalPlaces rejects NaN", () => {
	const result = isTwoDecimalPlaces(NaN)

	assertEquals(result, false)
})

Deno.test("_isTwoDecimalPlaces rejects numbers with 3 decimal places", () => {
	const result = isTwoDecimalPlaces(19.999)

	assertEquals(result, false)
})

Deno.test("_isTwoDecimalPlaces rejects numbers with 4 decimal places", () => {
	const result = isTwoDecimalPlaces(10.1234)

	assertEquals(result, false)
})

Deno.test("_isTwoDecimalPlaces rejects numbers with many decimal places", () => {
	const result = isTwoDecimalPlaces(3.141592653589793)

	assertEquals(result, false)
})
