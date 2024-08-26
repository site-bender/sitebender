import { expect, test } from "vitest"

import isInteger from "."

test("[isInteger] (guards) returns true when passed a boolean", () => {
	expect(isInteger(0)).toBe(true)
	expect(isInteger(42)).toBe(true)
})

test("[isInteger] (guards) returns true when passed a boolean", () => {
	expect(isInteger("true")).toBe(false)
	expect(isInteger("false")).toBe(false)
	expect(isInteger(0.000000001)).toBe(false)
	expect(isInteger(3.1415)).toBe(false)
	expect(isInteger([])).toBe(false)
	expect(isInteger(["true"])).toBe(false)
	expect(isInteger({})).toBe(false)
	expect(isInteger({ value: true })).toBe(false)
})
