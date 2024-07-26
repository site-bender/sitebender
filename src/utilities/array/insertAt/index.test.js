import { expect, test } from "vitest"

import insertAt from "."

const arr = [1, 2, 3, 4, 5]

test("[compact] (array) returns the array with the item inserted at the ", () => {
	expect(insertAt(0)(99)(arr)).toStrictEqual([99, 1, 2, 3, 4, 5])
	expect(insertAt(1)(99)(arr)).toStrictEqual([1, 99, 2, 3, 4, 5])
	expect(insertAt(2)(99)(arr)).toStrictEqual([1, 2, 99, 3, 4, 5])
	expect(insertAt(3)(99)(arr)).toStrictEqual([1, 2, 3, 99, 4, 5])
	expect(insertAt(4)(99)(arr)).toStrictEqual([1, 2, 3, 4, 99, 5])
	expect(insertAt(5)(99)(arr)).toStrictEqual([1, 2, 3, 4, 5, 99])
})

test("[compact] (array) returns the array unchanged when the index is outside the range", () => {
	expect(insertAt(-1)(99)(arr)).toStrictEqual(arr)
	expect(insertAt(6)(99)(arr)).toStrictEqual(arr)
})
