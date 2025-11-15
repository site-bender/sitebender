import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import _createWindow from "./index.ts"

Deno.test("_createWindow - basic functionality", async function (t) {
	await t.step(
		"creates window from start of array",
		function createsWindowFromStart() {
			const array = [1, 2, 3, 4, 5]
			const fn = _createWindow(3)(array)
			const result = fn(NaN, 0)

			assertEquals(result, [1, 2, 3])
		},
	)

	await t.step(
		"creates window from middle of array",
		function createsWindowFromMiddle() {
			const array = [1, 2, 3, 4, 5]
			const fn = _createWindow(3)(array)
			const result = fn(NaN, 1)

			assertEquals(result, [2, 3, 4])
		},
	)

	await t.step(
		"creates window from end of array",
		function createsWindowFromEnd() {
			const array = [1, 2, 3, 4, 5]
			const fn = _createWindow(3)(array)
			const result = fn(NaN, 2)

			assertEquals(result, [3, 4, 5])
		},
	)

	await t.step(
		"creates window with width 1",
		function createsWindowWidthOne() {
			const array = [10, 20, 30]
			const fn = _createWindow(1)(array)
			const result = fn(NaN, 1)

			assertEquals(result, [20])
		},
	)

	await t.step(
		"creates window with width equal to array length",
		function createsWindowFullWidth() {
			const array = [1, 2, 3]
			const fn = _createWindow(3)(array)
			const result = fn(NaN, 0)

			assertEquals(result, [1, 2, 3])
		},
	)

	await t.step(
		"handles strings",
		function handlesStrings() {
			const array = ["a", "b", "c", "d", "e"]
			const fn = _createWindow(2)(array)
			const result = fn("", 1)

			assertEquals(result, ["b", "c"])
		},
	)

	await t.step(
		"handles objects",
		function handlesObjects() {
			type Item = { readonly id: number }
			const array: ReadonlyArray<Item> = [
				{ id: 1 },
				{ id: 2 },
				{ id: 3 },
				{ id: 4 },
			]
			const fn = _createWindow(2)(array)
			const result = fn({ id: NaN }, 1)

			assertEquals(result, [{ id: 2 }, { id: 3 }])
		},
	)

	await t.step(
		"returns empty array when index beyond array bounds",
		function returnsEmptyBeyondBounds() {
			const array = [1, 2, 3]
			const fn = _createWindow(2)(array)
			const result = fn(NaN, 5)

			assertEquals(result, [])
		},
	)

	await t.step(
		"handles width larger than remaining elements",
		function handlesWidthLargerThanRemaining() {
			const array = [1, 2, 3, 4, 5]
			const fn = _createWindow(3)(array)
			const result = fn(NaN, 4)

			assertEquals(result, [5])
		},
	)

	await t.step(
		"handles zero width",
		function handlesZeroWidth() {
			const array = [1, 2, 3]
			const fn = _createWindow(0)(array)
			const result = fn(NaN, 0)

			assertEquals(result, [])
		},
	)

	await t.step(
		"handles negative width",
		function handlesNegativeWidth() {
			const array = [1, 2, 3]
			const fn = _createWindow(-2)(array)
			const result = fn(NaN, 0)

			// slice(0, -2) returns elements from start to 2 from end
			assertEquals(result, [1])
		},
	)

	await t.step(
		"handles negative index",
		function handlesNegativeIndex() {
			const array = [1, 2, 3, 4, 5]
			const fn = _createWindow(2)(array)
			const result = fn(NaN, -1)

			assertEquals(result, [])
		},
	)
})

Deno.test("_createWindow - property tests", async function (t) {
	await t.step(
		"property: window length equals width when valid",
		function propertyWindowLength() {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 5, maxLength: 20 }),
					fc.integer({ min: 1, max: 5 }),
					fc.integer({ min: 0, max: 10 }),
					function (
						arr: ReadonlyArray<number>,
						width: number,
						index: number,
					) {
						const fn = _createWindow(width)(arr)
						const result = fn(NaN, index)

						if (index >= 0 && index + width <= arr.length) {
							assertEquals(result.length, width)
						}
					},
				),
			)
		},
	)

	await t.step(
		"property: window contains correct elements",
		function propertyWindowElements() {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 5, maxLength: 20 }),
					fc.integer({ min: 1, max: 5 }),
					function (arr: ReadonlyArray<number>, width: number) {
						const index = 0
						const fn = _createWindow(width)(arr)
						const result = fn(NaN, index)

						if (width <= arr.length) {
							assertEquals(result[0], arr[index])
							assertEquals(result[result.length - 1], arr[index + width - 1])
						}
					},
				),
			)
		},
	)

	await t.step(
		"property: always returns array",
		function propertyReturnsArray() {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.integer({ min: -5, max: 20 }),
					fc.integer({ min: -5, max: 20 }),
					function (
						arr: ReadonlyArray<number>,
						width: number,
						index: number,
					) {
						const fn = _createWindow(width)(arr)
						const result = fn(NaN, index)

						assertEquals(Array.isArray(result), true)
					},
				),
			)
		},
	)

	await t.step(
		"property: curried functions can be reused",
		function propertyCurriedReuse() {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 5, maxLength: 20 }),
					fc.integer({ min: 1, max: 5 }),
					function (arr: ReadonlyArray<number>, width: number) {
						const createWindowWithWidth = _createWindow(width)
						const fn1 = createWindowWithWidth(arr)
						const fn2 = createWindowWithWidth(arr)

						const result1 = fn1(NaN, 0)
						const result2 = fn2(NaN, 0)

						assertEquals(result1, result2)
					},
				),
			)
		},
	)
})
