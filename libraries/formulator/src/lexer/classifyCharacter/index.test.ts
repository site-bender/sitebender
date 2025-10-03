import { assertEquals } from "@std/assert"
import fc from "fast-check"

import classifyCharacter from "./index.ts"

Deno.test("classifyCharacter - classifies ASCII digits", () => {
	assertEquals(classifyCharacter("0"), { _tag: "digit", character: "0" })
	assertEquals(classifyCharacter("5"), { _tag: "digit", character: "5" })
	assertEquals(classifyCharacter("9"), { _tag: "digit", character: "9" })
})

Deno.test("classifyCharacter - classifies ASCII uppercase", () => {
	assertEquals(classifyCharacter("A"), { _tag: "Letter", character: "A" })
	assertEquals(classifyCharacter("M"), { _tag: "Letter", character: "M" })
	assertEquals(classifyCharacter("Z"), { _tag: "Letter", character: "Z" })
})

Deno.test("classifyCharacter - classifies ASCII lowercase", () => {
	assertEquals(classifyCharacter("a"), { _tag: "letter", character: "a" })
	assertEquals(classifyCharacter("m"), { _tag: "letter", character: "m" })
	assertEquals(classifyCharacter("z"), { _tag: "letter", character: "z" })
})

Deno.test("classifyCharacter - classifies Greek lowercase letters", () => {
	assertEquals(classifyCharacter("α"), { _tag: "alpha", character: "α" })
	assertEquals(classifyCharacter("β"), { _tag: "beta", character: "β" })
	assertEquals(classifyCharacter("π"), { _tag: "pi", character: "π" })
	assertEquals(classifyCharacter("ω"), { _tag: "omega", character: "ω" })
})

Deno.test("classifyCharacter - classifies Greek uppercase letters", () => {
	assertEquals(classifyCharacter("Α"), { _tag: "Alpha", character: "Α" })
	assertEquals(classifyCharacter("Β"), { _tag: "Beta", character: "Β" })
	assertEquals(classifyCharacter("Π"), { _tag: "Pi", character: "Π" })
	assertEquals(classifyCharacter("Ω"), { _tag: "Omega", character: "Ω" })
})

Deno.test("classifyCharacter - classifies multiply operators", () => {
	assertEquals(classifyCharacter("*"), { _tag: "multiply", character: "*" })
	assertEquals(classifyCharacter("×"), { _tag: "multiply", character: "×" })
	assertEquals(classifyCharacter("·"), { _tag: "multiply", character: "·" })
	assertEquals(classifyCharacter("⋅"), { _tag: "multiply", character: "⋅" })
	assertEquals(classifyCharacter("∗"), { _tag: "multiply", character: "∗" })
})

Deno.test("classifyCharacter - classifies divide operators", () => {
	assertEquals(classifyCharacter("/"), { _tag: "divide", character: "/" })
	assertEquals(classifyCharacter("÷"), { _tag: "divide", character: "÷" })
	assertEquals(classifyCharacter("∕"), { _tag: "divide", character: "∕" })
})

Deno.test("classifyCharacter - classifies plus operators", () => {
	assertEquals(classifyCharacter("+"), { _tag: "plus", character: "+" })
	assertEquals(classifyCharacter("➕"), { _tag: "plus", character: "➕" })
})

Deno.test("classifyCharacter - classifies minus operators", () => {
	assertEquals(classifyCharacter("-"), { _tag: "minus", character: "-" })
	assertEquals(classifyCharacter("−"), { _tag: "minus", character: "−" })
	assertEquals(classifyCharacter("➖"), { _tag: "minus", character: "➖" })
})

Deno.test("classifyCharacter - classifies power operators", () => {
	assertEquals(classifyCharacter("^"), { _tag: "power", character: "^" })
	assertEquals(classifyCharacter("‸"), { _tag: "power", character: "‸" })
})

Deno.test("classifyCharacter - classifies parentheses", () => {
	assertEquals(classifyCharacter("("), { _tag: "leftParen", character: "(" })
	assertEquals(classifyCharacter(")"), { _tag: "rightParen", character: ")" })
	assertEquals(classifyCharacter("❨"), { _tag: "leftParen", character: "❨" })
	assertEquals(classifyCharacter("❩"), { _tag: "rightParen", character: "❩" })
})

Deno.test("classifyCharacter - classifies decimal point", () => {
	assertEquals(classifyCharacter("."), { _tag: "decimalPoint", character: "." })
})

Deno.test("classifyCharacter - classifies whitespace", () => {
	assertEquals(classifyCharacter(" "), { _tag: "whitespace" })
	assertEquals(classifyCharacter("\t"), { _tag: "whitespace" })
	assertEquals(classifyCharacter("\n"), { _tag: "whitespace" })
	assertEquals(classifyCharacter("\r"), { _tag: "whitespace" })
	assertEquals(classifyCharacter("\u00a0"), { _tag: "whitespace" })
})

Deno.test("classifyCharacter - returns unknown for unmapped chars", () => {
	assertEquals(classifyCharacter("@"), { _tag: "unknown", character: "@" })
	assertEquals(classifyCharacter("#"), { _tag: "unknown", character: "#" })
	assertEquals(classifyCharacter("$"), { _tag: "unknown", character: "$" })
})

Deno.test("classifyCharacter - property: deterministic", () => {
	fc.assert(
		fc.property(
			fc.string({ minLength: 1, maxLength: 1 }),
			(character: string) => {
				const result1 = classifyCharacter(character)
				const result2 = classifyCharacter(character)
				if (result1._tag !== result2._tag) return false
				if ("character" in result1 && "character" in result2) {
					return result1.character === result2.character
				}
				return true
			},
		),
	)
})

Deno.test("classifyCharacter - property: ASCII 0-9 always digit", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: 0, max: 9 }),
			(digit: number) => {
				const result = classifyCharacter(String(digit))
				return result._tag === "digit" && result.character === String(digit)
			},
		),
	)
})

Deno.test("classifyCharacter - property: ASCII A-Z always Letter", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: 0x41, max: 0x5a }),
			(code: number) => {
				const char = String.fromCharCode(code)
				const result = classifyCharacter(char)
				return result._tag === "Letter" && result.character === char
			},
		),
	)
})

Deno.test("classifyCharacter - property: ASCII a-z always letter", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: 0x61, max: 0x7a }),
			(code: number) => {
				const char = String.fromCharCode(code)
				const result = classifyCharacter(char)
				return result._tag === "letter" && result.character === char
			},
		),
	)
})
