import { expect, test } from "vitest"

import isCSSStyleDeclaration from "."

test("[isCSSStyleDeclaration] (guards) returns true when passed a record", () => {
	expect(isCSSStyleDeclaration({})).toBe(true)
	expect(isCSSStyleDeclaration({ backgroundColor: "#000" })).toBe(true)
})

test("[isCSSStyleDeclaration] (guards) returns false when passed bad data", () => {
	const a = Symbol("a")
	const b = Symbol.for("b")
	const value = {
		name: "Bob",
		[a]: "a",
		[b]: "b",
	}

	expect(isCSSStyleDeclaration()).toBe(false)
	expect(isCSSStyleDeclaration(["oh", "noes!"])).toBe(false)
	expect(isCSSStyleDeclaration(value)).toBe(false)
})
