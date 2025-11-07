import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import map from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import success from "../../monads/validation/success/index.ts"

Deno.test("map - plain array", async function mapArrayTests(t) {
	await t.step(
		"transforms each element with function",
		function transformsElements() {
			function double(n: number): number {
				return n * 2
			}
			const result = map(double)([1, 2, 3, 4, 5])

			assertEquals(result, [2, 4, 6, 8, 10])
		},
	)

	await t.step(
		"handles type transformations",
		function handlesTypeTransformations() {
			function toString(n: number): string {
				return String(n)
			}
			const result = map(toString)([1, 2, 3])

			assertEquals(result, ["1", "2", "3"])
		},
	)

	await t.step(
		"preserves array length",
		function preservesLength() {
			function identity<T>(x: T): T {
				return x
			}
			const result = map(identity)([1, 2, 3, 4, 5])

			assertEquals(result, [1, 2, 3, 4, 5])
		},
	)

	await t.step(
		"handles empty arrays",
		function handlesEmptyArrays() {
			function double(n: number): number {
				return n * 2
			}
			const result = map(double)([])

			assertEquals(result, [])
		},
	)

	await t.step(
		"works with objects",
		function worksWithObjects() {
			type Person = { readonly name: string; readonly age: number }
			type NameOnly = { readonly name: string }

			function extractName(p: Person): NameOnly {
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
			function square(n: number): number {
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
			function double(n: number): number {
				return n * 2
			}
			const result = map(double)(ok([1, 2, 3]))

			assertEquals(result, ok([2, 4, 6]))
		},
	)

	await t.step(
		"handles empty arrays in Result",
		function handlesEmptyInResult() {
			function double(n: number): number {
				return n * 2
			}
			const result = map(double)(ok([]))

			assertEquals(result, ok([]))
		},
	)
})

Deno.test("map - Validation monad", async function mapValidationTests(t) {
	await t.step(
		"maps over Validation and returns Validation",
		function mapsOverValidation() {
			function double(n: number): number {
				return n * 2
			}
			const result = map(double)(success([1, 2, 3]))

			assertEquals(result, success([2, 4, 6]))
		},
	)

	await t.step(
		"handles empty arrays in Validation",
		function handlesEmptyInValidation() {
			function double(n: number): number {
				return n * 2
			}
			const result = map(double)(success([]))

			assertEquals(result, success([]))
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
			function double(n: number): number {
				return n * 2
			}
			const result = map(double)(false as unknown as ReadonlyArray<number>)

			assertEquals(result as unknown, false)
		},
	)

	await t.step(
		"returns undefined unchanged",
		function returnsUndefinedUnchanged() {
			function double(arg: number): number {
				return arg * 2
			}
			const result = map(double)(undefined as unknown as ReadonlyArray<number>)

			assertEquals(result, undefined)
		},
	)
})

Deno.test("map - property: preserves length", function lengthProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function propertyLength(arr) {
				function double(n: number): number {
					return n * 2
				}
				const result = map(double)(arr) as ReadonlyArray<number>

				assertEquals(result.length, arr.length)
			},
		),
	)
})

Deno.test("map - property: composition", function compositionProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			function propertyComposition(arr) {
				function addOne(n: number): number {
					return n + 1
				}
				function double(n: number): number {
					return n * 2
				}
				function composed(n: number): number {
					return addOne(double(n))
				}

				// map(f) . map(g) === map(f . g)
				const doubleResult = map(double)(arr) as ReadonlyArray<number>
				const result1 = map(addOne)(doubleResult)
				const result2 = map(composed)(arr)

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
				function identity<T>(x: T): T {
					return x
				}
				const result = map(identity)(arr)

				assertEquals(result, arr)
			},
		),
	)
})
