import { expect, test } from "vitest"

import concat from "."

const str1 = "hot"
const str2 = "dogs"
const str = "hotdogs"

test("[concat] (string) concatenates two strings together and returns that string", () => {
	const added = concat(str1)(str2)

	expect(added).toStrictEqual(str)
})

test("[concat] (string) returns the string when the other is empty or undefined", () => {
	const empty = ""

	expect(concat()(str2)).toStrictEqual(str2)
	expect(concat(empty)(str2)).toStrictEqual(str2)
	expect(concat(str1)()).toStrictEqual(str1)
	expect(concat(str1)(empty)).toStrictEqual(str1)
})
