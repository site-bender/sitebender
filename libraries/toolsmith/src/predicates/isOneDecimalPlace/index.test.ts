import { assertEquals } from "@std/assert"

import isOneDecimalPlace from "@sitebender/toolsmith/predicates/isOneDecimalPlace/index.ts"

Deno.test("_isOneDecimalPlace accepts whole number", () => {
	const result = isOneDecimalPlace(100)

	assertEquals(result, true)
})

Deno.test("_isOneDecimalPlace accepts zero", () => {
	const result = isOneDecimalPlace(0)

	assertEquals(result, true)
})

Deno.test("_isOneDecimalPlace accepts negative whole number", () => {
	const result = isOneDecimalPlace(-50)

	assertEquals(result, true)
})

Deno.test("_isOneDecimalPlace accepts number with 1 decimal place", () => {
	const result = isOneDecimalPlace(10.5)

	assertEquals(result, true)
})

Deno.test("_isOneDecimalPlace accepts negative number with 1 decimal place", () => {
	const result = isOneDecimalPlace(-19.9)

	assertEquals(result, true)
})

Deno.test("_isOneDecimalPlace accepts small decimal with 1 place", () => {
	const result = isOneDecimalPlace(0.1)

	assertEquals(result, true)
})

Deno.test("_isOneDecimalPlace rejects Infinity", () => {
	const result = isOneDecimalPlace(Infinity)

	assertEquals(result, false)
})

Deno.test("_isOneDecimalPlace rejects -Infinity", () => {
	const result = isOneDecimalPlace(-Infinity)

	assertEquals(result, false)
})

Deno.test("_isOneDecimalPlace rejects NaN", () => {
	const result = isOneDecimalPlace(NaN)

	assertEquals(result, false)
})

Deno.test("_isOneDecimalPlace rejects number with 2 decimal places", () => {
	const result = isOneDecimalPlace(19.99)

	assertEquals(result, false)
})

Deno.test("_isOneDecimalPlace rejects number with 3 decimal places", () => {
	const result = isOneDecimalPlace(123.456)

	assertEquals(result, false)
})

Deno.test("_isOneDecimalPlace rejects number with many decimal places", () => {
	const result = isOneDecimalPlace(3.141592653589793)

	assertEquals(result, false)
})
