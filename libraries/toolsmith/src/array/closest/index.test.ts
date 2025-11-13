import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import closest from "./index.ts"
import ok from "../../monads/result/ok/index.ts"
import error from "../../monads/result/error/index.ts"
import success from "../../monads/validation/success/index.ts"
import failure from "../../monads/validation/failure/index.ts"

Deno.test(
	"closest - plain array path",
	async function closestPlainArrayTests(t) {
		await t.step(
			"finds closest value in array",
			function findsClosestValue() {
				const result = closest(10)([7, 12, 15, 20])

				assertEquals(result, 12)
			},
		)

		await t.step(
			"returns null for empty array",
			function returnsNullForEmpty() {
				const result = closest(10)([])

				assertEquals(result, null)
			},
		)

		await t.step(
			"returns single element",
			function returnsSingleElement() {
				const result = closest(10)([5])

				assertEquals(result, 5)
			},
		)

		await t.step(
			"handles negative numbers",
			function handlesNegativeNumbers() {
				const result = closest(0)([-5, -3, -10])

				assertEquals(result, -3)
			},
		)

		await t.step(
			"handles mixed positive and negative",
			function handlesMixedNumbers() {
				const result = closest(0)([-5, 3, -10, 8])

				assertEquals(result, 3)
			},
		)

		await t.step(
			"returns null for all invalid numbers",
			function returnsNullForInvalidNumbers() {
				const result = closest(10)([NaN, Infinity, -Infinity])

				assertEquals(result, null)
			},
		)

		await t.step(
			"ignores invalid numbers",
			function ignoresInvalidNumbers() {
				const result = closest(10)([NaN, 5, Infinity, 15, -Infinity])

				// Both 5 and 15 are equidistant from 10, returns first valid number
				assertEquals(result, 5)
			},
		)

		await t.step(
			"handles exact match",
			function handlesExactMatch() {
				const result = closest(10)([5, 10, 15])

				assertEquals(result, 10)
			},
		)
	},
)

Deno.test("closest - Result monad path", async function closestResultTests(t) {
	await t.step(
		"finds closest value wrapped in ok",
		function findsClosestInOk() {
			const result = closest(10)(ok([7, 12, 15, 20]))

			assertEquals(result, ok(12))
		},
	)

	await t.step(
		"returns ok with null for empty array",
		function returnsOkNullForEmpty() {
			const result = closest(10)(ok([]))

			assertEquals(result, ok(null))
		},
	)

	await t.step(
		"passes through error without processing",
		function passesErrorThrough() {
			const inputError = error({
				code: "UPSTREAM_ERROR",
				field: "data",
				messages: ["Upstream error occurred"],
			})

			const result = closest(10)(inputError)

			assertEquals(result, inputError)
		},
	)

	await t.step(
		"returns ok with single element",
		function returnsOkSingleElement() {
			const result = closest(10)(ok([5]))

			assertEquals(result, ok(5))
		},
	)

	await t.step(
		"returns ok with null for all invalid numbers",
		function returnsOkNullForInvalidNumbers() {
			const result = closest(10)(ok([NaN, Infinity, -Infinity]))

			assertEquals(result, ok(null))
		},
	)
})

Deno.test(
	"closest - Validation monad path",
	async function closestValidationTests(t) {
		await t.step(
			"finds closest value wrapped in success",
			function findsClosestInSuccess() {
				const result = closest(10)(success([7, 12, 15, 20]))

				assertEquals(result, success(12))
			},
		)

		await t.step(
			"returns success with null for empty array",
			function returnsSuccessNullForEmpty() {
				const result = closest(10)(success([]))

				assertEquals(result, success(null))
			},
		)

		await t.step(
			"passes through failure without processing",
			function passesFailureThrough() {
				const inputFailure = failure([
					{
						code: "UPSTREAM_VALIDATION_ERROR",
						field: "data",
						messages: ["Validation failed upstream"],
					},
				])

				const result = closest(10)(inputFailure)

				assertEquals(result, inputFailure)
			},
		)

		await t.step(
			"returns success with single element",
			function returnsSuccessSingleElement() {
				const result = closest(10)(success([5]))

				assertEquals(result, success(5))
			},
		)

		await t.step(
			"returns success with null for all invalid numbers",
			function returnsSuccessNullForInvalidNumbers() {
				const result = closest(10)(success([NaN, Infinity, -Infinity]))

				assertEquals(result, success(null))
			},
		)
	},
)

Deno.test("closest - property: result is always in array", function resultInArrayProperty() {
	fc.assert(
		fc.property(
			fc.integer({ min: -1000, max: 1000 }),
			fc.array(fc.integer({ min: -1000, max: 1000 }), { minLength: 1 }),
			function propertyResultInArray(target, arr) {
				const result = closest(target)(arr)

				if (result !== null) {
					const isInArray = arr.includes(result)
					assertEquals(isInArray, true)
				}
			},
		),
	)
})

Deno.test("closest - property: result distance is minimal", function resultDistanceMinimalProperty() {
	function checkDistance(target: number, resultDistance: number) {
		return function checkDistanceForTarget(value: number): boolean {
			const distance = Math.abs(value - target)
			return distance >= resultDistance
		}
	}

	fc.assert(
		fc.property(
			fc.integer({ min: -1000, max: 1000 }),
			fc.array(fc.integer({ min: -1000, max: 1000 }), { minLength: 1 }),
			function propertyResultDistanceMinimal(target, arr) {
				const result = closest(target)(arr)

				if (result !== null) {
					const resultDistance = Math.abs(result - target)
					const allDistancesGreaterOrEqual = arr.every(
						checkDistance(target, resultDistance),
					)
					assertEquals(allDistancesGreaterOrEqual, true)
				}
			},
		),
	)
})
