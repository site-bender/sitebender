import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import sortWith from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

//++ Tests for sortWith (sort with multiple comparators and three-path pattern)

//++ Plain array path tests

Deno.test("sortWith with single comparator", function testSortWithSingle() {
	function ascending(a: number, b: number): number {
		return a - b
	}
	const result = sortWith([ascending])([3, 1, 4, 1, 5])

	assertEquals(result, [1, 1, 3, 4, 5])
})

Deno.test("sortWith with multiple comparators", function testSortWithMultiple() {
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
	const result = sortWith([byAge, byName])([
		{ age: 30, name: "Charlie" },
		{ age: 20, name: "Alice" },
		{ age: 30, name: "Alice" },
		{ age: 20, name: "Bob" },
	])

	assertEquals(result, [
		{ age: 20, name: "Alice" },
		{ age: 20, name: "Bob" },
		{ age: 30, name: "Alice" },
		{ age: 30, name: "Charlie" },
	])
})

Deno.test("sortWith with empty comparators returns copy", function testSortWithEmptyComparators() {
	const result = sortWith<number>([])([3, 1, 2])

	assertEquals(result, [3, 1, 2])
})

Deno.test("sortWith handles empty array", function testSortWithEmpty() {
	function ascending(a: number, b: number): number {
		return a - b
	}
	const result = sortWith([ascending])([])

	assertEquals(result, [])
})

Deno.test("sortWith handles single element", function testSortWithSingle() {
	function ascending(a: number, b: number): number {
		return a - b
	}
	const result = sortWith([ascending])([42])

	assertEquals(result, [42])
})

Deno.test("sortWith applies comparators in order", function testSortWithOrder() {
	function byFirst(
		a: { x: number; y: number },
		b: { x: number; y: number },
	): number {
		return a.x - b.x
	}
	function bySecond(
		a: { x: number; y: number },
		b: { x: number; y: number },
	): number {
		return a.y - b.y
	}
	const result = sortWith([byFirst, bySecond])([
		{ x: 1, y: 3 },
		{ x: 2, y: 1 },
		{ x: 1, y: 1 },
		{ x: 2, y: 2 },
	])

	assertEquals(result, [
		{ x: 1, y: 1 },
		{ x: 1, y: 3 },
		{ x: 2, y: 1 },
		{ x: 2, y: 2 },
	])
})

//++ Result monad path tests

Deno.test("sortWith with Result ok returns ok with sorted array", function testSortWithResultOk() {
	function ascending(a: number, b: number): number {
		return a - b
	}
	const input = ok([3, 1, 2])
	const result = sortWith([ascending])(input)

	assertEquals(result, ok([1, 2, 3]))
})

Deno.test("sortWith with Result ok and multiple comparators", function testSortWithResultMultiple() {
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
	const input = ok([
		{ age: 30, name: "Bob" },
		{ age: 20, name: "Alice" },
	])
	const result = sortWith([byAge, byName])(input)

	assertEquals(
		result,
		ok([
			{ age: 20, name: "Alice" },
			{ age: 30, name: "Bob" },
		]),
	)
})

Deno.test("sortWith with Result error passes through unchanged", function testSortWithResultError() {
	function ascending(a: number, b: number): number {
		return a - b
	}
	const err = error({ _tag: "ValidationError", message: "test error" })
	const result = sortWith([ascending])(err)

	assertEquals(result, err)
})

Deno.test("sortWith with Result ok empty array", function testSortWithResultEmpty() {
	function ascending(a: number, b: number): number {
		return a - b
	}
	const input = ok<ReadonlyArray<number>>([])
	const result = sortWith([ascending])(input)

	assertEquals(result, ok([]))
})

//++ Validation monad path tests

Deno.test("sortWith with Validation success returns success with sorted array", function testSortWithValidationSuccess() {
	function ascending(a: number, b: number): number {
		return a - b
	}
	const input = success([3, 1, 2])
	const result = sortWith([ascending])(input)

	assertEquals(result, success([1, 2, 3]))
})

Deno.test("sortWith with Validation success and multiple comparators", function testSortWithValidationMultiple() {
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
	const input = success([
		{ age: 30, name: "Bob" },
		{ age: 20, name: "Alice" },
	])
	const result = sortWith([byAge, byName])(input)

	assertEquals(
		result,
		success([
			{ age: 20, name: "Alice" },
			{ age: 30, name: "Bob" },
		]),
	)
})

Deno.test("sortWith with Validation failure passes through unchanged", function testSortWithValidationFailure() {
	function ascending(a: number, b: number): number {
		return a - b
	}
	const fail = failure([{ _tag: "ValidationError", message: "test error" }])
	const result = sortWith([ascending])(fail)

	assertEquals(result, fail)
})

Deno.test("sortWith with Validation success empty array", function testSortWithValidationEmpty() {
	function ascending(a: number, b: number): number {
		return a - b
	}
	const input = success<ReadonlyArray<number>>([])
	const result = sortWith([ascending])(input)

	assertEquals(result, success([]))
})

//++ Property-based tests

Deno.test("sortWith property: result is sorted", function testSortWithPropertySorted() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function testIsSorted(arr) {
				function ascending(a: number, b: number): number {
					return a - b
				}
				const result = sortWith([ascending])(arr) as ReadonlyArray<number>

				function checkSorted(index: number): boolean {
					if (index >= result.length - 1) {
						return true
					}

					if (result[index] > result[index + 1]) {
						return false
					}

					return checkSorted(index + 1)
				}

				return checkSorted(0)
			},
		),
	)
})

Deno.test("sortWith property: preserves length", function testSortWithPropertyLength() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function testLength(arr) {
				function ascending(a: number, b: number): number {
					return a - b
				}
				const result = sortWith([ascending])(arr) as ReadonlyArray<number>

				return result.length === arr.length
			},
		),
	)
})
