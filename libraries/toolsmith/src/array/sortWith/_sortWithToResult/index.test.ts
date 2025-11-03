import { assertEquals } from "@std/assert"

import ok from "../../../monads/result/ok/index.ts"
import _sortWithToResult from "./index.ts"

Deno.test("_sortWithToResult returns ok with sorted array", function testSortWithToResultBasic() {
	function ascending(a: number, b: number): number {
		return a - b
	}
	const result = _sortWithToResult([ascending])([3, 1, 2])

	assertEquals(result, ok([1, 2, 3]))
})

Deno.test("_sortWithToResult handles empty array", function testSortWithToResultEmpty() {
	function ascending(a: number, b: number): number {
		return a - b
	}
	const result = _sortWithToResult([ascending])([])

	assertEquals(result, ok([]))
})
