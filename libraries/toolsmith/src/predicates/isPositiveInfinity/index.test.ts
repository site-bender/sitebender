import { assertEquals } from "@std/assert"

import isPositiveInfinity from "./index.ts"

Deno.test("isPositiveInfinity", async function isPositiveInfinityTests(t) {
	await t.step(
		"returns true for positive Infinity",
		function positiveInfinity() {
			assertEquals(isPositiveInfinity(Infinity), true)
		},
	)

	await t.step(
		"returns false for negative Infinity",
		function negativeInfinity() {
			assertEquals(isPositiveInfinity(-Infinity), false)
		},
	)

	await t.step(
		"returns false for finite numbers",
		function finiteNumbers() {
			assertEquals(isPositiveInfinity(0), false)
			assertEquals(isPositiveInfinity(1), false)
			assertEquals(isPositiveInfinity(-1), false)
			assertEquals(isPositiveInfinity(Number.MAX_VALUE), false)
		},
	)

	await t.step(
		"returns false for NaN",
		function nanValue() {
			assertEquals(isPositiveInfinity(NaN), false)
		},
	)
})
