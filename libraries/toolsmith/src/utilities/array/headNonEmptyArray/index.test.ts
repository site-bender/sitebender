import { assertEquals } from "@std/assert"
import headNonEmptyArray from "@sitebender/toolsmith/utilities/array/headNonEmptyArray/index.ts"
import unsafeNonEmptyArray from "@sitebender/toolsmith/newtypes/types/nonEmptyArray/unsafeNonEmptyArray/index.ts"

Deno.test("headNonEmptyArray returns first element of single-element array", function testHeadSingle() {
	const arr = unsafeNonEmptyArray([42])
	assertEquals(headNonEmptyArray(arr), 42)
})

Deno.test("headNonEmptyArray returns first element of multi-element array", function testHeadMultiple() {
	const arr = unsafeNonEmptyArray([1, 2, 3, 4, 5])
	assertEquals(headNonEmptyArray(arr), 1)
})

Deno.test("headNonEmptyArray works with different types", function testHeadTypes() {
	const stringArr = unsafeNonEmptyArray(["first", "second"])
	assertEquals(headNonEmptyArray(stringArr), "first")

	const objectArr = unsafeNonEmptyArray([{ id: 1 }, { id: 2 }])
	assertEquals(headNonEmptyArray(objectArr), { id: 1 })
})
