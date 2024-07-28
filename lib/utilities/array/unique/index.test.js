import { expect, test } from "vitest"

import unique from "."

const nums = [1, 2, 3, 1, 2, 3, 1]
const strings = ["bob", "is", "not", "bob", "but", "bob"]
const bools = [true, true, true, false, true, false, false]

test("[unique] (array) returns a new array with all duplicates removed", () => {
	expect(unique(nums)).toStrictEqual([1, 2, 3])
	expect(unique(strings)).toStrictEqual(["bob", "is", "not", "but"])
	expect(unique(bools)).toStrictEqual([true, false])
})

test("[unique] (array) returns an empty array when passed an empty array", () => {
	const empty = []

	expect(unique(empty)).toStrictEqual(empty)
	expect(unique(empty) === empty).toBeFalsy()
})
