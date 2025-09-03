import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import union from "../../../../src/simple/array/union/index.ts"

Deno.test("union - combines two arrays with unique elements", () => {
	const unionWith123 = union([1, 2, 3])
	
	assertEquals(unionWith123([3, 4, 5]), [1, 2, 3, 4, 5])
	assertEquals(unionWith123([4, 5, 6]), [1, 2, 3, 4, 5, 6])
	assertEquals(unionWith123([1, 2, 3]), [1, 2, 3])
})

Deno.test("union - handles string arrays", () => {
	const unionWithABC = union(["a", "b", "c"])
	
	assertEquals(unionWithABC(["c", "d", "e"]), ["a", "b", "c", "d", "e"])
	assertEquals(unionWithABC(["x", "y", "z"]), ["a", "b", "c", "x", "y", "z"])
	assertEquals(unionWithABC(["a", "b", "c"]), ["a", "b", "c"])
})

Deno.test("union - removes duplicates within inputs", () => {
	assertEquals(union([1, 1, 2, 2])([2, 2, 3, 3]), [1, 2, 3])
	assertEquals(union([1, 2, 1, 2])([3, 4, 3, 4]), [1, 2, 3, 4])
	assertEquals(union(["a", "a", "b"])(['b', "c", "c"]), ["a", "b", "c"])
})

Deno.test("union - handles empty arrays", () => {
	const withNumbers = union([1, 2, 3])
	assertEquals(withNumbers([]), [1, 2, 3])
	
	const withEmpty = union([])
	assertEquals(withEmpty([1, 2, 3]), [1, 2, 3])
	assertEquals(withEmpty([]), [])
})

Deno.test("union - handles null and undefined", () => {
	// First array null/undefined
	assertEquals(union(null)([1, 2]), [1, 2])
	assertEquals(union(undefined)([1, 2]), [1, 2])
	
	// Second array null/undefined
	const withArray = union([1, 2])
	assertEquals(withArray(null), [1, 2])
	assertEquals(withArray(undefined), [1, 2])
	
	// Both null/undefined
	assertEquals(union(null)(null), [])
	assertEquals(union(undefined)(undefined), [])
	assertEquals(union(null)(undefined), [])
})

Deno.test("union - preserves order (first array elements, then second)", () => {
	assertEquals(union([3, 2, 1])([6, 5, 4]), [3, 2, 1, 6, 5, 4])
	assertEquals(union([3, 2, 1])([2, 4, 6]), [3, 2, 1, 4, 6])
})

Deno.test("union - works with objects", () => {
	const obj1 = { id: 1 }
	const obj2 = { id: 2 }
	const obj3 = { id: 3 }
	const obj4 = { id: 4 }
	
	const result = union([obj1, obj2, obj1])([obj2, obj3, obj4])
	assertEquals(result, [obj1, obj2, obj3, obj4])
	
	// Different objects with same content are not deduplicated
	const similar1 = { value: 1 }
	const similar2 = { value: 1 }
	assertEquals(union([similar1])([similar2]), [similar1, similar2])
})

Deno.test("union - handles SameValueZero equality", () => {
	// NaN is equal to itself in Set
	assertEquals(union([NaN, 1, NaN])([NaN, 2, NaN]), [NaN, 1, 2])
	
	// +0 and -0 are considered equal
	assertEquals(union([+0, 1])([- 0, 2]), [0, 1, 2])
	assertEquals(union([-0, 1])([+ 0, 2]), [0, 1, 2])
})

Deno.test("union - returns new array instance", () => {
	const arr1 = [1, 2, 3]
	const arr2 = [4, 5, 6]
	const result = union(arr1)(arr2)
	
	assertEquals(result === arr1, false)
	assertEquals(result === arr2, false)
	
	// Even when one is null
	const resultWithNull = union(arr1)(null)
	assertEquals(resultWithNull === arr1, false)
})

Deno.test("union - handles mixed types", () => {
	const mixed1 = [1, "a", true, null, undefined] as const
	const mixed2 = [2, "b", false, null, NaN] as const
	
	const result = union(mixed1)(mixed2)
	assertEquals(result, [1, "a", true, null, undefined, 2, "b", false, NaN])
})

// Property-based tests
Deno.test("union - property: result contains all unique elements from both arrays", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.integer()),
			(arr1, arr2) => {
				const result = union(arr1)(arr2)
				const expected = [...new Set([...arr1, ...arr2])]
				
				assertEquals(new Set(result), new Set(expected))
				return true
			}
		),
		{ numRuns: 100 }
	)
})

Deno.test("union - property: commutative with respect to unique elements", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.integer()),
			(arr1, arr2) => {
				const result1 = union(arr1)(arr2)
				const result2 = union(arr2)(arr1)
				
				// Sets should be equal even if order differs
				assertEquals(new Set(result1), new Set(result2))
				return true
			}
		),
		{ numRuns: 100 }
	)
})

Deno.test("union - property: union with empty array returns unique elements", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			(arr) => {
				const resultWithEmpty1 = union(arr)([])
				const resultWithEmpty2 = union([])(arr)
				
				const uniqueArr = [...new Set(arr)]
				assertEquals(new Set(resultWithEmpty1), new Set(uniqueArr))
				assertEquals(new Set(resultWithEmpty2), new Set(uniqueArr))
				return true
			}
		),
		{ numRuns: 100 }
	)
})

Deno.test("union - property: idempotent", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(arr) => {
				const result = union(arr)(arr)
				const unique = [...new Set(arr)]
				
				assertEquals(result, unique)
				return true
			}
		),
		{ numRuns: 100 }
	)
})

Deno.test("union - property: associative", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: -10, max: 10 }), { maxLength: 10 }),
			fc.array(fc.integer({ min: -10, max: 10 }), { maxLength: 10 }),
			fc.array(fc.integer({ min: -10, max: 10 }), { maxLength: 10 }),
			(arr1, arr2, arr3) => {
				// (A ∪ B) ∪ C = A ∪ (B ∪ C) in terms of unique elements
				const left = union(union(arr1)(arr2))(arr3)
				const right = union(arr1)(union(arr2)(arr3))
				
				assertEquals(new Set(left), new Set(right))
				return true
			}
		),
		{ numRuns: 100 }
	)
})