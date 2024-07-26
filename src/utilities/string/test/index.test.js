import { expect, test } from "vitest"

import f from "."

const str1 = "bobity bob bob bobbers!"
const str2 = "sam is as sam does"

test("[test] (string) returns true if the regular expression is found in the string", () => {
	expect(f(/bob/)(str1)).toBeTruthy
	expect(f(/sam/)(str2)).toBeTruthy
})

test("[test] (string) returns false if no matches are found", () => {
	expect(f(/blob/)(str1)).toBeFalsy()
	expect(f(/scam/)(str2)).toBeFalsy()
})
