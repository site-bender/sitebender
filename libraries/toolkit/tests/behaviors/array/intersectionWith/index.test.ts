import { assertEquals } from "jsr:@std/assert@1.0.8"
import * as fc from "npm:fast-check@3"

import intersectionWith from "../../../../src/simple/array/intersectionWith/index.ts"

Deno.test("intersectionWith: returns elements from first array that have equivalents in second according to comparator", () => {
	// Basic intersection with equality comparator
	const equals = (a: number, b: number) => a === b
	assertEquals(intersectionWith(equals)([2, 3, 4])([1, 2, 3]), [2, 3])
	assertEquals(intersectionWith(equals)([1, 2])([3, 4]), [])
})

Deno.test("intersectionWith: handles case-insensitive string comparison", () => {
	const caseInsensitive = (a: string, b: string) =>
		a.toLowerCase() === b.toLowerCase()

	assertEquals(
		intersectionWith(caseInsensitive)(["B", "C"])(["a", "b", "c"]),
		["b", "c"],
	)
	assertEquals(
		intersectionWith(caseInsensitive)(["HELLO", "WORLD"])(["hello", "goodbye"]),
		["hello"],
	)
})

Deno.test("intersectionWith: handles object comparison by property", () => {
	type User = { id: number; name: string }
	const byId = (a: User, b: User) => a.id === b.id

	const users1: Array<User> = [
		{ id: 1, name: "Alice" },
		{ id: 2, name: "Bob" },
		{ id: 3, name: "Charlie" },
	]
	const users2: Array<User> = [
		{ id: 2, name: "Bobby" },
		{ id: 4, name: "David" },
	]

	assertEquals(
		intersectionWith(byId)(users2)(users1),
		[{ id: 2, name: "Bob" }],
	)
})

Deno.test("intersectionWith: handles approximate numeric equality", () => {
	const approxEqual = (a: number, b: number) => Math.abs(a - b) < 0.1

	assertEquals(
		intersectionWith(approxEqual)([1.0, 2.0, 3.0])([1.05, 2.95, 4.0]),
		[1.05, 2.95],
	)
	assertEquals(
		intersectionWith(approxEqual)([5.0])([5.2]),
		[],
	)
})

Deno.test("intersectionWith: preserves duplicates from first array", () => {
	const equals = (a: number, b: number) => a === b
	assertEquals(
		intersectionWith(equals)([2, 3])([1, 1, 2, 2, 3, 3]),
		[2, 2, 3, 3],
	)
	assertEquals(
		intersectionWith(equals)([1])([1, 1, 1]),
		[1, 1, 1],
	)
})

Deno.test("intersectionWith: handles different types for arrays", () => {
	// String to number comparison by parsing
	const strToNum = (a: string, b: number) => parseInt(a) === b
	assertEquals(
		intersectionWith(strToNum)([1, 2, 3])(["1", "3", "5"]),
		["1", "3"],
	)

	// Object to primitive comparison
	type Item = { value: number }
	const objToNum = (a: Item, b: number) => a.value === b
	assertEquals(
		intersectionWith(objToNum)([2, 4])([{ value: 1 }, { value: 2 }, {
			value: 3,
		}]),
		[{ value: 2 }],
	)
})

Deno.test("intersectionWith: handles complex comparator logic", () => {
	// Multiple field comparison
	type Point = { x: number; y: number }
	const samePoint = (a: Point, b: Point) => a.x === b.x && a.y === b.y

	const points1: Array<Point> = [
		{ x: 0, y: 0 },
		{ x: 1, y: 1 },
		{ x: 2, y: 2 },
	]
	const points2: Array<Point> = [
		{ x: 1, y: 1 },
		{ x: 3, y: 3 },
	]

	assertEquals(
		intersectionWith(samePoint)(points2)(points1),
		[{ x: 1, y: 1 }],
	)
})

Deno.test("intersectionWith: handles empty arrays", () => {
	const equals = (a: number, b: number) => a === b
	assertEquals(intersectionWith(equals)([])([1, 2, 3]), [])
	assertEquals(intersectionWith(equals)([1, 2])([]), [])
	assertEquals(intersectionWith(equals)([])([]), [])
})

Deno.test("intersectionWith: handles null and undefined", () => {
	const equals = (a: number, b: number) => a === b
	assertEquals(intersectionWith(equals)(null)([1, 2, 3]), [])
	assertEquals(intersectionWith(equals)(undefined)([1, 2, 3]), [])
	assertEquals(intersectionWith(equals)([1, 2])(null), [])
	assertEquals(intersectionWith(equals)([1, 2])(undefined), [])
	assertEquals(intersectionWith(equals)(null)(null), [])
	assertEquals(intersectionWith(equals)(undefined)(undefined), [])
})

Deno.test("intersectionWith: comparator that always returns false", () => {
	const alwaysFalse = () => false
	assertEquals(intersectionWith(alwaysFalse)([1, 2])([3, 4]), [])
	assertEquals(intersectionWith(alwaysFalse)([1, 2])([1, 2]), [])
})

Deno.test("intersectionWith: comparator that always returns true", () => {
	const alwaysTrue = () => true
	assertEquals(intersectionWith(alwaysTrue)([1])([3, 4, 5]), [3, 4, 5])
	assertEquals(intersectionWith(alwaysTrue)([1, 2])([3]), [3])
})

Deno.test("intersectionWith: is curried properly", () => {
	const equals = (a: number, b: number) => a === b
	const intersectWithEquals = intersectionWith(equals)
	const intersectWith123 = intersectWithEquals([1, 2, 3])

	assertEquals(intersectWith123([2, 3, 4]), [2, 3])
	assertEquals(intersectWith123([5, 6]), [])

	// Test partial application
	type Item = { id: number }
	const byId = (a: Item, b: Item) => a.id === b.id
	const intersectById = intersectionWith(byId)

	const list1 = [{ id: 1 }, { id: 2 }]
	const list2 = [{ id: 2 }, { id: 3 }]
	assertEquals(intersectById(list2)(list1), [{ id: 2 }])
})

Deno.test("intersectionWith: property-based testing", () => {
	// Intersection is always a subset of the first array
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.integer()),
			(arr1, arr2) => {
				const equals = (a: number, b: number) => a === b
				const result = intersectionWith(equals)(arr2)(arr1)
				return result.every((item) => arr1.includes(item))
			},
		),
	)

	// Empty result when no matches
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: 0, max: 100 })),
			fc.array(fc.integer({ min: 200, max: 300 })),
			(arr1, arr2) => {
				const equals = (a: number, b: number) => a === b
				const result = intersectionWith(equals)(arr2)(arr1)
				return result.length === 0
			},
		),
	)

	// Commutative property with equality comparator (same elements, different order)
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.integer()),
			(arr1, arr2) => {
				const equals = (a: number, b: number) => a === b
				const result1 = intersectionWith(equals)(arr2)(arr1)
				const result2 = intersectionWith(equals)(arr1)(arr2)
				// Should contain same unique elements (though order/duplicates may differ)
				const unique1 = [...new Set(result1)]
				const unique2 = [...new Set(result2)]
				return unique1.length === unique2.length &&
					unique1.every((item) => unique2.includes(item))
			},
		),
	)

	// With always-true comparator, result equals first array
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.integer()).filter((arr) => arr.length > 0),
			(arr1, arr2) => {
				const alwaysTrue = () => true
				const result = intersectionWith(alwaysTrue)(arr2)(arr1)
				return result.length === arr1.length &&
					result.every((item, index) => item === arr1[index])
			},
		),
	)
})

Deno.test("intersectionWith: handles special values", () => {
	// NaN comparison
	const isNaN = (a: number, b: number) => Number.isNaN(a) && Number.isNaN(b)
	assertEquals(intersectionWith(isNaN)([NaN])([NaN, 1, 2]), [NaN])

	// Infinity comparison
	const equals = (a: number, b: number) => a === b
	assertEquals(
		intersectionWith(equals)([Infinity, -Infinity])([Infinity, 0]),
		[Infinity],
	)

	// Mixed types with type guard
	const mixedEquals = (a: unknown, b: unknown) => a === b
	assertEquals(
		intersectionWith(mixedEquals)([1, "2", true])(["2", false, 1]),
		["2", 1],
	)
})

Deno.test("intersectionWith: maintains referential integrity", () => {
	const obj1 = { id: 1 }
	const obj2 = { id: 2 }
	const obj3 = { id: 3 }

	const arr1 = [obj1, obj2]
	const arr2 = [obj2, obj3]

	const byReference = (a: object, b: object) => a === b
	const result = intersectionWith(byReference)(arr2)(arr1)

	assertEquals(result, [obj2])
	// Same reference, not a copy
	assertEquals(result[0] === obj2, true)
})
