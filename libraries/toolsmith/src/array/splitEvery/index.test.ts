import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import splitEvery from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

//++ Tests for splitEvery (splits array into fixed-size chunks)

//++ Plain array path tests

Deno.test("splitEvery splits array into chunks", function testSplitEveryBasic() {
	const result = splitEvery<number>(2)([1, 2, 3, 4, 5, 6])

	assertEquals(result, [
		[1, 2],
		[3, 4],
		[5, 6],
	])
})

Deno.test("splitEvery handles uneven chunks", function testSplitEveryUneven() {
	const result = splitEvery<number>(3)([1, 2, 3, 4, 5])

	assertEquals(result, [
		[1, 2, 3],
		[4, 5],
	])
})

Deno.test("splitEvery with empty array", function testSplitEveryEmpty() {
	const result = splitEvery<number>(2)([])

	assertEquals(result, [])
})

Deno.test("splitEvery with single element", function testSplitEverySingle() {
	const result = splitEvery<number>(1)([42])

	assertEquals(result, [[42]])
})

Deno.test("splitEvery size larger than array", function testSplitEveryLargerSize() {
	const result = splitEvery<number>(10)([1, 2, 3])

	assertEquals(result, [[1, 2, 3]])
})

Deno.test("splitEvery with size 1", function testSplitEverySizeOne() {
	const result = splitEvery<number>(1)([1, 2, 3])

	assertEquals(result, [[1], [2], [3]])
})

Deno.test("splitEvery with invalid size returns empty", function testSplitEveryInvalidSize() {
	const result = splitEvery<number>(0)([1, 2, 3])

	assertEquals(result, [])
})

Deno.test("splitEvery with negative size returns empty", function testSplitEveryNegativeSize() {
	const result = splitEvery<number>(-1)([1, 2, 3])

	assertEquals(result, [])
})

Deno.test("splitEvery with strings", function testSplitEveryStrings() {
	const result = splitEvery<string>(2)(["a", "b", "c", "d", "e"])

	assertEquals(result, [
		["a", "b"],
		["c", "d"],
		["e"],
	])
})

Deno.test("splitEvery with large array", function testSplitEveryLarge() {
	const largeArray = Array.from({ length: 100 }, function makeNumber(_, i) {
		return i
	})

	const result = splitEvery<number>(10)(largeArray)

	assertEquals(result.length, 10)
	assertEquals(result[0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
	assertEquals(result[9], [90, 91, 92, 93, 94, 95, 96, 97, 98, 99])
})

//++ Result monad path tests

Deno.test("splitEvery with Result ok splits array", function testSplitEveryResultOk() {
	const result = splitEvery<number>(2)(ok([1, 2, 3, 4, 5, 6]))

	assertEquals(result, ok([
		[1, 2],
		[3, 4],
		[5, 6],
	]))
})

Deno.test("splitEvery with Result ok and empty array", function testSplitEveryResultEmpty() {
	const result = splitEvery<number>(2)(ok([]))

	assertEquals(result, ok([]))
})

Deno.test("splitEvery with Result error passes through", function testSplitEveryResultError() {
	const err = error({
		code: "UPSTREAM_ERROR",
		field: "data",
		messages: ["Upstream error occurred"],
		received: "null",
		expected: "Array",
		suggestion: "Fix upstream issue",
		severity: "requirement" as const,
	})
	const result = splitEvery<number>(2)(err)

	assertEquals(result, err)
})

//++ Validation monad path tests

Deno.test("splitEvery with Validation success splits array", function testSplitEveryValidationSuccess() {
	const result = splitEvery<number>(2)(success([1, 2, 3, 4, 5, 6]))

	assertEquals(result, success([
		[1, 2],
		[3, 4],
		[5, 6],
	]))
})

Deno.test("splitEvery with Validation success and empty array", function testSplitEveryValidationEmpty() {
	const result = splitEvery<number>(2)(success([]))

	assertEquals(result, success([]))
})

Deno.test("splitEvery with Validation failure passes through", function testSplitEveryValidationFailure() {
	const fail = failure([{
		code: "UPSTREAM_VALIDATION_ERROR",
		field: "data",
		messages: ["Validation failed upstream"],
		received: "null",
		expected: "Array",
		suggestion: "Fix validation issues",
		severity: "requirement" as const,
	}])
	const result = splitEvery<number>(2)(fail)

	assertEquals(result, fail)
})

//++ Property-based tests

Deno.test("splitEvery all chunks equal or smaller than size", function testSplitEverySizeProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer({ min: 1, max: 10 }),
			function propertySplitEverySize(arr: ReadonlyArray<number>, size: number) {
				const result = splitEvery<number>(size)(arr)

				result.forEach(function checkChunkSize(ch: ReadonlyArray<number>) {
					assertEquals(ch.length <= size, true)
				})
			},
		),
	)
})

Deno.test("splitEvery concatenated chunks equals input", function testSplitEveryConcatProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { maxLength: 50 }),
			fc.integer({ min: 1, max: 10 }),
			function propertySplitEveryConcat(arr: ReadonlyArray<number>, size: number) {
				const result = splitEvery<number>(size)(arr)

				const concatenated = result.reduce(
					function concatChunks(
						acc: ReadonlyArray<number>,
						ch: ReadonlyArray<number>,
					): ReadonlyArray<number> {
						return [...acc, ...ch]
					},
					[],
				)

				assertEquals(concatenated, arr)
			},
		),
	)
})

Deno.test("splitEvery always returns array of arrays", function testSplitEveryTypeProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer({ min: 1, max: 10 }),
			function propertySplitEveryType(arr: ReadonlyArray<number>, size: number) {
				const result = splitEvery<number>(size)(arr)

				assertEquals(Array.isArray(result), true)
				result.forEach(function checkArrayType(ch: ReadonlyArray<number>) {
					assertEquals(Array.isArray(ch), true)
				})
			},
		),
	)
})

Deno.test("splitEvery with size 1 returns singleton arrays", function testSplitEverySingletonProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 20 }),
			function propertySplitEverySingleton(arr: ReadonlyArray<number>) {
				const result = splitEvery<number>(1)(arr)

				assertEquals(result.length, arr.length)
				result.forEach(function checkSingleton(ch: ReadonlyArray<number>) {
					assertEquals(ch.length, 1)
				})
			},
		),
	)
})
