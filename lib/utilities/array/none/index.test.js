import { expect, test } from "vitest"

import none from "."

const arr = [1, 2, 3, 4, 5]

test("[none] (array) returns true when no item return true", () => {
	expect(none(n => n < 1)(arr)).toBeTruthy()
})

test("[none] (array) returns false when any item returns true", () => {
	expect(none(n => n < 2)(arr)).toBeFalsy()
	expect(none(n => n < 6)(arr)).toBeFalsy()
})
