import { assertEquals } from "@std/assert"
import * as fc from "fast-check"
import error from "../../monads/result/error/index.ts"
import ok from "../../monads/result/ok/index.ts"
import failure from "../../monads/validation/failure/index.ts"
import success from "../../monads/validation/success/index.ts"
import at from "./index.ts"

Deno.test("at - plain array", async function atArrayTests(t) {
	await t.step("gets element at positive index", function getPositiveIndex() {
		const array = ["a", "b", "c", "d", "e"] as const
		const result = at(2)(array)
		assertEquals(result, "c")
	})

	await t.step("gets element at index 0", function getIndexZero() {
		const array = ["first", "second", "third"] as const
		const result = at(0)(array)
		assertEquals(result, "first")
	})

	await t.step("gets last element with index -1", function getNegativeOne() {
		const array = [1, 2, 3, 4, 5] as const
		const result = at(-1)(array)
		assertEquals(result, 5)
	})

	await t.step("returns undefined for out of bounds", function outOfBounds() {
		const array = ["a", "b", "c"] as const
		const result = at(10)(array)
		assertEquals(result, undefined)
	})

	await t.step("handles empty array", function emptyArray() {
		const array: ReadonlyArray<string> = []
		const result = at(0)(array)
		assertEquals(result, undefined)
	})

	await t.step("works with objects", function worksWithObjects() {
		const array = [{ id: 1 }, { id: 2 }, { id: 3 }] as const
		const result = at(1)(array)
		assertEquals(result, { id: 2 })
	})
})

Deno.test("at - Result monad", async function atResultTests(t) {
	await t.step("gets element from Ok array", function okPath() {
		const array = ok(["a", "b", "c", "d", "e"] as const)
		const result = at(2)(array)
		assertEquals(result, ok("c"))
	})

	await t.step("handles out of bounds with Ok", function okOutOfBounds() {
		const array = ok(["a", "b", "c"] as const)
		const result = at(10)(array)
		assertEquals(result, ok(undefined))
	})

	await t.step("passes through Error unchanged", function errorPassthrough() {
		const err = error({
			code: "TEST_ERROR",
			field: "test",
			messages: ["Test error"],
			received: "invalid",
			expected: "valid",
			suggestion: "Fix it",
			severity: "requirement" as const,
		})
		const result = at(0)(err)
		assertEquals(result, err)
	})

	await t.step("handles empty Ok array", function okEmptyArray() {
		const array = ok([] as ReadonlyArray<string>)
		const result = at(0)(array)
		assertEquals(result, ok(undefined))
	})

	await t.step("handles negative index with Ok", function okNegativeIndex() {
		const array = ok([1, 2, 3, 4, 5] as const)
		const result = at(-2)(array)
		assertEquals(result, ok(4))
	})
})

Deno.test("at - Validation monad", async function atValidationTests(t) {
	await t.step("gets element from Success array", function successPath() {
		const array = success(["a", "b", "c", "d", "e"] as const)
		const result = at(2)(array)
		assertEquals(result, success("c"))
	})

	await t.step(
		"handles out of bounds with Success",
		function successOutOfBounds() {
			const array = success(["a", "b", "c"] as const)
			const result = at(10)(array)
			assertEquals(result, success(undefined))
		},
	)

	await t.step(
		"passes through Failure unchanged",
		function failurePassthrough() {
			const fail = failure([{
				code: "TEST_ERROR",
				field: "test",
				messages: ["Test error"],
				received: "invalid",
				expected: "valid",
				suggestion: "Fix it",
				severity: "requirement" as const,
			}])
			const result = at(0)(fail)
			assertEquals(result, fail)
		},
	)

	await t.step("handles empty Success array", function successEmptyArray() {
		const array = success([] as ReadonlyArray<string>)
		const result = at(0)(array)
		assertEquals(result, success(undefined))
	})

	await t.step(
		"handles negative index with Success",
		function successNegativeIndex() {
			const array = success([1, 2, 3, 4, 5] as const)
			const result = at(-2)(array)
			assertEquals(result, success(4))
		},
	)
})

Deno.test("at - invalid inputs", async function atInvalidTests(t) {
	await t.step(
		"returns undefined when index is not a number",
		function invalidIndex() {
			const array = ["a", "b", "c"] as const
			const result = at("not a number" as unknown as number)(array)
			assertEquals(result, undefined)
		},
	)

	await t.step(
		"returns input unchanged when array is not valid",
		function invalidArray() {
			const notArray = "not an array"
			const result = at(0)(notArray as unknown as ReadonlyArray<string>)
			assertEquals(result, notArray)
		},
	)

	await t.step(
		"returns undefined for undefined input",
		function undefinedInput() {
			const result = at(0)(undefined as unknown as ReadonlyArray<string>)
			assertEquals(result, undefined)
		},
	)
})

Deno.test("at - property: preserves index semantics", function indexSemanticsProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 50 }),
			fc.nat(),
			function indexSemantics(arr, seed) {
				const index = seed % arr.length
				const result = at(index)(arr)
				assertEquals(result, arr[index])
			},
		),
	)
})

Deno.test("at - property: negative indices work correctly", function negativeIndexProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 100 }),
			fc.integer({ min: 1, max: 100 }),
			function negativeIndexMatchesPositive(arr, offset) {
				const negativeIndex = -offset
				const positiveIndex = arr.length - offset

				if (positiveIndex >= 0 && positiveIndex < arr.length) {
					const resultNegative = at(negativeIndex)(arr)
					const resultPositive = at(positiveIndex)(arr)
					assertEquals(resultNegative, resultPositive)
				}
			},
		),
	)
})

Deno.test("at - property: Result path matches plain path for valid inputs", function resultMatchesPlainProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 50 }),
			fc.integer({ min: -50, max: 50 }),
			function resultMatchesPlain(arr, index) {
				const plainResult = at(index)(arr)
				const resultResult = at(index)(ok(arr))

				if (resultResult._tag === "Ok") {
					assertEquals(resultResult.value, plainResult)
				}
			},
		),
	)
})

Deno.test("at - property: Validation path matches plain path for valid inputs", function validationMatchesPlainProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 50 }),
			fc.integer({ min: -50, max: 50 }),
			function validationMatchesPlain(arr, index) {
				const plainResult = at(index)(arr)
				const validationResult = at(index)(success(arr))

				if (validationResult._tag === "Success") {
					assertEquals(validationResult.value, plainResult)
				}
			},
		),
	)
})
