import { expect, test } from "vitest"

import splitEvery from "."

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

test("[splitEvery] (array) splits the array into groups of n items, plus one group of any remaining", () => {
	expect(splitEvery(1)(arr)).toStrictEqual([
		[0],
		[1],
		[2],
		[3],
		[4],
		[5],
		[6],
		[7],
		[8],
		[9],
	])
	expect(splitEvery(2)(arr)).toStrictEqual([
		[0, 1],
		[2, 3],
		[4, 5],
		[6, 7],
		[8, 9],
	])
	expect(splitEvery(3)(arr)).toStrictEqual([
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[9],
	])
	expect(splitEvery(4)(arr)).toStrictEqual([
		[0, 1, 2, 3],
		[4, 5, 6, 7],
		[8, 9],
	])
	expect(splitEvery(5)(arr)).toStrictEqual([
		[0, 1, 2, 3, 4],
		[5, 6, 7, 8, 9],
	])
})

test("[splitEvery] (array) wraps the array if n > array.length", () => {
	expect(splitEvery(10)(arr)).toStrictEqual([arr])
})

test("[splitEvery] (array) returns an empty array for a count < 1", () => {
	expect(splitEvery(0)(arr)).toStrictEqual([])
})
