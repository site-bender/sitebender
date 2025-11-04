import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import startsWith from "./index.ts"

//++ Tests for startsWith (checks if string starts with search string)

//++ Basic startsWith tests

Deno.test("startsWith returns true when string starts with search", function testStartsWithTrue() {
	const result = startsWith("Hello")("Hello World")

	assertEquals(result, true)
})

Deno.test("startsWith returns false when string does not start with search", function testStartsWithFalse() {
	const result = startsWith("World")("Hello World")

	assertEquals(result, false)
})

Deno.test("startsWith with empty search string", function testStartsWithEmpty() {
	const result = startsWith("")("Hello World")

	assertEquals(result, true) // Empty string is always at the start
})

Deno.test("startsWith with empty target string", function testStartsWithEmptyTarget() {
	const result = startsWith("Hello")("")

	assertEquals(result, false)
})

Deno.test("startsWith with identical strings", function testStartsWithIdentical() {
	const result = startsWith("Hello")("Hello")

	assertEquals(result, true)
})

Deno.test("startsWith case sensitive", function testStartsWithCaseSensitive() {
	const result = startsWith("hello")("Hello World")

	assertEquals(result, false)
})

Deno.test("startsWith with single character", function testStartsWithSingleChar() {
	const result = startsWith("H")("Hello World")

	assertEquals(result, true)
})

Deno.test("startsWith with search longer than string", function testStartsWithLongerSearch() {
	const result = startsWith("Hello World!")("Hello")

	assertEquals(result, false)
})

Deno.test("startsWith with whitespace", function testStartsWithWhitespace() {
	const result = startsWith(" ")(" Hello")

	assertEquals(result, true)
})

Deno.test("startsWith with unicode characters", function testStartsWithUnicode() {
	const result = startsWith("👋")("👋 Hello")

	assertEquals(result, true)
})

Deno.test("startsWith reusable function", function testStartsWithReusable() {
	const startsWithHello = startsWith("Hello")

	assertEquals(startsWithHello("Hello World"), true)
	assertEquals(startsWithHello("Hello Universe"), true)
	assertEquals(startsWithHello("Goodbye World"), false)
})

//++ Property-based tests

Deno.test("startsWith with string and itself returns true", function testStartsWithSelfProperty() {
	fc.assert(
		fc.property(fc.string(), function propertyStartsWithSelf(str: string) {
			const result = startsWith(str)(str)
			assertEquals(result, true)
		}),
	)
})

Deno.test("startsWith with empty string always returns true", function testStartsWithEmptyProperty() {
	fc.assert(
		fc.property(fc.string(), function propertyStartsWithEmpty(str: string) {
			const result = startsWith("")(str)
			assertEquals(result, true)
		}),
	)
})

Deno.test("startsWith is transitive for prefixes", function testStartsWithTransitive() {
	fc.assert(
		fc.property(
			fc.string({ minLength: 3 }),
			function propertyStartsWithTransitive(str: string) {
				const prefix1 = str.slice(0, 1)
				const prefix2 = str.slice(0, 2)

				// If str starts with prefix2, and prefix2 starts with prefix1,
				// then str starts with prefix1
				if (startsWith(prefix2)(str) && startsWith(prefix1)(prefix2)) {
					assertEquals(startsWith(prefix1)(str), true)
				}
			},
		),
	)
})

Deno.test("startsWith always returns boolean", function testStartsWithTypeProperty() {
	fc.assert(
		fc.property(
			fc.string(),
			fc.string(),
			function propertyStartsWithType(search: string, str: string) {
				const result = startsWith(search)(str)
				assertEquals(typeof result, "boolean")
			},
		),
	)
})
