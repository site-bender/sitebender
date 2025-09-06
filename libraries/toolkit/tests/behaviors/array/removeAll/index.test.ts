import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import {
	assertType,
	IsExact,
} from "https://deno.land/std@0.218.0/testing/types.ts"
import * as fc from "npm:fast-check@3"

import removeAll from "../../../../src/simple/array/removeAll/index.ts"

Deno.test("removeAll: basic functionality", async (t) => {
	await t.step("should remove all occurrences of element", () => {
		const result = removeAll(2)([1, 2, 3, 2, 4])
		assertEquals(result, [1, 3, 4])
	})

	await t.step("should remove all occurrences of string", () => {
		const result = removeAll("b")(["a", "b", "c", "b"])
		assertEquals(result, ["a", "c"])
	})

	await t.step("should return original array if element not found", () => {
		const result = removeAll(5)([1, 2, 3])
		assertEquals(result, [1, 2, 3])
	})

	await t.step("should remove all null values", () => {
		const result = removeAll(null)([1, null, 2, null, 3])
		assertEquals(result, [1, 2, 3])
	})

	await t.step("should remove all undefined values", () => {
		const result = removeAll(undefined)([1, undefined, 2, undefined, 3])
		assertEquals(result, [1, 2, 3])
	})

	await t.step("should handle empty array", () => {
		const result = removeAll(1)([])
		assertEquals(result, [])
	})

	await t.step("should handle array with all same elements", () => {
		const result = removeAll(1)([1, 1, 1, 1])
		assertEquals(result, [])
	})

	await t.step("should handle array with no matching elements", () => {
		const result = removeAll(5)([1, 2, 3, 4])
		assertEquals(result, [1, 2, 3, 4])
	})

	await t.step("should remove boolean values", () => {
		const result = removeAll(false)([true, false, false, true, false])
		assertEquals(result, [true, true])
	})

	await t.step("should remove zero values", () => {
		const result = removeAll(0)([1, 0, 2, 0, 3, 0])
		assertEquals(result, [1, 2, 3])
	})
})

Deno.test("removeAll: edge cases", async (t) => {
	await t.step("should handle null input", () => {
		const result = removeAll(1)(null)
		assertEquals(result, [])
	})

	await t.step("should handle undefined input", () => {
		const result = removeAll(1)(undefined)
		assertEquals(result, [])
	})

	await t.step("should handle NaN values with !== behavior", () => {
		// NaN !== NaN, so NaN will NOT be removed
		const result = removeAll(NaN)([1, NaN, 2, NaN])
		assertEquals(Number.isNaN(result[1]), true)
		assertEquals(Number.isNaN(result[3]), true)
		assertEquals(result.length, 4)
	})

	await t.step("should handle -0 and +0 as equal", () => {
		const result = removeAll(-0)([1, 0, 2, -0, 3])
		assertEquals(result, [1, 2, 3]) // Removes both 0 and -0
	})

	await t.step("should handle objects by reference", () => {
		const obj1 = { a: 1 }
		const obj2 = { a: 1 }
		const obj3 = { a: 2 }
		const result = removeAll(obj1)([obj1, obj2, obj3, obj1])
		assertEquals(result, [obj2, obj3]) // Removes all obj1 references
	})

	await t.step("should handle arrays by reference", () => {
		const arr1 = [1, 2]
		const arr2 = [1, 2]
		const arr3 = [3, 4]
		const result = removeAll(arr1)([arr1, arr2, arr1, arr3, arr1])
		assertEquals(result, [arr2, arr3]) // Removes all arr1 references
	})

	await t.step("should preserve array immutability", () => {
		const original = [1, 2, 3, 2, 4]
		const result = removeAll(2)(original)
		assertEquals(result, [1, 3, 4])
		assertEquals(original, [1, 2, 3, 2, 4]) // Original unchanged
	})

	await t.step("should handle mixed types correctly", () => {
		const result = removeAll("2")([1, "2", 2, "2", 3])
		assertEquals(result, [1, 2, 3]) // Only removes string "2"
	})

	await t.step("should handle empty string", () => {
		const result = removeAll("")(["a", "", "b", "", "c"])
		assertEquals(result, ["a", "b", "c"])
	})
})

Deno.test("removeAll: type safety", async (t) => {
	await t.step("should correctly infer types", () => {
		const result = removeAll(2)([1, 2, 3])
		assertType<IsExact<typeof result, number[]>>(true)
	})

	await t.step("should handle union types", () => {
		const result = removeAll("b")(["a", "b", 1, 2, "b"])
		assertType<IsExact<typeof result, (string | number)[]>>(true)
		assertEquals(result, ["a", 1, 2])
	})

	await t.step("should handle complex types", () => {
		type Item = { id: number; name: string }
		const item1: Item = { id: 1, name: "a" }
		const item2: Item = { id: 2, name: "b" }
		const item3: Item = { id: 3, name: "c" }
		const result = removeAll(item1)([item1, item2, item1, item3, item1])
		assertType<IsExact<typeof result, Item[]>>(true)
		assertEquals(result, [item2, item3])
	})
})

Deno.test("removeAll: currying", async (t) => {
	await t.step("should be fully curried", () => {
		const removeTwo = removeAll(2)

		const result1 = removeTwo([1, 2, 3, 2, 4])
		const result2 = removeTwo([2, 2, 2])
		const result3 = removeTwo([5, 10, 15])

		assertEquals(result1, [1, 3, 4])
		assertEquals(result2, [])
		assertEquals(result3, [5, 10, 15])
	})

	await t.step("should allow partial application for different types", () => {
		const removeNulls = removeAll(null)
		const removeZeros = removeAll(0)
		const removeFalse = removeAll(false)

		assertEquals(removeNulls([1, null, 2, null, null, 3]), [1, 2, 3])
		assertEquals(removeZeros([1, 0, 2, 0, 3, 0, 0]), [1, 2, 3])
		assertEquals(removeFalse([true, false, false, true, false]), [
			true,
			true,
		])
	})
})

Deno.test("removeAll: property-based tests", async (t) => {
	await t.step("should remove all occurrences", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.integer(),
				(arr, item) => {
					const result = removeAll(item)(arr)
					// Result should not contain the item
					return !result.includes(item)
				},
			),
		)
	})

	await t.step("should preserve order of remaining elements", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.integer(),
				(arr, item) => {
					const result = removeAll(item)(arr)
					const expectedOrder = arr.filter((x) => x !== item)

					return result.length === expectedOrder.length &&
						result.every((v, i) => v === expectedOrder[i])
				},
			),
		)
	})

	await t.step("should handle null/undefined consistently", () => {
		fc.assert(
			fc.property(
				fc.anything(),
				(item) => {
					const nullResult = removeAll(item)(null)
					const undefinedResult = removeAll(item)(undefined)

					return nullResult.length === 0 &&
						undefinedResult.length === 0
				},
			),
		)
	})

	await t.step("should reduce length by exact count of occurrences", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer({ min: 0, max: 5 })),
				fc.integer({ min: 0, max: 5 }),
				(arr, item) => {
					const countBefore = arr.filter((x) => x === item).length
					const result = removeAll(item)(arr)

					return result.length === arr.length - countBefore
				},
			),
		)
	})

	await t.step("should always return array (never null/undefined)", () => {
		fc.assert(
			fc.property(
				fc.oneof(
					fc.array(fc.anything()),
					fc.constant(null),
					fc.constant(undefined),
				),
				fc.anything(),
				(arr, item) => {
					const result = removeAll(item)(arr)
					return Array.isArray(result)
				},
			),
		)
	})

	await t.step("should be equivalent to filter with !== predicate", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.integer(),
				(arr, item) => {
					const removeAllResult = removeAll(item)(arr)
					const filterResult = arr.filter((x) => x !== item)

					return removeAllResult.length === filterResult.length &&
						removeAllResult.every((v, i) => v === filterResult[i])
				},
			),
		)
	})
})
