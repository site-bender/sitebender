import { expect, test } from "vitest"

import reduce from "."

const arr = [1, 2, 3, 4, 5]

test("[reduce] (array) loops through the array producing a new output based on the initial value", () => {
	expect(reduce((sum, n) => sum + n)(0)(arr)).toBe(15)
	expect(reduce((sum, n) => sum + n)(10)(arr)).toBe(25)
	expect(reduce((acc, n) => [...acc, n])([])(arr)).toStrictEqual(arr)
})

test("[reduce] (array) returns the initial value when the array is empty", () => {
	expect(reduce((sum, n) => sum + n)(0)([])).toBe(0)
	expect(reduce((sum, n) => sum + n)(10)([])).toBe(10)
	expect(reduce((acc, n) => [...acc, n])([])([])).toStrictEqual([])
})
