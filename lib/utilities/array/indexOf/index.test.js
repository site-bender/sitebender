import { expect, test } from "vitest"

import indexOf from "."

const arr = [1, 2, 3, 4, 5]

test("[indexOf] (array) returns the index when the item is found", () => {
	expect(indexOf(1)(arr)).toStrictEqual(0)
	expect(indexOf(2)(arr)).toStrictEqual(1)
	expect(indexOf(3)(arr)).toStrictEqual(2)
	expect(indexOf(4)(arr)).toStrictEqual(3)
	expect(indexOf(5)(arr)).toStrictEqual(4)
})

test("[indexOf] (array) returns undefined when the item is not found", () => {
	expect(indexOf(0)(arr)).toBeUndefined()
	expect(indexOf(6)(arr)).toBeUndefined()
})
