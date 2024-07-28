import { expect, test } from "vitest"

import slice from "."

const arr = [1, 2, 3, 4, 5]

test("[slice] (array) returns the slice of the array from i to j non-inclusive", () => {
	expect(slice(0)(2)(arr)).toStrictEqual([1, 2])
	expect(slice(1)(3)(arr)).toStrictEqual([2, 3])
	expect(slice(2)(4)(arr)).toStrictEqual([3, 4])
})

test("[slice] (array) works when counting backwards from the end", () => {
	expect(slice(-1)(-2)(arr)).toStrictEqual([])
	expect(slice(-2)(-1)(arr)).toStrictEqual([4])
	expect(slice(-5)(-1)(arr)).toStrictEqual([1, 2, 3, 4])
	expect(slice(-1)(-1)(arr)).toStrictEqual([])
	expect(slice(-5)(0)(arr)).toStrictEqual([])
})
