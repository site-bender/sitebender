import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"

import isInteger from "../../../../src/simple/validation/isInteger/index.ts"

Deno.test("isInteger: detects integers", () => {
	assertEquals(isInteger(42), true)
	assertEquals(isInteger(-42), true)
	assertEquals(isInteger(0), true)
	assertEquals(isInteger(1.0), true)
})

Deno.test("isInteger: rejects non-integers", () => {
	assertEquals(isInteger(1.5), false)
	assertEquals(isInteger(NaN), false)
	assertEquals(isInteger(Infinity), false)
	assertEquals(isInteger("5" as unknown), false)
	assertEquals(isInteger(null as unknown), false)
	assertEquals(isInteger(undefined as unknown), false)
})
