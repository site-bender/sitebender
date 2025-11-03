import { assertEquals } from "@std/assert"

import ok from "../../../monads/result/ok/index.ts"
import _sortByToResult from "./index.ts"

Deno.test("_sortByToResult returns ok with sorted array", function testSortByToResultBasic() {
	function getAge(person: { age: number }): number {
		return person.age
	}
	const result = _sortByToResult(getAge)([
		{ age: 30 },
		{ age: 20 },
	])

	assertEquals(result, ok([{ age: 20 }, { age: 30 }]))
})

Deno.test("_sortByToResult handles empty array", function testSortByToResultEmpty() {
	function getId(item: { id: number }): number {
		return item.id
	}
	const result = _sortByToResult(getId)([])

	assertEquals(result, ok([]))
})
