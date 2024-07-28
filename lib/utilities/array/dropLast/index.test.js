import { expect, test } from "vitest"

import dropLast from "."

const arr = [1, 2, 3, 4, 5]

test("[dropLast] (array) returns a new array with n items dropped from the end", () => {
	expect(dropLast(0)(arr)).toStrictEqual([1, 2, 3, 4, 5])
	expect(dropLast(2)(arr)).toStrictEqual([1, 2, 3])
	expect(dropLast(3)(arr)).toStrictEqual([1, 2])
	expect(dropLast(5)(arr)).toStrictEqual([])
})

test("[dropLast] (array) returns an empty array when n > array length", () => {
	expect(dropLast(6)(arr)).toStrictEqual([])
	expect(dropLast(66)(arr)).toStrictEqual([])
})

test("[dropLast] (array) returns a new full array when n < 0", () => {
	expect(dropLast(-1)(arr)).toStrictEqual([1, 2, 3, 4, 5])
	expect(dropLast(-1)(arr) === arr).toBeFalsy()
})
