import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import tail from "../../../../src/simple/array/tail/index.ts"

// ===== Basic Functionality Tests =====

Deno.test("tail - basic usage", () => {
	assertEquals(tail([1, 2, 3, 4]), [2, 3, 4])
	assertEquals(tail(["a", "b", "c"]), ["b", "c"])
	assertEquals(tail([true, false, true]), [false, true])
})

Deno.test("tail - edge cases", () => {
	// Empty array
	assertEquals(tail([]), [])

	// Single element
	assertEquals(tail([42]), [])
	assertEquals(tail(["single"]), [])

	// Two elements
	assertEquals(tail([1, 2]), [2])
	assertEquals(tail(["first", "second"]), ["second"])
})

Deno.test("tail - JSDoc examples", () => {
	assertEquals(tail([1, 2, 3, 4]), [2, 3, 4])
	assertEquals(tail(["a"]), [])
	assertEquals(tail([]), [])
	assertEquals(tail([1, 2]), [2])

	// Recursive processing example
	const sum = (arr: Array<number>): number =>
		arr.length === 0 ? 0 : arr[0] + sum(tail(arr))
	assertEquals(sum([1, 2, 3, 4]), 10)
})

Deno.test("tail - type preservation", () => {
	// Numbers
	const numbers = [1, 2, 3, 4, 5]
	const numbersTail: Array<number> = tail(numbers)
	assertEquals(numbersTail, [2, 3, 4, 5])

	// Strings
	const strings = ["a", "b", "c"]
	const stringsTail: Array<string> = tail(strings)
	assertEquals(stringsTail, ["b", "c"])

	// Objects
	const objects = [{ id: 1 }, { id: 2 }, { id: 3 }]
	const objectsTail = tail(objects)
	assertEquals(objectsTail, [{ id: 2 }, { id: 3 }])

	// Mixed types
	const mixed = [1, "two", { three: 3 }, [4]] as Array<
		number | string | object | Array<number>
	>
	const mixedTail = tail(mixed)
	assertEquals(mixedTail, ["two", { three: 3 }, [4]])
})

Deno.test("tail - immutability", () => {
	const original = [1, 2, 3, 4]
	const result = tail(original)

	// Original unchanged
	assertEquals(original, [1, 2, 3, 4])
	assertEquals(result, [2, 3, 4])

	// Result is new array
	assertEquals(original === result, false)

	// Modifying result doesn't affect original
	result[0] = 999
	assertEquals(original[1], 2)
})

Deno.test("tail - special values", () => {
	// With undefined
	assertEquals(tail([undefined, 1, 2]), [1, 2])
	assertEquals(tail([1, undefined, 2]), [undefined, 2])

	// With null
	assertEquals(tail([null, 1, 2]), [1, 2])
	assertEquals(tail([1, null, 2]), [null, 2])

	// With NaN
	const resultNaN = tail([NaN, 1, 2])
	assertEquals(resultNaN.length, 2)
	assertEquals(resultNaN[0], 1)
	assertEquals(resultNaN[1], 2)

	const withNaN = tail([1, NaN, 2])
	assertEquals(withNaN.length, 2)
	assertEquals(Number.isNaN(withNaN[0]), true)
	assertEquals(withNaN[1], 2)

	// With Infinity
	assertEquals(tail([Infinity, -Infinity, 0]), [-Infinity, 0])
	assertEquals(tail([0, Infinity, -Infinity]), [Infinity, -Infinity])
})

Deno.test("tail - sparse arrays", () => {
	// deno-lint-ignore no-sparse-arrays
	const sparse = [1, , 3, 4]
	const result = tail(sparse)
	assertEquals(result.length, 3)
	assertEquals(result[0], undefined)
	assertEquals(result[1], 3)
	assertEquals(result[2], 4)

	// deno-lint-ignore no-sparse-arrays
	const verySpare = [, , ,]
	const sparseResult = tail(verySpare)
	assertEquals(sparseResult.length, 2)
	assertEquals(sparseResult[0], undefined)
	assertEquals(sparseResult[1], undefined)
})

Deno.test("tail - nested arrays", () => {
	const nested = [[1, 2], [3, 4], [5, 6]]
	assertEquals(tail(nested), [[3, 4], [5, 6]])

	const deep = [[[1]], [[2]], [[3]]]
	assertEquals(tail(deep), [[[2]], [[3]]])
})

// ===== Null Safety Tests =====

Deno.test("tail - null safety", () => {
	// Null input
	assertEquals(tail(null), [])

	// Undefined input
	assertEquals(tail(undefined), [])

	// Non-array inputs
	// @ts-ignore - Testing runtime behavior
	assertEquals(tail(42), [])

	// @ts-ignore - Testing runtime behavior
	assertEquals(tail("hello"), [])

	// @ts-ignore - Testing runtime behavior
	assertEquals(tail({ foo: "bar" }), [])

	// @ts-ignore - Testing runtime behavior
	assertEquals(tail(true), [])

	// @ts-ignore - Testing runtime behavior
	assertEquals(tail(false), [])

	// @ts-ignore - Testing runtime behavior
	assertEquals(tail(Symbol("test")), [])
})

// ===== Property-Based Tests =====

Deno.test("tail property: length is original length - 1 (or 0)", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			(arr) => {
				const result = tail(arr)
				const expectedLength = Math.max(0, arr.length - 1)
				return result.length === expectedLength
			},
		),
	)
})

Deno.test("tail property: elements match original from index 1", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything(), { minLength: 1 }),
			(arr) => {
				const result = tail(arr)
				return result.every((elem, i) => elem === arr[i + 1])
			},
		),
	)
})

Deno.test("tail property: tail of tail removes first two elements", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 2 }),
			(arr) => {
				const onceTail = tail(arr)
				const twiceTail = tail(onceTail)
				const expected = arr.slice(2)
				return twiceTail.length === expected.length &&
					twiceTail.every((elem, i) => elem === expected[i])
			},
		),
	)
})

Deno.test("tail property: idempotent for empty and single element arrays", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything(), { maxLength: 1 }),
			(arr) => {
				const once = tail(arr)
				const twice = tail(once)
				return once.length === 0 && twice.length === 0
			},
		),
	)
})

Deno.test("tail property: preserves element order", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 2 }),
			(arr) => {
				const result = tail(arr)
				// Check that each element in result matches the corresponding element in original
				// starting from index 1
				for (let i = 0; i < result.length; i++) {
					if (result[i] !== arr[i + 1]) {
						return false
					}
				}
				return true
			},
		),
	)
})
