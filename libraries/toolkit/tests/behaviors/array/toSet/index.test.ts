import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import { assertType, Has } from "https://deno.land/std@0.218.0/testing/types.ts"
import * as fc from "npm:fast-check@3"

import toSet from "../../../../src/simple/array/toSet/index.ts"

Deno.test("toSet: basic conversion", () => {
	// Numbers
	const numbersSet = toSet([1, 2, 3, 2, 1])
	assertEquals(numbersSet.size, 3, "should have 3 unique numbers")
	assertEquals(Array.from(numbersSet), [1, 2, 3], "should preserve first occurrence order")

	// Strings
	const stringsSet = toSet(["a", "b", "a"])
	assertEquals(stringsSet.size, 2, "should have 2 unique strings")
	assertEquals(Array.from(stringsSet), ["a", "b"], "should preserve order")

	// Mixed types
	const mixedSet = toSet([1, "1", true, 1, "1", true])
	assertEquals(mixedSet.size, 3, "should distinguish between types")
	assertEquals(Array.from(mixedSet), [1, "1", true], "should preserve type order")
})

Deno.test("toSet: empty array", () => {
	const emptySet = toSet([])
	assertEquals(emptySet.size, 0, "should create empty Set from empty array")
	assertEquals(emptySet instanceof Set, true, "should be a Set instance")
})

Deno.test("toSet: single element", () => {
	const singleSet = toSet([42])
	assertEquals(singleSet.size, 1, "should have one element")
	assertEquals(singleSet.has(42), true, "should contain the element")
})

Deno.test("toSet: all unique elements", () => {
	const uniqueArray = [1, 2, 3, 4, 5]
	const uniqueSet = toSet(uniqueArray)
	assertEquals(uniqueSet.size, 5, "should preserve all unique elements")
	assertEquals(Array.from(uniqueSet), uniqueArray, "should maintain order")
})

Deno.test("toSet: all duplicate elements", () => {
	const dupSet = toSet([7, 7, 7, 7, 7])
	assertEquals(dupSet.size, 1, "should have only one unique element")
	assertEquals(Array.from(dupSet), [7], "should contain single value")
})

Deno.test("toSet: object reference equality", () => {
	const obj1 = { a: 1 }
	const obj2 = { a: 1 }
	const objSet = toSet([obj1, obj1, obj2])
	
	assertEquals(objSet.size, 2, "should have 2 objects (different references)")
	assertEquals(objSet.has(obj1), true, "should contain first object")
	assertEquals(objSet.has(obj2), true, "should contain second object")
	
	// Same reference appears only once
	const sameRef = toSet([obj1, obj1, obj1])
	assertEquals(sameRef.size, 1, "should dedupe same references")
})

Deno.test("toSet: array reference equality", () => {
	const arr1 = [1, 2]
	const arr2 = [1, 2]
	const arraySet = toSet([arr1, arr1, arr2, [1, 2]])
	
	assertEquals(arraySet.size, 3, "should have 3 arrays (different references)")
	assertEquals(arraySet.has(arr1), true, "should contain first array")
	assertEquals(arraySet.has(arr2), true, "should contain second array")
})

Deno.test("toSet: special values", () => {
	// NaN handling (SameValueZero equality)
	const nanSet = toSet([NaN, NaN, Number.NaN])
	assertEquals(nanSet.size, 1, "should treat all NaN as same value")
	assertEquals(nanSet.has(NaN), true, "should contain NaN")

	// +0 and -0 (SameValueZero treats them as equal)
	const zeroSet = toSet([0, -0, +0])
	assertEquals(zeroSet.size, 1, "should treat +0 and -0 as same")
	
	// Infinity values
	const infinitySet = toSet([Infinity, -Infinity, Infinity, -Infinity])
	assertEquals(infinitySet.size, 2, "should distinguish +/- Infinity")
	assertEquals(Array.from(infinitySet), [Infinity, -Infinity], "should preserve order")

	// null and undefined
	const nullishSet = toSet([null, undefined, null, undefined])
	assertEquals(nullishSet.size, 2, "should distinguish null and undefined")
	assertEquals(Array.from(nullishSet), [null, undefined], "should preserve order")
})

Deno.test("toSet: null and undefined input", () => {
	const nullSet = toSet(null)
	assertEquals(nullSet.size, 0, "should return empty Set for null")
	assertEquals(nullSet instanceof Set, true, "should be a Set instance")

	const undefinedSet = toSet(undefined)
	assertEquals(undefinedSet.size, 0, "should return empty Set for undefined")
	assertEquals(undefinedSet instanceof Set, true, "should be a Set instance")
})

Deno.test("toSet: boolean values", () => {
	const boolSet = toSet([true, false, true, false, true])
	assertEquals(boolSet.size, 2, "should have 2 boolean values")
	assertEquals(Array.from(boolSet), [true, false], "should preserve order")
})

Deno.test("toSet: symbols", () => {
	const sym1 = Symbol("test")
	const sym2 = Symbol("test")
	const sym3 = Symbol.for("global")
	const sym4 = Symbol.for("global")
	
	const symbolSet = toSet([sym1, sym1, sym2, sym3, sym4])
	assertEquals(symbolSet.size, 3, "should have 3 unique symbols")
	assertEquals(symbolSet.has(sym1), true, "should contain first symbol")
	assertEquals(symbolSet.has(sym2), true, "should contain second symbol")
	assertEquals(symbolSet.has(sym3), true, "should contain global symbol")
	// sym3 and sym4 are the same global symbol
})

Deno.test("toSet: dates", () => {
	const date1 = new Date("2024-01-01")
	const date2 = new Date("2024-01-01")
	const date3 = date1
	
	const dateSet = toSet([date1, date2, date3])
	assertEquals(dateSet.size, 2, "should have 2 date objects (different references)")
	assertEquals(dateSet.has(date1), true, "should contain first date")
	assertEquals(dateSet.has(date2), true, "should contain second date")
})

Deno.test("toSet: functions", () => {
	const fn1 = () => 1
	const fn2 = () => 1
	const fn3 = fn1
	
	const fnSet = toSet([fn1, fn2, fn3, fn1])
	assertEquals(fnSet.size, 2, "should have 2 function references")
	assertEquals(fnSet.has(fn1), true, "should contain first function")
	assertEquals(fnSet.has(fn2), true, "should contain second function")
})

Deno.test("toSet: large arrays", () => {
	const largeArray = Array.from({ length: 10000 }, (_, i) => i % 100)
	const largeSet = toSet(largeArray)
	
	assertEquals(largeSet.size, 100, "should have 100 unique values")
	assertEquals(largeSet.has(0), true, "should contain 0")
	assertEquals(largeSet.has(99), true, "should contain 99")
	assertEquals(largeSet.has(100), false, "should not contain 100")
})

Deno.test("toSet: preservation of insertion order", () => {
	const ordered = [5, 2, 8, 2, 1, 5, 9, 1, 3]
	const orderedSet = toSet(ordered)
	
	assertEquals(Array.from(orderedSet), [5, 2, 8, 1, 9, 3], "should preserve first occurrence order")
})

Deno.test("toSet: type inference", () => {
	const numberSet = toSet([1, 2, 3])
	assertType<Has<typeof numberSet, Set<number>>>(true)

	const stringSet = toSet(["a", "b", "c"])
	assertType<Has<typeof stringSet, Set<string>>>(true)

	type User = { id: number; name: string }
	const users: Array<User> = [
		{ id: 1, name: "Alice" },
		{ id: 2, name: "Bob" }
	]
	const userSet = toSet(users)
	assertType<Has<typeof userSet, Set<User>>>(true)

	// Mixed types
	const mixedSet = toSet([1, "two", true] as Array<number | string | boolean>)
	assertType<Has<typeof mixedSet, Set<number | string | boolean>>>(true)
})

Deno.test("toSet: property-based tests", () => {
	// Property: Set size <= array length
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			(arr) => {
				const set = toSet(arr)
				assertEquals(
					set.size <= arr.length,
					true,
					"Set size should not exceed array length"
				)
			}
		),
		{ numRuns: 100 }
	)

	// Property: All array elements are in the Set
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(arr) => {
				const set = toSet(arr)
				const allPresent = arr.every(item => set.has(item))
				assertEquals(allPresent, true, "All array elements should be in Set")
			}
		),
		{ numRuns: 100 }
	)

	// Property: Converting back to array preserves uniqueness
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: -100, max: 100 })),
			(arr) => {
				const set = toSet(arr)
				const backToArray = Array.from(set)
				const setAgain = toSet(backToArray)
				assertEquals(set.size, setAgain.size, "Size should be same after round-trip")
			}
		),
		{ numRuns: 100 }
	)

	// Property: Empty array produces empty Set
	fc.assert(
		fc.property(
			fc.constant([]),
			(arr) => {
				const set = toSet(arr)
				assertEquals(set.size, 0, "Empty array should produce empty Set")
			}
		),
		{ numRuns: 1 }
	)

	// Property: Single element array produces Set of size 1
	fc.assert(
		fc.property(
			fc.anything(),
			(element) => {
				const set = toSet([element])
				assertEquals(set.size, 1, "Single element array should produce Set of size 1")
				assertEquals(set.has(element), true, "Set should contain the element")
			}
		),
		{ numRuns: 100 }
	)

	// Property: Duplicate-only arrays produce Set of size 1
	fc.assert(
		fc.property(
			fc.anything(),
			fc.integer({ min: 1, max: 100 }),
			(element, count) => {
				const arr = Array(count).fill(element)
				const set = toSet(arr)
				assertEquals(set.size, 1, "All duplicates should produce Set of size 1")
				assertEquals(set.has(element), true, "Set should contain the element")
			}
		),
		{ numRuns: 100 }
	)
})

Deno.test("toSet: immutability", () => {
	const original = [1, 2, 3, 2, 1]
	const set = toSet(original)
	
	// Modifying the Set doesn't affect the array
	set.add(4)
	assertEquals(original, [1, 2, 3, 2, 1], "Original array should be unchanged")
	
	// Modifying the array doesn't affect the Set
	original.push(5)
	assertEquals(set.has(5), false, "Set should not have new array element")
	assertEquals(set.size, 4, "Set size should be unchanged (we added 4 earlier)")
})

Deno.test("toSet: practical use cases", () => {
	// Remove duplicates from array
	const duplicates = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
	const unique = Array.from(toSet(duplicates))
	assertEquals(unique, [1, 2, 3, 4], "should remove duplicates")

	// Check for uniqueness
	const hasUniqueValues = (arr: Array<any>) => toSet(arr).size === arr.length
	assertEquals(hasUniqueValues([1, 2, 3]), true, "should detect unique values")
	assertEquals(hasUniqueValues([1, 1, 2]), false, "should detect duplicates")

	// Count unique elements
	const countUnique = (arr: Array<any>) => toSet(arr).size
	assertEquals(countUnique(["a", "b", "a", "c", "b"]), 3, "should count unique strings")
	assertEquals(countUnique([]), 0, "should count zero for empty array")

	// Find common elements (intersection)
	const arr1 = [1, 2, 3, 4]
	const arr2 = [3, 4, 5, 6]
	const set2 = toSet(arr2)
	const common = arr1.filter(x => set2.has(x))
	assertEquals(common, [3, 4], "should find common elements")

	// Find unique elements (difference)
	const set1 = toSet(arr1)
	const uniqueToArr2 = arr2.filter(x => !set1.has(x))
	assertEquals(uniqueToArr2, [5, 6], "should find unique elements")
})