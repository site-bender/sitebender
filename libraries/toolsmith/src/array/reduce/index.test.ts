import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import reduce from "./index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isError from "../../monads/result/isError/index.ts"

Deno.test("reduce", async function reduceTests(t) {
	await t.step(
		"sums numbers with curried reducer",
		function sumsNumbers() {
			const add = function (acc: number) {
				return function addToAcc(item: number): number {
					return acc + item
				}
			}
			const result = reduce(add)(0)([1, 2, 3, 4, 5])

			assertEquals(isOk(result), true)
			assertEquals(result.value, 15)
		},
	)

	await t.step(
		"handles empty arrays",
		function handlesEmptyArrays() {
			const add = function (acc: number) {
				return function addToAcc(item: number): number {
					return acc + item
				}
			}
			const result = reduce(add)(10)([])

			assertEquals(isOk(result), true)
			assertEquals(result.value, 10) // Returns initial value
		},
	)

	await t.step(
		"concatenates strings",
		function concatenatesStrings() {
			const concat = function (acc: string) {
				return function concatWithAcc(item: string): string {
					return acc + item
				}
			}
			const result = reduce(concat)("")(["Hello", " ", "World"])

			assertEquals(isOk(result), true)
			assertEquals(result.value, "Hello World")
		},
	)

	await t.step(
		"builds objects",
		function buildsObjects() {
			type Acc = { readonly [key: string]: number }
			const addToObj = function (acc: Acc) {
				return function addItemToObj(item: string): Acc {
					return { ...acc, [item]: item.length }
				}
			}
			const result = reduce(addToObj)({} as Acc)(["a", "bb", "ccc"])

			assertEquals(isOk(result), true)
			assertEquals(result.value, { a: 1, bb: 2, ccc: 3 })
		},
	)

	await t.step(
		"multiplies numbers",
		function multipliesNumbers() {
			const multiply = function (acc: number) {
				return function multiplyWithAcc(item: number): number {
					return acc * item
				}
			}
			const result = reduce(multiply)(1)([2, 3, 4])

			assertEquals(isOk(result), true)
			assertEquals(result.value, 24)
		},
	)

	await t.step(
		"returns error for non-array input",
		function returnsErrorForNonArray() {
			const add = function (acc: number) {
				return function addToAcc(item: number): number {
					return acc + item
				}
			}
			const result = reduce(add)(0)(null as unknown as ReadonlyArray<number>)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "REDUCE_INVALID_INPUT")
				assertEquals(result.error.field, "array")
			}
		},
	)

	await t.step(
		"transforms types during reduction",
		function transformsTypes() {
			const sumLengths = function (acc: number) {
				return function addLength(item: string): number {
					return acc + item.length
				}
			}
			const result = reduce(sumLengths)(0)(["hello", "world"])

			assertEquals(isOk(result), true)
			assertEquals(result.value, 10)
		},
	)
})

Deno.test("reduce - property: sum is commutative", function sumProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function propertySum(arr) {
				const add = function (acc: number) {
					return function addToAcc(item: number): number {
						return acc + item
					}
				}
				const result = reduce(add)(0)(arr)

				assertEquals(isOk(result), true)
				const sum = arr.reduce(function (acc, item) {
					return acc + item
				}, 0)
				assertEquals(result.value, sum)
			},
		),
	)
})

Deno.test("reduce - property: empty array returns initial", function emptyArrayProperty() {
	fc.assert(
		fc.property(
			fc.integer(),
			function propertyEmptyArray(initial) {
				const add = function (acc: number) {
					return function addToAcc(item: number): number {
						return acc + item
					}
				}
				const result = reduce(add)(initial)([])

				assertEquals(isOk(result), true)
				assertEquals(result.value, initial)
			},
		),
	)
})
