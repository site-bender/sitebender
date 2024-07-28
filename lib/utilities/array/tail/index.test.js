import { expect, test } from "vitest"

import tail from "."

const arr = [1, 2, 3, 4, 5]

test("[tail] (array) returns a new array representing the tail", () => {
	expect(tail(arr)).toStrictEqual([2, 3, 4, 5])
	expect(arr).toStrictEqual([1, 2, 3, 4, 5])
})

test("[tail] (array) returns an empty array when array has only one item", () => {
	expect(tail([1])).toStrictEqual([])
})

test("[tail] (array) returns an empty array when the array is empty", () => {
	expect(tail([])).toStrictEqual([])
})
