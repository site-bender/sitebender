import { assertEquals } from "@std/assert"

import isSet from "./index.ts"

Deno.test("isSet", async function isSetTests(t) {
	await t.step(
		"returns true for Set instances",
		function validSets() {
			assertEquals(isSet(new Set()), true)
			assertEquals(isSet(new Set([1, 2, 3])), true)
		},
	)

	await t.step(
		"returns false for non-Set values",
		function nonSets() {
			assertEquals(isSet({}), false)
			assertEquals(isSet([]), false)
			assertEquals(isSet(new Map()), false)
			assertEquals(isSet(null), false)
			assertEquals(isSet(undefined), false)
			assertEquals(isSet("set"), false)
			assertEquals(isSet(123), false)
		},
	)
})
