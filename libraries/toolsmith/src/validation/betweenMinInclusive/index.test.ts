import type { ValidationError } from "../../types/fp/validation/index.ts"

import { assert, assertEquals } from "@std/assert"

import betweenMinInclusive from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import success from "../../monads/validation/success/index.ts"
import isError from "../../monads/result/isError/index.ts"
import isFailure from "../../monads/validation/isFailure/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"

Deno.test("betweenMinInclusive returns true when value is between min and max", function () {
	const result = betweenMinInclusive(1)(10)(5)

	assertEquals(result, true)
})

Deno.test("betweenMinInclusive returns true when value equals min", function () {
	const result = betweenMinInclusive(1)(10)(1)

	assertEquals(result, true)
})

Deno.test("betweenMinInclusive returns false when value equals max", function () {
	const result = betweenMinInclusive(1)(10)(10)

	assertEquals(result, false)
})

Deno.test("betweenMinInclusive returns false when value is below min", function () {
	const result = betweenMinInclusive(1)(10)(0)

	assertEquals(result, false)
})

Deno.test("betweenMinInclusive returns false when value is above max", function () {
	const result = betweenMinInclusive(1)(10)(11)

	assertEquals(result, false)
})

Deno.test("betweenMinInclusive with Result returns ok(true) when value is in range", function () {
	const result = betweenMinInclusive(0)(100)(ok(0))

	assert(isOk(result))

	if (isOk(result)) {
		assert(result.value)
	}
})

Deno.test("betweenMinInclusive with Result returns error when value equals max", function () {
	const result = betweenMinInclusive(0)(100)(ok(100))

	assert(isError(result))

	if (isError(result)) {
		assertEquals((result.error as ValidationError).code, "VALUE_OUT_OF_RANGE")
	}
})

Deno.test("betweenMinInclusive with Validation returns success(true) when value is in range", function () {
	const result = betweenMinInclusive(0)(100)(success(50))

	assert(isSuccess(result))

	if (isSuccess(result)) {
		assert(result.value)
	}
})

Deno.test("betweenMinInclusive with Validation returns failure when value is out of range", function () {
	const result = betweenMinInclusive(0)(100)(success(100))

	assert(isFailure(result))

	if (isFailure(result)) {
		assertEquals((result.errors[0] as ValidationError).code, "VALUE_OUT_OF_RANGE")
	}
})
