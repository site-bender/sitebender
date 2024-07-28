import { expect, test } from "vitest"

import repeat from "."

test("[repeat] (string) returns a string with `length` copies of the passed string", () => {
	expect(repeat("bob")(5)).toStrictEqual("bobbobbobbobbob")
	expect(repeat(" ")(10)).toStrictEqual("          ")
	expect(repeat("oh no ")(3)).toStrictEqual("oh no oh no oh no ")
})

test("[repeat] (string) returns an empty string if `length` < 1 or string is empty", () => {
	expect(repeat("")(5)).toStrictEqual("")
	expect(repeat("hi")(0)).toStrictEqual("")
})
