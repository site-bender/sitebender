import { assertEquals } from "@std/assert"
import p3Color from "@sitebender/toolsmith/newtypes/stringTypes/p3Color/index.ts"

Deno.test("p3Color returns Ok for valid decimal format", function testP3ColorDecimal() {
	const result = p3Color("color(display-p3 1 0 0)")
	assertEquals(result._tag, "Ok")
})

Deno.test("p3Color returns Ok for valid percentage format", function testP3ColorPercentage() {
	const result = p3Color("color(display-p3 100% 0% 0%)")
	assertEquals(result._tag, "Ok")
})

Deno.test("p3Color returns Ok with alpha", function testP3ColorWithAlpha() {
	const result = p3Color("color(display-p3 1 0 0 / 0.8)")
	assertEquals(result._tag, "Ok")
})

Deno.test("p3Color normalizes to lowercase", function testP3ColorNormalization() {
	const result = p3Color("COLOR(DISPLAY-P3 1 0 0)")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "color(display-p3 1 0 0)")
	}
})

Deno.test("p3Color returns Error for empty string", function testP3ColorEmpty() {
	const result = p3Color("")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "P3_COLOR_EMPTY")
	}
})

Deno.test("p3Color returns Error for invalid format", function testP3ColorInvalidFormat() {
	const result = p3Color("rgb(255, 0, 0)")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "P3_COLOR_INVALID_FORMAT")
	}
})

Deno.test("p3Color returns Error for red > 1", function testP3ColorRedHigh() {
	const result = p3Color("color(display-p3 1.5 0 0)")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "P3_COLOR_INVALID_RED")
	}
})

Deno.test("p3Color returns Error for green > 1", function testP3ColorGreenHigh() {
	const result = p3Color("color(display-p3 1 1.5 0)")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "P3_COLOR_INVALID_GREEN")
	}
})

Deno.test("p3Color returns Error for blue > 1", function testP3ColorBlueHigh() {
	const result = p3Color("color(display-p3 1 0 1.5)")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "P3_COLOR_INVALID_BLUE")
	}
})

Deno.test("p3Color returns Error for alpha > 1", function testP3ColorAlphaHigh() {
	const result = p3Color("color(display-p3 1 0 0 / 1.5)")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "P3_COLOR_INVALID_ALPHA")
	}
})
