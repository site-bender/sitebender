import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import { assertType, Has } from "https://deno.land/std@0.218.0/testing/types.ts"
import * as fc from "npm:fast-check@3"

import takeLastWhile from "../../../../src/simple/array/takeLastWhile/index.ts"

Deno.test("takeLastWhile: basic functionality", () => {
	// Simple numeric predicates
	assertEquals(
		takeLastWhile((x: number) => x > 3)([1, 2, 5, 4, 6, 7]),
		[5, 4, 6, 7],
		"should take trailing elements greater than 3",
	)

	assertEquals(
		takeLastWhile((x: number) => x < 5)([1, 2, 3, 4, 5, 6]),
		[],
		"should return empty when last element doesn't match",
	)

	assertEquals(
		takeLastWhile((x: number) => x % 2 === 0)([1, 3, 2, 4, 6]),
		[2, 4, 6],
		"should take trailing even numbers",
	)
})

Deno.test("takeLastWhile: truthy/falsy predicates", () => {
	assertEquals(
		takeLastWhile(Boolean)([1, 2, 0, 3, 4, 5]),
		[3, 4, 5],
		"should take trailing truthy values",
	)

	assertEquals(
		takeLastWhile(Boolean)([0, false, null, undefined, "", NaN]),
		[],
		"should return empty for all falsy values",
	)

	assertEquals(
		takeLastWhile(Boolean)([0, 1, 2, 3]),
		[1, 2, 3],
		"should stop at first falsy value from end",
	)
})

Deno.test("takeLastWhile: string predicates", () => {
	const tags = ["<div>", "<p>", "text", "</p>", "</div>"]
	assertEquals(
		takeLastWhile((tag: string) => tag.startsWith("</"))(tags),
		["</p>", "</div>"],
		"should take trailing closing tags",
	)

	assertEquals(
		takeLastWhile((s: string) => s.length > 3)([
			"a",
			"bb",
			"ccc",
			"dddd",
			"eeeee",
		]),
		["dddd", "eeeee"],
		"should take trailing strings with length > 3",
	)

	assertEquals(
		takeLastWhile((s: string) => s.includes("x"))([
			"ax",
			"bx",
			"cy",
			"dx",
			"ex",
		]),
		["dx", "ex"],
		"should take trailing strings containing 'x'",
	)
})

Deno.test("takeLastWhile: object predicates", () => {
	const tasks = [
		{ id: 1, done: false },
		{ id: 2, done: false },
		{ id: 3, done: true },
		{ id: 4, done: true },
	]

	assertEquals(
		takeLastWhile((t: { done: boolean }) => t.done)(tasks),
		[{ id: 3, done: true }, { id: 4, done: true }],
		"should take completed tasks from end",
	)

	const users = [
		{ name: "Alice", active: true },
		{ name: "Bob", active: false },
		{ name: "Charlie", active: true },
		{ name: "David", active: true },
	]

	assertEquals(
		takeLastWhile((u: { active: boolean }) => u.active)(users),
		[{ name: "Charlie", active: true }, { name: "David", active: true }],
		"should take trailing active users",
	)
})

Deno.test("takeLastWhile: predicate with index and array", () => {
	// Predicate using index
	assertEquals(
		takeLastWhile((x: number, i: number) => i > 2)([10, 20, 30, 40, 50]),
		[40, 50],
		"should use index in predicate",
	)

	// Predicate using array reference
	assertEquals(
		takeLastWhile((x: number, i: number, arr: ReadonlyArray<number>) =>
			x > arr[0]
		)(
			[3, 1, 2, 4, 5, 6],
		),
		[4, 5, 6],
		"should use array reference in predicate",
	)

	// Complex predicate using all parameters
	assertEquals(
		takeLastWhile((x: number, i: number, arr: ReadonlyArray<number>) =>
			x * i < arr.length * 10
		)([1, 2, 3, 4, 5]),
		[1, 2, 3, 4, 5],
		"should handle complex predicate with all parameters",
	)
})

Deno.test("takeLastWhile: edge cases", () => {
	// None match
	assertEquals(
		takeLastWhile((x: number) => x > 10)([1, 2, 3]),
		[],
		"should return empty when no elements match",
	)

	// All match
	assertEquals(
		takeLastWhile((x: number) => x < 10)([1, 2, 3]),
		[1, 2, 3],
		"should return all elements when all match",
	)

	// Empty array
	assertEquals(
		takeLastWhile((x: any) => true)([]),
		[],
		"should return empty for empty array",
	)

	// Single element matching
	assertEquals(
		takeLastWhile((x: number) => x > 0)([5]),
		[5],
		"should return single element if it matches",
	)

	// Single element not matching
	assertEquals(
		takeLastWhile((x: number) => x < 0)([5]),
		[],
		"should return empty for single non-matching element",
	)
})

Deno.test("takeLastWhile: null and undefined handling", () => {
	const predicate = (x: any) => true

	assertEquals(
		takeLastWhile(predicate)(null),
		[],
		"should return empty for null",
	)

	assertEquals(
		takeLastWhile(predicate)(undefined),
		[],
		"should return empty for undefined",
	)
})

Deno.test("takeLastWhile: special values", () => {
	// NaN handling
	assertEquals(
		takeLastWhile((x: number) => !Number.isNaN(x))([1, 2, NaN, 3, 4]),
		[3, 4],
		"should stop at NaN when checking for non-NaN",
	)

	assertEquals(
		takeLastWhile((x: number) => Number.isNaN(x))([1, 2, NaN, NaN, NaN]),
		[NaN, NaN, NaN],
		"should take trailing NaN values",
	)

	// Infinity handling
	assertEquals(
		takeLastWhile((x: number) => x === Infinity)([
			1,
			2,
			Infinity,
			Infinity,
		]),
		[Infinity, Infinity],
		"should take trailing Infinity values",
	)

	// Mixed types
	const mixed = [1, "two", 3, "four", "five"]
	assertEquals(
		takeLastWhile((x: any) => typeof x === "string")(mixed),
		["four", "five"],
		"should take trailing strings from mixed array",
	)
})

Deno.test("takeLastWhile: immutability", () => {
	const original = [1, 2, 3, 4, 5]
	const result = takeLastWhile((x: number) => x > 2)(original)

	assertEquals(
		original,
		[1, 2, 3, 4, 5],
		"should not modify original array",
	)

	assertEquals(
		result,
		[3, 4, 5],
		"should return correct result",
	)

	// Ensure result is a new array
	const allMatch = takeLastWhile((x: number) => x > 0)(original)
	assertEquals(allMatch, original, "values should be equal")
	assertEquals(
		allMatch === original,
		false,
		"should be different array instance",
	)
})

Deno.test("takeLastWhile: currying", () => {
	const takeLarge = takeLastWhile((x: number) => x > 10)

	assertEquals(
		takeLarge([1, 5, 15, 20]),
		[15, 20],
		"should work with partial application",
	)

	assertEquals(
		takeLarge([1, 2, 3]),
		[],
		"should work with different arrays",
	)

	const takePositive = takeLastWhile((x: number) => x > 0)
	assertEquals(
		[[-1, 2, 3], [1, -2, 3, 4], [-1, -2, -3]].map(takePositive),
		[[2, 3], [3, 4], []],
		"should work with map",
	)
})

Deno.test("takeLastWhile: type inference", () => {
	const numbers = takeLastWhile((x: number) => x > 0)([1, 2, 3])
	assertType<Has<typeof numbers, Array<number>>>(true)

	const strings = takeLastWhile((s: string) => s.length > 0)(["a", "b", "c"])
	assertType<Has<typeof strings, Array<string>>>(true)

	type User = { name: string; age: number }
	const users: Array<User> = [
		{ name: "Alice", age: 30 },
		{ name: "Bob", age: 25 },
	]
	const adults = takeLastWhile((u: User) => u.age >= 18)(users)
	assertType<Has<typeof adults, Array<User>>>(true)
})

Deno.test("takeLastWhile: property-based tests", () => {
	// Property: Result is a suffix of the input
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.func(fc.boolean()),
			(arr, predicate) => {
				const result = takeLastWhile(predicate)(arr)
				if (result.length === 0) {
					// Empty array is always a suffix
					assertEquals(true, true, "empty result is always a suffix")
				} else {
					const isSuffix = arr.slice(-result.length).every((v, i) =>
						v === result[i]
					)
					assertEquals(
						isSuffix,
						true,
						"result should be a suffix of input",
					)
				}
			},
		),
		{ numRuns: 100 },
	)

	// Property: All elements in result should satisfy predicate
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: -100, max: 100 })),
			(arr) => {
				const predicate = (x: number) => x > 0
				const result = takeLastWhile(predicate)(arr)
				const allSatisfy = result.every(predicate)
				assertEquals(
					allSatisfy,
					true,
					"all elements should satisfy predicate",
				)
			},
		),
		{ numRuns: 100 },
	)

	// Property: Length of result <= length of input
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			fc.func(fc.boolean()),
			(arr, predicate) => {
				const result = takeLastWhile(predicate)(arr)
				assertEquals(
					result.length <= arr.length,
					true,
					"result length should not exceed input length",
				)
			},
		),
		{ numRuns: 100 },
	)

	// Property: If predicate is always true, result equals input
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(arr) => {
				const result = takeLastWhile(() => true)(arr)
				assertEquals(
					result,
					arr,
					"should return all elements when predicate is always true",
				)
			},
		),
		{ numRuns: 100 },
	)

	// Property: If predicate is always false, result is empty
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			(arr) => {
				const result = takeLastWhile(() => false)(arr)
				assertEquals(
					result,
					[],
					"should return empty when predicate is always false",
				)
			},
		),
		{ numRuns: 100 },
	)

	// Property: Result preserves order from original
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.func(fc.boolean()),
			(arr, predicate) => {
				const result = takeLastWhile(predicate)(arr)
				if (result.length > 0) {
					const startIndex = arr.length - result.length
					const expected = arr.slice(startIndex)
					assertEquals(
						result,
						expected,
						"should preserve order from original",
					)
				}
			},
		),
		{ numRuns: 100 },
	)
})

Deno.test("takeLastWhile: performance considerations", () => {
	// Test with large arrays
	const largeArray = Array.from({ length: 10000 }, (_, i) => i)

	const result1 = takeLastWhile((x: number) => x >= 9000)(largeArray)
	assertEquals(result1.length, 1000, "should handle large arrays efficiently")
	assertEquals(result1[0], 9000, "should start from correct element")
	assertEquals(result1[999], 9999, "should end at correct element")

	// Test early termination
	const result2 = takeLastWhile((x: number) => x < 0)(largeArray)
	assertEquals(
		result2,
		[],
		"should terminate early when predicate fails immediately",
	)
})

Deno.test("takeLastWhile: real-world scenarios", () => {
	// Log parsing - get recent errors
	const logs = [
		{ level: "info", message: "Started" },
		{ level: "debug", message: "Processing" },
		{ level: "error", message: "Failed" },
		{ level: "error", message: "Retry failed" },
	]

	assertEquals(
		takeLastWhile((log: { level: string }) => log.level === "error")(logs),
		[
			{ level: "error", message: "Failed" },
			{ level: "error", message: "Retry failed" },
		],
		"should extract trailing error logs",
	)

	// Time series data - get recent high values
	const readings = [
		{ time: "10:00", value: 50 },
		{ time: "10:15", value: 45 },
		{ time: "10:30", value: 60 },
		{ time: "10:45", value: 65 },
		{ time: "11:00", value: 70 },
	]

	assertEquals(
		takeLastWhile((r: { value: number }) => r.value >= 60)(readings),
		[
			{ time: "10:30", value: 60 },
			{ time: "10:45", value: 65 },
			{ time: "11:00", value: 70 },
		],
		"should get recent high readings",
	)

	// File path components - get trailing segments without dots
	const pathParts = [
		"home",
		"user",
		"documents",
		"project",
		"src",
		"index.ts",
	]
	assertEquals(
		takeLastWhile((part: string) => part.includes("."))(pathParts),
		["index.ts"],
		"should handle file extension detection",
	)
})
