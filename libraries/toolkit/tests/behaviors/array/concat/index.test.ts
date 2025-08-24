import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import concat from "../../../../src/simple/array/concat/index.ts"

// Test all JSDoc examples
Deno.test("concat - basic concatenation", () => {
	const result = concat([1, 2])([3, 4])
	assertEquals(result, [1, 2, 3, 4])
})

Deno.test("concat - empty first array", () => {
	const result = concat([] as Array<number>)([1, 2])
	assertEquals(result, [1, 2])
})

Deno.test("concat - empty second array", () => {
	const result = concat([1, 2])([])
	assertEquals(result, [1, 2])
})

Deno.test("concat - partial application for prefixing", () => {
	const prependHeaders = concat([0, 0, 0])
	assertEquals(prependHeaders([1, 2, 3]), [0, 0, 0, 1, 2, 3])
	assertEquals(prependHeaders([4, 5]), [0, 0, 0, 4, 5])
})

// Additional tests
Deno.test("concat - both empty arrays", () => {
	const result = concat([])([])
	assertEquals(result, [])
})

Deno.test("concat - single element arrays", () => {
	const result = concat([1])([2])
	assertEquals(result, [1, 2])
})

Deno.test("concat - string arrays", () => {
	const result = concat(["hello", "world"])(["foo", "bar"])
	assertEquals(result, ["hello", "world", "foo", "bar"])
})

Deno.test("concat - mixed type arrays", () => {
	const result = concat([1, "two", true] as Array<any>)([null, undefined, { x: 1 }] as Array<any>)
	assertEquals(result, [1, "two", true, null, undefined, { x: 1 }])
})

Deno.test("concat - nested arrays", () => {
	const result = concat([[1, 2], [3]])([[4], [5, 6]])
	assertEquals(result, [[1, 2], [3], [4], [5, 6]])
})

Deno.test("concat - preserves sparse arrays", () => {
	const sparse1: Array<number | undefined> = [1, , 3] // eslint-disable-line no-sparse-arrays
	const sparse2: Array<number | undefined> = [4, , 6] // eslint-disable-line no-sparse-arrays
	const result = concat(sparse1)(sparse2)
	
	assertEquals(result[0], 1)
	assertEquals(result[1], undefined)
	assertEquals(result[2], 3)
	assertEquals(result[3], 4)
	assertEquals(result[4], undefined)
	assertEquals(result[5], 6)
	assertEquals(result.length, 6)
})

Deno.test("concat - with undefined and null values", () => {
	const result = concat([undefined, null, 0] as Array<any>)([false, "", NaN] as Array<any>)
	assertEquals(result[0], undefined)
	assertEquals(result[1], null)
	assertEquals(result[2], 0)
	assertEquals(result[3], false)
	assertEquals(result[4], "")
	assertEquals(Number.isNaN(result[5]), true)
})

Deno.test("concat - partial application for suffixing", () => {
	const appendFooters = (arr: Array<number>) => concat(arr)([99, 99, 99])
	assertEquals(appendFooters([1, 2, 3]), [1, 2, 3, 99, 99, 99])
	assertEquals(appendFooters([4, 5]), [4, 5, 99, 99, 99])
})

Deno.test("concat - chaining concatenations", () => {
	const result = concat(concat([1, 2])([3, 4]))([5, 6])
	assertEquals(result, [1, 2, 3, 4, 5, 6])
})

Deno.test("concat - with objects", () => {
	interface User {
		id: number
		name: string
	}
	
	const users1: Array<User> = [
		{ id: 1, name: "Alice" },
		{ id: 2, name: "Bob" }
	]
	
	const users2: Array<User> = [
		{ id: 3, name: "Charlie" },
		{ id: 4, name: "David" }
	]
	
	const result = concat(users1)(users2)
	assertEquals(result, [
		{ id: 1, name: "Alice" },
		{ id: 2, name: "Bob" },
		{ id: 3, name: "Charlie" },
		{ id: 4, name: "David" }
	])
})

Deno.test("concat - large arrays", () => {
	const large1 = Array.from({ length: 1000 }, (_, i) => i)
	const large2 = Array.from({ length: 1000 }, (_, i) => i + 1000)
	const result = concat(large1)(large2)
	
	assertEquals(result.length, 2000)
	assertEquals(result[0], 0)
	assertEquals(result[999], 999)
	assertEquals(result[1000], 1000)
	assertEquals(result[1999], 1999)
})

// Property-based tests
Deno.test("concat - associativity", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.integer()),
			fc.array(fc.integer()),
			(a, b, c) => {
				// (a concat b) concat c === a concat (b concat c)
				const left = concat(concat(a)(b))(c)
				const right = concat(a)(concat(b)(c))
				assertEquals(left, right)
			}
		)
	)
})

Deno.test("concat - identity element", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			(array) => {
				// [] is the identity element for concatenation
				const leftIdentity = concat([] as typeof array)(array)
				const rightIdentity = concat(array)([] as typeof array)
				
				assertEquals(leftIdentity, array)
				assertEquals(rightIdentity, array)
			}
		)
	)
})

Deno.test("concat - preserves total length", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			fc.array(fc.anything()),
			(first, second) => {
				const result = concat(first)(second)
				assertEquals(result.length, first.length + second.length)
			}
		)
	)
})

Deno.test("concat - preserves element order", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.integer()),
			(first, second) => {
				const result = concat(first)(second)
				
				// Check first array elements
				for (let i = 0; i < first.length; i++) {
					assertEquals(result[i], first[i])
				}
				
				// Check second array elements
				for (let i = 0; i < second.length; i++) {
					assertEquals(result[first.length + i], second[i])
				}
			}
		)
	)
})

Deno.test("concat - creates new array (immutability)", () => {
	const first = [1, 2, 3]
	const second = [4, 5, 6]
	const result = concat(first)(second)
	
	assertEquals(result, [1, 2, 3, 4, 5, 6])
	assertEquals(first, [1, 2, 3])  // First unchanged
	assertEquals(second, [4, 5, 6])  // Second unchanged
	assertEquals(first === result, false)  // Different reference
	assertEquals(second === result, false)  // Different reference
})

Deno.test("concat - respects currying", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.integer()),
			(first, second) => {
				const curriedConcat = concat(first)
				const result1 = curriedConcat(second)
				const result2 = concat(first)(second)
				
				assertEquals(result1, result2)
			}
		)
	)
})

Deno.test("concat - type safety", () => {
	// This is a compile-time test to ensure type safety
	const numbers = concat([1, 2, 3])([4, 5, 6])
	const _: Array<number> = numbers
	
	const strings = concat(["a", "b"])(["c", "d"])
	const __: Array<string> = strings
	
	// Mixed but consistent types
	const mixed = concat([1, "two", true])([3, "four", false])
	const ___: Array<number | string | boolean> = mixed
	
	assertEquals(true, true)  // Dummy assertion for the test
})