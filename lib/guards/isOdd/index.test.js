import { expect, test } from "vitest"

import isOdd from "."

test("[isOdd] (guards) returns true when passed a boolean", () => {
	expect(isOdd(0)).toBe(false)
	expect(isOdd(1)).toBe(true)
})

test("[isOdd] (guards) returns true when passed a boolean", () => {
	expect(isOdd("true")).toBe(false)
	expect(isOdd("false")).toBe(false)
	expect(isOdd(true)).toBe(false)
	expect(isOdd(false)).toBe(false)
	expect(isOdd([])).toBe(false)
	expect(isOdd(["true"])).toBe(false)
	expect(isOdd({})).toBe(false)
	expect(isOdd({ value: true })).toBe(false)
})
