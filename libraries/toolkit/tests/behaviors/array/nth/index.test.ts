import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import nth from "../../../../src/simple/array/nth/index.ts"

// ===== Basic Functionality Tests =====

Deno.test("nth - basic usage", () => {
	assertEquals(nth(0)([1, 2, 3]), 1)
	assertEquals(nth(1)([1, 2, 3]), 2)
	assertEquals(nth(2)([1, 2, 3]), 3)
	assertEquals(nth(0)(["a", "b", "c"]), "a")
	assertEquals(nth(1)(["a", "b", "c"]), "b")
})

Deno.test("nth - negative indices", () => {
	// Negative indices count from end
	assertEquals(nth(-1)([1, 2, 3]), 3)
	assertEquals(nth(-2)([1, 2, 3]), 2)
	assertEquals(nth(-3)([1, 2, 3]), 1)

	assertEquals(nth(-1)(["a", "b", "c", "d"]), "d")
	assertEquals(nth(-2)(["a", "b", "c", "d"]), "c")
})

Deno.test("nth - out of bounds", () => {
	// Positive out of bounds
	assertEquals(nth(10)([1, 2, 3]), undefined)
	assertEquals(nth(3)([1, 2, 3]), undefined)
	assertEquals(nth(100)(["a", "b"]), undefined)

	// Negative out of bounds
	assertEquals(nth(-10)([1, 2, 3]), undefined)
	assertEquals(nth(-4)([1, 2, 3]), undefined)
	assertEquals(nth(-100)(["a", "b"]), undefined)
})

Deno.test("nth - edge cases", () => {
	// Empty array
	assertEquals(nth(0)([]), undefined)
	assertEquals(nth(1)([]), undefined)
	assertEquals(nth(-1)([]), undefined)

	// Single element
	assertEquals(nth(0)([42]), 42)
	assertEquals(nth(-1)([42]), 42)
	assertEquals(nth(1)([42]), undefined)
	assertEquals(nth(-2)([42]), undefined)
})

Deno.test("nth - JSDoc examples", () => {
	assertEquals(nth(1)([1, 2, 3]), 2)
	assertEquals(nth(0)(["a", "b", "c"]), "a")
	assertEquals(nth(-1)([1, 2, 3]), 3) // last element
	assertEquals(nth(10)([1, 2, 3]), undefined)

	// Access specific positions
	const getSecond = nth(1)
	assertEquals(getSecond(["first", "second", "third"]), "second")
})

Deno.test("nth - currying", () => {
	const getFirst = nth(0)
	const getSecond = nth(1)
	const getLast = nth(-1)

	const arr = [10, 20, 30, 40]
	assertEquals(getFirst(arr), 10)
	assertEquals(getSecond(arr), 20)
	assertEquals(getLast(arr), 40)

	// Different arrays with same accessor
	assertEquals(getFirst(["a", "b"]), "a")
	assertEquals(getFirst([true, false]), true)
	assertEquals(getFirst([{ id: 1 }]), { id: 1 })
})

Deno.test("nth - type preservation", () => {
	// Numbers
	const numbers = [1, 2, 3, 4, 5]
	const numbersNth: number | undefined = nth(2)(numbers)
	assertEquals(numbersNth, 3)

	// Strings
	const strings = ["a", "b", "c"]
	const stringsNth: string | undefined = nth(1)(strings)
	assertEquals(stringsNth, "b")

	// Objects
	const objects = [{ id: 1 }, { id: 2 }, { id: 3 }]
	const objectsNth = nth(0)(objects)
	assertEquals(objectsNth, { id: 1 })

	// Mixed types
	const mixed = [1, "two", { three: 3 }, [4]] as Array<
		number | string | object | Array<number>
	>
	const mixedNth = nth(2)(mixed)
	assertEquals(mixedNth, { three: 3 })
})

Deno.test("nth - special values", () => {
	// With undefined
	assertEquals(nth(0)([undefined, 1, 2]), undefined)
	assertEquals(nth(1)([1, undefined, 2]), undefined)

	// With null
	assertEquals(nth(0)([null, 1, 2]), null)
	assertEquals(nth(2)([1, 2, null]), null)

	// With NaN
	const arrWithNaN = [NaN, 1, 2]
	const resultNaN = nth(0)(arrWithNaN)
	assertEquals(Number.isNaN(resultNaN), true)

	const midNaN = nth(1)([1, NaN, 2])
	assertEquals(Number.isNaN(midNaN), true)

	// With Infinity
	assertEquals(nth(0)([Infinity, -Infinity]), Infinity)
	assertEquals(nth(1)([Infinity, -Infinity]), -Infinity)
	assertEquals(nth(-1)([0, Infinity]), Infinity)

	// With -0 and +0
	assertEquals(Object.is(nth(0)([-0, 1]), -0), true)
	assertEquals(Object.is(nth(0)([+0, 1]), +0), true)
})

Deno.test("nth - sparse arrays", () => {
	// deno-lint-ignore no-sparse-arrays
	const sparse = [1, , 3, 4]
	assertEquals(nth(0)(sparse), 1)
	assertEquals(nth(1)(sparse), undefined)
	assertEquals(nth(2)(sparse), 3)
	assertEquals(nth(3)(sparse), 4)
	assertEquals(nth(-1)(sparse), 4)

	// deno-lint-ignore no-sparse-arrays
	const allSparse = [, , ,]
	assertEquals(nth(0)(allSparse), undefined)
	assertEquals(nth(1)(allSparse), undefined)
	assertEquals(nth(-1)(allSparse), undefined)
})

Deno.test("nth - nested arrays", () => {
	const nested = [[1, 2], [3, 4], [5, 6]]
	assertEquals(nth(0)(nested), [1, 2])
	assertEquals(nth(1)(nested), [3, 4])
	assertEquals(nth(2)(nested), [5, 6])
	assertEquals(nth(-1)(nested), [5, 6])

	const deep = [[[1]], [[2]], [[3]]]
	assertEquals(nth(1)(deep), [[2]])
})

Deno.test("nth - with various index types", () => {
	// Float indices (truncated to integer)
	assertEquals(nth(1.5)([1, 2, 3]), 2)
	assertEquals(nth(0.9)([1, 2, 3]), 1)
	assertEquals(nth(-1.5)([1, 2, 3]), 3)

	// Zero
	assertEquals(nth(0)([1, 2, 3]), 1)
	assertEquals(nth(-0)([1, 2, 3]), 1) // -0 is treated as 0
})

// ===== Property-Based Tests =====

Deno.test("nth property: returns undefined for empty arrays", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: -100, max: 100 }),
			(index) => {
				return nth(index)([]) === undefined
			},
		),
	)
})

Deno.test("nth property: valid positive index returns correct element", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything(), { minLength: 1 }),
			(arr) => {
				// Test all valid indices
				for (let i = 0; i < arr.length; i++) {
					if (nth(i)(arr) !== arr[i]) {
						return false
					}
				}
				return true
			},
		),
	)
})

Deno.test("nth property: valid negative index returns correct element", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything(), { minLength: 1 }),
			(arr) => {
				// Test all valid negative indices
				for (let i = 1; i <= arr.length; i++) {
					if (nth(-i)(arr) !== arr[arr.length - i]) {
						return false
					}
				}
				return true
			},
		),
	)
})

Deno.test("nth property: out of bounds returns undefined", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			(arr) => {
				// Positive out of bounds
				const posOutOfBounds = nth(arr.length)(arr)
				const farPosOutOfBounds = nth(arr.length + 100)(arr)

				// Negative out of bounds
				const negOutOfBounds = nth(-(arr.length + 1))(arr)
				const farNegOutOfBounds = nth(-(arr.length + 100))(arr)

				return posOutOfBounds === undefined &&
					farPosOutOfBounds === undefined &&
					negOutOfBounds === undefined &&
					farNegOutOfBounds === undefined
			},
		),
	)
})

Deno.test("nth property: consistent with array.at()", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			fc.integer({ min: -100, max: 100 }),
			(arr, index) => {
				return Object.is(nth(index)(arr), arr.at(index))
			},
		),
	)
})

Deno.test("nth property: nth(0) equals first element", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything(), { minLength: 1 }),
			(arr) => {
				return nth(0)(arr) === arr[0]
			},
		),
	)
})

Deno.test("nth property: nth(-1) equals last element", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything(), { minLength: 1 }),
			(arr) => {
				return nth(-1)(arr) === arr[arr.length - 1]
			},
		),
	)
})

Deno.test("nth property: curried function maintains referential transparency", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: -10, max: 10 }),
			fc.array(fc.integer()),
			(index, arr) => {
				const accessor = nth(index)
				const result1 = accessor(arr)
				const result2 = accessor(arr)
				// Same input produces same output
				return result1 === result2
			},
		),
	)
})
