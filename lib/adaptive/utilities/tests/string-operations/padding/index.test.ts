import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import pad from "../../../string/pad/index.ts"
import padStart from "../../../string/padStart/index.ts"
import padEnd from "../../../string/padEnd/index.ts"
import padStartTo from "../../../string/padStartTo/index.ts"
import padEndTo from "../../../string/padEndTo/index.ts"

describe("String Padding Behaviors", () => {
	describe("when padding both sides", () => {
		it("pads string equally on both sides", () => {
			const result = pad("-")(10)("test")
			expect(result).toBe("---test---")
			expect(result.length).toBe(10)
		})

		it("handles odd padding length", () => {
			const result = pad("-")(9)("test")
			expect(result).toBe("--test---")
			expect(result.length).toBe(9)
		})

		it("returns original when already at target length", () => {
			const result = pad("-")(4)("test")
			expect(result).toBe("test")
		})

		it("returns original when longer than target", () => {
			const result = pad("-")(2)("test")
			expect(result).toBe("test")
		})

		it("handles empty string", () => {
			const result = pad("-")(5)("")
			expect(result).toBe("-----")
		})

		it("handles multi-character padding", () => {
			const result = pad("ab")(10)("test")
			expect(result.length).toBe(10)
			expect(result).toContain("test")
		})

		it("handles zero length", () => {
			const result = pad("-")(0)("test")
			expect(result).toBe("test")
		})

		it("handles negative length", () => {
			const result = pad("-")(-5)("test")
			expect(result).toBe("test")
		})
	})

	describe("when padding start", () => {
		it("pads beginning of string", () => {
			const result = padStart("-")(10)("test")
			expect(result).toBe("------test")
			expect(result.length).toBe(10)
		})

		it("returns original when already at target length", () => {
			const result = padStart("-")(4)("test")
			expect(result).toBe("test")
		})

		it("returns original when longer than target", () => {
			const result = padStart("-")(2)("test")
			expect(result).toBe("test")
		})

		it("handles empty string", () => {
			const result = padStart("0")(5)("")
			expect(result).toBe("00000")
		})

		it("pads with spaces by default", () => {
			const result = padStart(" ")(8)("test")
			expect(result).toBe("    test")
		})

		it("handles multi-character padding", () => {
			const result = padStart("ab")(10)("test")
			expect(result.length).toBe(10)
			expect(result.endsWith("test")).toBe(true)
		})

		it("useful for number formatting", () => {
			const result = padStart("0")(5)("42")
			expect(result).toBe("00042")
		})
	})

	describe("when padding end", () => {
		it("pads end of string", () => {
			const result = padEnd("-")(10)("test")
			expect(result).toBe("test------")
			expect(result.length).toBe(10)
		})

		it("returns original when already at target length", () => {
			const result = padEnd("-")(4)("test")
			expect(result).toBe("test")
		})

		it("returns original when longer than target", () => {
			const result = padEnd("-")(2)("test")
			expect(result).toBe("test")
		})

		it("handles empty string", () => {
			const result = padEnd(".")(5)("")
			expect(result).toBe(".....")
		})

		it("pads with spaces for alignment", () => {
			const result = padEnd(" ")(10)("left")
			expect(result).toBe("left      ")
		})

		it("handles multi-character padding", () => {
			const result = padEnd("ab")(10)("test")
			expect(result.length).toBe(10)
			expect(result.startsWith("test")).toBe(true)
		})

		it("useful for table formatting", () => {
			const col1 = padEnd(" ")(15)("Name")
			const col2 = padEnd(" ")(10)("Age")
			expect(col1).toBe("Name           ")
			expect(col2).toBe("Age       ")
		})
	})

	describe("when padding start to length", () => {
		it("pads to exact length from start", () => {
			const result = padStartTo(10)("test")
			expect(result).toBe("      test")
			expect(result.length).toBe(10)
		})

		it("uses spaces by default", () => {
			const result = padStartTo(8)("hi")
			expect(result).toBe("      hi")
		})

		it("returns original when already at target", () => {
			const result = padStartTo(4)("test")
			expect(result).toBe("test")
		})

		it("returns original when longer", () => {
			const result = padStartTo(2)("test")
			expect(result).toBe("test")
		})

		it("handles empty string", () => {
			const result = padStartTo(3)("")
			expect(result).toBe("   ")
		})

		it("handles single character", () => {
			const result = padStartTo(5)("x")
			expect(result).toBe("    x")
		})
	})

	describe("when padding end to length", () => {
		it("pads to exact length from end", () => {
			const result = padEndTo(10)("test")
			expect(result).toBe("test      ")
			expect(result.length).toBe(10)
		})

		it("uses spaces by default", () => {
			const result = padEndTo(8)("hi")
			expect(result).toBe("hi      ")
		})

		it("returns original when already at target", () => {
			const result = padEndTo(4)("test")
			expect(result).toBe("test")
		})

		it("returns original when longer", () => {
			const result = padEndTo(2)("test")
			expect(result).toBe("test")
		})

		it("handles empty string", () => {
			const result = padEndTo(3)("")
			expect(result).toBe("   ")
		})

		it("handles single character", () => {
			const result = padEndTo(5)("x")
			expect(result).toBe("x    ")
		})
	})

	describe("padding use cases", () => {
		it("aligns numbers in columns", () => {
			const nums = ["1", "42", "100", "7"]
			const aligned = nums.map(padStart("0")(3))
			expect(aligned).toEqual(["001", "042", "100", "007"])
		})

		it("creates fixed-width fields", () => {
			const fields = ["John", "Jane", "Bob"]
			const fixed = fields.map(padEnd(" ")(10))
			expect(fixed).toEqual(["John      ", "Jane      ", "Bob       "])
		})

		it("centers text", () => {
			const center = (len: number) => (str: string) => {
				const totalPad = Math.max(0, len - str.length)
				const leftPad = Math.floor(totalPad / 2)
				const rightPad = totalPad - leftPad
				return " ".repeat(leftPad) + str + " ".repeat(rightPad)
			}
			
			expect(center(10)("test")).toBe("   test   ")
			expect(center(9)("test")).toBe("  test   ")
		})

		it("formats binary numbers", () => {
			const binary = (5).toString(2)
			const formatted = padStart("0")(8)(binary)
			expect(formatted).toBe("00000101")
		})
	})
})