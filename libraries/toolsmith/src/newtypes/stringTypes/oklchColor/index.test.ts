import { assertEquals } from "@std/assert"
import oklchColor from "@sitebender/toolsmith/newtypes/stringTypes/oklchColor/index.ts"

Deno.test("oklchColor returns Ok for valid decimal format", function testOklchColorDecimal() {
	const result = oklchColor("oklch(0.5 0.1 120)")
	assertEquals(result._tag, "Ok")
})

Deno.test("oklchColor returns Ok for valid percentage lightness", function testOklchColorPercentage() {
	const result = oklchColor("oklch(50% 0.1 120)")
	assertEquals(result._tag, "Ok")
})

Deno.test("oklchColor returns Ok with alpha", function testOklchColorWithAlpha() {
	const result = oklchColor("oklch(0.5 0.1 120 / 0.8)")
	assertEquals(result._tag, "Ok")
})

Deno.test("oklchColor normalizes to lowercase", function testOklchColorNormalization() {
	const result = oklchColor("OKLCH(0.5 0.1 120)")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "oklch(0.5 0.1 120)")
	}
})

Deno.test("oklchColor returns Error for empty string", function testOklchColorEmpty() {
	const result = oklchColor("")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "OKLCH_COLOR_EMPTY")
	}
})

Deno.test("oklchColor returns Error for invalid format", function testOklchColorInvalidFormat() {
	const result = oklchColor("rgb(255, 0, 0)")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "OKLCH_COLOR_INVALID_FORMAT")
	}
})

Deno.test("oklchColor returns Error for lightness > 1", function testOklchColorLightnessHigh() {
	const result = oklchColor("oklch(1.5 0.1 120)")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "OKLCH_COLOR_INVALID_LIGHTNESS")
	}
})

Deno.test("oklchColor returns Error for negative chroma", function testOklchColorChromaNegative() {
	const result = oklchColor("oklch(0.5 -0.1 120)")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "OKLCH_COLOR_INVALID_CHROMA")
	}
})

Deno.test("oklchColor returns Error for hue > 360", function testOklchColorHueHigh() {
	const result = oklchColor("oklch(0.5 0.1 400)")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "OKLCH_COLOR_INVALID_HUE")
	}
})

Deno.test("oklchColor returns Error for alpha > 1", function testOklchColorAlphaHigh() {
	const result = oklchColor("oklch(0.5 0.1 120 / 1.5)")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "OKLCH_COLOR_INVALID_ALPHA")
	}
})
