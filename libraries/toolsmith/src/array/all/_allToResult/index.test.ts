import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import _allToResult from "./index.ts"
import isOk from "../../../monads/result/isOk/index.ts"
import isError from "../../../monads/result/isError/index.ts"

Deno.test("_allToResult - basic functionality", async function (t) {
	await t.step(
		"returns Ok(true) when all elements satisfy predicate",
		function returnsOkTrue() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = _allToResult(isEven)([2, 4, 6, 8])

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, true)
			}
		},
	)

	await t.step(
		"returns Ok(false) when some elements don't satisfy predicate",
		function returnsOkFalse() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = _allToResult(isEven)([2, 3, 4, 6])

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, false)
			}
		},
	)

	await t.step(
		"returns Ok(true) for empty array",
		function returnsOkEmptyArray() {
			function isPositive(n: number): boolean {
				return n > 0
			}

			const result = _allToResult(isPositive)([])

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, true)
			}
		},
	)

	await t.step(
		"returns Error for invalid array",
		function returnsErrorInvalidArray() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = _allToResult(isEven)(
				null as unknown as ReadonlyArray<number>,
			)

			assertEquals(isError(result), true)
			if (isError(result)) {
				type E = {
					code: string
					field: string
					messages: ReadonlyArray<string>
					severity: string
				}
				assertEquals((result.error as E).code, "ALL_INVALID_ARRAY")
				assertEquals((result.error as E).field, "array")
			}
		},
	)

	await t.step(
		"returns Error for invalid predicate",
		function returnsErrorInvalidPredicate() {
			const result = _allToResult(null as unknown as (n: number) => boolean)([
				1,
				2,
				3,
			])

			assertEquals(isError(result), true)
			if (isError(result)) {
				type E = {
					code: string
					field: string
					messages: ReadonlyArray<string>
					severity: string
				}
				assertEquals((result.error as E).code, "ALL_INVALID_PREDICATE")
				assertEquals((result.error as E).field, "predicate")
			}
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

			const result = _allToResult(isAdult)(people)

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, true)
			}
		},
	)
})

Deno.test("_allToResult - property tests", async function (t) {
	await t.step(
		"property: valid inputs always return Ok",
		function propertyValidInputsOk() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function (arr) {
					function alwaysTrue(): boolean {
						return true
					}

					const result = _allToResult(alwaysTrue)(arr)
					assertEquals(isOk(result), true)
				}),
			)
		},
	)

	await t.step(
		"property: all satisfy => Ok(true)",
		function propertyAllSatisfyOkTrue() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function (arr) {
					function alwaysTrue(): boolean {
						return true
					}

					const result = _allToResult(alwaysTrue)(arr)
					if (isOk(result)) {
						assertEquals(result.value, true)
					}
				}),
			)
		},
	)
})
