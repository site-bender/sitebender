import { expect, test } from "vitest"

import toUpper from "../../string/toUpper"
import replaceLastMatch from "."

const arr = ["bob", "is", "the", "bob", "of", "bobs"]

test("[replaceLastMatch] (array) replaces all occurrences of the matched item with the f(original)", () => {
	expect(replaceLastMatch(/bob/)(toUpper)(arr)).toStrictEqual([
		"bob",
		"is",
		"the",
		"bob",
		"of",
		"BOBS",
	])
	expect(replaceLastMatch(/bob/)(() => "sally")(arr)).toStrictEqual([
		"bob",
		"is",
		"the",
		"bob",
		"of",
		"sally",
	])
	expect(
		replaceLastMatch(/bob/)(s => s.replace(/bob/, "sally"))(arr),
	).toStrictEqual(["bob", "is", "the", "bob", "of", "sallys"])
})

test("[replaceLastMatch] (array) returns the array unchanged if match not found", () => {
	expect(replaceLastMatch(/sally/)(toUpper)(arr)).toStrictEqual(arr)
})
