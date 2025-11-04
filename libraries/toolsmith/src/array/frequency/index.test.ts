import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import frequency from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

//++ Tests for frequency (counts occurrences of each element)

//++ Plain array path tests

Deno.test("frequency counts occurrences of elements", function testFrequencyBasic() {
	const result = frequency<number>()([1, 2, 1, 3, 2, 1, 4])

	assertEquals(result, {
		"1": 3,
		"2": 2,
		"3": 1,
		"4": 1,
	})
})

Deno.test("frequency with strings", function testFrequencyStrings() {
	const result = frequency<string>()(["apple", "banana", "apple", "cherry", "banana", "apple"])

	assertEquals(result, {
		apple: 3,
		banana: 2,
		cherry: 1,
	})
})

Deno.test("frequency with empty array", function testFrequencyEmpty() {
	const result = frequency<number>()([])

	assertEquals(result, {})
})

Deno.test("frequency with single element", function testFrequencySingle() {
	const result = frequency<number>()([42])

	assertEquals(result, { "42": 1 })
})

Deno.test("frequency with all same elements", function testFrequencyAllSame() {
	const result = frequency<number>()([5, 5, 5, 5, 5])

	assertEquals(result, { "5": 5 })
})

Deno.test("frequency with all unique elements", function testFrequencyAllUnique() {
	const result = frequency<number>()([1, 2, 3, 4, 5])

	assertEquals(result, {
		"1": 1,
		"2": 1,
		"3": 1,
		"4": 1,
		"5": 1,
	})
})

Deno.test("frequency with two elements", function testFrequencyTwo() {
	const result = frequency<string>()(["a", "b", "a", "b", "a"])

	assertEquals(result, {
		a: 3,
		b: 2,
	})
})

Deno.test("frequency with boolean values", function testFrequencyBoolean() {
	const result = frequency<boolean>()([true, false, true, true, false])

	assertEquals(result, {
		true: 3,
		false: 2,
	})
})

Deno.test("frequency with mixed case strings treats as different", function testFrequencyCaseSensitive() {
	const result = frequency<string>()(["Apple", "apple", "APPLE"])

	assertEquals(result, {
		Apple: 1,
		apple: 1,
		APPLE: 1,
	})
})

Deno.test("frequency with large array", function testFrequencyLarge() {
	const largeArray = Array.from({ length: 1000 }, function makeNumber(_, i) {
		return i % 10
	})

	const result = frequency<number>()(largeArray)

	// Each of 0-9 should appear 100 times
	assertEquals(Object.keys(result).length, 10)
	assertEquals(result["0"], 100)
	assertEquals(result["5"], 100)
	assertEquals(result["9"], 100)
})

//++ Result monad path tests

Deno.test("frequency with Result ok counts elements", function testFrequencyResultOk() {
	const result = frequency<number>()(ok([1, 2, 1, 3, 2, 1, 4]))

	assertEquals(result, ok({
		"1": 3,
		"2": 2,
		"3": 1,
		"4": 1,
	}))
})

Deno.test("frequency with Result ok and empty array", function testFrequencyResultEmpty() {
	const result = frequency<number>()(ok([]))

	assertEquals(result, ok({}))
})

Deno.test("frequency with Result error passes through", function testFrequencyResultError() {
	const err = error({ code: "TEST_ERROR", message: "Test error" })
	const result = frequency<number>()(err)

	assertEquals(result, err)
})

//++ Validation monad path tests

Deno.test("frequency with Validation success counts elements", function testFrequencyValidationSuccess() {
	const result = frequency<number>()(success([1, 2, 1, 3, 2, 1, 4]))

	assertEquals(result, success({
		"1": 3,
		"2": 2,
		"3": 1,
		"4": 1,
	}))
})

Deno.test("frequency with Validation success and empty array", function testFrequencyValidationEmpty() {
	const result = frequency<number>()(success([]))

	assertEquals(result, success({}))
})

Deno.test("frequency with Validation failure passes through", function testFrequencyValidationFailure() {
	const fail = failure([{ code: "TEST_ERROR", message: "Test error" }])
	const result = frequency<number>()(fail)

	assertEquals(result, fail)
})

//++ Property-based tests

Deno.test("frequency sum of counts equals input length", function testFrequencySumProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: 0, max: 10 })),
			function propertyFrequencySum(arr: ReadonlyArray<number>) {
				const result = frequency<number>()(arr)

				const totalCount = Object.values(result).reduce(
					function sumCounts(sum: number, count: number): number {
						return sum + count
					},
					0,
				)

				assertEquals(totalCount, arr.length)
			},
		),
	)
})

Deno.test("frequency all counts are positive", function testFrequencyPositiveProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1 }),
			function propertyFrequencyPositive(arr: ReadonlyArray<number>) {
				const result = frequency<number>()(arr)

				Object.values(result).forEach(function checkPositive(count: number) {
					assertEquals(count > 0, true)
				})
			},
		),
	)
})

Deno.test("frequency includes all unique elements", function testFrequencyUniqueProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer({ min: 0, max: 20 })),
			function propertyFrequencyUnique(arr: ReadonlyArray<number>) {
				const result = frequency<number>()(arr)
				const uniqueElements = Array.from(
					new Set(arr.map(function stringify(x: number): string {
						return String(x)
					})),
				)

				assertEquals(Object.keys(result).length, uniqueElements.length)
			},
		),
	)
})

Deno.test("frequency always returns Record with numbers", function testFrequencyTypeProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function propertyFrequencyType(arr: ReadonlyArray<number>) {
				const result = frequency<number>()(arr)

				assertEquals(typeof result, "object")
				assertEquals(result !== null, true)
				Object.values(result).forEach(function checkNumberType(count: number) {
					assertEquals(typeof count, "number")
				})
			},
		),
	)
})
