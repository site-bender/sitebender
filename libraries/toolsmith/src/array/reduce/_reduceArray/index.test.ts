import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import _reduceArray from "./index.ts"

Deno.test("_reduceArray", async function reduceArrayTests(t) {
	await t.step(
		"sums numbers using plain array reducer",
		function sumsNumbers() {
			function add(accumulator: number, item: number): number {
				return accumulator + item
			}

			const result = _reduceArray<number, number>(add)(0)([1, 2, 3, 4, 5])

			assertEquals(result, 15)
		},
	)

	await t.step(
		"handles empty arrays by returning initial value",
		function handlesEmptyArrays() {
			function add(accumulator: number, item: number): number {
				return accumulator + item
			}

			const result = _reduceArray<number, number>(add)(10)([])

			assertEquals(result, 10)
		},
	)

	await t.step(
		"concatenates strings",
		function concatenatesStrings() {
			function concat(accumulator: string, item: string): string {
				return accumulator + item
			}

			const result = _reduceArray<string, string>(concat)("")([
				"Hello",
				" ",
				"World",
			])

			assertEquals(result, "Hello World")
		},
	)

	await t.step(
		"builds objects from array items",
		function buildsObjects() {
			type Acc = { readonly [key: string]: number }

			function addToObj(accumulator: Acc, item: string): Acc {
				return { ...accumulator, [item]: item.length }
			}

			const result = _reduceArray<string, Acc>(addToObj)({})([
				"a",
				"bb",
				"ccc",
			])

			assertEquals(result, { a: 1, bb: 2, ccc: 3 })
		},
	)

	await t.step(
		"multiplies numbers",
		function multipliesNumbers() {
			function multiply(accumulator: number, item: number): number {
				return accumulator * item
			}

			const result = _reduceArray<number, number>(multiply)(1)([2, 3, 4])

			assertEquals(result, 24)
		},
	)

	await t.step(
		"transforms types during reduction (string to number)",
		function transformsTypes() {
			function sumLengths(accumulator: number, item: string): number {
				return accumulator + item.length
			}

			const result = _reduceArray<string, number>(sumLengths)(0)([
				"hello",
				"world",
			])

			assertEquals(result, 10)
		},
	)

	await t.step(
		"returns initial value for non-array input",
		function returnsInitialForNonArray() {
			function add(accumulator: number, item: number): number {
				return accumulator + item
			}

			const result = _reduceArray<number, number>(add)(42)(
				null as unknown as ReadonlyArray<number>,
			)

			assertEquals(result, 42)
		},
	)
})

Deno.test(
	"_reduceArray - property: sum matches native reduce",
	function sumProperty() {
		fc.assert(
			fc.property(fc.array(fc.integer()), function propertySum(arr) {
				function add(accumulator: number, item: number): number {
					return accumulator + item
				}

				const result = _reduceArray<number, number>(add)(0)(arr)
				const expected = arr.reduce(function nativeReduce(acc, item) {
					return acc + item
				}, 0)

				assertEquals(result, expected)
			}),
		)
	},
)

Deno.test(
	"_reduceArray - property: empty array always returns initial",
	function emptyArrayProperty() {
		fc.assert(
			fc.property(fc.integer(), function propertyEmptyArray(initial) {
				function add(accumulator: number, item: number): number {
					return accumulator + item
				}

				const result = _reduceArray<number, number>(add)(initial)([])

				assertEquals(result, initial)
			}),
		)
	},
)
