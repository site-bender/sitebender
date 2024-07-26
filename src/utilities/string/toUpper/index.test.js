import { expect, test } from "vitest"

import toUpper from "."

const str = "Who IS tHe MAn?"

test("[toUpper] (string) returns the locale lowercase version of the passed string", () => {
	expect(toUpper(str)).toStrictEqual("WHO IS THE MAN?")
})

test("[toUpper] (string) works with empty strings", () => {
	expect(toUpper("")).toStrictEqual("")
})
