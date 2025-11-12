import { assertEquals } from "jsr:@std/assert"
import * as fc from "npm:fast-check"
import ok from "../../../monads/result/ok/index.ts"
import _atToResult from "./index.ts"

Deno.test("_atToResult - ok path", async function atToResultOkTests(t) {
	await t.step(
		"returns ok with element at positive index",
		function okPositiveIndex() {
			const array = ["a", "b", "c", "d", "e"] as const
			const result = _atToResult(2)(array)
			assertEquals(result, ok("c"))
		},
	)

	await t.step("returns ok with element at index 0", function okIndexZero() {
		const array = ["first", "second", "third"] as const
		const result = _atToResult(0)(array)
		assertEquals(result, ok("first"))
	})

	await t.step(
		"returns ok with last element using index -1",
		function okNegativeOne() {
			const array = [1, 2, 3, 4, 5] as const
			const result = _atToResult(-1)(array)
			assertEquals(result, ok(5))
		},
	)

	await t.step(
		"returns ok with undefined for out of bounds",
		function okOutOfBounds() {
			const array = ["a", "b", "c"] as const
			const result = _atToResult(10)(array)
			assertEquals(result, ok(undefined))
		},
	)

	await t.step(
		"returns ok with undefined for empty array",
		function okEmptyArray() {
			const array: ReadonlyArray<string> = []
			const result = _atToResult(0)(array)
			assertEquals(result, ok(undefined))
		},
	)
})

Deno.test(
	"_atToResult - error path for invalid inputs",
	async function atToResultErrorTests(t) {
		await t.step(
			"returns error when index is not a number",
			function errorInvalidIndex() {
				const array = ["a", "b", "c"] as const
				const result = _atToResult("not a number" as unknown as number)(array)

				assertEquals(result._tag, "Error")
				if (result._tag === "Error") {
					assertEquals(result.error.code, "INVALID_INDEX")
					assertEquals(result.error.field, "index")
					assertEquals(result.error.received, "string")
					assertEquals(result.error.expected, "number")
				}
			},
		)

		await t.step("returns error when index is NaN", function errorNanIndex() {
			const array = ["a", "b", "c"] as const
			const result = _atToResult(NaN)(array)

			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "INVALID_INDEX")
				assertEquals(result.error.field, "index")
			}
		})

		await t.step(
			"returns error when array is not an array",
			function errorInvalidArray() {
				const notArray = "not an array"
				const result = _atToResult(0)(
					notArray as unknown as ReadonlyArray<string>,
				)

				assertEquals(result._tag, "Error")
				if (result._tag === "Error") {
					assertEquals(result.error.code, "INVALID_ARRAY")
					assertEquals(result.error.field, "array")
					assertEquals(result.error.received, "string")
					assertEquals(result.error.expected, "Array")
				}
			},
		)

		await t.step(
			"returns error when array is undefined",
			function errorUndefinedArray() {
				const result = _atToResult(0)(
					undefined as unknown as ReadonlyArray<string>,
				)

				assertEquals(result._tag, "Error")
				if (result._tag === "Error") {
					assertEquals(result.error.code, "INVALID_ARRAY")
					assertEquals(result.error.field, "array")
				}
			},
		)

		await t.step("returns error when array is null", function errorNullArray() {
			const result = _atToResult(0)(null as unknown as ReadonlyArray<string>)

			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "INVALID_ARRAY")
				assertEquals(result.error.field, "array")
			}
		})
	},
)

Deno.test("_atToResult - property: valid inputs always return ok", function validInputsProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 50 }),
			fc.integer({ min: -50, max: 50 }),
			function validInputsAlwaysOk(arr, index) {
				const result = _atToResult(index)(arr)
				assertEquals(result._tag, "Ok")
			},
		),
	)
})

Deno.test("_atToResult - property: invalid index always returns error", function invalidIndexProperty() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1, maxLength: 50 }),
			fc.oneof(
				fc.constant(undefined),
				fc.constant(null),
				fc.string(),
				fc.object(),
			),
			function invalidIndexAlwaysError(arr, invalidIndex) {
				const result = _atToResult(invalidIndex as unknown as number)(arr)
				assertEquals(result._tag, "Error")
				if (result._tag === "Error") {
					assertEquals(result.error.code, "INVALID_INDEX")
				}
			},
		),
	)
})
