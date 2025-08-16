import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import * as fc from "fast-check"
import words from "../../unsafe/string/words/index.ts"

describe("words", () => {
	describe("camelCase and PascalCase", () => {
		it("splits camelCase correctly", () => {
			expect(words("camelCase")).toEqual(["camel", "Case"])
			expect(words("firstName")).toEqual(["first", "Name"])
			expect(words("getElementById")).toEqual(["get", "Element", "By", "Id"])
		})

		it("splits PascalCase correctly", () => {
			expect(words("PascalCase")).toEqual(["Pascal", "Case"])
			expect(words("FirstName")).toEqual(["First", "Name"])
			expect(words("GetElementById")).toEqual(["Get", "Element", "By", "Id"])
		})

		it("handles consecutive capitals as acronyms", () => {
			expect(words("IOError")).toEqual(["IO", "Error"])
			expect(words("XMLHttpRequest")).toEqual(["XML", "Http", "Request"])
			expect(words("HTTPSConnection")).toEqual(["HTTPS", "Connection"])
			expect(words("USA")).toEqual(["USA"])
		})
	})

	describe("snake_case and kebab-case", () => {
		it("splits snake_case", () => {
			expect(words("snake_case")).toEqual(["snake", "case"])
			expect(words("snake_case_example")).toEqual(["snake", "case", "example"])
			expect(words("SCREAMING_SNAKE")).toEqual(["SCREAMING", "SNAKE"])
		})

		it("splits kebab-case", () => {
			expect(words("kebab-case")).toEqual(["kebab", "case"])
			expect(words("kebab-case-example")).toEqual(["kebab", "case", "example"])
		})

		it("handles multiple separators", () => {
			expect(words("multiple__underscores")).toEqual(["multiple", "underscores"])
			expect(words("multiple--hyphens")).toEqual(["multiple", "hyphens"])
			expect(words("multiple   spaces")).toEqual(["multiple", "spaces"])
		})
	})

	describe("mixed formats", () => {
		it("handles mixed separators", () => {
			expect(words("mixed-case_string")).toEqual(["mixed", "case", "string"])
			expect(words("one two-three_four")).toEqual(["one", "two", "three", "four"])
		})

		it("handles camelCase with underscores", () => {
			expect(words("getData_fromAPI")).toEqual(["get", "Data", "from", "API"])
			expect(words("user_firstName")).toEqual(["user", "first", "Name"])
		})

		it("handles complex real-world examples", () => {
			expect(words("parseHTMLFromURL")).toEqual(["parse", "HTML", "From", "URL"])
			expect(words("iOS_AppStore-v2.1")).toEqual(["i", "OS", "App", "Store", "v", "2", "1"])
			expect(words("__private_method")).toEqual(["private", "method"])
		})
	})

	describe("numbers", () => {
		it("separates numbers from letters", () => {
			expect(words("version2")).toEqual(["version", "2"])
			expect(words("2version")).toEqual(["2", "version"])
			expect(words("HTML5")).toEqual(["HTML", "5"])
			expect(words("5HTML")).toEqual(["5", "HTML"])
		})

		it("handles multiple numbers", () => {
			expect(words("version2.0")).toEqual(["version", "2", "0"])
			expect(words("test123abc456")).toEqual(["test", "123", "abc", "456"])
		})

		it("keeps consecutive numbers together", () => {
			expect(words("123")).toEqual(["123"])
			expect(words("test123")).toEqual(["test", "123"])
			expect(words("123test")).toEqual(["123", "test"])
		})
	})

	describe("regular sentences", () => {
		it("splits on spaces", () => {
			expect(words("Hello world")).toEqual(["Hello", "world"])
			expect(words("This is a test")).toEqual(["This", "is", "a", "test"])
		})

		it("handles punctuation", () => {
			expect(words("Hello, world!")).toEqual(["Hello", "world"])
			expect(words("It's a test")).toEqual(["It", "s", "a", "test"])
			expect(words("foo.bar.baz")).toEqual(["foo", "bar", "baz"])
		})

		it("removes non-alphanumeric characters", () => {
			expect(words("@#$%")).toEqual([])
			expect(words("test!@#")).toEqual(["test"])
			expect(words("!!!word!!!")).toEqual(["word"])
		})
	})

	describe("edge cases", () => {
		it("handles empty string", () => {
			expect(words("")).toEqual([])
		})

		it("handles whitespace only", () => {
			expect(words("   ")).toEqual([])
			expect(words("\t\n")).toEqual([])
		})

		it("handles null and undefined", () => {
			expect(words(null)).toEqual([])
			expect(words(undefined)).toEqual([])
		})

		it("handles single character", () => {
			expect(words("a")).toEqual(["a"])
			expect(words("A")).toEqual(["A"])
			expect(words("1")).toEqual(["1"])
		})

		it("handles special characters only", () => {
			expect(words("!!!")).toEqual([])
			expect(words("---")).toEqual([])
			expect(words("___")).toEqual([])
		})

		it("handles leading/trailing separators", () => {
			expect(words("_leading")).toEqual(["leading"])
			expect(words("trailing_")).toEqual(["trailing"])
			expect(words("-both-")).toEqual(["both"])
		})
	})

	describe("property-based tests", () => {
		it("never returns empty strings", () => {
			fc.assert(
				fc.property(
					fc.string(),
					(str) => {
						const result = words(str)
						for (const word of result) {
							expect(word.length).toBeGreaterThan(0)
						}
					}
				)
			)
		})

		it("returns only alphanumeric words", () => {
			fc.assert(
				fc.property(
					fc.string(),
					(str) => {
						const result = words(str)
						for (const word of result) {
							expect(word).toMatch(/^[a-zA-Z0-9]+$/)
						}
					}
				)
			)
		})

		it("concatenating with separators is reversible", () => {
			fc.assert(
				fc.property(
					fc.array(fc.string({ minLength: 1, maxLength: 10 }).filter(s => /^[a-zA-Z]+$/.test(s))),
					(arr) => {
						if (arr.length === 0) return true
						
						// Join with various separators
						const snakeCase = arr.join("_")
						const kebabCase = arr.join("-")
						const spaced = arr.join(" ")
						
						// Should get back original words
						expect(words(snakeCase)).toEqual(arr)
						expect(words(kebabCase)).toEqual(arr)
						expect(words(spaced)).toEqual(arr)
					}
				)
			)
		})
	})
})