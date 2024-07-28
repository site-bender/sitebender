import { expect, test } from "vitest"

import flatMap from "."

const arr = [1, 2, 3, 4, 5]

test("[flatMap] (array) returns a new mapped array flattened", () => {
	expect(flatMap(n => (n > 3 ? [n, 0] : n))(arr)).toStrictEqual([
		1, 2, 3, 4, 0, 5, 0,
	])
})

test("[flatMap] (array) flattens one level deep", () => {
	expect(flatMap(n => (n > 3 ? [n, [n * 2, n * 3]] : n))(arr)).toStrictEqual([
		1,
		2,
		3,
		4,
		[8, 12],
		5,
		[10, 15],
	])
})

test("[flatMap] (array) returns unchanged if not an array", () => {
	expect(flatMap(n => (n > 3 ? [n, 0] : n))("bob")).toStrictEqual("bob")
})
