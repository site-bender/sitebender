import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import flatten from "../../../../src/simple/array/flatten/index.ts"

// Test all JSDoc examples
Deno.test("flatten - one level", () => {
	const result = flatten(1)([[1, 2], [3, 4]])
	assertEquals(result, [1, 2, 3, 4])
})

Deno.test("flatten - two levels", () => {
	const result = flatten(2)([[[1]], [[2]]])
	assertEquals(result, [1, 2])
})

Deno.test("flatten - infinity levels", () => {
	const result = flatten(Infinity)([[[1]], [[[2]]]])
	assertEquals(result, [1, 2])
})

Deno.test("flatten - common use: flatten one level", () => {
	const flattenOne = flatten(1)
	const result = flattenOne([[1, 2], [3], [4, 5]])
	assertEquals(result, [1, 2, 3, 4, 5])
})

Deno.test("flatten - handle null gracefully", () => {
	const result = flatten(1)(null)
	assertEquals(result, [])
})

Deno.test("flatten - handle undefined gracefully", () => {
	const result = flatten(1)(undefined)
	assertEquals(result, [])
})

// Additional tests
Deno.test("flatten - depth 0 returns same structure", () => {
	const input = [[1, 2], [3, 4]]
	const result = flatten(0)(input)
	assertEquals(result, [[1, 2], [3, 4]])
})

Deno.test("flatten - empty array", () => {
	const result = flatten(1)([])
	assertEquals(result, [])
})

Deno.test("flatten - array of empty arrays", () => {
	const result = flatten(1)([[], [], []])
	assertEquals(result, [])
})

Deno.test("flatten - mixed depth arrays", () => {
	const input = [1, [2, 3], [[4]], [[[5]]]]
	const result1 = flatten(1)(input)
	assertEquals(result1, [1, 2, 3, [4], [[5]]])

	const result2 = flatten(2)(input)
	assertEquals(result2, [1, 2, 3, 4, [5]])

	const result3 = flatten(3)(input)
	assertEquals(result3, [1, 2, 3, 4, 5])
})

Deno.test("flatten - preserves non-array elements", () => {
	const input = [1, "hello", true, [2, 3], null, [4, [5]]]
	const result = flatten(1)(input)
	assertEquals(result, [1, "hello", true, 2, 3, null, 4, [5]])
})

Deno.test("flatten - negative depth", () => {
	const input = [[1, 2], [3, 4]]
	const result = flatten(-1)(input)
	assertEquals(result, [[1, 2], [3, 4]]) // Negative depth acts like 0
})

Deno.test("flatten - very deeply nested", () => {
	const deep = [[[[[[[[[[1]]]]]]]]]]
	const result = flatten(10)(deep)
	assertEquals(result, [1])
})

Deno.test("flatten - partial application", () => {
	const flattenTwo = flatten(2)
	const input1 = [[[1, 2]], [[3, 4]]]
	const input2 = [[[5]], [[6]]]

	assertEquals(flattenTwo(input1), [1, 2, 3, 4])
	assertEquals(flattenTwo(input2), [5, 6])
})

Deno.test("flatten - handles sparse arrays", () => {
	const sparse: Array<any> = [1, , [2, , 3]] // eslint-disable-line no-sparse-arrays
	const result = flatten(1)(sparse)
	// JavaScript's flat() removes holes completely when flattening
	assertEquals(result, [1, 2, 3])
	assertEquals(result.length, 3)
})

Deno.test("flatten - with undefined and null values", () => {
	const input = [[undefined, null], [1, 2], [null, undefined]]
	const result = flatten(1)(input)
	assertEquals(result, [undefined, null, 1, 2, null, undefined])
})

Deno.test("flatten - handles NaN and Infinity", () => {
	const input = [[NaN, Infinity], [-Infinity, 0]]
	const result = flatten(1)(input)
	assertEquals(Number.isNaN(result[0]), true)
	assertEquals(result[1], Infinity)
	assertEquals(result[2], -Infinity)
	assertEquals(result[3], 0)
})

Deno.test("flatten - handles array-like objects", () => {
	const arrayLike = { 0: [1, 2], 1: [3, 4], length: 2 }
	const result = flatten(1)(arrayLike as any)
	assertEquals(result, []) // Should return empty array for non-arrays
})

Deno.test("flatten - default depth parameter", () => {
	const flattenDefault = flatten()
	const result = flattenDefault([[1, 2], [3, 4]])
	assertEquals(result, [1, 2, 3, 4]) // Default depth is 1
})

// Property-based tests
Deno.test("flatten - idempotence at depth 0", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			(array) => {
				const flattened1 = flatten(0)(array)
				const flattened2 = flatten(0)(flattened1)
				assertEquals(flattened1, flattened2)
			},
		),
	)
})

Deno.test("flatten - flattening twice with depth 1 equals flattening once with depth 2", () => {
	fc.assert(
		fc.property(
			fc.array(fc.array(fc.array(fc.integer()))),
			(array) => {
				const flatten1Twice = flatten(1)(flatten(1)(array))
				const flatten2Once = flatten(2)(array)
				assertEquals(flatten1Twice, flatten2Once)
			},
		),
	)
})

Deno.test("flatten - preserves total element count", () => {
	fc.assert(
		fc.property(
			fc.array(fc.array(fc.integer())),
			(array) => {
				const totalElements = array.reduce(
					(sum, subArray) => sum + subArray.length,
					0,
				)
				const flattened = flatten(1)(array)
				assertEquals(flattened.length, totalElements)
			},
		),
	)
})

Deno.test("flatten - infinity depth fully flattens", () => {
	const createNested = (value: number, depth: number): any => {
		if (depth === 0) return value
		return [createNested(value, depth - 1)]
	}

	fc.assert(
		fc.property(
			fc.integer({ min: 1, max: 10 }),
			fc.integer({ min: 0, max: 10 }),
			(value, depth) => {
				const nested = createNested(value, depth)
				const flattened = flatten(Infinity)([nested])
				assertEquals(flattened, [value])
			},
		),
	)
})

Deno.test("flatten - creates new array (immutability)", () => {
	const original = [[1, 2], [3, 4]]
	const result = flatten(1)(original)

	assertEquals(result, [1, 2, 3, 4])
	assertEquals(original, [[1, 2], [3, 4]]) // Original unchanged
	assertEquals(original === result, false) // Different references
})

Deno.test("flatten - complex nested structures", () => {
	interface NestedData {
		value: number
	}

	const complex: Array<
		NestedData | Array<NestedData> | Array<Array<NestedData>>
	> = [
		{ value: 1 },
		[{ value: 2 }, { value: 3 }],
		[[{ value: 4 }]],
	]

	const result = flatten(1)(complex)
	assertEquals(result, [
		{ value: 1 },
		{ value: 2 },
		{ value: 3 },
		[{ value: 4 }],
	])
})

Deno.test("flatten - respects currying", () => {
	fc.assert(
		fc.property(
			fc.array(fc.array(fc.integer())),
			fc.integer({ min: 0, max: 5 }),
			(array, depth) => {
				const curriedFlatten = flatten(depth)
				const result1 = curriedFlatten(array)
				const result2 = flatten(depth)(array)

				assertEquals(result1, result2)
			},
		),
	)
})
