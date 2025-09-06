import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import {
	assertType,
	IsExact,
} from "https://deno.land/std@0.218.0/testing/types.ts"
import * as fc from "npm:fast-check@3"

import symmetricDifference from "../../../../src/simple/array/symmetricDifference/index.ts"

Deno.test("symmetricDifference: basic functionality", async (t) => {
	await t.step("should return elements in either array but not both", () => {
		const result = symmetricDifference([1, 2, 3])([3, 4, 5])
		assertEquals(result.sort(), [1, 2, 4, 5])
	})

	await t.step("should handle disjoint arrays", () => {
		const result = symmetricDifference([1, 2])([3, 4])
		assertEquals(result.sort(), [1, 2, 3, 4])
	})

	await t.step("should return empty for identical arrays", () => {
		const result = symmetricDifference([1, 2, 3])([1, 2, 3])
		assertEquals(result, [])
	})

	await t.step("should handle duplicates by removing them", () => {
		const result = symmetricDifference([1, 1, 2])([2, 2, 3])
		assertEquals(result.sort(), [1, 3])
	})

	await t.step("should work with strings", () => {
		const result = symmetricDifference(["a", "b", "c"])(["b", "c", "d"])
		assertEquals(result.sort(), ["a", "d"])
	})

	await t.step("should work with mixed types", () => {
		const result = symmetricDifference([1, "2", 3])([3, "4", 5])
		// 1, "2" from first; "4", 5 from second
		assertEquals(result.length, 4)
		assertEquals(result.includes(1), true)
		assertEquals(result.includes("2"), true)
		assertEquals(result.includes("4"), true)
		assertEquals(result.includes(5), true)
	})
})

Deno.test("symmetricDifference: edge cases", async (t) => {
	await t.step("should handle empty arrays", () => {
		assertEquals(symmetricDifference([])([]), [])
		assertEquals(symmetricDifference([1, 2])([]), [1, 2])
		assertEquals(symmetricDifference([])([3, 4]), [3, 4])
	})

	await t.step("should handle null first array", () => {
		const result = symmetricDifference(null)([1, 2])
		assertEquals(result, [1, 2])
	})

	await t.step("should handle undefined first array", () => {
		const result = symmetricDifference(undefined)([1, 2])
		assertEquals(result, [1, 2])
	})

	await t.step("should handle null second array", () => {
		const result = symmetricDifference([1, 2])(null)
		assertEquals(result, [1, 2])
	})

	await t.step("should handle undefined second array", () => {
		const result = symmetricDifference([1, 2])(undefined)
		assertEquals(result, [1, 2])
	})

	await t.step("should handle both null arrays", () => {
		assertEquals(symmetricDifference(null)(null), [])
		assertEquals(symmetricDifference(undefined)(undefined), [])
	})

	await t.step("should handle single element arrays", () => {
		assertEquals(symmetricDifference([1])([1]), [])
		assertEquals(symmetricDifference([1])([2]), [1, 2])
	})
})

Deno.test("symmetricDifference: special values", async (t) => {
	await t.step("should handle NaN with SameValueZero", () => {
		const result = symmetricDifference([NaN, 1])([NaN, 2])
		assertEquals(result.sort(), [1, 2])
	})

	await t.step("should treat +0 and -0 as same with SameValueZero", () => {
		const result = symmetricDifference([0, 1])([-0, 2])
		assertEquals(result.sort(), [1, 2])
	})

	await t.step("should handle undefined values", () => {
		const result = symmetricDifference([undefined, 1])([undefined, 2])
		assertEquals(result.sort(), [1, 2])
	})

	await t.step("should handle null values", () => {
		const result = symmetricDifference([null, 1])([null, 2])
		assertEquals(result.sort(), [1, 2])
	})

	await t.step("should handle Infinity", () => {
		const result = symmetricDifference([Infinity, 1])([Infinity, 2])
		assertEquals(result.sort(), [1, 2])

		const result2 = symmetricDifference([Infinity, -Infinity])([Infinity])
		assertEquals(result2, [-Infinity])
	})
})

Deno.test("symmetricDifference: object references", async (t) => {
	await t.step("should use reference equality for objects", () => {
		const obj1 = { id: 1 }
		const obj2 = { id: 2 }
		const obj3 = { id: 3 }
		const obj1Copy = { id: 1 }

		const result = symmetricDifference([obj1, obj2])([obj2, obj3])
		assertEquals(result.length, 2)
		assertEquals(result.includes(obj1), true)
		assertEquals(result.includes(obj3), true)
		assertEquals(result.includes(obj2), false)

		// Different reference, so both included
		const result2 = symmetricDifference([obj1])([obj1Copy])
		assertEquals(result2.length, 2)
	})

	await t.step("should handle arrays as elements", () => {
		const arr1 = [1, 2]
		const arr2 = [3, 4]
		const arr3 = [5, 6]

		const result = symmetricDifference([arr1, arr2])([arr2, arr3])
		assertEquals(result.length, 2)
		assertEquals(result.includes(arr1), true)
		assertEquals(result.includes(arr3), true)
	})
})

Deno.test("symmetricDifference: type safety", async (t) => {
	await t.step("should maintain type information", () => {
		const result = symmetricDifference([1, 2])([3, 4])
		assertType<IsExact<typeof result, number[]>>(true)
		assertEquals(result.sort(), [1, 2, 3, 4])
	})

	await t.step("should work with complex types", () => {
		interface User {
			id: number
			name: string
		}
		const users1: User[] = [
			{ id: 1, name: "Alice" },
			{ id: 2, name: "Bob" },
		]
		const users2: User[] = [
			{ id: 2, name: "Bob" },
			{ id: 3, name: "Charlie" },
		]

		const result = symmetricDifference(users1)(users2)
		assertType<IsExact<typeof result, User[]>>(true)
		// Will include all 4 due to reference inequality
		assertEquals(result.length, 4)
	})
})

Deno.test("symmetricDifference: currying", async (t) => {
	await t.step("should be properly curried", () => {
		const diffWithBase = symmetricDifference([1, 2, 3])

		assertEquals(diffWithBase([2, 3, 4]).sort(), [1, 4])
		assertEquals(diffWithBase([]).sort(), [1, 2, 3])
		assertEquals(diffWithBase([1, 2, 3]), [])
	})

	await t.step("should allow partial application for comparisons", () => {
		const basePermissions = ["read", "write"]
		const diffFromBase = symmetricDifference(basePermissions)

		assertEquals(diffFromBase(["read", "write", "delete"]).sort(), [
			"delete",
		])
		assertEquals(diffFromBase(["read"]).sort(), ["write"])
		assertEquals(diffFromBase(["execute"]).sort(), [
			"execute",
			"read",
			"write",
		])
	})
})

Deno.test("symmetricDifference: immutability", async (t) => {
	await t.step("should not modify input arrays", () => {
		const array1 = [1, 2, 3]
		const array2 = [3, 4, 5]
		const copy1 = [...array1]
		const copy2 = [...array2]

		symmetricDifference(array1)(array2)

		assertEquals(array1, copy1)
		assertEquals(array2, copy2)
	})

	await t.step("should return new array", () => {
		const array1 = [1, 2]
		const array2 = [3, 4]
		const result = symmetricDifference(array1)(array2)

		// Result is a new array
		assertEquals(result !== array1, true)
		assertEquals(result !== array2, true)
	})
})

Deno.test("symmetricDifference: practical examples", async (t) => {
	await t.step("should find changed items between versions", () => {
		const oldItems = ["item1", "item2", "item3"]
		const newItems = ["item2", "item3", "item4"]
		const changed = symmetricDifference(oldItems)(newItems)

		assertEquals(changed.sort(), ["item1", "item4"])
	})

	await t.step("should find unique permissions", () => {
		const userAPerms = ["read", "write", "delete"]
		const userBPerms = ["read", "execute", "admin"]
		const uniquePerms = symmetricDifference(userAPerms)(userBPerms)

		assertEquals(uniquePerms.sort(), [
			"admin",
			"delete",
			"execute",
			"write",
		])
	})

	await t.step("should find differences in feature flags", () => {
		const prodFlags = ["feature-a", "feature-b", "feature-c"]
		const devFlags = ["feature-b", "feature-c", "feature-d", "feature-e"]
		const diff = symmetricDifference(prodFlags)(devFlags)

		assertEquals(diff.sort(), ["feature-a", "feature-d", "feature-e"])
	})

	await t.step("should find symmetric difference in tags", () => {
		const articleTags = ["javascript", "react", "frontend"]
		const userInterests = ["react", "backend", "python"]
		const unique = symmetricDifference(articleTags)(userInterests)

		assertEquals(unique.sort(), [
			"backend",
			"frontend",
			"javascript",
			"python",
		])
	})
})

Deno.test("symmetricDifference: property-based tests", async (t) => {
	await t.step("should be commutative", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.array(fc.integer()),
				(arr1, arr2) => {
					const result1 = symmetricDifference(arr1)(arr2).sort()
					const result2 = symmetricDifference(arr2)(arr1).sort()
					return JSON.stringify(result1) === JSON.stringify(result2)
				},
			),
		)
	})

	await t.step("should return empty when both arrays are identical", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				(arr) => {
					const result = symmetricDifference(arr)(arr)
					return result.length === 0
				},
			),
		)
	})

	await t.step("should include all elements when arrays are disjoint", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer({ min: 0, max: 100 })),
				fc.array(fc.integer({ min: 101, max: 200 })),
				(arr1, arr2) => {
					const result = symmetricDifference(arr1)(arr2)
					const set1 = new Set(arr1)
					const set2 = new Set(arr2)
					return result.length === set1.size + set2.size
				},
			),
		)
	})

	await t.step("should handle null/undefined consistently", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				(arr) => {
					const nullFirst = symmetricDifference(null)(arr)
					const undefinedFirst = symmetricDifference(undefined)(arr)
					const nullSecond = symmetricDifference(arr)(null)
					const undefinedSecond = symmetricDifference(arr)(undefined)

					const uniqueArr = [...new Set(arr)]
					return JSON.stringify(nullFirst.sort()) ===
							JSON.stringify(uniqueArr.sort()) &&
						JSON.stringify(undefinedFirst.sort()) ===
							JSON.stringify(uniqueArr.sort()) &&
						JSON.stringify(nullSecond.sort()) ===
							JSON.stringify(uniqueArr.sort()) &&
						JSON.stringify(undefinedSecond.sort()) ===
							JSON.stringify(uniqueArr.sort())
				},
			),
		)
	})

	await t.step("should remove duplicates", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.array(fc.integer()),
				(arr1, arr2) => {
					const result = symmetricDifference(arr1)(arr2)
					const uniqueResult = [...new Set(result)]
					return result.length === uniqueResult.length
				},
			),
		)
	})

	await t.step("should satisfy XOR property", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.array(fc.integer()),
				(arr1, arr2) => {
					const result = symmetricDifference(arr1)(arr2)
					const set1 = new Set(arr1)
					const set2 = new Set(arr2)

					// Every element in result should be in exactly one of the original sets
					return result.every((item) =>
						(set1.has(item) && !set2.has(item)) ||
						(!set1.has(item) && set2.has(item))
					)
				},
			),
		)
	})
})

Deno.test("symmetricDifference: specific test cases from examples", async (t) => {
	await t.step("should handle basic usage", () => {
		assertEquals(symmetricDifference([1, 2, 3])([3, 4, 5]).sort(), [
			1,
			2,
			4,
			5,
		])
		assertEquals(symmetricDifference([1, 2])([3, 4]).sort(), [1, 2, 3, 4])
	})

	await t.step("should return empty for complete overlap", () => {
		assertEquals(symmetricDifference([1, 2, 3])([1, 2, 3]), [])
	})

	await t.step("should find changed items", () => {
		const oldItems = ["item1", "item2", "item3"]
		const newItems = ["item2", "item3", "item4"]
		assertEquals(symmetricDifference(oldItems)(newItems).sort(), [
			"item1",
			"item4",
		])
	})

	await t.step("should remove duplicates", () => {
		assertEquals(symmetricDifference([1, 1, 2])([2, 2, 3]).sort(), [1, 3])
	})

	await t.step("should work with partial application", () => {
		const diffWithBase = symmetricDifference([1, 2, 3])
		assertEquals(diffWithBase([2, 3, 4]).sort(), [1, 4])
		assertEquals(diffWithBase([]).sort(), [1, 2, 3])
	})

	await t.step("should handle null/undefined", () => {
		assertEquals(symmetricDifference(null)([1, 2]).sort(), [1, 2])
		assertEquals(symmetricDifference([1, 2])(undefined).sort(), [1, 2])
	})
})
