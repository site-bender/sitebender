import { expect, test } from "vitest"

import splitAt from "."

const str1 = "slack is good"
const str2 = "bob-is-the-man"
const str3 = "hotdogs"

test("[splitAt] (string) returns the string as two array items split at the string index passed", () => {
	expect(splitAt(5)(str1)).toStrictEqual(["slack", " is good"])
	expect(splitAt(10)(str2)).toStrictEqual(["bob-is-the", "-man"])
	expect(splitAt(3)(str3)).toStrictEqual(["hot", "dogs"])
	expect(splitAt(7)(str3)).toStrictEqual(["hotdogs"])
	expect(splitAt(8)(str3)).toStrictEqual(["hotdogs"])
})

test("[splitAt] (string) counts back from the end if the index is negative", () => {
	expect(splitAt(-4)(str1)).toStrictEqual(["slack is ", "good"])
	expect(splitAt(-10)(str2)).toStrictEqual(["bob-", "is-the-man"])
	expect(splitAt(-4)(str3)).toStrictEqual(["hot", "dogs"])
	expect(splitAt(-7)(str3)).toStrictEqual(["hotdogs"])
	expect(splitAt(-8)(str3)).toStrictEqual(["hotdogs"])
})
