import { assert, assertEquals } from "@std/assert"

import _mapAsValidation from "./index.ts"
import isSuccess from "../../../monads/validation/isSuccess/index.ts"

Deno.test("_mapAsValidation returns success with mapped array", function () {
	const double = function (n: number): number {
		return n * 2
	}
	const result = _mapAsValidation(double)([1, 2, 3])

	assert(isSuccess(result))
	assertEquals(result.value, [2, 4, 6])
})

Deno.test("_mapAsValidation handles empty arrays", function () {
	const double = function (n: number): number {
		return n * 2
	}
	const result = _mapAsValidation(double)([])

	assert(isSuccess(result))
	assertEquals(result.value, [])
})

Deno.test("_mapAsValidation handles type transformations", function () {
	const toString = function (n: number): string {
		return String(n)
	}
	const result = _mapAsValidation(toString)([1, 2, 3])

	assert(isSuccess(result))
	assertEquals(result.value, ["1", "2", "3"])
})

Deno.test("_mapAsValidation preserves array length", function () {
	const identity = function <T>(x: T): T {
		return x
	}
	const result = _mapAsValidation(identity)([1, 2, 3, 4, 5])

	assert(isSuccess(result))
	assertEquals(result.value.length, 5)
})
