import { expect, test } from "vitest"

import isEmptyStringOrBoolean from "."

test("[isEmptyStringOrBoolean] (guards) returns true when passed a boolean", () => {
	expect(isEmptyStringOrBoolean(true)).toBe(true)
	expect(isEmptyStringOrBoolean(false)).toBe(true)
})

test("[isEmptyStringOrBoolean] (guards) returns true when passed an empty string", () => {
	expect(isEmptyStringOrBoolean("")).toBe(true)
})

test("[isEmptyStringOrBoolean] (guards) returns true when passed a boolean", () => {
	expect(isEmptyStringOrBoolean("true")).toBe(false)
	expect(isEmptyStringOrBoolean("false")).toBe(false)
	expect(isEmptyStringOrBoolean(0)).toBe(false)
	expect(isEmptyStringOrBoolean(1)).toBe(false)
	expect(isEmptyStringOrBoolean([])).toBe(false)
	expect(isEmptyStringOrBoolean(["true"])).toBe(false)
	expect(isEmptyStringOrBoolean({})).toBe(false)
	expect(isEmptyStringOrBoolean({ value: true })).toBe(false)
})
