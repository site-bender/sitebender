import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import some from "../../../../../src/simple/array/some/index.ts"

// Test JSDoc examples
Deno.test("some - JSDoc example 1: has element greater than 2", () => {
	const result = some((n: number) => n > 2)([1, 2, 3])
	assertEquals(result, true)
})

Deno.test("some - JSDoc example 2: no negative numbers", () => {
	const result = some((n: number) => n < 0)([1, 2, 3])
	assertEquals(result, false)
})

Deno.test("some - JSDoc example 3: no strings longer than 5", () => {
	const result = some((s: string) => s.length > 5)(["hi", "hello", "world"])
	assertEquals(result, false)
})

Deno.test("some - JSDoc example 4: no even numbers", () => {
	const result = some((x: number) => x % 2 === 0)([1, 3, 5])
	assertEquals(result, false)
})

Deno.test("some - JSDoc example 5: curried check for negative - has negative", () => {
	const hasNegative = some((n: number) => n < 0)
	assertEquals(hasNegative([1, -2, 3]), true)
})

Deno.test("some - JSDoc example 6: curried check for negative - no negative", () => {
	const hasNegative = some((n: number) => n < 0)
	assertEquals(hasNegative([1, 2, 3]), false)
})

// Edge cases
Deno.test("some - empty array always returns false", () => {
	const result = some((n: number) => n > 0)([])
	assertEquals(result, false)
})

Deno.test("some - single element satisfies predicate", () => {
	const result = some((n: number) => n === 5)([5])
	assertEquals(result, true)
})

Deno.test("some - single element does not satisfy predicate", () => {
	const result = some((n: number) => n === 5)([3])
	assertEquals(result, false)
})

Deno.test("some - predicate with index parameter", () => {
	const result = some((n: number, i: number) => n === i * 2)([0, 2, 5, 6])
	assertEquals(result, true) // Element at index 1 is 2 (1 * 2)
})

Deno.test("some - predicate with array parameter", () => {
	const result = some((n: number, _i: number, arr: Array<number>) => n === arr.length)(
		[1, 2, 3]
	)
	assertEquals(result, true) // Element 3 equals array length 3
})

Deno.test("some - works with different types - strings", () => {
	const result = some((s: string) => s.startsWith("h"))(["apple", "hello", "world"])
	assertEquals(result, true)
})

Deno.test("some - works with different types - objects", () => {
	interface User {
		role: string
	}
	const users: Array<User> = [
		{ role: "user" },
		{ role: "admin" },
		{ role: "user" }
	]
	const result = some((u: User) => u.role === "admin")(users)
	assertEquals(result, true)
})

Deno.test("some - short-circuits on first true", () => {
	let count = 0
	const predicate = (n: number): boolean => {
		count++
		return n > 2
	}
	some(predicate)([1, 2, 3, 4, 5])
	assertEquals(count, 3) // Should stop at 3
})

// Property-based tests
Deno.test("some - property: empty array always returns false", () => {
	fc.assert(
		fc.property(
			fc.func(fc.boolean()),
			(predicate) => {
				const result = some(predicate)([])
				return result === false
			}
		)
	)
})

Deno.test("some - property: single element array matches predicate result", () => {
	fc.assert(
		fc.property(
			fc.integer(),
			(value) => {
				const predicateTrue = (_: number) => true
				const predicateFalse = (_: number) => false
				
				assertEquals(some(predicateTrue)([value]), true)
				assertEquals(some(predicateFalse)([value]), false)
			}
		)
	)
})

Deno.test("some - property: some(p) || some(q) === some(x => p(x) || q(x))", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(arr) => {
				const p = (n: number) => n % 2 === 0
				const q = (n: number) => n > 0
				const combined = (n: number) => p(n) || q(n)
				
				const result1 = some(p)(arr) || some(q)(arr)
				const result2 = some(combined)(arr)
				
				return result1 === result2
			}
		)
	)
})

Deno.test("some - property: relationship with all", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(arr) => {
				const predicate = (n: number) => n > 0
				const negatedPredicate = (n: number) => !predicate(n)
				
				// some(p) === !all(!p) for non-empty arrays
				if (arr.length > 0) {
					const someResult = some(predicate)(arr)
					const allResult = arr.every(negatedPredicate)
					return someResult === !allResult
				}
				return true
			}
		)
	)
})

Deno.test("some - property: if array contains value, some returns true", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(arr, value) => {
				if (arr.includes(value)) {
					return some((n: number) => n === value)(arr) === true
				}
				return true
			}
		)
	)
})

// Behavioral tests
Deno.test("some - maintains referential transparency", () => {
	const predicate = (n: number) => n > 2
	const arr = [1, 2, 3]
	const curried = some(predicate)
	
	const result1 = curried(arr)
	const result2 = curried(arr)
	
	assertEquals(result1, result2)
})

Deno.test("some - predicate can access all callback parameters", () => {
	const arr = [10, 20, 30]
	let capturedParams: Array<[number, number, Array<number>]> = []
	
	const predicate = (value: number, index: number, array: Array<number>) => {
		capturedParams.push([value, index, array])
		return value > 25
	}
	
	some(predicate)(arr)
	
	assertEquals(capturedParams[0], [10, 0, arr])
	assertEquals(capturedParams[1], [20, 1, arr])
	assertEquals(capturedParams[2], [30, 2, arr])
})

Deno.test("some - handles sparse arrays correctly", () => {
	const sparse: Array<number | undefined> = [, , 3, ,]
	const result = some((n) => n !== undefined)(sparse)
	assertEquals(result, true) // Has at least one defined element (3)
})

Deno.test("some - handles NaN values", () => {
	assertEquals(some((n: number) => Number.isNaN(n))([1, 2, NaN, 4]), true)
	assertEquals(some((n: number) => Number.isNaN(n))([1, 2, 3, 4]), false)
})

Deno.test("some - handles null and undefined in predicate", () => {
	const arr = [1, null, undefined, 4] as Array<number | null | undefined>
	assertEquals(some((n) => n == null)(arr), true)
	assertEquals(some((n) => n === undefined)([1, 2, 3]), false)
})

Deno.test("some - all elements satisfy implies some elements satisfy", () => {
	const predicate = (n: number) => n > 0
	const arr = [1, 2, 3, 4, 5]
	
	// If all elements satisfy, then some must also be true
	if (arr.every(predicate)) {
		assertEquals(some(predicate)(arr), true)
	}
})