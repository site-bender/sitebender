import { expect } from "@std/expect"
import { describe, it } from "@std/testing/bdd"
import * as fc from "fast-check"

import concat from "./index.ts"

describe("concat", () => {
	describe("basic functionality", () => {
		it("should concatenate two strings", () => {
			expect(concat("hello")(" world")).toBe("hello world")
		})

		it("should concatenate with empty string", () => {
			expect(concat("test")("")).toBe("test")
			expect(concat("")("test")).toBe("test")
		})

		it("should handle default parameters", () => {
			expect(concat()()).toBe("")
			expect(concat("hello")()).toBe("hello")
			expect(concat()("world")).toBe("world")
		})

		it("should concatenate special characters", () => {
			expect(concat("hello")("!@#$%")).toBe("hello!@#$%")
			expect(concat("🎉")("🎊")).toBe("🎉🎊")
		})

		it("should handle newlines and tabs", () => {
			expect(concat("line1\n")("line2")).toBe("line1\nline2")
			expect(concat("tab\t")("text")).toBe("tab\ttext")
		})
	})

	describe("edge cases", () => {
		it("should handle very long strings", () => {
			const longString = "x".repeat(10000)
			const result = concat(longString)(longString)
			expect(result).toBe(longString + longString)
			expect(result.length).toBe(20000)
		})

		it("should handle unicode characters", () => {
			expect(concat("Hello ")("世界")).toBe("Hello 世界")
			expect(concat("🌍")("🌎🌏")).toBe("🌍🌎🌏")
		})

		it("should handle strings with spaces", () => {
			expect(concat("  ")("  ")).toBe("    ")
			expect(concat(" a ")(" b ")).toBe(" a  b ")
		})
	})

	describe("property-based tests", () => {
		it("should be associative-like (order matters but grouping doesn't)", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.string(),
					fc.string(),
					(a, b, c) => {
						const result1 = concat(concat(a)(b))(c)
						const result2 = concat(a)(concat(b)(c))
						expect(result1).toBe(result2)
					}
				)
			)
		})

		it("should preserve length property", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.string(),
					(a, b) => {
						const result = concat(a)(b)
						expect(result.length).toBe(a.length + b.length)
					}
				)
			)
		})

		it("should have empty string as identity element", () => {
			fc.assert(
				fc.property(
					fc.string(),
					(s) => {
						expect(concat(s)("")).toBe(s)
						expect(concat("")(s)).toBe(s)
					}
				)
			)
		})

		it("should handle any valid string inputs", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.string(),
					(a, b) => {
						const result = concat(a)(b)
						expect(typeof result).toBe("string")
						expect(result.startsWith(a)).toBe(true)
						expect(result.endsWith(b)).toBe(true)
					}
				)
			)
		})
	})

	describe("currying behavior", () => {
		it("should be properly curried", () => {
			const addHello = concat("Hello ")
			expect(addHello("World")).toBe("Hello World")
			expect(addHello("TypeScript")).toBe("Hello TypeScript")
		})

		it("should allow partial application", () => {
			const prefixer = concat("PREFIX:")
			const suffixer = (str: string) => concat(str)(":SUFFIX")
			
			expect(prefixer("test")).toBe("PREFIX:test")
			expect(suffixer("test")).toBe("test:SUFFIX")
		})
	})
})