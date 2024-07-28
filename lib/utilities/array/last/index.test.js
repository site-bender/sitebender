import { expect, test } from "vitest"

import last from "."

const arr = [1, 2, 3, 4, 5]

test("[join] (array) returns the last item when array length > 0", () => {
	expect(last(arr)).toStrictEqual(5)
})

test("[join] (array) returns undefined when the array is empty", () => {
	expect(last([])).toBeUndefined()
})
