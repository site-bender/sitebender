import { expect, test } from "vitest"

import isString from "."

test("[isString] (guards) returns true when passed a boolean", () => {
	expect(isString("")).toBe(true)
	expect(isString("oh")).toBe(true)
})

test("[isString] (guards) returns true when passed a boolean", () => {
	expect(isString(true)).toBe(false)
	expect(isString(false)).toBe(false)
	expect(isString(0)).toBe(false)
	expect(isString(1)).toBe(false)
	expect(isString([])).toBe(false)
	expect(isString(["true"])).toBe(false)
	expect(isString({})).toBe(false)
	expect(isString({ value: true })).toBe(false)
})
