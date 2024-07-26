import { expect, test } from "vitest"

import lastIndexOfMatch from "."

const arr = ["bob", "is", "the", "bob", "of", "bobs"]

test("[lastIndexOfMatch] (array) returns the index of the last match found", () => {
	expect(lastIndexOfMatch(/bob/)(arr)).toStrictEqual(5)
	expect(lastIndexOfMatch(/bobs/)(arr)).toStrictEqual(5)
	expect(lastIndexOfMatch(/is/)(arr)).toStrictEqual(1)
})

test("[lastIndexOfMatch] (array) returns undefined when the item is not found", () => {
	expect(lastIndexOfMatch(/joe/)(arr)).toBeUndefined()
})
