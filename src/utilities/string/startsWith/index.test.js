import { expect, test } from "vitest"

import startsWith from "."

const str1 = "slack is good"
const str2 = "bob is the man"

test("[startsWith] (string) returns true if the second string param starts with the first", () => {
	expect(startsWith("slack")(str1)).toBeTruthy()
	expect(startsWith("bob is")(str2)).toBeTruthy()
})

test("[startsWith] (string) returns false if the second string param does not start with the first", () => {
	expect(startsWith("stack")(str1)).toBeFalsy()
	expect(startsWith("blob is")(str2)).toBeFalsy()
})
