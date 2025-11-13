import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import _findClosestToValidation from "./index.ts"
import success from "../../../monads/validation/success/index.ts"
import isSuccess from "../../../monads/validation/isSuccess/index.ts"

Deno.test(
	"_findClosestToValidation - basic functionality",
	async function findClosestToValidationBasicTests(t) {
		await t.step(
			"returns success with currentValue when it is closer to target",
			function returnsSuccessCurrentWhenCloser() {
				const result = _findClosestToValidation(10)(15)(12)

				assertEquals(result, success(12))
			},
		)

		await t.step(
			"returns success with closestValue when it is closer to target",
			function returnsSuccessClosestWhenCloser() {
				const result = _findClosestToValidation(10)(11)(15)

				assertEquals(result, success(11))
			},
		)

		await t.step(
			"returns success with closestValue when distances are equal",
			function returnsSuccessClosestWhenEqual() {
				const result = _findClosestToValidation(10)(12)(8)

				assertEquals(result, success(12))
			},
		)

		await t.step(
			"works with negative numbers",
			function worksWithNegativeNumbers() {
				const result = _findClosestToValidation(0)(-5)(-3)

				assertEquals(result, success(-3))
			},
		)

		await t.step(
			"works with zero target",
			function worksWithZeroTarget() {
				const result = _findClosestToValidation(0)(5)(3)

				assertEquals(result, success(3))
			},
		)
	},
)

Deno.test(
	"_findClosestToValidation - Validation monad properties",
	async function findClosestToValidationMonadTests(t) {
		await t.step(
			"always returns success Validation",
			function alwaysReturnsSuccess() {
				const result = _findClosestToValidation(10)(5)(15)

				assertEquals(isSuccess(result), true)
			},
		)

		await t.step(
			"wraps value in success constructor",
			function wrapsInSuccess() {
				const result = _findClosestToValidation(100)(90)(95)

				assertEquals(result, success(95))
			},
		)
	},
)

Deno.test("_findClosestToValidation - property: always returns success Validation", function alwaysSuccessProperty() {
	fc.assert(
		fc.property(
			fc.integer({ min: -1000, max: 1000 }),
			fc.integer({ min: -1000, max: 1000 }),
			fc.integer({ min: -1000, max: 1000 }),
			function propertyAlwaysSuccess(target, val1, val2) {
				const result = _findClosestToValidation(target)(val1)(val2)

				assertEquals(isSuccess(result), true)
			},
		),
	)
})

Deno.test("_findClosestToValidation - property: wrapped value is closest", function wrappedValueIsClosestProperty() {
	fc.assert(
		fc.property(
			fc.integer({ min: -1000, max: 1000 }),
			fc.integer({ min: -1000, max: 1000 }),
			fc.integer({ min: -1000, max: 1000 }),
			function propertyWrappedValueIsClosest(target, val1, val2) {
				const result = _findClosestToValidation(target)(val1)(val2)

				if (isSuccess(result)) {
					const wrappedValue = result.value
					const distance1 = Math.abs(val1 - target)
					const distance2 = Math.abs(val2 - target)
					const wrappedDistance = Math.abs(wrappedValue - target)
					const minimumDistance = Math.min(distance1, distance2)

					assertEquals(wrappedDistance, minimumDistance)
				}
			},
		),
	)
})
