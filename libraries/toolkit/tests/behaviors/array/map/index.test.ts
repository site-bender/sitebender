import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import map from "../../../../src/simple/array/map/index.ts"

// Test all JSDoc examples
Deno.test("map - basic transformations", () => {
	const result = map((x: number) => x * 2)([1, 2, 3, 4])
	assertEquals(result, [2, 4, 6, 8])
})

Deno.test("map - string transformations", () => {
	const result = map((s: string) => s.toUpperCase())(["hello", "world"])
	assertEquals(result, ["HELLO", "WORLD"])
})

Deno.test("map - object property extraction", () => {
	const result = map((user: { name: string; age: number }) => user.name)([
		{ name: "Alice", age: 30 },
		{ name: "Bob", age: 25 }
	])
	assertEquals(result, ["Alice", "Bob"])
})

Deno.test("map - complex transformations", () => {
	const result = map((n: number) => ({ value: n, squared: n * n }))([1, 2, 3])
	assertEquals(result, [
		{ value: 1, squared: 1 }, 
		{ value: 2, squared: 4 }, 
		{ value: 3, squared: 9 }
	])
})

Deno.test("map - with index", () => {
	const result = map((x: number, i: number) => x + i)([10, 20, 30])
	assertEquals(result, [10, 21, 32])
})

Deno.test("map - chaining transformations", () => {
	const double = map((x: number) => x * 2)
	const addOne = map((x: number) => x + 1)
	const result = addOne(double([1, 2, 3]))
	assertEquals(result, [3, 5, 7])
})

Deno.test("map - type transformations", () => {
	const result = map((n: number) => n.toString())([1, 2, 3])
	assertEquals(result, ["1", "2", "3"])
})

Deno.test("map - parse strings to numbers", () => {
	const result = map((s: string) => parseInt(s, 10))(["1", "2", "3"])
	assertEquals(result, [1, 2, 3])
})

Deno.test("map - handle null gracefully", () => {
	const result = map((x: number) => x * 2)(null)
	assertEquals(result, [])
})

Deno.test("map - handle undefined gracefully", () => {
	const result = map((x: number) => x * 2)(undefined)
	assertEquals(result, [])
})

Deno.test("map - handle empty array", () => {
	const result = map((x: number) => x * 2)([])
	assertEquals(result, [])
})

Deno.test("map - partial application for reusable transformers", () => {
	const double = map((x: number) => x * 2)
	assertEquals(double([1, 2, 3]), [2, 4, 6])
	assertEquals(double([10, 20, 30]), [20, 40, 60])
})

Deno.test("map - partial application with objects", () => {
	const getName = map((obj: { name: string }) => obj.name)
	const result = getName([{ name: "Alice" }, { name: "Bob" }])
	assertEquals(result, ["Alice", "Bob"])
})

// Additional edge cases
Deno.test("map - preserves undefined in mapping", () => {
	const result = map((x: number | undefined) => x)([1, undefined, 3])
	assertEquals(result, [1, undefined, 3])
})

Deno.test("map - handles sparse arrays", () => {
	const sparse: Array<number | undefined> = [1, , 3] // eslint-disable-line no-sparse-arrays
	const result = map((x: number | undefined) => x === undefined ? undefined : x * 2)(sparse)
	assertEquals(result[0], 2)
	assertEquals(result[1], undefined)
	assertEquals(result[2], 6)
	assertEquals(result.length, 3)
})

Deno.test("map - receives full callback parameters", () => {
	const items: Array<number> = []
	const indices: Array<number> = []
	const arrays: Array<ReadonlyArray<number>> = []
	
	map((item: number, index: number, array: ReadonlyArray<number>) => {
		items.push(item)
		indices.push(index)
		arrays.push(array)
		return item
	})([10, 20, 30])
	
	assertEquals(items, [10, 20, 30])
	assertEquals(indices, [0, 1, 2])
	assertEquals(arrays, [[10, 20, 30], [10, 20, 30], [10, 20, 30]])
})

Deno.test("map - handles non-array values", () => {
	assertEquals(map((x: number) => x * 2)("not an array" as any), [])
	assertEquals(map((x: number) => x * 2)(123 as any), [])
	assertEquals(map((x: number) => x * 2)({} as any), [])
})

Deno.test("map - handles array-like objects", () => {
	const arrayLike = { 0: 1, 1: 2, 2: 3, length: 3 }
	const result = map((x: number) => x * 2)(arrayLike as any)
	assertEquals(result, [])  // Should return empty array for non-arrays
})

// Property-based tests
Deno.test("map - identity law", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			(array) => {
				const identity = <T>(x: T) => x
				const result = map(identity)(array)
				assertEquals(result, array)
			}
		)
	)
})

Deno.test("map - composition law", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(array) => {
				const f = (x: number) => x * 2
				const g = (x: number) => x + 1
				const composed = (x: number) => g(f(x))
				
				const result1 = map(g)(map(f)(array))
				const result2 = map(composed)(array)
				
				assertEquals(result1, result2)
			}
		)
	)
})

Deno.test("map - preserves array length", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			(array) => {
				// Use a transformation that won't throw on any input
				const result = map((x: any) => ({ mapped: x }))(array)
				assertEquals(result.length, array.length)
			}
		)
	)
})

Deno.test("map - respects currying", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(array) => {
				const fn = (x: number) => x * 2
				const curriedMap = map(fn)
				const result1 = curriedMap(array)
				const result2 = map(fn)(array)
				
				assertEquals(result1, result2)
			}
		)
	)
})

Deno.test("map - creates new array (immutability)", () => {
	const original = [1, 2, 3]
	const result = map((x: number) => x * 2)(original)
	
	assertEquals(result, [2, 4, 6])
	assertEquals(original, [1, 2, 3])  // Original unchanged
	assertEquals(original === result, false)  // Different references
})

Deno.test("map - handles functions that throw", () => {
	const throwingFn = (x: number) => {
		if (x === 2) throw new Error("test error")
		return x * 2
	}
	
	try {
		map(throwingFn)([1, 2, 3])
		assertEquals(true, false, "Should have thrown")
	} catch (e) {
		assertEquals((e as Error).message, "test error")
	}
})

Deno.test("map - handles NaN and Infinity", () => {
	const result = map((x: number) => x * 2)([NaN, Infinity, -Infinity])
	assertEquals(Number.isNaN(result[0]), true)
	assertEquals(result[1], Infinity)
	assertEquals(result[2], -Infinity)
})

Deno.test("map - type safety with complex transformations", () => {
	interface User {
		name: string
		age: number
	}
	
	interface UserView {
		display: string
		isAdult: boolean
	}
	
	const transform = (user: User): UserView => ({
		display: `${user.name} (${user.age})`,
		isAdult: user.age >= 18
	})
	
	const users: Array<User> = [
		{ name: "Alice", age: 25 },
		{ name: "Bob", age: 17 }
	]
	
	const result = map(transform)(users)
	
	assertEquals(result, [
		{ display: "Alice (25)", isAdult: true },
		{ display: "Bob (17)", isAdult: false }
	])
})