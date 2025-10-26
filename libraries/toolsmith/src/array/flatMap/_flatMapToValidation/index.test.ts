import { assert, assertEquals } from "@std/assert"

import _flatMapToValidation from "./index.ts"
import isSuccess from "../../../monads/validation/isSuccess/index.ts"
import isFailure from "../../../monads/validation/isFailure/index.ts"

Deno.test("_flatMapToValidation returns success with flatMapped array", function () {
	const duplicate = function (n: number): ReadonlyArray<number> {
		return [n, n]
	}
	const result = _flatMapToValidation(duplicate)([1, 2, 3])

	assert(isSuccess(result))
	if (isSuccess(result)) {
		assertEquals(result.value, [1, 1, 2, 2, 3, 3])
	}
})

Deno.test("_flatMapToValidation handles empty arrays", function () {
	const duplicate = function (n: number): ReadonlyArray<number> {
		return [n, n]
	}
	const result = _flatMapToValidation(duplicate)([])

	assert(isSuccess(result))
	if (isSuccess(result)) {
		assertEquals(result.value, [])
	}
})

Deno.test("_flatMapToValidation handles type transformations", function () {
	const splitChars = function (s: string): ReadonlyArray<string> {
		return s.split("")
	}
	const result = _flatMapToValidation(splitChars)(["ab", "cd"])

	assert(isSuccess(result))
	if (isSuccess(result)) {
		assertEquals(result.value, ["a", "b", "c", "d"])
	}
})

Deno.test("_flatMapToValidation handles variable length results", function () {
	const repeatByValue = function (n: number): ReadonlyArray<number> {
		return Array(n).fill(n)
	}
	const result = _flatMapToValidation(repeatByValue)([1, 2, 3])

	assert(isSuccess(result))
	if (isSuccess(result)) {
		assertEquals(result.value, [1, 2, 2, 3, 3, 3])
	}
})

Deno.test("_flatMapToValidation returns failure when array is invalid", function () {
	const duplicate = function (n: number): ReadonlyArray<number> {
		return [n, n]
	}
	const result = _flatMapToValidation(duplicate)(null as never)

	assert(isFailure(result))
	if (isFailure(result)) {
		assertEquals(result.errors[0].code, "INVALID_ARRAY")
	}
})

Deno.test("_flatMapToValidation returns failure when function is invalid", function () {
	const result = _flatMapToValidation(null as never)([1, 2, 3])

	assert(isFailure(result))
	if (isFailure(result)) {
		assertEquals(result.errors[0].code, "INVALID_FUNCTION")
	}
})
