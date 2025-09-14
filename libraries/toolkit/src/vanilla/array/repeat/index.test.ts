import { assertEquals } from "@std/assert"

import repeat from "./index.ts"

//++ Tests for repeat (array value repetition)
Deno.test("repeat returns empty array for non-positive counts", () => {
	assertEquals(repeat(0)("x"), [])
	assertEquals(repeat(-1)("x"), [])
})

Deno.test("repeat repeats primitive values", () => {
	assertEquals(repeat(3)("a"), ["a", "a", "a"])
	assertEquals(repeat(2)(42), [42, 42])
})

Deno.test("repeat preserves reference for objects", () => {
	const obj = { a: 1 }
	const arr = repeat(2)(obj)
	assertEquals(arr[0], obj)
	assertEquals(arr[1], obj)
})
