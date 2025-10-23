import { assert, assertEquals } from "@std/assert"

import _checkRangeAsResult from "./index.ts"
import isOk from "../../../monads/result/isOk/index.ts"
import isError from "../../../monads/result/isError/index.ts"

Deno.test("_checkRangeAsResult returns ok(true) when value is between min (inclusive) and max (exclusive)", function () {
	const result = _checkRangeAsResult(1)(10)(5)

	assert(isOk(result))
	assertEquals(result.value, true)
})

Deno.test("_checkRangeAsResult returns ok(true) when value equals min", function () {
	const result = _checkRangeAsResult(1)(10)(1)

	assert(isOk(result))
	assertEquals(result.value, true)
})

Deno.test("_checkRangeAsResult returns error when value equals max", function () {
	const result = _checkRangeAsResult(1)(10)(10)

	assert(isError(result))
	assertEquals(result.error.code, "VALUE_OUT_OF_RANGE")
	assertEquals(result.error.received, 10)
})

Deno.test("_checkRangeAsResult returns error when value is below min", function () {
	const result = _checkRangeAsResult(1)(10)(0)

	assert(isError(result))
	assertEquals(result.error.messages[0], "Value must be between 1 (inclusive) and 10 (exclusive)")
})

Deno.test("_checkRangeAsResult returns error when value is above max", function () {
	const result = _checkRangeAsResult(1)(10)(11)

	assert(isError(result))
	assertEquals(result.error.messages[0], "Value must be between 1 (inclusive) and 10 (exclusive)")
})

Deno.test("_checkRangeAsResult handles negative ranges", function () {
	const result = _checkRangeAsResult(-10)(-1)(-5)

	assert(isOk(result))
	assertEquals(result.value, true)
})
