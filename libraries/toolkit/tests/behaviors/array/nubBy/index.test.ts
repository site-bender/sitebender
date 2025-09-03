import { assertEquals } from "jsr:@std/assert@1.0.8"
import * as fc from "npm:fast-check@3"

import nubBy from "../../../../src/simple/array/nubBy/index.ts"

Deno.test("nubBy: removes duplicates with case-insensitive comparison", () => {
	const caseInsensitive = (a: string, b: string) =>
		a.toLowerCase() === b.toLowerCase()
	assertEquals(nubBy(caseInsensitive)(["Hello", "HELLO", "world"]), [
		"Hello",
		"world",
	])
	assertEquals(nubBy(caseInsensitive)(["Foo", "foo", "FOO", "bar"]), [
		"Foo",
		"bar",
	])
})

Deno.test("nubBy: deduplicates objects by property", () => {
	const byId = (a: { id: number }, b: { id: number }) => a.id === b.id
	const users = [
		{ id: 1, name: "Alice" },
		{ id: 2, name: "Bob" },
		{ id: 1, name: "Alicia" },
	]
	assertEquals(nubBy(byId)(users), [
		{ id: 1, name: "Alice" },
		{ id: 2, name: "Bob" },
	])
})

Deno.test("nubBy: handles numeric tolerance comparison", () => {
	const approxEqual = (a: number, b: number) => Math.abs(a - b) < 0.1
	assertEquals(nubBy(approxEqual)([1.0, 1.05, 1.5, 1.48, 2.0]), [1.0, 1.5, 2.0])
	assertEquals(nubBy(approxEqual)([0.1, 0.15, 0.2, 0.25]), [0.1, 0.2])
})

Deno.test("nubBy: preserves first occurrence order", () => {
	const byLength = (a: string, b: string) => a.length === b.length
	assertEquals(nubBy(byLength)(["a", "bb", "ccc", "dd", "e", "fff"]), [
		"a",
		"bb",
		"ccc",
	])
})

Deno.test("nubBy: handles always equal comparator", () => {
	const alwaysEqual = () => true
	assertEquals(nubBy(alwaysEqual)([1, 2, 3, 4, 5]), [1])
	assertEquals(nubBy(alwaysEqual)(["a", "b", "c"]), ["a"])
})

Deno.test("nubBy: handles never equal comparator", () => {
	const neverEqual = () => false
	assertEquals(nubBy(neverEqual)([1, 1, 1]), [1, 1, 1])
	assertEquals(nubBy(neverEqual)(["a", "a", "a"]), ["a", "a", "a"])
})

Deno.test("nubBy: handles empty array", () => {
	const equalityFn = (a: number, b: number) => a === b
	assertEquals(nubBy(equalityFn)([]), [])
})

Deno.test("nubBy: handles null array", () => {
	const equalityFn = (a: number, b: number) => a === b
	assertEquals(nubBy(equalityFn)(null), [])
})

Deno.test("nubBy: handles undefined array", () => {
	const equalityFn = (a: number, b: number) => a === b
	assertEquals(nubBy(equalityFn)(undefined), [])
})

Deno.test("nubBy: handles single element array", () => {
	const equalityFn = (a: number, b: number) => a === b
	assertEquals(nubBy(equalityFn)([42]), [42])
})

Deno.test("nubBy: handles array with no duplicates", () => {
	const equalityFn = (a: number, b: number) => a === b
	assertEquals(nubBy(equalityFn)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
})

Deno.test("nubBy: handles all same elements", () => {
	const equalityFn = (a: number, b: number) => a === b
	assertEquals(nubBy(equalityFn)([5, 5, 5, 5]), [5])
})

Deno.test("nubBy: supports partial application", () => {
	const dedupeCaseInsensitive = nubBy(
		(a: string, b: string) => a.toLowerCase() === b.toLowerCase(),
	)
	assertEquals(dedupeCaseInsensitive(["foo", "FOO", "bar"]), ["foo", "bar"])
	assertEquals(dedupeCaseInsensitive(["ABC", "abc", "def"]), ["ABC", "def"])
})

Deno.test("nubBy: allows reusing equality function", () => {
	const byFirstChar = (a: string, b: string) => a[0] === b[0]
	const dedupeByFirstChar = nubBy(byFirstChar)

	assertEquals(dedupeByFirstChar(["apple", "apricot", "banana"]), [
		"apple",
		"banana",
	])
	assertEquals(dedupeByFirstChar(["cat", "car", "dog", "door"]), ["cat", "dog"])
})

Deno.test("nubBy: handles complex object comparison", () => {
	type Person = { name: string; age: number; city: string }
	const byAgeAndCity = (a: Person, b: Person) =>
		a.age === b.age && a.city === b.city

	const people: Array<Person> = [
		{ name: "Alice", age: 30, city: "NYC" },
		{ name: "Bob", age: 30, city: "NYC" },
		{ name: "Charlie", age: 30, city: "LA" },
		{ name: "David", age: 25, city: "NYC" },
	]

	assertEquals(nubBy(byAgeAndCity)(people), [
		{ name: "Alice", age: 30, city: "NYC" },
		{ name: "Charlie", age: 30, city: "LA" },
		{ name: "David", age: 25, city: "NYC" },
	])
})

Deno.test("nubBy: handles modulo comparison", () => {
	const modEquals = (n: number) => (a: number, b: number) => a % n === b % n
	assertEquals(nubBy(modEquals(3))([1, 4, 7, 2, 5, 8, 3]), [1, 2, 3])
	assertEquals(nubBy(modEquals(2))([1, 3, 5, 2, 4, 6]), [1, 2])
})

Deno.test("nubBy: handles string prefix comparison", () => {
	const samePrefix = (len: number) => (a: string, b: string) =>
		a.substring(0, len) === b.substring(0, len)

	assertEquals(nubBy(samePrefix(2))(["hello", "help", "world", "worry"]), [
		"hello",
		"world",
	])
})

Deno.test("nubBy: does not modify original array", () => {
	const original = [1, 2, 2, 3, 3, 3]
	const equalityFn = (a: number, b: number) => a === b
	nubBy(equalityFn)(original)
	assertEquals(original, [1, 2, 2, 3, 3, 3])
})

Deno.test("nubBy: property test - result is subset of input", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.func(fc.boolean()),
			(arr, eqFn) => {
				const equalityFn = (_a: number, _b: number) => eqFn()
				const result = nubBy(equalityFn)(arr)
				const allInOriginal = result.every((item) => arr.includes(item))
				assertEquals(allInOriginal, true)
			},
		),
	)
})

Deno.test("nubBy: property test - preserves order of first occurrences", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(arr) => {
				const equalityFn = (a: number, b: number) => a === b
				const result = nubBy(equalityFn)(arr)

				// Check that order is preserved
				let lastIndex = -1
				for (const item of result) {
					const firstIndex = arr.indexOf(item)
					assertEquals(firstIndex > lastIndex, true)
					lastIndex = firstIndex
				}
			},
		),
	)
})

Deno.test("nubBy: property test - length never exceeds input length", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			fc.func(fc.boolean()),
			(arr, eqFn) => {
				const equalityFn = (_a: unknown, _b: unknown) => eqFn()
				const result = nubBy(equalityFn)(arr)
				assertEquals(result.length <= arr.length, true)
			},
		),
	)
})

Deno.test("nubBy: property test - always equal returns single element", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything(), { minLength: 1 }),
			(arr) => {
				const alwaysEqual = () => true
				const result = nubBy(alwaysEqual)(arr)
				assertEquals(result.length, 1)
				assertEquals(result[0], arr[0])
			},
		),
	)
})

Deno.test("nubBy: property test - never equal returns entire array", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			(arr) => {
				const neverEqual = () => false
				const result = nubBy(neverEqual)(arr)
				assertEquals(result, arr)
			},
		),
	)
})

Deno.test("nubBy: property test - handles empty arrays", () => {
	fc.assert(
		fc.property(
			fc.func(fc.boolean()),
			(eqFn) => {
				const equalityFn = (_a: unknown, _b: unknown) => eqFn()
				assertEquals(nubBy(equalityFn)([]), [])
			},
		),
	)
})

Deno.test("nubBy: property test - handles nullish values", () => {
	fc.assert(
		fc.property(
			fc.oneof(fc.constant(null), fc.constant(undefined)),
			fc.func(fc.boolean()),
			(nullish, eqFn) => {
				const equalityFn = (_a: unknown, _b: unknown) => eqFn()
				assertEquals(nubBy(equalityFn)(nullish as any), [])
			},
		),
	)
})

Deno.test("nubBy: handles date comparison by year", () => {
	const sameYear = (a: Date, b: Date) => a.getFullYear() === b.getFullYear()

	const dates = [
		new Date("2020-01-15"),
		new Date("2020-12-31"),
		new Date("2021-06-15"),
		new Date("2021-01-01"),
		new Date("2022-03-20"),
	]

	assertEquals(nubBy(sameYear)(dates), [
		new Date("2020-01-15"),
		new Date("2021-06-15"),
		new Date("2022-03-20"),
	])
})

Deno.test("nubBy: handles custom type comparison", () => {
	class Point {
		constructor(public x: number, public y: number) {}
	}

	const sameQuadrant = (a: Point, b: Point) =>
		Math.sign(a.x) === Math.sign(b.x) && Math.sign(a.y) === Math.sign(b.y)

	const points = [
		new Point(1, 1),
		new Point(2, 3),
		new Point(-1, 1),
		new Point(1, -1),
		new Point(-2, -3),
	]

	const result = nubBy(sameQuadrant)(points)
	assertEquals(result.length, 4)
	assertEquals(result[0], points[0]) // First quadrant
	assertEquals(result[1], points[2]) // Second quadrant
	assertEquals(result[2], points[3]) // Fourth quadrant
	assertEquals(result[3], points[4]) // Third quadrant
})
