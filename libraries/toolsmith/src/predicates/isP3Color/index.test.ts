import { assertEquals } from "@std/assert"
import isP3Color from "@sitebender/toolsmith/predicates/isP3Color/index.ts"

Deno.test("isP3Color returns true for valid decimal format", function testIsP3ColorDecimal() {
	assertEquals(isP3Color("color(display-p3 1 0 0)"), true)
})

Deno.test("isP3Color returns true for percentage format", function testIsP3ColorPercentage() {
	assertEquals(isP3Color("color(display-p3 100% 0% 0%)"), true)
})

Deno.test("isP3Color returns true with alpha", function testIsP3ColorAlpha() {
	assertEquals(isP3Color("color(display-p3 1 0 0 / 0.8)"), true)
})

Deno.test("isP3Color returns false for empty string", function testIsP3ColorEmpty() {
	assertEquals(isP3Color(""), false)
})

Deno.test("isP3Color returns false for invalid format", function testIsP3ColorInvalid() {
	assertEquals(isP3Color("rgb(255, 0, 0)"), false)
})

Deno.test("isP3Color returns false for out of range values", function testIsP3ColorOutOfRange() {
	assertEquals(isP3Color("color(display-p3 1.5 0 0)"), false)
	assertEquals(isP3Color("color(display-p3 1 1.5 0)"), false)
	assertEquals(isP3Color("color(display-p3 1 0 1.5)"), false)
	assertEquals(isP3Color("color(display-p3 1 0 0 / 1.5)"), false)
})

Deno.test("isP3Color returns false for non-strings", function testIsP3ColorNonString() {
	assertEquals(isP3Color(123 as unknown as string), false)
	assertEquals(isP3Color(null as unknown as string), false)
	assertEquals(isP3Color(undefined as unknown as string), false)
})
