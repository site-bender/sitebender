import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import slice from "../../../../src/simple/array/slice/index.ts"

// Test all JSDoc examples
Deno.test("slice - basic extraction", () => {
	const result = slice(1)(3)([1, 2, 3, 4, 5])
	assertEquals(result, [2, 3])
})

Deno.test("slice - from index to end", () => {
	const result = slice(2)()([1, 2, 3, 4, 5])
	assertEquals(result, [3, 4, 5])
})

Deno.test("slice - negative start index", () => {
	const result = slice(-2)()([1, 2, 3, 4, 5])
	assertEquals(result, [4, 5])
})

Deno.test("slice - negative indices", () => {
	const result = slice(1)(-1)([1, 2, 3, 4, 5])
	assertEquals(result, [2, 3, 4])
})

Deno.test("slice - extract middle section", () => {
	const getMiddle = slice(1)(4)
	const result = getMiddle([10, 20, 30, 40, 50])
	assertEquals(result, [20, 30, 40])
})

// Additional tests
Deno.test("slice - start at beginning", () => {
	const result = slice(0)(3)([1, 2, 3, 4, 5])
	assertEquals(result, [1, 2, 3])
})

Deno.test("slice - empty result when start equals end", () => {
	const result = slice(2)(2)([1, 2, 3, 4, 5])
	assertEquals(result, [])
})

Deno.test("slice - empty result when start > end", () => {
	const result = slice(3)(2)([1, 2, 3, 4, 5])
	assertEquals(result, [])
})

Deno.test("slice - start beyond array length", () => {
	const result = slice(10)()([1, 2, 3])
	assertEquals(result, [])
})

Deno.test("slice - end beyond array length", () => {
	const result = slice(1)(10)([1, 2, 3])
	assertEquals(result, [2, 3])
})

Deno.test("slice - negative start from end", () => {
	const result = slice(-3)()([1, 2, 3, 4, 5])
	assertEquals(result, [3, 4, 5])
})

Deno.test("slice - negative end from end", () => {
	const result = slice(0)(-2)([1, 2, 3, 4, 5])
	assertEquals(result, [1, 2, 3])
})

Deno.test("slice - both negative indices", () => {
	const result = slice(-4)(-1)([1, 2, 3, 4, 5])
	assertEquals(result, [2, 3, 4])
})

Deno.test("slice - very negative start", () => {
	const result = slice(-100)()([1, 2, 3])
	assertEquals(result, [1, 2, 3]) // Clamps to beginning
})

Deno.test("slice - empty array", () => {
	const result = slice(0)(2)([])
	assertEquals(result, [])
})

Deno.test("slice - single element array", () => {
	assertEquals(slice(0)(1)([42]), [42])
	assertEquals(slice(1)()([42]), [])
	assertEquals(slice(-1)()([42]), [42])
})

Deno.test("slice - undefined end parameter", () => {
	const result = slice(1)(undefined)([1, 2, 3, 4, 5])
	assertEquals(result, [2, 3, 4, 5])
})

Deno.test("slice - with strings", () => {
	const result = slice(1)(3)(["a", "b", "c", "d", "e"])
	assertEquals(result, ["b", "c"])
})

Deno.test("slice - with objects", () => {
	const users = [
		{ id: 1, name: "Alice" },
		{ id: 2, name: "Bob" },
		{ id: 3, name: "Charlie" },
		{ id: 4, name: "David" },
	]

	const result = slice(1)(3)(users)
	assertEquals(result, [
		{ id: 2, name: "Bob" },
		{ id: 3, name: "Charlie" },
	])
})

Deno.test("slice - preserves sparse arrays", () => {
	const sparse: Array<number | undefined> = [1, , 3, , 5] // eslint-disable-line no-sparse-arrays
	const result = slice(1)(4)(sparse)

	assertEquals(result[0], undefined)
	assertEquals(result[1], 3)
	assertEquals(result[2], undefined)
	assertEquals(result.length, 3)
})

Deno.test("slice - partial application", () => {
	const getFirstThree = slice(0)(3)
	const getLastTwo = slice(-2)()
	const getMiddle = slice(1)(-1)

	const array = [1, 2, 3, 4, 5]

	assertEquals(getFirstThree(array), [1, 2, 3])
	assertEquals(getLastTwo(array), [4, 5])
	assertEquals(getMiddle(array), [2, 3, 4])
})

Deno.test("slice - chaining slices", () => {
	const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	const result = slice(0)(3)(slice(2)(8)(array))
	assertEquals(result, [3, 4, 5])
})

Deno.test("slice - with undefined and null values", () => {
	const result = slice(1)(4)([undefined, null, 0, false, "", NaN])
	assertEquals(result[0], null)
	assertEquals(result[1], 0)
	assertEquals(result[2], false)
})

// Property-based tests
Deno.test("slice - creates subarray", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer({ min: -10, max: 10 }),
			fc.integer({ min: -10, max: 10 }),
			(array, start, end) => {
				const result = slice(start)(end)(array)
				const expected = array.slice(start, end)
				assertEquals(result, expected)
			},
		),
	)
})

Deno.test("slice - length constraint", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			fc.nat(),
			fc.nat(),
			(array, start, end) => {
				const result = slice(start)(end)(array)
				assertEquals(result.length <= array.length, true)
			},
		),
	)
})

Deno.test("slice - empty when start >= array.length", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			(array) => {
				if (array.length > 0) {
					const result = slice(array.length)()
					assertEquals(result(array), [])
				} else {
					assertEquals(true, true) // Skip test for empty arrays
				}
			},
		),
	)
})

Deno.test("slice - full array with (0)()", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			(array) => {
				const result = slice(0)()(array)
				assertEquals(result, array)
			},
		),
	)
})

Deno.test("slice - creates new array (immutability)", () => {
	const original = [1, 2, 3, 4, 5]
	const result = slice(1)(4)(original)

	assertEquals(result, [2, 3, 4])
	assertEquals(original, [1, 2, 3, 4, 5]) // Original unchanged
	assertEquals(original === result, false) // Different reference

	// Even when selecting all elements
	const fullSlice = slice(0)()(original)
	assertEquals(fullSlice, original)
	assertEquals(fullSlice === original, false) // Still different reference
})

Deno.test("slice - respects currying", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer({ min: -5, max: 5 }),
			fc.integer({ min: -5, max: 5 }),
			(array, start, end) => {
				const step1 = slice(start)
				const step2 = step1(end)
				const result1 = step2(array)
				const result2 = slice(start)(end)(array)

				assertEquals(result1, result2)
			},
		),
	)
})

Deno.test("slice - preserves element identity", () => {
	const obj1 = { id: 1 }
	const obj2 = { id: 2 }
	const obj3 = { id: 3 }
	const array = [obj1, obj2, obj3]

	const result = slice(1)(3)(array)
	assertEquals(result[0] === obj2, true) // Same reference
	assertEquals(result[1] === obj3, true) // Same reference
})

Deno.test("slice - handles NaN and Infinity", () => {
	const array = [1, 2, 3, 4, 5]

	// NaN is converted to 0
	const resultNaN = slice(NaN as any)(3)(array)
	assertEquals(resultNaN, [1, 2, 3])

	// Infinity as end
	const resultInf = slice(1)(Infinity as any)(array)
	assertEquals(resultInf, [2, 3, 4, 5])

	// -Infinity as start
	const resultNegInf = slice(-Infinity as any)(3)(array)
	assertEquals(resultNegInf, [1, 2, 3])
})
