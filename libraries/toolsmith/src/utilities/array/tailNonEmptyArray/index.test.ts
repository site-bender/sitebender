import { assertEquals } from "@std/assert"
import tailNonEmptyArray from "@sitebender/toolsmith/utilities/array/tailNonEmptyArray/index.ts"
import unsafeNonEmptyArray from "@sitebender/toolsmith/newtypes/types/nonEmptyArray/unsafeNonEmptyArray/index.ts"

Deno.test("tailNonEmptyArray returns empty array for single-element array", function testTailSingle() {
	const arr = unsafeNonEmptyArray([42])
	const result = tailNonEmptyArray(arr)
	assertEquals(result, [])
})

Deno.test("tailNonEmptyArray returns rest of multi-element array", function testTailMultiple() {
	const arr = unsafeNonEmptyArray([1, 2, 3, 4, 5])
	const result = tailNonEmptyArray(arr)
	assertEquals(result, [2, 3, 4, 5])
})

Deno.test("tailNonEmptyArray works with different types", function testTailTypes() {
	const stringArr = unsafeNonEmptyArray(["first", "second", "third"])
	assertEquals(tailNonEmptyArray(stringArr), ["second", "third"])

	const objectArr = unsafeNonEmptyArray([{ id: 1 }, { id: 2 }, { id: 3 }])
	assertEquals(tailNonEmptyArray(objectArr), [{ id: 2 }, { id: 3 }])
})
