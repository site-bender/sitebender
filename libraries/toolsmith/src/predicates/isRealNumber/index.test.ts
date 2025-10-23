import { assert } from "@std/assert"

import isRealNumber from "@sitebender/toolsmith/predicates/isRealNumber/index.ts"

Deno.test("_isRealNumber returns true for finite numbers", () => {
	assert(isRealNumber(3.14))
})

Deno.test("_isRealNumber returns true for zero", () => {
	assert(isRealNumber(0))
})

Deno.test("_isRealNumber returns true for negative numbers", () => {
	assert(isRealNumber(-42.5))
})

Deno.test("_isRealNumber returns true for integers", () => {
	assert(isRealNumber(100))
})

Deno.test("_isRealNumber returns true for very small numbers", () => {
	assert(isRealNumber(0.0000001))
})

Deno.test("_isRealNumber returns true for very large finite numbers", () => {
	assert(isRealNumber(1.7976931348623157e308))
})

Deno.test("_isRealNumber returns false for Infinity", () => {
	assert(!isRealNumber(Infinity))
})

Deno.test("_isRealNumber returns false for -Infinity", () => {
	assert(!isRealNumber(-Infinity))
})

Deno.test("_isRealNumber returns false for NaN", () => {
	assert(!isRealNumber(NaN))
})
