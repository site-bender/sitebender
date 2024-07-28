import { expect, test } from "vitest"

import padEnd from "."

test("[padEnd] (string) pads the end of a string with the `chars` repeated `times`", () => {
	expect(padEnd("-")(5)("bob")).toStrictEqual("bob-----")
	expect(padEnd(" *** ")(3)(" ~ ")).toStrictEqual(" ~  ***  ***  *** ")
})

test("[padEnd] (string) returns the string unchanged if `chars` is empty string or `times` < 1", () => {
	expect(padEnd("")(5)("bob")).toStrictEqual("bob")
	expect(padEnd("hi")(0)("sam")).toStrictEqual("sam")
})
