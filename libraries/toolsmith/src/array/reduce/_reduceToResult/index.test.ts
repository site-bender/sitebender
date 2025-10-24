import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import _reduceToResult from "./index.ts"
import isOk from "../../../monads/result/isOk/index.ts"
import isError from "../../../monads/result/isError/index.ts"

Deno.test("_reduceToResult", async function reduceToResultTests(t) {
	await t.step(
		"sums numbers and returns Result ok",
		function sumsNumbers() {
			function add(accumulator: number, item: number): number {
				return accumulator + item
			}

			const result = _reduceToResult<number, number>(add)(0)([1, 2, 3, 4, 5])

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, 15)
			}
		},
	)

	await t.step(
		"handles empty arrays by returning ok with initial value",
		function handlesEmptyArrays() {
			function add(accumulator: number, item: number): number {
				return accumulator + item
			}

			const result = _reduceToResult<number, number>(add)(10)([])

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, 10)
			}
		},
	)

	await t.step(
		"concatenates strings and returns Result ok",
		function concatenatesStrings() {
			function concat(accumulator: string, item: string): string {
				return accumulator + item
			}

			const result = _reduceToResult<string, string>(concat)("")([
				"Hello",
				" ",
				"World",
			])

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, "Hello World")
			}
		},
	)

	await t.step(
		"builds objects from array items and returns Result ok",
		function buildsObjects() {
			type Acc = { readonly [key: string]: number }

			function addToObj(accumulator: Acc, item: string): Acc {
				return { ...accumulator, [item]: item.length }
			}

			const result = _reduceToResult<string, Acc>(addToObj)({})([
				"a",
				"bb",
				"ccc",
			])

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, { a: 1, bb: 2, ccc: 3 })
			}
		},
	)

	await t.step(
		"multiplies numbers and returns Result ok",
		function multipliesNumbers() {
			function multiply(accumulator: number, item: number): number {
				return accumulator * item
			}

			const result = _reduceToResult<number, number>(multiply)(1)([2, 3, 4])

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, 24)
			}
		},
	)

	await t.step(
		"transforms types during reduction (string to number)",
		function transformsTypes() {
			function sumLengths(accumulator: number, item: string): number {
				return accumulator + item.length
			}

			const result = _reduceToResult<string, number>(sumLengths)(0)([
				"hello",
				"world",
			])

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, 10)
			}
		},
	)

	await t.step(
		"returns error for non-array input",
		function returnsErrorForNonArray() {
			function add(accumulator: number, item: number): number {
				return accumulator + item
			}

			const result = _reduceToResult<number, number>(add)(42)(
				null as unknown as ReadonlyArray<number>,
			)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "REDUCE_INVALID_INPUT")
				assertEquals(result.error.field, "array")
				assertEquals(result.error.expected, "Array")
				assertEquals(result.error.received, "object")
			}
		},
	)

	await t.step(
		"returns error for undefined input",
		function returnsErrorForUndefined() {
			function add(accumulator: number, item: number): number {
				return accumulator + item
			}

			const result = _reduceToResult<number, number>(add)(0)(
				undefined as unknown as ReadonlyArray<number>,
			)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "REDUCE_INVALID_INPUT")
				assertEquals(result.error.field, "array")
				assertEquals(result.error.received, "undefined")
			}
		},
	)
})

Deno.test(
	"_reduceToResult - property: sum matches native reduce when ok",
	function sumProperty() {
		fc.assert(
			fc.property(fc.array(fc.integer()), function propertySum(arr) {
				function add(accumulator: number, item: number): number {
					return accumulator + item
				}

				const result = _reduceToResult<number, number>(add)(0)(arr)
				const expected = arr.reduce(function nativeReduce(acc, item) {
					return acc + item
				}, 0)

				assertEquals(isOk(result), true)
				if (isOk(result)) {
					assertEquals(result.value, expected)
				}
			}),
		)
	},
)

Deno.test(
	"_reduceToResult - property: empty array returns ok with initial",
	function emptyArrayProperty() {
		fc.assert(
			fc.property(fc.integer(), function propertyEmptyArray(initial) {
				function add(accumulator: number, item: number): number {
					return accumulator + item
				}

				const result = _reduceToResult<number, number>(add)(initial)([])

				assertEquals(isOk(result), true)
				if (isOk(result)) {
					assertEquals(result.value, initial)
				}
			}),
		)
	},
)
