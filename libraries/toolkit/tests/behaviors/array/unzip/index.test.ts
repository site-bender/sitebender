import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import { assertType, Has } from "https://deno.land/std@0.218.0/testing/types.ts"
import * as fc from "npm:fast-check@3"

import unzip from "../../../../src/simple/array/unzip/index.ts"

Deno.test("unzip: basic functionality", () => {
	// Numbers and strings
	assertEquals(
		unzip([[1, "a"], [2, "b"], [3, "c"]]),
		[[1, 2, 3], ["a", "b", "c"]],
		"should separate numbers and strings",
	)

	// Same type pairs
	assertEquals(
		unzip([[1, 10], [2, 20], [3, 30]]),
		[[1, 2, 3], [10, 20, 30]],
		"should separate same-type pairs",
	)

	// Boolean pairs
	assertEquals(
		unzip([[true, false], [false, true], [true, true]]),
		[[true, false, true], [false, true, true]],
		"should handle boolean pairs",
	)
})

Deno.test("unzip: people data example", () => {
	const people: Array<[string, number]> = [
		["Alice", 25],
		["Bob", 30],
		["Charlie", 35],
	]

	const [names, ages] = unzip(people)

	assertEquals(names, ["Alice", "Bob", "Charlie"], "should extract names")
	assertEquals(ages, [25, 30, 35], "should extract ages")
})

Deno.test("unzip: table data extraction", () => {
	const tableRows: Array<[string, number]> = [
		["Product A", 100],
		["Product B", 200],
		["Product C", 150],
	]

	const [products, prices] = unzip(tableRows)

	assertEquals(
		products,
		["Product A", "Product B", "Product C"],
		"should extract product names",
	)
	assertEquals(prices, [100, 200, 150], "should extract prices")
})

Deno.test("unzip: empty array", () => {
	const result = unzip([])
	assertEquals(
		result,
		[[], []],
		"should return two empty arrays for empty input",
	)

	// Verify it's a tuple of arrays
	assertEquals(Array.isArray(result), true, "should return an array")
	assertEquals(result.length, 2, "should return tuple of length 2")
	assertEquals(
		Array.isArray(result[0]),
		true,
		"first element should be an array",
	)
	assertEquals(
		Array.isArray(result[1]),
		true,
		"second element should be an array",
	)
})

Deno.test("unzip: single pair", () => {
	assertEquals(
		unzip([[42, "answer"]]),
		[[42], ["answer"]],
		"should handle single pair",
	)
})

Deno.test("unzip: null and undefined handling", () => {
	assertEquals(
		unzip(null),
		[[], []],
		"should return empty arrays for null",
	)

	assertEquals(
		unzip(undefined),
		[[], []],
		"should return empty arrays for undefined",
	)
})

Deno.test("unzip: mixed types", () => {
	type Mixed = [number | string, boolean | null]
	const pairs: Array<Mixed> = [
		[1, true],
		["two", false],
		[3, null],
		["four", true],
	]

	const [first, second] = unzip(pairs)
	assertEquals(
		first,
		[1, "two", 3, "four"],
		"should handle mixed first elements",
	)
	assertEquals(
		second,
		[true, false, null, true],
		"should handle mixed second elements",
	)
})

Deno.test("unzip: object pairs", () => {
	const obj1 = { id: 1 }
	const obj2 = { id: 2 }
	const obj3 = { name: "Alice" }
	const obj4 = { name: "Bob" }

	assertEquals(
		unzip([[obj1, obj3], [obj2, obj4]]),
		[[obj1, obj2], [obj3, obj4]],
		"should handle object references",
	)
})

Deno.test("unzip: nested arrays", () => {
	const pairs: Array<[Array<number>, Array<string>]> = [
		[[1, 2], ["a", "b"]],
		[[3, 4], ["c", "d"]],
		[[5, 6], ["e", "f"]],
	]

	const [numbers, strings] = unzip(pairs)
	assertEquals(
		numbers,
		[[1, 2], [3, 4], [5, 6]],
		"should handle nested number arrays",
	)
	assertEquals(
		strings,
		[["a", "b"], ["c", "d"], ["e", "f"]],
		"should handle nested string arrays",
	)
})

Deno.test("unzip: special values", () => {
	assertEquals(
		unzip([[NaN, Infinity], [-0, -Infinity], [0, undefined]]),
		[[NaN, -0, 0], [Infinity, -Infinity, undefined]],
		"should handle special numeric values",
	)
})

Deno.test("unzip: malformed input handling", () => {
	// Arrays with missing second element
	const malformed: any = [[1, 2], [3], [4, 5], [], [6, 7]]
	const [first, second] = unzip(malformed)
	assertEquals(
		first,
		[1, 4, 6],
		"should skip malformed pairs (missing elements)",
	)
	assertEquals(second, [2, 5, 7], "should skip malformed pairs")

	// Non-array elements
	const mixed: any = [[1, 2], "not a pair", [3, 4], null, [5, 6]]
	const [firstMixed, secondMixed] = unzip(mixed)
	assertEquals(firstMixed, [1, 3, 5], "should skip non-array elements")
	assertEquals(secondMixed, [2, 4, 6], "should skip non-array elements")
})

Deno.test("unzip: coordinates example", () => {
	const coordinates: Array<[number, number]> = [
		[10, 20],
		[30, 40],
		[50, 60],
	]

	const [xCoords, yCoords] = unzip(coordinates)
	assertEquals(xCoords, [10, 30, 50], "should extract x coordinates")
	assertEquals(yCoords, [20, 40, 60], "should extract y coordinates")
})

Deno.test("unzip: dates and times", () => {
	const date1 = new Date("2024-01-01")
	const date2 = new Date("2024-01-02")
	const time1 = "10:00"
	const time2 = "14:30"

	assertEquals(
		unzip([[date1, time1], [date2, time2]]),
		[[date1, date2], [time1, time2]],
		"should handle dates and times",
	)
})

Deno.test("unzip: immutability", () => {
	const original: Array<[number, string]> = [[1, "a"], [2, "b"], [3, "c"]]
	const result = unzip(original)

	// Modify result
	result[0].push(4)
	result[1].push("d")

	// Original should be unchanged
	assertEquals(
		original,
		[[1, "a"], [2, "b"], [3, "c"]],
		"original should not be modified",
	)

	// Result should be modified
	assertEquals(
		result,
		[[1, 2, 3, 4], ["a", "b", "c", "d"]],
		"result should be modified",
	)
})

Deno.test("unzip: type inference", () => {
	const numberStringPairs: Array<[number, string]> = [[1, "a"], [2, "b"]]
	const result1 = unzip(numberStringPairs)
	assertType<Has<typeof result1, [Array<number>, Array<string>]>>(true)

	const booleanObjectPairs: Array<[boolean, { id: number }]> = [
		[true, { id: 1 }],
		[false, { id: 2 }],
	]
	const result2 = unzip(booleanObjectPairs)
	assertType<Has<typeof result2, [Array<boolean>, Array<{ id: number }>]>>(
		true,
	)

	// Mixed types
	type User = { name: string }
	const userScorePairs: Array<[User, number]> = [
		[{ name: "Alice" }, 100],
		[{ name: "Bob" }, 85],
	]
	const result3 = unzip(userScorePairs)
	assertType<Has<typeof result3, [Array<User>, Array<number>]>>(true)
})

Deno.test("unzip: property-based tests", () => {
	// Property: unzip produces two arrays of same length as input
	fc.assert(
		fc.property(
			fc.array(fc.tuple(fc.integer(), fc.string())),
			(pairs) => {
				const [first, second] = unzip(pairs)
				assertEquals(
					first.length,
					pairs.length,
					"first array length should match input",
				)
				assertEquals(
					second.length,
					pairs.length,
					"second array length should match input",
				)
			},
		),
		{ numRuns: 100 },
	)

	// Property: unzip preserves order
	fc.assert(
		fc.property(
			fc.array(fc.tuple(fc.integer(), fc.integer())),
			(pairs) => {
				const [first, second] = unzip(pairs)
				pairs.forEach((pair, i) => {
					assertEquals(
						first[i],
						pair[0],
						`first[${i}] should match pair[0]`,
					)
					assertEquals(
						second[i],
						pair[1],
						`second[${i}] should match pair[1]`,
					)
				})
			},
		),
		{ numRuns: 100 },
	)

	// Property: unzip of empty array is [[], []]
	fc.assert(
		fc.property(
			fc.constant([]),
			(empty) => {
				const result = unzip(empty)
				assertEquals(
					result,
					[[], []],
					"empty input should produce empty arrays",
				)
			},
		),
		{ numRuns: 1 },
	)

	// Property: unzip is inverse of zip (conceptually)
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.array(fc.string()),
			(arr1, arr2) => {
				// Ensure same length
				const minLen = Math.min(arr1.length, arr2.length)
				const trimmed1 = arr1.slice(0, minLen)
				const trimmed2 = arr2.slice(0, minLen)

				// Create pairs manually (simulating zip)
				const pairs: Array<[number, string]> = trimmed1.map((
					v,
					i,
				) => [v, trimmed2[i]])

				// Unzip should recover original arrays
				const [recovered1, recovered2] = unzip(pairs)
				assertEquals(recovered1, trimmed1, "should recover first array")
				assertEquals(
					recovered2,
					trimmed2,
					"should recover second array",
				)
			},
		),
		{ numRuns: 100 },
	)

	// Property: Elements are distributed correctly
	fc.assert(
		fc.property(
			fc.array(fc.tuple(fc.anything(), fc.anything())),
			(pairs) => {
				const [first, second] = unzip(pairs)

				// All first elements should be from position 0
				first.forEach((elem, i) => {
					assertEquals(
						elem,
						pairs[i][0],
						"first elements should match",
					)
				})

				// All second elements should be from position 1
				second.forEach((elem, i) => {
					assertEquals(
						elem,
						pairs[i][1],
						"second elements should match",
					)
				})
			},
		),
		{ numRuns: 100 },
	)
})

Deno.test("unzip: performance with large arrays", () => {
	// Generate large array of pairs (limited due to recursive implementation)
	const largePairs: Array<[number, string]> = Array.from(
		{ length: 1000 },
		(_, i) => [i, `item-${i}`],
	)

	const [numbers, strings] = unzip(largePairs)

	assertEquals(numbers.length, 1000, "should handle large arrays")
	assertEquals(strings.length, 1000, "should handle large arrays")
	assertEquals(numbers[0], 0, "first number should be correct")
	assertEquals(numbers[999], 999, "last number should be correct")
	assertEquals(strings[0], "item-0", "first string should be correct")
	assertEquals(strings[999], "item-999", "last string should be correct")
})

Deno.test("unzip: real-world scenarios", () => {
	// Key-value pairs from object entries
	const obj = { a: 1, b: 2, c: 3, d: 4 }
	const entries = Object.entries(obj) as Array<[string, number]>
	const [keys, values] = unzip(entries)

	assertEquals(keys, ["a", "b", "c", "d"], "should extract object keys")
	assertEquals(values, [1, 2, 3, 4], "should extract object values")

	// Event timestamps and types
	const events: Array<[Date, string]> = [
		[new Date("2024-01-01T10:00:00"), "login"],
		[new Date("2024-01-01T10:05:00"), "view"],
		[new Date("2024-01-01T10:10:00"), "logout"],
	]
	const [timestamps, types] = unzip(events)

	assertEquals(timestamps.length, 3, "should extract timestamps")
	assertEquals(
		types,
		["login", "view", "logout"],
		"should extract event types",
	)

	// Test scores and student IDs
	const testResults: Array<[string, number]> = [
		["STU001", 85],
		["STU002", 92],
		["STU003", 78],
		["STU004", 95],
	]
	const [studentIds, scores] = unzip(testResults)

	assertEquals(
		studentIds,
		["STU001", "STU002", "STU003", "STU004"],
		"should extract student IDs",
	)
	assertEquals(scores, [85, 92, 78, 95], "should extract scores")

	// Statistical mean calculation
	const mean = (nums: Array<number>) =>
		nums.reduce((a, b) => a + b, 0) / nums.length
	assertEquals(mean(scores), 87.5, "should enable statistical calculations")
})
