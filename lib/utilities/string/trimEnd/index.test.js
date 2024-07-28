import { expect, test } from "vitest"

import trimEnd from "."

const str = "       BOB!        "

test("[trimEnd] (string) returns the passed string with the right side trimmed", () => {
	expect(trimEnd(str)).toStrictEqual("       BOB!")
})

test("[trimEnd] (string) works with empty strings", () => {
	expect(trimEnd("")).toStrictEqual("")
})
