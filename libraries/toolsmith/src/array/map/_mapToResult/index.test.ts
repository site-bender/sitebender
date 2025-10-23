import { assert, assertEquals } from "@std/assert"

import _mapAsResult from "./index.ts"
import isOk from "../../../monads/result/isOk/index.ts"

Deno.test("_mapAsResult returns ok with mapped array", function () {
	const double = function (n: number): number {
		return n * 2
	}
	const result = _mapAsResult(double)([1, 2, 3])

	assert(isOk(result))
	assertEquals(result.value, [2, 4, 6])
})

Deno.test("_mapAsResult handles empty arrays", function () {
	const double = function (n: number): number {
		return n * 2
	}
	const result = _mapAsResult(double)([])

	assert(isOk(result))
	assertEquals(result.value, [])
})

Deno.test("_mapAsResult handles type transformations", function () {
	const toString = function (n: number): string {
		return String(n)
	}
	const result = _mapAsResult(toString)([1, 2, 3])

	assert(isOk(result))
	assertEquals(result.value, ["1", "2", "3"])
})

Deno.test("_mapAsResult preserves array length", function () {
	const identity = function <T>(x: T): T {
		return x
	}
	const result = _mapAsResult(identity)([1, 2, 3, 4, 5])

	assert(isOk(result))
	assertEquals(result.value.length, 5)
})
