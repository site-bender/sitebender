import { expect, test } from "vitest"

import takeLast from "."

const arr = [1, 2, 3, 4, 5]

test("[takeLast] (array) returns a new array with n items taken from the end", () => {
	expect(takeLast(2)(arr)).toStrictEqual([4, 5])
	expect(takeLast(3)(arr)).toStrictEqual([3, 4, 5])
	expect(takeLast(5)(arr)).toStrictEqual([1, 2, 3, 4, 5])
})

test("[takeLast] (array) returns an the full array when n > array length", () => {
	expect(takeLast(6)(arr)).toStrictEqual(arr)
	expect(takeLast(66)(arr)).toStrictEqual(arr)
})

test("[takeLast] (array) returns an empty array when n < 1", () => {
	expect(takeLast(0)(arr)).toStrictEqual([])
	expect(takeLast(-1)(arr)).toStrictEqual([])
	expect(takeLast(-3)(arr)).toStrictEqual([])
})
