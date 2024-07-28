import { expect, test } from "vitest"

import lastIndexOf from "."

const arr = [1, 2, 1, 2, 1, 2]

test("[lastIndexOf] (array) returns the index of the last match found", () => {
	expect(lastIndexOf(1)(arr)).toStrictEqual(4)
	expect(lastIndexOf(2)(arr)).toStrictEqual(5)
})

test("[lastIndexOf] (array) returns undefined when no match is found", () => {
	expect(lastIndexOf(0)(arr)).toBeUndefined()
	expect(lastIndexOf(3)(arr)).toBeUndefined()
})
