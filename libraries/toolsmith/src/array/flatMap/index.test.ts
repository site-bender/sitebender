import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import flatMap from "./index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isError from "../../monads/result/isError/index.ts"

Deno.test("flatMap", async function (t) {
	await t.step("returns Ok with flattened mapped array", function () {
		const array = [1, 2, 3]
		const duplicateElements = function (
			element: number,
		): ReadonlyArray<number> {
			return [element, element]
		}
		const result = flatMap(duplicateElements)(array)

		assertEquals(isOk(result), true)
		if (isOk(result)) {
			assertEquals(result.value, [1, 1, 2, 2, 3, 3])
		}
	})

	await t.step("returns Ok with empty array when input is empty", function () {
		const array: ReadonlyArray<number> = []
		const duplicateElements = function (
			element: number,
		): ReadonlyArray<number> {
			return [element, element]
		}
		const result = flatMap(duplicateElements)(array)

		assertEquals(isOk(result), true)
		if (isOk(result)) {
			assertEquals(result.value, [])
		}
	})

	await t.step(
		"returns Ok with flattened array when function returns empty arrays",
		function () {
			const array = [1, 2, 3]
			const returnEmpty = function (_element: number): ReadonlyArray<number> {
				return []
			}
			const result = flatMap(returnEmpty)(array)

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, [])
			}
		},
	)

	await t.step(
		"returns Ok with flattened array when function returns variable length arrays",
		function () {
			const array = [1, 2, 3]
			const repeatByValue = function (
				element: number,
			): ReadonlyArray<number> {
				return Array(element).fill(element)
			}
			const result = flatMap(repeatByValue)(array)

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, [1, 2, 2, 3, 3, 3])
			}
		},
	)

	await t.step(
		"returns Ok with transformed and flattened array",
		function () {
			const array = ["hello", "world"]
			const splitToChars = function (str: string): ReadonlyArray<string> {
				return str.split("")
			}
			const result = flatMap(splitToChars)(array)

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, [
					"h",
					"e",
					"l",
					"l",
					"o",
					"w",
					"o",
					"r",
					"l",
					"d",
				])
			}
		},
	)

	await t.step("returns Error when input is null", function () {
		const duplicateElements = function (
			element: number,
		): ReadonlyArray<number> {
			return [element, element]
		}
		const result = flatMap(duplicateElements)(
			null as unknown as ReadonlyArray<number>,
		)

		assertEquals(isError(result), true)
		if (isError(result)) {
			assertEquals(result.error.code, "FLATMAP_INVALID_INPUT")
			assertEquals(result.error.field, "array")
			assertEquals(result.error.severity, "requirement")
		}
	})

	await t.step("returns Error when input is undefined", function () {
		const duplicateElements = function (
			element: number,
		): ReadonlyArray<number> {
			return [element, element]
		}
		const result = flatMap(duplicateElements)(
			undefined as unknown as ReadonlyArray<number>,
		)

		assertEquals(isError(result), true)
	})

	await t.step("returns Error when input is a string", function () {
		const duplicateElements = function (
			element: number,
		): ReadonlyArray<number> {
			return [element, element]
		}
		const result = flatMap(duplicateElements)(
			"not an array" as unknown as ReadonlyArray<number>,
		)

		assertEquals(isError(result), true)
	})

	await t.step("returns Error when input is a number", function () {
		const duplicateElements = function (
			element: number,
		): ReadonlyArray<number> {
			return [element, element]
		}
		const result = flatMap(duplicateElements)(
			42 as unknown as ReadonlyArray<number>,
		)

		assertEquals(isError(result), true)
	})

	await t.step("returns Error when input is an object", function () {
		const duplicateElements = function (
			element: number,
		): ReadonlyArray<number> {
			return [element, element]
		}
		const result = flatMap(duplicateElements)(
			{ a: 1 } as unknown as ReadonlyArray<number>,
		)

		assertEquals(isError(result), true)
	})

	await t.step(
		"property: valid array input always returns Ok result",
		function () {
			fc.assert(
				fc.property(fc.array(fc.integer()), function (arr) {
					const identity = function (x: number): ReadonlyArray<number> {
						return [x]
					}
					const result = flatMap(identity)(arr)
					assertEquals(isOk(result), true)
				}),
			)
		},
	)

	await t.step(
		"property: flatMap with identity function equals original array",
		function () {
			fc.assert(
				fc.property(fc.array(fc.integer()), function (arr) {
					const identity = function (x: number): ReadonlyArray<number> {
						return [x]
					}
					const result = flatMap(identity)(arr)
					if (isOk(result)) {
						assertEquals(result.value, arr)
					}
				}),
			)
		},
	)

	await t.step(
		"property: flatMap flattens one level of nesting",
		function () {
			fc.assert(
				fc.property(fc.array(fc.integer()), function (arr) {
					const duplicate = function (x: number): ReadonlyArray<number> {
						return [x, x]
					}
					const result = flatMap(duplicate)(arr)
					if (isOk(result)) {
						assertEquals(result.value.length, arr.length * 2)
					}
				}),
			)
		},
	)
})
