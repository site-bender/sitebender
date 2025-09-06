import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import takeLast from "../../../../src/simple/array/takeLast/index.ts"

Deno.test("takeLast - takes last n elements from array", () => {
	const takeLast3 = takeLast(3)

	assertEquals(takeLast3([1, 2, 3, 4, 5]), [3, 4, 5])
	assertEquals(takeLast3(["a", "b", "c", "d"]), ["b", "c", "d"])
	assertEquals(takeLast3([1]), [1])
})

Deno.test("takeLast - handles different counts", () => {
	const array = [1, 2, 3, 4, 5]

	assertEquals(takeLast(0)(array), [])
	assertEquals(takeLast(1)(array), [5])
	assertEquals(takeLast(2)(array), [4, 5])
	assertEquals(takeLast(5)(array), [1, 2, 3, 4, 5])
	assertEquals(takeLast(10)(array), [1, 2, 3, 4, 5])
})

Deno.test("takeLast - handles negative counts", () => {
	const array = [1, 2, 3, 4, 5]

	assertEquals(takeLast(-1)(array), [])
	assertEquals(takeLast(-10)(array), [])
	assertEquals(takeLast(-100)(array), [])
})

Deno.test("takeLast - handles empty array", () => {
	assertEquals(takeLast(3)([]), [])
	assertEquals(takeLast(0)([]), [])
	assertEquals(takeLast(-1)([]), [])
})

Deno.test("takeLast - handles null and undefined", () => {
	const takeLast5 = takeLast(5)

	assertEquals(takeLast5(null), [])
	assertEquals(takeLast5(undefined), [])

	// Even with 0 count
	assertEquals(takeLast(0)(null), [])
	assertEquals(takeLast(0)(undefined), [])
})

Deno.test("takeLast - preserves types", () => {
	type Item = { id: number; name: string }
	const items: Array<Item> = [
		{ id: 1, name: "a" },
		{ id: 2, name: "b" },
		{ id: 3, name: "c" },
		{ id: 4, name: "d" },
		{ id: 5, name: "e" },
	]

	const last2 = takeLast(2)(items)
	assertEquals(last2, [
		{ id: 4, name: "d" },
		{ id: 5, name: "e" },
	])
})

Deno.test("takeLast - returns new array instance", () => {
	const original = [1, 2, 3]
	const result = takeLast(3)(original)

	assertEquals(result, original)
	// Verify it's a new array instance
	assertEquals(result === original, false)
})

Deno.test("takeLast - handles special number values", () => {
	const array = [1, 2, 3, 4, 5]

	assertEquals(takeLast(NaN)(array), []) // NaN is explicitly handled
	assertEquals(takeLast(Infinity)(array), [1, 2, 3, 4, 5])
	assertEquals(takeLast(-Infinity)(array), [])
	assertEquals(takeLast(0.5)(array), [1, 2, 3, 4, 5]) // slice rounds -0.5 to -0, returns all
	assertEquals(takeLast(2.9)(array), [4, 5]) // slice rounds -2.9 to -2
})

Deno.test("takeLast - works with string arrays", () => {
	const strings = ["foo", "bar", "baz", "qux"]

	assertEquals(takeLast(2)(strings), ["baz", "qux"])
	assertEquals(takeLast(1)(strings), ["qux"])
	assertEquals(takeLast(4)(strings), ["foo", "bar", "baz", "qux"])
})

Deno.test("takeLast - handles objects and references", () => {
	const obj1 = { value: 1 }
	const obj2 = { value: 2 }
	const obj3 = { value: 3 }
	const array = [obj1, obj2, obj3]

	const result = takeLast(2)(array)
	assertEquals(result, [obj2, obj3])
	// Verify objects are same references
	assertEquals(result[0] === obj2, true)
	assertEquals(result[1] === obj3, true)
})

// Property-based tests
Deno.test("takeLast - property: result length is min(n, array.length)", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer({ min: -10, max: 100 }),
			(arr, count) => {
				const result = takeLast(count)(arr)
				const expectedLength = count <= 0
					? 0
					: Math.min(count, arr.length)
				assertEquals(result.length, expectedLength)
				return true
			},
		),
		{ numRuns: 100 },
	)
})

Deno.test("takeLast - property: elements are from end of array", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1 }),
			fc.integer({ min: 1, max: 20 }),
			(arr, count) => {
				const result = takeLast(count)(arr)
				const expectedStart = Math.max(0, arr.length - count)

				for (let i = 0; i < result.length; i++) {
					assertEquals(result[i], arr[expectedStart + i])
				}

				return true
			},
		),
		{ numRuns: 100 },
	)
})

Deno.test("takeLast - property: takeLast(0) always returns empty", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			(arr) => {
				const result = takeLast(0)(arr)
				assertEquals(result, [])
				return true
			},
		),
		{ numRuns: 100 },
	)
})

Deno.test("takeLast - property: takeLast(arr.length) returns whole array", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(arr) => {
				const result = takeLast(arr.length)(arr)
				assertEquals(result, arr)
				assertEquals(result === arr, false) // New instance
				return true
			},
		),
		{ numRuns: 100 },
	)
})

Deno.test("takeLast - property: maintains order", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: 0, max: 1000 }), { minLength: 2 }),
			fc.integer({ min: 2, max: 10 }),
			(arr, count) => {
				const sorted = [...arr].sort((a, b) => a - b)
				const result = takeLast(count)(sorted)

				// Verify result is still sorted
				for (let i = 1; i < result.length; i++) {
					assertEquals(result[i] >= result[i - 1], true)
				}

				return true
			},
		),
		{ numRuns: 100 },
	)
})
