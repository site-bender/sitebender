import { expect, test } from "vitest"

import padStartTo from "."

test("[padStartTo] (string) pads the end of a string with the `chars` to `length`", () => {
	expect(padStartTo("-")(5)("bob")).toStrictEqual("--bob")
	expect(padStartTo("!")(10)("sam")).toStrictEqual("!!!!!!!sam")
})

test("[padStartTo] (string) returns the string unchanged if `chars` is empty string or `length` <= string.length", () => {
	expect(padStartTo("!")(5)("bob is bob")).toStrictEqual("bob is bob")
	expect(padStartTo("")(7)("sam")).toStrictEqual("sam")
})
