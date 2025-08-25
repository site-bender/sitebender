import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import all from "../../../../../src/simple/array/all/index.ts"

// Test JSDoc examples
Deno.test("all - JSDoc example 1: all positive numbers", () => {
	const result = all((n: number) => n > 0)([1, 2, 3])
	assertEquals(result, true)
})

Deno.test("all - JSDoc example 2: not all greater than 2", () => {
	const result = all((n: number) => n > 2)([1, 2, 3])
	assertEquals(result, false)
})

Deno.test("all - JSDoc example 3: empty array (vacuous truth)", () => {
	const result = all((n: number) => n > 0)([])
	assertEquals(result, true)
})

Deno.test("all - JSDoc example 4: curried for validation - all positive", () => {
	const allPositive = all((n: number) => n > 0)
	assertEquals(allPositive([1, 2, 3]), true)
})

Deno.test("all - JSDoc example 5: curried for validation - contains negative", () => {
	const allPositive = all((n: number) => n > 0)
	assertEquals(allPositive([1, -2, 3]), false)
})

// Edge cases
Deno.test("all - single element satisfies predicate", () => {
	const result = all((n: number) => n === 5)([5])
	assertEquals(result, true)
})

Deno.test("all - single element does not satisfy predicate", () => {
	const result = all((n: number) => n === 5)([3])
	assertEquals(result, false)
})

Deno.test("all - predicate with index parameter", () => {
	const result = all((n: number, i: number) => n === i)([0, 1, 2, 3])
	assertEquals(result, true)
})

Deno.test("all - predicate with array parameter", () => {
	const result = all((n: number, _i: number, arr: Array<number>) =>
		n < arr.length
	)(
		[0, 1, 2],
	)
	assertEquals(result, true)
})

Deno.test("all - works with different types - strings", () => {
	const result = all((s: string) => s.length > 2)(["hello", "world", "test"])
	assertEquals(result, true)
})

Deno.test("all - works with different types - objects", () => {
	interface User {
		active: boolean
	}
	const users: Array<User> = [{ active: true }, { active: true }, {
		active: true,
	}]
	const result = all((u: User) => u.active)(users)
	assertEquals(result, true)
})

Deno.test("all - short-circuits on first false", () => {
	let count = 0
	const predicate = (n: number): boolean => {
		count++
		return n > 0
	}
	all(predicate)([1, 2, -3, 4, 5])
	assertEquals(count, 3) // Should stop at -3
})

// Property-based tests
Deno.test("all - property: empty array always returns true", () => {
	fc.assert(
		fc.property(
			fc.func(fc.boolean()),
			(predicate) => {
				const result = all(predicate)([])
				return result === true
			},
		),
	)
})

Deno.test("all - property: single element array matches predicate result", () => {
	fc.assert(
		fc.property(
			fc.integer(),
			(value) => {
				const predicateTrue = (_: number) => true
				const predicateFalse = (_: number) => false

				assertEquals(all(predicateTrue)([value]), true)
				assertEquals(all(predicateFalse)([value]), false)
			},
		),
	)
})

Deno.test("all - property: all(p) && all(q) === all(x => p(x) && q(x))", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(arr) => {
				const p = (n: number) => n % 2 === 0
				const q = (n: number) => n > 0
				const combined = (n: number) => p(n) && q(n)

				const result1 = all(p)(arr) && all(q)(arr)
				const result2 = all(combined)(arr)

				return result1 === result2
			},
		),
	)
})

Deno.test("all - property: negation relationship with some", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(arr) => {
				const predicate = (n: number) => n > 0
				const negatedPredicate = (n: number) => !predicate(n)

				// all(p) === !some(!p) for non-empty arrays
				if (arr.length > 0) {
					const allResult = all(predicate)(arr)
					const someResult = arr.some(negatedPredicate)
					return allResult === !someResult
				}
				return true
			},
		),
	)
})

Deno.test("all - property: subset relationship", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: 1, max: 100 })),
			(arr) => {
				// If all elements > 50, then all elements > 0
				const strictPredicate = (n: number) => n > 50
				const loosePredicate = (n: number) => n > 0

				if (all(strictPredicate)(arr)) {
					return all(loosePredicate)(arr) === true
				}
				return true
			},
		),
	)
})

// Behavioral tests
Deno.test("all - maintains referential transparency", () => {
	const predicate = (n: number) => n > 0
	const arr = [1, 2, 3]
	const curried = all(predicate)

	const result1 = curried(arr)
	const result2 = curried(arr)

	assertEquals(result1, result2)
})

Deno.test("all - predicate can access all callback parameters", () => {
	const arr = [10, 20, 30]
	let capturedParams: Array<[number, number, Array<number>]> = []

	const predicate = (item: number, index: number, array: Array<number>) => {
		capturedParams.push([item, index, array])
		return item > 0
	}

	all(predicate)(arr)

	assertEquals(capturedParams[0], [10, 0, arr])
	assertEquals(capturedParams[1], [20, 1, arr])
	assertEquals(capturedParams[2], [30, 2, arr])
})

Deno.test("all - handles sparse arrays correctly", () => {
	const sparse: Array<number | undefined> = [1, , 3, , 5]
	const result = all((n) => n !== undefined)(sparse)
	// Note: JavaScript's every() skips empty slots in sparse arrays
	assertEquals(result, true) // Empty slots are skipped, not treated as undefined
})

Deno.test("all - handles NaN values", () => {
	assertEquals(all((n: number) => !Number.isNaN(n))([1, 2, NaN, 4]), false)
	assertEquals(all((n: number) => !Number.isNaN(n))([1, 2, 3, 4]), true)
})

Deno.test("all - handles null and undefined in predicate", () => {
	const arr = [1, null, undefined, 4] as Array<number | null | undefined>
	assertEquals(all((n) => n != null)(arr), false)
	assertEquals(all((n) => n !== undefined)([1, 2, 3]), true)
})
