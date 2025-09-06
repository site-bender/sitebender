import { assert, assertEquals, assertThrows } from "jsr:@std/assert@1"
import { describe, it } from "jsr:@std/testing@1/bdd"
import * as fc from "npm:fast-check@3"

import sliceFrom from "../../../../src/simple/array/sliceFrom/index.ts"

describe("sliceFrom", () => {
	describe("behavioral tests", () => {
		it("should extract specified length from start index", () => {
			assertEquals(sliceFrom(1)(2)([1, 2, 3, 4, 5]), [2, 3])
		})

		it("should extract from beginning", () => {
			assertEquals(sliceFrom(0)(3)(["a", "b", "c", "d"]), ["a", "b", "c"])
		})

		it("should handle negative start index", () => {
			assertEquals(sliceFrom(-3)(2)([1, 2, 3, 4, 5]), [3, 4])
		})

		it("should handle very negative start index", () => {
			// Should normalize to 0
			assertEquals(sliceFrom(-100)(3)([1, 2, 3, 4, 5]), [1, 2, 3])
		})

		it("should return fewer elements when length exceeds bounds", () => {
			assertEquals(sliceFrom(2)(10)([1, 2, 3, 4]), [3, 4])
		})

		it("should return empty array when start is beyond array", () => {
			assertEquals(sliceFrom(5)(3)([1, 2, 3]), [])
		})

		it("should return empty array for zero length", () => {
			assertEquals(sliceFrom(0)(0)([1, 2, 3]), [])
			assertEquals(sliceFrom(1)(0)([1, 2, 3]), [])
		})

		it("should return empty array for negative length", () => {
			assertEquals(sliceFrom(1)(-5)([1, 2, 3, 4, 5]), [])
		})

		it("should work with single element extraction", () => {
			assertEquals(sliceFrom(2)(1)([1, 2, 3, 4, 5]), [3])
		})

		it("should extract entire array when length is large", () => {
			assertEquals(sliceFrom(0)(1000)([1, 2, 3]), [1, 2, 3])
		})

		it("should handle negative index counting from end", () => {
			assertEquals(sliceFrom(-1)(1)([1, 2, 3, 4, 5]), [5])
			assertEquals(sliceFrom(-2)(2)([1, 2, 3, 4, 5]), [4, 5])
			assertEquals(sliceFrom(-5)(3)([1, 2, 3, 4, 5]), [1, 2, 3])
		})

		it("should work with empty array", () => {
			assertEquals(sliceFrom(0)(5)([]), [])
			assertEquals(sliceFrom(-2)(3)([]), [])
		})

		it("should work with string arrays", () => {
			assertEquals(sliceFrom(1)(3)(["a", "b", "c", "d", "e"]), [
				"b",
				"c",
				"d",
			])
		})

		it("should work with object arrays", () => {
			const objects = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
			const result = sliceFrom(1)(2)(objects)
			assertEquals(result.length, 2)
			assertEquals(result[0], objects[1])
			assertEquals(result[1], objects[2])
		})

		it("should work with mixed type arrays", () => {
			const mixed: any[] = [1, "a", true, null, undefined, { x: 1 }]
			assertEquals(sliceFrom(2)(3)(mixed), [true, null, undefined])
		})

		it("should handle arrays with NaN", () => {
			const input = [1, NaN, 2, NaN, 3]
			const result = sliceFrom(1)(3)(input)
			assertEquals(result.length, 3)
			assert(Number.isNaN(result[0]))
			assertEquals(result[1], 2)
			assert(Number.isNaN(result[2]))
		})

		it("should handle fractional indices (floors them)", () => {
			// slice(1.7, 1.7 + 2.9) = slice(1.7, 4.6) -> slice(1, 4) = [2, 3, 4]
			assertEquals(sliceFrom(1.7)(2.9)([1, 2, 3, 4, 5]), [2, 3, 4])
		})

		it("should handle Infinity length", () => {
			assertEquals(sliceFrom(2)(Infinity)([1, 2, 3, 4, 5]), [3, 4, 5])
		})

		it("should handle NaN indices", () => {
			// NaN as startIndex: NaN + length = NaN, slice(NaN, NaN) returns empty
			assertEquals(sliceFrom(NaN)(3)([1, 2, 3, 4, 5]), [])
			// NaN as length returns empty (NaN <= 0 is false, but NaN + anything is NaN)
			assertEquals(sliceFrom(1)(NaN)([1, 2, 3, 4, 5]), [])
		})

		it("should be curried properly", () => {
			const fromSecond = sliceFrom(1)
			const twoFromSecond = fromSecond(2)
			assertEquals(twoFromSecond([1, 2, 3, 4, 5]), [2, 3])
		})

		it("should not modify original array", () => {
			const input = [1, 2, 3, 4, 5]
			const inputCopy = [...input]
			sliceFrom(1)(2)(input)
			assertEquals(input, inputCopy)
		})

		it("should create shallow copy (not deep)", () => {
			const obj1 = { value: 1 }
			const obj2 = { value: 2 }
			const obj3 = { value: 3 }
			const input = [obj1, obj2, obj3]
			const result = sliceFrom(1)(2)(input)

			// New array but same object references
			assert(result !== input)
			assertEquals(result[0], obj2)
			assertEquals(result[1], obj3)

			// Modifying object affects both arrays
			obj2.value = 99
			assertEquals(input[1].value, 99)
			assertEquals(result[0].value, 99)
		})

		it("should throw for null/undefined arrays", () => {
			assertThrows(() => sliceFrom(0)(2)(null as any))
			assertThrows(() => sliceFrom(0)(2)(undefined as any))
		})

		it("should handle single element array", () => {
			assertEquals(sliceFrom(0)(1)([42]), [42])
			assertEquals(sliceFrom(0)(5)([42]), [42])
			assertEquals(sliceFrom(1)(1)([42]), [])
			assertEquals(sliceFrom(-1)(1)([42]), [42])
			assertEquals(sliceFrom(-1)(5)([42]), [42])
		})

		it("should handle symbols in arrays", () => {
			const sym1 = Symbol("a")
			const sym2 = Symbol("b")
			const sym3 = Symbol("c")
			const input = [sym1, sym2, sym3, "test"]
			const result = sliceFrom(1)(2)(input)
			assertEquals(result.length, 2)
			assertEquals(result[0], sym2)
			assertEquals(result[1], sym3)
		})

		it("should handle boundary cases", () => {
			const input = [1, 2, 3, 4, 5]
			// Start at last element
			assertEquals(sliceFrom(4)(1)(input), [5])
			assertEquals(sliceFrom(4)(2)(input), [5])
			// Start one past end
			assertEquals(sliceFrom(5)(1)(input), [])
		})

		it("should handle -Infinity start index", () => {
			// Should normalize to 0
			assertEquals(sliceFrom(-Infinity)(3)([1, 2, 3, 4, 5]), [1, 2, 3])
		})
	})

	describe("property-based tests", () => {
		it("should return array with length <= requested length", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.integer(),
					fc.nat({ max: 100 }),
					(arr, start, length) => {
						const result = sliceFrom(start)(length)(arr)
						return result.length <= length
					},
				),
			)
		})

		it("should return array with length <= original array length", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.integer(),
					fc.nat(),
					(arr, start, length) => {
						const result = sliceFrom(start)(length)(arr)
						return result.length <= arr.length
					},
				),
			)
		})

		it("should return elements that exist in original array", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.integer({ min: -20, max: 20 }),
					fc.nat({ max: 20 }),
					(arr, start, length) => {
						const result = sliceFrom(start)(length)(arr)
						return result.every((item) => arr.includes(item))
					},
				),
			)
		})

		it("should maintain relative order of elements", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					fc.integer({ min: -10, max: 10 }),
					fc.nat({ max: 10 }),
					(arr, start, length) => {
						const result = sliceFrom(start)(length)(arr)
						if (result.length <= 1) return true

						// Check that elements maintain their relative order
						for (let i = 0; i < result.length - 1; i++) {
							const idx1 = arr.indexOf(result[i])
							const idx2 = arr.indexOf(result[i + 1], idx1 + 1)
							if (idx2 <= idx1) return false
						}
						return true
					},
				),
			)
		})

		it("should be equivalent to slice(start, start + length) for positive indices", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.nat({ max: 100 }),
					fc.nat({ max: 100 }),
					(arr, start, length) => {
						const result1 = sliceFrom(start)(length)(arr)
						const result2 = arr.slice(start, start + length)
						return JSON.stringify(result1) ===
							JSON.stringify(result2)
					},
				),
			)
		})

		it("should handle negative lengths consistently", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.integer(),
					fc.integer({ max: -1 }),
					(arr, start, negLength) => {
						const result = sliceFrom(start)(negLength)(arr)
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
					fc.nat({ max: 10 }),
					(arr, start, length) => {
						const partial1 = sliceFrom(start)
						const partial2 = partial1(length)
						const result1 = partial2(arr)
						const result2 = sliceFrom(start)(length)(arr)
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
					fc.nat(),
					(arr, length) => {
						const result = sliceFrom(0)(length)(arr)
						return result !== arr // Different array instance
					},
				),
			)
		})

		it("should handle edge case combinations", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					(arr) => {
						// Zero length always gives empty
						const zeroLength = sliceFrom(0)(0)(arr)
						// Length beyond array gives all from start
						const beyondLength = sliceFrom(0)(arr.length + 100)(arr)
						// Start beyond array gives empty
						const beyondStart = sliceFrom(arr.length + 10)(10)(arr)

						return zeroLength.length === 0 &&
							beyondLength.length === arr.length &&
							beyondStart.length === 0
					},
				),
			)
		})
	})
})
