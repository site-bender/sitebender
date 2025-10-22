import { assert, assertEquals } from "jsr:@std/assert@1"

import _checkRangeAsValidation from "./index.ts"
import isSuccess from "../../../monads/validation/isSuccess/index.ts"
import isFailure from "../../../monads/validation/isFailure/index.ts"

Deno.test("_checkRangeAsValidation returns success(true) when value is between min (exclusive) and max (inclusive)", function () {
	const result = _checkRangeAsValidation(1)(10)(5)

	assert(isSuccess(result))
	assertEquals(result.value, true)
})

Deno.test("_checkRangeAsValidation returns failure when value equals min", function () {
	const result = _checkRangeAsValidation(1)(10)(1)

	assert(isFailure(result))
	assertEquals(result.errors[0].code, "VALUE_OUT_OF_RANGE")
	assertEquals(result.errors[0].received, 1)
})

Deno.test("_checkRangeAsValidation returns success(true) when value equals max", function () {
	const result = _checkRangeAsValidation(1)(10)(10)

	assert(isSuccess(result))
	assertEquals(result.value, true)
})

Deno.test("_checkRangeAsValidation returns failure when value is below min", function () {
	const result = _checkRangeAsValidation(1)(10)(0)

	assert(isFailure(result))
	assertEquals(result.errors[0].messages[0], "Value must be between 1 (exclusive) and 10 (inclusive)")
})

Deno.test("_checkRangeAsValidation returns failure when value is above max", function () {
	const result = _checkRangeAsValidation(1)(10)(11)

	assert(isFailure(result))
	assertEquals(result.errors[0].messages[0], "Value must be between 1 (exclusive) and 10 (inclusive)")
})

Deno.test("_checkRangeAsValidation handles negative ranges", function () {
	const result = _checkRangeAsValidation(-10)(-1)(-5)

	assert(isSuccess(result))
	assertEquals(result.value, true)
})
