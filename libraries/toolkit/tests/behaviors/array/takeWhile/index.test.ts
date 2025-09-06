import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import * as fc from "npm:fast-check@3"

import takeWhile from "../../../../src/simple/array/takeWhile/index.ts"

Deno.test("takeWhile - takes elements from beginning while predicate is true", () => {
	const lessThan5 = takeWhile((x: number) => x < 5)
	assertEquals(lessThan5([1, 3, 5, 7, 2, 1]), [1, 3])
	assertEquals(lessThan5([2, 4, 6, 8]), [2, 4])
	assertEquals(lessThan5([5, 6, 7]), [])
	assertEquals(lessThan5([1, 2, 3, 4]), [1, 2, 3, 4])
})

Deno.test("takeWhile - takes even numbers from beginning", () => {
	const takeEven = takeWhile((x: number) => x % 2 === 0)
	assertEquals(takeEven([2, 4, 6, 7, 8]), [2, 4, 6])
	assertEquals(takeEven([1, 2, 3]), [])
	assertEquals(takeEven([2, 4, 6]), [2, 4, 6])
})

Deno.test("takeWhile - uses index parameter", () => {
	const takeAscending = takeWhile((
		x: number,
		i: number,
		arr: ReadonlyArray<number>,
	) => i === 0 || x > arr[i - 1])
	assertEquals(takeAscending([1, 2, 3, 2, 4, 5]), [1, 2, 3])
	assertEquals(takeAscending([5, 4, 3, 2, 1]), [5])
	assertEquals(takeAscending([1, 1, 2, 2, 3]), [1])
})

Deno.test("takeWhile - takes objects while property is true", () => {
	const items = [
		{ id: 1, active: true },
		{ id: 2, active: true },
		{ id: 3, active: false },
		{ id: 4, active: true },
	]
	const takeActive = takeWhile((item: { active: boolean }) => item.active)
	const result = takeActive(items)
	assertEquals(result, [{ id: 1, active: true }, { id: 2, active: true }])

	// Verify immutability
	assertEquals(items.length, 4)
})

Deno.test("takeWhile - handles edge cases", () => {
	const lessThan5 = takeWhile((x: number) => x < 5)

	// Empty array
	assertEquals(lessThan5([]), [])

	// No elements satisfy predicate
	assertEquals(lessThan5([10, 20, 30]), [])

	// All elements satisfy predicate
	assertEquals(lessThan5([1, 2, 3]), [1, 2, 3])

	// Single element
	assertEquals(lessThan5([4]), [4])
	assertEquals(lessThan5([5]), [])
})

Deno.test("takeWhile - handles null and undefined", () => {
	const lessThan5 = takeWhile((x: number) => x < 5)

	assertEquals(lessThan5(null), [])
	assertEquals(lessThan5(undefined), [])
})

Deno.test("takeWhile - passes array reference to predicate", () => {
	const originalArray = [1, 2, 3]
	let capturedArray: ReadonlyArray<number> | undefined

	const takeFn = takeWhile(
		(x: number, i: number, arr: ReadonlyArray<number>) => {
			capturedArray = arr
			return x < 3
		},
	)

	takeFn(originalArray)
	assertEquals(capturedArray, originalArray)
})

Deno.test("takeWhile - handles complex predicates", () => {
	// Take strings while they have 3 characters
	const takeShort = takeWhile((s: string) => s.length === 3)
	assertEquals(takeShort(["foo", "bar", "hello", "baz"]), ["foo", "bar"])
	assertEquals(takeShort(["hello", "foo", "bar"]), [])

	// Take numbers while positive
	const takePositive = takeWhile((n: number) => n > 0)
	assertEquals(takePositive([1, 2, 3, -1, 5]), [1, 2, 3])
	assertEquals(takePositive([-1, 2, 3]), [])
})

Deno.test("takeWhile - preserves type safety", () => {
	// Test with mixed types in array
	type Item = { value: number; label: string }
	const items: Array<Item> = [
		{ value: 1, label: "a" },
		{ value: 2, label: "b" },
		{ value: 3, label: "c" },
	]

	const takeLowValue = takeWhile((item: Item) => item.value < 3)
	const result = takeLowValue(items)

	assertEquals(result, [
		{ value: 1, label: "a" },
		{ value: 2, label: "b" },
	])
})

Deno.test("takeWhile - returns new array instance", () => {
	const original = [1, 2, 3]
	const takeAll = takeWhile((x: number) => x < 10)
	const result = takeAll(original)

	assertEquals(result, original)
	// Verify it's a new array instance, not the same reference
	assertEquals(result === original, false)
})

// Property-based tests
Deno.test("takeWhile - property: result is prefix of input", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.func(fc.boolean()),
			(arr, predicateFn) => {
				const predicate = (x: number) => predicateFn(x)
				const result = takeWhile(predicate)(arr)

				// Result should be a prefix of input
				for (let i = 0; i < result.length; i++) {
					assertEquals(result[i], arr[i])
				}

				return true
			},
		),
		{ numRuns: 100 },
	)
})

Deno.test("takeWhile - property: all taken elements satisfy predicate", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer({ min: -100, max: 100 }),
			(arr, threshold) => {
				const predicate = (x: number) => x < threshold
				const result = takeWhile(predicate)(arr)

				// All elements in result should satisfy predicate
				for (const element of result) {
					assertEquals(predicate(element), true)
				}

				return true
			},
		),
		{ numRuns: 100 },
	)
})

Deno.test("takeWhile - property: first rejected element should fail predicate", () => {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: 1, max: 100 }), { minLength: 1 }),
			fc.integer({ min: 1, max: 100 }),
			(arr, threshold) => {
				const predicate = (x: number) => x < threshold
				const result = takeWhile(predicate)(arr)

				// If result is shorter than input, the next element should fail predicate
				if (result.length < arr.length) {
					assertEquals(predicate(arr[result.length]), false)
				}

				return true
			},
		),
		{ numRuns: 100 },
	)
})

Deno.test("takeWhile - property: takeWhile with always-true returns whole array", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			(arr) => {
				const result = takeWhile(() => true)(arr)
				assertEquals(result, arr)
				return true
			},
		),
		{ numRuns: 100 },
	)
})

Deno.test("takeWhile - property: takeWhile with always-false returns empty", () => {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			(arr) => {
				const result = takeWhile(() => false)(arr)
				assertEquals(result, [])
				return true
			},
		),
		{ numRuns: 100 },
	)
})
