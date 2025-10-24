import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import _reduceToValidation from "./index.ts"
import isSuccess from "../../../monads/validation/isSuccess/index.ts"
import isFailure from "../../../monads/validation/isFailure/index.ts"

Deno.test("_reduceToValidation", async function reduceToValidationTests(t) {
	await t.step(
		"sums numbers and returns Validation success",
		function sumsNumbers() {
			function add(accumulator: number, item: number): number {
				return accumulator + item
			}

			const result = _reduceToValidation<number, number>(add)(0)([
				1,
				2,
				3,
				4,
				5,
			])

			assertEquals(isSuccess(result), true)
			if (isSuccess(result)) {
				assertEquals(result.value, 15)
			}
		},
	)

	await t.step(
		"handles empty arrays by returning success with initial value",
		function handlesEmptyArrays() {
			function add(accumulator: number, item: number): number {
				return accumulator + item
			}

			const result = _reduceToValidation<number, number>(add)(10)([])

			assertEquals(isSuccess(result), true)
			if (isSuccess(result)) {
				assertEquals(result.value, 10)
			}
		},
	)

	await t.step(
		"concatenates strings and returns Validation success",
		function concatenatesStrings() {
			function concat(accumulator: string, item: string): string {
				return accumulator + item
			}

			const result = _reduceToValidation<string, string>(concat)("")([
				"Hello",
				" ",
				"World",
			])

			assertEquals(isSuccess(result), true)
			if (isSuccess(result)) {
				assertEquals(result.value, "Hello World")
			}
		},
	)

	await t.step(
		"builds objects from array items and returns Validation success",
		function buildsObjects() {
			type Acc = { readonly [key: string]: number }

			function addToObj(accumulator: Acc, item: string): Acc {
				return { ...accumulator, [item]: item.length }
			}

			const result = _reduceToValidation<string, Acc>(addToObj)({})([
				"a",
				"bb",
				"ccc",
			])

			assertEquals(isSuccess(result), true)
			if (isSuccess(result)) {
				assertEquals(result.value, { a: 1, bb: 2, ccc: 3 })
			}
		},
	)

	await t.step(
		"multiplies numbers and returns Validation success",
		function multipliesNumbers() {
			function multiply(accumulator: number, item: number): number {
				return accumulator * item
			}

			const result = _reduceToValidation<number, number>(multiply)(1)([2, 3, 4])

			assertEquals(isSuccess(result), true)
			if (isSuccess(result)) {
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

			const result = _reduceToValidation<string, number>(sumLengths)(0)([
				"hello",
				"world",
			])

			assertEquals(isSuccess(result), true)
			if (isSuccess(result)) {
				assertEquals(result.value, 10)
			}
		},
	)

	await t.step(
		"returns failure for non-array input",
		function returnsFailureForNonArray() {
			function add(accumulator: number, item: number): number {
				return accumulator + item
			}

			const result = _reduceToValidation<number, number>(add)(42)(
				null as unknown as ReadonlyArray<number>,
			)

			assertEquals(isFailure(result), true)
			if (isFailure(result)) {
				assertEquals(result.errors.length, 1)
				assertEquals(result.errors[0].code, "REDUCE_INVALID_INPUT")
				assertEquals(result.errors[0].field, "array")
				assertEquals(result.errors[0].expected, "Array")
				assertEquals(result.errors[0].received, "object")
			}
		},
	)

	await t.step(
		"returns failure for undefined input",
		function returnsFailureForUndefined() {
			function add(accumulator: number, item: number): number {
				return accumulator + item
			}

			const result = _reduceToValidation<number, number>(add)(0)(
				undefined as unknown as ReadonlyArray<number>,
			)

			assertEquals(isFailure(result), true)
			if (isFailure(result)) {
				assertEquals(result.errors.length, 1)
				assertEquals(result.errors[0].code, "REDUCE_INVALID_INPUT")
				assertEquals(result.errors[0].field, "array")
				assertEquals(result.errors[0].received, "undefined")
			}
		},
	)
})

Deno.test(
	"_reduceToValidation - property: sum matches native reduce when success",
	function sumProperty() {
		fc.assert(
			fc.property(fc.array(fc.integer()), function propertySum(arr) {
				function add(accumulator: number, item: number): number {
					return accumulator + item
				}

				const result = _reduceToValidation<number, number>(add)(0)(arr)
				const expected = arr.reduce(function nativeReduce(acc, item) {
					return acc + item
				}, 0)

				assertEquals(isSuccess(result), true)
				if (isSuccess(result)) {
					assertEquals(result.value, expected)
				}
			}),
		)
	},
)

Deno.test(
	"_reduceToValidation - property: empty array returns success with initial",
	function emptyArrayProperty() {
		fc.assert(
			fc.property(fc.integer(), function propertyEmptyArray(initial) {
				function add(accumulator: number, item: number): number {
					return accumulator + item
				}

				const result = _reduceToValidation<number, number>(add)(initial)([])

				assertEquals(isSuccess(result), true)
				if (isSuccess(result)) {
					assertEquals(result.value, initial)
				}
			}),
		)
	},
)
