import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import map from "./index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isError from "../../monads/result/isError/index.ts"


Deno.test("map", async function mapTests(t) {
	await t.step(
		"transforms each element with function",
		function transformsElements() {
			const double = function (n: number): number {
				return n * 2
			}
			const result = map(double)([1, 2, 3, 4, 5])

			assertEquals(isOk(result), true)
			assertEquals(result.value, [2, 4, 6, 8, 10])
		},
	)

	await t.step(
		"handles type transformations",
		function handlesTypeTransformations() {
			const toString = function (n: number): string {
				return String(n)
			}
			const result = map(toString)([1, 2, 3])

			assertEquals(isOk(result), true)
			assertEquals(result.value, ["1", "2", "3"])
		},
	)

	await t.step(
		"preserves array length",
		function preservesLength() {
			const identity = function <T>(x: T): T {
				return x
			}
			const result = map(identity)([1, 2, 3, 4, 5])

			assertEquals(isOk(result), true)
			assertEquals(result.value.length, 5)
		},
	)

	await t.step(
		"handles empty arrays",
		function handlesEmptyArrays() {
			const result = map(function (n: number): number {
				return n * 2
			})([])

			assertEquals(isOk(result), true)
			assertEquals(result.value, [])
		},
	)

	await t.step(
		"returns error for non-array input",
		function returnsErrorForNonArray() {
			const result = map(function (n: number): number {
				return n * 2
			})(null as unknown as ReadonlyArray<number>)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals(result.error.code, "MAP_INVALID_INPUT")
				assertEquals(result.error.field, "array")
			}
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

			assertEquals(isOk(result), true)
			assertEquals(result.value, [
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

			assertEquals(isOk(result), true)
			assertEquals(result.value, [1, 4, 9, 16, 25])
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

				assertEquals(isOk(result), true)
				assertEquals(result.value.length, arr.length)
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
				if (isOk(doubleResult)) {
					const result1 = map(addOne)(doubleResult.value)
					const result2 = map(function (n: number): number {
						return addOne(double(n))
					})(arr)

					if (isOk(result1) && isOk(result2)) {
						assertEquals(result1.value, result2.value)
					}
				}
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

				assertEquals(isOk(result), true)
				assertEquals(result.value, arr)
			},
		),
	)
})
