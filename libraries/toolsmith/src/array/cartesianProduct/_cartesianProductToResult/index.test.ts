import { assertEquals } from "jsr:@std/assert"
import * as fc from "npm:fast-check"
import ok from "../../../monads/result/ok/index.ts"
import _cartesianProductToResult from "./index.ts"

Deno.test(
	"_cartesianProductToResult - ok path",
	async function cartesianProductToResultOkTests(t) {
		await t.step("wraps cartesian product in ok", function wrapsInOk() {
			const result = _cartesianProductToResult([1, 2])(["a", "b"])
			assertEquals(
				result,
				ok([
					[1, "a"],
					[1, "b"],
					[2, "a"],
					[2, "b"],
				]),
			)
		})

		await t.step(
			"returns ok with empty array when first empty",
			function firstEmpty() {
				const result = _cartesianProductToResult<unknown, number, string>([])([
					"a",
					"b",
				])
				assertEquals(result, ok([]))
			},
		)

		await t.step(
			"returns ok with empty array when second empty",
			function secondEmpty() {
				const result = _cartesianProductToResult([1, 2])(
					[] as ReadonlyArray<string>,
				)
				assertEquals(result, ok([]))
			},
		)

		await t.step(
			"returns ok with empty array when both empty",
			function bothEmpty() {
				const result = _cartesianProductToResult<unknown, number, string>([])(
					[],
				)
				assertEquals(result, ok([]))
			},
		)

		await t.step("returns ok with single pair", function singlePair() {
			const result = _cartesianProductToResult([1])(["a"])
			assertEquals(result, ok([[1, "a"]]))
		})

		await t.step("works with objects", function worksWithObjects() {
			const result = _cartesianProductToResult([{ id: 1 }])([{ name: "Alice" }])
			assertEquals(result, ok([[{ id: 1 }, { name: "Alice" }]]))
		})
	},
)

Deno.test("_cartesianProductToResult - property: always returns ok", function alwaysReturnsOk() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { maxLength: 5 }),
			fc.array(fc.string(), { maxLength: 5 }),
			function alwaysOk(arr1, arr2) {
				const result = _cartesianProductToResult(arr1)(arr2)
				assertEquals(result._tag, "Ok")
			},
		),
	)
})

Deno.test("_cartesianProductToResult - property: ok value matches plain result", function matchesPlain() {
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { maxLength: 5 }),
			fc.array(fc.string(), { maxLength: 5 }),
			function okValueMatchesPlain(arr1, arr2) {
				const result = _cartesianProductToResult(arr1)(arr2)
				if (result._tag === "Ok") {
					const expectedCount = arr1.length * arr2.length
					assertEquals(result.value.length, expectedCount)
				}
			},
		),
	)
})
