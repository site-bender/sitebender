import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import fc from "fast-check"

// Import combining functions
import concat from "../../../string/concat/index.ts"
import concatTo from "../../../string/concatTo/index.ts"
import repeat from "../../../string/repeat/index.ts"

describe("String Combining Behaviors", () => {
	describe("concat - combines strings in order", () => {
		it("concatenates two strings in order", () => {
			expect(concat("hello")(" world")).toBe("hello world")
			expect(concat("foo")("bar")).toBe("foobar")
			expect(concat("123")("456")).toBe("123456")
		})

		it("handles empty strings", () => {
			expect(concat("")("test")).toBe("test")
			expect(concat("test")("")).toBe("test")
			expect(concat("")("")).toBe("")
		})

		it("preserves spaces and special characters", () => {
			expect(concat("hello ")(" world")).toBe("hello  world")
			expect(concat("a\n")("b")).toBe("a\nb")
			expect(concat("🎉")("🎊")).toBe("🎉🎊")
		})

		it("is curried", () => {
			const addHello = concat("Hello ")
			expect(addHello("World")).toBe("Hello World")
			expect(addHello("there")).toBe("Hello there")
		})

		// Property-based tests
		it("is associative", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.string(),
					fc.string(),
					(a, b, c) => {
						const left = concat(concat(a)(b))(c)
						const right = concat(a)(concat(b)(c))
						expect(left).toBe(right)
					}
				)
			)
		})

		it("result length is sum of input lengths", () => {
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

		it("empty string is identity element", () => {
			fc.assert(
				fc.property(
					fc.string(),
					(str) => {
						expect(concat("")(str)).toBe(str)
						expect(concat(str)("")).toBe(str)
					}
				)
			)
		})
	})

	describe("concatTo - appends to base string", () => {
		it("appends string to base", () => {
			expect(concatTo(" world")("hello")).toBe("hello world")
			expect(concatTo("bar")("foo")).toBe("foobar")
			expect(concatTo("!")("Hello")).toBe("Hello!")
		})

		it("handles empty strings", () => {
			expect(concatTo("")("test")).toBe("test")
			expect(concatTo("test")("")).toBe("test")
			expect(concatTo("")("")).toBe("")
		})

		it("is curried for suffix patterns", () => {
			const addExclamation = concatTo("!")
			expect(addExclamation("Hello")).toBe("Hello!")
			expect(addExclamation("Wow")).toBe("Wow!")
			
			const addDotCom = concatTo(".com")
			expect(addDotCom("example")).toBe("example.com")
			expect(addDotCom("test")).toBe("test.com")
		})

		// Property-based test
		it("concatTo is concat with swapped parameters", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.string(),
					(a, b) => {
						expect(concatTo(a)(b)).toBe(concat(b)(a))
					}
				)
			)
		})
	})

	describe("repeat - repeats string n times", () => {
		it("repeats string specified number of times", () => {
			expect(repeat("a")(3)).toBe("aaa")
			expect(repeat("ab")(2)).toBe("abab")
			expect(repeat("123")(3)).toBe("123123123")
		})

		it("handles zero repetitions", () => {
			expect(repeat("test")(0)).toBe("")
			expect(repeat("anything")(0)).toBe("")
		})

		it("handles negative numbers as zero", () => {
			expect(repeat("test")(-1)).toBe("")
			expect(repeat("test")(-100)).toBe("")
		})

		it("handles single repetition", () => {
			expect(repeat("hello")(1)).toBe("hello")
			expect(repeat("x")(1)).toBe("x")
		})

		it("handles empty string", () => {
			expect(repeat("")(100)).toBe("")
			expect(repeat("")(0)).toBe("")
		})

		it("handles large repetitions", () => {
			expect(repeat("x")(10)).toBe("xxxxxxxxxx")
			expect(repeat("-")(20).length).toBe(20)
		})

		it("is curried for pattern creation", () => {
			const repeatDash = repeat("-")
			expect(repeatDash(5)).toBe("-----")
			expect(repeatDash(3)).toBe("---")
			
			const repeatSpace = repeat(" ")
			expect(repeatSpace(4)).toBe("    ")
		})

		// Property-based tests
		it("result length is string length times count", () => {
			fc.assert(
				fc.property(
					fc.string({ maxLength: 10 }),
					fc.integer({ min: 0, max: 100 }),
					(str, n) => {
						const result = repeat(str)(n)
						expect(result.length).toBe(str.length * n)
					}
				)
			)
		})

		it("repeat(s)(2) equals concat(s)(s)", () => {
			fc.assert(
				fc.property(
					fc.string(),
					(str) => {
						expect(repeat(str)(2)).toBe(concat(str)(str))
					}
				)
			)
		})

		it("repeat is idempotent for n=0 and n=1", () => {
			fc.assert(
				fc.property(
					fc.string(),
					(str) => {
						expect(repeat(str)(0)).toBe("")
						expect(repeat(str)(1)).toBe(str)
					}
				)
			)
		})

		it("contains original string n times", () => {
			fc.assert(
				fc.property(
					fc.string({ minLength: 1, maxLength: 10 }),
					fc.integer({ min: 1, max: 20 }),
					(str, n) => {
						const result = repeat(str)(n)
						const matches = result.split(str).length - 1
						expect(matches).toBe(n)
					}
				)
			)
		})
	})

	describe("combining use cases", () => {
		it("builds URLs", () => {
			const baseUrl = "https://example.com"
			const addPath = concat(baseUrl)
			expect(addPath("/api/users")).toBe("https://example.com/api/users")
			expect(addPath("/about")).toBe("https://example.com/about")
		})

		it("adds file extensions", () => {
			const addExtension = concatTo(".txt")
			expect(addExtension("document")).toBe("document.txt")
			expect(addExtension("readme")).toBe("readme.txt")
		})

		it("creates separators", () => {
			const separator = repeat("=")(50)
			expect(separator.length).toBe(50)
			expect(separator).toBe("==================================================")
		})

		it("builds indentation", () => {
			const indent = (level: number) => repeat("  ")(level)
			expect(indent(0) + "root").toBe("root")
			expect(indent(1) + "child").toBe("  child")
			expect(indent(2) + "grandchild").toBe("    grandchild")
		})

		it("creates patterns", () => {
			const pattern = repeat("+-")(5)
			expect(pattern).toBe("+-+-+-+-+-")
		})
	})

	describe("currying and composition", () => {
		it("all functions are curried", () => {
			expect(typeof concat("a")).toBe("function")
			expect(typeof concatTo("a")).toBe("function")
			expect(typeof repeat("a")).toBe("function")
		})

		it("can be composed", () => {
			const exclaim = concatTo("!")
			const repeat3 = repeat("!")(3)
			const emphasize = (str: string) => concat(str)(repeat3)
			
			expect(exclaim("Hello")).toBe("Hello!")
			expect(emphasize("Wow")).toBe("Wow!!!")
		})

		it("works with pipelines", () => {
			const process = (str: string) =>
				concat("[")(concat(str)("]"))
			
			expect(process("test")).toBe("[test]")
		})
	})
})