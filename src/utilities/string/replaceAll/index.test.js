import { expect, test } from "vitest"

import replaceAll from "."

const str = "oXonoXonoXo"

test("[replaceAll] (string) replaces matches of the first parameter string or Regexp with the substitute", () => {
	expect(replaceAll("X")("0")(str)).toStrictEqual("o0ono0ono0o")
	expect(replaceAll(/x/i)("0")(str)).toStrictEqual("o0ono0ono0o")
	expect(replaceAll(/Oxo/i)("0")(str)).toStrictEqual("0n0n0")
})

test("[replaceAll] (string) returns the string unchanged if no match found", () => {
	expect(replaceAll("Y")("0")(str)).toStrictEqual(str)
	expect(replaceAll(/y/i)("0")(str)).toStrictEqual(str)
	expect(replaceAll(/Oyo/i)("0")(str)).toStrictEqual(str)
})
