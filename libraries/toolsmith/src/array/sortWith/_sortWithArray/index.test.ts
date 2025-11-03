import { assertEquals } from "@std/assert"

import _sortWithArray from "./index.ts"

Deno.test("_sortWithArray sorts with single comparator", function testSortWithArraySingle() {
	function ascending(a: number, b: number): number {
		return a - b
	}
	const result = _sortWithArray([ascending])([3, 1, 2])

	assertEquals(result, [1, 2, 3])
})

Deno.test("_sortWithArray sorts with multiple comparators", function testSortWithArrayMultiple() {
	function byAge(
		a: { age: number; name: string },
		b: { age: number; name: string },
	): number {
		return a.age - b.age
	}
	function byName(
		a: { age: number; name: string },
		b: { age: number; name: string },
	): number {
		return a.name.localeCompare(b.name)
	}
	const result = _sortWithArray([byAge, byName])([
		{ age: 30, name: "Bob" },
		{ age: 20, name: "Alice" },
		{ age: 30, name: "Alice" },
	])

	assertEquals(result, [
		{ age: 20, name: "Alice" },
		{ age: 30, name: "Alice" },
		{ age: 30, name: "Bob" },
	])
})

Deno.test("_sortWithArray handles empty comparators", function testSortWithArrayEmpty() {
	const result = _sortWithArray<number>([])([3, 1, 2])

	assertEquals(result, [3, 1, 2])
})

Deno.test("_sortWithArray handles empty array", function testSortWithArrayEmptyInput() {
	function ascending(a: number, b: number): number {
		return a - b
	}
	const result = _sortWithArray([ascending])([])

	assertEquals(result, [])
})
