import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import chunk from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

//++ Tests for chunk (splits array into fixed-size chunks)

//++ Plain array path tests

Deno.test("chunk splits array into chunks", function testChunkBasic() {
	const result = chunk<number>(2)([1, 2, 3, 4, 5, 6])

	assertEquals(result, [
		[1, 2],
		[3, 4],
		[5, 6],
	])
})

Deno.test("chunk handles uneven chunks", function testChunkUneven() {
	const result = chunk<number>(3)([1, 2, 3, 4, 5])

	assertEquals(result, [
		[1, 2, 3],
		[4, 5],
	])
})

Deno.test("chunk with empty array", function testChunkEmpty() {
	const result = chunk<number>(2)([])

	assertEquals(result, [])
})

Deno.test("chunk with single element", function testChunkSingle() {
	const result = chunk<number>(1)([42])

	assertEquals(result, [[42]])
})

Deno.test("chunk size larger than array", function testChunkLargerSize() {
	const result = chunk<number>(10)([1, 2, 3])

	assertEquals(result, [[1, 2, 3]])
})

Deno.test("chunk with size 1", function testChunkSizeOne() {
	const result = chunk<number>(1)([1, 2, 3])

	assertEquals(result, [[1], [2], [3]])
})

Deno.test("chunk with invalid size returns empty", function testChunkInvalidSize() {
	const result = chunk<number>(0)([1, 2, 3])

	assertEquals(result, [])
})

Deno.test("chunk with negative size returns empty", function testChunkNegativeSize() {
	const result = chunk<number>(-1)([1, 2, 3])

	assertEquals(result, [])
})

Deno.test("chunk with strings", function testChunkStrings() {
	const result = chunk<string>(2)(["a", "b", "c", "d", "e"])

	assertEquals(result, [
		["a", "b"],
		["c", "d"],
		["e"],
	])
})

Deno.test("chunk with large array", function testChunkLarge() {
	const largeArray = Array.from({ length: 100 }, function makeNumber(_, i) {
		return i
	})

	const result = chunk<number>(10)(largeArray)

	assertEquals(result.length, 10)
	assertEquals(result[0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
	assertEquals(result[9], [90, 91, 92, 93, 94, 95, 96, 97, 98, 99])
})

//++ Result monad path tests

Deno.test("chunk with Result ok chunks array", function testChunkResultOk() {
	const result = chunk<number>(2)(ok([1, 2, 3, 4, 5, 6]))

	assertEquals(result, ok([
		[1, 2],
		[3, 4],
		[5, 6],
	]))
})

Deno.test("chunk with Result ok and empty array", function testChunkResultEmpty() {
	const result = chunk<number>(2)(ok([]))

	assertEquals(result, ok([]))
})

Deno.test("chunk with Result error passes through", function testChunkResultError() {
	const err = error({
		code: "UPSTREAM_ERROR",
		field: "data",
		messages: ["Upstream error occurred"],
		received: "null",
		expected: "Array",
		suggestion: "Fix upstream issue",
		severity: "requirement" as const,
	})
	const result = chunk<number>(2)(err)

	assertEquals(result, err)
})

//++ Validation monad path tests

Deno.test("chunk with Validation success chunks array", function testChunkValidationSuccess() {
	const result = chunk<number>(2)(success([1, 2, 3, 4, 5, 6]))

	assertEquals(result, success([
		[1, 2],
		[3, 4],
		[5, 6],
	]))
})

Deno.test("chunk with Validation success and empty array", function testChunkValidationEmpty() {
	const result = chunk<number>(2)(success([]))

	assertEquals(result, success([]))
})

Deno.test("chunk with Validation failure passes through", function testChunkValidationFailure() {
	const fail = failure([{
		code: "UPSTREAM_VALIDATION_ERROR",
		field: "data",
		messages: ["Validation failed upstream"],
		received: "null",
		expected: "Array",
		suggestion: "Fix validation issues",
		severity: "requirement" as const,
	}])
	const result = chunk<number>(2)(fail)

	assertEquals(result, fail)
})

//++ Property-based tests

Deno.test("chunk all chunks equal or smaller than size", function testChunkSizeProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer({ min: 1, max: 10 }),
			function propertyChunkSize(arr: ReadonlyArray<number>, size: number) {
				const result = chunk<number>(size)(arr)

				result.forEach(function checkChunkSize(ch: ReadonlyArray<number>) {
					assertEquals(ch.length <= size, true)
				})
			},
		),
	)
})

Deno.test("chunk concatenated chunks equals input", function testChunkConcatProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { maxLength: 50 }),
			fc.integer({ min: 1, max: 10 }),
			function propertyChunkConcat(arr: ReadonlyArray<number>, size: number) {
				const result = chunk<number>(size)(arr)

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

Deno.test("chunk always returns array of arrays", function testChunkTypeProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer({ min: 1, max: 10 }),
			function propertyChunkType(arr: ReadonlyArray<number>, size: number) {
				const result = chunk<number>(size)(arr)

				assertEquals(Array.isArray(result), true)
				result.forEach(function checkArrayType(ch: ReadonlyArray<number>) {
					assertEquals(Array.isArray(ch), true)
				})
			},
		),
	)
})

Deno.test("chunk with size 1 returns singleton arrays", function testChunkSingletonProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 20 }),
			function propertyChunkSingleton(arr: ReadonlyArray<number>) {
				const result = chunk<number>(1)(arr)

				assertEquals(result.length, arr.length)
				result.forEach(function checkSingleton(ch: ReadonlyArray<number>) {
					assertEquals(ch.length, 1)
				})
			},
		),
	)
})
