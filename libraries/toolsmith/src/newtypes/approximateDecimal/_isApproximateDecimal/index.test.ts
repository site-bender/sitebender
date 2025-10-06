import { assert } from "@std/assert"

import _isApproximateDecimal from "./index.ts"

Deno.test("_isApproximateDecimal returns true for finite numbers", () => {
	assert(_isApproximateDecimal(3.14))
})

Deno.test("_isApproximateDecimal returns true for zero", () => {
	assert(_isApproximateDecimal(0))
})

Deno.test("_isApproximateDecimal returns true for negative numbers", () => {
	assert(_isApproximateDecimal(-42.5))
})

Deno.test("_isApproximateDecimal returns true for integers", () => {
	assert(_isApproximateDecimal(100))
})

Deno.test("_isApproximateDecimal returns true for very small numbers", () => {
	assert(_isApproximateDecimal(0.0000001))
})

Deno.test("_isApproximateDecimal returns true for very large finite numbers", () => {
	assert(_isApproximateDecimal(1.7976931348623157e308))
})

Deno.test("_isApproximateDecimal returns false for Infinity", () => {
	assert(!_isApproximateDecimal(Infinity))
})

Deno.test("_isApproximateDecimal returns false for -Infinity", () => {
	assert(!_isApproximateDecimal(-Infinity))
})

Deno.test("_isApproximateDecimal returns false for NaN", () => {
	assert(!_isApproximateDecimal(NaN))
})
