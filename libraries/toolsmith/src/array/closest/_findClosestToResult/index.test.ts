import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import _findClosestToResult from "./index.ts"
import ok from "../../../monads/result/ok/index.ts"
import isOk from "../../../monads/result/isOk/index.ts"

Deno.test(
	"_findClosestToResult - basic functionality",
	async function findClosestToResultBasicTests(t) {
		await t.step(
			"returns ok with currentValue when it is closer to target",
			function returnsOkCurrentWhenCloser() {
				const result = _findClosestToResult(10)(15)(12)

				assertEquals(result, ok(12))
			},
		)

		await t.step(
			"returns ok with closestValue when it is closer to target",
			function returnsOkClosestWhenCloser() {
				const result = _findClosestToResult(10)(11)(15)

				assertEquals(result, ok(11))
			},
		)

		await t.step(
			"returns ok with closestValue when distances are equal",
			function returnsOkClosestWhenEqual() {
				const result = _findClosestToResult(10)(12)(8)

				assertEquals(result, ok(12))
			},
		)

		await t.step(
			"works with negative numbers",
			function worksWithNegativeNumbers() {
				const result = _findClosestToResult(0)(-5)(-3)

				assertEquals(result, ok(-3))
			},
		)

		await t.step(
			"works with zero target",
			function worksWithZeroTarget() {
				const result = _findClosestToResult(0)(5)(3)

				assertEquals(result, ok(3))
			},
		)
	},
)

Deno.test(
	"_findClosestToResult - Result monad properties",
	async function findClosestToResultMonadTests(t) {
		await t.step(
			"always returns ok Result",
			function alwaysReturnsOk() {
				const result = _findClosestToResult(10)(5)(15)

				assertEquals(isOk(result), true)
			},
		)

		await t.step(
			"wraps value in ok constructor",
			function wrapsInOk() {
				const result = _findClosestToResult(100)(90)(95)

				assertEquals(result, ok(95))
			},
		)
	},
)

Deno.test("_findClosestToResult - property: always returns ok Result", function alwaysOkProperty() {
	fc.assert(
		fc.property(
			fc.integer({ min: -1000, max: 1000 }),
			fc.integer({ min: -1000, max: 1000 }),
			fc.integer({ min: -1000, max: 1000 }),
			function propertyAlwaysOk(target, val1, val2) {
				const result = _findClosestToResult(target)(val1)(val2)

				assertEquals(isOk(result), true)
			},
		),
	)
})

Deno.test("_findClosestToResult - property: wrapped value is closest", function wrappedValueIsClosestProperty() {
	fc.assert(
		fc.property(
			fc.integer({ min: -1000, max: 1000 }),
			fc.integer({ min: -1000, max: 1000 }),
			fc.integer({ min: -1000, max: 1000 }),
			function propertyWrappedValueIsClosest(target, val1, val2) {
				const result = _findClosestToResult(target)(val1)(val2)

				if (isOk(result)) {
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
