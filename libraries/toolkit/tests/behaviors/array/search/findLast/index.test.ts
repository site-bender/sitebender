import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import findLast from "../../../../../src/simple/array/findLast/index.ts"

// Test JSDoc examples
Deno.test("findLast - JSDoc example 1: find last number greater than 2", () => {
	const result = findLast((n: number) => n > 2)([1, 3, 2, 4])
	assertEquals(result, 4)
})

Deno.test("findLast - JSDoc example 2: find last string starting with 'h'", () => {
	const result = findLast((s: string) => s.startsWith("h"))([
		"hello",
		"hi",
		"world",
	])
	assertEquals(result, "hi")
})

Deno.test("findLast - JSDoc example 3: no match returns undefined", () => {
	const result = findLast((n: number) => n > 10)([1, 2, 3])
	assertEquals(result, undefined)
})

Deno.test("findLast - JSDoc example 4: curried to find most recent error", () => {
	interface LogEntry {
		level: string
		message: string
	}
	const logs: Array<LogEntry> = [
		{ level: "info", message: "Started" },
		{ level: "error", message: "Connection failed" },
		{ level: "info", message: "Retrying" },
		{ level: "error", message: "Timeout" },
		{ level: "info", message: "Done" },
	]
	const findLastError = findLast((log: LogEntry) => log.level === "error")
	const result = findLastError(logs)
	assertEquals(result?.message, "Timeout") // Most recent error
})

// Edge cases
Deno.test("findLast - empty array returns undefined", () => {
	const result = findLast((n: number) => n > 0)([])
	assertEquals(result, undefined)
})

Deno.test("findLast - single element that matches", () => {
	const result = findLast((n: number) => n === 5)([5])
	assertEquals(result, 5)
})

Deno.test("findLast - single element that doesn't match", () => {
	const result = findLast((n: number) => n === 5)([3])
	assertEquals(result, undefined)
})

Deno.test("findLast - finds last match when multiple exist", () => {
	const result = findLast((n: number) => n % 2 === 0)([1, 2, 3, 4, 5, 6])
	assertEquals(result, 6) // Last even number
})

Deno.test("findLast - predicate with index parameter", () => {
	const result = findLast((n: number, i: number) => n === i)([0, 1, 2, 3])
	assertEquals(result, 3) // Last element where value equals index
})

Deno.test("findLast - predicate with array parameter", () => {
	const result = findLast(
		(n: number, _i: number, arr: Array<number>) => n < arr.length,
	)([5, 4, 3, 2, 1])
	assertEquals(result, 1) // Last element less than array length (5)
})

Deno.test("findLast - works with different types - strings", () => {
	const result = findLast((s: string) => s.length === 5)([
		"hi",
		"hello",
		"world",
		"test",
	])
	assertEquals(result, "world")
})

Deno.test("findLast - works with different types - objects", () => {
	interface Product {
		id: number
		inStock: boolean
	}
	const products: Array<Product> = [
		{ id: 1, inStock: true },
		{ id: 2, inStock: false },
		{ id: 3, inStock: true },
		{ id: 4, inStock: false },
	]
	const result = findLast((p: Product) => p.inStock)(products)
	assertEquals(result?.id, 3)
})

Deno.test("findLast - searches from end to start", () => {
	let searchOrder: Array<number> = []
	const predicate = (n: number): boolean => {
		searchOrder.push(n)
		return n === 2
	}
	findLast(predicate)([1, 2, 3, 4, 5])
	// Should search from end: 5, 4, 3, 2 (stops at 2)
	assertEquals(searchOrder, [5, 4, 3, 2])
})

Deno.test("findLast - handles falsy values correctly", () => {
	const result1 = findLast((n: number | null) => n === 0)([1, 0, 2, 0, 3])
	assertEquals(result1, 0)

	const result2 = findLast((n: number | null) => n === null)([
		1,
		null,
		2,
		null,
	])
	assertEquals(result2, null)

	const result3 = findLast((s: string) => s === "")([" ", "", "test", ""])
	assertEquals(result3, "")
})

// Property-based tests
Deno.test("findLast - property: returns undefined for empty array", () => {
	fc.assert(
		fc.property(
			fc.func(fc.boolean()),
			(predicate) => {
				const result = findLast(predicate)([])
				return result === undefined
			},
		),
	)
})

Deno.test("findLast - property: always returns last occurrence", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer(),
			(arr, target) => {
				const arrWithTarget = [target, ...arr, target] // Ensure at least two occurrences
				const result = findLast((n: number) => n === target)(
					arrWithTarget,
				)

				if (result !== undefined) {
					// Find the last index of the result
					const lastIndex = arrWithTarget.lastIndexOf(result)
					// Check no later element matches
					for (let i = lastIndex + 1; i < arrWithTarget.length; i++) {
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

Deno.test("findLast - property: result satisfies predicate if not undefined", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(arr) => {
				const predicate = (n: number) => n > 0
				const result = findLast(predicate)(arr)

				if (result !== undefined) {
					return predicate(result) === true
				}
				return true
			},
		),
	)
})

Deno.test("findLast - property: if all elements satisfy, returns last element", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1 }),
			(arr) => {
				const alwaysTrue = (_: number) => true
				const result = findLast(alwaysTrue)(arr)
				return result === arr[arr.length - 1]
			},
		),
	)
})

Deno.test("findLast - property: if no elements satisfy, returns undefined", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(arr) => {
				const alwaysFalse = (_: number) => false
				const result = findLast(alwaysFalse)(arr)
				return result === undefined
			},
		),
	)
})

// Behavioral tests
Deno.test("findLast - maintains referential transparency", () => {
	const predicate = (n: number) => n > 2
	const arr = [1, 3, 2, 4]
	const curried = findLast(predicate)

	const result1 = curried(arr)
	const result2 = curried(arr)

	assertEquals(result1, result2)
})

Deno.test("findLast - predicate can access all callback parameters", () => {
	const arr = [10, 20, 30]
	let capturedParams: Array<[number, number, Array<number>]> = []

	const predicate = (item: number, index: number, array: Array<number>) => {
		capturedParams.push([item, index, array])
		return item > 100 // Never matches
	}

	findLast(predicate)(arr)

	// Should capture in reverse order
	assertEquals(capturedParams[0], [30, 2, arr])
	assertEquals(capturedParams[1], [20, 1, arr])
	assertEquals(capturedParams[2], [10, 0, arr])
})

Deno.test("findLast - handles sparse arrays correctly", () => {
	const sparse: Array<number | undefined> = [1, , 3, , 5]
	const result = findLast((n) => n === undefined)(sparse)
	// JavaScript's findLast should handle sparse arrays
	assertEquals(result, undefined)
})

Deno.test("findLast - handles NaN values", () => {
	const result1 = findLast((n: number) => Number.isNaN(n))([
		1,
		NaN,
		2,
		NaN,
		3,
	])
	assertEquals(Number.isNaN(result1), true)

	const result2 = findLast((n: number) => Number.isNaN(n))([1, 2, 3, 4])
	assertEquals(result2, undefined)
})

Deno.test("findLast - handles complex predicates", () => {
	interface Item {
		value: number
		active: boolean
		timestamp: number
	}
	const items: Array<Item> = [
		{ value: 10, active: true, timestamp: 1 },
		{ value: 20, active: true, timestamp: 2 },
		{ value: 30, active: false, timestamp: 3 },
		{ value: 40, active: true, timestamp: 4 },
		{ value: 50, active: false, timestamp: 5 },
	]

	const result = findLast((item: Item) => item.active && item.value > 15)(
		items,
	)
	assertEquals(result?.value, 40) // Last active item with value > 15
})

Deno.test("findLast - difference from find", () => {
	const arr = [1, 2, 3, 2, 1]
	const predicate = (n: number) => n === 2

	// find returns first occurrence
	const firstMatch = arr.find(predicate)
	assertEquals(firstMatch, 2)

	// findLast returns last occurrence
	const lastMatch = findLast(predicate)(arr)
	assertEquals(lastMatch, 2)

	// They're at different indices
	assertEquals(arr.indexOf(2), 1)
	assertEquals(arr.lastIndexOf(2), 3)
})
