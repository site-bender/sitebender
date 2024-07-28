import { expect, test } from "vitest"

import toUpper from "../../string/toUpper"
import replaceLast from "."

const arr = ["bob", "is", "the", "bob", "of", "bobs"]

test("[replaceLast] (array) replaces all occurrences of the matched item with the f(original)", () => {
	expect(replaceLast("bob")(toUpper)(arr)).toStrictEqual([
		"bob",
		"is",
		"the",
		"BOB",
		"of",
		"bobs",
	])
	expect(replaceLast("bob")(() => "sally")(arr)).toStrictEqual([
		"bob",
		"is",
		"the",
		"sally",
		"of",
		"bobs",
	])
	expect(replaceLast("bob")(s => s.replace("bob", "sally"))(arr)).toStrictEqual(
		["bob", "is", "the", "sally", "of", "bobs"],
	)
})

test("[replaceLast] (array) returns the array unchanged if match not found", () => {
	expect(replaceLast("sally")(toUpper)(arr)).toStrictEqual(arr)
})
