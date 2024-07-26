import { expect, test } from "vitest"

import compact from "."

const bools = [false, true, null, false, undefined, true, true]
const nums = [null, null, 1, 3, 5, undefined, 9]
const strings = ["bob", "is", undefined, "and", "never", null]
const ok = [1, "yes", true]

test("[compact] (array) compacts the array by removing null and undefined", () => {
	const empty = []

	expect(compact(bools)).toStrictEqual([false, true, false, true, true])
	expect(compact(nums)).toStrictEqual([1, 3, 5, 9])
	expect(compact(strings)).toStrictEqual(["bob", "is", "and", "never"])
	expect(compact(ok)).toStrictEqual(ok)
	expect(compact(empty)).toStrictEqual(empty)
})
