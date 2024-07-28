import { expect, test } from "vitest"

import take from "."

const arr = [1, 2, 3, 4, 5]

test("[take] (array) returns a new array with n items taken from the start", () => {
	expect(take(2)(arr)).toStrictEqual([1, 2])
	expect(take(3)(arr)).toStrictEqual([1, 2, 3])
	expect(take(5)(arr)).toStrictEqual([1, 2, 3, 4, 5])
})

test("[take] (array) returns an the full array when n > array length", () => {
	expect(take(6)(arr)).toStrictEqual(arr)
	expect(take(66)(arr)).toStrictEqual(arr)
})

test("[take] (array) returns an empty array when n < 1", () => {
	expect(take(0)(arr)).toStrictEqual([])
	expect(take(-1)(arr)).toStrictEqual([])
	expect(take(-3)(arr)).toStrictEqual([])
})
