import { expect, test } from "vitest"

import not from "."

test("[not] (predicates) converts falsy values to boolean true", () => {
	expect(not(true)).toBe(false)
	expect(not(1)).toBe(false)
	expect(not(-1)).toBe(false)
	expect(not(1n)).toBe(false)
	expect(not("yes")).toBe(false)
	expect(not("true")).toBe(false)
	expect(not([])).toBe(false)
	expect(not({})).toBe(false)
})

test("[not] (predicates) converts truthy values to boolean false", () => {
	expect(not(false)).toBe(true)
	expect(not(0)).toBe(true)
	expect(not(-0)).toBe(true)
	expect(not(0n)).toBe(true)
	expect(not("")).toBe(true)
	expect(not("")).toBe(true)
	expect(not(null)).toBe(true)
	expect(not(undefined)).toBe(true)
	expect(not(NaN)).toBe(true)
})
