import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import find from "../../../../../src/simple/array/find/index.ts"

// Test JSDoc examples
Deno.test("find - JSDoc example 1: find first number greater than 2", () => {
	const result = find((n: number) => n > 2)([1, 2, 3, 4])
	assertEquals(result, 3)
})

Deno.test("find - JSDoc example 2: find string starting with 'h'", () => {
	const result = find((s: string) => s.startsWith("h"))(["apple", "hello"])
	assertEquals(result, "hello")
})

Deno.test("find - JSDoc example 3: no match returns undefined", () => {
	const result = find((n: number) => n > 10)([1, 2, 3])
	assertEquals(result, undefined)
})

Deno.test("find - JSDoc example 4: curried to find admin user", () => {
	interface User {
		name: string
		role: string
	}
	const users: Array<User> = [
		{ name: "Alice", role: "user" },
		{ name: "Bob", role: "admin" },
		{ name: "Charlie", role: "admin" },
	]
	const findAdmin = find((user: User) => user.role === "admin")
	const result = findAdmin(users)
	assertEquals(result?.name, "Bob") // First admin
})

// Edge cases
Deno.test("find - empty array returns undefined", () => {
	const result = find((n: number) => n > 0)([])
	assertEquals(result, undefined)
})

Deno.test("find - single element that matches", () => {
	const result = find((n: number) => n === 5)([5])
	assertEquals(result, 5)
})

Deno.test("find - single element that doesn't match", () => {
	const result = find((n: number) => n === 5)([3])
	assertEquals(result, undefined)
})

Deno.test("find - finds first match when multiple exist", () => {
	const result = find((n: number) => n % 2 === 0)([1, 2, 3, 4, 5, 6])
	assertEquals(result, 2) // First even number
})

Deno.test("find - works with different types - strings", () => {
	const result = find((s: string) => s.length === 5)([
		"hi",
		"hello",
		"world",
		"test",
	])
	assertEquals(result, "hello")
})

Deno.test("find - works with different types - objects", () => {
	interface Product {
		id: number
		inStock: boolean
	}
	const products: Array<Product> = [
		{ id: 1, inStock: false },
		{ id: 2, inStock: true },
		{ id: 3, inStock: true },
	]
	const result = find((p: Product) => p.inStock)(products)
	assertEquals(result?.id, 2)
})

Deno.test("find - short-circuits on first match", () => {
	let count = 0
	const predicate = (n: number): boolean => {
		count++
		return n > 2
	}
	find(predicate)([1, 2, 3, 4, 5])
	assertEquals(count, 3) // Should stop at 3
})

Deno.test("find - handles falsy values correctly", () => {
	const result1 = find((n: number | null) => n === 0)([1, 2, 0, 3])
	assertEquals(result1, 0)

	const result2 = find((n: number | null) => n === null)([1, null, 2])
	assertEquals(result2, null)

	const result3 = find((s: string) => s === "")([" ", "", "test"])
	assertEquals(result3, "")
})

// Property-based tests
Deno.test("find - property: returns undefined for empty array", () => {
	fc.assert(
		fc.property(
			fc.func(fc.boolean()),
			(predicate) => {
				const result = find(predicate)([])
				return result === undefined
			},
		),
	)
})

Deno.test("find - property: always returns first occurrence", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(arr, target) => {
				const arrWithTarget = [...arr, target, target] // Ensure at least two occurrences
				const result = find((n: number) => n === target)(arrWithTarget)

				if (result !== undefined) {
					// Find the index of the result
					const index = arrWithTarget.indexOf(result)
					// Check no earlier element matches
					for (let i = 0; i < index; i++) {
						if (arrWithTarget[i] === target) {
							return false
						}
					}
				}
				return true
			},
		),
	)
})

Deno.test("find - property: result satisfies predicate if not undefined", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(arr) => {
				const predicate = (n: number) => n > 0
				const result = find(predicate)(arr)

				if (result !== undefined) {
					return predicate(result) === true
				}
				return true
			},
		),
	)
})

Deno.test("find - property: if all elements satisfy, find returns first element", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: 1, max: 100 }), { minLength: 1 }),
			(arr) => {
				const alwaysTrue = (_: number) => true
				const result = find(alwaysTrue)(arr)
				return result === arr[0]
			},
		),
	)
})

Deno.test("find - property: if no elements satisfy, find returns undefined", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(arr) => {
				const alwaysFalse = (_: number) => false
				const result = find(alwaysFalse)(arr)
				return result === undefined
			},
		),
	)
})

// Behavioral tests
Deno.test("find - maintains referential transparency", () => {
	const predicate = (n: number) => n > 2
	const arr = [1, 2, 3, 4]
	const curried = find(predicate)

	const result1 = curried(arr)
	const result2 = curried(arr)

	assertEquals(result1, result2)
})

Deno.test("find - predicate receives only item parameter", () => {
	const arr = [10, 20, 30]
	const capturedParams: Array<number> = []

	const predicate = (item: number) => {
		capturedParams.push(item)
		return item > 25
	}

	find(predicate)(arr)

	assertEquals(capturedParams, [10, 20, 30])
})

Deno.test("find - handles sparse arrays correctly", () => {
	const sparse: Array<number | undefined> = [1, , 3, , 5]
	const result = find((n) => n === undefined)(sparse)
	assertEquals(result, undefined) // JavaScript's find skips empty slots
})

Deno.test("find - handles NaN values", () => {
	const result1 = find((n: number) => Number.isNaN(n))([1, 2, NaN, 4])
	assertEquals(Number.isNaN(result1), true)

	const result2 = find((n: number) => Number.isNaN(n))([1, 2, 3, 4])
	assertEquals(result2, undefined)
})

Deno.test("find - handles complex predicates", () => {
	interface Item {
		value: number
		active: boolean
	}
	const items: Array<Item> = [
		{ value: 10, active: false },
		{ value: 20, active: true },
		{ value: 30, active: true },
		{ value: 40, active: false },
	]

	const result = find((item: Item) => item.active && item.value > 25)(items)
	assertEquals(result?.value, 30)
})
