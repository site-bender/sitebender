import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import map from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import success from "../../monads/validation/success/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"

Deno.test("map - plain array", async function mapArrayTests(t) {
	await t.step(
		"transforms each element with function",
		function transformsElements() {
			const double = function (n: number): number {
				return n * 2
			}
			const result = map(double)([1, 2, 3, 4, 5])

			assertEquals(result, [2, 4, 6, 8, 10])
		},
	)

	await t.step(
		"handles type transformations",
		function handlesTypeTransformations() {
			const toString = function (n: number): string {
				return String(n)
			}
			const result = map(toString)([1, 2, 3])

			assertEquals(result, ["1", "2", "3"])
		},
	)

	await t.step(
		"preserves array length",
		function preservesLength() {
			const identity = function <T>(x: T): T {
				return x
			}
			const result = map(identity)([1, 2, 3, 4, 5])

			assertEquals((result as Array<number>).length, 5)
		},
	)

	await t.step(
		"handles empty arrays",
		function handlesEmptyArrays() {
			const result = map(function (n: number): number {
				return n * 2
			})([])

			assertEquals(result, [])
		},
	)

	await t.step(
		"works with objects",
		function worksWithObjects() {
			type Person = { readonly name: string; readonly age: number }
			type NameOnly = { readonly name: string }

			const extractName = function (p: Person): NameOnly {
				return { name: p.name }
			}
			const people: ReadonlyArray<Person> = [
				{ name: "Alice", age: 25 },
				{ name: "Bob", age: 30 },
			]

			const result = map(extractName)(people)

			assertEquals(result, [
				{ name: "Alice" },
				{ name: "Bob" },
			])
		},
	)

	await t.step(
		"handles complex transformations",
		function handlesComplexTransformations() {
			const square = function (n: number): number {
				return n * n
			}
			const result = map(square)([1, 2, 3, 4, 5])

			assertEquals(result, [1, 4, 9, 16, 25])
		},
	)
})

Deno.test("map - Result monad", async function mapResultTests(t) {
	await t.step(
		"maps over Result and returns Result",
		function mapsOverResult() {
			const double = function (n: number): number {
				return n * 2
			}
			const result = map(double)(ok([1, 2, 3]))

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, [2, 4, 6])
			}
		},
	)

	await t.step(
		"handles empty arrays in Result",
		function handlesEmptyInResult() {
			const double = function (n: number): number {
				return n * 2
			}
			const result = map(double)(ok([]))

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, [])
			}
		},
	)
})

Deno.test("map - Validation monad", async function mapValidationTests(t) {
	await t.step(
		"maps over Validation and returns Validation",
		function mapsOverValidation() {
			const double = function (n: number): number {
				return n * 2
			}
			const result = map(double)(success([1, 2, 3]))

			assertEquals(isSuccess(result), true)
			if (isSuccess(result)) {
				assertEquals(result.value, [2, 4, 6])
			}
		},
	)

	await t.step(
		"handles empty arrays in Validation",
		function handlesEmptyInValidation() {
			const double = function (n: number): number {
				return n * 2
			}
			const result = map(double)(success([]))

			assertEquals(isSuccess(result), true)
			if (isSuccess(result)) {
				assertEquals(result.value, [])
			}
		},
	)
})

Deno.test("map - invalid inputs", async function mapInvalidTests(t) {
	await t.step(
		"returns array unchanged when fn is not a function",
		function returnsUnchangedForBadFn() {
			const result = map(true as unknown as (n: number) => number)([1, 2, 3])

			assertEquals(result, [1, 2, 3])
		},
	)

	await t.step(
		"returns input unchanged when array is not valid",
		function returnsUnchangedForBadArray() {
			const double = function (n: number): number {
				return n * 2
			}
			const result = map(double)(false as unknown as ReadonlyArray<number>)

			assertEquals(result as unknown, false)
		},
	)

	await t.step(
		"returns undefined unchanged",
		function returnsUndefinedUnchanged() {
			const double = function (arg: number): number {
				return arg * 2
			}
			const result = map(double)(undefined as unknown as ReadonlyArray<number>)

			assertEquals(result as unknown, undefined)
		},
	)
})

Deno.test("map - property: preserves length", function lengthProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function propertyLength(arr) {
				const result = map(function (n: number): number {
					return n * 2
				})(arr)

				assertEquals((result as Array<number>).length, arr.length)
			},
		),
	)
})

Deno.test("map - property: composition", function compositionProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function propertyComposition(arr) {
				const addOne = function (n: number): number {
					return n + 1
				}
				const double = function (n: number): number {
					return n * 2
				}

				// map(f) . map(g) === map(f . g)
				const doubleResult = map(double)(arr)
				const result1 = map(addOne)(doubleResult as ReadonlyArray<number>)
				const result2 = map(function (n: number): number {
					return addOne(double(n))
				})(arr)

				assertEquals(result1, result2)
			},
		),
	)
})

Deno.test("map - property: identity", function identityProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.anything()),
			function propertyIdentity(arr) {
				const result = map(function <T>(x: T): T {
					return x
				})(arr)

				assertEquals(result, arr)
			},
		),
	)
})
