import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"

import isArray from "../../../../src/simple/validation/isArray/index.ts"

Deno.test("isArray: detects arrays", () => {
	assertEquals(isArray([]), true)
	assertEquals(isArray([1, 2, 3]), true)
	assertEquals(isArray(new Array(5)), true)
})

Deno.test("isArray: rejects non-arrays", () => {
	assertEquals(isArray("string"), false)
	assertEquals(isArray({ length: 0 }), false)
	assertEquals(isArray(null), false)
	assertEquals(isArray(undefined), false)
})
