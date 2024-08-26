import { expect, test } from "vitest"

import isCharacter from "."

test("[isCharacter] (guards) returns true when passed a character", () => {
	expect(isCharacter("A")).toBe(true)
	expect(isCharacter(" ")).toBe(true)
})

test("[isCharacter] (guards) returns false when passed anything else", () => {
	expect(isCharacter("ABC")).toBe(false)
	expect(isCharacter("   ")).toBe(false)
	expect(isCharacter(0)).toBe(false)
	expect(isCharacter(true)).toBe(false)
	expect(isCharacter([1, 2, 3])).toBe(false)
	expect(isCharacter({ name: "Bob" })).toBe(false)
})
