import { expect } from "@std/expect"
import { describe, it } from "@std/testing/bdd"
import * as fc from "fast-check"

import replaceLastMatch from "./index.ts"

describe("replaceLastMatch", () => {
	describe("basic functionality", () => {
		it("should replace the last string matching the regex", () => {
			const result = replaceLastMatch(/^h/)(s => s.toUpperCase())(["hello", "hi", "world"])
			expect(result).toEqual(["hello", "HI", "world"])
		})

		it("should replace the last matching element only", () => {
			const result = replaceLastMatch(/test/)(s => "replaced")(["test1", "other", "test2"])
			expect(result).toEqual(["test1", "other", "replaced"])
		})

		it("should return original array if no match found", () => {
			const input = ["apple", "banana", "cherry"]
			const result = replaceLastMatch(/xyz/)(s => "replaced")(input)
			expect(result).toEqual(input)
			// Note: implementation returns same reference when no changes are made
			expect(result).toBe(input)
		})

		it("should handle empty array", () => {
			const result = replaceLastMatch(/test/)(s => "replaced")([])
			expect(result).toEqual([])
		})

		it("should work with complex regex patterns", () => {
			const result = replaceLastMatch(/^[aeiou]/)(s => s.toUpperCase())(["apple", "banana", "cherry", "orange"])
			expect(result).toEqual(["apple", "banana", "cherry", "ORANGE"])
		})
	})

	describe("string pattern support", () => {
		it("should accept string patterns", () => {
			const result = replaceLastMatch("test")(s => "replaced")(["test1", "other", "test2"])
			expect(result).toEqual(["test1", "other", "replaced"])
		})

		it("should treat string patterns as regex", () => {
			const result = replaceLastMatch("h.*o")(s => "MATCH")(["hello", "hi", "hero"])
			expect(result).toEqual(["hello", "hi", "MATCH"])
		})

		it("should handle special regex characters in string patterns", () => {
			const result = replaceLastMatch("$")(s => "END")(["test$", "other", "end$"])
			expect(result).toEqual(["test$", "other", "END"])
		})
	})

	describe("transformer function behavior", () => {
		it("should pass the matched string to the transformer", () => {
			const transformer = (s: string) => `[${s}]`
			const result = replaceLastMatch(/test/)(transformer)(["test", "abc", "test"])
			expect(result).toEqual(["test", "abc", "[test]"])
		})

		it("should handle complex transformations", () => {
			const transformer = (s: string) => s.split("").reverse().join("")
			const result = replaceLastMatch(/hello/)(transformer)(["hello", "world", "hello"])
			expect(result).toEqual(["hello", "world", "olleh"])
		})

		it("should work with transformations that change length", () => {
			const transformer = (s: string) => s + s // duplicate
			const result = replaceLastMatch(/hi/)(transformer)(["hi", "there", "hi"])
			expect(result).toEqual(["hi", "there", "hihi"])
		})

		it("should handle transformer that returns empty string", () => {
			const transformer = () => ""
			const result = replaceLastMatch(/remove/)(transformer)(["remove", "keep", "remove"])
			expect(result).toEqual(["remove", "keep", ""])
		})
	})

	describe("last match behavior", () => {
		it("should find the last occurrence when multiple matches exist", () => {
			const result = replaceLastMatch(/test/)(s => "LAST")(["test", "test", "test"])
			expect(result).toEqual(["test", "test", "LAST"])
		})

		it("should work when only one match exists", () => {
			const result = replaceLastMatch(/unique/)(s => "FOUND")(["other", "unique", "other"])
			expect(result).toEqual(["other", "FOUND", "other"])
		})

		it("should handle intermittent matches correctly", () => {
			const result = replaceLastMatch(/match/)(s => "LAST")(["match", "no", "match", "no", "match"])
			expect(result).toEqual(["match", "no", "match", "no", "LAST"])
		})
	})

	describe("regex patterns", () => {
		it("should work with case-sensitive patterns", () => {
			const result = replaceLastMatch(/Hello/)(s => s.toLowerCase())(["Hello", "hello", "Hello"])
			expect(result).toEqual(["Hello", "hello", "hello"])
		})

		it("should work with anchored patterns", () => {
			const result = replaceLastMatch(/^start/)(s => "BEGIN")(["start123", "nostart", "start456"])
			expect(result).toEqual(["start123", "nostart", "BEGIN"])
		})

		it("should work with character classes", () => {
			const result = replaceLastMatch(/\d+/)(s => `NUM(${s})`)(["abc", "123", "def", "456"])
			expect(result).toEqual(["abc", "123", "def", "NUM(456)"])
		})

		it("should work with quantifiers", () => {
			const result = replaceLastMatch(/a+/)(s => s.length.toString())(["aaa", "a", "aa", "b"])
			expect(result).toEqual(["aaa", "a", "2", "b"])
		})

		it("should work with word boundaries", () => {
			const result = replaceLastMatch(/\btest\b/)(s => "MATCH")(["test", "testing", "test"])
			expect(result).toEqual(["test", "testing", "MATCH"])
		})
	})

	describe("edge cases", () => {
		it("should handle single element array", () => {
			const result = replaceLastMatch(/test/)(s => "replaced")(["test"])
			expect(result).toEqual(["replaced"])
		})

		it("should handle array with duplicate strings", () => {
			const result = replaceLastMatch(/dup/)(s => "LAST")(["dup", "dup", "dup"])
			expect(result).toEqual(["dup", "dup", "LAST"])
		})

		it("should handle special regex characters in strings", () => {
			const result = replaceLastMatch(/\$\d+/)(s => "MONEY")(["$100", "text", "$50"])
			expect(result).toEqual(["$100", "text", "MONEY"])
		})

		it("should handle empty strings in array", () => {
			const result = replaceLastMatch(/^$/)(s => "EMPTY")(["", "text", ""])
			expect(result).toEqual(["", "text", "EMPTY"])
		})

		it("should handle unicode characters", () => {
			const result = replaceLastMatch(/🎉/)(s => "🎊")(["🎉", "text", "🎉"])
			expect(result).toEqual(["🎉", "text", "🎊"])
		})
	})

	describe("property-based tests", () => {
		it("should maintain array length", () => {
			fc.assert(
				fc.property(
					fc.array(fc.string()),
					fc.string({ minLength: 1 }),
					(arr, pattern) => {
						const regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) // escape special chars
						const result = replaceLastMatch(regex)(s => s.toUpperCase())(arr)
						expect(result.length).toBe(arr.length)
					}
				)
			)
		})

		it("should not modify elements before the last match", () => {
			fc.assert(
				fc.property(
					fc.array(fc.string(), { minLength: 2 }),
					(arr) => {
						if (arr.length < 2) return

						const pattern = arr[arr.length - 1] // Use last element as pattern
						const regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
						const result = replaceLastMatch(regex)(s => "REPLACED")(arr)
						
						// Find last match index
						let lastMatchIndex = -1
						for (let i = arr.length - 1; i >= 0; i--) {
							if (regex.test(arr[i])) {
								lastMatchIndex = i
								break
							}
						}
						
						if (lastMatchIndex !== -1) {
							// Elements before last match should be unchanged
							for (let i = 0; i < lastMatchIndex; i++) {
								if (regex.test(arr[i])) {
									expect(result[i]).toBe(arr[i]) // Should not be replaced
								}
							}
						}
					}
				)
			)
		})

		it("should be immutable", () => {
			fc.assert(
				fc.property(
					fc.array(fc.string()),
					(arr) => {
						const original = [...arr]
						replaceLastMatch(/./)(s => s.toUpperCase())(arr)
						expect(arr).toEqual(original) // Original should not change
					}
				)
			)
		})

		it("should handle any valid regex pattern", () => {
			fc.assert(
				fc.property(
					fc.array(fc.string({ minLength: 1 })),
					fc.string({ minLength: 1 }),
					(arr, replacement) => {
						if (arr.length === 0) return

						// Use a simple pattern that will match
						const result = replaceLastMatch(/./)(s => replacement)(arr)
						expect(result).toBeInstanceOf(Array)
						expect(result.length).toBe(arr.length)
						
						// At least last non-empty element should be replaced
						let lastNonEmptyIndex = -1
						for (let i = arr.length - 1; i >= 0; i--) {
							if (arr[i].length > 0) {
								lastNonEmptyIndex = i
								break
							}
						}
						if (lastNonEmptyIndex !== -1) {
							expect(result[lastNonEmptyIndex]).toBe(replacement)
						}
					}
				)
			)
		})
	})

	describe("currying behavior", () => {
		it("should be properly curried", () => {
			const replaceLastHello = replaceLastMatch(/hello/)
			const makeUppercase = replaceLastHello(s => s.toUpperCase())
			
			expect(makeUppercase(["hello", "world", "hello"])).toEqual(["hello", "world", "HELLO"])
			expect(makeUppercase(["hello", "hi"])).toEqual(["HELLO", "hi"])
		})

		it("should allow partial application", () => {
			const replaceLast = (pattern: RegExp | string) => (arr: Array<string>) =>
				replaceLastMatch(pattern)(s => s.toUpperCase())(arr)
			
			expect(replaceLast(/test/)(["test", "demo", "test"])).toEqual(["test", "demo", "TEST"])
		})
	})

	describe("comparison with first match", () => {
		it("should behave differently from replaceFirstMatch", () => {
			const arr = ["test", "other", "test"]
			
			const lastResult = replaceLastMatch(/test/)(s => "REPLACED")(arr)
			expect(lastResult).toEqual(["test", "other", "REPLACED"])
			
			// If we had replaceFirstMatch, it would be ["REPLACED", "other", "test"]
		})

		it("should handle single match same as first match", () => {
			const arr = ["unique", "other", "different"]
			const result = replaceLastMatch(/unique/)(s => "REPLACED")(arr)
			expect(result).toEqual(["REPLACED", "other", "different"])
		})
	})

	describe("integration with findLastIndex", () => {
		it("should work correctly when no match is found", () => {
			const result = replaceLastMatch(/notfound/)(s => "REPLACED")(["a", "b", "c"])
			expect(result).toEqual(["a", "b", "c"])
		})

		it("should find last match at any position", () => {
			const result1 = replaceLastMatch(/target/)(s => "HIT")(["target", "other", "target"])
			expect(result1).toEqual(["target", "other", "HIT"])
			
			const result2 = replaceLastMatch(/target/)(s => "HIT")(["other", "target"])
			expect(result2).toEqual(["other", "HIT"])
		})
	})
})