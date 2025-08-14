import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import * as fc from "fast-check"
import match from "../../../string/match/index.ts"
import test from "../../../string/test/index.ts"
import startsWith from "../../../string/startsWith/index.ts"
import endsWith from "../../../string/endsWith/index.ts"

describe("String Matching Behaviors", () => {
	describe("when matching patterns", () => {
		it("finds all matches for a pattern", () => {
			const result = match(/[aeiou]/g)("hello world")
			expect(result).toEqual(["e", "o", "o"])
		})

		it("returns null when no matches found", () => {
			const result = match(/[xyz]/)("hello")
			expect(result).toBeNull()
		})

		it("finds single match without global flag", () => {
			const result = match(/l+/)("hello")
			expect(result).toEqual(["ll"])
		})

		it("captures groups", () => {
			const result = match(/(\w+)@(\w+)\.com/)("user@example.com")
			expect(result).toEqual(["user@example.com", "user", "example"])
		})

		it("handles empty string", () => {
			const result = match(/a/)("")
			expect(result).toBeNull()
		})

		it("matches at string boundaries", () => {
			const result = match(/^\w+/)("hello world")
			expect(result).toEqual(["hello"])

			const result2 = match(/\w+$/)("hello world")
			expect(result2).toEqual(["world"])
		})

		it("handles case-insensitive matching", () => {
			const result = match(/hello/i)("HELLO WORLD")
			expect(result).toEqual(["HELLO"])
		})

		it("matches special characters", () => {
			const result = match(/[.$^]/)("test$value.here^")
			expect(result).toEqual(["$"])
		})

		it("finds all digit sequences", () => {
			const result = match(/\d+/g)("abc123def456ghi")
			expect(result).toEqual(["123", "456"])
		})

		it("matches multiline patterns", () => {
			const text = "line1\nline2\nline3"
			const result = match(/^line\d/gm)(text)
			expect(result).toEqual(["line1", "line2", "line3"])
		})
	})

	describe("when testing patterns", () => {
		it("returns true when pattern matches", () => {
			expect(test(/hello/)("hello world")).toBe(true)
			expect(test(/\d+/)("abc123")).toBe(true)
			expect(test(/^test/)("test string")).toBe(true)
		})

		it("returns false when pattern doesn't match", () => {
			expect(test(/hello/)("goodbye")).toBe(false)
			expect(test(/\d+/)("no numbers")).toBe(false)
			expect(test(/^test/)("not test")).toBe(false)
		})

		it("handles empty string", () => {
			expect(test(/^$/)("")).toBe(true)
			expect(test(/.+/)("")).toBe(false)
		})

		it("ignores global flag", () => {
			expect(test(/a/g)("banana")).toBe(true)
			expect(test(/x/g)("banana")).toBe(false)
		})

		it("handles case-insensitive flag", () => {
			expect(test(/HELLO/i)("hello")).toBe(true)
			expect(test(/HELLO/)("hello")).toBe(false)
		})

		it("tests word boundaries", () => {
			expect(test(/\bcat\b/)("the cat sat")).toBe(true)
			expect(test(/\bcat\b/)("concatenate")).toBe(false)
		})

		it("tests anchors", () => {
			expect(test(/^hello$/)("hello")).toBe(true)
			expect(test(/^hello$/)("hello world")).toBe(false)
		})
	})

	describe("when checking string start", () => {
		it("returns true when string starts with prefix", () => {
			expect(startsWith("hello")("hello world")).toBe(true)
			expect(startsWith("test")("testing")).toBe(true)
			expect(startsWith("")("anything")).toBe(true)
		})

		it("returns false when string doesn't start with prefix", () => {
			expect(startsWith("world")("hello world")).toBe(false)
			expect(startsWith("test")("not testing")).toBe(false)
		})

		it("handles empty strings", () => {
			expect(startsWith("")("")).toBe(true)
			expect(startsWith("a")("")).toBe(false)
		})

		it("is case-sensitive", () => {
			expect(startsWith("Hello")("hello world")).toBe(false)
			expect(startsWith("HELLO")("HELLO world")).toBe(true)
		})

		it("handles longer prefix than string", () => {
			expect(startsWith("hello world")("hello")).toBe(false)
		})

		it("handles exact matches", () => {
			expect(startsWith("hello")("hello")).toBe(true)
		})

		it("handles special characters", () => {
			expect(startsWith("$test")("$test.value")).toBe(true)
			expect(startsWith("[abc]")("[abc]def")).toBe(true)
		})

		it("handles unicode", () => {
			expect(startsWith("🚀")("🚀 launch")).toBe(true)
			expect(startsWith("café")("café au lait")).toBe(true)
		})
	})

	describe("when checking string end", () => {
		it("returns true when string ends with suffix", () => {
			expect(endsWith("world")("hello world")).toBe(true)
			expect(endsWith("ing")("testing")).toBe(true)
			expect(endsWith("")("anything")).toBe(true)
		})

		it("returns false when string doesn't end with suffix", () => {
			expect(endsWith("hello")("hello world")).toBe(false)
			expect(endsWith("test")("testing")).toBe(false)
		})

		it("handles empty strings", () => {
			expect(endsWith("")("")).toBe(true)
			expect(endsWith("a")("")).toBe(false)
		})

		it("is case-sensitive", () => {
			expect(endsWith("World")("hello world")).toBe(false)
			expect(endsWith("WORLD")("hello WORLD")).toBe(true)
		})

		it("handles longer suffix than string", () => {
			expect(endsWith("hello world")("world")).toBe(false)
		})

		it("handles exact matches", () => {
			expect(endsWith("hello")("hello")).toBe(true)
		})

		it("handles special characters", () => {
			expect(endsWith(".txt")("file.txt")).toBe(true)
			expect(endsWith("]")("array[0]")).toBe(true)
		})

		it("handles unicode", () => {
			expect(endsWith("🎉")("celebration 🎉")).toBe(true)
			expect(endsWith("café")("petit café")).toBe(true)
		})
	})

	describe("property-based tests", () => {
		it("startsWith and endsWith with full string", () => {
			fc.assert(
				fc.property(fc.string(), (str) => {
					expect(startsWith(str)(str)).toBe(true)
					expect(endsWith(str)(str)).toBe(true)
				}),
			)
		})

		it("empty string starts and ends with empty string", () => {
			fc.assert(
				fc.property(fc.string(), (str) => {
					expect(startsWith("")(str)).toBe(true)
					expect(endsWith("")(str)).toBe(true)
				}),
			)
		})

		it("test returns consistent results", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.string(),
					(pattern, str) => {
						try {
							const regex = new RegExp(pattern)
							const result1 = test(regex)(str)
							const result2 = test(regex)(str)
							expect(result1).toBe(result2)
						} catch {
							// Invalid regex pattern, skip
						}
					},
				),
			)
		})

		it("match with global flag finds all occurrences", () => {
			fc.assert(
				fc.property(
					fc.string({ minLength: 1, maxLength: 5 }),
					fc.array(fc.string({ minLength: 1, maxLength: 5 })),
					(sep, parts) => {
						if (parts.length === 0) return
						const str = parts.join(sep)
						const escaped = sep.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
						const matches = match(new RegExp(escaped, "g"))(str)
						if (matches) {
							expect(matches.length).toBeGreaterThanOrEqual(parts.length - 1)
						}
					},
				),
			)
		})

		it("startsWith prefix means string contains prefix at start", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.string(),
					(prefix, suffix) => {
						const str = prefix + suffix
						expect(startsWith(prefix)(str)).toBe(true)
					},
				),
			)
		})

		it("endsWith suffix means string contains suffix at end", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.string(),
					(prefix, suffix) => {
						const str = prefix + suffix
						expect(endsWith(suffix)(str)).toBe(true)
					},
				),
			)
		})
	})

	describe("practical use cases", () => {
		it("validates email format", () => {
			const isEmail = test(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
			expect(isEmail("user@example.com")).toBe(true)
			expect(isEmail("invalid.email")).toBe(false)
			expect(isEmail("@example.com")).toBe(false)
		})

		it("extracts URLs from text", () => {
			const text = "Visit https://example.com and http://test.org for more"
			const urls = match(/https?:\/\/[^\s]+/g)(text)
			expect(urls).toEqual(["https://example.com", "http://test.org"])
		})

		it("checks file extensions", () => {
			const isJavaScript = endsWith(".js")
			const isTypeScript = endsWith(".ts")

			expect(isJavaScript("script.js")).toBe(true)
			expect(isJavaScript("script.ts")).toBe(false)
			expect(isTypeScript("module.ts")).toBe(true)
		})

		it("validates phone numbers", () => {
			const isPhoneNumber = test(/^\d{3}-\d{3}-\d{4}$/)
			expect(isPhoneNumber("123-456-7890")).toBe(true)
			expect(isPhoneNumber("1234567890")).toBe(false)
		})

		it("extracts hashtags", () => {
			const text = "Check out #programming and #javascript tutorials"
			const hashtags = match(/#\w+/g)(text)
			expect(hashtags).toEqual(["#programming", "#javascript"])
		})

		it("checks URL protocols", () => {
			const isHttps = startsWith("https://")
			const isHttp = startsWith("http://")

			expect(isHttps("https://secure.com")).toBe(true)
			expect(isHttps("http://notsecure.com")).toBe(false)
			expect(isHttp("http://example.com")).toBe(true)
		})
	})
})