import { assertEquals } from "@std/assert"

import isMap from "./index.ts"

Deno.test("isMap", async function isMapTests(t) {
	await t.step(
		"returns true for Map instances",
		function validMaps() {
			assertEquals(isMap(new Map()), true)
			assertEquals(isMap(new Map([["a", 1]])), true)
		},
	)

	await t.step(
		"returns false for non-Map values",
		function nonMaps() {
			assertEquals(isMap({}), false)
			assertEquals(isMap([]), false)
			assertEquals(isMap(new Set()), false)
			assertEquals(isMap(null), false)
			assertEquals(isMap(undefined), false)
			assertEquals(isMap("map"), false)
			assertEquals(isMap(123), false)
		},
	)
})
