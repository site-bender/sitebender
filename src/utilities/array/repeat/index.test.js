import { expect, test } from "vitest"

import repeat from "."

test("[repeat] (array) repeats the item count times", () => {
	const getThree = repeat(3)

	expect(getThree("bob")).toStrictEqual(["bob", "bob", "bob"])
	expect(repeat(0)("bob")).toStrictEqual([])
	expect(repeat(1)("bob")).toStrictEqual(["bob"])
	expect(repeat(2)("bob")).toStrictEqual(["bob", "bob"])
	expect(repeat(2)(null)).toStrictEqual([null, null])
})

test("[repeat] (array) returns an empty array when count < 1", () => {
	expect(repeat(0)("bob")).toStrictEqual([])
	expect(repeat(-1)("bob")).toStrictEqual([])
	expect(repeat()("bob")).toStrictEqual([])
})
