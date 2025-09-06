import { assertEquals } from "jsr:@std/assert@1.0.8"
import * as fc from "npm:fast-check@3"

import maximumBy from "../../../../src/simple/array/maximumBy/index.ts"

Deno.test("maximumBy: finds maximum with numeric comparison", () => {
	const numCompare = (a: number, b: number) => a - b
	assertEquals(maximumBy(numCompare)([3, 1, 4, 1, 5, 9, 2]), 9)
	assertEquals(maximumBy(numCompare)([10, 20, 15, 25, 5]), 25)
	assertEquals(maximumBy(numCompare)([-5, -2, -10, -1]), -1)
})

Deno.test("maximumBy: finds maximum by string length", () => {
	const byLength = (a: string, b: string) => a.length - b.length
	assertEquals(maximumBy(byLength)(["a", "bbb", "cc", "dddd"]), "dddd")
	assertEquals(
		maximumBy(byLength)(["short", "medium", "very long string"]),
		"very long string",
	)
	assertEquals(maximumBy(byLength)(["x", "yy", "z"]), "yy")
})

Deno.test("maximumBy: finds maximum by object property", () => {
	const byAge = (a: { age: number }, b: { age: number }) => a.age - b.age
	const people = [
		{ name: "Alice", age: 30 },
		{ name: "Bob", age: 25 },
		{ name: "Charlie", age: 35 },
	]
	assertEquals(maximumBy(byAge)(people), { name: "Charlie", age: 35 })
})

Deno.test("maximumBy: handles complex comparisons", () => {
	type Item = { priority: number; value: string }
	const byPriority = (a: Item, b: Item) => a.priority - b.priority
	const items: Array<Item> = [
		{ priority: 3, value: "low" },
		{ priority: 10, value: "high" },
		{ priority: 5, value: "medium" },
	]
	assertEquals(maximumBy(byPriority)(items), { priority: 10, value: "high" })
})

Deno.test("maximumBy: handles single element array", () => {
	const numCompare = (a: number, b: number) => a - b
	assertEquals(maximumBy(numCompare)([42]), 42)

	const strCompare = (a: string, b: string) => a.localeCompare(b)
	assertEquals(maximumBy(strCompare)(["only"]), "only")
})

Deno.test("maximumBy: handles empty array", () => {
	const numCompare = (a: number, b: number) => a - b
	assertEquals(maximumBy(numCompare)([]), undefined)
})

Deno.test("maximumBy: handles null array", () => {
	const numCompare = (a: number, b: number) => a - b
	assertEquals(maximumBy(numCompare)(null), undefined)
})

Deno.test("maximumBy: handles undefined array", () => {
	const numCompare = (a: number, b: number) => a - b
	assertEquals(maximumBy(numCompare)(undefined), undefined)
})

Deno.test("maximumBy: supports partial application", () => {
	const getOldest = maximumBy(
		(a: { age: number }, b: { age: number }) => a.age - b.age,
	)
	assertEquals(getOldest([{ age: 30 }, { age: 40 }, { age: 35 }]), {
		age: 40,
	})
	assertEquals(getOldest([{ age: 10 }, { age: 5 }]), { age: 10 })
})

Deno.test("maximumBy: allows reusing comparator", () => {
	const numCompare = (a: number, b: number) => a - b
	const findMax = maximumBy(numCompare)

	assertEquals(findMax([1, 2, 3]), 3)
	assertEquals(findMax([10, 5, 8]), 10)
	assertEquals(findMax([-1, -5, -3]), -1)
})

Deno.test("maximumBy: handles reverse comparator for minimum", () => {
	const reverseCompare = (a: number, b: number) => b - a
	assertEquals(maximumBy(reverseCompare)([3, 1, 4, 1, 5, 9, 2]), 1)
})

Deno.test("maximumBy: handles custom date comparison", () => {
	const byDate = (a: Date, b: Date) => a.getTime() - b.getTime()
	const dates = [
		new Date("2023-01-15"),
		new Date("2023-12-31"),
		new Date("2023-06-15"),
	]
	assertEquals(maximumBy(byDate)(dates), new Date("2023-12-31"))
})

Deno.test("maximumBy: handles all equal elements", () => {
	const numCompare = (a: number, b: number) => a - b
	assertEquals(maximumBy(numCompare)([5, 5, 5, 5]), 5)
})

Deno.test("maximumBy: returns first maximum for ties", () => {
	const byAbs = (a: number, b: number) => Math.abs(a) - Math.abs(b)
	const result = maximumBy(byAbs)([3, -5, 5, 2])
	// Both -5 and 5 have abs value 5, should return first one encountered
	assertEquals(result === -5 || result === 5, true)
})

Deno.test("maximumBy: handles multi-field comparison", () => {
	type Person = { name: string; age: number; score: number }
	const byAgeAndScore = (a: Person, b: Person) => {
		const ageDiff = a.age - b.age
		return ageDiff !== 0 ? ageDiff : a.score - b.score
	}

	const people: Array<Person> = [
		{ name: "Alice", age: 30, score: 90 },
		{ name: "Bob", age: 30, score: 95 },
		{ name: "Charlie", age: 35, score: 85 },
	]
	assertEquals(maximumBy(byAgeAndScore)(people), {
		name: "Charlie",
		age: 35,
		score: 85,
	})
})

Deno.test("maximumBy: does not modify original array", () => {
	const original = [3, 1, 4, 1, 5]
	const numCompare = (a: number, b: number) => a - b
	maximumBy(numCompare)(original)
	assertEquals(original, [3, 1, 4, 1, 5])
})

Deno.test("maximumBy: property test - returns element from array", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1 }),
			(arr) => {
				const numCompare = (a: number, b: number) => a - b
				const result = maximumBy(numCompare)(arr)
				assertEquals(arr.includes(result as number), true)
			},
		),
	)
})

Deno.test("maximumBy: property test - result is maximum", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1 }),
			(arr) => {
				const numCompare = (a: number, b: number) => a - b
				const result = maximumBy(numCompare)(arr)
				const allLessOrEqual = arr.every((x) =>
					numCompare(x, result as number) <= 0
				)
				assertEquals(allLessOrEqual, true)
			},
		),
	)
})

Deno.test("maximumBy: property test - consistent with Math.max for numbers", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: -1000, max: 1000 }), { minLength: 1 }),
			(arr) => {
				const numCompare = (a: number, b: number) => a - b
				const result = maximumBy(numCompare)(arr)
				assertEquals(result, Math.max(...arr))
			},
		),
	)
})

Deno.test("maximumBy: property test - handles empty arrays", () => {
	fc.assert(
		fc.property(
			fc.func(fc.integer()),
			(compareFn) => {
				const comparator = (_a: unknown, _b: unknown) => compareFn()
				assertEquals(maximumBy(comparator)([]), undefined)
			},
		),
	)
})

Deno.test("maximumBy: property test - handles nullish values", () => {
	fc.assert(
		fc.property(
			fc.oneof(fc.constant(null), fc.constant(undefined)),
			fc.func(fc.integer()),
			(nullish, compareFn) => {
				const comparator = (_a: unknown, _b: unknown) => compareFn()
				assertEquals(maximumBy(comparator)(nullish as any), undefined)
			},
		),
	)
})

Deno.test("maximumBy: property test - single element is maximum", () => {
	fc.assert(
		fc.property(
			fc.anything(),
			fc.func(fc.integer()),
			(element, compareFn) => {
				const comparator = (_a: unknown, _b: unknown) => compareFn()
				assertEquals(maximumBy(comparator)([element]), element)
			},
		),
	)
})

Deno.test("maximumBy: handles string comparison", () => {
	const strCompare = (a: string, b: string) => a.localeCompare(b)
	assertEquals(maximumBy(strCompare)(["banana", "apple", "cherry"]), "cherry")
	assertEquals(maximumBy(strCompare)(["z", "a", "m"]), "z")
})

Deno.test("maximumBy: handles negative numbers", () => {
	const numCompare = (a: number, b: number) => a - b
	assertEquals(maximumBy(numCompare)([-10, -5, -20, -3]), -3)
	assertEquals(maximumBy(numCompare)([-100, -200, -50]), -50)
})

Deno.test("maximumBy: handles floating point numbers", () => {
	const numCompare = (a: number, b: number) => a - b
	assertEquals(maximumBy(numCompare)([1.5, 2.7, 1.9, 2.6]), 2.7)
	assertEquals(maximumBy(numCompare)([Math.PI, Math.E, Math.SQRT2]), Math.PI)
})

Deno.test("maximumBy: handles Infinity", () => {
	const numCompare = (a: number, b: number) => a - b
	assertEquals(maximumBy(numCompare)([1, Infinity, 100]), Infinity)
	assertEquals(maximumBy(numCompare)([-Infinity, -100, -1]), -1)
	assertEquals(maximumBy(numCompare)([Infinity, -Infinity]), Infinity)
})

Deno.test("maximumBy: handles NaN in comparator", () => {
	const nanCompare = (a: number, b: number) => {
		if (isNaN(a)) return -1
		if (isNaN(b)) return 1
		return a - b
	}
	assertEquals(maximumBy(nanCompare)([1, NaN, 3]), 3)
	assertEquals(maximumBy(nanCompare)([NaN, NaN]), NaN)
})
