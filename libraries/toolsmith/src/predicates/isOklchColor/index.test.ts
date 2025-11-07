import { assertEquals } from "@std/assert"
import isOklchColor from "@sitebender/toolsmith/predicates/isOklchColor/index.ts"

Deno.test("isOklchColor returns true for valid decimal format", function testIsOklchColorDecimal() {
	assertEquals(isOklchColor("oklch(0.5 0.1 120)"), true)
})

Deno.test("isOklchColor returns true for percentage lightness", function testIsOklchColorPercentage() {
	assertEquals(isOklchColor("oklch(50% 0.1 120)"), true)
})

Deno.test("isOklchColor returns true with alpha", function testIsOklchColorAlpha() {
	assertEquals(isOklchColor("oklch(0.5 0.1 120 / 0.8)"), true)
})

Deno.test("isOklchColor returns false for empty string", function testIsOklchColorEmpty() {
	assertEquals(isOklchColor(""), false)
})

Deno.test("isOklchColor returns false for invalid format", function testIsOklchColorInvalid() {
	assertEquals(isOklchColor("rgb(255, 0, 0)"), false)
})

Deno.test("isOklchColor returns false for out of range values", function testIsOklchColorOutOfRange() {
	assertEquals(isOklchColor("oklch(1.5 0.1 120)"), false)
	assertEquals(isOklchColor("oklch(0.5 -0.1 120)"), false)
	assertEquals(isOklchColor("oklch(0.5 0.1 400)"), false)
	assertEquals(isOklchColor("oklch(0.5 0.1 120 / 1.5)"), false)
})

Deno.test("isOklchColor returns false for non-strings", function testIsOklchColorNonString() {
	assertEquals(isOklchColor(123 as unknown as string), false)
	assertEquals(isOklchColor(null as unknown as string), false)
	assertEquals(isOklchColor(undefined as unknown as string), false)
})
