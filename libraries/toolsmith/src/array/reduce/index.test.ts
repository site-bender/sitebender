import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import reduce from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isError from "../../monads/result/isError/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import isFailure from "../../monads/validation/isFailure/index.ts"

Deno.test("reduce - plain array path", async function reducePlainArrayTests(t) {
	await t.step(
		"sums numbers with plain array",
		function sumsNumbers() {
			function add(accumulator: number, item: number): number {
				return accumulator + item
			}

			const result = reduce<number, number>(add)(0)([1, 2, 3, 4, 5])

			assertEquals(result, 15)
		},
	)

	await t.step(
		"handles empty arrays",
		function handlesEmptyArrays() {
			function add(accumulator: number, item: number): number {
				return accumulator + item
			}

			const result = reduce<number, number>(add)(10)([])

			assertEquals(result, 10)
		},
	)

	await t.step(
		"concatenates strings",
		function concatenatesStrings() {
			function concat(accumulator: string, item: string): string {
				return accumulator + item
			}

			const result = reduce<string, string>(concat)("")([
				"Hello",
				" ",
				"World",
			])

			assertEquals(result, "Hello World")
		},
	)

	await t.step(
		"builds objects",
		function buildsObjects() {
			type Acc = { readonly [key: string]: number }

			function addToObj(accumulator: Acc, item: string): Acc {
				return { ...accumulator, [item]: item.length }
			}

			const result = reduce<string, Acc>(addToObj)({})([
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

			const result = reduce<number, number>(multiply)(1)([2, 3, 4])

			assertEquals(result, 24)
		},
	)

	await t.step(
		"transforms types during reduction",
		function transformsTypes() {
			function sumLengths(accumulator: number, item: string): number {
				return accumulator + item.length
			}

			const result = reduce<string, number>(sumLengths)(0)([
				"hello",
				"world",
			])

			assertEquals(result, 10)
		},
	)
})

Deno.test("reduce - Result monad path", async function reduceResultTests(t) {
	await t.step(
		"sums numbers wrapped in ok",
		function sumsNumbersInOk() {
			function add(accumulator: number, item: number): number {
				return accumulator + item
			}

			const result = reduce<number, number>(add)(0)(ok([1, 2, 3, 4, 5]))

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, 15)
			}
		},
	)

	await t.step(
		"handles empty arrays wrapped in ok",
		function handlesEmptyArraysInOk() {
			function add(accumulator: number, item: number): number {
				return accumulator + item
			}

			const result = reduce<number, number>(add)(10)(ok([]))

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, 10)
			}
		},
	)

	await t.step(
		"passes through error without processing",
		function passesErrorThrough() {
			function add(accumulator: number, item: number): number {
				return accumulator + item
			}

			const inputError = error({
				code: "UPSTREAM_ERROR",
				field: "data",
				messages: ["Upstream error occurred"],
				received: "null",
				expected: "Array",
				suggestion: "Fix upstream issue",
				severity: "requirement" as const,
			})

			const result = reduce<number, number>(add)(0)(inputError)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "UPSTREAM_ERROR")
			}
		},
	)

	await t.step(
		"concatenates strings wrapped in ok",
		function concatenatesStringsInOk() {
			function concat(accumulator: string, item: string): string {
				return accumulator + item
			}

			const result = reduce<string, string>(concat)("")(
				ok(["Hello", " ", "World"]),
			)

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, "Hello World")
			}
		},
	)

	await t.step(
		"transforms types wrapped in ok",
		function transformsTypesInOk() {
			function sumLengths(accumulator: number, item: string): number {
				return accumulator + item.length
			}

			const result = reduce<string, number>(sumLengths)(0)(
				ok(["hello", "world"]),
			)

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, 10)
			}
		},
	)
})

Deno.test(
	"reduce - Validation monad path",
	async function reduceValidationTests(t) {
		await t.step(
			"sums numbers wrapped in success",
			function sumsNumbersInSuccess() {
				function add(accumulator: number, item: number): number {
					return accumulator + item
				}

				const result = reduce<number, number>(add)(0)(success([1, 2, 3, 4, 5]))

				assertEquals(isSuccess(result), true)
				if (isSuccess(result)) {
					assertEquals(result.value, 15)
				}
			},
		)

		await t.step(
			"handles empty arrays wrapped in success",
			function handlesEmptyArraysInSuccess() {
				function add(accumulator: number, item: number): number {
					return accumulator + item
				}

				const result = reduce<number, number>(add)(10)(success([]))

				assertEquals(isSuccess(result), true)
				if (isSuccess(result)) {
					assertEquals(result.value, 10)
				}
			},
		)

		await t.step(
			"passes through failure without processing",
			function passesFailureThrough() {
				function add(accumulator: number, item: number): number {
					return accumulator + item
				}

				const inputFailure = failure([
					{
						code: "UPSTREAM_VALIDATION_ERROR",
						field: "data",
						messages: ["Validation failed upstream"],
						received: "null",
						expected: "Array",
						suggestion: "Fix validation issues",
						severity: "requirement" as const,
					},
				])

				const result = reduce<number, number>(add)(0)(inputFailure)

				assertEquals(isFailure(result), true)
				if (isFailure(result)) {
					assertEquals(result.errors.length, 1)
					assertEquals(result.errors[0].code, "UPSTREAM_VALIDATION_ERROR")
				}
			},
		)

		await t.step(
			"concatenates strings wrapped in success",
			function concatenatesStringsInSuccess() {
				function concat(accumulator: string, item: string): string {
					return accumulator + item
				}

				const result = reduce<string, string>(concat)("")(
					success(["Hello", " ", "World"]),
				)

				assertEquals(isSuccess(result), true)
				if (isSuccess(result)) {
					assertEquals(result.value, "Hello World")
				}
			},
		)

		await t.step(
			"transforms types wrapped in success",
			function transformsTypesInSuccess() {
				function sumLengths(accumulator: number, item: string): number {
					return accumulator + item.length
				}

				const result = reduce<string, number>(sumLengths)(0)(
					success(["hello", "world"]),
				)

				assertEquals(isSuccess(result), true)
				if (isSuccess(result)) {
					assertEquals(result.value, 10)
				}
			},
		)
	},
)

Deno.test(
	"reduce - property: sum with plain array matches native reduce",
	function sumProperty() {
		fc.assert(
			fc.property(fc.array(fc.integer()), function propertySum(arr) {
				function add(accumulator: number, item: number): number {
					return accumulator + item
				}

				const result = reduce<number, number>(add)(0)(arr)
				const expected = arr.reduce(function nativeReduce(acc, item) {
					return acc + item
				}, 0)

				assertEquals(result, expected)
			}),
		)
	},
)

Deno.test(
	"reduce - property: sum with Result ok matches native reduce",
	function sumPropertyResult() {
		fc.assert(
			fc.property(fc.array(fc.integer()), function propertySumResult(arr) {
				function add(accumulator: number, item: number): number {
					return accumulator + item
				}

				const result = reduce<number, number>(add)(0)(ok(arr))
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
	"reduce - property: sum with Validation success matches native reduce",
	function sumPropertyValidation() {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				function propertySumValidation(arr) {
					function add(accumulator: number, item: number): number {
						return accumulator + item
					}

					const result = reduce<number, number>(add)(0)(success(arr))
					const expected = arr.reduce(function nativeReduce(acc, item) {
						return acc + item
					}, 0)

					assertEquals(isSuccess(result), true)
					if (isSuccess(result)) {
						assertEquals(result.value, expected)
					}
				},
			),
		)
	},
)
