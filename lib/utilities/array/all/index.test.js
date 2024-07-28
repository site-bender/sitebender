import { expect, test } from "vitest"

import all from "."

const arr = [1, 2, 3, 4, 5]

test("[all] (array) returns true when all items return true", () => {
	expect(all(n => n > 0)(arr)).toBeTruthy()
})

test("[all] (array) returns false when any item returns false", () => {
	expect(all(n => n > 1)(arr)).toBeFalsy()
})
