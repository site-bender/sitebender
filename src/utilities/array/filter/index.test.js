import { expect, test } from "vitest"

import filter from "."

const arr = [1, 2, 3, 4, 5]

test("[filter] (array) returns the full array when all items return true", () => {
	expect(filter(n => n > 0)(arr)).toStrictEqual(arr)
})

test("[filter] (array) returns a partial array when some items return true", () => {
	expect(filter(n => n > 2)(arr)).toStrictEqual([3, 4, 5])
})

test("[filter] (array) returns an empty array when all items return false", () => {
	expect(filter(n => n > 5)(arr)).toStrictEqual([])
})
