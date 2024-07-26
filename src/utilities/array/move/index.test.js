import { expect, test } from "vitest"

import move from "."

const arr = [1, 2, 3, 4, 5]

test("[move] (array) returns moves the item from index i to index j", () => {
	expect(move(0)(4)(arr)).toStrictEqual([2, 3, 4, 5, 1])
	expect(move(4)(0)(arr)).toStrictEqual([5, 1, 2, 3, 4])
	expect(move(1)(3)(arr)).toStrictEqual([1, 3, 4, 2, 5])
	expect(move(3)(1)(arr)).toStrictEqual([1, 4, 2, 3, 5])
	expect(move(2)(2)(arr)).toStrictEqual(arr)
})

test("[move] (array) returns the array if either index is missing or out of range", () => {
	expect(move(-1)(2)(arr)).toStrictEqual(arr)
	expect(move(1)(5)(arr)).toStrictEqual(arr)
	expect(move()(3)(arr)).toStrictEqual(arr)
	expect(move(3)()(arr)).toStrictEqual(arr)
})
