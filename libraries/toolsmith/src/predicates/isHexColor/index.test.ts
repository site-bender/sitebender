import { assertEquals } from "@std/assert"
import isHexColor from "@sitebender/toolsmith/predicates/isHexColor/index.ts"

Deno.test("isHexColor returns true for valid 3-digit hex colors", function testIsHexColorThreeDigit() {
	assertEquals(isHexColor("#fff"), true)
	assertEquals(isHexColor("#000"), true)
	assertEquals(isHexColor("#abc"), true)
})

Deno.test("isHexColor returns true for valid 6-digit hex colors", function testIsHexColorSixDigit() {
	assertEquals(isHexColor("#ffffff"), true)
	assertEquals(isHexColor("#000000"), true)
	assertEquals(isHexColor("#abc123"), true)
})

Deno.test("isHexColor returns false for empty string", function testIsHexColorEmpty() {
	assertEquals(isHexColor(""), false)
})

Deno.test("isHexColor returns false for invalid format", function testIsHexColorInvalid() {
	assertEquals(isHexColor("#gg0000"), false)
	assertEquals(isHexColor("fff"), false)
	assertEquals(isHexColor("#ff00"), false)
})

Deno.test("isHexColor returns false for non-strings", function testIsHexColorNonString() {
	assertEquals(isHexColor(123 as unknown as string), false)
	assertEquals(isHexColor(null as unknown as string), false)
	assertEquals(isHexColor(undefined as unknown as string), false)
})
