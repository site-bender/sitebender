import { assertEquals } from "@std/assert"
import isNonEmptyArray from "@sitebender/toolsmith/predicates/isNonEmptyArray/index.ts"

Deno.test("isNonEmptyArray returns true for array with one element", function testIsNonEmptyArraySingle() {
	assertEquals(isNonEmptyArray([1]), true)
})

Deno.test("isNonEmptyArray returns true for array with multiple elements", function testIsNonEmptyArrayMultiple() {
	assertEquals(isNonEmptyArray([1, 2, 3]), true)
	assertEquals(isNonEmptyArray(["a", "b"]), true)
})

Deno.test("isNonEmptyArray returns false for empty array", function testIsNonEmptyArrayEmpty() {
	assertEquals(isNonEmptyArray([]), false)
})
