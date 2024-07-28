import { expect, test } from "vitest"

import nth from "."

const arr = [1, 2, 3, 4, 5]

test("[nth] (array) returns the nth item", () => {
	expect(nth(0)(arr)).toStrictEqual(1)
	expect(nth(1)(arr)).toStrictEqual(2)
	expect(nth(2)(arr)).toStrictEqual(3)
	expect(nth(3)(arr)).toStrictEqual(4)
	expect(nth(4)(arr)).toStrictEqual(5)
})

test("[nth] (array) returns undefined when the nth item not found", () => {
	expect(nth(-1)(arr)).toBeUndefined()
	expect(nth(5)(arr)).toBeUndefined()
})
