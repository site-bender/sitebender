import { expect, test } from "vitest"

import trim from "."

const str = "       BOB!        "

test("[trim] (string) returns the trimmed version of the passed string", () => {
	expect(trim(str)).toStrictEqual("BOB!")
})

test("[trim] (string) works with empty strings", () => {
	expect(trim("")).toStrictEqual("")
})
