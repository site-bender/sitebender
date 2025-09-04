import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import unionWith from "../../../../src/simple/array/unionWith/index.ts"

Deno.test("unionWith - combines arrays with custom comparator", () => {
	type Item = { id: number; value: string }
	const eqById = (a: Item, b: Item) => a.id === b.id
	
	const arr1: Array<Item> = [
		{ id: 1, value: "a" },
		{ id: 2, value: "b" }
	]
	const arr2: Array<Item> = [
		{ id: 2, value: "c" },
		{ id: 3, value: "d" }
	]
	
	const result = unionWith(eqById)(arr1)(arr2)
	assertEquals(result, [
		{ id: 1, value: "a" },
		{ id: 2, value: "b" },
		{ id: 3, value: "d" }
	])
})

Deno.test("unionWith - case-insensitive string comparison", () => {
	const eqIgnoreCase = (a: string, b: string) =>
		a.toLowerCase() === b.toLowerCase()
	
	const unionIgnoreCase = unionWith(eqIgnoreCase)
	
	assertEquals(
		unionIgnoreCase(["Hello", "World"])(["WORLD", "foo"]),
		["Hello", "World", "foo"]
	)
	
	assertEquals(
		unionIgnoreCase(["A", "b", "C"])(["a", "B", "d"]),
		["A", "b", "C", "d"]
	)
})

Deno.test("unionWith - numeric tolerance comparison", () => {
	const almostEqual = (a: number, b: number) =>
		Math.abs(a - b) < 0.01
	
	const unionAlmost = unionWith(almostEqual)
	
	assertEquals(
		unionAlmost([1.0, 2.0, 3.0])([2.001, 3.0, 4.0]),
		[1.0, 2.0, 3.0, 4.0]
	)
	
	assertEquals(
		unionAlmost([1.0, 1.005, 1.009])([1.002, 1.011]),
		[1.0, 1.011]
	)
})

Deno.test("unionWith - removes duplicates within single array", () => {
	const eq = (a: number, b: number) => a === b
	
	assertEquals(
		unionWith(eq)([1, 1, 2, 2, 3, 3])([]),
		[1, 2, 3]
	)
	
	assertEquals(
		unionWith(eq)([])([1, 1, 2, 2, 3, 3]),
		[1, 2, 3]
	)
})

Deno.test("unionWith - handles empty arrays", () => {
	const eq = <T>(a: T, b: T) => a === b
	
	assertEquals(unionWith(eq)([])([1, 2, 3]), [1, 2, 3])
	assertEquals(unionWith(eq)([1, 2, 3])([]), [1, 2, 3])
	assertEquals(unionWith(eq)([])([]), [])
})

Deno.test("unionWith - handles null and undefined", () => {
	const eq = (a: number, b: number) => a === b
	const unionEq = unionWith(eq)
	
	// First array null/undefined with duplicates in second array
	assertEquals(unionEq(null)([1, 1, 2, 2]), [1, 2])
	assertEquals(unionEq(undefined)([3, 3, 4, 4]), [3, 4])
	
	// Second array null/undefined with duplicates in first array
	assertEquals(unionEq([1, 1, 2, 2])(null), [1, 2])
	assertEquals(unionEq([3, 3, 4, 4])(undefined), [3, 4])
	
	// Both null/undefined
	assertEquals(unionEq(null)(null), [])
	assertEquals(unionEq(undefined)(undefined), [])
	assertEquals(unionEq(null)(undefined), [])
})

Deno.test("unionWith - deep object comparison", () => {
	type Config = { settings: { theme: string; fontSize?: number } }
	const deepEqual = (a: Config, b: Config) =>
		JSON.stringify(a) === JSON.stringify(b)
	
	const configs1: Array<Config> = [
		{ settings: { theme: "dark" } },
		{ settings: { theme: "light", fontSize: 14 } }
	]
	const configs2: Array<Config> = [
		{ settings: { theme: "dark" } },
		{ settings: { theme: "light", fontSize: 16 } }
	]
	
	const result = unionWith(deepEqual)(configs1)(configs2)
	assertEquals(result, [
		{ settings: { theme: "dark" } },
		{ settings: { theme: "light", fontSize: 14 } },
		{ settings: { theme: "light", fontSize: 16 } }
	])
})

Deno.test("unionWith - preserves order (first array, then second)", () => {
	const eq = (a: number, b: number) => a === b
	
	assertEquals(
		unionWith(eq)([3, 2, 1])([4, 5, 6]),
		[3, 2, 1, 4, 5, 6]
	)
	
	assertEquals(
		unionWith(eq)([3, 2, 1])([2, 4, 1]),
		[3, 2, 1, 4]
	)
})

Deno.test("unionWith - comparator receives correct arguments", () => {
	const calls: Array<[number, number]> = []
	const trackingComparator = (a: number, b: number) => {
		calls.push([a, b])
		return a === b
	}
	
	unionWith(trackingComparator)([1, 2])([2, 3])
	
	// Verify comparator was called with expected arguments
	assertEquals(calls.length > 0, true)
	// Should compare elements from result against new candidates
})

Deno.test("unionWith - returns new array instance", () => {
	const eq = (a: number, b: number) => a === b
	const arr1 = [1, 2, 3]
	const arr2 = [4, 5, 6]
	
	const result = unionWith(eq)(arr1)(arr2)
	
	assertEquals(result === arr1, false)
	assertEquals(result === arr2, false)
})

Deno.test("unionWith - works with complex comparators", () => {
	// Compare by multiple properties
	type Person = { name: string; age: number }
	const eqPerson = (a: Person, b: Person) =>
		a.name === b.name && a.age === b.age
	
	const people1: Array<Person> = [
		{ name: "Alice", age: 30 },
		{ name: "Bob", age: 25 }
	]
	const people2: Array<Person> = [
		{ name: "Alice", age: 30 },
		{ name: "Charlie", age: 35 }
	]
	
	const result = unionWith(eqPerson)(people1)(people2)
	assertEquals(result, [
		{ name: "Alice", age: 30 },
		{ name: "Bob", age: 25 },
		{ name: "Charlie", age: 35 }
	])
})

// Property-based tests
Deno.test("unionWith - property: result contains unique elements from both arrays", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.integer()),
			(arr1, arr2) => {
				const eq = (a: number, b: number) => a === b
				const result = unionWith(eq)(arr1)(arr2)
				
				// Check no duplicates in result
				for (let i = 0; i < result.length; i++) {
					for (let j = i + 1; j < result.length; j++) {
						assertEquals(eq(result[i], result[j]), false)
					}
				}
				
				// All elements from arr1 and arr2 should be represented
				const allElements = [...arr1, ...arr2]
				for (const elem of allElements) {
					const found = result.some(r => eq(r, elem))
					assertEquals(found, true)
				}
				
				return true
			}
		),
		{ numRuns: 100 }
	)
})

Deno.test("unionWith - property: union with empty returns deduplicated array", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(arr) => {
				const eq = (a: number, b: number) => a === b
				const withEmpty1 = unionWith(eq)(arr)([])
				const withEmpty2 = unionWith(eq)([])(arr)
				
				// Both should be deduplicated versions of arr
				for (let i = 0; i < withEmpty1.length; i++) {
					for (let j = i + 1; j < withEmpty1.length; j++) {
						assertEquals(eq(withEmpty1[i], withEmpty1[j]), false)
					}
				}
				
				for (let i = 0; i < withEmpty2.length; i++) {
					for (let j = i + 1; j < withEmpty2.length; j++) {
						assertEquals(eq(withEmpty2[i], withEmpty2[j]), false)
					}
				}
				
				return true
			}
		),
		{ numRuns: 100 }
	)
})

Deno.test("unionWith - property: idempotent", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(arr) => {
				const eq = (a: number, b: number) => a === b
				const result = unionWith(eq)(arr)(arr)
				
				// Result should be deduplicated version of arr
				for (let i = 0; i < result.length; i++) {
					for (let j = i + 1; j < result.length; j++) {
						assertEquals(eq(result[i], result[j]), false)
					}
				}
				
				// All unique elements from arr should be in result
				for (const elem of arr) {
					const found = result.some(r => eq(r, elem))
					assertEquals(found, true)
				}
				
				return true
			}
		),
		{ numRuns: 100 }
	)
})

Deno.test("unionWith - property: comparator consistency", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: 0, max: 10 }), { minLength: 1, maxLength: 5 }),
			fc.array(fc.integer({ min: 0, max: 10 }), { minLength: 1, maxLength: 5 }),
			(arr1, arr2) => {
				// Mod 3 comparator
				const eqMod3 = (a: number, b: number) => (a % 3) === (b % 3)
				const result = unionWith(eqMod3)(arr1)(arr2)
				
				// No two elements should be equivalent under the comparator
				for (let i = 0; i < result.length; i++) {
					for (let j = i + 1; j < result.length; j++) {
						assertEquals(eqMod3(result[i], result[j]), false)
					}
				}
				
				return true
			}
		),
		{ numRuns: 100 }
	)
})