import { assertEquals } from "@std/assert"
import * as fc from "fast-check"

import sliding from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

//++ Tests for sliding (creates sliding windows with configurable size and step)

//++ Plain array path tests

Deno.test("sliding creates windows with step", function testSlidingBasic() {
	const result = sliding<number>(3)(1)([1, 2, 3, 4, 5])

	assertEquals(result, [
		[1, 2, 3],
		[2, 3, 4],
		[3, 4, 5],
	])
})

Deno.test("sliding with step 2", function testSlidingStepTwo() {
	const result = sliding<number>(3)(2)([1, 2, 3, 4, 5, 6, 7])

	assertEquals(result, [
		[1, 2, 3],
		[3, 4, 5],
		[5, 6, 7],
	])
})

Deno.test("sliding with empty array", function testSlidingEmpty() {
	const result = sliding<number>(2)(1)([])

	assertEquals(result, [])
})

Deno.test("sliding with single element", function testSlidingSingle() {
	const result = sliding<number>(1)(1)([42])

	assertEquals(result, [[42]])
})

Deno.test("sliding size larger than array", function testSlidingSizeLarger() {
	const result = sliding<number>(5)(1)([1, 2, 3])

	assertEquals(result, [])
})

Deno.test("sliding size equals array length", function testSlidingSizeEquals() {
	const result = sliding<number>(3)(1)([1, 2, 3])

	assertEquals(result, [[1, 2, 3]])
})

Deno.test("sliding with invalid size returns empty", function testSlidingInvalidSize() {
	const result = sliding<number>(0)(1)([1, 2, 3])

	assertEquals(result, [])
})

Deno.test("sliding with invalid step returns empty", function testSlidingInvalidStep() {
	const result = sliding<number>(2)(0)([1, 2, 3])

	assertEquals(result, [])
})

Deno.test("sliding with strings", function testSlidingStrings() {
	const result = sliding<string>(2)(1)(["a", "b", "c", "d"])

	assertEquals(result, [
		["a", "b"],
		["b", "c"],
		["c", "d"],
	])
})

Deno.test("sliding with large step creates gaps", function testSlidingLargeStep() {
	const result = sliding<number>(2)(3)([1, 2, 3, 4, 5, 6, 7])

	assertEquals(result, [
		[1, 2],
		[4, 5],
		[7, 8] ? [] : [[7, 8]],
	].filter(function filterEmpty(x) {
		return x.length > 0
	}))

	//++ Actually should be
	assertEquals(result, [
		[1, 2],
		[4, 5],
	])
})

//++ Result monad path tests

Deno.test("sliding with Result ok creates windows", function testSlidingResultOk() {
	const result = sliding<number>(3)(1)(ok([1, 2, 3, 4, 5]))

	assertEquals(result, ok([
		[1, 2, 3],
		[2, 3, 4],
		[3, 4, 5],
	]))
})

Deno.test("sliding with Result ok and empty array", function testSlidingResultEmpty() {
	const result = sliding<number>(2)(1)(ok([]))

	assertEquals(result, ok([]))
})

Deno.test("sliding with Result error passes through", function testSlidingResultError() {
	const err = error({
		code: "UPSTREAM_ERROR",
		field: "data",
		messages: ["Upstream error occurred"],
		received: "null",
		expected: "Array",
		suggestion: "Fix upstream issue",
		severity: "requirement" as const,
	})
	const result = sliding<number>(2)(1)(err)

	assertEquals(result, err)
})

//++ Validation monad path tests

Deno.test("sliding with Validation success creates windows", function testSlidingValidationSuccess() {
	const result = sliding<number>(3)(1)(success([1, 2, 3, 4, 5]))

	assertEquals(result, success([
		[1, 2, 3],
		[2, 3, 4],
		[3, 4, 5],
	]))
})

Deno.test("sliding with Validation success and empty array", function testSlidingValidationEmpty() {
	const result = sliding<number>(2)(1)(success([]))

	assertEquals(result, success([]))
})

Deno.test("sliding with Validation failure passes through", function testSlidingValidationFailure() {
	const fail = failure([{
		code: "UPSTREAM_VALIDATION_ERROR",
		field: "data",
		messages: ["Validation failed upstream"],
		received: "null",
		expected: "Array",
		suggestion: "Fix validation issues",
		severity: "requirement" as const,
	}])
	const result = sliding<number>(2)(1)(fail)

	assertEquals(result, fail)
})

//++ Property-based tests

Deno.test("sliding all windows same size", function testSlidingWindowSizeProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 3, maxLength: 20 }),
			fc.integer({ min: 1, max: 5 }),
			fc.integer({ min: 1, max: 3 }),
			function propertySlidingWindowSize(
				arr: ReadonlyArray<number>,
				size: number,
				step: number,
			) {
				const result = sliding<number>(size)(step)(arr)

				result.forEach(function checkWindowSize(window: ReadonlyArray<number>) {
					assertEquals(window.length, size)
				})
			},
		),
	)
})

Deno.test("sliding with step 1 equals aperture", function testSlidingStepOneProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 3, maxLength: 20 }),
			fc.integer({ min: 1, max: 5 }),
			function propertySlidingStepOne(arr: ReadonlyArray<number>, size: number) {
				const slidingResult = sliding<number>(size)(1)(arr)

				//++ sliding with step 1 should behave like aperture
				if (size <= arr.length) {
					const expectedCount = arr.length - size + 1
					assertEquals(slidingResult.length, expectedCount)
				} else {
					assertEquals(slidingResult.length, 0)
				}
			},
		),
	)
})

Deno.test("sliding always returns array of arrays", function testSlidingTypeProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer({ min: 1, max: 10 }),
			fc.integer({ min: 1, max: 5 }),
			function propertySlidingType(
				arr: ReadonlyArray<number>,
				size: number,
				step: number,
			) {
				const result = sliding<number>(size)(step)(arr)

				assertEquals(Array.isArray(result), true)
				result.forEach(function checkArrayType(window: ReadonlyArray<number>) {
					assertEquals(Array.isArray(window), true)
				})
			},
		),
	)
})

Deno.test("sliding windows respect step parameter", function testSlidingStepProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 10, maxLength: 20 }),
			fc.integer({ min: 2, max: 4 }),
			fc.integer({ min: 2, max: 3 }),
			function propertySlidingStep(
				arr: ReadonlyArray<number>,
				size: number,
				step: number,
			) {
				const result = sliding<number>(size)(step)(arr)

				if (size <= arr.length) {
					//++ Check window count is correct based on formula
					//++ Number of windows = floor((length - size) / step) + 1
					const expectedCount = Math.floor((arr.length - size) / step) + 1
					assertEquals(result.length, expectedCount)

					//++ Check that all windows have correct size
					result.forEach(function checkSize(window: ReadonlyArray<number>) {
						assertEquals(window.length, size)
					})
				} else {
					assertEquals(result.length, 0)
				}
			},
		),
	)
})
