import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import fc from "fast-check"

// Import trimming functions
import trim from "../../../string/trim/index.ts"
import trimStart from "../../../string/trimStart/index.ts"
import trimEnd from "../../../string/trimEnd/index.ts"

describe("String Trimming Behaviors", () => {
	describe("trim - removes whitespace from both ends", () => {
		it("removes spaces from both ends", () => {
			expect(trim("  hello  ")).toBe("hello")
			expect(trim("   test   ")).toBe("test")
			expect(trim(" a ")).toBe("a")
		})

		it("removes various whitespace characters", () => {
			expect(trim("\thello\t")).toBe("hello")
			expect(trim("\nhello\n")).toBe("hello")
			expect(trim("\r\nhello\r\n")).toBe("hello")
			expect(trim("  \t\n  hello  \n\t  ")).toBe("hello")
		})

		it("handles strings without whitespace", () => {
			expect(trim("hello")).toBe("hello")
			expect(trim("test123")).toBe("test123")
			expect(trim("")).toBe("")
		})

		it("handles only whitespace", () => {
			expect(trim("   ")).toBe("")
			expect(trim("\t\n\r")).toBe("")
			expect(trim("  \t  \n  ")).toBe("")
		})

		it("preserves internal whitespace", () => {
			expect(trim("  hello world  ")).toBe("hello world")
			expect(trim("\ta b c\n")).toBe("a b c")
			expect(trim("  multi  space  ")).toBe("multi  space")
		})

		// Property-based tests
		it("is idempotent - f(f(x)) = f(x)", () => {
			fc.assert(
				fc.property(
					fc.string(),
					(str) => {
						const once = trim(str)
						const twice = trim(trim(str))
						expect(twice).toBe(once)
					}
				)
			)
		})

		it("result never starts or ends with whitespace", () => {
			fc.assert(
				fc.property(
					fc.string(),
					(str) => {
						const result = trim(str)
						if (result.length > 0) {
							expect(/^\s/.test(result)).toBe(false)
							expect(/\s$/.test(result)).toBe(false)
						}
					}
				)
			)
		})

		it("result is substring of original", () => {
			fc.assert(
				fc.property(
					fc.string(),
					(str) => {
						const result = trim(str)
						expect(str.includes(result)).toBe(true)
					}
				)
			)
		})
	})

	describe("trimStart - removes whitespace from start", () => {
		it("removes spaces from start only", () => {
			expect(trimStart("  hello")).toBe("hello")
			expect(trimStart("   test   ")).toBe("test   ")
			expect(trimStart(" a ")).toBe("a ")
		})

		it("removes various leading whitespace", () => {
			expect(trimStart("\thello")).toBe("hello")
			expect(trimStart("\nhello\n")).toBe("hello\n")
			expect(trimStart("\r\n\thello")).toBe("hello")
			expect(trimStart("  \t\n  hello")).toBe("hello")
		})

		it("handles strings without leading whitespace", () => {
			expect(trimStart("hello")).toBe("hello")
			expect(trimStart("test  ")).toBe("test  ")
			expect(trimStart("")).toBe("")
		})

		it("handles only whitespace", () => {
			expect(trimStart("   ")).toBe("")
			expect(trimStart("\t\n\r")).toBe("")
		})

		it("preserves trailing whitespace", () => {
			expect(trimStart("  hello  ")).toBe("hello  ")
			expect(trimStart("\ttest\n")).toBe("test\n")
		})

		// Property-based tests
		it("is idempotent", () => {
			fc.assert(
				fc.property(
					fc.string(),
					(str) => {
						const once = trimStart(str)
						const twice = trimStart(trimStart(str))
						expect(twice).toBe(once)
					}
				)
			)
		})

		it("result never starts with whitespace", () => {
			fc.assert(
				fc.property(
					fc.string(),
					(str) => {
						const result = trimStart(str)
						if (result.length > 0) {
							expect(/^\s/.test(result)).toBe(false)
						}
					}
				)
			)
		})

		it("result length <= original length", () => {
			fc.assert(
				fc.property(
					fc.string(),
					(str) => {
						const result = trimStart(str)
						expect(result.length).toBeLessThanOrEqual(str.length)
					}
				)
			)
		})
	})

	describe("trimEnd - removes whitespace from end", () => {
		it("removes spaces from end only", () => {
			expect(trimEnd("hello  ")).toBe("hello")
			expect(trimEnd("   test   ")).toBe("   test")
			expect(trimEnd(" a ")).toBe(" a")
		})

		it("removes various trailing whitespace", () => {
			expect(trimEnd("hello\t")).toBe("hello")
			expect(trimEnd("\nhello\n")).toBe("\nhello")
			expect(trimEnd("hello\r\n\t")).toBe("hello")
			expect(trimEnd("hello  \t\n  ")).toBe("hello")
		})

		it("handles strings without trailing whitespace", () => {
			expect(trimEnd("hello")).toBe("hello")
			expect(trimEnd("  test")).toBe("  test")
			expect(trimEnd("")).toBe("")
		})

		it("handles only whitespace", () => {
			expect(trimEnd("   ")).toBe("")
			expect(trimEnd("\t\n\r")).toBe("")
		})

		it("preserves leading whitespace", () => {
			expect(trimEnd("  hello  ")).toBe("  hello")
			expect(trimEnd("\ntest\t")).toBe("\ntest")
		})

		// Property-based tests
		it("is idempotent", () => {
			fc.assert(
				fc.property(
					fc.string(),
					(str) => {
						const once = trimEnd(str)
						const twice = trimEnd(trimEnd(str))
						expect(twice).toBe(once)
					}
				)
			)
		})

		it("result never ends with whitespace", () => {
			fc.assert(
				fc.property(
					fc.string(),
					(str) => {
						const result = trimEnd(str)
						if (result.length > 0) {
							expect(/\s$/.test(result)).toBe(false)
						}
					}
				)
			)
		})

		it("result length <= original length", () => {
			fc.assert(
				fc.property(
					fc.string(),
					(str) => {
						const result = trimEnd(str)
						expect(result.length).toBeLessThanOrEqual(str.length)
					}
				)
			)
		})
	})

	describe("trimming relationships", () => {
		it("trim = trimStart + trimEnd", () => {
			fc.assert(
				fc.property(
					fc.string(),
					(str) => {
						const trimBoth = trim(str)
						const trimStartThenEnd = trimEnd(trimStart(str))
						const trimEndThenStart = trimStart(trimEnd(str))
						expect(trimBoth).toBe(trimStartThenEnd)
						expect(trimBoth).toBe(trimEndThenStart)
					}
				)
			)
		})

		it("trimming empty or whitespace-only strings returns empty", () => {
			const whitespaceStrings = ["", " ", "  ", "\t", "\n", "\r\n", "  \t\n  "]
			whitespaceStrings.forEach(str => {
				expect(trim(str)).toBe("")
				expect(trimStart(str)).toBe("")
				expect(trimEnd(str)).toBe("")
			})
		})
	})

	describe("trimming use cases", () => {
		it("cleans user input", () => {
			const userInput = "  john.doe@example.com  \n"
			expect(trim(userInput)).toBe("john.doe@example.com")
		})

		it("normalizes form data", () => {
			const formData = {
				name: "  John Doe  ",
				email: "\tuser@example.com\n",
				message: "  Hello!  "
			}
			
			const cleaned = {
				name: trim(formData.name),
				email: trim(formData.email),
				message: trim(formData.message)
			}
			
			expect(cleaned.name).toBe("John Doe")
			expect(cleaned.email).toBe("user@example.com")
			expect(cleaned.message).toBe("Hello!")
		})

		it("processes CSV data", () => {
			const csvRow = "  John  ,  Doe  ,  30  "
			const fields = csvRow.split(",").map(trim)
			expect(fields).toEqual(["John", "Doe", "30"])
		})

		it("cleans configuration values", () => {
			const config = "API_KEY=abc123  \nAPI_URL=  https://api.example.com"
			const lines = config.split("\n").map(line => {
				const [key, value] = line.split("=")
				return `${trim(key)}=${trim(value)}`
			})
			
			expect(lines[0]).toBe("API_KEY=abc123")
			expect(lines[1]).toBe("API_URL=https://api.example.com")
		})

		it("formats code indentation", () => {
			const code = "\t\tfunction test() {\n\t\t\treturn true\n\t\t}"
			const lines = code.split("\n")
			const formatted = lines.map(trimEnd).join("\n")
			expect(formatted).toBe("\t\tfunction test() {\n\t\t\treturn true\n\t\t}")
		})
	})

	describe("performance characteristics", () => {
		it("all trim functions handle unicode correctly", () => {
			expect(trim("  hello世界  ")).toBe("hello世界")
			expect(trimStart("  🎉party")).toBe("🎉party")
			expect(trimEnd("emoji🎊  ")).toBe("emoji🎊")
		})

		it("handles zero-width spaces", () => {
			// Regular trim doesn't remove zero-width spaces
			const zwsp = "\u200B"
			expect(trim(`  ${zwsp}hello${zwsp}  `)).toBe(`${zwsp}hello${zwsp}`)
		})
	})
})