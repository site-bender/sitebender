import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import _apertureToResult from "./index.ts"
import isOk from "../../../monads/result/isOk/index.ts"

Deno.test("_apertureToResult creates sliding windows", function testApertureToResultBasic() {
	const result = _apertureToResult<unknown, number>(3)([1, 2, 3, 4, 5])

	assertEquals(isOk(result), true)
	if (isOk(result)) {
		assertEquals(result.value, [
			[1, 2, 3],
			[2, 3, 4],
			[3, 4, 5],
		])
	}
})

Deno.test("_apertureToResult with width 2", function testApertureToResultWidthTwo() {
	const result = _apertureToResult<unknown, number>(2)([1, 2, 3, 4])

	assertEquals(isOk(result), true)
	if (isOk(result)) {
		assertEquals(result.value, [
			[1, 2],
			[2, 3],
			[3, 4],
		])
	}
})

Deno.test("_apertureToResult with empty array", function testApertureToResultEmpty() {
	const result = _apertureToResult<unknown, number>(2)([])

	assertEquals(isOk(result), true)
	if (isOk(result)) {
		assertEquals(result.value, [])
	}
})

Deno.test("_apertureToResult with single element", function testApertureToResultSingle() {
	const result = _apertureToResult<unknown, number>(1)([42])

	assertEquals(isOk(result), true)
	if (isOk(result)) {
		assertEquals(result.value, [[42]])
	}
})

Deno.test("_apertureToResult width larger than array", function testApertureToResultWidthLarger() {
	const result = _apertureToResult<unknown, number>(5)([1, 2, 3])

	assertEquals(isOk(result), true)
	if (isOk(result)) {
		assertEquals(result.value, [])
	}
})

Deno.test("_apertureToResult width equals array length", function testApertureToResultWidthEquals() {
	const result = _apertureToResult<unknown, number>(3)([1, 2, 3])

	assertEquals(isOk(result), true)
	if (isOk(result)) {
		assertEquals(result.value, [[1, 2, 3]])
	}
})

Deno.test("_apertureToResult with invalid width returns empty", function testApertureToResultInvalidWidth() {
	const result = _apertureToResult<unknown, number>(0)([1, 2, 3])

	assertEquals(isOk(result), true)
	if (isOk(result)) {
		assertEquals(result.value, [])
	}
})

Deno.test("_apertureToResult with negative width returns empty", function testApertureToResultNegativeWidth() {
	const result = _apertureToResult<unknown, number>(-1)([1, 2, 3])

	assertEquals(isOk(result), true)
	if (isOk(result)) {
		assertEquals(result.value, [])
	}
})

Deno.test("_apertureToResult with strings", function testApertureToResultStrings() {
	const result = _apertureToResult<unknown, string>(2)(["a", "b", "c", "d"])

	assertEquals(isOk(result), true)
	if (isOk(result)) {
		assertEquals(result.value, [
			["a", "b"],
			["b", "c"],
			["c", "d"],
		])
	}
})

Deno.test("_apertureToResult always returns Ok", function testApertureToResultAlwaysOk() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.integer({ min: 1, max: 10 }),
			function propertyApertureToResultAlwaysOk(
				arr: ReadonlyArray<number>,
				width: number,
			) {
				const result = _apertureToResult<unknown, number>(width)(arr)

				assertEquals(isOk(result), true)
			},
		),
	)
})

Deno.test("_apertureToResult window count is correct", function testApertureToResultCountProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 20 }),
			fc.integer({ min: 1, max: 5 }),
			function propertyApertureToResultCount(
				arr: ReadonlyArray<number>,
				width: number,
			) {
				const result = _apertureToResult<unknown, number>(width)(arr)

				assertEquals(isOk(result), true)
				if (isOk(result)) {
					const expectedCount = width <= arr.length ? arr.length - width + 1 : 0
					assertEquals(result.value.length, expectedCount)
				}
			},
		),
	)
})
