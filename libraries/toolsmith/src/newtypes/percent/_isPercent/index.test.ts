import { assert } from "@std/assert"

import _isPercent from "./index.ts"

Deno.test("_isPercent returns true for zero", () => {
	assert(_isPercent(0))
})

Deno.test("_isPercent returns true for one (100%)", () => {
	assert(_isPercent(1))
})

Deno.test("_isPercent returns true for 0.5 (50%)", () => {
	assert(_isPercent(0.5))
})

Deno.test("_isPercent returns true for 1 decimal place", () => {
	assert(_isPercent(0.1))
	assert(_isPercent(0.9))
})

Deno.test("_isPercent returns true for 2 decimal places", () => {
	assert(_isPercent(0.25))
	assert(_isPercent(0.75))
	assert(_isPercent(0.99))
})

Deno.test("_isPercent returns true for 4 decimal places", () => {
	assert(_isPercent(0.1234))
	assert(_isPercent(0.9999))
	assert(_isPercent(0.0001)) // 0.01%
})

Deno.test("_isPercent returns true for common percentages", () => {
	assert(_isPercent(0.15)) // 15% (sales tax)
	assert(_isPercent(0.0825)) // 8.25% (tax rate)
	assert(_isPercent(0.045)) // 4.5% (interest)
})

Deno.test("_isPercent returns false for values > 1", () => {
	assert(!_isPercent(1.0001))
	assert(!_isPercent(2))
	assert(!_isPercent(100))
})

Deno.test("_isPercent returns false for negative values", () => {
	assert(!_isPercent(-0.0001))
	assert(!_isPercent(-0.5))
	assert(!_isPercent(-1))
})

Deno.test("_isPercent returns false for 5 decimal places", () => {
	assert(!_isPercent(0.12345))
})

Deno.test("_isPercent returns false for Infinity", () => {
	assert(!_isPercent(Infinity))
})

Deno.test("_isPercent returns false for -Infinity", () => {
	assert(!_isPercent(-Infinity))
})

Deno.test("_isPercent returns false for NaN", () => {
	assert(!_isPercent(NaN))
})
