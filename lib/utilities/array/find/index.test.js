import { expect, test } from "vitest"

import find from "."

const arr = [1, 2, 3, 4, 5]

test("[find] (array) returns the item when it is found", () => {
	expect(find(n => n === 3)(arr)).toStrictEqual(3)
	expect(find(n => n > 1)(arr)).toStrictEqual(2)
})

test("[find] (array) returns undefined when the item is not found", () => {
	expect(find(n => n === 0)(arr)).toBeUndefined()
})
