import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import findLastIndex from "../../../../../toolkit/src/simple/array/findLastIndex/index.ts"

// Test JSDoc examples
Deno.test("findLastIndex - JSDoc example 1: findLastIndex((n: number) => n > 2)([1, 3, 2, 4])", () => {
	const result = findLastIndex((n: number) => n > 2)([1, 3, 2, 4])
	assertEquals(result, 3)
})

Deno.test("findLastIndex - JSDoc example 2: findLastIndex((s: string) => s.startsWith('h'))(['hello', 'hi', 'world'])", () => {
	const result = findLastIndex((s: string) => s.startsWith("h"))(["hello", "hi", "world"])
	assertEquals(result, 1)
})

Deno.test("findLastIndex - JSDoc example 3: findLastIndex((n: number) => n > 10)([1, 2, 3])", () => {
	const result = findLastIndex((n: number) => n > 10)([1, 2, 3])
	assertEquals(result, undefined)
})

// Edge cases
Deno.test("findLastIndex - empty array returns undefined", () => {
	const findLarge = findLastIndex((n: number) => n > 10)
	assertEquals(findLarge([]), undefined)
})

Deno.test("findLastIndex - no matching elements returns undefined", () => {
	const findNegative = findLastIndex((n: number) => n < 0)
	assertEquals(findNegative([1, 2, 3, 4, 5]), undefined)
})

Deno.test("findLastIndex - single matching element", () => {
	const findEven = findLastIndex((n: number) => n % 2 === 0)
	assertEquals(findEven([1, 2, 3]), 1)
	assertEquals(findEven([1, 3, 5, 7, 8]), 4)
})

Deno.test("findLastIndex - multiple matching elements returns last", () => {
	const findEven = findLastIndex((n: number) => n % 2 === 0)
	assertEquals(findEven([2, 4, 6, 8]), 3)
	assertEquals(findEven([1, 2, 3, 4, 5, 6]), 5)
})

Deno.test("findLastIndex - predicate receives correct arguments", () => {
	const indices: Array<number> = []
	const arrays: Array<Array<string>> = []
	const testArray = ["a", "b", "c"]
	
	findLastIndex((_item: string, index: number, array: Array<string>) => {
		indices.push(index)
		arrays.push(array)
		return false
	})(testArray)
	
	// Should iterate from end to start
	assertEquals(indices, [2, 1, 0])
	assertEquals(arrays[0], testArray)
	assertEquals(arrays[1], testArray)
	assertEquals(arrays[2], testArray)
})

Deno.test("findLastIndex - works with undefined values", () => {
	const findUndefined = findLastIndex((x: unknown) => x === undefined)
	assertEquals(findUndefined([1, undefined, 2, undefined]), 3)
	assertEquals(findUndefined([1, 2, 3]), undefined)
})

Deno.test("findLastIndex - works with null values", () => {
	const findNull = findLastIndex((x: unknown) => x === null)
	assertEquals(findNull([1, null, 2, null]), 3)
	assertEquals(findNull([1, 2, 3]), undefined)
})

Deno.test("findLastIndex - works with NaN", () => {
	const findNaN = findLastIndex((x: number) => Number.isNaN(x))
	assertEquals(findNaN([1, NaN, 2, NaN]), 3)
	assertEquals(findNaN([1, 2, 3]), undefined)
})

Deno.test("findLastIndex - works with sparse arrays", () => {
	const findUndefined = findLastIndex((x: unknown) => x === undefined)
	// deno-lint-ignore no-sparse-arrays
	const sparse = [1, , 3, , 5]
	assertEquals(findUndefined(sparse), 3)
})

Deno.test("findLastIndex - predicate with type guards", () => {
	const isString = (x: unknown): x is string => typeof x === "string"
	const findLastString = findLastIndex(isString)
	assertEquals(findLastString([1, "a", 2, "b", 3]), 3)
	assertEquals(findLastString([1, 2, 3]), undefined)
})

Deno.test("findLastIndex - works with objects", () => {
	const people = [
		{ name: "Alice", age: 30 },
		{ name: "Bob", age: 25 },
		{ name: "Charlie", age: 35 },
		{ name: "David", age: 25 }
	]
	const findLastYoung = findLastIndex((p: typeof people[0]) => p.age < 30)
	assertEquals(findLastYoung(people), 3) // David at index 3
})

Deno.test("findLastIndex - returns last index for always true predicate", () => {
	const alwaysTrue = findLastIndex(() => true)
	assertEquals(alwaysTrue([1, 2, 3]), 2)
	assertEquals(alwaysTrue(["a"]), 0)
})

Deno.test("findLastIndex - returns undefined for always false predicate", () => {
	const alwaysFalse = findLastIndex(() => false)
	assertEquals(alwaysFalse([1, 2, 3]), undefined)
	assertEquals(alwaysFalse(["a"]), undefined)
})

Deno.test("findLastIndex - element at beginning", () => {
	const findOne = findLastIndex((n: number) => n === 1)
	assertEquals(findOne([1, 2, 3]), 0)
})

Deno.test("findLastIndex - element at end", () => {
	const findThree = findLastIndex((n: number) => n === 3)
	assertEquals(findThree([1, 2, 3]), 2)
})

Deno.test("findLastIndex - with large arrays", () => {
	const arr = Array.from({ length: 10000 }, (_, i) => i)
	const findLarge = findLastIndex((n: number) => n > 9990)
	assertEquals(findLarge(arr), 9999)
})

// Property-based tests
Deno.test("findLastIndex - property: returns valid index when found", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(arr) => {
				if (arr.length === 0) return true
				const target = arr[Math.floor(Math.random() * arr.length)]
				const index = findLastIndex((x: number) => x === target)(arr)
				return index !== undefined && 
					   index >= 0 && 
					   index < arr.length &&
					   arr[index] === target
			}
		)
	)
})

Deno.test("findLastIndex - property: returns undefined when predicate never matches", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: 0, max: 100 })),
			(arr) => {
				const neverMatch = findLastIndex((n: number) => n < 0)
				return neverMatch(arr) === undefined
			}
		)
	)
})

Deno.test("findLastIndex - property: returns last matching index", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: 0, max: 10 })),
			fc.integer({ min: 0, max: 10 }),
			(arr, threshold) => {
				const index = findLastIndex((n: number) => n > threshold)(arr)
				if (index === undefined) {
					// No elements satisfy predicate
					return arr.every(n => n <= threshold)
				}
				// Check it's the last matching index
				for (let i = index + 1; i < arr.length; i++) {
					if (arr[i] > threshold) return false
				}
				return arr[index] > threshold
			}
		)
	)
})

Deno.test("findLastIndex - property: consistent with findIndex for unique matches", () => {
	fc.assert(
		fc.property(
			fc.uniqueArray(fc.integer()),
			fc.integer(),
			(arr, target) => {
				const predicate = (x: number) => x === target
				const lastIndex = findLastIndex(predicate)(arr)
				const firstIndex = arr.findIndex(predicate)
				
				if (firstIndex === -1) {
					return lastIndex === undefined
				}
				// In unique array, first and last should be the same
				return lastIndex === firstIndex
			}
		)
	)
})

Deno.test("findLastIndex - property: index >= 0 when found", () => {
	fc.assert(
		fc.property(
			fc.array(fc.string()),
			(arr) => {
				const index = findLastIndex((s: string) => s.length > 0)(arr.filter(s => s.length > 0).concat(["non-empty"]))
				return index !== undefined && index >= 0
			}
		)
	)
})

Deno.test("findLastIndex - handles null and undefined in predicate", () => {
	const arr = [1, null, 2, undefined, 3]
	
	const findLastNull = findLastIndex((x: unknown) => x === null)
	const findLastUndefined = findLastIndex((x: unknown) => x === undefined)
	const findLastNumber = findLastIndex((x: unknown) => typeof x === "number" && !Number.isNaN(x))
	
	assertEquals(findLastNull(arr), 1)
	assertEquals(findLastUndefined(arr), 3)
	assertEquals(findLastNumber(arr), 4)
})

Deno.test("findLastIndex - currying preserves behavior", () => {
	const predicate = (n: number) => n > 5
	const arr = [1, 6, 3, 8, 2]
	
	const curried = findLastIndex(predicate)
	const result1 = curried(arr)
	const result2 = findLastIndex(predicate)(arr)
	
	assertEquals(result1, result2)
	assertEquals(result1, 3) // index of 8
})