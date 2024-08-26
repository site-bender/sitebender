import { expect, test } from "vitest"

import isBoolean from "."

test("[isBoolean] (guards) returns true when passed a boolean", () => {
	expect(isBoolean(true)).toBe(true)
	expect(isBoolean(false)).toBe(true)
})

test("[isBoolean] (guards) returns true when passed a boolean", () => {
	expect(isBoolean("true")).toBe(false)
	expect(isBoolean("false")).toBe(false)
	expect(isBoolean(0)).toBe(false)
	expect(isBoolean(1)).toBe(false)
	expect(isBoolean([])).toBe(false)
	expect(isBoolean(["true"])).toBe(false)
	expect(isBoolean({})).toBe(false)
	expect(isBoolean({ value: true })).toBe(false)
})
