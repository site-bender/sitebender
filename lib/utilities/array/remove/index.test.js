import { expect, test } from "vitest"

import remove from "."

const arr = [1, 2, 3, 4, 5]

test("[remove] (array) removes the passed item from the array", () => {
	expect(remove(1)(arr)).toStrictEqual([2, 3, 4, 5])
	expect(remove(2)(arr)).toStrictEqual([1, 3, 4, 5])
	expect(remove(3)(arr)).toStrictEqual([1, 2, 4, 5])
	expect(remove(4)(arr)).toStrictEqual([1, 2, 3, 5])
	expect(remove(5)(arr)).toStrictEqual([1, 2, 3, 4])
})

test("[remove] (array) removes only the first passed item from the array", () => {
	expect(remove(1)([1, 2, 1, 2, 1])).toStrictEqual([2, 1, 2, 1])
	expect(remove(2)([1, 2, 1, 2, 1])).toStrictEqual([1, 1, 2, 1])
})

test("[remove] (array) returns the array unchanged if item not found", () => {
	expect(remove(0)(arr)).toStrictEqual([1, 2, 3, 4, 5])
	expect(remove(6)(arr)).toStrictEqual([1, 2, 3, 4, 5])
})
