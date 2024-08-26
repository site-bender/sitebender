import { expect, test } from "vitest"

import isMemberOf from "."

const COLORS = ["red", "green", "blue"]

test("[isMemberOf] (guards) returns true when passed a member of the set", () => {
	expect(isMemberOf(COLORS)("red")).toBe(true)
	expect(isMemberOf(COLORS)("green")).toBe(true)
	expect(isMemberOf(COLORS)("blue")).toBe(true)
})

test("[isMemberOf] (guards) returns false when value is not a member of the set", () => {
	expect(isMemberOf(COLORS)("cyan")).toBe(false)
	expect(isMemberOf(COLORS)(0)).toBe(false)
	expect(isMemberOf(COLORS)([])).toBe(false)
	expect(isMemberOf(COLORS)(["red"])).toBe(false)
	expect(isMemberOf(COLORS)({})).toBe(false)
	expect(isMemberOf(COLORS)({ value: true })).toBe(false)
})
