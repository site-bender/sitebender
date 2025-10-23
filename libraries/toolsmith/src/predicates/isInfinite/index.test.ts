import { assertEquals } from "@std/assert"

import isInfinite from "./index.ts"

Deno.test("isInfinite", async function isInfiniteTests(t) {
	await t.step(
		"returns true for positive Infinity",
		function positiveInfinity() {
			assertEquals(isInfinite(Infinity), true)
		},
	)

	await t.step(
		"returns true for negative Infinity",
		function negativeInfinity() {
			assertEquals(isInfinite(-Infinity), true)
		},
	)

	await t.step(
		"returns false for finite numbers",
		function finiteNumbers() {
			assertEquals(isInfinite(0), false)
			assertEquals(isInfinite(1), false)
			assertEquals(isInfinite(-1), false)
			assertEquals(isInfinite(Number.MAX_VALUE), false)
			assertEquals(isInfinite(Number.MIN_VALUE), false)
		},
	)

	await t.step(
		"returns false for NaN",
		function nanValue() {
			assertEquals(isInfinite(NaN), false)
		},
	)
})
