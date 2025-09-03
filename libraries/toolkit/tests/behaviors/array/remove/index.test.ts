import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import { assertType, IsExact } from "https://deno.land/std@0.218.0/testing/types.ts"
import * as fc from "npm:fast-check@3"

import remove from "../../../../src/simple/array/remove/index.ts"

Deno.test("remove: basic functionality", async (t) => {
	await t.step("should remove first occurrence of element", () => {
		const result = remove(2)([1, 2, 3, 2, 4])
		assertEquals(result, [1, 3, 2, 4])
	})

	await t.step("should remove string element", () => {
		const result = remove("b")(["a", "b", "c", "b"])
		assertEquals(result, ["a", "c", "b"])
	})

	await t.step("should return original array if element not found", () => {
		const result = remove(5)([1, 2, 3])
		assertEquals(result, [1, 2, 3])
	})

	await t.step("should remove null value", () => {
		const result = remove(null)([1, null, 2, null])
		assertEquals(result, [1, 2, null])
	})

	await t.step("should remove undefined value", () => {
		const result = remove(undefined)([1, undefined, 2, undefined])
		assertEquals(result, [1, 2, undefined])
	})

	await t.step("should handle empty array", () => {
		const result = remove(1)([])
		assertEquals(result, [])
	})

	await t.step("should handle single element array - found", () => {
		const result = remove(1)([1])
		assertEquals(result, [])
	})

	await t.step("should handle single element array - not found", () => {
		const result = remove(2)([1])
		assertEquals(result, [1])
	})

	await t.step("should remove first element", () => {
		const result = remove(1)([1, 2, 3])
		assertEquals(result, [2, 3])
	})

	await t.step("should remove last element", () => {
		const result = remove(3)([1, 2, 3])
		assertEquals(result, [1, 2])
	})

	await t.step("should remove middle element", () => {
		const result = remove(2)([1, 2, 3])
		assertEquals(result, [1, 3])
	})
})

Deno.test("remove: edge cases", async (t) => {
	await t.step("should handle null input", () => {
		const result = remove(1)(null)
		assertEquals(result, [])
	})

	await t.step("should handle undefined input", () => {
		const result = remove(1)(undefined)
		assertEquals(result, [])
	})

	await t.step("should handle NaN values with indexOf behavior", () => {
		// NaN !== NaN, so indexOf will not find it
		const result = remove(NaN)([1, NaN, 2, NaN])
		assertEquals(result, [1, NaN, 2, NaN])
	})

	await t.step("should handle -0 and +0 as equal", () => {
		const result = remove(-0)([1, 0, 2, -0])
		assertEquals(result, [1, 2, -0]) // Removes first 0
	})

	await t.step("should handle objects by reference", () => {
		const obj1 = { a: 1 }
		const obj2 = { a: 1 }
		const obj3 = { a: 2 }
		const result = remove(obj1)([obj1, obj2, obj3, obj1])
		assertEquals(result, [obj2, obj3, obj1]) // Only removes first obj1 reference
	})

	await t.step("should handle arrays by reference", () => {
		const arr1 = [1, 2]
		const arr2 = [1, 2]
		const result = remove(arr1)([arr1, arr2, arr1])
		assertEquals(result, [arr2, arr1]) // Only removes first arr1 reference
	})

	await t.step("should preserve array immutability", () => {
		const original = [1, 2, 3, 2]
		const result = remove(2)(original)
		assertEquals(result, [1, 3, 2])
		assertEquals(original, [1, 2, 3, 2]) // Original unchanged
	})

	await t.step("should return new array even when element not found", () => {
		const original = [1, 2, 3]
		const result = remove(4)(original)
		assertEquals(result, [1, 2, 3])
		assertEquals(result === original, false) // New array instance
	})
})

Deno.test("remove: type safety", async (t) => {
	await t.step("should correctly infer types", () => {
		const result = remove(2)([1, 2, 3])
		assertType<IsExact<typeof result, number[]>>(true)
	})

	await t.step("should handle union types", () => {
		const result = remove("b")(["a", "b", 1, 2])
		assertType<IsExact<typeof result, (string | number)[]>>(true)
		assertEquals(result, ["a", 1, 2])
	})

	await t.step("should handle complex types", () => {
		type Item = { id: number; name: string }
		const item1: Item = { id: 1, name: "a" }
		const item2: Item = { id: 2, name: "b" }
		const result = remove(item1)([item1, item2, item1])
		assertType<IsExact<typeof result, Item[]>>(true)
		assertEquals(result, [item2, item1])
	})
})

Deno.test("remove: currying", async (t) => {
	await t.step("should be fully curried", () => {
		const removeTwo = remove(2)
		
		const result1 = removeTwo([1, 2, 3])
		const result2 = removeTwo([2, 4, 6])
		const result3 = removeTwo([5, 10, 15])
		
		assertEquals(result1, [1, 3])
		assertEquals(result2, [4, 6])
		assertEquals(result3, [5, 10, 15])
	})

	await t.step("should allow partial application for different types", () => {
		const removeNull = remove(null)
		const removeZero = remove(0)
		const removeFalse = remove(false)
		
		assertEquals(removeNull([1, null, 2, null]), [1, 2, null])
		assertEquals(removeZero([1, 0, 2, 0]), [1, 2, 0])
		assertEquals(removeFalse([true, false, true, false]), [true, true, false])
	})
})

Deno.test("remove: property-based tests", async (t) => {
	await t.step("should maintain array length or reduce by 1", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.integer(),
				(arr, item) => {
					const result = remove(item)(arr)
					const originalHasItem = arr.includes(item)
					
					if (originalHasItem) {
						return result.length === arr.length - 1
					} else {
						return result.length === arr.length
					}
				},
			),
		)
	})

	await t.step("should preserve all elements except first occurrence", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.integer(),
				(arr, item) => {
					const result = remove(item)(arr)
					const firstIndex = arr.indexOf(item)
					
					if (firstIndex === -1) {
						// Item not in array, should return copy
						return result.length === arr.length &&
							result.every((v, i) => v === arr[i])
					} else {
						// Check elements before removed item
						for (let i = 0; i < firstIndex; i++) {
							if (result[i] !== arr[i]) return false
						}
						// Check elements after removed item
						for (let i = firstIndex; i < result.length; i++) {
							if (result[i] !== arr[i + 1]) return false
						}
						return true
					}
				},
			),
		)
	})

	await t.step("should handle null/undefined consistently", () => {
		fc.assert(
			fc.property(
				fc.anything(),
				(item) => {
					const nullResult = remove(item)(null)
					const undefinedResult = remove(item)(undefined)
					
					return nullResult.length === 0 && undefinedResult.length === 0
				},
			),
		)
	})

	await t.step("should only remove first occurrence", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer({ min: 0, max: 5 })),
				(arr) => {
					// Count occurrences of each value
					const counts = new Map<number, number>()
					arr.forEach((v) => counts.set(v, (counts.get(v) || 0) + 1))
					
					// For each unique value that appears multiple times
					for (const [value, count] of counts) {
						if (count > 1) {
							const result = remove(value)(arr)
							const resultCount = result.filter((v) => v === value).length
							// Should have exactly one less occurrence
							if (resultCount !== count - 1) return false
						}
					}
					return true
				},
			),
		)
	})

	await t.step("should always return a new array", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.integer(),
				(arr, item) => {
					const result = remove(item)(arr)
					return result !== arr // Always a new array instance
				},
			),
		)
	})
})