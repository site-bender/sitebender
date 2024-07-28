import { expect, test } from "vitest"

import drop from "."

const arr = [1, 2, 3, 4, 5]

test("[drop] (array) returns a new array with n items dropped from the start", () => {
	expect(drop(0)(arr)).toStrictEqual([1, 2, 3, 4, 5])
	expect(drop(2)(arr)).toStrictEqual([3, 4, 5])
	expect(drop(3)(arr)).toStrictEqual([4, 5])
	expect(drop(5)(arr)).toStrictEqual([])
})

test("[drop] (array) returns an empty array when n > array length", () => {
	expect(drop(6)(arr)).toStrictEqual([])
	expect(drop(66)(arr)).toStrictEqual([])
})

test("[drop] (array) returns a new full array when n < 0", () => {
	expect(drop(-1)(arr)).toStrictEqual([1, 2, 3, 4, 5])
	expect(drop(-1)(arr) === arr).toBeFalsy()
})
