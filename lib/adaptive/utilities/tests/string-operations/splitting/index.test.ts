import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import * as fc from "fast-check"
import split from "../../../string/split/index.ts"
import splitAt from "../../../string/splitAt/index.ts"
import splitEvery from "../../../string/splitEvery/index.ts"

describe("String Splitting Behaviors", () => {
	describe("when splitting by delimiter", () => {
		it("splits string by single character", () => {
			const result = split(",")("a,b,c,d")
			expect(result).toEqual(["a", "b", "c", "d"])
		})

		it("splits string by multi-character delimiter", () => {
			const result = split("::")("one::two::three")
			expect(result).toEqual(["one", "two", "three"])
		})

		it("handles missing delimiter", () => {
			const result = split(",")("no commas here")
			expect(result).toEqual(["no commas here"])
		})

		it("handles empty string", () => {
			const result = split(",")("")
			expect(result).toEqual([""])
		})

		it("handles delimiter at start", () => {
			const result = split(",")(",a,b,c")
			expect(result).toEqual(["", "a", "b", "c"])
		})

		it("handles delimiter at end", () => {
			const result = split(",")("a,b,c,")
			expect(result).toEqual(["a", "b", "c", ""])
		})

		it("handles consecutive delimiters", () => {
			const result = split(",")("a,,b,,,c")
			expect(result).toEqual(["a", "", "b", "", "", "c"])
		})

		it("splits by whitespace", () => {
			const result = split(" ")("hello world test")
			expect(result).toEqual(["hello", "world", "test"])
		})

		it("splits by newline", () => {
			const result = split("\n")("line1\nline2\nline3")
			expect(result).toEqual(["line1", "line2", "line3"])
		})

		it("handles regex delimiter", () => {
			const result = split(/\s+/)("hello  world\ttest\nline")
			expect(result).toEqual(["hello", "world", "test", "line"])
		})

		it("splits by empty string into characters", () => {
			const result = split("")("hello")
			expect(result).toEqual(["h", "e", "l", "l", "o"])
		})

		it("handles special characters", () => {
			const result = split(".")("192.168.1.1")
			expect(result).toEqual(["192", "168", "1", "1"])
		})

		it("handles unicode delimiters", () => {
			const result = split("🔥")("hot🔥stuff🔥here")
			expect(result).toEqual(["hot", "stuff", "here"])
		})
	})

	describe("when splitting at index", () => {
		it("splits string at positive index", () => {
			const result = splitAt(5)("hello world")
			expect(result).toEqual(["hello", " world"])
		})

		it("splits at index 0", () => {
			const result = splitAt(0)("hello")
			expect(result).toEqual(["", "hello"])
		})

		it("splits at string length", () => {
			const result = splitAt(5)("hello")
			expect(result).toEqual(["hello", ""])
		})

		it("handles index beyond string length", () => {
			const result = splitAt(10)("hello")
			expect(result).toEqual(["hello", ""])
		})

		it("handles negative index", () => {
			const result = splitAt(-3)("hello world")
			expect(result).toEqual(["hello wo", "rld"])
		})

		it("handles empty string", () => {
			const result = splitAt(0)("")
			expect(result).toEqual(["", ""])

			const result2 = splitAt(5)("")
			expect(result2).toEqual(["", ""])
		})

		it("preserves original string", () => {
			const str = "immutable"
			const result = splitAt(5)(str)
			expect(result).toEqual(["immut", "able"])
			expect(str).toBe("immutable")
		})

		it("handles unicode correctly", () => {
			const result = splitAt(2)("😀🎉🚀")
			expect(result).toEqual(["😀🎉", "🚀"])
		})

		it("splits between words", () => {
			const result = splitAt(5)("hello world")
			expect(result).toEqual(["hello", " world"])
		})

		it("handles single character", () => {
			const result = splitAt(0)("a")
			expect(result).toEqual(["", "a"])

			const result2 = splitAt(1)("a")
			expect(result2).toEqual(["a", ""])
		})
	})

	describe("when splitting every n characters", () => {
		it("splits into equal chunks", () => {
			const result = splitEvery(3)("abcdefghi")
			expect(result).toEqual(["abc", "def", "ghi"])
		})

		it("handles remainder chunk", () => {
			const result = splitEvery(3)("abcdefgh")
			expect(result).toEqual(["abc", "def", "gh"])
		})

		it("handles chunk size of 1", () => {
			const result = splitEvery(1)("hello")
			expect(result).toEqual(["h", "e", "l", "l", "o"])
		})

		it("handles chunk size equal to string length", () => {
			const result = splitEvery(5)("hello")
			expect(result).toEqual(["hello"])
		})

		it("handles chunk size greater than string length", () => {
			const result = splitEvery(10)("hello")
			expect(result).toEqual(["hello"])
		})

		it("handles empty string", () => {
			const result = splitEvery(3)("")
			expect(result).toEqual([])
		})

		it("splits binary string", () => {
			const result = splitEvery(8)("110100101101001011010010")
			expect(result).toEqual(["11010010", "11010010", "11010010"])
		})

		it("splits hex color codes", () => {
			const result = splitEvery(2)("FF5733")
			expect(result).toEqual(["FF", "57", "33"])
		})

		it("handles large chunk sizes", () => {
			const result = splitEvery(100)("short string")
			expect(result).toEqual(["short string"])
		})

		it("splits DNA sequence", () => {
			const result = splitEvery(3)("ATGCGATCGATA")
			expect(result).toEqual(["ATG", "CGA", "TCG", "ATA"])
		})

		it("handles unicode strings", () => {
			const result = splitEvery(2)("🚀🎉😀🔥")
			expect(result).toEqual(["🚀🎉", "😀🔥"])
		})
	})

	describe("property-based tests", () => {
		it("split and join are inverse operations", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.string({ minLength: 1, maxLength: 3 }),
					(str, delimiter) => {
						if (!str.includes(delimiter)) {
							const parts = split(delimiter)(str)
							const joined = parts.join(delimiter)
							expect(joined).toBe(str)
						}
					},
				),
			)
		})

		it("splitAt produces two parts that concatenate to original", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.integer(),
					(str, index) => {
						const [left, right] = splitAt(index)(str)
						expect(left + right).toBe(str)
					},
				),
			)
		})

		it("splitAt parts have correct lengths", () => {
			fc.assert(
				fc.property(
					fc.string({ minLength: 1 }),
					(str) => {
						const index = Math.floor(str.length / 2)
						const [left, right] = splitAt(index)(str)
						expect(left.length).toBe(Math.min(index, str.length))
						expect(left.length + right.length).toBe(str.length)
					},
				),
			)
		})

		it("splitEvery chunks sum to original length", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.integer({ min: 1, max: 100 }),
					(str, n) => {
						const chunks = splitEvery(n)(str)
						const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0)
						expect(totalLength).toBe(str.length)
					},
				),
			)
		})

		it("splitEvery chunks are at most n characters", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.integer({ min: 1, max: 100 }),
					(str, n) => {
						const chunks = splitEvery(n)(str)
						chunks.forEach((chunk, i) => {
							if (i < chunks.length - 1) {
								expect(chunk.length).toBe(n)
							} else {
								expect(chunk.length).toBeLessThanOrEqual(n)
							}
						})
					},
				),
			)
		})

		it("split produces at least one element", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.string(),
					(str, delimiter) => {
						const parts = split(delimiter)(str)
						expect(parts.length).toBeGreaterThanOrEqual(1)
					},
				),
			)
		})

		it("splitEvery concatenation equals original", () => {
			fc.assert(
				fc.property(
					fc.string(),
					fc.integer({ min: 1, max: 100 }),
					(str, n) => {
						const chunks = splitEvery(n)(str)
						const concatenated = chunks.join("")
						expect(concatenated).toBe(str)
					},
				),
			)
		})
	})

	describe("practical use cases", () => {
		it("parses CSV line", () => {
			const parseCsv = split(",")
			const line = "John,Doe,30,Engineer"
			const fields = parseCsv(line)
			expect(fields).toEqual(["John", "Doe", "30", "Engineer"])
		})

		it("splits path into segments", () => {
			const splitPath = split("/")
			const path = "/home/user/documents/file.txt"
			const segments = splitPath(path)
			expect(segments).toEqual(["", "home", "user", "documents", "file.txt"])
		})

		it("tokenizes sentence", () => {
			const tokenize = split(/\s+/)
			const sentence = "The   quick brown   fox"
			const tokens = tokenize(sentence)
			expect(tokens).toEqual(["The", "quick", "brown", "fox"])
		})

		it("splits camelCase at boundaries", () => {
			const str = "firstName"
			const [first, rest] = splitAt(5)(str)
			expect(first).toBe("first")
			expect(rest).toBe("Name")
		})

		it("formats phone number", () => {
			const formatPhone = (phone: string) => {
				const digits = phone.replace(/\D/g, "")
				const parts = [
					digits.slice(0, 3),
					digits.slice(3, 6),
					digits.slice(6, 10),
				]
				return parts.filter(p => p.length > 0).join("-")
			}

			expect(formatPhone("1234567890")).toBe("123-456-7890")
		})

		it("chunks data for pagination", () => {
			const items = "abcdefghijklmnopqrstuvwxyz"
			const pageSize = 5
			const pages = splitEvery(pageSize)(items)
			expect(pages).toEqual([
				"abcde",
				"fghij",
				"klmno",
				"pqrst",
				"uvwxy",
				"z",
			])
		})

		it("splits base64 for formatting", () => {
			const base64 = "SGVsbG9Xb3JsZEhlbGxvV29ybGRIZWxsb1dvcmxk"
			const lines = splitEvery(16)(base64)
			expect(lines).toEqual([
				"SGVsbG9Xb3JsZEhl",
				"bGxvV29ybGRIZWxs",
				"b1dvcmxk",
			])
		})
	})
})