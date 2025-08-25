import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import insertAt from "../../../../src/simple/array/insertAt/index.ts"

// Test JSDoc examples
Deno.test("insertAt - JSDoc example 1: insert in middle", () => {
	const result = insertAt(1)("x")(["a", "b", "c"])
	assertEquals(result, ["a", "x", "b", "c"])
})

Deno.test("insertAt - JSDoc example 2: insert at start", () => {
	const result = insertAt(0)("start")(["a", "b"])
	assertEquals(result, ["start", "a", "b"])
})

Deno.test("insertAt - JSDoc example 3: insert at end (index = length)", () => {
	const result = insertAt(3)("end")(["a", "b", "c"])
	assertEquals(result, ["a", "b", "c", "end"])
})

Deno.test("insertAt - JSDoc example 4: out of bounds index", () => {
	const result = insertAt(10)(99)([1, 2])
	assertEquals(result, [1, 2])
})

Deno.test("insertAt - JSDoc example 5: building lists with header", () => {
	const addHeader = insertAt(0)("# Header")
	const result = addHeader(["line1", "line2"])
	assertEquals(result, ["# Header", "line1", "line2"])
})

// Edge cases
Deno.test("insertAt - empty array", () => {
	const result = insertAt(0)("item")([])
	assertEquals(result, ["item"])
})

Deno.test("insertAt - negative index", () => {
	const result = insertAt(-1)(99)([1, 2, 3])
	assertEquals(result, [1, 2, 3]) // Returns unchanged
})

Deno.test("insertAt - index greater than length", () => {
	const result = insertAt(5)(99)([1, 2])
	assertEquals(result, [1, 2]) // Returns unchanged
})

Deno.test("insertAt - single element array at index 0", () => {
	const result = insertAt(0)(0)([1])
	assertEquals(result, [0, 1])
})

Deno.test("insertAt - single element array at index 1", () => {
	const result = insertAt(1)(2)([1])
	assertEquals(result, [1, 2])
})

Deno.test("insertAt - with undefined value", () => {
	const result = insertAt(1)(undefined as number | undefined)(
		[1, 2, 3] as Array<number | undefined>,
	)
	assertEquals(result, [1, undefined, 2, 3])
})

Deno.test("insertAt - with null value", () => {
	const result = insertAt(0)(null as string | null)(
		["a", "b"] as Array<string | null>,
	)
	assertEquals(result, [null, "a", "b"])
})

Deno.test("insertAt - with NaN", () => {
	const result = insertAt(1)(NaN)([1, 2])
	assertEquals(result, [1, NaN, 2])
	assertEquals(Number.isNaN(result[1]), true)
})

Deno.test("insertAt - with sparse array", () => {
	// deno-lint-ignore no-sparse-arrays
	const sparse: Array<number | undefined> = [1, , 3]
	const result = insertAt(1)(2 as number | undefined)(sparse)
	assertEquals(result, [1, 2, undefined, 3])
})

Deno.test("insertAt - currying stages", () => {
	const insertAtTwo = insertAt(2)
	const insertHello = insertAtTwo("hello")
	const result = insertHello(["a", "b", "c", "d"])
	assertEquals(result, ["a", "b", "hello", "c", "d"])
})

Deno.test("insertAt - preserves array types", () => {
	const numbers = [1, 2, 3]
	const result = insertAt(1)(1.5)(numbers)
	assertEquals(result, [1, 1.5, 2, 3])

	const strings = ["a", "b", "c"]
	const result2 = insertAt(2)("x")(strings)
	assertEquals(result2, ["a", "b", "x", "c"])
})

Deno.test("insertAt - with objects", () => {
	const users = [{ id: 1 }, { id: 3 }]
	const result = insertAt(1)({ id: 2 })(users)
	assertEquals(result, [{ id: 1 }, { id: 2 }, { id: 3 }])
})

Deno.test("insertAt - with arrays as elements", () => {
	const matrix = [[1, 2], [5, 6]]
	const result = insertAt(1)([3, 4])(matrix)
	assertEquals(result, [[1, 2], [3, 4], [5, 6]])
})

// Property-based tests
Deno.test("insertAt - property: result length is input length + 1 for valid index", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(array, value) => {
				const validIndex = Math.floor(Math.random() * (array.length + 1))
				const result = insertAt(validIndex)(value)(array)
				return result.length === array.length + 1
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("insertAt - property: original array unchanged for invalid index", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			fc.oneof(
				fc.integer({ max: -1 }),
				fc.integer({ min: 100 }),
			),
			(array, value, invalidIndex) => {
				// Ensure index is truly invalid
				if (invalidIndex >= 0 && invalidIndex <= array.length) {
					return true // Skip this case
				}
				const result = insertAt(invalidIndex)(value)(array)
				return result === array
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("insertAt - property: element is at correct position", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(array, value) => {
				const index = Math.floor(Math.random() * (array.length + 1))
				const result = insertAt(index)(value)(array)
				return result[index] === value
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("insertAt - property: elements before insertion point unchanged", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(array, value) => {
				const index = Math.floor(Math.random() * (array.length + 1))
				const result = insertAt(index)(value)(array)

				// Check elements before insertion point
				for (let i = 0; i < index; i++) {
					if (result[i] !== array[i]) return false
				}
				return true
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("insertAt - property: elements after insertion point shifted", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(array, value) => {
				const index = Math.floor(Math.random() * (array.length + 1))
				const result = insertAt(index)(value)(array)

				// Check elements after insertion point
				for (let i = index + 1; i < result.length; i++) {
					if (result[i] !== array[i - 1]) return false
				}
				return true
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("insertAt - property: immutability", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(array, value) => {
				const original = [...array]
				const index = Math.floor(Math.random() * (array.length + 1))
				insertAt(index)(value)(array)

				// Original should be unchanged
				return array.length === original.length &&
					array.every((v, i) => v === original[i])
			},
		),
		{ numRuns: 1000 },
	)
})
