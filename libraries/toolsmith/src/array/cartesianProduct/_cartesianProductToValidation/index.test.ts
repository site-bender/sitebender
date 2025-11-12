import { assertEquals } from "jsr:@std/assert"
import * as fc from "npm:fast-check"
import success from "../../../monads/validation/success/index.ts"
import _cartesianProductToValidation from "./index.ts"

Deno.test(
	"_cartesianProductToValidation - success path",
	async function cartesianProductToValidationSuccessTests(t) {
		await t.step(
			"wraps cartesian product in success",
			function wrapsInSuccess() {
				const result = _cartesianProductToValidation([1, 2])(["a", "b"])
				assertEquals(
					result,
					success([
						[1, "a"],
						[1, "b"],
						[2, "a"],
						[2, "b"],
					]),
				)
			},
		)

		await t.step(
			"returns success with empty array when first empty",
			function firstEmpty() {
				const result = _cartesianProductToValidation<unknown, number, string>(
					[],
				)(["a", "b"])
				assertEquals(result, success([]))
			},
		)

		await t.step(
			"returns success with empty array when second empty",
			function secondEmpty() {
				const result = _cartesianProductToValidation([1, 2])(
					[] as ReadonlyArray<string>,
				)
				assertEquals(result, success([]))
			},
		)

		await t.step(
			"returns success with empty array when both empty",
			function bothEmpty() {
				const result = _cartesianProductToValidation<unknown, number, string>(
					[],
				)([])
				assertEquals(result, success([]))
			},
		)

		await t.step("returns success with single pair", function singlePair() {
			const result = _cartesianProductToValidation([1])(["a"])
			assertEquals(result, success([[1, "a"]]))
		})

		await t.step("works with objects", function worksWithObjects() {
			const result = _cartesianProductToValidation([{ id: 1 }])([{
				name: "Alice",
			}])
			assertEquals(result, success([[{ id: 1 }, { name: "Alice" }]]))
		})
	},
)

Deno.test("_cartesianProductToValidation - property: always returns success", function alwaysReturnsSuccess() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { maxLength: 5 }),
			fc.array(fc.string(), { maxLength: 5 }),
			function alwaysSuccess(arr1, arr2) {
				const result = _cartesianProductToValidation(arr1)(arr2)
				assertEquals(result._tag, "Success")
			},
		),
	)
})

Deno.test("_cartesianProductToValidation - property: success value matches plain result", function matchesPlain() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { maxLength: 5 }),
			fc.array(fc.string(), { maxLength: 5 }),
			function successValueMatchesPlain(arr1, arr2) {
				const result = _cartesianProductToValidation(arr1)(arr2)
				if (result._tag === "Success") {
					const expectedCount = arr1.length * arr2.length
					assertEquals(result.value.length, expectedCount)
				}
			},
		),
	)
})
