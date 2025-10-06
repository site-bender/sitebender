import { assert } from "@std/assert"

import _isEightDecimalPlaces from "./index.ts"

Deno.test("_isEightDecimalPlaces returns true for zero", () => {
	assert(_isEightDecimalPlaces(0))
})

Deno.test("_isEightDecimalPlaces returns true for integers", () => {
	assert(_isEightDecimalPlaces(1))
	assert(_isEightDecimalPlaces(100))
	assert(_isEightDecimalPlaces(-42))
})

Deno.test("_isEightDecimalPlaces returns true for 1 decimal place", () => {
	assert(_isEightDecimalPlaces(1.5))
	assert(_isEightDecimalPlaces(-3.7))
})

Deno.test("_isEightDecimalPlaces returns true for 2 decimal places", () => {
	assert(_isEightDecimalPlaces(19.99))
	assert(_isEightDecimalPlaces(-0.01))
})

Deno.test("_isEightDecimalPlaces returns true for 4 decimal places", () => {
	assert(_isEightDecimalPlaces(1.2345))
	assert(_isEightDecimalPlaces(-99.9999))
})

Deno.test("_isEightDecimalPlaces returns true for exactly 8 decimal places", () => {
	assert(_isEightDecimalPlaces(0.12345678))
	assert(_isEightDecimalPlaces(1.00000001))
	assert(_isEightDecimalPlaces(-42.99999999))
})

Deno.test("_isEightDecimalPlaces returns true for cryptocurrency amounts (satoshis)", () => {
	assert(_isEightDecimalPlaces(0.00000001)) // 1 satoshi
	assert(_isEightDecimalPlaces(21000000)) // Max Bitcoin supply
	assert(_isEightDecimalPlaces(0.12345678)) // Typical Bitcoin amount
})

Deno.test("_isEightDecimalPlaces returns false for 9 decimal places", () => {
	assert(!_isEightDecimalPlaces(0.123456789))
})

Deno.test("_isEightDecimalPlaces returns false for 10 decimal places", () => {
	assert(!_isEightDecimalPlaces(0.1234567890))
})

Deno.test("_isEightDecimalPlaces returns false for Infinity", () => {
	assert(!_isEightDecimalPlaces(Infinity))
})

Deno.test("_isEightDecimalPlaces returns false for -Infinity", () => {
	assert(!_isEightDecimalPlaces(-Infinity))
})

Deno.test("_isEightDecimalPlaces returns false for NaN", () => {
	assert(!_isEightDecimalPlaces(NaN))
})
