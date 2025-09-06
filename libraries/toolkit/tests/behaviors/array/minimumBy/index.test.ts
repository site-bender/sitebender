import { assertEquals } from "jsr:@std/assert@1.0.8"
import * as fc from "npm:fast-check@3"

import minimumBy from "../../../../src/simple/array/minimumBy/index.ts"

Deno.test("minimumBy: finds minimum with numeric comparison", () => {
	const numCompare = (a: number, b: number) => a - b
	assertEquals(minimumBy(numCompare)([3, 1, 4, 1, 5, 9, 2]), 1)
	assertEquals(minimumBy(numCompare)([10, 20, 15, 25, 5]), 5)
	assertEquals(minimumBy(numCompare)([-5, -2, -10, -1]), -10)
})

Deno.test("minimumBy: finds minimum by string length", () => {
	const byLength = (a: string, b: string) => a.length - b.length
	assertEquals(minimumBy(byLength)(["aaa", "b", "cc", "dddd"]), "b")
	assertEquals(
		minimumBy(byLength)(["short", "medium", "very long string"]),
		"short",
	)
	assertEquals(minimumBy(byLength)(["xxx", "yy", "zzzz"]), "yy")
})

Deno.test("minimumBy: finds minimum by object property", () => {
	const byAge = (a: { age: number }, b: { age: number }) => a.age - b.age
	const people = [
		{ name: "Alice", age: 30 },
		{ name: "Bob", age: 25 },
		{ name: "Charlie", age: 35 },
	]
	assertEquals(minimumBy(byAge)(people), { name: "Bob", age: 25 })
})

Deno.test("minimumBy: handles complex comparisons", () => {
	type Item = { priority: number; value: string }
	const byPriority = (a: Item, b: Item) => a.priority - b.priority
	const items: Array<Item> = [
		{ priority: 3, value: "low" },
		{ priority: 10, value: "high" },
		{ priority: 5, value: "medium" },
	]
	assertEquals(minimumBy(byPriority)(items), { priority: 3, value: "low" })
})

Deno.test("minimumBy: handles single element array", () => {
	const numCompare = (a: number, b: number) => a - b
	assertEquals(minimumBy(numCompare)([42]), 42)

	const strCompare = (a: string, b: string) => a.localeCompare(b)
	assertEquals(minimumBy(strCompare)(["only"]), "only")
})

Deno.test("minimumBy: handles empty array", () => {
	const numCompare = (a: number, b: number) => a - b
	assertEquals(minimumBy(numCompare)([]), undefined)
})

Deno.test("minimumBy: handles null array", () => {
	const numCompare = (a: number, b: number) => a - b
	assertEquals(minimumBy(numCompare)(null), undefined)
})

Deno.test("minimumBy: handles undefined array", () => {
	const numCompare = (a: number, b: number) => a - b
	assertEquals(minimumBy(numCompare)(undefined), undefined)
})

Deno.test("minimumBy: supports partial application", () => {
	const getYoungest = minimumBy(
		(a: { age: number }, b: { age: number }) => a.age - b.age,
	)
	assertEquals(getYoungest([{ age: 30 }, { age: 20 }, { age: 35 }]), {
		age: 20,
	})
	assertEquals(getYoungest([{ age: 10 }, { age: 5 }]), { age: 5 })
})

Deno.test("minimumBy: allows reusing comparator", () => {
	const numCompare = (a: number, b: number) => a - b
	const findMin = minimumBy(numCompare)

	assertEquals(findMin([1, 2, 3]), 1)
	assertEquals(findMin([10, 5, 8]), 5)
	assertEquals(findMin([-1, -5, -3]), -5)
})

Deno.test("minimumBy: handles reverse comparator for maximum", () => {
	const reverseCompare = (a: number, b: number) => b - a
	assertEquals(minimumBy(reverseCompare)([3, 1, 4, 1, 5, 9, 2]), 9)
})

Deno.test("minimumBy: handles custom date comparison", () => {
	const byDate = (a: Date, b: Date) => a.getTime() - b.getTime()
	const dates = [
		new Date("2023-01-15"),
		new Date("2023-12-31"),
		new Date("2023-06-15"),
	]
	assertEquals(minimumBy(byDate)(dates), new Date("2023-01-15"))
})

Deno.test("minimumBy: handles all equal elements", () => {
	const numCompare = (a: number, b: number) => a - b
	assertEquals(minimumBy(numCompare)([5, 5, 5, 5]), 5)
})

Deno.test("minimumBy: returns first minimum for ties", () => {
	const byAbs = (a: number, b: number) => Math.abs(a) - Math.abs(b)
	const result = minimumBy(byAbs)([5, -2, 2, 7])
	// Both -2 and 2 have abs value 2, should return first one encountered
	assertEquals(result === -2 || result === 2, true)
})

Deno.test("minimumBy: handles multi-field comparison", () => {
	type Person = { name: string; age: number; score: number }
	const byAgeAndScore = (a: Person, b: Person) => {
		const ageDiff = a.age - b.age
		return ageDiff !== 0 ? ageDiff : a.score - b.score
	}

	const people: Array<Person> = [
		{ name: "Alice", age: 30, score: 90 },
		{ name: "Bob", age: 25, score: 95 },
		{ name: "Charlie", age: 25, score: 85 },
	]
	assertEquals(minimumBy(byAgeAndScore)(people), {
		name: "Charlie",
		age: 25,
		score: 85,
	})
})

Deno.test("minimumBy: does not modify original array", () => {
	const original = [3, 1, 4, 1, 5]
	const numCompare = (a: number, b: number) => a - b
	minimumBy(numCompare)(original)
	assertEquals(original, [3, 1, 4, 1, 5])
})

Deno.test("minimumBy: property test - returns element from array", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1 }),
			(arr) => {
				const numCompare = (a: number, b: number) => a - b
				const result = minimumBy(numCompare)(arr)
				assertEquals(arr.includes(result as number), true)
			},
		),
	)
})

Deno.test("minimumBy: property test - result is minimum", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1 }),
			(arr) => {
				const numCompare = (a: number, b: number) => a - b
				const result = minimumBy(numCompare)(arr)
				const allGreaterOrEqual = arr.every((x) =>
					numCompare(x, result as number) >= 0
				)
				assertEquals(allGreaterOrEqual, true)
			},
		),
	)
})

Deno.test("minimumBy: property test - consistent with Math.min for numbers", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: -1000, max: 1000 }), { minLength: 1 }),
			(arr) => {
				const numCompare = (a: number, b: number) => a - b
				const result = minimumBy(numCompare)(arr)
				assertEquals(result, Math.min(...arr))
			},
		),
	)
})

Deno.test("minimumBy: property test - handles empty arrays", () => {
	fc.assert(
		fc.property(
			fc.func(fc.integer()),
			(compareFn) => {
				const comparator = (_a: unknown, _b: unknown) => compareFn()
				assertEquals(minimumBy(comparator)([]), undefined)
			},
		),
	)
})

Deno.test("minimumBy: property test - handles nullish values", () => {
	fc.assert(
		fc.property(
			fc.oneof(fc.constant(null), fc.constant(undefined)),
			fc.func(fc.integer()),
			(nullish, compareFn) => {
				const comparator = (_a: unknown, _b: unknown) => compareFn()
				assertEquals(minimumBy(comparator)(nullish as any), undefined)
			},
		),
	)
})

Deno.test("minimumBy: property test - single element is minimum", () => {
	fc.assert(
		fc.property(
			fc.anything(),
			fc.func(fc.integer()),
			(element, compareFn) => {
				const comparator = (_a: unknown, _b: unknown) => compareFn()
				assertEquals(minimumBy(comparator)([element]), element)
			},
		),
	)
})

Deno.test("minimumBy: property test - min and max are opposites", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1 }),
			(arr) => {
				const numCompare = (a: number, b: number) => a - b
				const reverseCompare = (a: number, b: number) => b - a

				const min = minimumBy(numCompare)(arr)
				const max = minimumBy(reverseCompare)(arr)

				// Min with reversed comparator should give max
				assertEquals(min, Math.min(...arr))
				assertEquals(max, Math.max(...arr))
			},
		),
	)
})

Deno.test("minimumBy: handles string comparison", () => {
	const strCompare = (a: string, b: string) => a.localeCompare(b)
	assertEquals(minimumBy(strCompare)(["banana", "apple", "cherry"]), "apple")
	assertEquals(minimumBy(strCompare)(["z", "a", "m"]), "a")
})

Deno.test("minimumBy: handles negative numbers", () => {
	const numCompare = (a: number, b: number) => a - b
	assertEquals(minimumBy(numCompare)([-10, -5, -20, -3]), -20)
	assertEquals(minimumBy(numCompare)([-100, -200, -50]), -200)
})

Deno.test("minimumBy: handles floating point numbers", () => {
	const numCompare = (a: number, b: number) => a - b
	assertEquals(minimumBy(numCompare)([1.5, 2.7, 1.9, 1.2]), 1.2)
	assertEquals(
		minimumBy(numCompare)([Math.PI, Math.E, Math.SQRT2]),
		Math.SQRT2,
	)
})

Deno.test("minimumBy: handles Infinity", () => {
	const numCompare = (a: number, b: number) => a - b
	assertEquals(minimumBy(numCompare)([1, -Infinity, 100]), -Infinity)
	assertEquals(minimumBy(numCompare)([Infinity, 100, 1000]), 100)
	assertEquals(minimumBy(numCompare)([Infinity, -Infinity]), -Infinity)
})

Deno.test("minimumBy: handles NaN in comparator", () => {
	const nanCompare = (a: number, b: number) => {
		if (isNaN(a)) return 1 // NaN is considered "greater"
		if (isNaN(b)) return -1 // So non-NaN is "less"
		return a - b
	}
	assertEquals(minimumBy(nanCompare)([1, NaN, 3]), 1)
	assertEquals(minimumBy(nanCompare)([NaN, NaN]), NaN)
})
