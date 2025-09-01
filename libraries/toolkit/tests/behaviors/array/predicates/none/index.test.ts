import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import none from "../../../../../src/simple/array/none/index.ts"

// Test JSDoc examples
Deno.test("none - JSDoc example 1: no negative numbers", () => {
	const result = none((n: number) => n < 0)([1, 2, 3])
	assertEquals(result, true)
})

Deno.test("none - JSDoc example 2: some elements greater than 2", () => {
	const result = none((n: number) => n > 2)([1, 2, 3])
	assertEquals(result, false)
})

Deno.test("none - JSDoc example 3: empty array (vacuous truth)", () => {
	const result = none((n: number) => n > 0)([])
	assertEquals(result, true)
})

Deno.test("none - JSDoc example 4: curried for validation - no negatives", () => {
	const noNegatives = none((n: number) => n < 0)
	assertEquals(noNegatives([1, 2, 3]), true)
})

Deno.test("none - JSDoc example 5: curried for validation - has negative", () => {
	const noNegatives = none((n: number) => n < 0)
	assertEquals(noNegatives([1, -2, 3]), false)
})

Deno.test("none - JSDoc example 6: check no empty strings", () => {
	const noEmptyStrings = none((s: string) => s === "")
	assertEquals(noEmptyStrings(["hello", "world"]), true)
})

Deno.test("none - JSDoc example 7: null input", () => {
	assertEquals(none((x: number) => x > 0)(null), true)
})

Deno.test("none - JSDoc example 8: undefined input", () => {
	assertEquals(none((x: number) => x > 0)(undefined), true)
})

// Edge cases
Deno.test("none - non-array inputs", () => {
	assertEquals(none(() => true)("string" as any), true)
	assertEquals(none(() => true)(123 as any), true)
	assertEquals(none(() => true)({} as any), true)
	assertEquals(none(() => true)(true as any), true)
	assertEquals(none(() => true)((() => {}) as any), true)
	assertEquals(none(() => true)(new Map() as any), true)
	assertEquals(none(() => true)(new Set() as any), true)
})

Deno.test("none - single element does not satisfy predicate", () => {
	const result = none((n: number) => n === 5)([3])
	assertEquals(result, true)
})

Deno.test("none - single element satisfies predicate", () => {
	const result = none((n: number) => n === 5)([5])
	assertEquals(result, false)
})

Deno.test("none - predicate with index parameter", () => {
	const result = none((n: number, i: number) => n === i)([1, 0, 3, 4])
	assertEquals(result, true) // No element equals its index
})

Deno.test("none - predicate with array parameter", () => {
	const result = none((n: number, _i: number, arr: Array<number>) =>
		n > arr.length
	)(
		[0, 1, 2],
	)
	assertEquals(result, true) // No element is greater than array length (3)
})

Deno.test("none - works with different types - strings", () => {
	const result = none((s: string) => s.startsWith("x"))([
		"hello",
		"world",
		"test",
	])
	assertEquals(result, true)
})

Deno.test("none - works with different types - objects", () => {
	interface User {
		banned: boolean
	}
	const users: Array<User> = [
		{ banned: false },
		{ banned: false },
		{ banned: false },
	]
	const result = none((u: User) => u.banned)(users)
	assertEquals(result, true)
})

Deno.test("none - short-circuits on first true", () => {
	let count = 0
	const predicate = (n: number): boolean => {
		count++
		return n < 0
	}
	none(predicate)([1, 2, -3, 4, 5])
	assertEquals(count, 3) // Should stop at -3
})

// Property-based tests
Deno.test("none - property: empty array always returns true", () => {
	fc.assert(
		fc.property(
			fc.func(fc.boolean()),
			(predicate) => {
				const result = none(predicate)([])
				return result === true
			},
		),
	)
})

Deno.test("none - property: none(p) === !some(p)", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(arr) => {
				const predicate = (n: number) => n > 0

				const noneResult = none(predicate)(arr)
				const someResult = arr.some(predicate)

				return noneResult === !someResult
			},
		),
	)
})

Deno.test("none - property: none(p) === all(!p)", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(arr) => {
				const predicate = (n: number) => n > 0
				const negatedPredicate = (n: number) => !predicate(n)

				const noneResult = none(predicate)(arr)
				const allResult = arr.every(negatedPredicate)

				return noneResult === allResult
			},
		),
	)
})

Deno.test("none - property: De Morgan's law - none(p || q) === none(p) && none(q)", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(arr) => {
				const p = (n: number) => n % 2 === 0
				const q = (n: number) => n < 0
				const combined = (n: number) => p(n) || q(n)

				const result1 = none(combined)(arr)
				const result2 = none(p)(arr) && none(q)(arr)

				return result1 === result2
			},
		),
	)
})

Deno.test("none - property: if array doesn't contain value, none for equality is true", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: 0, max: 100 })),
			fc.integer({ min: 200, max: 300 }),
			(arr, value) => {
				// Value is guaranteed to not be in array due to range difference
				return none((n: number) => n === value)(arr) === true
			},
		),
	)
})

// Behavioral tests
Deno.test("none - maintains referential transparency", () => {
	const predicate = (n: number) => n < 0
	const arr = [1, 2, 3]
	const curried = none(predicate)

	const result1 = curried(arr)
	const result2 = curried(arr)

	assertEquals(result1, result2)
})

Deno.test("none - predicate can access all callback parameters", () => {
	const arr = [10, 20, 30]
	let capturedParams: Array<[number, number, Array<number>]> = []

	const predicate = (item: number, index: number, array: Array<number>) => {
		capturedParams.push([item, index, array])
		return item < 0
	}

	none(predicate)(arr)

	assertEquals(capturedParams[0], [10, 0, arr])
	assertEquals(capturedParams[1], [20, 1, arr])
	assertEquals(capturedParams[2], [30, 2, arr])
})

Deno.test("none - handles sparse arrays correctly", () => {
	const sparse: Array<number | undefined> = [1, , 3, ,]
	const result = none((n) => n === undefined)(sparse)
	// Note: JavaScript's some() skips empty slots in sparse arrays
	assertEquals(result, true) // Empty slots are skipped, not treated as undefined
})

Deno.test("none - handles NaN values", () => {
	assertEquals(none((n: number) => Number.isNaN(n))([1, 2, 3, 4]), true)
	assertEquals(none((n: number) => Number.isNaN(n))([1, 2, NaN, 4]), false)
})

Deno.test("none - handles null and undefined in predicate", () => {
	const arr = [1, 2, 3, 4] as Array<number | null | undefined>
	assertEquals(none((n) => n == null)(arr), true)

	const arrWithNull = [1, null, 3, 4] as Array<number | null | undefined>
	assertEquals(none((n) => n == null)(arrWithNull), false)
})

Deno.test("none - relationship with all and some", () => {
	const arr = [1, 2, 3, 4, 5]
	const impossiblePredicate = (n: number) => n < 0 && n > 0 // Always false

	// If none satisfy an impossible predicate, it should be true
	assertEquals(none(impossiblePredicate)(arr), true)

	// This should equal all returning true for the negation
	assertEquals(arr.every((n) => !impossiblePredicate(n)), true)
})
