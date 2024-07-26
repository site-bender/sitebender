import { expect, test } from "vitest"

import match from "."

const str1 = "bobity bob bob bobbers!"
const str2 = "sam is as sam does"

test("[match] (string) returns an array of matches for the regular expression in the passed string", () => {
	expect(match(/bob/)(str1)).toStrictEqual(["bob", "bob", "bob", "bob"])
	expect(match(/sam/)(str2)).toStrictEqual(["sam", "sam"])
})

test("[match] (string) returns an empty array if no matches are found", () => {
	expect(match(/blob/)(str1)).toStrictEqual([])
	expect(match(/scam/)(str2)).toStrictEqual([])
})
