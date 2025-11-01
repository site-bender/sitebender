import { assertEquals } from "@std/assert"
import hexColor from "@sitebender/toolsmith/newtypes/stringTypes/hexColor/index.ts"

Deno.test("hexColor returns Ok for valid 3-digit hex colors", function testHexColorThreeDigit() {
	const result = hexColor("#fff")
	assertEquals(result._tag, "Ok")
})

Deno.test("hexColor returns Ok for valid 6-digit hex colors", function testHexColorSixDigit() {
	const result = hexColor("#ff0000")
	assertEquals(result._tag, "Ok")
})

Deno.test("hexColor normalizes to lowercase", function testHexColorNormalization() {
	const result = hexColor("#ABC123")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "#abc123")
	}
})

Deno.test("hexColor returns Error for empty string", function testHexColorEmpty() {
	const result = hexColor("")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "HEX_COLOR_EMPTY")
	}
})

Deno.test("hexColor returns Error for invalid format", function testHexColorInvalidFormat() {
	const result = hexColor("#gg0000")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "HEX_COLOR_INVALID_FORMAT")
	}
})

Deno.test("hexColor returns Error for missing hash", function testHexColorMissingHash() {
	const result = hexColor("fff")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "HEX_COLOR_INVALID_FORMAT")
	}
})

Deno.test("hexColor returns Error for wrong length", function testHexColorWrongLength() {
	const result = hexColor("#ff00")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "HEX_COLOR_INVALID_FORMAT")
	}
})
