import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import fc from "fast-check"

// Import padding functions
import padBoth from "../../../string/padBoth/index.ts"
import padBothTo from "../../../string/padBothTo/index.ts"
import padBothToFromStart from "../../../string/padBothToFromStart/index.ts"
import padBothToFromEnd from "../../../string/padBothToFromEnd/index.ts"
import padStart from "../../../string/padStart/index.ts"
import padStartTo from "../../../string/padStartTo/index.ts"
import padEnd from "../../../string/padEnd/index.ts"
import padEndTo from "../../../string/padEndTo/index.ts"

describe("String Padding Behaviors", () => {
	describe("padStart - adds exact count to beginning", () => {
		it("adds specified number of padding characters", () => {
			expect(padStart("-")(3)("test")).toBe("---test")
			expect(padStart("0")(5)("42")).toBe("0000042")
			expect(padStart("ab")(2)("xyz")).toBe("ababxyz")
		})

		it("adds nothing when count is zero", () => {
			expect(padStart("-")(0)("test")).toBe("test")
		})

		it("adds nothing when count is negative", () => {
			expect(padStart("-")(-5)("test")).toBe("test")
		})

		it("handles empty string", () => {
			expect(padStart("x")(3)("")).toBe("xxx")
		})

		it("is curried", () => {
			const addDashes = padStart("-")
			const add3Dashes = addDashes(3)
			expect(add3Dashes("test")).toBe("---test")
		})

		// Property-based tests
		it("always increases string length by count when count > 0", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.string({ minLength: 1, maxLength: 3 }),
					fc.integer({ min: 0, max: 100 }),
					(str, chars, count) => {
						const result = padStart(chars)(count)(str)
						expect(result.length).toBe(str.length + (chars.repeat(count).length))
					}
				)
			)
		})

		it("preserves original string at the end", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.string({ minLength: 1, maxLength: 3 }),
					fc.integer({ min: 0, max: 50 }),
					(str, chars, count) => {
						const result = padStart(chars)(count)(str)
						expect(result.endsWith(str)).toBe(true)
					}
				)
			)
		})
	})

	describe("padStartTo - pads to target length from start", () => {
		it("pads to exact length", () => {
			expect(padStartTo("-")(10)("test")).toBe("------test")
			expect(padStartTo("0")(5)("42")).toBe("00042")
		})

		it("returns original when already at or beyond target", () => {
			expect(padStartTo("-")(4)("test")).toBe("test")
			expect(padStartTo("-")(2)("test")).toBe("test")
		})

		it("handles empty string", () => {
			expect(padStartTo("x")(5)("")).toBe("xxxxx")
		})

		it("handles zero and negative lengths", () => {
			expect(padStartTo("-")(0)("test")).toBe("test")
			expect(padStartTo("-")(-5)("test")).toBe("test")
		})

		it("handles multi-character padding strings", () => {
			// When using multi-char padding, may exceed target due to padding chunk size
			const result = padStartTo("ab")(7)("xyz")
			// Need 4 chars of padding to reach 7, "ab" is 2 chars, so needs 4 repetitions = "abababab"
			expect(result).toBe("ababababxyz")
			expect(result.length).toBeGreaterThanOrEqual(7)
		})

		// Property-based tests
		it("result length is at least max of target and original length", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.string({ minLength: 1, maxLength: 1 }), // Single char for exact length
					fc.integer({ min: -10, max: 100 }),
					(str, chars, target) => {
						const result = padStartTo(chars)(target)(str)
						expect(result.length).toBe(Math.max(str.length, Math.max(0, target)))
					}
				)
			)
		})
	})

	describe("padEnd - adds exact count to end", () => {
		it("adds specified number of padding characters", () => {
			expect(padEnd("-")(3)("test")).toBe("test---")
			expect(padEnd(".")(5)("end")).toBe("end.....")
			expect(padEnd("xy")(2)("abc")).toBe("abcxyxy")
		})

		it("adds nothing when count is zero", () => {
			expect(padEnd("-")(0)("test")).toBe("test")
		})

		it("adds nothing when count is negative", () => {
			expect(padEnd("-")(-5)("test")).toBe("test")
		})

		it("handles empty string", () => {
			expect(padEnd("x")(3)("")).toBe("xxx")
		})

		// Property-based tests
		it("always increases string length by count when count > 0", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.string({ minLength: 1, maxLength: 3 }),
					fc.integer({ min: 0, max: 100 }),
					(str, chars, count) => {
						const result = padEnd(chars)(count)(str)
						expect(result.length).toBe(str.length + (chars.repeat(count).length))
					}
				)
			)
		})

		it("preserves original string at the beginning", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.string({ minLength: 1, maxLength: 3 }),
					fc.integer({ min: 0, max: 50 }),
					(str, chars, count) => {
						const result = padEnd(chars)(count)(str)
						expect(result.startsWith(str)).toBe(true)
					}
				)
			)
		})
	})

	describe("padEndTo - pads to target length from end", () => {
		it("pads to exact length", () => {
			expect(padEndTo("-")(10)("test")).toBe("test------")
			expect(padEndTo(".")(8)("hello")).toBe("hello...")
		})

		it("returns original when already at or beyond target", () => {
			expect(padEndTo("-")(4)("test")).toBe("test")
			expect(padEndTo("-")(2)("test")).toBe("test")
		})

		it("handles empty string", () => {
			expect(padEndTo("x")(5)("")).toBe("xxxxx")
		})

		it("handles zero and negative lengths", () => {
			expect(padEndTo("-")(0)("test")).toBe("test")
			expect(padEndTo("-")(-5)("test")).toBe("test")
		})

		// Property-based tests
		it("result length is max of target and original length with single char padding", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.string({ minLength: 1, maxLength: 1 }), // Single char for exact length
					fc.integer({ min: -10, max: 100 }),
					(str, chars, target) => {
						const result = padEndTo(chars)(target)(str)
						expect(result.length).toBe(Math.max(str.length, Math.max(0, target)))
					}
				)
			)
		})
	})

	describe("padBoth - adds exact count to both sides", () => {
		it("adds specified count to each side", () => {
			expect(padBoth("-")(3)("test")).toBe("---test---")
			expect(padBoth("*")(2)("hi")).toBe("**hi**")
			expect(padBoth("ab")(1)("x")).toBe("abxab")
		})

		it("adds nothing when count is zero", () => {
			expect(padBoth("-")(0)("test")).toBe("test")
		})

		it("adds nothing when count is negative", () => {
			expect(padBoth("-")(-5)("test")).toBe("test")
		})

		it("handles empty string", () => {
			expect(padBoth("x")(2)("")).toBe("xxxx")
		})

		// Property-based tests
		it("increases length by 2 * count * chars.length", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.string({ minLength: 1, maxLength: 3 }),
					fc.integer({ min: 0, max: 50 }),
					(str, chars, count) => {
						const result = padBoth(chars)(count)(str)
						const expectedIncrease = 2 * chars.repeat(count).length
						expect(result.length).toBe(str.length + expectedIncrease)
					}
				)
			)
		})

		it("original string is in the middle", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.string({ minLength: 1, maxLength: 3 }),
					fc.integer({ min: 1, max: 20 }),
					(str, chars, count) => {
						const result = padBoth(chars)(count)(str)
						const padding = chars.repeat(count)
						expect(result.startsWith(padding)).toBe(true)
						expect(result.endsWith(padding)).toBe(true)
						expect(result.includes(str)).toBe(true)
					}
				)
			)
		})
	})

	describe("padBothTo - pads to target length equally", () => {
		it("pads equally when even padding needed", () => {
			expect(padBothTo("-")(10)("test")).toBe("---test---")
			expect(padBothTo("*")(8)("hi")).toBe("***hi***")
		})

		it("adds extra padding to end when odd", () => {
			expect(padBothTo("-")(9)("test")).toBe("--test---")
			expect(padBothTo("*")(7)("hi")).toBe("**hi***")
		})

		it("returns original when already at or beyond target", () => {
			expect(padBothTo("-")(4)("test")).toBe("test")
			expect(padBothTo("-")(2)("test")).toBe("test")
		})

		it("handles empty string", () => {
			expect(padBothTo("x")(5)("")).toBe("xxxxx")
			expect(padBothTo("x")(4)("")).toBe("xxxx")
		})

		// Property-based tests
		it("result length is max of target and original length with single char padding", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.string({ minLength: 1, maxLength: 1 }), // Single char for exact length
					fc.integer({ min: -10, max: 100 }),
					(str, chars, target) => {
						const result = padBothTo(chars)(target)(str)
						expect(result.length).toBe(Math.max(str.length, Math.max(0, target)))
					}
				)
			)
		})
	})

	describe("padBothToFromStart - extra padding at start when odd", () => {
		it("pads equally when even padding needed", () => {
			expect(padBothToFromStart("-")(10)("test")).toBe("---test---")
		})

		it("adds extra padding to start when odd", () => {
			expect(padBothToFromStart("-")(9)("test")).toBe("---test--")
			expect(padBothToFromStart("*")(7)("hi")).toBe("***hi**")
		})

		it("returns original when already at or beyond target", () => {
			expect(padBothToFromStart("-")(4)("test")).toBe("test")
		})

		// Property-based test
		it("left padding >= right padding", () => {
			fc.assert(
				fc.property(
					fc.string({ minLength: 1, maxLength: 20 }),
					fc.string({ minLength: 1, maxLength: 3 }).filter(s => s !== " "), // Avoid space padding for this test
					fc.integer({ min: 0, max: 100 }),
					(str, chars, target) => {
						if (target <= str.length) return // Skip when no padding
						// Skip if string contains the padding char (makes indexOf unreliable)
						if (str.includes(chars)) return
						const result = padBothToFromStart(chars)(target)(str)
						const leftPadLength = result.indexOf(str)
						const rightPadLength = result.length - str.length - leftPadLength
						expect(leftPadLength).toBeGreaterThanOrEqual(rightPadLength)
					}
				)
			)
		})
	})

	describe("padBothToFromEnd - extra padding at end when odd", () => {
		it("pads equally when even padding needed", () => {
			expect(padBothToFromEnd("-")(10)("test")).toBe("---test---")
		})

		it("adds extra padding to end when odd", () => {
			expect(padBothToFromEnd("-")(9)("test")).toBe("--test---")
			expect(padBothToFromEnd("*")(7)("hi")).toBe("**hi***")
		})

		it("returns original when already at or beyond target", () => {
			expect(padBothToFromEnd("-")(4)("test")).toBe("test")
		})

		// Property-based test
		it("right padding >= left padding", () => {
			fc.assert(
				fc.property(
					fc.string({ minLength: 1, maxLength: 20 }),
					fc.string({ minLength: 1, maxLength: 3 }),
					fc.integer({ min: 0, max: 100 }),
					(str, chars, target) => {
						if (target <= str.length) return // Skip when no padding
						const result = padBothToFromEnd(chars)(target)(str)
						const leftPadLength = result.indexOf(str)
						const rightPadLength = result.length - str.length - leftPadLength
						expect(rightPadLength).toBeGreaterThanOrEqual(leftPadLength)
					}
				)
			)
		})
	})

	describe("padding use cases", () => {
		it("aligns numbers in columns", () => {
			const nums = ["1", "42", "100", "7"]
			const aligned = nums.map(padStartTo("0")(3))
			expect(aligned).toEqual(["001", "042", "100", "007"])
		})

		it("creates fixed-width fields", () => {
			const fields = ["John", "Jane", "Bob"]
			const fixed = fields.map(padEndTo(" ")(10))
			expect(fixed).toEqual(["John      ", "Jane      ", "Bob       "])
		})

		it("centers text with padBothTo", () => {
			expect(padBothTo(" ")(10)("test")).toBe("   test   ")
			expect(padBothTo(" ")(9)("test")).toBe("  test   ")
		})

		it("formats binary numbers", () => {
			const binary = (5).toString(2)
			const formatted = padStartTo("0")(8)(binary)
			expect(formatted).toBe("00000101")
		})

		it("creates visual separators", () => {
			const separator = padBoth("=")(20)(" SECTION ")
			expect(separator).toBe("==================== SECTION ====================")
		})

		it("formats table headers", () => {
			const headers = ["ID", "Name", "Age", "City"]
			const formatted = headers.map((h, i) => 
				i === 0 ? padEndTo(" ")(5)(h) : padEndTo(" ")(15)(h)
			)
			expect(formatted).toEqual([
				"ID   ",
				"Name           ",
				"Age            ",
				"City           "
			])
		})
	})

	describe("currying and composition", () => {
		it("all functions are curried", () => {
			const padders = [
				padStart("x"),
				padStartTo("x"),
				padEnd("x"),
				padEndTo("x"),
				padBoth("x"),
				padBothTo("x"),
				padBothToFromStart("x"),
				padBothToFromEnd("x")
			]

			padders.forEach(padder => {
				expect(typeof padder).toBe("function")
				const withCount = padder(5)
				expect(typeof withCount).toBe("function")
				const result = withCount("test")
				expect(typeof result).toBe("string")
			})
		})

		it("can be composed for complex formatting", () => {
			const format = (str: string) => 
				padBothTo("*")(20)(
					padBothTo(" ")(15)(str)
				)
			// padBothTo adds extra to end when odd, so result is asymmetric
			expect(format("TITLE")).toBe("**     TITLE     ***")
		})
	})
})