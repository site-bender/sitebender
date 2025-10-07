import { assertEquals } from "@std/assert"

import _isInteger from "./index.ts"

Deno.test("_isInteger accepts safe integers", () => {
	assertEquals(_isInteger(0), true)
	assertEquals(_isInteger(1), true)
	assertEquals(_isInteger(-1), true)
	assertEquals(_isInteger(42), true)
	assertEquals(_isInteger(-42), true)
	assertEquals(_isInteger(9007199254740991), true)
	assertEquals(_isInteger(-9007199254740991), true)
})

Deno.test("_isInteger rejects decimals", () => {
	assertEquals(_isInteger(3.14), false)
	assertEquals(_isInteger(0.1), false)
	assertEquals(_isInteger(-0.1), false)
	assertEquals(_isInteger(1.5), false)
})

Deno.test("_isInteger rejects unsafe integers", () => {
	assertEquals(_isInteger(9007199254740992), false)
	assertEquals(_isInteger(-9007199254740992), false)
	assertEquals(_isInteger(Number.MAX_VALUE), false)
	assertEquals(_isInteger(Number.MIN_VALUE), false)
})

Deno.test("_isInteger rejects non-finite values", () => {
	assertEquals(_isInteger(Infinity), false)
	assertEquals(_isInteger(-Infinity), false)
	assertEquals(_isInteger(NaN), false)
})
