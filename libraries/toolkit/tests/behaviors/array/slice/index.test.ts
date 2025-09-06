import { assert, assertEquals, assertThrows } from "jsr:@std/assert@1"
import { describe, it } from "jsr:@std/testing@1/bdd"
import * as fc from "npm:fast-check@3"

import slice from "../../../../src/simple/array/slice/index.ts"

describe("slice", () => {
	describe("behavioral tests", () => {
		it("should extract elements from start to end", () => {
			assertEquals(slice(1)(3)([1, 2, 3, 4, 5]), [2, 3])
		})

		it("should extract from start to array end when end is undefined", () => {
			assertEquals(slice(2)(undefined)([1, 2, 3, 4, 5]), [3, 4, 5])
		})

		it("should handle negative start index", () => {
			assertEquals(slice(-2)(undefined)([1, 2, 3, 4, 5]), [4, 5])
		})

		it("should handle negative end index", () => {
			assertEquals(slice(1)(-1)([1, 2, 3, 4, 5]), [2, 3, 4])
		})

		it("should handle both negative indices", () => {
			assertEquals(slice(-3)(-1)([1, 2, 3, 4, 5]), [3, 4])
		})

		it("should return empty array when start >= end", () => {
			assertEquals(slice(3)(2)([1, 2, 3, 4, 5]), [])
			assertEquals(slice(3)(3)([1, 2, 3, 4, 5]), [])
		})

		it("should return empty array for empty input", () => {
			assertEquals(slice(0)(2)([]), [])
			assertEquals(slice(-2)(-1)([]), [])
		})

		it("should return empty array when start is beyond array length", () => {
			assertEquals(slice(10)(20)([1, 2, 3]), [])
		})

		it("should handle start = 0", () => {
			assertEquals(slice(0)(3)([1, 2, 3, 4, 5]), [1, 2, 3])
		})

		it("should handle end beyond array length", () => {
			assertEquals(slice(2)(100)([1, 2, 3, 4, 5]), [3, 4, 5])
		})

		it("should return full array with slice(0)(undefined)", () => {
			const input = [1, 2, 3, 4, 5]
			assertEquals(slice(0)(undefined)(input), input)
		})

		it("should work with string arrays", () => {
			assertEquals(slice(1)(3)(["a", "b", "c", "d", "e"]), ["b", "c"])
		})

		it("should work with object arrays", () => {
			const objects = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
			const result = slice(1)(3)(objects)
			assertEquals(result.length, 2)
			assertEquals(result[0], objects[1])
			assertEquals(result[1], objects[2])
		})

		it("should work with mixed type arrays", () => {
			const mixed: any[] = [1, "a", true, null, undefined, { x: 1 }]
			assertEquals(slice(2)(5)(mixed), [true, null, undefined])
		})

		it("should handle arrays with NaN", () => {
			const input = [1, NaN, 2, NaN, 3]
			const result = slice(1)(4)(input)
			assertEquals(result.length, 3)
			assert(Number.isNaN(result[0]))
			assertEquals(result[1], 2)
			assert(Number.isNaN(result[2]))
		})

		it("should handle fractional indices (floors them)", () => {
			assertEquals(slice(1.7)(3.9)([1, 2, 3, 4, 5]), [2, 3])
		})

		it("should handle Infinity indices", () => {
			assertEquals(slice(2)(Infinity)([1, 2, 3, 4, 5]), [3, 4, 5])
			assertEquals(slice(-Infinity)(2)([1, 2, 3, 4, 5]), [1, 2])
		})

		it("should handle NaN indices (treated as 0)", () => {
			assertEquals(slice(NaN)(3)([1, 2, 3, 4, 5]), [1, 2, 3])
			assertEquals(slice(1)(NaN)([1, 2, 3, 4, 5]), [])
		})

		it("should be curried properly", () => {
			const fromSecond = slice(1)
			const fromSecondToFourth = fromSecond(4)
			assertEquals(fromSecondToFourth([1, 2, 3, 4, 5]), [2, 3, 4])
		})

		it("should not modify original array", () => {
			const input = [1, 2, 3, 4, 5]
			const inputCopy = [...input]
			slice(1)(3)(input)
			assertEquals(input, inputCopy)
		})

		it("should create shallow copy (not deep)", () => {
			const obj1 = { value: 1 }
			const obj2 = { value: 2 }
			const input = [obj1, obj2]
			const result = slice(0)(undefined)(input)

			// New array but same object references
			assert(result !== input)
			assertEquals(result[0], obj1)
			assertEquals(result[1], obj2)

			// Modifying object affects both arrays
			obj1.value = 99
			assertEquals(input[0].value, 99)
			assertEquals(result[0].value, 99)
		})

		it("should handle very large negative indices", () => {
			assertEquals(slice(-1000)(undefined)([1, 2, 3]), [1, 2, 3])
			assertEquals(slice(0)(-1000)([1, 2, 3]), [])
		})

		it("should throw for null/undefined arrays", () => {
			assertThrows(() => slice(0)(2)(null as any))
			assertThrows(() => slice(0)(2)(undefined as any))
		})

		it("should handle single element array", () => {
			assertEquals(slice(0)(1)([42]), [42])
			assertEquals(slice(0)(undefined)([42]), [42])
			assertEquals(slice(1)(undefined)([42]), [])
			assertEquals(slice(-1)(undefined)([42]), [42])
		})

		it("should handle symbols in arrays", () => {
			const sym1 = Symbol("a")
			const sym2 = Symbol("b")
			const input = [sym1, sym2, "test"]
			const result = slice(1)(3)(input)
			assertEquals(result.length, 2)
			assertEquals(result[0], sym2)
			assertEquals(result[1], "test")
		})
	})

	describe("property-based tests", () => {
		it("should return array with length <= original length", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.integer(),
					fc.integer(),
					(arr, start, end) => {
						const result = slice(start)(end)(arr)
						return result.length <= arr.length
					},
				),
			)
		})

		it("should return elements that exist in original array", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.integer({ min: 0, max: 20 }),
					fc.integer({ min: 0, max: 20 }),
					(arr, start, end) => {
						if (start >= arr.length) return true // Will be empty
						const result = slice(start)(end)(arr)
						return result.every((item) => arr.includes(item))
					},
				),
			)
		})

		it("should maintain relative order of elements", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					fc.integer({ min: 0, max: 10 }),
					fc.integer({ min: 0, max: 10 }),
					(arr, start, end) => {
						const result = slice(start)(end)(arr)
						if (result.length <= 1) return true

						// Check that elements maintain their relative order
						for (let i = 0; i < result.length - 1; i++) {
							const idx1 = arr.indexOf(result[i])
							const idx2 = arr.indexOf(result[i + 1], idx1 + 1)
							if (idx2 < idx1) return false
						}
						return true
					},
				),
			)
		})

		it("should be equivalent to native array.slice", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.integer({ min: -100, max: 100 }),
					fc.oneof(
						fc.integer({ min: -100, max: 100 }),
						fc.constant(undefined),
					),
					(arr, start, end) => {
						const result1 = slice(start)(end)(arr)
						const result2 = arr.slice(start, end)
						return JSON.stringify(result1) ===
							JSON.stringify(result2)
					},
				),
			)
		})

		it("should handle empty slices consistently", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.integer(),
					(arr, idx) => {
						const result = slice(idx)(idx)(arr)
						return Array.isArray(result) && result.length === 0
					},
				),
			)
		})

		it("should be curried correctly", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.integer({ min: -10, max: 10 }),
					fc.integer({ min: -10, max: 10 }),
					(arr, start, end) => {
						const partial1 = slice(start)
						const partial2 = partial1(end)
						const result1 = partial2(arr)
						const result2 = slice(start)(end)(arr)
						return JSON.stringify(result1) ===
							JSON.stringify(result2)
					},
				),
			)
		})

		it("should return new array instance", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { minLength: 1 }),
					(arr) => {
						const result = slice(0)(undefined)(arr)
						return result !== arr // Different array instance
					},
				),
			)
		})
	})
})
