import { expect, test } from "vitest"

import removeAt from "."

const arr = [1, 2, 3, 4, 5]

test("[removeAt] (array) removes the item at the passed from the array", () => {
	expect(removeAt(0)(arr)).toStrictEqual([2, 3, 4, 5])
	expect(removeAt(1)(arr)).toStrictEqual([1, 3, 4, 5])
	expect(removeAt(2)(arr)).toStrictEqual([1, 2, 4, 5])
	expect(removeAt(3)(arr)).toStrictEqual([1, 2, 3, 5])
	expect(removeAt(4)(arr)).toStrictEqual([1, 2, 3, 4])
})

test("[removeAt] (array) returns the array unchanged if index out of range or array empty", () => {
	const empty = []

	expect(removeAt(-1)(arr)).toStrictEqual([1, 2, 3, 4, 5])
	expect(removeAt(5)(arr)).toStrictEqual([1, 2, 3, 4, 5])
	expect(removeAt(5)(arr) === arr).toBeFalsy() // new array
	expect(removeAt(5)(empty) === empty).toBeFalsy() // new array
})
