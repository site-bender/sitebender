import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import slice from "./index.ts"

//++ Tests for slice (extracts substring from start to end index)

//++ Basic slice tests

Deno.test("slice extracts middle of string", function testSliceMiddle() {
	const result = slice(3)(7)("Hello World")

	assertEquals(result, "lo W")
})

Deno.test("slice from start to middle", function testSliceFromStart() {
	const result = slice(0)(5)("Hello World")

	assertEquals(result, "Hello")
})

Deno.test("slice from middle to end", function testSliceToEnd() {
	const result = slice(6)(11)("Hello World")

	assertEquals(result, "World")
})

Deno.test("slice entire string", function testSliceEntire() {
	const result = slice(0)(11)("Hello World")

	assertEquals(result, "Hello World")
})

Deno.test("slice with negative start index", function testSliceNegativeStart() {
	const result = slice(-5)(-1)("Hello World")

	assertEquals(result, "Worl")
})

Deno.test("slice with negative end index", function testSliceNegativeEnd() {
	const result = slice(0)(-6)("Hello World")

	assertEquals(result, "Hello")
})

Deno.test("slice with start beyond length", function testSliceBeyondLength() {
	const result = slice(20)(25)("Hello")

	assertEquals(result, "")
})

Deno.test("slice with end beyond length", function testSliceEndBeyondLength() {
	const result = slice(3)(100)("Hello")

	assertEquals(result, "lo")
})

Deno.test("slice with start equals end", function testSliceStartEqualsEnd() {
	const result = slice(3)(3)("Hello")

	assertEquals(result, "")
})

Deno.test("slice with start greater than end", function testSliceStartGreaterThanEnd() {
	const result = slice(5)(2)("Hello")

	assertEquals(result, "")
})

Deno.test("slice empty string", function testSliceEmpty() {
	const result = slice(0)(5)("")

	assertEquals(result, "")
})

Deno.test("slice single character", function testSliceSingleChar() {
	const result = slice(0)(1)("A")

	assertEquals(result, "A")
})

Deno.test("slice with null returns empty string", function testSliceNull() {
	const result = slice(0)(5)(null)

	assertEquals(result, "")
})

Deno.test("slice with undefined returns empty string", function testSliceUndefined() {
	const result = slice(0)(5)(undefined)

	assertEquals(result, "")
})

Deno.test("slice unicode characters", function testSliceUnicode() {
	const result = slice(0)(3)("Hello 👋 World")

	assertEquals(result, "Hel")
})

Deno.test("slice with zero start", function testSliceZeroStart() {
	const result = slice(0)(3)("Hello")

	assertEquals(result, "Hel")
})

Deno.test("slice reusable function", function testSliceReusable() {
	const takeFirst3 = slice(0)(3)

	assertEquals(takeFirst3("Hello"), "Hel")
	assertEquals(takeFirst3("World"), "Wor")
	assertEquals(takeFirst3("Hi"), "Hi")
})

//++ Property-based tests

Deno.test("slice result length never exceeds input length", function testSliceLengthProperty() {
	fc.assert(
		fc.property(
			fc.string(),
			fc.integer({ min: 0, max: 50 }),
			fc.integer({ min: 0, max: 50 }),
			function propertySliceLength(
				str: string,
				start: number,
				end: number,
			) {
				const result = slice(start)(end)(str)
				assertEquals(result.length <= str.length, true)
			},
		),
	)
})

Deno.test("slice with 0 to length returns original", function testSliceIdentityProperty() {
	fc.assert(
		fc.property(fc.string(), function propertySliceIdentity(str: string) {
			const result = slice(0)(str.length)(str)
			assertEquals(result, str)
		}),
	)
})

Deno.test("slice always returns string type", function testSliceTypeProperty() {
	fc.assert(
		fc.property(
			fc.string(),
			fc.integer(),
			fc.integer(),
			function propertySliceType(str: string, start: number, end: number) {
				const result = slice(start)(end)(str)
				assertEquals(typeof result, "string")
			},
		),
	)
})

Deno.test("slice composition preserves substring", function testSliceComposition() {
	fc.assert(
		fc.property(
			fc.string({ minLength: 10 }),
			function propertySliceComposition(str: string) {
				// slice(0)(5) + slice(5)(length) should equal original
				const first = slice(0)(5)(str)
				const second = slice(5)(str.length)(str)
				assertEquals(first + second, str)
			},
		),
	)
})
