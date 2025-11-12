import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import _allToValidation from "./index.ts"
import isSuccess from "../../../monads/validation/isSuccess/index.ts"
import isFailure from "../../../monads/validation/isFailure/index.ts"

Deno.test("_allToValidation - basic functionality", async function (t) {
	await t.step(
		"returns Success(true) when all elements satisfy predicate",
		function returnsSuccessTrue() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = _allToValidation(isEven)([2, 4, 6, 8])

			assertEquals(isSuccess(result), true)
			if (isSuccess(result)) {
				assertEquals(result.value, true)
			}
		},
	)

	await t.step(
		"returns Success(false) when some elements don't satisfy predicate",
		function returnsSuccessFalse() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = _allToValidation(isEven)([2, 3, 4, 6])

			assertEquals(isSuccess(result), true)
			if (isSuccess(result)) {
				assertEquals(result.value, false)
			}
		},
	)

	await t.step(
		"returns Success(true) for empty array",
		function returnsSuccessEmptyArray() {
			function isPositive(n: number): boolean {
				return n > 0
			}

			const result = _allToValidation(isPositive)([])

			assertEquals(isSuccess(result), true)
			if (isSuccess(result)) {
				assertEquals(result.value, true)
			}
		},
	)

	await t.step(
		"returns Failure for invalid array",
		function returnsFailureInvalidArray() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = _allToValidation(isEven)(
				null as unknown as ReadonlyArray<number>,
			)

			assertEquals(isFailure(result), true)
			if (isFailure(result)) {
				type E = {
					code: string
					field: string
					messages: ReadonlyArray<string>
					severity: string
				}
				assertEquals((result.errors[0] as E).code, "ALL_INVALID_ARRAY")
				assertEquals((result.errors[0] as E).field, "array")
			}
		},
	)

	await t.step(
		"returns Failure for invalid predicate",
		function returnsFailureInvalidPredicate() {
			const result = _allToValidation(
				null as unknown as (n: number) => boolean,
			)([1, 2, 3])

			assertEquals(isFailure(result), true)
			if (isFailure(result)) {
				type E = {
					code: string
					field: string
					messages: ReadonlyArray<string>
					severity: string
				}
				assertEquals((result.errors[0] as E).code, "ALL_INVALID_PREDICATE")
				assertEquals((result.errors[0] as E).field, "predicate")
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

			const result = _allToValidation(isAdult)(people)

			assertEquals(isSuccess(result), true)
			if (isSuccess(result)) {
				assertEquals(result.value, true)
			}
		},
	)
})

Deno.test("_allToValidation - property tests", async function (t) {
	await t.step(
		"property: valid inputs always return Success",
		function propertyValidInputsSuccess() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function (arr) {
					function alwaysTrue(): boolean {
						return true
					}

					const result = _allToValidation(alwaysTrue)(arr)
					assertEquals(isSuccess(result), true)
				}),
			)
		},
	)

	await t.step(
		"property: all satisfy => Success(true)",
		function propertyAllSatisfySuccessTrue() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function (arr) {
					function alwaysTrue(): boolean {
						return true
					}

					const result = _allToValidation(alwaysTrue)(arr)
					if (isSuccess(result)) {
						assertEquals(result.value, true)
					}
				}),
			)
		},
	)
})
