import { expect, test } from "vitest"

import isEven from "."

test("[isEven] (guards) returns true when passed a boolean", () => {
	expect(isEven(0)).toBe(true)
	expect(isEven(1)).toBe(false)
})

test("[isEven] (guards) returns true when passed a boolean", () => {
	expect(isEven("true")).toBe(false)
	expect(isEven("false")).toBe(false)
	expect(isEven(true)).toBe(false)
	expect(isEven(false)).toBe(false)
	expect(isEven([])).toBe(false)
	expect(isEven(["true"])).toBe(false)
	expect(isEven({})).toBe(false)
	expect(isEven({ value: true })).toBe(false)
})
