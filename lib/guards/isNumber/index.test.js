import { expect, test } from "vitest"

import isNumber from "."

test("[isNumber] (guards) returns true when passed a boolean", () => {
	expect(isNumber(42)).toBe(true)
	expect(isNumber(3.1415)).toBe(true)
	expect(isNumber("3.1415")).toBe(true)
})

test("[isNumber] (guards) returns true when passed a boolean", () => {
	expect(isNumber("true")).toBe(false)
	expect(isNumber("false")).toBe(false)
	expect(isNumber(true)).toBe(false)
	expect(isNumber([])).toBe(false)
	expect(isNumber(["true"])).toBe(false)
	expect(isNumber({})).toBe(false)
	expect(isNumber({ value: true })).toBe(false)
})
