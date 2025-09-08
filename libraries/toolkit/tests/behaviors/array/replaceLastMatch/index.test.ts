import { assertEquals } from "jsr:@std/assert@1"
import { assertType, type IsExact } from "jsr:@std/testing@1/types"
import * as fc from "npm:fast-check@3"

import replaceLastMatch from "../../../../src/simple/array/replaceLastMatch/index.ts"

Deno.test("replaceLastMatch: replaces last string matching regex pattern", () => {
	const array = ["hello", "hi", "world", "hey"]
	const result = replaceLastMatch(/^h/)((s) => s.toUpperCase())(array)
	assertEquals(result, ["hello", "hi", "world", "HEY"])
})

Deno.test("replaceLastMatch: replaces last match with string pattern", () => {
	const array = ["abc", "def", "abc", "ghi"]
	const result = replaceLastMatch("abc")(() => "found")(array)
	assertEquals(result, ["abc", "def", "found", "ghi"])
})

Deno.test("replaceLastMatch: returns original array when no match", () => {
	const array = ["one", "two", "three"]
	const result = replaceLastMatch(/^z/)((s) => s.toUpperCase())(array)
	assertEquals(result, ["one", "two", "three"])
})

Deno.test("replaceLastMatch: handles empty array", () => {
	const array: string[] = []
	const result = replaceLastMatch(/test/)(() => "replaced")(array)
	assertEquals(result, [])
})

Deno.test("replaceLastMatch: handles null input", () => {
	const result = replaceLastMatch(/test/)(() => "replaced")(null)
	assertEquals(result, [])
})

Deno.test("replaceLastMatch: handles undefined input", () => {
	const result = replaceLastMatch(/test/)(() => "replaced")(undefined)
	assertEquals(result, [])
})

Deno.test("replaceLastMatch: handles single element array when matching", () => {
	const array = ["hello"]
	const result = replaceLastMatch(/^h/)((s) => s.toUpperCase())(array)
	assertEquals(result, ["HELLO"])
})

Deno.test("replaceLastMatch: handles single element array when not matching", () => {
	const array = ["hello"]
	const result = replaceLastMatch(/^z/)((s) => s.toUpperCase())(array)
	assertEquals(result, ["hello"])
})

Deno.test("replaceLastMatch: replaces only last occurrence", () => {
	const array = ["test1", "other", "test2", "more", "test3"]
	const result = replaceLastMatch(/test/)(() => "replaced")(array)
	assertEquals(result, ["test1", "other", "test2", "more", "replaced"])
})

Deno.test("replaceLastMatch: works with complex regex patterns", () => {
	const array = ["foo123", "bar", "baz456", "qux789"]
	const result = replaceLastMatch(/\d+$/)((s) => s + "!")(array)
	assertEquals(result, ["foo123", "bar", "baz456", "qux789!"])
})

Deno.test("replaceLastMatch: handles case-insensitive flag", () => {
	const array = ["HELLO", "world", "HeLLo"]
	const result = replaceLastMatch(/hello/i)(() => "found")(array)
	assertEquals(result, ["HELLO", "world", "found"])
})

Deno.test("replaceLastMatch: string patterns don't escape special chars", () => {
	const array = ["a.b", "c*d", "e.f"]
	// The dot matches any character, not just a literal dot
	const result = replaceLastMatch("e.f")(() => "matched")(array)
	assertEquals(result, ["a.b", "c*d", "matched"])
})

Deno.test("replaceLastMatch: handles mixed-type arrays", () => {
	const array = ["text", 123, "456", true, "789"]
	const result = replaceLastMatch(/\d+/)(() => "NUMBER")(array as any[])
	// 789 is the last string that matches digits
	assertEquals(result, ["text", 123, "456", true, "NUMBER"])
})

Deno.test("replaceLastMatch: converts non-strings to strings for testing", () => {
	const array = [100, 200, 300]
	const result = replaceLastMatch(/00$/)((n) => 999)(array)
	// 300 ends with "00", so it gets replaced
	assertEquals(result, [100, 200, 999])
})

Deno.test("replaceLastMatch: replacer receives original value type", () => {
	const array = [1, 2, 3, 4]
	const result = replaceLastMatch(/[34]/)((n) => n * 10)(array)
	assertEquals(result, [1, 2, 3, 40])
})

Deno.test("replaceLastMatch: preserves array immutability", () => {
	const array = ["a", "b", "c"]
	const result = replaceLastMatch(/b/)(() => "B")(array)
	assertEquals(array, ["a", "b", "c"]) // Original unchanged
	assertEquals(result, ["a", "B", "c"]) // New array
})

Deno.test("replaceLastMatch: is properly curried", () => {
	const replaceDigits = replaceLastMatch(/\d+/)
	const toStars = replaceDigits(() => "***")

	assertEquals(toStars(["a1", "b2", "c3"]), ["a1", "b2", "***"])
	assertEquals(toStars(["x", "y", "z"]), ["x", "y", "z"])
})

Deno.test("replaceLastMatch: handles null and undefined in array", () => {
	const array = ["a", null, "b", undefined, "c"]
	const result = replaceLastMatch(/null|undefined/)(() => "REPLACED")(
		array as any[],
	)
	// undefined converts to "undefined" string and matches
	assertEquals(result, ["a", null, "b", "REPLACED", "c"])
})

Deno.test("replaceLastMatch: handles special regex characters in string pattern", () => {
	const array = ["(test)", "[test]", "{test}"]
	// Parentheses are treated as regex grouping, not literal
	const result = replaceLastMatch("(test)")(() => "matched")(array)
	assertEquals(result, ["(test)", "[test]", "matched"])
})

Deno.test("replaceLastMatch: handles empty string matches", () => {
	const array = ["", "a", "", "b"]
	const result = replaceLastMatch(/^$/)(() => "EMPTY")(array)
	assertEquals(result, ["", "a", "EMPTY", "b"])
})

// Type tests
Deno.test("replaceLastMatch: type inference", () => {
	const strArray = ["a", "b", "c"]
	const strResult = replaceLastMatch(/b/)((s) => s.toUpperCase())(strArray)
	assertType<IsExact<typeof strResult, string[]>>(true)

	const numArray = [1, 2, 3]
	const numResult = replaceLastMatch(/2/)((n) => n * 10)(numArray)
	assertType<IsExact<typeof numResult, number[]>>(true)
})

// Property-based tests
Deno.test("replaceLastMatch: property - replaces at most one element", () => {
	fc.assert(
		fc.property(
			fc.array(fc.string()),
			fc.string({ minLength: 1 }),
			(array, pattern) => {
				try {
					const result = replaceLastMatch(pattern)(() => "REPLACED")(
						array,
					)
					const replacedCount = result.filter((x) => x === "REPLACED").length
					return replacedCount <= 1
				} catch {
					// Invalid regex pattern, skip
					return true
				}
			},
		),
	)
})

Deno.test("replaceLastMatch: property - maintains array length", () => {
	fc.assert(
		fc.property(
			fc.array(fc.oneof(fc.string(), fc.integer())),
			(array) => {
				const result = replaceLastMatch(/\d+/)(() => "NUM")(array)
				return result.length === array.length
			},
		),
	)
})

Deno.test("replaceLastMatch: property - elements before last match unchanged", () => {
	fc.assert(
		fc.property(
			fc.array(fc.string({ minLength: 1, maxLength: 5 })),
			(array) => {
				if (array.length === 0) return true

				const result = replaceLastMatch(/./)(() => "X")(array)
				const lastMatchIndex = array.map((s, i) => s.length > 0 ? i : -1)
					.filter((i) => i >= 0)
					.pop()

				if (lastMatchIndex === undefined) return true

				// Check elements before last match are unchanged
				for (let i = 0; i < lastMatchIndex; i++) {
					if (result[i] !== array[i]) return false
				}
				return true
			},
		),
	)
})

Deno.test("replaceLastMatch: property - replacer called with correct value", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: 0, max: 999 })),
			(array) => {
				let capturedValue: any = undefined
				let callCount = 0

				replaceLastMatch(/\d/)((val) => {
					capturedValue = val
					callCount++
					return val
				})(array)

				const hasMatch = array.some((n) => /\d/.test(String(n)))

				if (hasMatch) {
					// Should be called exactly once with the last matching value
					if (callCount !== 1) return false
					const lastMatch = array.filter((n) => /\d/.test(String(n)))
						.pop()
					return capturedValue === lastMatch
				} else {
					// Should not be called if no match
					return callCount === 0 && capturedValue === undefined
				}
			},
		),
	)
})
