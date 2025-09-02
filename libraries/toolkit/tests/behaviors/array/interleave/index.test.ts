import { assertEquals } from "jsr:@std/assert@1.0.8"
import * as fc from "npm:fast-check@3"

import interleave from "../../../../src/simple/array/interleave/index.ts"

Deno.test("interleave: alternates elements from two arrays", () => {
	assertEquals(
		interleave([1, 2, 3], ["a", "b", "c"]),
		[1, "a", 2, "b", 3, "c"]
	)
	assertEquals(
		interleave([true, false], [1, 2]),
		[true, 1, false, 2]
	)
})

Deno.test("interleave: handles arrays of different lengths", () => {
	// First array longer
	assertEquals(
		interleave([1, 2, 3, 4], ["a", "b"]),
		[1, "a", 2, "b", 3, 4]
	)
	
	// Second array longer
	assertEquals(
		interleave([1, 2], ["a", "b", "c", "d"]),
		[1, "a", 2, "b", "c", "d"]
	)
	
	// Very different lengths
	assertEquals(
		interleave([1], ["a", "b", "c", "d", "e"]),
		[1, "a", "b", "c", "d", "e"]
	)
})

Deno.test("interleave: handles three or more arrays", () => {
	// Three arrays
	assertEquals(
		interleave([1, 2], ["a", "b"], [true, false]),
		[1, "a", true, 2, "b", false]
	)
	
	// Four arrays
	assertEquals(
		interleave([1], ["a"], [true], ["x"]),
		[1, "a", true, "x"]
	)
	
	// Different lengths
	assertEquals(
		interleave([1, 2, 3], ["a"], [true, false]),
		[1, "a", true, 2, false, 3]
	)
})

Deno.test("interleave: handles empty arrays", () => {
	// All empty
	assertEquals(interleave([], [], []), [])
	
	// Some empty
	assertEquals(interleave([], [1], []), [1])
	assertEquals(interleave([1, 2], [], [3, 4]), [1, 3, 2, 4])
	
	// First empty
	assertEquals(interleave([], [1, 2, 3]), [1, 2, 3])
	
	// Last empty
	assertEquals(interleave([1, 2, 3], []), [1, 2, 3])
})

Deno.test("interleave: handles single array", () => {
	assertEquals(interleave([1, 2, 3]), [1, 2, 3])
	assertEquals(interleave(["a", "b", "c"]), ["a", "b", "c"])
	assertEquals(interleave([]), [])
})

Deno.test("interleave: handles no arrays", () => {
	assertEquals(interleave(), [])
})

Deno.test("interleave: handles null and undefined arrays", () => {
	// null arrays treated as empty
	assertEquals(interleave([1, 2], null, [3, 4]), [1, 3, 2, 4])
	assertEquals(interleave(null, [1, 2, 3]), [1, 2, 3])
	assertEquals(interleave([1, 2, 3], null), [1, 2, 3])
	
	// undefined arrays treated as empty  
	assertEquals(interleave([1, 2], undefined, [3, 4]), [1, 3, 2, 4])
	assertEquals(interleave(undefined, [1, 2, 3]), [1, 2, 3])
	assertEquals(interleave([1, 2, 3], undefined), [1, 2, 3])
	
	// All null/undefined
	assertEquals(interleave(null, undefined, null), [])
	assertEquals(interleave(null), [])
	assertEquals(interleave(undefined), [])
})

Deno.test("interleave: creates alternating patterns", () => {
	// Odds and evens
	const odds = [1, 3, 5, 7]
	const evens = [2, 4, 6, 8]
	assertEquals(interleave(odds, evens), [1, 2, 3, 4, 5, 6, 7, 8])
	
	// Letters and numbers
	const letters = ["a", "b", "c"]
	const numbers = [1, 2, 3]
	assertEquals(interleave(letters, numbers), ["a", 1, "b", 2, "c", 3])
})

Deno.test("interleave: preserves order within each array", () => {
	const arr1 = [1, 2, 3, 4, 5]
	const arr2 = ["a", "b", "c", "d", "e"]
	const result = interleave(arr1, arr2)
	
	// Extract elements from each original array
	const resultArr1 = result.filter((_, i) => i % 2 === 0)
	const resultArr2 = result.filter((_, i) => i % 2 === 1)
	
	assertEquals(resultArr1, arr1)
	assertEquals(resultArr2, arr2)
})

Deno.test("interleave: handles arrays with mixed types", () => {
	const mixed1 = [1, "two", 3, "four"]
	const mixed2 = [true, false, null, undefined]
	
	assertEquals(
		interleave(mixed1, mixed2),
		[1, true, "two", false, 3, null, "four", undefined]
	)
})

Deno.test("interleave: handles special values", () => {
	// NaN
	assertEquals(
		interleave([NaN, 1], [2, NaN]),
		[NaN, 2, 1, NaN]
	)
	
	// Infinity
	assertEquals(
		interleave([Infinity, -Infinity], [0, 1]),
		[Infinity, 0, -Infinity, 1]
	)
	
	// undefined and null as values (not arrays)
	assertEquals(
		interleave([undefined, null], [1, 2]),
		[undefined, 1, null, 2]
	)
})

Deno.test("interleave: handles arrays with objects", () => {
	const objs1 = [{ id: 1 }, { id: 2 }]
	const objs2 = [{ name: "a" }, { name: "b" }]
	
	const result = interleave(objs1, objs2)
	assertEquals(result, [
		{ id: 1 },
		{ name: "a" },
		{ id: 2 },
		{ name: "b" }
	])
	
	// Maintains references
	assertEquals(result[0] === objs1[0], true)
	assertEquals(result[1] === objs2[0], true)
})

Deno.test("interleave: property-based testing", () => {
	// Total length equals sum of input lengths
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.integer()),
			(arr1, arr2) => {
				const result = interleave(arr1, arr2)
				return result.length === arr1.length + arr2.length
			}
		)
	)
	
	// Contains all elements from all arrays
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.integer()),
			fc.array(fc.integer()),
			(arr1, arr2, arr3) => {
				const result = interleave(arr1, arr2, arr3)
				const allElements = [...arr1, ...arr2, ...arr3]
				// Check all elements are present (accounting for duplicates)
				return allElements.every(elem => 
					result.filter(r => r === elem).length >= 
					allElements.filter(e => e === elem).length
				)
			}
		)
	)
	
	// Single array returns same array
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			(arr) => {
				const result = interleave(arr)
				return result.length === arr.length &&
					result.every((elem, i) => elem === arr[i])
			}
		)
	)
	
	// Order preservation within arrays
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.string()),
			(arr1, arr2) => {
				const result = interleave(arr1, arr2)
				
				// Extract elements by type to check order
				const nums = result.filter(x => typeof x === "number")
				const strs = result.filter(x => typeof x === "string")
				
				// Check order is preserved
				return nums.every((n, i) => n === arr1[i]) &&
					strs.every((s, i) => s === arr2[i])
			}
		)
	)
})

Deno.test("interleave: large arrays performance", () => {
	// Create large arrays
	const arr1 = Array.from({ length: 1000 }, (_, i) => i)
	const arr2 = Array.from({ length: 1000 }, (_, i) => i + 1000)
	
	const result = interleave(arr1, arr2)
	
	// Check length
	assertEquals(result.length, 2000)
	
	// Check first few elements
	assertEquals(result.slice(0, 6), [0, 1000, 1, 1001, 2, 1002])
	
	// Check last few elements
	assertEquals(result.slice(-2), [999, 1999])
})

Deno.test("interleave: many arrays", () => {
	// 10 arrays with one element each
	const arrays = Array.from({ length: 10 }, (_, i) => [i])
	const result = interleave(...arrays)
	
	assertEquals(result, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
})

Deno.test("interleave: complex interleaving pattern", () => {
	const arr1 = [1, 2]
	const arr2 = ["a", "b", "c"]
	const arr3 = [true]
	const arr4 = [10, 20, 30, 40]
	
	const result = interleave(arr1, arr2, arr3, arr4)
	
	// First round: take one from each
	// Second round: only arr1, arr2, arr4 have elements
	// Third round: only arr2, arr4 have elements
	// Fourth round: only arr4 has elements
	assertEquals(result, [
		1, "a", true, 10,  // Round 1
		2, "b", 20,        // Round 2
		"c", 30,           // Round 3
		40                 // Round 4
	])
})