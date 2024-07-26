import { expect, test } from "vitest"

import omit from "."

const arr = [1, 2, 3, 4, 5]

test("[omit] (array) returns the array with any matching items omitted", () => {
	expect(omit(n => n % 2 == 0)(arr)).toStrictEqual([1, 3, 5])
	expect(omit(n => n % 2 == 1)(arr)).toStrictEqual([2, 4])
	expect(omit(n => n > 2)(arr)).toStrictEqual([1, 2])
})

test("[omit] (array) returns array unchanged when item not found", () => {
	expect(omit(n => n === 0)(arr)).toStrictEqual(arr)
	expect(omit(n => n === 6)(arr)).toStrictEqual(arr)
})
