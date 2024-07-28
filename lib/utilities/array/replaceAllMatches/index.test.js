import { expect, test } from "vitest"

import toUpper from "../../string/toUpper"
import replaceAllMatches from "."

const arr = ["bob", "is", "the", "bob", "of", "bobs"]

test("[replaceAllMatches] (array) replaces all occurrences of the matched item with the f(original)", () => {
	expect(replaceAllMatches(/bob/)(toUpper)(arr)).toStrictEqual([
		"BOB",
		"is",
		"the",
		"BOB",
		"of",
		"BOBS",
	])
	expect(replaceAllMatches(/bob/)(() => "sally")(arr)).toStrictEqual([
		"sally",
		"is",
		"the",
		"sally",
		"of",
		"sally",
	])
	expect(
		replaceAllMatches(/bob/)(s => s.replace(/bob/, "sally"))(arr),
	).toStrictEqual(["sally", "is", "the", "sally", "of", "sallys"])
})

test("[replaceAllMatches] (array) returns the array unchanged if match not found", () => {
	expect(replaceAllMatches(/sally/)(toUpper)(arr)).toStrictEqual(arr)
})
