import { expect, test } from "vitest"

import head from "."

const arr = [1, 2, 3, 4, 5]

test("[head] (array) returns the head when array length > 0", () => {
	expect(head(arr)).toStrictEqual(1)
})

test("[head] (array) returns undefined when the array is empty", () => {
	expect(head([])).toBeUndefined()
})
