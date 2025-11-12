import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import all from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isError from "../../monads/result/isError/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import isFailure from "../../monads/validation/isFailure/index.ts"

Deno.test("all - plain array", async function allArrayTests(t) {
	await t.step(
		"returns true when all elements satisfy predicate",
		function returnsTrue() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = all(isEven)([2, 4, 6, 8])

			assertEquals(result, true)
		},
	)

	await t.step(
		"returns false when some elements don't satisfy predicate",
		function returnsFalse() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = all(isEven)([2, 3, 4, 6])

			assertEquals(result, false)
		},
	)

	await t.step(
		"returns true for empty array",
		function returnsEmptyArrayTrue() {
			function isPositive(n: number): boolean {
				return n > 0
			}

			const result = all(isPositive)([])

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

			const result = all(isAdult)(people)

			assertEquals(result, true)
		},
	)

	await t.step(
		"handles mixed ages",
		function handlesMixedAges() {
			type Person = { readonly name: string; readonly age: number }
			function isAdult(person: Person): boolean {
				return person.age >= 18
			}

			const people: ReadonlyArray<Person> = [
				{ name: "Alice", age: 25 },
				{ name: "Bob", age: 15 },
			]

			const result = all(isAdult)(people)

			assertEquals(result, false)
		},
	)
})

Deno.test("all - Result monad", async function allResultTests(t) {
	await t.step(
		"returns Ok(true) when all elements satisfy predicate",
		function returnsOkTrue() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = all(isEven)(ok([2, 4, 6, 8]))

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

			const result = all(isEven)(ok([2, 3, 4, 6]))

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

			const result = all(isPositive)(ok([]))

			assertEquals(isOk(result), true)
			if (isOk(result)) {
				assertEquals(result.value, true)
			}
		},
	)

	await t.step(
		"passes through Error unchanged",
		function passesErrorThrough() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			type E = {
				code: string
				field: string
				messages: ReadonlyArray<string>
				severity: string
			}

			const inputError = error<E>({
				code: "UPSTREAM_ERROR",
				field: "data",
				messages: ["Upstream system failed"],
				severity: "requirement",
			})

			const result = all(isEven)(inputError)

			assertEquals(isError(result), true)
			if (isError(result)) {
				assertEquals((result.error as E).code, "UPSTREAM_ERROR")
			}
		},
	)
})

Deno.test("all - Validation monad", async function allValidationTests(t) {
	await t.step(
		"returns Success(true) when all elements satisfy predicate",
		function returnsSuccessTrue() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			const result = all(isEven)(success([2, 4, 6, 8]))

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

			const result = all(isEven)(success([2, 3, 4, 6]))

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

			const result = all(isPositive)(success([]))

			assertEquals(isSuccess(result), true)
			if (isSuccess(result)) {
				assertEquals(result.value, true)
			}
		},
	)

	await t.step(
		"passes through Failure unchanged",
		function passesFailureThrough() {
			function isEven(n: number): boolean {
				return n % 2 === 0
			}

			type E = {
				code: string
				field: string
				messages: ReadonlyArray<string>
				severity: string
			}

			const inputFailure = failure<E>([{
				code: "UPSTREAM_ERROR",
				field: "data",
				messages: ["Upstream validation failed"],
				severity: "requirement",
			}])

			const result = all(isEven)(inputFailure)

			assertEquals(isFailure(result), true)
			if (isFailure(result)) {
				assertEquals((result.errors[0] as E).code, "UPSTREAM_ERROR")
			}
		},
	)
})

Deno.test("all - property tests", async function allPropertyTests(t) {
	await t.step(
		"property: all elements satisfy predicate => returns true",
		function propertyAllSatisfy() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function (arr) {
					function alwaysTrue(): boolean {
						return true
					}

					const result = all(alwaysTrue)(arr)
					assertEquals(result, true)
				}),
			)
		},
	)

	await t.step(
		"property: Result monad preserves structure",
		function propertyResultStructure() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function (arr) {
					function alwaysTrue(): boolean {
						return true
					}

					const result = all(alwaysTrue)(ok(arr))
					assertEquals(isOk(result), true)
				}),
			)
		},
	)

	await t.step(
		"property: Validation monad preserves structure",
		function propertyValidationStructure() {
			fc.assert(
				fc.property(fc.array(fc.integer()), function (arr) {
					function alwaysTrue(): boolean {
						return true
					}

					const result = all(alwaysTrue)(success(arr))
					assertEquals(isSuccess(result), true)
				}),
			)
		},
	)
})
