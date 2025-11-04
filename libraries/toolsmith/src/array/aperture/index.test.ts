import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import aperture from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

//++ Tests for aperture (creates sliding windows of consecutive elements)

//++ Plain array path tests

Deno.test("aperture creates sliding windows", function testApertureBasic() {
	const result = aperture<number>(3)([1, 2, 3, 4, 5])

	assertEquals(result, [
		[1, 2, 3],
		[2, 3, 4],
		[3, 4, 5],
	])
})

Deno.test("aperture with width 2", function testApertureWidthTwo() {
	const result = aperture<number>(2)([1, 2, 3, 4])

	assertEquals(result, [
		[1, 2],
		[2, 3],
		[3, 4],
	])
})

Deno.test("aperture with empty array", function testApertureEmpty() {
	const result = aperture<number>(2)([])

	assertEquals(result, [])
})

Deno.test("aperture with single element", function testApertureSingle() {
	const result = aperture<number>(1)([42])

	assertEquals(result, [[42]])
})

Deno.test("aperture width larger than array", function testApertureWidthLarger() {
	const result = aperture<number>(5)([1, 2, 3])

	assertEquals(result, [])
})

Deno.test("aperture width equals array length", function testApertureWidthEquals() {
	const result = aperture<number>(3)([1, 2, 3])

	assertEquals(result, [[1, 2, 3]])
})

Deno.test("aperture with invalid width returns empty", function testApertureInvalidWidth() {
	const result = aperture<number>(0)([1, 2, 3])

	assertEquals(result, [])
})

Deno.test("aperture with negative width returns empty", function testApertureNegativeWidth() {
	const result = aperture<number>(-1)([1, 2, 3])

	assertEquals(result, [])
})

Deno.test("aperture with strings", function testApertureStrings() {
	const result = aperture<string>(2)(["a", "b", "c", "d"])

	assertEquals(result, [
		["a", "b"],
		["b", "c"],
		["c", "d"],
	])
})

Deno.test("aperture with large array", function testApertureLarge() {
	const largeArray = Array.from({ length: 100 }, function makeNumber(_, i) {
		return i
	})

	const result = aperture<number>(3)(largeArray)

	assertEquals(result.length, 98)
	assertEquals(result[0], [0, 1, 2])
	assertEquals(result[97], [97, 98, 99])
})

//++ Result monad path tests

Deno.test("aperture with Result ok creates windows", function testApertureResultOk() {
	const result = aperture<number>(3)(ok([1, 2, 3, 4, 5]))

	assertEquals(result, ok([
		[1, 2, 3],
		[2, 3, 4],
		[3, 4, 5],
	]))
})

Deno.test("aperture with Result ok and empty array", function testApertureResultEmpty() {
	const result = aperture<number>(2)(ok([]))

	assertEquals(result, ok([]))
})

Deno.test("aperture with Result error passes through", function testApertureResultError() {
	const err = error({
		code: "UPSTREAM_ERROR",
		field: "data",
		messages: ["Upstream error occurred"],
		received: "null",
		expected: "Array",
		suggestion: "Fix upstream issue",
		severity: "requirement" as const,
	})
	const result = aperture<number>(2)(err)

	assertEquals(result, err)
})

//++ Validation monad path tests

Deno.test("aperture with Validation success creates windows", function testApertureValidationSuccess() {
	const result = aperture<number>(3)(success([1, 2, 3, 4, 5]))

	assertEquals(result, success([
		[1, 2, 3],
		[2, 3, 4],
		[3, 4, 5],
	]))
})

Deno.test("aperture with Validation success and empty array", function testApertureValidationEmpty() {
	const result = aperture<number>(2)(success([]))

	assertEquals(result, success([]))
})

Deno.test("aperture with Validation failure passes through", function testApertureValidationFailure() {
	const fail = failure([{
		code: "UPSTREAM_VALIDATION_ERROR",
		field: "data",
		messages: ["Validation failed upstream"],
		received: "null",
		expected: "Array",
		suggestion: "Fix validation issues",
		severity: "requirement" as const,
	}])
	const result = aperture<number>(2)(fail)

	assertEquals(result, fail)
})

//++ Property-based tests

Deno.test("aperture all windows same size", function testApertureWindowSizeProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 3, maxLength: 20 }),
			fc.integer({ min: 1, max: 5 }),
			function propertyApertureWindowSize(arr: ReadonlyArray<number>, width: number) {
				const result = aperture<number>(width)(arr)

				if (width <= arr.length) {
					result.forEach(function checkWindowSize(window: ReadonlyArray<number>) {
						assertEquals(window.length, width)
					})
				}
			},
		),
	)
})

Deno.test("aperture window count is correct", function testApertureCountProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 20 }),
			fc.integer({ min: 1, max: 5 }),
			function propertyApertureCount(arr: ReadonlyArray<number>, width: number) {
				const result = aperture<number>(width)(arr)

				const expectedCount = width <= arr.length ? arr.length - width + 1 : 0
				assertEquals(result.length, expectedCount)
			},
		),
	)
})

Deno.test("aperture always returns array of arrays", function testApertureTypeProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer({ min: 1, max: 10 }),
			function propertyApertureType(arr: ReadonlyArray<number>, width: number) {
				const result = aperture<number>(width)(arr)

				assertEquals(Array.isArray(result), true)
				result.forEach(function checkArrayType(window: ReadonlyArray<number>) {
					assertEquals(Array.isArray(window), true)
				})
			},
		),
	)
})

Deno.test("aperture consecutive windows overlap correctly", function testApertureOverlapProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 3, maxLength: 20 }),
			fc.integer({ min: 2, max: 5 }),
			function propertyApertureOverlap(arr: ReadonlyArray<number>, width: number) {
				const result = aperture<number>(width)(arr)

				if (result.length >= 2 && width <= arr.length) {
					//++ Check that consecutive windows overlap by width-1 elements
					for (let i = 0; i < result.length - 1; i++) {
						const window1 = result[i]
						const window2 = result[i + 1]

						//++ Last width-1 elements of window1 should equal first width-1 of window2
						for (let j = 1; j < width; j++) {
							assertEquals(window1[j], window2[j - 1])
						}
					}
				}
			},
		),
	)
})
