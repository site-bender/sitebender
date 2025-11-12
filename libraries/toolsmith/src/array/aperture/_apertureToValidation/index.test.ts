import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import _apertureToValidation from "./index.ts"
import isSuccess from "../../../monads/validation/isSuccess/index.ts"

Deno.test("_apertureToValidation creates sliding windows", function testApertureToValidationBasic() {
	const result = _apertureToValidation<unknown, number>(3)([1, 2, 3, 4, 5])

	assertEquals(isSuccess(result), true)
	if (isSuccess(result)) {
		assertEquals(result.value, [
			[1, 2, 3],
			[2, 3, 4],
			[3, 4, 5],
		])
	}
})

Deno.test("_apertureToValidation with width 2", function testApertureToValidationWidthTwo() {
	const result = _apertureToValidation<unknown, number>(2)([1, 2, 3, 4])

	assertEquals(isSuccess(result), true)
	if (isSuccess(result)) {
		assertEquals(result.value, [
			[1, 2],
			[2, 3],
			[3, 4],
		])
	}
})

Deno.test("_apertureToValidation with empty array", function testApertureToValidationEmpty() {
	const result = _apertureToValidation<unknown, number>(2)([])

	assertEquals(isSuccess(result), true)
	if (isSuccess(result)) {
		assertEquals(result.value, [])
	}
})

Deno.test("_apertureToValidation with single element", function testApertureToValidationSingle() {
	const result = _apertureToValidation<unknown, number>(1)([42])

	assertEquals(isSuccess(result), true)
	if (isSuccess(result)) {
		assertEquals(result.value, [[42]])
	}
})

Deno.test("_apertureToValidation width larger than array", function testApertureToValidationWidthLarger() {
	const result = _apertureToValidation<unknown, number>(5)([1, 2, 3])

	assertEquals(isSuccess(result), true)
	if (isSuccess(result)) {
		assertEquals(result.value, [])
	}
})

Deno.test("_apertureToValidation width equals array length", function testApertureToValidationWidthEquals() {
	const result = _apertureToValidation<unknown, number>(3)([1, 2, 3])

	assertEquals(isSuccess(result), true)
	if (isSuccess(result)) {
		assertEquals(result.value, [[1, 2, 3]])
	}
})

Deno.test("_apertureToValidation with invalid width returns empty", function testApertureToValidationInvalidWidth() {
	const result = _apertureToValidation<unknown, number>(0)([1, 2, 3])

	assertEquals(isSuccess(result), true)
	if (isSuccess(result)) {
		assertEquals(result.value, [])
	}
})

Deno.test("_apertureToValidation with negative width returns empty", function testApertureToValidationNegativeWidth() {
	const result = _apertureToValidation<unknown, number>(-1)([1, 2, 3])

	assertEquals(isSuccess(result), true)
	if (isSuccess(result)) {
		assertEquals(result.value, [])
	}
})

Deno.test("_apertureToValidation with strings", function testApertureToValidationStrings() {
	const result = _apertureToValidation<unknown, string>(2)(["a", "b", "c", "d"])

	assertEquals(isSuccess(result), true)
	if (isSuccess(result)) {
		assertEquals(result.value, [
			["a", "b"],
			["b", "c"],
			["c", "d"],
		])
	}
})

Deno.test("_apertureToValidation always returns Success", function testApertureToValidationAlwaysSuccess() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer({ min: 1, max: 10 }),
			function propertyApertureToValidationAlwaysSuccess(
				arr: ReadonlyArray<number>,
				width: number,
			) {
				const result = _apertureToValidation<unknown, number>(width)(arr)

				assertEquals(isSuccess(result), true)
			},
		),
	)
})

Deno.test("_apertureToValidation window count is correct", function testApertureToValidationCountProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 20 }),
			fc.integer({ min: 1, max: 5 }),
			function propertyApertureToValidationCount(
				arr: ReadonlyArray<number>,
				width: number,
			) {
				const result = _apertureToValidation<unknown, number>(width)(arr)

				assertEquals(isSuccess(result), true)
				if (isSuccess(result)) {
					const expectedCount = width <= arr.length ? arr.length - width + 1 : 0
					assertEquals(result.value.length, expectedCount)
				}
			},
		),
	)
})
