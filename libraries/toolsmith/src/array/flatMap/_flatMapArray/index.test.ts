import { assertEquals } from "@std/assert"

import _flatMapArray from "./index.ts"

Deno.test("_flatMapArray flatMaps over array when given valid function and array", function () {
	const duplicate = function (n: number): ReadonlyArray<number> {
		return [n, n]
	}
	const result = _flatMapArray(duplicate)([1, 2, 3])

	assertEquals(result, [1, 1, 2, 2, 3, 3])
})

Deno.test("_flatMapArray returns array unchanged when fn is not a function", function () {
	const result = _flatMapArray(true as never)([1, 2, 3])

	assertEquals(result, [1, 2, 3])
})

Deno.test("_flatMapArray returns input unchanged when array is not an array", function () {
	const duplicate = function (n: number): ReadonlyArray<number> {
		return [n, n]
	}
	const result = _flatMapArray(duplicate)(false as never)

	assertEquals(result, false)
})

Deno.test("_flatMapArray handles empty arrays", function () {
	const duplicate = function (n: number): ReadonlyArray<number> {
		return [n, n]
	}
	const result = _flatMapArray(duplicate)([])

	assertEquals(result, [])
})

Deno.test("_flatMapArray handles type transformations", function () {
	const splitChars = function (s: string): ReadonlyArray<string> {
		return s.split("")
	}
	const result = _flatMapArray(splitChars)(["ab", "cd"])

	assertEquals(result, ["a", "b", "c", "d"])
})

Deno.test("_flatMapArray returns undefined unchanged if passed as array", function () {
	const duplicate = function (n: number): ReadonlyArray<number> {
		return [n, n]
	}
	const result = _flatMapArray(duplicate)(undefined as never)

	assertEquals(result, undefined)
})

Deno.test("_flatMapArray handles variable length results", function () {
	const repeatByValue = function (n: number): ReadonlyArray<number> {
		return Array(n).fill(n)
	}
	const result = _flatMapArray(repeatByValue)([1, 2, 3])

	assertEquals(result, [1, 2, 2, 3, 3, 3])
})

Deno.test("_flatMapArray handles functions returning empty arrays", function () {
	const returnEmpty = function (_n: number): ReadonlyArray<number> {
		return []
	}
	const result = _flatMapArray(returnEmpty)([1, 2, 3])

	assertEquals(result, [])
})
