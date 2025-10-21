import { assertEquals } from "@std/assert"

import isNegativeInfinity from "./index.ts"

Deno.test("isNegativeInfinity", async function isNegativeInfinityTests(t) {
	await t.step(
		"returns true for negative Infinity",
		function negativeInfinity() {
			assertEquals(isNegativeInfinity(-Infinity), true)
		},
	)

	await t.step(
		"returns false for positive Infinity",
		function positiveInfinity() {
			assertEquals(isNegativeInfinity(Infinity), false)
		},
	)

	await t.step(
		"returns false for finite numbers",
		function finiteNumbers() {
			assertEquals(isNegativeInfinity(0), false)
			assertEquals(isNegativeInfinity(1), false)
			assertEquals(isNegativeInfinity(-1), false)
			assertEquals(isNegativeInfinity(Number.MIN_VALUE), false)
		},
	)

	await t.step(
		"returns false for NaN",
		function nanValue() {
			assertEquals(isNegativeInfinity(NaN), false)
		},
	)
})
