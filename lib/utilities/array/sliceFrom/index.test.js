import { expect, test } from "vitest"

import sliceFrom from "."

const arr = [1, 2, 3, 4, 5]

test("[sliceFrom] (array) returns the slice of the array from i for count items", () => {
	expect(sliceFrom(0)(2)(arr)).toStrictEqual([1, 2])
	expect(sliceFrom(1)(3)(arr)).toStrictEqual([2, 3, 4])
	expect(sliceFrom(2)(4)(arr)).toStrictEqual([3, 4, 5])
})

test("[sliceFrom] (array) returns an empty array when i or count is negative", () => {
	expect(sliceFrom(-1)(-2)(arr)).toStrictEqual([])
	expect(sliceFrom(2)(-1)(arr)).toStrictEqual([])
	expect(sliceFrom(-5)(-1)(arr)).toStrictEqual([])
	expect(sliceFrom(-1)(-1)(arr)).toStrictEqual([])
	expect(sliceFrom(5)(0)(arr)).toStrictEqual([])
	expect(sliceFrom(-3)(5)(arr)).toStrictEqual([])
})
