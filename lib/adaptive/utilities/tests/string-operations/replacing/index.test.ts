import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import fc from "fast-check"

// Import replacing functions
import replace from "../../../string/replace/index.ts"
import replaceAll from "../../../string/replaceAll/index.ts"

describe("String Replacing Behaviors", () => {
	describe("replace - replaces first occurrence", () => {
		it("replaces first match with string pattern", () => {
			expect(replace("o")("0")("hello world")).toBe("hell0 world")
			expect(replace("l")("L")("hello")).toBe("heLlo")
			expect(replace("test")("TEST")("test test")).toBe("TEST test")
		})

		it("replaces with regex pattern", () => {
			expect(replace(/\d+/)("X")("abc123def456")).toBe("abcXdef456")
			expect(replace(/[aeiou]/)("*")("hello")).toBe("h*llo")
			expect(replace(/^./)("X")("test")).toBe("Xest")
		})

		it("handles no match", () => {
			expect(replace("x")("y")("hello")).toBe("hello")
			expect(replace(/\d/)("X")("hello")).toBe("hello")
		})

		it("handles empty string pattern", () => {
			expect(replace("")("X")("hello")).toBe("Xhello")
			expect(replace("")("_")("")).toBe("_")
		})

		it("handles empty replacement", () => {
			expect(replace("l")("")("hello")).toBe("helo")
			expect(replace("test")("")("test case")).toBe(" case")
		})

		it("supports replacement function", () => {
			const upper = (match: string) => match.toUpperCase()
			expect(replace(/[aeiou]/)(upper)("hello")).toBe("hEllo")
			expect(replace(/\d+/)((m) => `[${m}]`)("test123")).toBe("test[123]")
		})

		it("is curried", () => {
			const censor = replace(/bad/)("***")
			expect(censor("bad word")).toBe("*** word")
			expect(censor("not bad")).toBe("not ***")
		})

		// Property-based tests
		it("replacing with same value returns original", () => {
			fc.assert(
				fc.property(
					fc.string(),
					(str) => {
						// Replace first char with itself
						if (str.length > 0) {
							const firstChar = str[0]
							expect(replace(firstChar)(firstChar)(str)).toBe(str)
						}
					}
				)
			)
		})

		it("result contains replacement if match found", () => {
			fc.assert(
				fc.property(
					fc.string({ minLength: 1 }),
					fc.string({ minLength: 1, maxLength: 5 }),
					(str, replacement) => {
						const char = str[0]
						const result = replace(char)(replacement)(str)
						if (str.includes(char)) {
							expect(result.includes(replacement)).toBe(true)
						}
					}
				)
			)
		})
	})

	describe("replaceAll - replaces all occurrences", () => {
		it("replaces all matches with string pattern", () => {
			expect(replaceAll("o")("0")("hello world")).toBe("hell0 w0rld")
			expect(replaceAll("l")("L")("hello")).toBe("heLLo")
			expect(replaceAll("test")("TEST")("test test")).toBe("TEST TEST")
		})

		it("replaces with global regex", () => {
			expect(replaceAll(/\d+/g)("X")("abc123def456")).toBe("abcXdefX")
			expect(replaceAll(/[aeiou]/g)("*")("hello world")).toBe("h*ll* w*rld")
		})

		it("auto-adds global flag to regex", () => {
			expect(replaceAll(/\d+/)("X")("abc123def456")).toBe("abcXdefX")
			expect(replaceAll(/[aeiou]/)("*")("hello")).toBe("h*ll*")
		})

		it("handles no match", () => {
			expect(replaceAll("x")("y")("hello")).toBe("hello")
			expect(replaceAll(/\d/g)("X")("hello")).toBe("hello")
		})

		it("handles empty string pattern", () => {
			expect(replaceAll("")("X")("abc")).toBe("XaXbXcX")
			expect(replaceAll("")("_")("")).toBe("_")
		})

		it("handles empty replacement", () => {
			expect(replaceAll("l")("")("hello")).toBe("heo")
			expect(replaceAll("test")("")("test case test")).toBe(" case ")
		})

		it("supports replacement function", () => {
			const upper = (match: string) => match.toUpperCase()
			expect(replaceAll(/[aeiou]/g)(upper)("hello world")).toBe("hEllO wOrld")
			expect(replaceAll(/\d+/g)((m) => `[${m}]`)("a1b22c333")).toBe("a[1]b[22]c[333]")
		})

		it("handles special replacement patterns", () => {
			expect(replaceAll("name")("$&!")("name name")).toBe("name! name!")
		})

		it("is curried", () => {
			const censorVowels = replaceAll(/[aeiou]/gi)("*")
			expect(censorVowels("Hello World")).toBe("H*ll* W*rld")
			expect(censorVowels("AEIOU")).toBe("*****")
		})

		// Property-based tests
		it("replaces all occurrences", () => {
			fc.assert(
				fc.property(
					fc.string({ minLength: 1, maxLength: 3 }),
					fc.string({ minLength: 1, maxLength: 3 }),
					fc.string(),
					(search, replacement, str) => {
						if (search && str.includes(search)) {
							const result = replaceAll(search)(replacement)(str)
							const originalCount = str.split(search).length - 1
							const replacementCount = result.split(replacement).length - 1
							expect(replacementCount).toBeGreaterThanOrEqual(originalCount)
						}
					}
				)
			)
		})

		it("empty replacement removes all occurrences", () => {
			fc.assert(
				fc.property(
					fc.string({ minLength: 1, maxLength: 2 }),
					fc.string(),
					(search, str) => {
						const result = replaceAll(search)("")(str)
						expect(result.includes(search)).toBe(false)
					}
				)
			)
		})

		it("result length changes predictably", () => {
			fc.assert(
				fc.property(
					fc.char(),
					fc.string({ minLength: 1, maxLength: 5 }),
					fc.string(),
					(searchChar, replacement, str) => {
						const count = str.split(searchChar).length - 1
						const result = replaceAll(searchChar)(replacement)(str)
						const expectedLength = str.length - count + (count * replacement.length)
						expect(result.length).toBe(expectedLength)
					}
				)
			)
		})
	})

	describe("replacing use cases", () => {
		it("sanitizes user input", () => {
			const sanitize = replaceAll(/<[^>]*>/g)("")
			expect(sanitize("<script>alert('xss')</script>")).toBe("alert('xss')")
			expect(sanitize("Hello <b>world</b>!")).toBe("Hello world!")
		})

		it("formats phone numbers", () => {
			const formatPhone = replace(/(\d{3})(\d{3})(\d{4})/)("($1) $2-$3")
			expect(formatPhone("5551234567")).toBe("(555) 123-4567")
		})

		it("censors sensitive words", () => {
			const censor = replaceAll(/password/gi)("****")
			expect(censor("My PASSWORD is password123")).toBe("My **** is ****123")
		})

		it("normalizes whitespace", () => {
			const normalize = replaceAll(/\s+/g)(" ")
			expect(normalize("hello    world\n\ttest")).toBe("hello world test")
		})

		it("escapes special characters", () => {
			const escapeHtml = (str: string) =>
				replaceAll("&")("&amp;")(
					replaceAll("<")("&lt;")(
						replaceAll(">")("&gt;")(str)
					)
				)
			expect(escapeHtml("<div>Hello & goodbye</div>")).toBe("&lt;div&gt;Hello &amp; goodbye&lt;/div&gt;")
		})

		it("converts placeholders", () => {
			const template = "Hello {name}, you have {count} messages"
			const fillTemplate = (data: Record<string, string>) => (tmpl: string) => {
				let result = tmpl
				for (const [key, value] of Object.entries(data)) {
					result = replaceAll(`{${key}}`)(value)(result)
				}
				return result
			}
			
			const fill = fillTemplate({ name: "John", count: "5" })
			expect(fill(template)).toBe("Hello John, you have 5 messages")
		})
	})

	describe("currying and composition", () => {
		it("all functions are curried", () => {
			expect(typeof replace("a")("b")).toBe("function")
			expect(typeof replaceAll("a")("b")).toBe("function")
		})

		it("can be composed for multi-step replacements", () => {
			const clean = (str: string) =>
				replaceAll(/\s+/g)(" ")(
					replaceAll(/[^\w\s]/g)("")(str)
				)
			
			expect(clean("Hello,   world!!!")).toBe("Hello world")
		})

		it("works with conditional logic", () => {
			const smartReplace = (str: string) => {
				if (str.includes("@")) {
					return replace(/@.*/)("@hidden.com")(str)
				}
				return str
			}
			
			expect(smartReplace("user@example.com")).toBe("user@hidden.com")
			expect(smartReplace("no email here")).toBe("no email here")
		})
	})
})