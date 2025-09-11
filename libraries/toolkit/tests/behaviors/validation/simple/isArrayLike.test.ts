import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"

import isArrayLike from "../../../../src/simple/validation/isArrayLike/index.ts"

Deno.test("isArrayLike: arrays, strings, typed arrays are array-like", () => {
	assertEquals(isArrayLike([1, 2, 3]), true)
	assertEquals(isArrayLike("hello"), true)
	assertEquals(isArrayLike(new Uint8Array(4)), true)
})

Deno.test("isArrayLike: objects with valid length are array-like", () => {
	assertEquals(isArrayLike({ length: 0 }), true)
	assertEquals(isArrayLike({ length: 3, 0: "a", 1: "b", 2: "c" }), true)
})

Deno.test("isArrayLike: rejects invalid values", () => {
	assertEquals(isArrayLike(null), false)
	assertEquals(isArrayLike(42), false)
	assertEquals(isArrayLike({}), false)
	assertEquals(isArrayLike({ length: -1 }), false)
	assertEquals(isArrayLike({ length: Infinity }), false)
})
