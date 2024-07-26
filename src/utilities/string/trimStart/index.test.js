import { expect, test } from "vitest"

import trimStart from "."

const str = "       BOB!        "

test("[trimStart] (string) returns the passed string with the left side trimmed", () => {
	expect(trimStart(str)).toStrictEqual("BOB!        ")
})

test("[trimStart] (string) works with empty strings", () => {
	expect(trimStart("")).toStrictEqual("")
})
