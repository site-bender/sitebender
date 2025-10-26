import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import includes from "./index.ts"

Deno.test("includes", async function includesTests(t) {
	await t.step(
		"returns true when substring is found",
		function returnsTrueWhenFound() {
			const result = includes("hello world")("world")

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns false when substring is not found",
		function returnsFalseWhenNotFound() {
			const result = includes("hello world")("goodbye")

			assertEquals(result, false)
		},
	)

	await t.step(
		"returns true for empty substring",
		function returnsTrueForEmptySubstring() {
			const result = includes("hello")("")

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns true for identical strings",
		function returnsTrueForIdentical() {
			const result = includes("hello")("hello")

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns false for empty string with non-empty substring",
		function returnsFalseForEmptyString() {
			const result = includes("")("hello")

			assertEquals(result, false)
		},
	)

	await t.step(
		"is case sensitive",
		function isCaseSensitive() {
			const result1 = includes("Hello World")("world")
			const result2 = includes("Hello World")("World")

			assertEquals(result1, false)
			assertEquals(result2, true)
		},
	)

	await t.step(
		"handles special characters",
		function handlesSpecialCharacters() {
			const result = includes("hello@world.com")("@world")

			assertEquals(result, true)
		},
	)

	await t.step(
		"handles unicode characters",
		function handlesUnicode() {
			const result = includes("hello 🌍 world")("🌍")

			assertEquals(result, true)
		},
	)

	await t.step(
		"is properly curried",
		function properlyCurried() {
			const stringIncludes = includes("the quick brown fox")

			assertEquals(stringIncludes("quick"), true)
			assertEquals(stringIncludes("brown"), true)
			assertEquals(stringIncludes("lazy"), false)
		},
	)

	await t.step(
		"handles whitespace",
		function handlesWhitespace() {
			const result1 = includes("hello world")(" ")
			const result2 = includes("hello\nworld")("\n")
			const result3 = includes("hello\tworld")("\t")

			assertEquals(result1, true)
			assertEquals(result2, true)
			assertEquals(result3, true)
		},
	)
})

Deno.test("includes - property: substring of string returns true", function substringReturnsTrue() {
	fc.assert(
		fc.property(
			fc.string(),
			fc.nat(),
			fc.nat(),
			function propertySubstringFound(str, start, length) {
				if (str.length === 0) return

				const safeStart = start % str.length
				const safeLength = Math.min(length, str.length - safeStart)
				const substring = str.substring(safeStart, safeStart + safeLength)

				const result = includes(str)(substring)

				assertEquals(result, true)
			},
		),
	)
})

Deno.test("includes - property: always returns boolean", function alwaysReturnsBoolean() {
	fc.assert(
		fc.property(
			fc.string(),
			fc.string(),
			function propertyReturnsBoolean(str, substring) {
				const result = includes(str)(substring)

				assertEquals(typeof result, "boolean")
			},
		),
	)
})

Deno.test("includes - property: empty substring always returns true", function emptySubstringReturnsTrue() {
	fc.assert(
		fc.property(
			fc.string(),
			function propertyEmptySubstring(str) {
				const result = includes(str)("")

				assertEquals(result, true)
			},
		),
	)
})

Deno.test("includes - property: curried partial application works", function curriedPartialWorks() {
	fc.assert(
		fc.property(
			fc.string(),
			fc.string(),
			fc.string(),
			function propertyCurriedWorks(str, sub1, sub2) {
				const stringIncludes = includes(str)
				const result1 = stringIncludes(sub1)
				const result2 = stringIncludes(sub2)

				assertEquals(result1, str.includes(sub1))
				assertEquals(result2, str.includes(sub2))
			},
		),
	)
})
