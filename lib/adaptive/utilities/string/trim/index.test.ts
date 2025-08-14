import { expect } from "@std/expect"
import { describe, it } from "@std/testing/bdd"
import * as fc from "fast-check"

import trim from "./index.ts"

describe("trim", () => {
	describe("basic functionality", () => {
		it("should remove whitespace from both ends", () => {
			expect(trim("  hello world  ")).toBe("hello world")
			expect(trim("\n\ttest\n")).toBe("test")
			expect(trim("   content   ")).toBe("content")
		})

		it("should handle strings with no leading/trailing whitespace", () => {
			expect(trim("hello")).toBe("hello")
			expect(trim("test")).toBe("test")
			expect(trim("nowhitespace")).toBe("nowhitespace")
		})

		it("should preserve internal whitespace", () => {
			expect(trim("  hello world  ")).toBe("hello world")
			expect(trim("\na b c\t")).toBe("a b c")
			expect(trim("  multiple   spaces  ")).toBe("multiple   spaces")
		})

		it("should handle empty string", () => {
			expect(trim("")).toBe("")
		})

		it("should handle string with only whitespace", () => {
			expect(trim("   ")).toBe("")
			expect(trim("\t\n\r ")).toBe("")
			expect(trim("\n\n\n")).toBe("")
		})
	})

	describe("whitespace types", () => {
		it("should handle different types of leading whitespace", () => {
			expect(trim(" test")).toBe("test")        // space
			expect(trim("\ttest")).toBe("test")       // tab
			expect(trim("\ntest")).toBe("test")       // newline
			expect(trim("\rtest")).toBe("test")       // carriage return
			expect(trim("\ftest")).toBe("test")       // form feed
			expect(trim("\vtest")).toBe("test")       // vertical tab
		})

		it("should handle different types of trailing whitespace", () => {
			expect(trim("test ")).toBe("test")        // space
			expect(trim("test\t")).toBe("test")       // tab
			expect(trim("test\n")).toBe("test")       // newline
			expect(trim("test\r")).toBe("test")       // carriage return
			expect(trim("test\f")).toBe("test")       // form feed
			expect(trim("test\v")).toBe("test")       // vertical tab
		})

		it("should handle mixed whitespace", () => {
			expect(trim(" \t\n test \r\f\v ")).toBe("test")
			expect(trim("\n\r\t hello world \t\r\n")).toBe("hello world")
		})

		it("should handle unicode whitespace", () => {
			// Unicode whitespace characters
			expect(trim("\u00A0test\u00A0")).toBe("test")     // non-breaking space
			expect(trim("\u2000test\u2000")).toBe("test")     // en quad
			expect(trim("\u2028test\u2028")).toBe("test")     // line separator
		})
	})

	describe("edge cases", () => {
		it("should handle very long strings", () => {
			const content = "x".repeat(10000)
			const withWhitespace = "  " + content + "  "
			expect(trim(withWhitespace)).toBe(content)
		})

		it("should handle strings with only internal content", () => {
			expect(trim("a")).toBe("a")
			expect(trim("1")).toBe("1")
			expect(trim("!")).toBe("!")
		})

		it("should handle special characters", () => {
			expect(trim("  !@#$%^&*()  ")).toBe("!@#$%^&*()")
			expect(trim("\t{[}]\n")).toBe("{[}]")
		})

		it("should handle unicode content", () => {
			expect(trim("  世界  ")).toBe("世界")
			expect(trim("\n🎉🎊\t")).toBe("🎉🎊")
		})

		it("should handle mixed content and whitespace", () => {
			expect(trim("  a b  c  ")).toBe("a b  c")
			expect(trim("\n\tline1\nline2\t\n")).toBe("line1\nline2")
		})
	})

	describe("property-based tests", () => {
		it("should be idempotent", () => {
			fc.assert(
				fc.property(
					fc.string(),
					(str) => {
						const trimmed = trim(str)
						expect(trim(trimmed)).toBe(trimmed)
					}
				)
			)
		})

		it("should never increase string length", () => {
			fc.assert(
				fc.property(
					fc.string(),
					(str) => {
						const result = trim(str)
						expect(result.length).toBeLessThanOrEqual(str.length)
					}
				)
			)
		})

		it("should preserve non-whitespace content", () => {
			fc.assert(
				fc.property(
					fc.string().filter(s => s.trim().length > 0),
					(str) => {
						const trimmed = trim(str)
						const originalTrimmed = str.trim()
						expect(trimmed).toBe(originalTrimmed)
					}
				)
			)
		})

		it("should handle any string input", () => {
			fc.assert(
				fc.property(
					fc.string(),
					(str) => {
						const result = trim(str)
						expect(typeof result).toBe("string")
						
						// Result should not have leading/trailing whitespace
						expect(result).toBe(result.trim())
					}
				)
			)
		})

		it("should match native trim behavior", () => {
			fc.assert(
				fc.property(
					fc.string(),
					(str) => {
						expect(trim(str)).toBe(str.trim())
					}
				)
			)
		})
	})

	describe("function composition", () => {
		it("should work with other string functions", () => {
			const testString = "  hello world  "
			
			// Should work in composition
			const trimAndUppercase = (s: string) => trim(s).toUpperCase()
			expect(trimAndUppercase(testString)).toBe("HELLO WORLD")
			
			const uppercaseAndTrim = (s: string) => trim(s.toUpperCase())
			expect(uppercaseAndTrim(testString)).toBe("HELLO WORLD")
		})

		it("should be usable in array operations", () => {
			const strings = ["  hello  ", "\tworld\n", "  test  "]
			const trimmed = strings.map(trim)
			expect(trimmed).toEqual(["hello", "world", "test"])
		})
	})

	describe("performance characteristics", () => {
		it("should handle empty strings efficiently", () => {
			const result = trim("")
			expect(result).toBe("")
		})

		it("should handle strings without whitespace efficiently", () => {
			const str = "nowjitespace"
			const result = trim(str)
			expect(result).toBe(str)
		})

		it("should handle large strings with minimal whitespace", () => {
			const content = "a".repeat(10000)
			const str = " " + content + " "
			const result = trim(str)
			expect(result).toBe(content)
		})
	})
})