import { assertEquals } from "@std/assert"

import success from "../../../monads/validation/success/index.ts"
import _sortWithToValidation from "./index.ts"

Deno.test("_sortWithToValidation returns success with sorted array", function testSortWithToValidationBasic() {
	function ascending(a: number, b: number): number {
		return a - b
	}
	const result = _sortWithToValidation([ascending])([3, 1, 2])

	assertEquals(result, success([1, 2, 3]))
})

Deno.test("_sortWithToValidation handles empty array", function testSortWithToValidationEmpty() {
	function ascending(a: number, b: number): number {
		return a - b
	}
	const result = _sortWithToValidation([ascending])([])

	assertEquals(result, success([]))
})
