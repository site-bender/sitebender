import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import take from "../../../../src/simple/array/take/index.ts"

// Test all JSDoc examples
Deno.test("take - basic take", () => {
	const result = take(3)([1, 2, 3, 4, 5])
	assertEquals(result, [1, 2, 3])
})

Deno.test("take - take from strings", () => {
	const result = take(2)(["a", "b", "c"])
	assertEquals(result, ["a", "b"])
})

Deno.test("take - take zero elements", () => {
	const result = take(0)([1, 2, 3])
	assertEquals(result, [])
})

Deno.test("take - take more than available", () => {
	const result = take(10)([1, 2, 3])
	assertEquals(result, [1, 2, 3])
})

Deno.test("take - negative count", () => {
	const result = take(-1)([1, 2, 3])
	assertEquals(result, [])
})

Deno.test("take - pagination example", () => {
	const firstPage = take(20)
	const allResults = Array.from({ length: 100 }, (_, i) => i)
	const result = firstPage(allResults)
	assertEquals(result.length, 20)
	assertEquals(result[0], 0)
	assertEquals(result[19], 19)
})

// Additional tests
Deno.test("take - empty array", () => {
	const result = take(5)([])
	assertEquals(result, [])
})

Deno.test("take - single element", () => {
	const result = take(1)([42, 43, 44])
	assertEquals(result, [42])
})

Deno.test("take - exact array length", () => {
	const result = take(3)([1, 2, 3])
	assertEquals(result, [1, 2, 3])
})

Deno.test("take - negative values", () => {
	assertEquals(take(-10)([1, 2, 3]), [])
	assertEquals(take(-0)([1, 2, 3]), [])
})

Deno.test("take - with objects", () => {
	const users = [
		{ id: 1, name: "Alice" },
		{ id: 2, name: "Bob" },
		{ id: 3, name: "Charlie" }
	]
	
	const result = take(2)(users)
	assertEquals(result, [
		{ id: 1, name: "Alice" },
		{ id: 2, name: "Bob" }
	])
})

Deno.test("take - preserves sparse arrays", () => {
	const sparse: Array<number | undefined> = [1, , 3, , 5] // eslint-disable-line no-sparse-arrays
	const result = take(3)(sparse)
	
	assertEquals(result[0], 1)
	assertEquals(result[1], undefined)
	assertEquals(result[2], 3)
	assertEquals(result.length, 3)
})

Deno.test("take - with undefined and null", () => {
	const array = [undefined, null, 0, false, "", NaN]
	const result = take(4)(array)
	
	assertEquals(result[0], undefined)
	assertEquals(result[1], null)
	assertEquals(result[2], 0)
	assertEquals(result[3], false)
	assertEquals(result.length, 4)
})

Deno.test("take - partial application", () => {
	const takeThree = take(3)
	
	const numbers = [1, 2, 3, 4, 5]
	const strings = ["a", "b", "c", "d"]
	const booleans = [true, false, true, false]
	
	assertEquals(takeThree(numbers), [1, 2, 3])
	assertEquals(takeThree(strings), ["a", "b", "c"])
	assertEquals(takeThree(booleans), [true, false, true])
})

Deno.test("take - chaining takes", () => {
	const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	// Take 7, then take 3 from that
	const result = take(3)(take(7)(array))
	assertEquals(result, [1, 2, 3])
})

Deno.test("take - floating point count", () => {
	// JavaScript slice truncates float to integer
	const result = take(2.7)([1, 2, 3, 4, 5])
	assertEquals(result, [1, 2])
})

Deno.test("take - Infinity count", () => {
	const result = take(Infinity)([1, 2, 3])
	assertEquals(result, [1, 2, 3])
})

Deno.test("take - NaN count", () => {
	const result = take(NaN as any)([1, 2, 3])
	assertEquals(result, [])  // NaN > 0 is false
})

Deno.test("take - large arrays", () => {
	const large = Array.from({ length: 10000 }, (_, i) => i)
	const result = take(100)(large)
	
	assertEquals(result.length, 100)
	assertEquals(result[0], 0)
	assertEquals(result[99], 99)
})

// Property-based tests
Deno.test("take - never takes more than count", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			fc.integer({ min: 0, max: 100 }),
			(array, count) => {
				const result = take(count)(array)
				assertEquals(result.length <= count, true)
			}
		)
	)
})

Deno.test("take - never takes more than array length", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			fc.integer({ min: 0, max: 1000 }),
			(array, count) => {
				const result = take(count)(array)
				assertEquals(result.length <= array.length, true)
			}
		)
	)
})

Deno.test("take - takes minimum of count and array length", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.nat(),
			(array, count) => {
				const result = take(count)(array)
				const expected = Math.min(count, array.length)
				assertEquals(result.length, expected)
			}
		)
	)
})

Deno.test("take - preserves element order", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.nat(),
			(array, count) => {
				const result = take(count)(array)
				for (let i = 0; i < result.length; i++) {
					assertEquals(result[i], array[i])
				}
			}
		)
	)
})

Deno.test("take - idempotent when count >= length", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			(array) => {
				const count = array.length + 10
				const result1 = take(count)(array)
				const result2 = take(count)(result1)
				assertEquals(result1, result2)
			}
		)
	)
})

Deno.test("take - creates new array (immutability)", () => {
	const original = [1, 2, 3, 4, 5]
	const result = take(3)(original)
	
	assertEquals(result, [1, 2, 3])
	assertEquals(original, [1, 2, 3, 4, 5])  // Original unchanged
	assertEquals(original === result, false)  // Different reference
	
	// Even when taking all elements
	const fullTake = take(5)(original)
	assertEquals(fullTake, original)
	assertEquals(fullTake === original, false)  // Still different reference
})

Deno.test("take - respects currying", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.nat(),
			(array, count) => {
				const curriedTake = take(count)
				const result1 = curriedTake(array)
				const result2 = take(count)(array)
				
				assertEquals(result1, result2)
			}
		)
	)
})

Deno.test("take - preserves element identity", () => {
	const obj1 = { id: 1 }
	const obj2 = { id: 2 }
	const obj3 = { id: 3 }
	const array = [obj1, obj2, obj3]
	
	const result = take(2)(array)
	assertEquals(result[0] === obj1, true)  // Same reference
	assertEquals(result[1] === obj2, true)  // Same reference
})

Deno.test("take - type safety", () => {
	// This is a compile-time test to ensure type safety
	const numbers = take(3)([1, 2, 3, 4, 5])
	const _: Array<number> = numbers
	
	const strings = take(2)(["a", "b", "c"])
	const __: Array<string> = strings
	
	interface User {
		name: string
	}
	const users: Array<User> = [{ name: "Alice" }, { name: "Bob" }]
	const takenUsers = take(1)(users)
	const ___: Array<User> = takenUsers
	
	assertEquals(true, true)  // Dummy assertion for the test
})