import { expect, test } from "vitest"

import padStart from "."

test("[padStart] (string) pads the start of a string with the `chars` repeated `times`", () => {
	expect(padStart("-")(5)("bob")).toStrictEqual("-----bob")
	expect(padStart(" *** ")(3)(" ~ ")).toStrictEqual(" ***  ***  ***  ~ ")
})

test("[padStart] (string) returns the string unchanged if `chars` is empty string or `times` < 1", () => {
	expect(padStart("")(5)("bob")).toStrictEqual("bob")
	expect(padStart("hi")(0)("sam")).toStrictEqual("sam")
})
