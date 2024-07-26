import { expect, test } from "vitest"

import pad from "."

test("[pad] (string) pads both sides of a string with the `chars` repeated `times`", () => {
	expect(pad("-")(5)("bob")).toStrictEqual("-----bob-----")
	expect(pad(" *** ")(3)(" ~ ")).toStrictEqual(
		" ***  ***  ***  ~  ***  ***  *** ",
	)
})

test("[pad] (string) returns the string unchanged if `chars` is empty string or `times` < 1", () => {
	expect(pad("")(5)("bob")).toStrictEqual("bob")
	expect(pad("hi")(0)("sam")).toStrictEqual("sam")
})
