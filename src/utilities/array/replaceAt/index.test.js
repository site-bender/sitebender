import { expect, test } from "vitest"

import replaceAt from "."

const arr = [1, 2, 3, 4, 5]

test("[replaceAt] (array) replaces the item at index with the f(original)", () => {
	expect(replaceAt(1)(n => n * 3)(arr)).toStrictEqual([1, 6, 3, 4, 5])
	expect(replaceAt(2)(n => n * 3)(arr)).toStrictEqual([1, 2, 9, 4, 5])
	expect(replaceAt(3)(() => 77)(arr)).toStrictEqual([1, 2, 3, 77, 5])
})

test("[replaceAt] (array) returns the array unchanged if item not found", () => {
	expect(replaceAt(-1)(() => 0)(arr)).toStrictEqual([1, 2, 3, 4, 5])
	expect(replaceAt(5)(() => 0)(arr)).toStrictEqual([1, 2, 3, 4, 5])
})
