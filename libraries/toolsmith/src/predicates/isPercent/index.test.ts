import { assert } from "@std/assert"

import isPercent from "@sitebender/toolsmith/predicates/isPercent/index.ts"

Deno.test("_isPercent returns true for zero", () => {
	assert(isPercent(0))
})

Deno.test("_isPercent returns true for one (100%)", () => {
	assert(isPercent(1))
})

Deno.test("_isPercent returns true for 0.5 (50%)", () => {
	assert(isPercent(0.5))
})

Deno.test("_isPercent returns true for 1 decimal place", () => {
	assert(isPercent(0.1))
	assert(isPercent(0.9))
})

Deno.test("_isPercent returns true for 2 decimal places", () => {
	assert(isPercent(0.25))
	assert(isPercent(0.75))
	assert(isPercent(0.99))
})

Deno.test("_isPercent returns true for 4 decimal places", () => {
	assert(isPercent(0.1234))
	assert(isPercent(0.9999))
	assert(isPercent(0.0001)) // 0.01%
})

Deno.test("_isPercent returns true for common percentages", () => {
	assert(isPercent(0.15)) // 15% (sales tax)
	assert(isPercent(0.0825)) // 8.25% (tax rate)
	assert(isPercent(0.045)) // 4.5% (interest)
})

Deno.test("_isPercent returns false for values > 1", () => {
	assert(!isPercent(1.0001))
	assert(!isPercent(2))
	assert(!isPercent(100))
})

Deno.test("_isPercent returns false for negative values", () => {
	assert(!isPercent(-0.0001))
	assert(!isPercent(-0.5))
	assert(!isPercent(-1))
})

Deno.test("_isPercent returns false for 5 decimal places", () => {
	assert(!isPercent(0.12345))
})

Deno.test("_isPercent returns false for Infinity", () => {
	assert(!isPercent(Infinity))
})

Deno.test("_isPercent returns false for -Infinity", () => {
	assert(!isPercent(-Infinity))
})

Deno.test("_isPercent returns false for NaN", () => {
	assert(!isPercent(NaN))
})
