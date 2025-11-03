import { assertEquals } from "@std/assert"

import _sortArray from "./index.ts"

Deno.test("_sortArray sorts numbers in ascending order by default", function testSortArrayNumbers() {
	const result = _sortArray<number>()([3, 1, 4, 1, 5, 9, 2, 6])

	assertEquals(result, [1, 1, 2, 3, 4, 5, 6, 9])
})

Deno.test("_sortArray sorts with custom comparator", function testSortArrayCustom() {
	function descending(a: number, b: number): number {
		return b - a
	}
	const result = _sortArray(descending)([3, 1, 4, 1, 5])

	assertEquals(result, [5, 4, 3, 1, 1])
})

Deno.test("_sortArray handles empty array", function testSortArrayEmpty() {
	const result = _sortArray<number>()([])

	assertEquals(result, [])
})

Deno.test("_sortArray handles single element", function testSortArraySingle() {
	const result = _sortArray<number>()([42])

	assertEquals(result, [42])
})
