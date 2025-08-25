import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import last from "../../../../src/simple/array/last/index.ts"

// ===== Basic Functionality Tests =====

Deno.test("last - basic usage", () => {
	assertEquals(last([1, 2, 3]), 3)
	assertEquals(last(["a", "b", "c"]), "c")
	assertEquals(last([true, false]), false)
})

Deno.test("last - edge cases", () => {
	// Empty array
	assertEquals(last([]), undefined)

	// Single element
	assertEquals(last([42]), 42)
	assertEquals(last(["only"]), "only")

	// Two elements
	assertEquals(last([1, 2]), 2)
	assertEquals(last(["first", "second"]), "second")
})

Deno.test("last - JSDoc examples", () => {
	assertEquals(last([1, 2, 3]), 3)
	assertEquals(last(["a", "b"]), "b")
	assertEquals(last([42]), 42)
	assertEquals(last([]), undefined)
})

Deno.test("last - type preservation", () => {
	// Numbers
	const numbers = [1, 2, 3, 4, 5]
	const numbersLast: number | undefined = last(numbers)
	assertEquals(numbersLast, 5)

	// Strings
	const strings = ["a", "b", "c"]
	const stringsLast: string | undefined = last(strings)
	assertEquals(stringsLast, "c")

	// Objects
	const objects = [{ id: 1 }, { id: 2 }, { id: 3 }]
	const objectsLast = last(objects)
	assertEquals(objectsLast, { id: 3 })

	// Mixed types
	const mixed = [1, "two", { three: 3 }, [4]] as Array<
		number | string | object | Array<number>
	>
	const mixedLast = last(mixed)
	assertEquals(mixedLast, [4])
})

Deno.test("last - immutability", () => {
	const original = [1, 2, 3, 4]
	const result = last(original)

	// Original unchanged
	assertEquals(original, [1, 2, 3, 4])
	assertEquals(result, 4)

	// Modifying original after doesn't affect result
	original[3] = 999
	assertEquals(result, 4)
	original[3] = 4 // restore
})

Deno.test("last - special values", () => {
	// With undefined
	assertEquals(last([1, 2, undefined]), undefined)
	assertEquals(last([undefined]), undefined)

	// With null
	assertEquals(last([1, 2, null]), null)
	assertEquals(last([null]), null)

	// With NaN
	const resultNaN = last([1, 2, NaN])
	assertEquals(Number.isNaN(resultNaN), true)

	const singleNaN = last([NaN])
	assertEquals(Number.isNaN(singleNaN), true)

	// With Infinity
	assertEquals(last([0, Infinity]), Infinity)
	assertEquals(last([-Infinity]), -Infinity)
	assertEquals(last([Infinity, -Infinity]), -Infinity)

	// With -0 and +0
	assertEquals(Object.is(last([0, -0]), -0), true)
	assertEquals(Object.is(last([+0]), +0), true)
})

Deno.test("last - sparse arrays", () => {
	// deno-lint-ignore no-sparse-arrays
	const sparse = [1, 2, , 4]
	assertEquals(last(sparse), 4)

	const sparseEnd = [1, 2, 3]
	assertEquals(last(sparseEnd), 3)

	// deno-lint-ignore no-sparse-arrays
	const sparseMiddle = [1, , 3]
	assertEquals(last(sparseMiddle), 3)

	// deno-lint-ignore no-sparse-arrays
	const allSparse = [, , ,]
	assertEquals(last(allSparse), undefined)
})

Deno.test("last - nested arrays", () => {
	const nested = [[1, 2], [3, 4], [5, 6]]
	assertEquals(last(nested), [5, 6])

	const deep = [[[1]], [[2]], [[3]]]
	assertEquals(last(deep), [[3]])

	// Array as last element
	const withArray = [1, 2, [3, 4]]
	assertEquals(last(withArray), [3, 4])
})

Deno.test("last - boolean values", () => {
	assertEquals(last([true]), true)
	assertEquals(last([false]), false)
	assertEquals(last([true, false]), false)
	assertEquals(last([false, true]), true)
})

Deno.test("last - function values", () => {
	const fn1 = () => 1
	const fn2 = () => 2
	const fns = [fn1, fn2]
	assertEquals(last(fns), fn2)
})

// ===== Property-Based Tests =====

Deno.test("last property: returns undefined for empty arrays", () => {
	fc.assert(
		fc.property(
			fc.constant([]),
			(arr) => {
				return last(arr) === undefined
			},
		),
	)
})

Deno.test("last property: returns the element at index length-1", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything(), { minLength: 1 }),
			(arr) => {
				const result = last(arr)
				return result === arr[arr.length - 1]
			},
		),
	)
})

Deno.test("last property: idempotent for single element arrays", () => {
	fc.assert(
		fc.property(
			fc.anything(),
			(elem) => {
				const singleElemArray = [elem]
				return last(singleElemArray) === elem
			},
		),
	)
})

Deno.test("last property: last after push is the pushed element", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(arr, elem) => {
				const newArr = [...arr, elem]
				return last(newArr) === elem
			},
		),
	)
})

Deno.test("last property: complements first/head", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 1 }),
			(arr) => {
				// For single element arrays, first and last are the same
				const first = arr[0]
				return last(arr) === first
			},
		),
	)
})

Deno.test("last property: consistent with array.at(-1)", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			(arr) => {
				return Object.is(last(arr), arr.at(-1))
			},
		),
	)
})
