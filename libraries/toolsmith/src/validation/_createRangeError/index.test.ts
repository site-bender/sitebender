import { assertEquals } from "@std/assert"

import _createRangeError from "./index.ts"

Deno.test("_createRangeError creates error for exclusive range", function () {
	const rangeError = _createRangeError(1)(10)(15)("exclusive")

	assertEquals(rangeError.code, "VALUE_OUT_OF_RANGE")
	assertEquals(rangeError.field, "value")
	assertEquals(
		rangeError.messages[0],
		"Value must be between 1 and 10 (exclusive)",
	)
	assertEquals(rangeError.received, 15)
	assertEquals(rangeError.expected, "Number where min < value < max")
	assertEquals(rangeError.constraints, { min: 1, max: 10 })
	assertEquals(rangeError.severity, "requirement")
})

Deno.test("_createRangeError creates error for minInclusive range", function () {
	const rangeError = _createRangeError(0)(100)(150)("minInclusive")

	assertEquals(
		rangeError.messages[0],
		"Value must be between 0 (inclusive) and 100 (exclusive)",
	)
	assertEquals(rangeError.expected, "Number where min <= value < max")
})

Deno.test("_createRangeError creates error for maxInclusive range", function () {
	const rangeError = _createRangeError(0)(100)(150)("maxInclusive")

	assertEquals(
		rangeError.messages[0],
		"Value must be between 0 (exclusive) and 100 (inclusive)",
	)
	assertEquals(rangeError.expected, "Number where min < value <= max")
})

Deno.test("_createRangeError creates error for inclusive range", function () {
	const rangeError = _createRangeError(1)(365)(500)("inclusive")

	assertEquals(
		rangeError.messages[0],
		"Value must be between 1 and 365 (inclusive)",
	)
	assertEquals(rangeError.expected, "Number where min <= value <= max")
})
