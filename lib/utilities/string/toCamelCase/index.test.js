import { expect, test } from "vitest"

import toCamelCase from "."

test("[toCamelCase] (string) returns the locale lowercase camelCased version of the passed string", () => {
	const str = "Who IS tHe MAn?"

	expect(toCamelCase(str)).toStrictEqual("whoISTHeMAn")
})

test("[toCamelCase] (string) returns the locale lowercase camelCased version of the passed string", () => {
	const str = "WhoIs the man?"

	expect(toCamelCase(str)).toStrictEqual("whoIsTheMan")
})

test("[toCamelCase] (string) works with empty strings", () => {
	expect(toCamelCase("")).toStrictEqual("")
})
