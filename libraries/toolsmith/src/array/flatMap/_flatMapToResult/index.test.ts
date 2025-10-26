import { assert, assertEquals } from "@std/assert"

import _flatMapToResult from "./index.ts"
import isOk from "../../../monads/result/isOk/index.ts"
import isError from "../../../monads/result/isError/index.ts"

Deno.test("_flatMapToResult returns ok with flatMapped array", function () {
	const duplicate = function (n: number): ReadonlyArray<number> {
		return [n, n]
	}
	const result = _flatMapToResult(duplicate)([1, 2, 3])

	assert(isOk(result))
	if (isOk(result)) {
		assertEquals(result.value, [1, 1, 2, 2, 3, 3])
	}
})

Deno.test("_flatMapToResult handles empty arrays", function () {
	const duplicate = function (n: number): ReadonlyArray<number> {
		return [n, n]
	}
	const result = _flatMapToResult(duplicate)([])

	assert(isOk(result))
	if (isOk(result)) {
		assertEquals(result.value, [])
	}
})

Deno.test("_flatMapToResult handles type transformations", function () {
	const splitChars = function (s: string): ReadonlyArray<string> {
		return s.split("")
	}
	const result = _flatMapToResult(splitChars)(["ab", "cd"])

	assert(isOk(result))
	if (isOk(result)) {
		assertEquals(result.value, ["a", "b", "c", "d"])
	}
})

Deno.test("_flatMapToResult handles variable length results", function () {
	const repeatByValue = function (n: number): ReadonlyArray<number> {
		return Array(n).fill(n)
	}
	const result = _flatMapToResult(repeatByValue)([1, 2, 3])

	assert(isOk(result))
	if (isOk(result)) {
		assertEquals(result.value, [1, 2, 2, 3, 3, 3])
	}
})

Deno.test("_flatMapToResult returns error when array is invalid", function () {
	const duplicate = function (n: number): ReadonlyArray<number> {
		return [n, n]
	}
	const result = _flatMapToResult(duplicate)(null as never)

	assert(isError(result))
	if (isError(result)) {
		assertEquals(result.error.code, "INVALID_ARRAY")
	}
})

Deno.test("_flatMapToResult returns error when function is invalid", function () {
	const result = _flatMapToResult(null as never)([1, 2, 3])

	assert(isError(result))
	if (isError(result)) {
		assertEquals(result.error.code, "INVALID_FUNCTION")
	}
})
