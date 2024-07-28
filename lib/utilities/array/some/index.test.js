import { expect, test } from "vitest"

import some from "."

const arr = [1, 2, 3, 4, 5]

test("[some] (array) returns true when all items return true", () => {
	expect(some(n => n > 0)(arr)).toBeTruthy()
})

test("[some] (array) returns true when some items return true", () => {
	expect(some(n => n > 2)(arr)).toBeTruthy()
})

test("[some] (array) returns true when one item returns true", () => {
	expect(some(n => n === 2)(arr)).toBeTruthy()
})

test("[some] (array) returns false when all items return false", () => {
	expect(some(n => n > 10)(arr)).toBeFalsy()
})
