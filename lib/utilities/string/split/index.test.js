import { expect, test } from "vitest"

import split from "."

const str1 = "slack is good"
const str2 = "bob-is-the-man"
const str3 = "hotdogs"

test("[split] (string) returns true if the second string param starts with the first", () => {
	expect(split(" ")(str1)).toStrictEqual(["slack", "is", "good"])
	expect(split("-")(str2)).toStrictEqual(["bob", "is", "the", "man"])
	expect(split("")(str3)).toStrictEqual(["h", "o", "t", "d", "o", "g", "s"])
})

test("[split] (string) returns string as single array item if separator not found", () => {
	expect(split("!!!")(str1)).toStrictEqual([str1])
	expect(split("@")(str2)).toStrictEqual([str2])
})
