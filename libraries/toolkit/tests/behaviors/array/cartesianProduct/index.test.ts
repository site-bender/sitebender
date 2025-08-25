import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import cartesianProduct from "../../../../src/simple/array/cartesianProduct/index.ts"

// JSDoc examples - basic functionality
Deno.test("cartesianProduct - basic Cartesian product", () => {
	assertEquals(cartesianProduct([1, 2])([3, 4]), [[1, 3], [1, 4], [2, 3], [2, 4]])
})

Deno.test("cartesianProduct - string combinations", () => {
	assertEquals(cartesianProduct(["a", "b"])(["x", "y", "z"]), [
		["a", "x"], ["a", "y"], ["a", "z"], ["b", "x"], ["b", "y"], ["b", "z"]
	])
})

Deno.test("cartesianProduct - single element arrays", () => {
	assertEquals(cartesianProduct([1])([2]), [[1, 2]])
})

Deno.test("cartesianProduct - generate coordinates", () => {
	assertEquals(cartesianProduct([0, 1, 2])([0, 1, 2]), [
		[0, 0], [0, 1], [0, 2],
		[1, 0], [1, 1], [1, 2],
		[2, 0], [2, 1], [2, 2]
	])
})

Deno.test("cartesianProduct - size and color combinations", () => {
	const sizes = ["S", "M", "L"]
	const colors = ["red", "blue"]
	assertEquals(cartesianProduct(sizes)(colors), [
		["S", "red"], ["S", "blue"],
		["M", "red"], ["M", "blue"],
		["L", "red"], ["L", "blue"]
	])
})

// JSDoc examples - practical applications
Deno.test("cartesianProduct - playing cards", () => {
	const ranks = ["A", "K", "Q", "J"]
	const suits = ["♠", "♥", "♦", "♣"]
	assertEquals(cartesianProduct(ranks)(suits), [
		["A", "♠"], ["A", "♥"], ["A", "♦"], ["A", "♣"],
		["K", "♠"], ["K", "♥"], ["K", "♦"], ["K", "♣"],
		["Q", "♠"], ["Q", "♥"], ["Q", "♦"], ["Q", "♣"],
		["J", "♠"], ["J", "♥"], ["J", "♦"], ["J", "♣"]
	])
})

// Empty array cases from JSDoc
Deno.test("cartesianProduct - empty first array", () => {
	assertEquals(cartesianProduct([])([1, 2, 3]), [])
})

Deno.test("cartesianProduct - empty second array", () => {
	assertEquals(cartesianProduct([1, 2, 3])([]), [])
})

Deno.test("cartesianProduct - both arrays empty", () => {
	assertEquals(cartesianProduct([])([]), [])
})

// Mixed types from JSDoc
Deno.test("cartesianProduct - mixed types", () => {
	assertEquals(cartesianProduct([1, 2])([true, false]), [
		[1, true], [1, false], [2, true], [2, false]
	])
})

Deno.test("cartesianProduct - object combinations", () => {
	const users = [{ id: 1 }, { id: 2 }]
	const roles = ["admin", "user"]
	assertEquals(cartesianProduct(users)(roles), [
		[{ id: 1 }, "admin"], [{ id: 1 }, "user"], 
		[{ id: 2 }, "admin"], [{ id: 2 }, "user"]
	])
})

// Grid generation from JSDoc
Deno.test("cartesianProduct - grid generation", () => {
	const rows = ["A", "B", "C"]
	const cols = [1, 2, 3, 4]
	const grid = cartesianProduct(rows)(cols).map(([r, c]) => `${r}${c}`)
	assertEquals(grid, [
		"A1", "A2", "A3", "A4", 
		"B1", "B2", "B3", "B4", 
		"C1", "C2", "C3", "C4"
	])
})

// Probability space from JSDoc
Deno.test("cartesianProduct - coin and die outcomes", () => {
	const coin = ["H", "T"]
	const die = [1, 2, 3, 4, 5, 6]
	const outcomes = cartesianProduct(coin)(die)
	assertEquals(outcomes.length, 12)
	assertEquals(outcomes[0], ["H", 1])
	assertEquals(outcomes[11], ["T", 6])
})

// Null/undefined handling from JSDoc
Deno.test("cartesianProduct - null first array", () => {
	assertEquals(cartesianProduct(null)([1, 2]), [])
})

Deno.test("cartesianProduct - undefined first array", () => {
	assertEquals(cartesianProduct(undefined)([1, 2]), [])
})

Deno.test("cartesianProduct - null second array", () => {
	assertEquals(cartesianProduct([1, 2])(null), [])
})

Deno.test("cartesianProduct - undefined second array", () => {
	assertEquals(cartesianProduct([1, 2])(undefined), [])
})

// Boolean truth table from JSDoc
Deno.test("cartesianProduct - boolean truth table", () => {
	const bools = [true, false]
	assertEquals(cartesianProduct(bools)(bools), [
		[true, true], [true, false], [false, true], [false, false]
	])
})

// Partial application from JSDoc
Deno.test("cartesianProduct - partial application", () => {
	const withColors = cartesianProduct(["red", "green", "blue"])
	
	assertEquals(withColors(["circle", "square"]), [
		["red", "circle"], ["red", "square"],
		["green", "circle"], ["green", "square"],
		["blue", "circle"], ["blue", "square"]
	])
	
	assertEquals(withColors(["small", "large"]), [
		["red", "small"], ["red", "large"],
		["green", "small"], ["green", "large"],
		["blue", "small"], ["blue", "large"]
	])
})

// Count verification from JSDoc
Deno.test("cartesianProduct - result count verification", () => {
	const a = [1, 2, 3, 4]
	const b = [5, 6, 7]
	const result = cartesianProduct(a)(b)
	assertEquals(result.length, 12) // 4 × 3
})

// Chess board from JSDoc (partial test)
Deno.test("cartesianProduct - chess board positions", () => {
	const files = ["a", "b", "c", "d", "e", "f", "g", "h"]
	const ranks = ["1", "2", "3", "4", "5", "6", "7", "8"]
	const squares = cartesianProduct(files)(ranks).map(([f, r]) => f + r)
	assertEquals(squares.length, 64)
	assertEquals(squares[0], "a1")
	assertEquals(squares[63], "h8")
})

// Additional edge cases
Deno.test("cartesianProduct - large arrays", () => {
	const arr1 = Array.from({ length: 100 }, (_, i) => i)
	const arr2 = Array.from({ length: 50 }, (_, i) => i)
	const result = cartesianProduct(arr1)(arr2)
	assertEquals(result.length, 5000)
	assertEquals(result[0], [0, 0])
	assertEquals(result[4999], [99, 49])
})

// Property-based tests
Deno.test("cartesianProduct property - result length is product of input lengths", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { maxLength: 100 }),
			fc.array(fc.integer(), { maxLength: 100 }),
			(arr1, arr2) => {
				const result = cartesianProduct(arr1)(arr2)
				return result.length === arr1.length * arr2.length
			}
		)
	)
})

Deno.test("cartesianProduct property - all position pairs are represented", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 20 }),
			fc.array(fc.integer(), { minLength: 1, maxLength: 20 }),
			(arr1, arr2) => {
				const result = cartesianProduct(arr1)(arr2)
				// Each position pair should be represented exactly once
				const expectedCount = arr1.length * arr2.length
				if (result.length !== expectedCount) return false
				
				// Check that each position is represented
				for (let i = 0; i < arr1.length; i++) {
					for (let j = 0; j < arr2.length; j++) {
						const expectedIndex = i * arr2.length + j
						if (result[expectedIndex][0] !== arr1[i] || 
						    result[expectedIndex][1] !== arr2[j]) {
							return false
						}
					}
				}
				return true
			}
		)
	)
})

Deno.test("cartesianProduct property - preserves order", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 10 }),
			fc.array(fc.integer(), { minLength: 1, maxLength: 10 }),
			(arr1, arr2) => {
				const result = cartesianProduct(arr1)(arr2)
				// Check that all pairs with first element arr1[0] come first
				const firstGroupSize = arr2.length
				const firstGroup = result.slice(0, firstGroupSize)
				return firstGroup.every(pair => pair[0] === arr1[0])
			}
		)
	)
})

Deno.test("cartesianProduct property - contains all expected pairs", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 10 }),
			fc.array(fc.integer(), { minLength: 1, maxLength: 10 }),
			(arr1, arr2) => {
				const result = cartesianProduct(arr1)(arr2)
				// Check that every combination exists
				for (const a of arr1) {
					for (const b of arr2) {
						const exists = result.some(pair => pair[0] === a && pair[1] === b)
						if (!exists) return false
					}
				}
				return true
			}
		)
	)
})

Deno.test("cartesianProduct property - empty array behavior", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			(arr) => {
				const withEmpty1 = cartesianProduct([])(arr)
				const withEmpty2 = cartesianProduct(arr)([])
				return withEmpty1.length === 0 && withEmpty2.length === 0
			}
		)
	)
})

// Type safety
Deno.test("cartesianProduct - maintains type safety", () => {
	const numbers: ReadonlyArray<number> = [1, 2]
	const strings: ReadonlyArray<string> = ["a", "b"]
	const result = cartesianProduct(numbers)(strings)
	assertEquals(result, [[1, "a"], [1, "b"], [2, "a"], [2, "b"]])
})

// Immutability
Deno.test("cartesianProduct - doesn't modify input arrays", () => {
	const arr1 = [1, 2, 3]
	const arr2 = ["a", "b"]
	const result = cartesianProduct(arr1)(arr2)
	assertEquals(arr1, [1, 2, 3])
	assertEquals(arr2, ["a", "b"])
	assertEquals(result.length, 6)
})

// Special values
Deno.test("cartesianProduct - handles NaN", () => {
	const result = cartesianProduct([1, NaN])([2, 3])
	assertEquals(result.length, 4)
	assertEquals(result[0], [1, 2])
	assertEquals(result[1], [1, 3])
	assertEquals(Number.isNaN(result[2][0]), true)
	assertEquals(result[2][1], 2)
	assertEquals(Number.isNaN(result[3][0]), true)
	assertEquals(result[3][1], 3)
})

Deno.test("cartesianProduct - handles Infinity", () => {
	assertEquals(cartesianProduct([Infinity, -Infinity])([1, 2]), [
		[Infinity, 1], [Infinity, 2], [-Infinity, 1], [-Infinity, 2]
	])
})

// Functions as elements
Deno.test("cartesianProduct - handles functions", () => {
	const add = (a: number, b: number) => a + b
	const mul = (a: number, b: number) => a * b
	const nums = [2, 3]
	const ops = [add, mul]
	const result = cartesianProduct(nums)(ops)
	assertEquals(result.length, 4)
	assertEquals(result[0][0], 2)
	assertEquals(result[0][1], add)
	assertEquals((result[0][1] as (a: number, b: number) => number)(result[0][0] as number, 5), 7) // 2 + 5
})