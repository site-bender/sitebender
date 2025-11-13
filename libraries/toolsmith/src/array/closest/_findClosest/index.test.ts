import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import _findClosest from "./index.ts"

Deno.test(
	"_findClosest - basic functionality",
	async function findClosestBasicTests(t) {
		await t.step(
			"returns currentValue when it is closer to target",
			function returnsCurrentWhenCloser() {
				const result = _findClosest(10)(15)(12)

				assertEquals(result, 12)
			},
		)

		await t.step(
			"returns closestValue when it is closer to target",
			function returnsClosestWhenCloser() {
				const result = _findClosest(10)(11)(15)

				assertEquals(result, 11)
			},
		)

		await t.step(
			"returns closestValue when distances are equal",
			function returnsClosestWhenEqual() {
				const result = _findClosest(10)(12)(8)

				assertEquals(result, 12)
			},
		)

		await t.step(
			"works with negative numbers",
			function worksWithNegativeNumbers() {
				const result = _findClosest(0)(-5)(-3)

				assertEquals(result, -3)
			},
		)

		await t.step(
			"works with positive numbers",
			function worksWithPositiveNumbers() {
				const result = _findClosest(100)(90)(95)

				assertEquals(result, 95)
			},
		)

		await t.step(
			"works with zero target",
			function worksWithZeroTarget() {
				const result = _findClosest(0)(5)(3)

				assertEquals(result, 3)
			},
		)

		await t.step(
			"works with mixed positive and negative",
			function worksWithMixed() {
				const result = _findClosest(0)(-5)(4)

				assertEquals(result, 4)
			},
		)
	},
)

Deno.test(
	"_findClosest - edge cases",
	async function findClosestEdgeCaseTests(t) {
		await t.step(
			"handles very large numbers",
			function handlesVeryLargeNumbers() {
				const result = _findClosest(1000000)(999999)(1000001)

				assertEquals(result, 999999)
			},
		)

		await t.step(
			"handles very small numbers",
			function handlesVerySmallNumbers() {
				const result = _findClosest(0.0001)(0.0002)(0.00005)

				assertEquals(result, 0.00005)
			},
		)

		await t.step(
			"handles exact match for currentValue",
			function handlesExactMatchCurrent() {
				const result = _findClosest(10)(15)(10)

				assertEquals(result, 10)
			},
		)

		await t.step(
			"handles exact match for closestValue",
			function handlesExactMatchClosest() {
				const result = _findClosest(10)(10)(15)

				assertEquals(result, 10)
			},
		)
	},
)

Deno.test("_findClosest - property: result distance is minimum", function minimumDistanceProperty() {
	fc.assert(
		fc.property(
			fc.integer({ min: -1000, max: 1000 }),
			fc.integer({ min: -1000, max: 1000 }),
			fc.integer({ min: -1000, max: 1000 }),
			function propertyMinimumDistance(target, val1, val2) {
				const result = _findClosest(target)(val1)(val2)
				const resultDistance = Math.abs(result - target)
				const distance1 = Math.abs(val1 - target)
				const distance2 = Math.abs(val2 - target)
				const minimumDistance = Math.min(distance1, distance2)

				assertEquals(resultDistance, minimumDistance)
			},
		),
	)
})

Deno.test("_findClosest - property: result is always one of the inputs", function resultIsInputProperty() {
	fc.assert(
		fc.property(
			fc.float({ min: -1000, max: 1000, noNaN: true }),
			fc.float({ min: -1000, max: 1000, noNaN: true }),
			fc.float({ min: -1000, max: 1000, noNaN: true }),
			function propertyResultIsInput(target, val1, val2) {
				const result = _findClosest(target)(val1)(val2)

				const isOneOfInputs = result === val1 || result === val2
				assertEquals(isOneOfInputs, true)
			},
		),
	)
})
