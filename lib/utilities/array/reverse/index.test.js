import { expect, test } from "vitest"

import reverse from "."

const arr = [1, 2, 3, 4, 5]

test("[reverse] (array) returns a new reversed copy of the list", () => {
	expect(reverse(arr)).toStrictEqual([5, 4, 3, 2, 1])
	expect(reverse(["slack", "is", "good"])).toStrictEqual([
		"good",
		"is",
		"slack",
	])
})

test("[reverse] (array) returns an empty new array when passed an empty array", () => {
	const empty = []

	expect(reverse([])).toStrictEqual([])
	expect(reverse(empty) === empty).toBeFalsy()
})
