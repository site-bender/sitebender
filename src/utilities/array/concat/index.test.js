import { expect, test } from "vitest"

import concat from "."

const arr1 = [0, 1, 2, 3, 4]
const arr2 = [5, 6, 7, 8, 9]
const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

test("[concat] (array) concatenates two arrays together and returns a new array", () => {
	const added = concat(arr1)(arr2)

	expect(added).toStrictEqual(arr)
	expect(added === arr).toBeFalsy()
	expect(added === arr1).toBeFalsy()
	expect(added === arr2).toBeFalsy()
})

test("[concat] (array) returns the array when the other is empty or undefined", () => {
	const empty = []

	expect(concat()(arr2)).toStrictEqual(arr2)
	expect(concat(empty)(arr2)).toStrictEqual(arr2)
	expect(concat(arr1)()).toStrictEqual(arr1)
	expect(concat(arr1)(empty)).toStrictEqual(arr1)
})
