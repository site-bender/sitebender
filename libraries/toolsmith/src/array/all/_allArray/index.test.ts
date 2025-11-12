import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import _allArray from "./index.ts"

Deno.test("_allArray - basic functionality", async function (t) {
	await t.step(
		"returns true when all elements satisfy predicate",
		function returnsTrue() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = _allArray(isEven)([2, 4, 6, 8])

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns false when some elements don't satisfy predicate",
		function returnsFalse() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = _allArray(isEven)([2, 3, 4, 6])

			assertEquals(result, false)
		},
	)

	await t.step(
		"returns true for empty array",
		function returnsEmptyArrayTrue() {
			function isPositive(n: number): boolean {
				return n > 0
			}

			const result = _allArray(isPositive)([])

			assertEquals(result, true)
		},
	)

	await t.step(
		"handles objects",
		function handlesObjects() {
			type Person = { readonly name: string; readonly age: number }
			function isAdult(person: Person): boolean {
				return person.age >= 18
			}

			const people: ReadonlyArray<Person> = [
				{ name: "Alice", age: 25 },
				{ name: "Bob", age: 30 },
			]

			const result = _allArray(isAdult)(people)

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns false for invalid predicate",
		function returnsInvalidPredicate() {
			const result = _allArray(null as unknown as (n: number) => boolean)([
				1,
				2,
				3,
			])

			assertEquals(result, false)
		},
	)

	await t.step(
		"returns false for invalid array",
		function returnsInvalidArray() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = _allArray(isEven)(
				null as unknown as ReadonlyArray<number>,
			)

			assertEquals(result, false)
		},
	)
})

Deno.test("_allArray - property tests", async function (t) {
	await t.step(
		"property: all elements satisfy predicate => returns true",
		function propertyAllSatisfy() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function (arr) {
					function alwaysTrue(): boolean {
						return true
					}

					const result = _allArray(alwaysTrue)(arr)
					assertEquals(result, true)
				}),
			)
		},
	)

	await t.step(
		"property: at least one element fails => returns false",
		function propertyOneFails() {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 1, max: 100 }), { minLength: 1 }),
					function (arr) {
						function alwaysFalse(): boolean {
							return false
						}

						const result = _allArray(alwaysFalse)(arr)
						assertEquals(result, false)
					},
				),
			)
		},
	)
})
