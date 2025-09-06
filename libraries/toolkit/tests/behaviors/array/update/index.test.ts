import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import update from "../../../../src/simple/array/update/index.ts"

// Test JSDoc examples (selected from the extensive examples)
Deno.test("update - JSDoc example: basic update", () => {
	const result = update<number>(1)((x: number) => x * 2)([1, 2, 3, 4])
	assertEquals(result, [1, 4, 3, 4])
})

Deno.test("update - JSDoc example: increment at index", () => {
	const result = update<number>(2)((x: number) => x + 1)([10, 20, 30, 40])
	assertEquals(result, [10, 20, 31, 40])
})

Deno.test("update - JSDoc example: string transformation", () => {
	const result = update<string>(0)((s: string) => s.toUpperCase())([
		"hello",
		"world",
	])
	assertEquals(result, ["HELLO", "world"])
})

Deno.test("update - JSDoc example: toggle boolean", () => {
	const result = update<boolean>(1)((b: boolean) => !b)([true, false, true])
	assertEquals(result, [true, true, true])
})

Deno.test("update - JSDoc example: negative index from end", () => {
	const result = update<number>(-1)((x: number) => x * 10)([1, 2, 3, 4])
	assertEquals(result, [1, 2, 3, 40])
})

Deno.test("update - JSDoc example: negative index -2", () => {
	const result = update<number>(-2)((x: number) => x + 100)([1, 2, 3, 4])
	assertEquals(result, [1, 2, 103, 4])
})

Deno.test("update - JSDoc example: object transformation", () => {
	const users = [
		{ id: 1, name: "Alice", active: true },
		{ id: 2, name: "Bob", active: true },
		{ id: 3, name: "Charlie", active: true },
	]
	type User = { id: number; name: string; active: boolean }
	const result = update<User>(1)((u: User) => ({ ...u, active: false }))(
		users,
	)
	assertEquals(result, [
		{ id: 1, name: "Alice", active: true },
		{ id: 2, name: "Bob", active: false },
		{ id: 3, name: "Charlie", active: true },
	])
})

Deno.test("update - JSDoc example: conditional update", () => {
	const result = update<number>(2)((x: number) => x > 50 ? x / 2 : x * 2)([
		10,
		20,
		60,
		80,
	])
	assertEquals(result, [10, 20, 30, 80])
})

Deno.test("update - JSDoc example: index out of bounds", () => {
	const result1 = update<number>(10)((x: number) => x * 2)([1, 2, 3])
	assertEquals(result1, [1, 2, 3])

	const result2 = update<number>(-10)((x: number) => x * 2)([1, 2, 3])
	assertEquals(result2, [1, 2, 3])
})

Deno.test("update - JSDoc example: empty array", () => {
	const result = update<unknown>(0)((x: unknown) => x)([])
	assertEquals(result, [])
})

Deno.test("update - JSDoc example: null handling", () => {
	const result1 = update<unknown>(0)((x: unknown) => x)(null)
	assertEquals(result1, [])

	const result2 = update<unknown>(0)((x: unknown) => x)(undefined)
	assertEquals(result2, [])
})

// Edge cases
Deno.test("update - single element array", () => {
	const result = update<number>(0)((x: number) => x * x)([5])
	assertEquals(result, [25])
})

Deno.test("update - single element with negative index", () => {
	const result = update<number>(-1)((x: number) => x + 10)([5])
	assertEquals(result, [15])
})

Deno.test("update - boundary negative indices", () => {
	const arr = [1, 2, 3, 4, 5]

	// -1 = last element
	assertEquals(update<number>(-1)((x: number) => x * 10)(arr), [
		1,
		2,
		3,
		4,
		50,
	])

	// -5 = first element
	assertEquals(update<number>(-5)((x: number) => x * 10)(arr), [
		10,
		2,
		3,
		4,
		5,
	])

	// -6 = out of bounds
	assertEquals(update<number>(-6)((x: number) => x * 10)(arr), [
		1,
		2,
		3,
		4,
		5,
	])
})

Deno.test("update - with undefined value", () => {
	const result = update<number | undefined>(1)(() => undefined)(
		[1, 2, 3] as Array<number | undefined>,
	)
	assertEquals(result, [1, undefined, 3])
})

Deno.test("update - with null value", () => {
	const result = update<string | null>(0)(() => null)(
		["a", "b"] as Array<string | null>,
	)
	assertEquals(result, [null, "b"])
})

Deno.test("update - with NaN", () => {
	const result = update<number>(1)(() => NaN)([1, 2, 3])
	assertEquals(result[0], 1)
	assertEquals(Number.isNaN(result[1]), true)
	assertEquals(result[2], 3)
})

Deno.test("update - sparse array", () => {
	// deno-lint-ignore no-sparse-arrays
	const sparse = [1, , 3]
	const result = update<number | undefined | string>(1)((
		x: number | undefined | string,
	) => x ?? "filled")(sparse as Array<number | undefined | string>)
	assertEquals(result, [1, "filled", 3])
})

Deno.test("update - array with mixed types", () => {
	const mixed = [1, "two", true, null, undefined]
	const result = update<unknown>(2)((x: unknown) => !x)(mixed)
	assertEquals(result, [1, "two", false, null, undefined])
})

Deno.test("update - nested array transformation", () => {
	const matrix = [[1, 2], [3, 4], [5, 6]]
	const result = update<number[]>(1)((row: number[]) =>
		row.map((x) => x * 10)
	)(
		matrix,
	)
	assertEquals(result, [[1, 2], [30, 40], [5, 6]])
})

Deno.test("update - currying stages", () => {
	const updateAtOne = update<number>(1)
	const doubleIt = updateAtOne((n: number) => n * 2)

	assertEquals(doubleIt([1, 2, 3]), [1, 4, 3])
	assertEquals(doubleIt([10, 20, 30]), [10, 40, 30])
})

Deno.test("update - partial application for reusable updates", () => {
	const doubleAt = update<number>(2)((x: number) => x * 2)
	assertEquals(doubleAt([1, 2, 3, 4]), [1, 2, 6, 4])
	assertEquals(doubleAt([5, 6, 7, 8]), [5, 6, 14, 8])

	const toggleFirst = update<boolean>(0)((b: boolean) => !b)
	assertEquals(toggleFirst([true, false, true]), [false, false, true])
	assertEquals(toggleFirst([false, false, false]), [true, false, false])
})

Deno.test("update - null and undefined in array", () => {
	const result = update<number | null | string>(1)((
		x: number | null | string,
	) => x ?? "default")([1, null, 3] as Array<number | null | string>)
	assertEquals(result, [1, "default", 3])
})

Deno.test("update - complex calculation", () => {
	const applyDiscount = (price: number) => Math.round(price * 0.9)
	const result = update<number>(1)(applyDiscount)([100, 200, 300])
	assertEquals(result, [100, 180, 300])
})

// Property-based tests
Deno.test("update - property: result length equals input length when array exists", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(array, index) => {
				const result = update<number>(index)((n: number) => n * 2)(
					array,
				)
				return result.length === array.length
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("update - property: returns empty array for null/undefined", () => {
	fc.assert(
		fc.property(
			fc.integer(),
			(index) => {
				const resultNull = update<unknown>(index)((x: unknown) => x)(
					null,
				)
				const resultUndefined = update<unknown>(index)((x: unknown) =>
					x
				)(
					undefined,
				)

				return resultNull.length === 0 && resultUndefined.length === 0
			},
		),
		{ numRuns: 100 },
	)
})

Deno.test("update - property: only element at index changes for valid index", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1 }),
			(array) => {
				const index = Math.floor(Math.random() * array.length)
				const marker = Symbol("changed")
				const result = update(index)(() => marker)(array)

				// Check all elements
				for (let i = 0; i < array.length; i++) {
					if (i === index) {
						if (result[i] !== marker) return false
					} else {
						if (result[i] !== array[i]) return false
					}
				}
				return true
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("update - property: negative index equivalence", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 20 }),
			(array) => {
				const negIndex = -(Math.floor(Math.random() * array.length) + 1)
				const posIndex = array.length + negIndex

				const resultNeg = update<number>(negIndex)((n: number) =>
					n * 2
				)(array)
				const resultPos = update<number>(posIndex)((n: number) =>
					n * 2
				)(array)

				return resultNeg.length === resultPos.length &&
					resultNeg.every((v, i) => v === resultPos[i])
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("update - property: out of bounds returns copy of array", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.oneof(
				fc.integer({ max: -100 }),
				fc.integer({ min: 100 }),
			),
			(array, invalidIndex) => {
				const result = update<number>(invalidIndex)((n: number) =>
					n * 2
				)(array)

				// Should be a copy, not the same reference
				return result !== array &&
					result.length === array.length &&
					result.every((v, i) => v === array[i])
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("update - property: function receives correct value", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1 }),
			(array) => {
				const index = Math.floor(Math.random() * array.length)
				const expectedValue = array[index]
				let receivedValue: number | undefined

				update<number>(index)((value: number) => {
					receivedValue = value
					return value
				})(array)

				return receivedValue === expectedValue
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("update - property: immutability", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(array, index) => {
				const original = [...array]
				update<number>(index)((n: number) => n * 2)(array)

				// Original should be unchanged
				return array.length === original.length &&
					array.every((v, i) => v === original[i])
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("update - property: identity function returns equal array", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer({ min: -50, max: 50 }),
			(array, index) => {
				const result = update<number>(index)((x: number) => x)(array)

				return result.length === array.length &&
					result.every((v, i) => v === array[i])
			},
		),
		{ numRuns: 1000 },
	)
})
