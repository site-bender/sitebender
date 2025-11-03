import { assertEquals } from "@std/assert"

import ok from "../../../monads/result/ok/index.ts"
import _sortToResult from "./index.ts"

Deno.test("_sortToResult returns ok with sorted array", function testSortToResultBasic() {
	const result = _sortToResult<number>()([3, 1, 4, 1, 5])

	assertEquals(result, ok([1, 1, 3, 4, 5]))
})

Deno.test("_sortToResult with custom comparator", function testSortToResultCustom() {
	function descending(a: number, b: number): number {
		return b - a
	}
	const result = _sortToResult(descending)([3, 1, 4])

	assertEquals(result, ok([4, 3, 1]))
})

Deno.test("_sortToResult handles empty array", function testSortToResultEmpty() {
	const result = _sortToResult<number>()([])

	assertEquals(result, ok([]))
})
