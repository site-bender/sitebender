import { assertEquals } from "jsr:@std/assert"
import * as fc from "npm:fast-check"
import success from "../../../monads/validation/success/index.ts"
import _atToValidation from "./index.ts"

Deno.test(
	"_atToValidation - success path",
	async function atToValidationSuccessTests(t) {
		await t.step(
			"returns success with element at positive index",
			function successPositiveIndex() {
				const array = ["a", "b", "c", "d", "e"] as const
				const result = _atToValidation(2)(array)
				assertEquals(result, success("c"))
			},
		)

		await t.step(
			"returns success with element at index 0",
			function successIndexZero() {
				const array = ["first", "second", "third"] as const
				const result = _atToValidation(0)(array)
				assertEquals(result, success("first"))
			},
		)

		await t.step(
			"returns success with last element using index -1",
			function successNegativeOne() {
				const array = [1, 2, 3, 4, 5] as const
				const result = _atToValidation(-1)(array)
				assertEquals(result, success(5))
			},
		)

		await t.step(
			"returns success with undefined for out of bounds",
			function successOutOfBounds() {
				const array = ["a", "b", "c"] as const
				const result = _atToValidation(10)(array)
				assertEquals(result, success(undefined))
			},
		)

		await t.step(
			"returns success with undefined for empty array",
			function successEmptyArray() {
				const array: ReadonlyArray<string> = []
				const result = _atToValidation(0)(array)
				assertEquals(result, success(undefined))
			},
		)
	},
)

Deno.test(
	"_atToValidation - failure path for invalid inputs",
	async function atToValidationFailureTests(t) {
		await t.step(
			"returns failure when index is not a number",
			function failureInvalidIndex() {
				const array = ["a", "b", "c"] as const
				const result = _atToValidation("not a number" as unknown as number)(
					array,
				)

				assertEquals(result._tag, "Failure")
				if (result._tag === "Failure") {
					assertEquals(result.errors.length, 1)
					assertEquals(result.errors[0].code, "INVALID_INDEX")
					assertEquals(result.errors[0].field, "index")
					assertEquals(result.errors[0].received, "string")
					assertEquals(result.errors[0].expected, "number")
				}
			},
		)

		await t.step(
			"returns failure when index is NaN",
			function failureNanIndex() {
				const array = ["a", "b", "c"] as const
				const result = _atToValidation(NaN)(array)

				assertEquals(result._tag, "Failure")
				if (result._tag === "Failure") {
					assertEquals(result.errors.length, 1)
					assertEquals(result.errors[0].code, "INVALID_INDEX")
					assertEquals(result.errors[0].field, "index")
				}
			},
		)

		await t.step(
			"returns failure when array is not an array",
			function failureInvalidArray() {
				const notArray = "not an array"
				const result = _atToValidation(0)(
					notArray as unknown as ReadonlyArray<string>,
				)

				assertEquals(result._tag, "Failure")
				if (result._tag === "Failure") {
					assertEquals(result.errors.length, 1)
					assertEquals(result.errors[0].code, "INVALID_ARRAY")
					assertEquals(result.errors[0].field, "array")
					assertEquals(result.errors[0].received, "string")
					assertEquals(result.errors[0].expected, "Array")
				}
			},
		)

		await t.step(
			"returns failure when array is undefined",
			function failureUndefinedArray() {
				const result = _atToValidation(0)(
					undefined as unknown as ReadonlyArray<string>,
				)

				assertEquals(result._tag, "Failure")
				if (result._tag === "Failure") {
					assertEquals(result.errors.length, 1)
					assertEquals(result.errors[0].code, "INVALID_ARRAY")
					assertEquals(result.errors[0].field, "array")
				}
			},
		)

		await t.step(
			"returns failure when array is null",
			function failureNullArray() {
				const result = _atToValidation(0)(
					null as unknown as ReadonlyArray<string>,
				)

				assertEquals(result._tag, "Failure")
				if (result._tag === "Failure") {
					assertEquals(result.errors.length, 1)
					assertEquals(result.errors[0].code, "INVALID_ARRAY")
					assertEquals(result.errors[0].field, "array")
				}
			},
		)
	},
)

Deno.test("_atToValidation - property: valid inputs always return success", function validInputsProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 50 }),
			fc.integer({ min: -50, max: 50 }),
			function validInputsAlwaysSuccess(arr, index) {
				const result = _atToValidation(index)(arr)
				assertEquals(result._tag, "Success")
			},
		),
	)
})

Deno.test("_atToValidation - property: invalid index always returns failure", function invalidIndexProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 50 }),
			fc.oneof(
				fc.constant(undefined),
				fc.constant(null),
				fc.string(),
				fc.object(),
			),
			function invalidIndexAlwaysFailure(arr, invalidIndex) {
				const result = _atToValidation(invalidIndex as unknown as number)(arr)
				assertEquals(result._tag, "Failure")
				if (result._tag === "Failure") {
					assertEquals(result.errors[0].code, "INVALID_INDEX")
				}
			},
		),
	)
})
