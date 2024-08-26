import { expect, test } from "vitest"

import isTabIndex from "."

test("[isTabIndex] (guards) returns true when passed an integer > -2", () => {
	expect(isTabIndex(-1)).toBe(true)
	expect(isTabIndex(0)).toBe(true)
	expect(isTabIndex(1)).toBe(true)
	expect(isTabIndex(1000)).toBe(true)
	expect(isTabIndex("0")).toBe(true)
})

test("[isTabIndex] (guards) returns true when passed an incorrect tabindex", () => {
	expect(isTabIndex("true")).toBe(false)
	expect(isTabIndex("false")).toBe(false)
	expect(isTabIndex(-2)).toBe(false)
	expect(isTabIndex([])).toBe(false)
	expect(isTabIndex(["true"])).toBe(false)
	expect(isTabIndex({})).toBe(false)
	expect(isTabIndex({ value: true })).toBe(false)
})
