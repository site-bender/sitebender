import { expect, test } from "vitest"

import includes from "."

const arr = [1, 2, 3, 4, 5]

test("[includes] (array) returns `true` when the item is in the array", () => {
	expect(includes(1)(arr)).toBeTruthy()
	expect(includes(2)(arr)).toBeTruthy()
	expect(includes(3)(arr)).toBeTruthy()
	expect(includes(4)(arr)).toBeTruthy()
	expect(includes(5)(arr)).toBeTruthy()
})

test("[includes] (array) returns `false` when the item is not in the array", () => {
	expect(includes(0)(arr)).toBeFalsy()
	expect(includes(6)(arr)).toBeFalsy()
	expect(includes("bob")([])).toBeFalsy()
	expect(includes(true)([false, false])).toBeFalsy()
})
