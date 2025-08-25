import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import removeAt from "../../../../src/simple/array/removeAt/index.ts"

// Test JSDoc examples
Deno.test("removeAt - JSDoc example 1: remove middle element", () => {
	const result = removeAt(1)([1, 2, 3, 4])
	assertEquals(result, [1, 3, 4])
})

Deno.test("removeAt - JSDoc example 2: remove first element", () => {
	const result = removeAt(0)(["a", "b", "c"])
	assertEquals(result, ["b", "c"])
})

Deno.test("removeAt - JSDoc example 3: negative index (remove last)", () => {
	const result = removeAt(-1)([1, 2, 3])
	assertEquals(result, [1, 2])
})

Deno.test("removeAt - JSDoc example 4: out of bounds index", () => {
	const result = removeAt(10)([1, 2, 3])
	assertEquals(result, [1, 2, 3])
})

Deno.test("removeAt - JSDoc example 5: partial application", () => {
	const removeSecond = removeAt(1)
	const result = removeSecond(["first", "second", "third"])
	assertEquals(result, ["first", "third"])
})

// Edge cases
Deno.test("removeAt - empty array", () => {
	const result = removeAt(0)([])
	assertEquals(result, [])
})

Deno.test("removeAt - single element array at index 0", () => {
	const result = removeAt(0)([1])
	assertEquals(result, [])
})

Deno.test("removeAt - single element array with invalid index", () => {
	const result = removeAt(1)([1])
	assertEquals(result, [1])
})

Deno.test("removeAt - negative index -2", () => {
	const result = removeAt(-2)([1, 2, 3, 4])
	assertEquals(result, [1, 2, 4])
})

Deno.test("removeAt - negative index beyond array length", () => {
	const result = removeAt(-10)([1, 2, 3])
	assertEquals(result, [1, 2, 3]) // Out of bounds
})

Deno.test("removeAt - last valid index", () => {
	const result = removeAt(2)([1, 2, 3])
	assertEquals(result, [1, 2])
})

Deno.test("removeAt - with undefined elements", () => {
	const result = removeAt(1)([1, undefined, 3])
	assertEquals(result, [1, 3])
})

Deno.test("removeAt - with null elements", () => {
	const result = removeAt(0)([null, "a", "b"])
	assertEquals(result, ["a", "b"])
})

Deno.test("removeAt - with NaN", () => {
	const result = removeAt(1)([1, NaN, 3])
	assertEquals(result, [1, 3])
})

Deno.test("removeAt - with sparse array", () => {
	// deno-lint-ignore no-sparse-arrays
	const sparse = [1, , 3, 4]
	const result = removeAt(1)(sparse)
	assertEquals(result, [1, 3, 4])
})

Deno.test("removeAt - negative index -1 on various lengths", () => {
	assertEquals(removeAt(-1)([1]), [])
	assertEquals(removeAt(-1)([1, 2]), [1])
	assertEquals(removeAt(-1)([1, 2, 3]), [1, 2])
	assertEquals(removeAt(-1)([1, 2, 3, 4]), [1, 2, 3])
})

Deno.test("removeAt - currying stages", () => {
	const removeAtOne = removeAt(1)
	const result1 = removeAtOne(["a", "b", "c"])
	assertEquals(result1, ["a", "c"])

	const result2 = removeAtOne([1, 2, 3, 4])
	assertEquals(result2, [1, 3, 4])
})

Deno.test("removeAt - with objects", () => {
	const users = [{ id: 1 }, { id: 2 }, { id: 3 }]
	const result = removeAt(1)(users)
	assertEquals(result, [{ id: 1 }, { id: 3 }])
})

Deno.test("removeAt - with arrays as elements", () => {
	const matrix = [[1, 2], [3, 4], [5, 6]]
	const result = removeAt(1)(matrix)
	assertEquals(result, [[1, 2], [5, 6]])
})

Deno.test("removeAt - boundary conditions", () => {
	const arr = [1, 2, 3, 4, 5]

	// First element
	assertEquals(removeAt(0)(arr), [2, 3, 4, 5])

	// Last element
	assertEquals(removeAt(4)(arr), [1, 2, 3, 4])

	// One past last (out of bounds)
	assertEquals(removeAt(5)(arr), [1, 2, 3, 4, 5])

	// Negative first
	assertEquals(removeAt(-5)(arr), [2, 3, 4, 5])

	// Negative last
	assertEquals(removeAt(-1)(arr), [1, 2, 3, 4])

	// Negative out of bounds
	assertEquals(removeAt(-6)(arr), [1, 2, 3, 4, 5])
})

// Property-based tests
Deno.test("removeAt - property: result length is input length - 1 for valid index", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything(), { minLength: 1 }),
			(array) => {
				const validIndex = Math.floor(Math.random() * array.length)
				const result = removeAt(validIndex)(array)
				return result.length === array.length - 1
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("removeAt - property: original array unchanged for invalid index", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			fc.oneof(
				fc.integer({ min: 100 }),
				fc.integer({ max: -100 }),
			),
			(array, invalidIndex) => {
				const result = removeAt(invalidIndex)(array)
				return result === array
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("removeAt - property: elements before removed index unchanged", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1 }),
			(array) => {
				const index = Math.floor(Math.random() * array.length)
				const result = removeAt(index)(array)

				// Check elements before removed index
				for (let i = 0; i < index && i < result.length; i++) {
					if (result[i] !== array[i]) return false
				}
				return true
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("removeAt - property: elements after removed index shifted", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1 }),
			(array) => {
				const index = Math.floor(Math.random() * array.length)
				const result = removeAt(index)(array)

				// Check elements after removed index
				for (let i = index; i < result.length; i++) {
					if (result[i] !== array[i + 1]) return false
				}
				return true
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("removeAt - property: negative index works correctly", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 20 }),
			(array) => {
				const negIndex = -(Math.floor(Math.random() * array.length) + 1)
				const posIndex = array.length + negIndex

				const resultNeg = removeAt(negIndex)(array)
				const resultPos = removeAt(posIndex)(array)

				return resultNeg.length === resultPos.length &&
					resultNeg.every((v, i) => v === resultPos[i])
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("removeAt - property: immutability", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(array, index) => {
				const original = [...array]
				removeAt(index)(array)

				// Original should be unchanged
				return array.length === original.length &&
					array.every((v, i) => v === original[i])
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("removeAt - property: removed element not in result", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: 0, max: 1000 }), { minLength: 1 }),
			(array) => {
				// Use unique values for this test
				const uniqueArray = array.map((v, i) => v + i * 10000)
				const index = Math.floor(Math.random() * uniqueArray.length)
				const elementToRemove = uniqueArray[index]
				const result = removeAt(index)(uniqueArray)

				// The removed element should not be at its original position
				return result[index] !== elementToRemove || index >= result.length
			},
		),
		{ numRuns: 1000 },
	)
})
