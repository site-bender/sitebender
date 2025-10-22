import { assertEquals } from "jsr:@std/assert@1"

import _getRangeDescription from "./index.ts"

Deno.test("_getRangeDescription returns correct description for exclusive range", function () {
	const description = _getRangeDescription(1)(10)("exclusive")

	assertEquals(description, "between 1 and 10 (exclusive)")
})

Deno.test("_getRangeDescription returns correct description for minInclusive range", function () {
	const description = _getRangeDescription(0)(100)("minInclusive")

	assertEquals(description, "between 0 (inclusive) and 100 (exclusive)")
})

Deno.test("_getRangeDescription returns correct description for maxInclusive range", function () {
	const description = _getRangeDescription(0)(100)("maxInclusive")

	assertEquals(description, "between 0 (exclusive) and 100 (inclusive)")
})

Deno.test("_getRangeDescription returns correct description for inclusive range", function () {
	const description = _getRangeDescription(1)(365)("inclusive")

	assertEquals(description, "between 1 and 365 (inclusive)")
})

Deno.test("_getRangeDescription handles different numeric ranges", function () {
	const descriptionSmall = _getRangeDescription(0)(1)("exclusive")
	const descriptionLarge = _getRangeDescription(1000)(9999)("inclusive")

	assertEquals(descriptionSmall, "between 0 and 1 (exclusive)")
	assertEquals(descriptionLarge, "between 1000 and 9999 (inclusive)")
})

Deno.test("_getRangeDescription handles negative numbers", function () {
	const description = _getRangeDescription(-100)(-10)("inclusive")

	assertEquals(description, "between -100 and -10 (inclusive)")
})
