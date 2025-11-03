import { assertEquals } from "@std/assert"

import success from "../../../monads/validation/success/index.ts"
import _sortByToValidation from "./index.ts"

Deno.test("_sortByToValidation returns success with sorted array", function testSortByToValidationBasic() {
	function getAge(person: { age: number }): number {
		return person.age
	}
	const result = _sortByToValidation(getAge)([
		{ age: 30 },
		{ age: 20 },
	])

	assertEquals(result, success([{ age: 20 }, { age: 30 }]))
})

Deno.test("_sortByToValidation handles empty array", function testSortByToValidationEmpty() {
	function getId(item: { id: number }): number {
		return item.id
	}
	const result = _sortByToValidation(getId)([])

	assertEquals(result, success([]))
})
