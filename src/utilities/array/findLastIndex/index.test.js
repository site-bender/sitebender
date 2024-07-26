import { expect, test } from "vitest"

import findLastIndex from "."

const arr = [1, 2, 3, 4, 5]

test("[findLastIndex] (array) returns the index for the last item when found", () => {
	expect(findLastIndex(n => n > 1)(arr)).toStrictEqual(4)
	expect(findLastIndex(n => n > 1 && n < 5)(arr)).toStrictEqual(3)
})

test("[findLastIndex] (array) returns undefined when the item is not found", () => {
	expect(findLastIndex(n => n === 0)(arr)).toBeUndefined()
})
