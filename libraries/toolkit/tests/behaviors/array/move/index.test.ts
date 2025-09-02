import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import move from "../../../../src/simple/array/move/index.ts"

// Test JSDoc examples
Deno.test("move - JSDoc example 1: move first to third position", () => {
	const result = move(0)(2)([1, 2, 3, 4])
	assertEquals(result, [2, 3, 1, 4])
})

Deno.test("move - JSDoc example 2: move third to first position", () => {
	const result = move(2)(0)([1, 2, 3, 4])
	assertEquals(result, [3, 1, 2, 4])
})

Deno.test("move - JSDoc example 3: no movement (same index)", () => {
	const result = move(1)(1)([1, 2, 3])
	assertEquals(result, [1, 2, 3])
})

Deno.test("move - JSDoc example 4: invalid index", () => {
	const result = move(10)(0)([1, 2, 3])
	assertEquals(result, [1, 2, 3])
})

Deno.test("move - JSDoc example 5: reorder list items", () => {
	const moveToTop = move(3)(0)
	const result = moveToTop(["a", "b", "c", "d"])
	assertEquals(result, ["d", "a", "b", "c"])
})

Deno.test("move - JSDoc example 6: partial application", () => {
	const moveFirstToEnd = move(0)
	const result = moveFirstToEnd(3)(["first", "second", "third", "fourth"])
	assertEquals(result, ["second", "third", "fourth", "first"])
})

Deno.test("move - JSDoc example 7: edge case - empty array", () => {
	const result = move(0)(1)([])
	assertEquals(result, [])
})

Deno.test("move - JSDoc example 8: edge case - null", () => {
	const result = move(0)(1)(null)
	assertEquals(result, [])
})

Deno.test("move - JSDoc example 9: edge case - single element", () => {
	const result = move(0)(0)(["only"])
	assertEquals(result, ["only"])
})

// Edge cases
Deno.test("move - empty array", () => {
	const result = move(0)(1)([])
	assertEquals(result, [])
})

Deno.test("move - null input", () => {
	const result = move(0)(1)(null)
	assertEquals(result, [])
})

Deno.test("move - undefined input", () => {
	const result = move(0)(1)(undefined)
	assertEquals(result, [])
})

Deno.test("move - non-array inputs", () => {
	assertEquals(move(0)(1)("string" as any), [])
	assertEquals(move(0)(1)(123 as any), [])
	assertEquals(move(0)(1)({} as any), [])
	assertEquals(move(0)(1)(true as any), [])
	assertEquals(move(0)(1)((() => {}) as any), [])
})

Deno.test("move - single element array", () => {
	const result = move(0)(0)([1])
	assertEquals(result, [1])
})

Deno.test("move - two element array swap", () => {
	const result1 = move(0)(1)([1, 2])
	assertEquals(result1, [2, 1])

	const result2 = move(1)(0)([1, 2])
	assertEquals(result2, [2, 1])
})

Deno.test("move - move to last position", () => {
	const result = move(0)(3)([1, 2, 3, 4])
	assertEquals(result, [2, 3, 4, 1])
})

Deno.test("move - move from last position", () => {
	const result = move(3)(0)([1, 2, 3, 4])
	assertEquals(result, [4, 1, 2, 3])
})

Deno.test("move - negative from index", () => {
	const result = move(-1)(0)([1, 2, 3])
	assertEquals(result, [1, 2, 3]) // Invalid index
})

Deno.test("move - negative to index", () => {
	const result = move(0)(-1)([1, 2, 3])
	assertEquals(result, [1, 2, 3]) // Invalid index
})

Deno.test("move - both indices out of bounds", () => {
	const result = move(10)(20)([1, 2, 3])
	assertEquals(result, [1, 2, 3])
})

Deno.test("move - from index out of bounds", () => {
	const result = move(5)(1)([1, 2, 3])
	assertEquals(result, [1, 2, 3])
})

Deno.test("move - to index out of bounds", () => {
	const result = move(1)(5)([1, 2, 3])
	assertEquals(result, [1, 2, 3])
})

Deno.test("move - with undefined elements", () => {
	const result = move(1)(0)([1, undefined, 3])
	assertEquals(result, [undefined, 1, 3])
})

Deno.test("move - with null elements", () => {
	const result = move(0)(2)([null, "a", "b"])
	assertEquals(result, ["a", "b", null])
})

Deno.test("move - with NaN", () => {
	const result = move(1)(0)([1, NaN, 3])
	assertEquals(Number.isNaN(result[0]), true)
	assertEquals(result[1], 1)
	assertEquals(result[2], 3)
})

Deno.test("move - with sparse array", () => {
	// deno-lint-ignore no-sparse-arrays
	const sparse = [1, , 3, 4]
	const result = move(1)(3)(sparse)
	assertEquals(result, [1, 3, 4, undefined])
})

Deno.test("move - complex movements", () => {
	const arr = ["a", "b", "c", "d", "e"]

	// Move middle to start
	assertEquals(move(2)(0)(arr), ["c", "a", "b", "d", "e"])

	// Move middle to end
	assertEquals(move(2)(4)(arr), ["a", "b", "d", "e", "c"])

	// Move adjacent elements
	assertEquals(move(1)(2)(arr), ["a", "c", "b", "d", "e"])
	assertEquals(move(2)(1)(arr), ["a", "c", "b", "d", "e"])
})

Deno.test("move - with objects", () => {
	const users = [
		{ id: 1, name: "Alice" },
		{ id: 2, name: "Bob" },
		{ id: 3, name: "Charlie" },
	]
	const result = move(2)(0)(users)
	assertEquals(result, [
		{ id: 3, name: "Charlie" },
		{ id: 1, name: "Alice" },
		{ id: 2, name: "Bob" },
	])
})

Deno.test("move - with arrays as elements", () => {
	const matrix = [[1, 2], [3, 4], [5, 6], [7, 8]]
	const result = move(0)(2)(matrix)
	assertEquals(result, [[3, 4], [5, 6], [1, 2], [7, 8]])
})

Deno.test("move - currying stages", () => {
	const moveFromFirst = move(0)
	const moveToLast = moveFromFirst(3)

	assertEquals(moveToLast([1, 2, 3, 4]), [2, 3, 4, 1])
	assertEquals(moveToLast(["a", "b", "c", "d"]), ["b", "c", "d", "a"])
})

Deno.test("move - boundary conditions", () => {
	const arr = [1, 2, 3, 4, 5]

	// Valid boundary moves
	assertEquals(move(0)(4)(arr), [2, 3, 4, 5, 1])
	assertEquals(move(4)(0)(arr), [5, 1, 2, 3, 4])

	// Just out of bounds
	assertEquals(move(0)(5)(arr), [1, 2, 3, 4, 5])
	assertEquals(move(5)(0)(arr), [1, 2, 3, 4, 5])
})

// Property-based tests
Deno.test("move - property: result length equals input length", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			fc.integer(),
			fc.integer(),
			(array, from, to) => {
				const result = move(from)(to)(array)
				return result.length === array.length
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("move - property: same index returns identical array", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer({ min: 0, max: 100 }),
			(array, index) => {
				const validIndex = index % Math.max(1, array.length)
				const result = move(validIndex)(validIndex)(array)

				return result.length === array.length &&
					result.every((v, i) => v === array[i])
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("move - property: invalid indices return original array", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.oneof(
				fc.integer({ max: -1 }),
				fc.integer({ min: 100 }),
			),
			fc.integer(),
			(array, invalidFrom, to) => {
				const result = move(invalidFrom)(to)(array)
				return result === array
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("move - property: element at 'from' ends up at 'to' for valid indices", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 2 }),
			(array) => {
				const from = Math.floor(Math.random() * array.length)
				const to = Math.floor(Math.random() * array.length)
				const element = array[from]
				const result = move(from)(to)(array)

				return result[to] === element
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("move - property: all elements preserved", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer({ min: 0, max: 100 }),
			fc.integer({ min: 0, max: 100 }),
			(array, from, to) => {
				const result = move(from)(to)(array)
				const sortedOriginal = [...array].sort()
				const sortedResult = [...result].sort()

				return sortedOriginal.length === sortedResult.length &&
					sortedOriginal.every((v, i) => v === sortedResult[i])
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("move - property: immutability", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			fc.integer(),
			(array, from, to) => {
				const original = [...array]
				move(from)(to)(array)

				// Original should be unchanged
				return array.length === original.length &&
					array.every((v, i) => v === original[i])
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("move - property: moving forward vs backward", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: 1, max: 100 }), {
				minLength: 3,
				maxLength: 20,
			}),
			(array) => {
				// Create unique elements for tracking
				const uniqueArray = array.map((v, i) => `${v}_${i}`)

				const from = Math.floor(Math.random() * uniqueArray.length)
				const to = Math.floor(Math.random() * uniqueArray.length)

				const result = move(from)(to)(uniqueArray)

				if (from === to) {
					// Should be unchanged
					return result.every((v, i) => v === uniqueArray[i])
				} else {
					// Element should be at new position
					return result[to] === uniqueArray[from]
				}
			},
		),
		{ numRuns: 1000 },
	)
})
