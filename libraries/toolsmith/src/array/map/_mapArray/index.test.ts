import { assertEquals } from "@std/assert"

import _mapArray from "./index.ts"

Deno.test("_mapArray maps over array when given valid function and array", function () {
	const double = function (n: number): number {
		return n * 2
	}
	const result = _mapArray(double)([1, 2, 3])

	assertEquals(result, [2, 4, 6])
})

Deno.test("_mapArray returns array unchanged when fn is not a function", function () {
	const result = _mapArray(true)([1, 2, 3])

	assertEquals(result, [1, 2, 3])
})

Deno.test("_mapArray returns input unchanged when array is not an array", function () {
	const double = function (n: number): number {
		return n * 2
	}
	const result = _mapArray(double)(false)

	assertEquals(result, false)
})

Deno.test("_mapArray handles empty arrays", function () {
	const double = function (n: number): number {
		return n * 2
	}
	const result = _mapArray(double)([])

	assertEquals(result, [])
})

Deno.test("_mapArray handles type transformations", function () {
	const toString = function (n: number): string {
		return String(n)
	}
	const result = _mapArray(toString)([1, 2, 3])

	assertEquals(result, ["1", "2", "3"])
})

Deno.test("_mapArray returns undefined unchanged if passed as array", function () {
	const double = function (n: number): number {
		return n * 2
	}
	const result = _mapArray(double)(undefined)

	assertEquals(result, undefined)
})
