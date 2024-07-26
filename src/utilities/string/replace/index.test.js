import { expect, test } from "vitest"

import replace from "."

const str = "oXonoXonoXo"

test("[replace] (string) replaces matches of the first parameter string or Regexp with the substitute", () => {
	expect(replace("X")("0")(str)).toStrictEqual("o0onoXonoXo")
	expect(replace(/x/i)("0")(str)).toStrictEqual("o0onoXonoXo")
	expect(replace(/Oxo/i)("0")(str)).toStrictEqual("0noXonoXo")
})

test("[replace] (string) returns the string unchanged if no match found", () => {
	expect(replace("Y")("0")(str)).toStrictEqual(str)
	expect(replace(/y/i)("0")(str)).toStrictEqual(str)
	expect(replace(/Oyo/i)("0")(str)).toStrictEqual(str)
})
