import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import sortBy from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

//++ Tests for sortBy (sort by mapping function with three-path pattern)

//++ Plain array path tests

Deno.test("sortBy sorts by number property", function testSortByNumber() {
	function getAge(person: { age: number }): number {
		return person.age
	}
	const result = sortBy(getAge)([
		{ age: 30 },
		{ age: 20 },
		{ age: 40 },
	])

	assertEquals(result, [{ age: 20 }, { age: 30 }, { age: 40 }])
})

Deno.test("sortBy sorts by string property", function testSortByString() {
	function getName(person: { name: string }): string {
		return person.name
	}
	const result = sortBy(getName)([
		{ name: "Charlie" },
		{ name: "Alice" },
		{ name: "Bob" },
	])

	assertEquals(result, [
		{ name: "Alice" },
		{ name: "Bob" },
		{ name: "Charlie" },
	])
})

Deno.test("sortBy handles empty array", function testSortByEmpty() {
	function getId(item: { id: number }): number {
		return item.id
	}
	const result = sortBy(getId)([])

	assertEquals(result, [])
})

Deno.test("sortBy handles single element", function testSortBySingle() {
	function getValue(item: { value: number }): number {
		return item.value
	}
	const result = sortBy(getValue)([{ value: 42 }])

	assertEquals(result, [{ value: 42 }])
})

Deno.test("sortBy maintains stable sort order", function testSortByStable() {
	function getCategory(item: { cat: string; id: number }): string {
		return item.cat
	}
	const result = sortBy(getCategory)([
		{ cat: "b", id: 1 },
		{ cat: "a", id: 2 },
		{ cat: "b", id: 3 },
	])

	assertEquals(result, [
		{ cat: "a", id: 2 },
		{ cat: "b", id: 1 },
		{ cat: "b", id: 3 },
	])
})

Deno.test("sortBy with complex transformation", function testSortByComplex() {
	function getLength(s: string): number {
		return s.length
	}
	const result = sortBy(getLength)(["aaa", "b", "cc", "dddd"])

	assertEquals(result, ["b", "cc", "aaa", "dddd"])
})

//++ Result monad path tests

Deno.test("sortBy with Result ok returns ok with sorted array", function testSortByResultOk() {
	function getAge(person: { age: number }): number {
		return person.age
	}
	const input = ok([{ age: 30 }, { age: 20 }])
	const result = sortBy(getAge)(input)

	assertEquals(result, ok([{ age: 20 }, { age: 30 }]))
})

Deno.test("sortBy with Result error passes through unchanged", function testSortByResultError() {
	function getId(item: { id: number }): number {
		return item.id
	}
	const err = error({ _tag: "ValidationError", message: "test error" })
	const result = sortBy(getId)(err)

	assertEquals(result, err)
})

Deno.test("sortBy with Result ok empty array", function testSortByResultEmpty() {
	function getValue(item: { value: number }): number {
		return item.value
	}
	const input = ok<ReadonlyArray<{ value: number }>>([])
	const result = sortBy(getValue)(input)

	assertEquals(result, ok([]))
})

//++ Validation monad path tests

Deno.test("sortBy with Validation success returns success with sorted array", function testSortByValidationSuccess() {
	function getAge(person: { age: number }): number {
		return person.age
	}
	const input = success([{ age: 30 }, { age: 20 }])
	const result = sortBy(getAge)(input)

	assertEquals(result, success([{ age: 20 }, { age: 30 }]))
})

Deno.test("sortBy with Validation failure passes through unchanged", function testSortByValidationFailure() {
	function getId(item: { id: number }): number {
		return item.id
	}
	const fail = failure([{ _tag: "ValidationError", message: "test error" }])
	const result = sortBy(getId)(fail)

	assertEquals(result, fail)
})

Deno.test("sortBy with Validation success empty array", function testSortByValidationEmpty() {
	function getValue(item: { value: number }): number {
		return item.value
	}
	const input = success<ReadonlyArray<{ value: number }>>([])
	const result = sortBy(getValue)(input)

	assertEquals(result, success([]))
})

//++ Property-based tests

Deno.test("sortBy property: result is sorted by key", function testSortByPropertySorted() {
	fc.assert(
		fc.property(
			fc.array(fc.record({ value: fc.integer(), id: fc.integer() })),
			function testIsSorted(arr) {
				function getValue(item: { value: number; id: number }): number {
					return item.value
				}
				const result = sortBy(getValue)(arr) as ReadonlyArray<{
					value: number
					id: number
				}>

				function checkSorted(index: number): boolean {
					if (index >= result.length - 1) {
						return true
					}

					if (result[index].value > result[index + 1].value) {
						return false
					}

					return checkSorted(index + 1)
				}

				return checkSorted(0)
			},
		),
	)
})

Deno.test("sortBy property: preserves length", function testSortByPropertyLength() {
	fc.assert(
		fc.property(
			fc.array(fc.record({ value: fc.integer() })),
			function testLength(arr) {
				function getValue(item: { value: number }): number {
					return item.value
				}
				const result = sortBy(getValue)(arr) as ReadonlyArray<{
					value: number
				}>

				return result.length === arr.length
			},
		),
	)
})
