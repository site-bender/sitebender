import { expect } from "@std/expect"
import { describe, it } from "@std/testing/bdd"
import * as fc from "fast-check"

import repeat from "./index.ts"

describe("repeat", () => {
	describe("basic functionality", () => {
		it("should repeat a string the specified number of times", () => {
			expect(repeat("x")(3)).toBe("xxx")
			expect(repeat("ab")(2)).toBe("abab")
			expect(repeat("hello")(1)).toBe("hello")
		})

		it("should return empty string when repeating 0 times", () => {
			expect(repeat("test")(0)).toBe("")
			expect(repeat("")(0)).toBe("")
		})

		it("should handle empty string input", () => {
			expect(repeat("")(5)).toBe("")
			expect(repeat("")(0)).toBe("")
		})

		it("should handle single character strings", () => {
			expect(repeat("a")(5)).toBe("aaaaa")
			expect(repeat("1")(3)).toBe("111")
		})

		it("should handle multi-character strings", () => {
			expect(repeat("abc")(3)).toBe("abcabcabc")
			expect(repeat("hello")(2)).toBe("hellohello")
		})
	})

	describe("edge cases", () => {
		it("should handle special characters", () => {
			expect(repeat("!")(3)).toBe("!!!")
			expect(repeat("@#$")(2)).toBe("@#$@#$")
		})

		it("should handle unicode characters", () => {
			expect(repeat("🎉")(3)).toBe("🎉🎉🎉")
			expect(repeat("世")(2)).toBe("世世")
		})

		it("should handle strings with whitespace", () => {
			expect(repeat(" ")(3)).toBe("   ")
			expect(repeat("a b")(2)).toBe("a ba b")
		})

		it("should handle strings with newlines", () => {
			expect(repeat("a\n")(2)).toBe("a\na\n")
			expect(repeat("\t")(3)).toBe("\t\t\t")
		})

		it("should handle large repeat counts efficiently", () => {
			const result = repeat("x")(1000)
			expect(result.length).toBe(1000)
			expect(result).toBe("x".repeat(1000)) // Compare with native implementation
		})

		it("should handle negative numbers gracefully", () => {
			// Negative numbers should be treated as 0 by Array.from
			expect(repeat("test")(-1)).toBe("")
			expect(repeat("abc")(-5)).toBe("")
		})

		it("should handle fractional numbers", () => {
			// Array.from({ length: 2.5 }) creates array with length 2
			expect(repeat("x")(2.5)).toBe("xx")
			expect(repeat("test")(1.9)).toBe("test")
		})
	})

	describe("property-based tests", () => {
		it("should produce correct length", () => {
			fc.assert(
				fc.property(
					fc.string({ minLength: 1 }),
					fc.integer({ min: 0, max: 100 }),
					(str, count) => {
						const result = repeat(str)(count)
						expect(result.length).toBe(str.length * count)
					}
				)
			)
		})

		it("should be composable", () => {
			fc.assert(
				fc.property(
					fc.string({ minLength: 1, maxLength: 10 }),
					fc.integer({ min: 1, max: 10 }),
					fc.integer({ min: 1, max: 10 }),
					(str, count1, count2) => {
						const result1 = repeat(repeat(str)(count1))(count2)
						const result2 = repeat(str)(count1 * count2)
						expect(result1).toBe(result2)
					}
				)
			)
		})

		it("should handle any string input", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.integer({ min: 0, max: 20 }),
					(str, count) => {
						const result = repeat(str)(count)
						expect(typeof result).toBe("string")
						
						if (count === 0 || str === "") {
							expect(result).toBe("")
						} else {
							expect(result.length).toBe(str.length * count)
						}
					}
				)
			)
		})

		it("should maintain string content integrity", () => {
			fc.assert(
				fc.property(
					fc.string({ minLength: 1, maxLength: 5 }),
					fc.integer({ min: 1, max: 10 }),
					(str, count) => {
						const result = repeat(str)(count)
						
						// Result should start and end with the original string
						expect(result.startsWith(str)).toBe(true)
						expect(result.endsWith(str)).toBe(true)
						
						// Should be able to split back into original string
						const parts = []
						for (let i = 0; i < result.length; i += str.length) {
							parts.push(result.slice(i, i + str.length))
						}
						expect(parts.every(part => part === str)).toBe(true)
					}
				)
			)
		})
	})

	describe("currying behavior", () => {
		it("should be properly curried", () => {
			const repeatThree = repeat("abc")
			expect(repeatThree(2)).toBe("abcabc")
			expect(repeatThree(3)).toBe("abcabcabc")
		})

		it("should allow partial application", () => {
			const doubleString = (str: string) => repeat(str)(2)
			const tripleString = (str: string) => repeat(str)(3)
			
			expect(doubleString("hi")).toBe("hihi")
			expect(tripleString("go")).toBe("gogogo")
		})
	})

	describe("performance characteristics", () => {
		it("should handle zero repetitions efficiently", () => {
			const startTime = Date.now()
			repeat("very long string that should not matter")(0)
			const endTime = Date.now()
			expect(endTime - startTime).toBeLessThan(10) // Should be very fast
		})

		it("should handle single repetition efficiently", () => {
			const str = "test string"
			const result = repeat(str)(1)
			expect(result).toBe(str)
		})
	})
})