import { expect, test } from "vitest"

import splitEvery from "."

const str = "abcdefghijklmnop"

test("[splitEvery] (string) returns an array of strings by splitting the string every n characters", () => {
	expect(splitEvery(2)(str)).toStrictEqual([
		"ab",
		"cd",
		"ef",
		"gh",
		"ij",
		"kl",
		"mn",
		"op",
	])
	expect(splitEvery(5)(str)).toStrictEqual(["abcde", "fghij", "klmno", "p"])
	expect(splitEvery(8)(str)).toStrictEqual(["abcdefgh", "ijklmnop"])
})

test("[splitEvery] (string) returns an array with the string unchanged if n > string.length", () => {
	expect(splitEvery(16)(str)).toStrictEqual([str])
	expect(splitEvery(17)(str)).toStrictEqual([str])
})

test("[splitEvery] (string) returns an empty array if n < 1", () => {
	expect(splitEvery(0)(str)).toStrictEqual([])
	expect(splitEvery(-1)(str)).toStrictEqual([])
})
