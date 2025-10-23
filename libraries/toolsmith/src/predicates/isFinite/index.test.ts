import { assertEquals } from "@std/assert"

import isFinite from "./index.ts"

Deno.test("isFinite", async function isFiniteTests(t) {
	await t.step(
		"returns true for finite numbers",
		function finiteNumbers() {
			assertEquals(isFinite(0), true)
			assertEquals(isFinite(1), true)
			assertEquals(isFinite(-1), true)
			assertEquals(isFinite(3.14), true)
			assertEquals(isFinite(Number.MAX_VALUE), true)
			assertEquals(isFinite(Number.MIN_VALUE), true)
		},
	)

	await t.step(
		"returns false for Infinity",
		function infinityValues() {
			assertEquals(isFinite(Infinity), false)
			assertEquals(isFinite(-Infinity), false)
		},
	)

	await t.step(
		"returns false for NaN",
		function nanValue() {
			assertEquals(isFinite(NaN), false)
		},
	)

	await t.step(
		"returns false for non-numbers",
		function nonNumbers() {
			assertEquals(isFinite("1" as never), false)
			assertEquals(isFinite(null as never), false)
			assertEquals(isFinite(undefined as never), false)
		},
	)
})
