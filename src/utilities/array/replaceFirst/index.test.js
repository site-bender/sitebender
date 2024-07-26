import { expect, test } from "vitest"

import replaceFirst from "."

const arr = [1, 2, 3, 3, 3]

test("[replaceFirst] (array) replaces the first occurrence of the passed item with the f(original)", () => {
	expect(replaceFirst(1)(n => n * 3)(arr)).toStrictEqual([3, 2, 3, 3, 3])
	expect(replaceFirst(2)(n => n * 3)(arr)).toStrictEqual([1, 6, 3, 3, 3])
	expect(replaceFirst(3)(() => 77)(arr)).toStrictEqual([1, 2, 77, 3, 3])
})

test("[replaceFirst] (array) returns the array unchanged if item not found", () => {
	expect(replaceFirst(-1)(() => 0)(arr)).toStrictEqual([1, 2, 3, 3, 3])
})
