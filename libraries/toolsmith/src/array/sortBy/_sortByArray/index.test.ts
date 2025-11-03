import { assertEquals } from "@std/assert"

import _sortByArray from "./index.ts"

Deno.test("_sortByArray sorts by mapping function", function testSortByArrayBasic() {
	function getAge(person: { age: number }): number {
		return person.age
	}
	const result = _sortByArray(getAge)([
		{ age: 30 },
		{ age: 20 },
		{ age: 40 },
	])

	assertEquals(result, [{ age: 20 }, { age: 30 }, { age: 40 }])
})

Deno.test("_sortByArray handles empty array", function testSortByArrayEmpty() {
	function getId(item: { id: number }): number {
		return item.id
	}
	const result = _sortByArray(getId)([])

	assertEquals(result, [])
})

Deno.test("_sortByArray maintains stable sort", function testSortByArrayStable() {
	function getCategory(item: { cat: string; id: number }): string {
		return item.cat
	}
	const result = _sortByArray(getCategory)([
		{ cat: "b", id: 1 },
		{ cat: "a", id: 2 },
		{ cat: "b", id: 3 },
	])

	assertEquals(result, [
		{ cat: "a", id: 2 },
		{ cat: "b", id: 1 },
		{ cat: "b", id: 3 },
	])
})
