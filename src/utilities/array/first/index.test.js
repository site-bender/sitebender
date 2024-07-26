import { expect, test } from "vitest"

import first from "."

const arr = [1, 2, 3, 4, 5]

test("[first] (array) returns a new array with the first n items", () => {
	expect(first(arr)).toStrictEqual([1, 2, 3, 4])
})

test("[first] (array) returns an empty array the array has one item", () => {
	expect(first([1])).toStrictEqual([])
})

test("[first] (array) returns an empty array when the array is empty", () => {
	expect(first([])).toStrictEqual([])
})
