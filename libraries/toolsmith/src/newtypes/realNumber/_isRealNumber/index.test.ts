import { assert } from "@std/assert"

import _isRealNumber from "./index.ts"

Deno.test("_isRealNumber returns true for finite numbers", () => {
	assert(_isRealNumber(3.14))
})

Deno.test("_isRealNumber returns true for zero", () => {
	assert(_isRealNumber(0))
})

Deno.test("_isRealNumber returns true for negative numbers", () => {
	assert(_isRealNumber(-42.5))
})

Deno.test("_isRealNumber returns true for integers", () => {
	assert(_isRealNumber(100))
})

Deno.test("_isRealNumber returns true for very small numbers", () => {
	assert(_isRealNumber(0.0000001))
})

Deno.test("_isRealNumber returns true for very large finite numbers", () => {
	assert(_isRealNumber(1.7976931348623157e308))
})

Deno.test("_isRealNumber returns false for Infinity", () => {
	assert(!_isRealNumber(Infinity))
})

Deno.test("_isRealNumber returns false for -Infinity", () => {
	assert(!_isRealNumber(-Infinity))
})

Deno.test("_isRealNumber returns false for NaN", () => {
	assert(!_isRealNumber(NaN))
})
