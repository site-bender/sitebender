import { expect, test } from "vitest"

import findLast from "."

const arr = [1, 2, 3, 4, 5]

test("[findLast] (array) returns the value for the last item when found", () => {
	expect(findLast(n => n > 1)(arr)).toStrictEqual(5)
	expect(findLast(n => n > 1 && n < 5)(arr)).toStrictEqual(4)
})

test("[findLast] (array) returns undefined when the item is not found", () => {
	expect(findLast(n => n === 0)(arr)).toBeUndefined()
})
