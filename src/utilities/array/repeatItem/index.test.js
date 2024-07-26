import { expect, test } from "vitest"

import repeatItem from "."

test("[repeatItem] (array) repeats the item count times", () => {
	const getBobs = repeatItem("bob")

	expect(getBobs(3)).toStrictEqual(["bob", "bob", "bob"])
	expect(repeatItem("bob")(0)).toStrictEqual([])
	expect(repeatItem("bob")(1)).toStrictEqual(["bob"])
	expect(repeatItem("bob")(2)).toStrictEqual(["bob", "bob"])
	expect(repeatItem(null)(2)).toStrictEqual([null, null])
})

test("[repeatItem] (array) returns an empty array when count < 1", () => {
	expect(repeatItem("bob")(0)).toStrictEqual([])
	expect(repeatItem("bob")(-1)).toStrictEqual([])
	expect(repeatItem("bob")()).toStrictEqual([])
})
