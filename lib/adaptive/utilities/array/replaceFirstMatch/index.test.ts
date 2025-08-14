import { expect } from "@std/expect"
import { describe, it } from "@std/testing/bdd"
import * as fc from "fast-check"

import replaceFirstMatch from "./index.ts"

describe("replaceFirstMatch", () => {
	describe("basic functionality", () => {
		it("should replace the first string matching the regex", () => {
			const result = replaceFirstMatch(/^h/)(s => s.toUpperCase())(["hello", "hi", "world"])
			expect(result).toEqual(["HELLO", "hi", "world"])
		})

		it("should replace the first matching element only", () => {
			const result = replaceFirstMatch(/test/)(s => "replaced")(["other", "test1", "test2"])
			expect(result).toEqual(["other", "replaced", "test2"])
		})

		it("should return original array if no match found", () => {
			const input = ["apple", "banana", "cherry"]
			const result = replaceFirstMatch(/xyz/)(s => "replaced")(input)
			expect(result).toEqual(input)
			// Note: implementation returns same reference when no changes are made
			expect(result).toBe(input)
		})

		it("should handle empty array", () => {
			const result = replaceFirstMatch(/test/)(s => "replaced")([])
			expect(result).toEqual([])
		})

		it("should work with complex regex patterns", () => {
			const result = replaceFirstMatch(/^[aeiou]/)(s => s.toUpperCase())(["apple", "banana", "cherry", "orange"])
			expect(result).toEqual(["APPLE", "banana", "cherry", "orange"])
		})
	})

	describe("transformer function behavior", () => {
		it("should pass the matched string to the transformer", () => {
			const transformer = (s: string) => `[${s}]`
			const result = replaceFirstMatch(/test/)(transformer)(["abc", "test", "def"])
			expect(result).toEqual(["abc", "[test]", "def"])
		})

		it("should handle complex transformations", () => {
			const transformer = (s: string) => s.split("").reverse().join("")
			const result = replaceFirstMatch(/hello/)(transformer)(["hello", "world", "hello"])
			expect(result).toEqual(["olleh", "world", "hello"])
		})

		it("should work with transformations that change length", () => {
			const transformer = (s: string) => s + s // duplicate
			const result = replaceFirstMatch(/hi/)(transformer)(["hi", "there", "hi"])
			expect(result).toEqual(["hihi", "there", "hi"])
		})

		it("should handle transformer that returns empty string", () => {
			const transformer = () => ""
			const result = replaceFirstMatch(/remove/)(transformer)(["keep", "remove", "keep"])
			expect(result).toEqual(["keep", "", "keep"])
		})
	})

	describe("regex patterns", () => {
		it("should work with case-sensitive patterns", () => {
			const result = replaceFirstMatch(/Hello/)(s => s.toLowerCase())(["Hello", "hello", "HELLO"])
			expect(result).toEqual(["hello", "hello", "HELLO"])
		})

		it("should work with anchored patterns", () => {
			const result = replaceFirstMatch(/^start/)(s => "BEGIN")(["start123", "nostart", "start456"])
			expect(result).toEqual(["BEGIN", "nostart", "start456"])
		})

		it("should work with character classes", () => {
			const result = replaceFirstMatch(/\d+/)(s => `NUM(${s})`)(["abc", "123", "def", "456"])
			expect(result).toEqual(["abc", "NUM(123)", "def", "456"])
		})

		it("should work with quantifiers", () => {
			const result = replaceFirstMatch(/a+/)(s => s.length.toString())(["aaa", "a", "aa", "b"])
			expect(result).toEqual(["3", "a", "aa", "b"])
		})

		it("should work with word boundaries", () => {
			const result = replaceFirstMatch(/\btest\b/)(s => "MATCH")(["testing", "test", "contest"])
			expect(result).toEqual(["testing", "MATCH", "contest"])
		})
	})

	describe("edge cases", () => {
		it("should handle single element array", () => {
			const result = replaceFirstMatch(/test/)(s => "replaced")(["test"])
			expect(result).toEqual(["replaced"])
		})

		it("should handle array with duplicate strings", () => {
			const result = replaceFirstMatch(/dup/)(s => "FIRST")(["dup", "dup", "dup"])
			expect(result).toEqual(["FIRST", "dup", "dup"])
		})

		it("should handle special regex characters in strings", () => {
			const result = replaceFirstMatch(/\$\d+/)(s => "MONEY")(["$100", "text", "$50"])
			expect(result).toEqual(["MONEY", "text", "$50"])
		})

		it("should handle empty strings in array", () => {
			const result = replaceFirstMatch(/^$/)(s => "EMPTY")(["", "text", ""])
			expect(result).toEqual(["EMPTY", "text", ""])
		})

		it("should handle unicode characters", () => {
			const result = replaceFirstMatch(/🎉/)(s => "🎊")(["🎉", "text", "🎉"])
			expect(result).toEqual(["🎊", "text", "🎉"])
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
						const result = replaceFirstMatch(regex)(s => s.toUpperCase())(arr)
						expect(result.length).toBe(arr.length)
					}
				)
			)
		})

		it("should not modify elements after the first match", () => {
			fc.assert(
				fc.property(
					fc.array(fc.string(), { minLength: 2 }),
					(arr) => {
						if (arr.length < 2) return

						const pattern = arr[0] // Use first element as pattern
						const regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
						const result = replaceFirstMatch(regex)(s => "REPLACED")(arr)
						
						// Find first match index
						const firstMatchIndex = arr.findIndex(s => regex.test(s))
						
						if (firstMatchIndex !== -1) {
							// Elements after first match should be unchanged
							for (let i = firstMatchIndex + 1; i < arr.length; i++) {
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
						replaceFirstMatch(/./)(s => s.toUpperCase())(arr)
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
						const result = replaceFirstMatch(/./)(s => replacement)(arr)
						expect(result).toBeInstanceOf(Array)
						expect(result.length).toBe(arr.length)
						
						// At least first non-empty element should be replaced
						const firstNonEmptyIndex = arr.findIndex(s => s.length > 0)
						if (firstNonEmptyIndex !== -1) {
							expect(result[firstNonEmptyIndex]).toBe(replacement)
						}
					}
				)
			)
		})
	})

	describe("currying behavior", () => {
		it("should be properly curried", () => {
			const replaceFirstHello = replaceFirstMatch(/hello/)
			const makeUppercase = replaceFirstHello(s => s.toUpperCase())
			
			expect(makeUppercase(["hello", "world"])).toEqual(["HELLO", "world"])
			expect(makeUppercase(["hi", "hello"])).toEqual(["hi", "HELLO"])
		})

		it("should allow partial application", () => {
			const replaceFirst = (pattern: RegExp) => (arr: Array<string>) =>
				replaceFirstMatch(pattern)(s => s.toUpperCase())(arr)
			
			expect(replaceFirst(/test/)(["test", "demo"])).toEqual(["TEST", "demo"])
		})
	})

	describe("integration with findIndex", () => {
		it("should work correctly when no match is found", () => {
			const result = replaceFirstMatch(/notfound/)(s => "REPLACED")(["a", "b", "c"])
			expect(result).toEqual(["a", "b", "c"])
		})

		it("should find match at any position", () => {
			const result1 = replaceFirstMatch(/target/)(s => "HIT")(["target", "other"])
			expect(result1).toEqual(["HIT", "other"])
			
			const result2 = replaceFirstMatch(/target/)(s => "HIT")(["other", "target"])
			expect(result2).toEqual(["other", "HIT"])
		})
	})
})