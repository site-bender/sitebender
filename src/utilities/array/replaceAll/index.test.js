import { expect, test } from "vitest"

import replaceAll from "."

const arr = [1, 2, 3, 3, 3]

test("[replaceAll] (array) replaces the passed item with the f(original)", () => {
	expect(replaceAll(1)(n => n * 3)(arr)).toStrictEqual([3, 2, 3, 3, 3])
	expect(replaceAll(2)(n => n * 3)(arr)).toStrictEqual([1, 6, 3, 3, 3])
	expect(replaceAll(3)(() => 77)(arr)).toStrictEqual([1, 2, 77, 77, 77])
})

test("[replaceAll] (array) returns the array unchanged if item not found", () => {
	expect(replaceAll(-1)(() => 0)(arr)).toStrictEqual([1, 2, 3, 3, 3])
})
