import { expect, test } from "vitest"

import findIndex from "."

const arr = [1, 2, 3, 4, 5]

test("[findIndex] (array) returns the index when the item is found", () => {
	expect(findIndex(n => n === 3)(arr)).toStrictEqual(2)
	expect(findIndex(n => n > 1)(arr)).toStrictEqual(1)
})

test("[findIndex] (array) returns undefined when the item is not found", () => {
	expect(findIndex(n => n === 0)(arr)).toBeUndefined()
})
