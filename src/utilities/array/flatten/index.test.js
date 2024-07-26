import { expect, test } from "vitest"

import flatten from "."

const arr = [1, [2, [3, [4, [5]]]]]

test("[flatten] (array) flattens one level deep when n is undefined", () => {
	expect(flatten()(arr)).toStrictEqual([1, 2, [3, [4, [5]]]])
})

test("[flatten] (array) flattens fully deep when n is Infinity (really only 20 levels)", () => {
	expect(flatten(Infinity)(arr)).toStrictEqual([1, 2, 3, 4, 5])
})

test("[flatten] (array) flattens n levels deep when n > 0 and n < depth", () => {
	expect(flatten(0)(arr)).toStrictEqual(arr)
	expect(flatten(1)(arr)).toStrictEqual([1, 2, [3, [4, [5]]]])
	expect(flatten(2)(arr)).toStrictEqual([1, 2, 3, [4, [5]]])
	expect(flatten(3)(arr)).toStrictEqual([1, 2, 3, 4, [5]])
})
