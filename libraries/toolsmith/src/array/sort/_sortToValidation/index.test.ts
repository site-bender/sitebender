import { assertEquals } from "@std/assert"

import success from "../../../monads/validation/success/index.ts"
import _sortToValidation from "./index.ts"

Deno.test("_sortToValidation returns success with sorted array", function testSortToValidationBasic() {
	const result = _sortToValidation<number>()([3, 1, 4, 1, 5])

	assertEquals(result, success([1, 1, 3, 4, 5]))
})

Deno.test("_sortToValidation with custom comparator", function testSortToValidationCustom() {
	function descending(a: number, b: number): number {
		return b - a
	}
	const result = _sortToValidation(descending)([3, 1, 4])

	assertEquals(result, success([4, 3, 1]))
})

Deno.test("_sortToValidation handles empty array", function testSortToValidationEmpty() {
	const result = _sortToValidation<number>()([])

	assertEquals(result, success([]))
})
