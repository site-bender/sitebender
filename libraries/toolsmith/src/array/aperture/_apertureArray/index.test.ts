import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import _apertureArray from "./index.ts"

Deno.test("_apertureArray creates sliding windows", function testApertureArrayBasic() {
	const result = _apertureArray<number>(3)([1, 2, 3, 4, 5])

	assertEquals(result, [
		[1, 2, 3],
		[2, 3, 4],
		[3, 4, 5],
	])
})

Deno.test("_apertureArray with width 2", function testApertureArrayWidthTwo() {
	const result = _apertureArray<number>(2)([1, 2, 3, 4])

	assertEquals(result, [
		[1, 2],
		[2, 3],
		[3, 4],
	])
})

Deno.test("_apertureArray with empty array", function testApertureArrayEmpty() {
	const result = _apertureArray<number>(2)([])

	assertEquals(result, [])
})

Deno.test("_apertureArray with single element", function testApertureArraySingle() {
	const result = _apertureArray<number>(1)([42])

	assertEquals(result, [[42]])
})

Deno.test("_apertureArray width larger than array", function testApertureArrayWidthLarger() {
	const result = _apertureArray<number>(5)([1, 2, 3])

	assertEquals(result, [])
})

Deno.test("_apertureArray width equals array length", function testApertureArrayWidthEquals() {
	const result = _apertureArray<number>(3)([1, 2, 3])

	assertEquals(result, [[1, 2, 3]])
})

Deno.test("_apertureArray with invalid width returns empty", function testApertureArrayInvalidWidth() {
	const result = _apertureArray<number>(0)([1, 2, 3])

	assertEquals(result, [])
})

Deno.test("_apertureArray with negative width returns empty", function testApertureArrayNegativeWidth() {
	const result = _apertureArray<number>(-1)([1, 2, 3])

	assertEquals(result, [])
})

Deno.test("_apertureArray with non-integer width returns empty", function testApertureArrayNonInteger() {
	const result = _apertureArray<number>(2.5)([1, 2, 3])

	assertEquals(result, [])
})

Deno.test("_apertureArray with strings", function testApertureArrayStrings() {
	const result = _apertureArray<string>(2)(["a", "b", "c", "d"])

	assertEquals(result, [
		["a", "b"],
		["b", "c"],
		["c", "d"],
	])
})

Deno.test("_apertureArray with large array", function testApertureArrayLarge() {
	const largeArray = Array.from({ length: 100 }, function makeNumber(_, i) {
		return i
	})

	const result = _apertureArray<number>(3)(largeArray)

	assertEquals(result.length, 98)
	assertEquals(result[0], [0, 1, 2])
	assertEquals(result[97], [97, 98, 99])
})

Deno.test("_apertureArray all windows same size", function testApertureArrayWindowSizeProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 3, maxLength: 20 }),
			fc.integer({ min: 1, max: 5 }),
			function propertyApertureArrayWindowSize(
				arr: ReadonlyArray<number>,
				width: number,
			) {
				const result = _apertureArray<number>(width)(arr)

				if (width <= arr.length) {
					result.forEach(
						function checkWindowSize(window: ReadonlyArray<number>) {
							assertEquals(window.length, width)
						},
					)
				}
			},
		),
	)
})

Deno.test("_apertureArray window count is correct", function testApertureArrayCountProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 20 }),
			fc.integer({ min: 1, max: 5 }),
			function propertyApertureArrayCount(
				arr: ReadonlyArray<number>,
				width: number,
			) {
				const result = _apertureArray<number>(width)(arr)

				const expectedCount = width <= arr.length ? arr.length - width + 1 : 0
				assertEquals(result.length, expectedCount)
			},
		),
	)
})

Deno.test("_apertureArray consecutive windows overlap correctly", function testApertureArrayOverlapProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 3, maxLength: 20 }),
			fc.integer({ min: 2, max: 5 }),
			function propertyApertureArrayOverlap(
				arr: ReadonlyArray<number>,
				width: number,
			) {
				const result = _apertureArray<number>(width)(arr)

				if (result.length >= 2 && width <= arr.length) {
					result.forEach(function checkOverlap(window1, i) {
						if (i < result.length - 1) {
							const window2 = result[i + 1]

							window1.forEach(function checkElement(element, j) {
								if (j >= 1) {
									assertEquals(element, window2[j - 1])
								}
							})
						}
					})
				}
			},
		),
	)
})
