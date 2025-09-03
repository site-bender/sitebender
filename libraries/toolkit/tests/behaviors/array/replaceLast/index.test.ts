import { assertEquals } from "jsr:@std/assert@1"
import { assertType, type IsExact } from "jsr:@std/testing@1/types"
import * as fc from "npm:fast-check@3"

import replaceLast from "../../../../src/simple/array/replaceLast/index.ts"

Deno.test("replaceLast: replaces the last occurrence of a target value", () => {
	const array = [1, 2, 3, 2, 4]
	const result = replaceLast(2)((n) => n * 10)(array)
	assertEquals(result, [1, 2, 3, 20, 4])
})

Deno.test("replaceLast: replaces last string occurrence", () => {
	const array = ["old", "test", "old", "data"]
	const result = replaceLast("old")(() => "new")(array)
	assertEquals(result, ["old", "test", "new", "data"])
})

Deno.test("replaceLast: returns original array when target not found", () => {
	const array = [1, 2, 3]
	const result = replaceLast(5)((n) => n * 2)(array)
	assertEquals(result, [1, 2, 3])
	// Should be the same array reference since nothing changed
	assertEquals(result, array)
})

Deno.test("replaceLast: handles single occurrence correctly", () => {
	const array = [1, 2, 3, 4, 5]
	const result = replaceLast(3)((n) => n * 100)(array)
	assertEquals(result, [1, 2, 300, 4, 5])
})

Deno.test("replaceLast: handles empty array", () => {
	const array: number[] = []
	const result = replaceLast(1)((n) => n * 2)(array)
	assertEquals(result, [])
})

Deno.test("replaceLast: handles null input", () => {
	const result = replaceLast(1)((n) => n * 2)(null)
	assertEquals(result, [])
})

Deno.test("replaceLast: handles undefined input", () => {
	const result = replaceLast(1)((n) => n * 2)(undefined)
	assertEquals(result, [])
})

Deno.test("replaceLast: handles single element array when matching", () => {
	const array = [5]
	const result = replaceLast(5)((n) => n * 2)(array)
	assertEquals(result, [10])
})

Deno.test("replaceLast: handles single element array when not matching", () => {
	const array = [5]
	const result = replaceLast(3)((n) => n * 2)(array)
	assertEquals(result, [5])
})

Deno.test("replaceLast: works with objects using reference equality", () => {
	const obj1 = { id: 1 }
	const obj2 = { id: 2 }
	const obj3 = { id: 1 } // Different object with same content
	const array = [obj1, obj2, obj1, obj3]
	const result = replaceLast(obj1)(() => ({ id: 99 }))(array)
	// Only replaces the last occurrence of obj1 (at index 2)
	assertEquals(result.length, 4)
	assertEquals(result[0], obj1) // First occurrence unchanged
	assertEquals(result[1], obj2)
	assertEquals(result[2].id, 99) // Last occurrence of obj1 replaced
	assertEquals(result[3], obj3) // Different object unchanged
})

Deno.test("replaceLast: handles NaN correctly (NaN !== NaN)", () => {
	const array = [1, NaN, 2, NaN, 3]
	const result = replaceLast(NaN)(() => 999)(array)
	// NaN !== NaN, so it won't be found
	assertEquals(result, [1, NaN, 2, NaN, 3])
})

Deno.test("replaceLast: distinguishes between +0 and -0", () => {
	const array = [1, 0, 2, -0, 3]
	const result = replaceLast(0)(() => 999)(array)
	// JavaScript's === considers 0 === -0, so it finds the last one
	assertEquals(result, [1, 0, 2, 999, 3])
})

Deno.test("replaceLast: handles replacer function with side effects", () => {
	const array = [1, 2, 3, 2, 4]
	let callCount = 0
	const result = replaceLast(2)((n) => {
		callCount++
		return n * 10
	})(array)
	assertEquals(result, [1, 2, 3, 20, 4])
	assertEquals(callCount, 1) // Replacer called only once for the last occurrence
})

Deno.test("replaceLast: preserves array immutability", () => {
	const array = [1, 2, 3, 2, 4]
	const result = replaceLast(2)((n) => n * 10)(array)
	assertEquals(array, [1, 2, 3, 2, 4]) // Original unchanged
	assertEquals(result, [1, 2, 3, 20, 4]) // New array with change
})

Deno.test("replaceLast: is properly curried", () => {
	const replaceTwo = replaceLast(2)
	const doubleTwo = replaceTwo((n) => n * 2)
	
	assertEquals(doubleTwo([1, 2, 3]), [1, 4, 3])
	assertEquals(doubleTwo([2, 2, 2]), [2, 2, 4])
	assertEquals(doubleTwo([5, 6, 7]), [5, 6, 7])
})

Deno.test("replaceLast: handles mixed type arrays", () => {
	const array = ["a", 1, "b", 1, "c", 1]
	const result = replaceLast(1)(() => 999)(array as any[])
	assertEquals(result, ["a", 1, "b", 1, "c", 999])
})

Deno.test("replaceLast: replacer receives correct value", () => {
	const array = [10, 20, 30, 20, 40]
	const result = replaceLast(20)((n) => n + 5)(array)
	assertEquals(result, [10, 20, 30, 25, 40])
})

// Type tests
Deno.test("replaceLast: type inference", () => {
	const numArray = [1, 2, 3]
	const numResult = replaceLast(2)((n) => n * 2)(numArray)
	assertType<IsExact<typeof numResult, number[]>>(true)
	
	const strArray = ["a", "b", "c"]
	const strResult = replaceLast("b")((s) => s.toUpperCase())(strArray)
	assertType<IsExact<typeof strResult, string[]>>(true)
})

// Property-based tests
Deno.test("replaceLast: property - replaces at most one element", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(array, target) => {
				const result = replaceLast(target)(() => -999)(array)
				const originalCount = array.filter(x => x === target).length
				const replacedCount = result.filter(x => x === -999).length
				
				if (originalCount === 0) {
					// No target found, nothing replaced
					return replacedCount === 0
				} else {
					// Target found, exactly one replaced
					return replacedCount === 1
				}
			},
		),
	)
})

Deno.test("replaceLast: property - maintains array length", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			fc.anything(),
			(array, target) => {
				const result = replaceLast(target)(() => "REPLACED")(array)
				return result.length === array.length
			},
		),
	)
})

Deno.test("replaceLast: property - elements before last occurrence unchanged", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: 0, max: 100 })),
			fc.integer({ min: 0, max: 100 }),
			(array, target) => {
				const lastIndex = array.lastIndexOf(target)
				if (lastIndex === -1) return true // No target found
				
				const result = replaceLast(target)(() => -999)(array)
				
				// All elements before the last occurrence should be unchanged
				for (let i = 0; i < lastIndex; i++) {
					if (result[i] !== array[i]) return false
				}
				
				// All elements after the last occurrence should be unchanged
				for (let i = lastIndex + 1; i < array.length; i++) {
					if (result[i] !== array[i]) return false
				}
				
				return true
			},
		),
	)
})

Deno.test("replaceLast: property - replacer is called with correct value", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(array) => {
				if (array.length === 0) return true
				const target = array[Math.floor(Math.random() * array.length)]
				
				let receivedValue: number | undefined
				replaceLast(target)((n) => {
					receivedValue = n
					return n
				})(array)
				
				// If target exists, replacer should receive it
				if (array.includes(target)) {
					return receivedValue === target
				}
				// If target doesn't exist, replacer shouldn't be called
				return receivedValue === undefined
			},
		),
	)
})