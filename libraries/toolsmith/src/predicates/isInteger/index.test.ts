import { assertEquals } from "@std/assert"

import isInteger from "./index.ts"

Deno.test("isInteger accepts safe integers", () => {
	assertEquals(isInteger(0), true)
	assertEquals(isInteger(1), true)
	assertEquals(isInteger(-1), true)
	assertEquals(isInteger(42), true)
	assertEquals(isInteger(-42), true)
	assertEquals(isInteger(9007199254740991), true)
	assertEquals(isInteger(-9007199254740991), true)
})

Deno.test("isInteger rejects decimals", () => {
	assertEquals(isInteger(3.14), false)
	assertEquals(isInteger(0.1), false)
	assertEquals(isInteger(-0.1), false)
	assertEquals(isInteger(1.5), false)
})

Deno.test("isInteger rejects unsafe integers", () => {
	assertEquals(isInteger(9007199254740992), false)
	assertEquals(isInteger(-9007199254740992), false)
	assertEquals(isInteger(Number.MAX_VALUE), false)
	assertEquals(isInteger(Number.MIN_VALUE), false)
})

Deno.test("isInteger rejects non-finite values", () => {
	assertEquals(isInteger(Infinity), false)
	assertEquals(isInteger(-Infinity), false)
	assertEquals(isInteger(NaN), false)
})
