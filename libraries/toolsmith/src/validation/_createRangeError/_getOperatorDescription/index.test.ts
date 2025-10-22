import { assertEquals } from "jsr:@std/assert@1"

import _getOperatorDescription from "./index.ts"

Deno.test("_getOperatorDescription returns correct description for exclusive range", function () {
	const description = _getOperatorDescription("exclusive")

	assertEquals(description, "min < value < max")
})

Deno.test("_getOperatorDescription returns correct description for minInclusive range", function () {
	const description = _getOperatorDescription("minInclusive")

	assertEquals(description, "min <= value < max")
})

Deno.test("_getOperatorDescription returns correct description for maxInclusive range", function () {
	const description = _getOperatorDescription("maxInclusive")

	assertEquals(description, "min < value <= max")
})

Deno.test("_getOperatorDescription returns correct description for inclusive range", function () {
	const description = _getOperatorDescription("inclusive")

	assertEquals(description, "min <= value <= max")
})
