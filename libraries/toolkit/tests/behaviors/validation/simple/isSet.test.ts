import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"

import isSet from "../../../../src/vanilla/validation/isSet/index.ts"

Deno.test("isSet: detects Set instances", () => {
	assertEquals(isSet(new Set()), true)
	assertEquals(isSet(new Set([1, 2, 3])), true)
	assertEquals(isSet(new Set("hello" as unknown as Iterable<unknown>)), true)
})

Deno.test("isSet: rejects non-Set values", () => {
	assertEquals(isSet(new Map() as unknown), false)
	assertEquals(isSet([] as unknown), false)
	assertEquals(isSet({} as unknown), false)
	assertEquals(isSet(null as unknown), false)
	assertEquals(isSet(undefined as unknown), false)
})
