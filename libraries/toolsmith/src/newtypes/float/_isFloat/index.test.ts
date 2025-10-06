import { assert } from "@std/assert"

import _isFloat from "./index.ts"

Deno.test("_isFloat returns true for finite numbers", () => {
	assert(_isFloat(3.14))
})

Deno.test("_isFloat returns true for zero", () => {
	assert(_isFloat(0))
})

Deno.test("_isFloat returns true for negative numbers", () => {
	assert(_isFloat(-42.5))
})

Deno.test("_isFloat returns true for integers", () => {
	assert(_isFloat(100))
})

Deno.test("_isFloat returns true for very small numbers", () => {
	assert(_isFloat(0.0000001))
})

Deno.test("_isFloat returns true for very large finite numbers", () => {
	assert(_isFloat(1.7976931348623157e308))
})

Deno.test("_isFloat returns false for Infinity", () => {
	assert(!_isFloat(Infinity))
})

Deno.test("_isFloat returns false for -Infinity", () => {
	assert(!_isFloat(-Infinity))
})

Deno.test("_isFloat returns false for NaN", () => {
	assert(!_isFloat(NaN))
})
