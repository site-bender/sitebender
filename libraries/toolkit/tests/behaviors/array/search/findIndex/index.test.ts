import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import findIndex from "../../../../../src/simple/array/findIndex/index.ts"

// Test JSDoc examples
Deno.test("findIndex - JSDoc example 1: find index of first number greater than 2", () => {
	const result = findIndex((n: number) => n > 2)([1, 2, 3, 4])
	assertEquals(result, 2)
})

Deno.test("findIndex - JSDoc example 2: find index of string starting with 'h'", () => {
	const result = findIndex((s: string) => s.startsWith("h"))(["apple", "hello"])
	assertEquals(result, 1)
})

Deno.test("findIndex - JSDoc example 3: no match returns undefined", () => {
	const result = findIndex((n: number) => n > 10)([1, 2, 3])
	assertEquals(result, undefined)
})

Deno.test("findIndex - JSDoc example 4: curried to find admin user index", () => {
	interface User {
		name: string
		role: string
	}
	const users: Array<User> = [
		{ name: "Alice", role: "user" },
		{ name: "Bob", role: "admin" },
		{ name: "Charlie", role: "admin" }
	]
	const findAdminIndex = findIndex((user: User) => user.role === "admin")
	const result = findAdminIndex(users)
	assertEquals(result, 1) // First admin at index 1
})

// Edge cases
Deno.test("findIndex - empty array returns undefined", () => {
	const result = findIndex((n: number) => n > 0)([])
	assertEquals(result, undefined)
})

Deno.test("findIndex - single element that matches at index 0", () => {
	const result = findIndex((n: number) => n === 5)([5])
	assertEquals(result, 0)
})

Deno.test("findIndex - single element that doesn't match", () => {
	const result = findIndex((n: number) => n === 5)([3])
	assertEquals(result, undefined)
})

Deno.test("findIndex - finds first match index when multiple exist", () => {
	const result = findIndex((n: number) => n % 2 === 0)([1, 2, 3, 4, 5, 6])
	assertEquals(result, 1) // First even number at index 1
})

Deno.test("findIndex - predicate with index parameter", () => {
	const result = findIndex((n: number, i: number) => n === i * 2)([0, 2, 4, 6])
	assertEquals(result, 0) // Element 0 at index 0 equals 0 * 2
})

Deno.test("findIndex - predicate with array parameter", () => {
	const result = findIndex(
		(n: number, _i: number, arr: Array<number>) => n === arr.length
	)([1, 2, 3])
	assertEquals(result, 2) // Element 3 at index 2 equals array length
})

Deno.test("findIndex - works with different types - strings", () => {
	const result = findIndex((s: string) => s.length === 5)(["hi", "hello", "world", "test"])
	assertEquals(result, 1)
})

Deno.test("findIndex - works with different types - objects", () => {
	interface Product {
		id: number
		inStock: boolean
	}
	const products: Array<Product> = [
		{ id: 1, inStock: false },
		{ id: 2, inStock: true },
		{ id: 3, inStock: true }
	]
	const result = findIndex((p: Product) => p.inStock)(products)
	assertEquals(result, 1)
})

Deno.test("findIndex - short-circuits on first match", () => {
	let count = 0
	const predicate = (n: number): boolean => {
		count++
		return n > 2
	}
	findIndex(predicate)([1, 2, 3, 4, 5])
	assertEquals(count, 3) // Should stop at 3
})

Deno.test("findIndex - handles match at index 0", () => {
	const result = findIndex((n: number) => n === 0)([0, 1, 2])
	assertEquals(result, 0) // Should return 0, not undefined
})

// Property-based tests
Deno.test("findIndex - property: returns undefined for empty array", () => {
	fc.assert(
		fc.property(
			fc.func(fc.boolean()),
			(predicate) => {
				const result = findIndex(predicate)([])
				return result === undefined
			}
		)
	)
})

Deno.test("findIndex - property: result is valid array index if not undefined", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(arr) => {
				const predicate = (n: number) => n > 0
				const result = findIndex(predicate)(arr)
				
				if (result !== undefined) {
					return result >= 0 && result < arr.length && Number.isInteger(result)
				}
				return true
			}
		)
	)
})

Deno.test("findIndex - property: element at result index satisfies predicate", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(arr) => {
				const predicate = (n: number) => n > 0
				const result = findIndex(predicate)(arr)
				
				if (result !== undefined) {
					return predicate(arr[result]) === true
				}
				return true
			}
		)
	)
})

Deno.test("findIndex - property: no earlier index satisfies predicate", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(arr) => {
				const predicate = (n: number) => n > 50
				const result = findIndex(predicate)(arr)
				
				if (result !== undefined) {
					// Check all earlier indices don't satisfy predicate
					for (let i = 0; i < result; i++) {
						if (predicate(arr[i])) {
							return false
						}
					}
				}
				return true
			}
		)
	)
})

Deno.test("findIndex - property: if all elements satisfy, returns 0", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1 }),
			(arr) => {
				const alwaysTrue = (_: number) => true
				const result = findIndex(alwaysTrue)(arr)
				return result === 0
			}
		)
	)
})

Deno.test("findIndex - property: if no elements satisfy, returns undefined", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(arr) => {
				const alwaysFalse = (_: number) => false
				const result = findIndex(alwaysFalse)(arr)
				return result === undefined
			}
		)
	)
})

// Behavioral tests
Deno.test("findIndex - maintains referential transparency", () => {
	const predicate = (n: number) => n > 2
	const arr = [1, 2, 3, 4]
	const curried = findIndex(predicate)
	
	const result1 = curried(arr)
	const result2 = curried(arr)
	
	assertEquals(result1, result2)
})

Deno.test("findIndex - predicate can access all callback parameters", () => {
	const arr = [10, 20, 30]
	let capturedParams: Array<[number, number, Array<number>]> = []
	
	const predicate = (item: number, index: number, array: Array<number>) => {
		capturedParams.push([item, index, array])
		return item > 25
	}
	
	findIndex(predicate)(arr)
	
	assertEquals(capturedParams[0], [10, 0, arr])
	assertEquals(capturedParams[1], [20, 1, arr])
	assertEquals(capturedParams[2], [30, 2, arr])
})

Deno.test("findIndex - handles sparse arrays correctly", () => {
	const sparse: Array<number | undefined> = [1, , 3, , 5]
	const result = findIndex((n, i) => i === 1)(sparse)
	assertEquals(result, 1) // Index 1 exists even though value is undefined
})

Deno.test("findIndex - handles NaN values", () => {
	const result1 = findIndex((n: number) => Number.isNaN(n))([1, 2, NaN, 4])
	assertEquals(result1, 2)
	
	const result2 = findIndex((n: number) => Number.isNaN(n))([1, 2, 3, 4])
	assertEquals(result2, undefined)
})

Deno.test("findIndex - relationship with find", () => {
	const arr = [10, 20, 30, 40]
	const predicate = (n: number) => n > 25
	
	const index = findIndex(predicate)(arr)
	if (index !== undefined) {
		// Element at found index should match what find would return
		assertEquals(arr[index], 30)
	}
})

Deno.test("findIndex - handles complex predicates", () => {
	interface Item {
		value: number
		active: boolean
	}
	const items: Array<Item> = [
		{ value: 10, active: false },
		{ value: 20, active: true },
		{ value: 30, active: true },
		{ value: 40, active: false }
	]
	
	const result = findIndex((item: Item) => item.active && item.value > 25)(items)
	assertEquals(result, 2)
})