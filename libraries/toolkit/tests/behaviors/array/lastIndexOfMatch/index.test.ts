import { assertEquals } from "jsr:@std/assert@1.0.8"
import * as fc from "npm:fast-check@3"

import lastIndexOfMatch from "../../../../src/simple/array/lastIndexOfMatch/index.ts"

Deno.test("lastIndexOfMatch: finds last index of string matching pattern", () => {
	assertEquals(lastIndexOfMatch(/^h/)(["hi", "hello", "world", "hey"]), 3)
	assertEquals(lastIndexOfMatch("ell")(["hello", "bell", "well", "test"]), 2)
	assertEquals(lastIndexOfMatch(/\d+/)(["one", "2", "three", "4"]), 3)
})

Deno.test("lastIndexOfMatch: handles string patterns", () => {
	// String patterns are converted to RegExp (so they match substrings)
	assertEquals(lastIndexOfMatch("test")(["test", "testing", "test2"]), 2) // All contain "test"
	assertEquals(lastIndexOfMatch("foo")(["foo", "foobar", "barfoo"]), 2) // All contain "foo"
	assertEquals(lastIndexOfMatch("bar")(["foo", "bar", "foobar"]), 2) // "bar" and "foobar" match
})

Deno.test("lastIndexOfMatch: handles regex patterns", () => {
	// Start of string
	assertEquals(lastIndexOfMatch(/^start/)(["start", "starter", "restart"]), 1)

	// End of string
	assertEquals(lastIndexOfMatch(/end$/)(["end", "ending", "backend"]), 2)

	// Case insensitive
	assertEquals(
		lastIndexOfMatch(/error/i)(["info", "ERROR 1", "warning", "Error 2"]),
		3,
	)

	// Word boundaries
	assertEquals(
		lastIndexOfMatch(/\bcat\b/)(["cat", "catch", "the cat", "concatenate"]),
		2,
	)
})

Deno.test("lastIndexOfMatch: returns undefined when no match", () => {
	assertEquals(lastIndexOfMatch(/^z/)(["hi", "hello", "world"]), undefined)
	assertEquals(lastIndexOfMatch("xyz")(["abc", "def", "ghi"]), undefined)
	assertEquals(lastIndexOfMatch(/\d/)(["one", "two", "three"]), undefined)
})

Deno.test("lastIndexOfMatch: handles empty arrays", () => {
	assertEquals(lastIndexOfMatch(/test/)([]), undefined)
	assertEquals(lastIndexOfMatch("pattern")([]), undefined)
})

Deno.test("lastIndexOfMatch: handles null and undefined input", () => {
	assertEquals(lastIndexOfMatch(/test/)(null), undefined)
	assertEquals(lastIndexOfMatch(/test/)(undefined), undefined)
	assertEquals(lastIndexOfMatch("pattern")(null), undefined)
	assertEquals(lastIndexOfMatch("pattern")(undefined), undefined)
})

Deno.test("lastIndexOfMatch: finds last match with multiple matches", () => {
	const array = ["apple", "banana", "apricot", "avocado"]
	assertEquals(lastIndexOfMatch(/^a/)(array), 3)

	const numbers = ["1", "two", "3", "four", "5"]
	assertEquals(lastIndexOfMatch(/\d/)(numbers), 4)

	const emails = ["test@mail.com", "user@test.com", "admin@mail.com"]
	assertEquals(lastIndexOfMatch(/@mail\.com$/)(emails), 2)
})

Deno.test("lastIndexOfMatch: handles single element arrays", () => {
	assertEquals(lastIndexOfMatch(/test/)(["test"]), 0)
	assertEquals(lastIndexOfMatch(/test/)(["no match"]), undefined)
	assertEquals(lastIndexOfMatch("hello")(["hello"]), 0)
})

Deno.test("lastIndexOfMatch: handles special regex characters in string patterns", () => {
	// Special regex characters in string patterns are NOT escaped - they become regex
	// "." matches any character
	assertEquals(lastIndexOfMatch(".")(["", "a", "b"]), 2) // Matches any char

	// Invalid regex patterns will throw
	try {
		lastIndexOfMatch("*")(["a*", "b*", "c"])
		throw new Error("Should have thrown")
	} catch (e) {
		assertEquals(e instanceof SyntaxError, true)
	}

	// Parentheses create groups
	assertEquals(lastIndexOfMatch("(test)")(["(test)", "test", "(test)2"]), 2)
})

Deno.test("lastIndexOfMatch: handles complex patterns", () => {
	// Email pattern
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	assertEquals(
		lastIndexOfMatch(emailPattern)([
			"test",
			"user@example.com",
			"hello",
			"admin@test.org",
		]),
		3,
	)

	// URL pattern
	const urlPattern = /^https?:\/\//
	assertEquals(
		lastIndexOfMatch(urlPattern)([
			"http://example.com",
			"ftp://test.com",
			"https://secure.com",
		]),
		2,
	)

	// Phone pattern
	const phonePattern = /^\d{3}-\d{3}-\d{4}$/
	assertEquals(
		lastIndexOfMatch(phonePattern)(["123-456-7890", "invalid", "987-654-3210"]),
		2,
	)
})

Deno.test("lastIndexOfMatch: is properly curried", () => {
	const findLastError = lastIndexOfMatch(/error/i)
	assertEquals(findLastError(["info", "ERROR", "warning"]), 1)
	assertEquals(findLastError(["ok", "ERROR", "debug", "Error"]), 3)

	const findLastCapital = lastIndexOfMatch(/^[A-Z]/)
	assertEquals(findLastCapital(["hello", "World", "Test"]), 2)
	assertEquals(findLastCapital(["abc", "def"]), undefined)
})

Deno.test("lastIndexOfMatch: handles empty strings", () => {
	assertEquals(lastIndexOfMatch(/^$/)(["", "test", ""]), 2)
	assertEquals(lastIndexOfMatch("")(["test", "hello", "world"]), 2) // Empty pattern matches all
	assertEquals(lastIndexOfMatch(/./)(["", "a", ""]), 1) // . doesn't match empty
})

Deno.test("lastIndexOfMatch: handles whitespace patterns", () => {
	assertEquals(lastIndexOfMatch(/\s/)(["hello", "hello world", "test me"]), 2)
	assertEquals(lastIndexOfMatch(/^\s+$/)(["  ", "test", "   ", "hello"]), 2)
	assertEquals(lastIndexOfMatch(/\S/)(["", " ", "a", " "]), 2)
})

Deno.test("lastIndexOfMatch: handles unicode patterns", () => {
	// Emoji pattern (using specific emojis, not range)
	assertEquals(lastIndexOfMatch(/😀|😎/)(["hello", "😀", "world", "😎"]), 3)
	// Chinese characters
	assertEquals(
		lastIndexOfMatch(/[\u4e00-\u9fff]/)(["hello", "你", "world", "好"]),
		3,
	)
	// Greek letters
	assertEquals(lastIndexOfMatch(/[α-ω]/)(["alpha", "β", "gamma", "δ"]), 3)
})

Deno.test("lastIndexOfMatch: property-based testing", () => {
	// Returns undefined for empty arrays
	fc.assert(
		fc.property(
			fc.string(),
			(pattern) => {
				return lastIndexOfMatch(pattern)([]) === undefined
			},
		),
	)

	// Returns a valid index or undefined (for valid patterns)
	fc.assert(
		fc.property(
			fc.array(fc.string()),
			fc.string(),
			(arr, pattern) => {
				try {
					const result = lastIndexOfMatch(pattern)(arr)
					return result === undefined ||
						(typeof result === "number" && result >= 0 && result < arr.length)
				} catch (e) {
					// Invalid regex pattern - that's ok
					return e instanceof SyntaxError
				}
			},
		),
	)

	// If returns an index, that element matches the pattern
	fc.assert(
		fc.property(
			fc.array(fc.string(), { minLength: 1 }),
			fc.string(),
			(arr, pattern) => {
				try {
					const result = lastIndexOfMatch(pattern)(arr)
					if (result !== undefined) {
						const regex = new RegExp(pattern)
						return regex.test(arr[result])
					}
					return true
				} catch (e) {
					return e instanceof SyntaxError
				}
			},
		),
	)

	// No element after the returned index matches
	fc.assert(
		fc.property(
			fc.array(fc.string(), { minLength: 1 }),
			fc.string(),
			(arr, pattern) => {
				try {
					const result = lastIndexOfMatch(pattern)(arr)
					if (result !== undefined) {
						const regex = new RegExp(pattern)
						// Check no elements after this index match
						for (let i = result + 1; i < arr.length; i++) {
							if (regex.test(arr[i])) return false
						}
					}
					return true
				} catch (e) {
					return e instanceof SyntaxError
				}
			},
		),
	)
})

Deno.test("lastIndexOfMatch: returns last match not first", () => {
	// Multiple identical matches
	assertEquals(lastIndexOfMatch("test")(["test", "test", "test"]), 2)

	// Pattern appears multiple times
	assertEquals(lastIndexOfMatch(/^a/)(["a", "b", "a", "c", "a"]), 4)

	// Complex pattern with multiple matches
	assertEquals(
		lastIndexOfMatch(/\d{2}/)(["10", "hello", "20", "world", "30"]),
		4,
	)
})

Deno.test("lastIndexOfMatch: handles arrays with non-string elements gracefully", () => {
	// TypeScript will prevent this, but let's test runtime behavior
	const mixedArray = ["hello", 123, "world", true] as unknown as string[]

	// Numbers and booleans will be converted to strings by regex.test()
	assertEquals(lastIndexOfMatch(/\d/)(mixedArray), 1) // 123 becomes "123"
	assertEquals(lastIndexOfMatch(/true/)(mixedArray), 3) // true becomes "true"
})

Deno.test("lastIndexOfMatch: large arrays performance", () => {
	const largeArray = Array.from(
		{ length: 10000 },
		(_, i) => i % 100 === 0 ? `match${i}` : `nomatch${i}`,
	)

	const result = lastIndexOfMatch(/^match/)(largeArray)
	assertEquals(result, 9900) // Last element matching "match"
})

Deno.test("lastIndexOfMatch: regex flags are preserved", () => {
	// Case insensitive flag
	assertEquals(lastIndexOfMatch(/TEST/i)(["test", "Test", "TEST"]), 2)

	// Global flag doesn't affect the behavior (each test is independent)
	assertEquals(lastIndexOfMatch(/test/g)(["test", "testing", "test"]), 2)

	// Multiline flag
	const multilineArray = ["line1", "line2\nstart", "start of line3"]
	assertEquals(lastIndexOfMatch(/^start/m)(multilineArray), 2)
})
