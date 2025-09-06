import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import filter from "../../../../../src/simple/array/filter/index.ts"

Deno.test("filter - JSDoc examples", async (t) => {
	await t.step("filter numbers greater than 2", () => {
		const result = filter((n: number) => n > 2)([1, 2, 3, 4])
		assertEquals(result, [3, 4])
	})

	await t.step("filter strings by length", () => {
		const result = filter((s: string) => s.length > 3)(["hi", "hello"])
		assertEquals(result, ["hello"])
	})

	await t.step("compose filters", () => {
		const keepPositive = filter((n: number) => n > 0)
		const keepEven = filter((n: number) => n % 2 === 0)
		const result = keepEven(keepPositive([-2, -1, 0, 1, 2, 3, 4]))
		assertEquals(result, [2, 4])
	})
})

Deno.test("filter - empty array returns empty array", () => {
	const result = filter((n: number) => n > 0)([])
	assertEquals(result, [])
})

Deno.test("filter - predicate that matches nothing returns empty", () => {
	const result = filter(() => false)([1, 2, 3, 4, 5])
	assertEquals(result, [])
})

Deno.test("filter - predicate that matches everything returns copy", () => {
	const original = [1, 2, 3, 4, 5]
	const result = filter(() => true)(original)
	assertEquals(result, original)
	assertEquals(result !== original, true) // Should be a new array
})

Deno.test("filter - property: preserves order", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.func(fc.boolean()),
			(array, predicate) => {
				const filtered = filter(predicate)(array)

				// Check that order is preserved
				let lastIndex = -1
				for (const item of filtered) {
					const currentIndex = array.indexOf(item, lastIndex + 1)
					if (currentIndex <= lastIndex) return false
					lastIndex = currentIndex
				}
				return true
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("filter - property: result is subset of original", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.func(fc.boolean()),
			(array, predicate) => {
				const filtered = filter(predicate)(array)

				// Every element in filtered must exist in original
				return filtered.every((item) => array.includes(item))
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("filter - property: length never exceeds original", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			fc.func(fc.boolean()),
			(array, predicate) => {
				const filtered = filter(predicate)(array)
				return filtered.length <= array.length
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("filter - property: idempotence with deterministic predicates", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(array) => {
				const isEven = (n: number) => n % 2 === 0
				const filtered1 = filter(isEven)(array)
				const filtered2 = filter(isEven)(filtered1)

				// Filtering twice with same predicate should give same result
				return JSON.stringify(filtered1) === JSON.stringify(filtered2)
			},
		),
		{ numRuns: 1000 },
	)
})

Deno.test("filter - property: distributive over concatenation", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.integer()),
			(array1, array2) => {
				const predicate = (n: number) => n > 0

				// filter(p)(a ++ b) === filter(p)(a) ++ filter(p)(b)
				const combined = [...array1, ...array2]
				const filteredCombined = filter(predicate)(combined)

				const filteredSeparate = [
					...filter(predicate)(array1),
					...filter(predicate)(array2),
				]

				return JSON.stringify(filteredCombined) ===
					JSON.stringify(filteredSeparate)
			},
		),
		{ numRuns: 500 },
	)
})

Deno.test("filter - currying behavior", () => {
	const isPositive = filter((n: number) => n > 0)
	const isEven = filter((n: number) => n % 2 === 0)

	// Same filter can be reused
	assertEquals(isPositive([1, -2, 3, -4]), [1, 3])
	assertEquals(isPositive([5, -6, 7, -8]), [5, 7])

	assertEquals(isEven([1, 2, 3, 4]), [2, 4])
	assertEquals(isEven([5, 6, 7, 8]), [6, 8])
})

Deno.test("filter - works with different types", () => {
	// Strings
	const longStrings = filter((s: string) => s.length > 3)
	assertEquals(longStrings(["a", "ab", "abc", "abcd"]), ["abcd"])

	// Objects
	interface Person {
		name: string
		age: number
	}
	const adults = filter((p: Person) => p.age >= 18)
	const people: Person[] = [
		{ name: "Alice", age: 17 },
		{ name: "Bob", age: 18 },
		{ name: "Charlie", age: 25 },
	]
	assertEquals(adults(people), [
		{ name: "Bob", age: 18 },
		{ name: "Charlie", age: 25 },
	])

	// Booleans
	const truthy = filter(Boolean)
	assertEquals(truthy([true, false, true, false]), [true, true])
	assertEquals(truthy([0, 1, "", "hello", null, undefined, 5]), [
		1,
		"hello",
		5,
	])
})

Deno.test("filter - practical examples", () => {
	// Remove falsy values
	const compact = filter(Boolean)
	assertEquals(
		compact([0, 1, false, 2, "", 3, null, undefined, 4]),
		[1, 2, 3, 4],
	)

	// Filter by property
	const hasId = filter((item: any) => item?.id != null)
	assertEquals(
		hasId([{ id: 1 }, { name: "test" }, { id: 2 }, null]),
		[{ id: 1 }, { id: 2 }],
	)

	// Range filtering
	const inRange = (min: number, max: number) =>
		filter((n: number) => n >= min && n <= max)
	const between10And20 = inRange(10, 20)
	assertEquals(between10And20([5, 10, 15, 20, 25]), [10, 15, 20])

	// Pattern matching
	const startsWithA = filter((s: string) => s.startsWith("A"))
	assertEquals(
		startsWithA(["Apple", "Banana", "Apricot", "Cherry"]),
		["Apple", "Apricot"],
	)
})

Deno.test("filter - edge cases", () => {
	// Undefined/null handling
	const notNull = filter((x: any) => x != null)
	assertEquals(notNull([1, null, 2, undefined, 3]), [1, 2, 3])

	// NaN handling
	const notNaN = filter((n: number) => !Number.isNaN(n))
	assertEquals(notNaN([1, NaN, 2, NaN, 3]), [1, 2, 3])

	// Empty strings
	const nonEmpty = filter((s: string) => s.length > 0)
	assertEquals(nonEmpty(["", "a", "", "b", ""]), ["a", "b"])
})

Deno.test("filter - maintains referential integrity", () => {
	const obj1 = { id: 1 }
	const obj2 = { id: 2 }
	const obj3 = { id: 3 }
	const array = [obj1, obj2, obj3]

	const filtered = filter((o: { id: number }) => o.id > 1)(array)

	// Same object references should be maintained
	assertEquals(filtered[0] === obj2, true)
	assertEquals(filtered[1] === obj3, true)
})
