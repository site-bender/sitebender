import { assertEquals } from "@std/assert"
import nonEmptyArray from "@sitebender/toolsmith/newtypes/types/nonEmptyArray/index.ts"

Deno.test("nonEmptyArray returns Ok for array with one element", function testNonEmptyArraySingle() {
	const result = nonEmptyArray([1])
	assertEquals(result._tag, "Ok")
})

Deno.test("nonEmptyArray returns Ok for array with multiple elements", function testNonEmptyArrayMultiple() {
	const result = nonEmptyArray([1, 2, 3])
	assertEquals(result._tag, "Ok")
})

Deno.test("nonEmptyArray works with different types", function testNonEmptyArrayTypes() {
	const stringResult = nonEmptyArray(["a", "b"])
	assertEquals(stringResult._tag, "Ok")

	const objectResult = nonEmptyArray([{ id: 1 }, { id: 2 }])
	assertEquals(objectResult._tag, "Ok")
})

Deno.test("nonEmptyArray returns Error for empty array", function testNonEmptyArrayEmpty() {
	const result = nonEmptyArray([])
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "NON_EMPTY_ARRAY_EMPTY")
	}
})
