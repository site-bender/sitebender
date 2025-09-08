import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import {
	assertType,
	IsExact,
} from "https://deno.land/std@0.218.0/testing/types.ts"
import * as fc from "npm:fast-check@3"

import reject from "../../../../src/simple/array/reject/index.ts"

Deno.test("reject: basic functionality", async (t) => {
	await t.step("should reject elements that match predicate", () => {
		const isEven = (x: number) => x % 2 === 0
		const result = reject(isEven)([1, 2, 3, 4, 5, 6])
		assertEquals(result, [1, 3, 5])
	})

	await t.step("should reject null and undefined values", () => {
		const isNullish = (x: unknown) => x == null
		const result = reject(isNullish)([1, null, 2, undefined, 3, null])
		assertEquals(result, [1, 2, 3])
	})

	await t.step("should reject by property", () => {
		const users = [
			{ name: "Alice", active: true },
			{ name: "Bob", active: false },
			{ name: "Charlie", active: true },
			{ name: "David", active: false },
		]
		const isInactive = (u: { active: boolean }) => !u.active
		const result = reject(isInactive)(users)
		assertEquals(result, [
			{ name: "Alice", active: true },
			{ name: "Charlie", active: true },
		])
	})

	await t.step("should pass index to predicate", () => {
		const isEvenIndex = (_val: number, idx: number) => idx % 2 === 0
		const result = reject(isEvenIndex)([10, 20, 30, 40, 50])
		assertEquals(result, [20, 40])
	})

	await t.step("should pass array reference to predicate", () => {
		let receivedArray: ReadonlyArray<number> | undefined
		const predicate = (
			_val: number,
			_idx: number,
			arr: ReadonlyArray<number>,
		) => {
			receivedArray = arr
			return false
		}
		const input = [1, 2, 3]
		reject(predicate)(input)
		assertEquals(receivedArray, input)
	})
})

Deno.test("reject: complement of filter", async (t) => {
	await t.step("should be the opposite of filter", () => {
		const isPositive = (x: number) => x > 0
		const arr = [-2, -1, 0, 1, 2]

		const rejected = reject(isPositive)(arr)
		const filtered = arr.filter(isPositive)

		// Rejected should contain elements not in filtered
		assertEquals(rejected, [-2, -1, 0])
		assertEquals(filtered, [1, 2])

		// Together they should form the original array
		assertEquals([...rejected, ...filtered].sort(), arr.sort())
	})

	await t.step("reject all should return empty array", () => {
		const alwaysTrue = () => true
		const result = reject(alwaysTrue)([1, 2, 3, 4])
		assertEquals(result, [])
	})

	await t.step("reject none should return all elements", () => {
		const alwaysFalse = () => false
		const arr = [1, 2, 3, 4]
		const result = reject(alwaysFalse)(arr)
		assertEquals(result, arr)
	})
})

Deno.test("reject: edge cases", async (t) => {
	await t.step("should handle empty array", () => {
		const isEven = (x: number) => x % 2 === 0
		const result = reject(isEven)([])
		assertEquals(result, [])
	})

	await t.step("should handle null input", () => {
		const isEven = (x: number) => x % 2 === 0
		const result = reject(isEven)(null)
		assertEquals(result, [])
	})

	await t.step("should handle undefined input", () => {
		const isEven = (x: number) => x % 2 === 0
		const result = reject(isEven)(undefined)
		assertEquals(result, [])
	})

	await t.step("should handle single element array", () => {
		const isEven = (x: number) => x % 2 === 0
		assertEquals(reject(isEven)([2]), [])
		assertEquals(reject(isEven)([3]), [3])
	})

	await t.step("should handle arrays with all same elements", () => {
		const isTwo = (x: number) => x === 2
		assertEquals(reject(isTwo)([2, 2, 2, 2]), [])
		assertEquals(reject(isTwo)([3, 3, 3, 3]), [3, 3, 3, 3])
	})
})

Deno.test("reject: type safety", async (t) => {
	await t.step("should maintain correct types", () => {
		const isString = (x: string | number): x is string => typeof x === "string"
		const mixed: (string | number)[] = [1, "two", 3, "four"]
		const result = reject(isString)(mixed)

		assertType<IsExact<typeof result, (string | number)[]>>(true)
		assertEquals(result, [1, 3])
	})

	await t.step("should work with complex types", () => {
		interface User {
			id: number
			name: string
			admin: boolean
		}

		const users: User[] = [
			{ id: 1, name: "Alice", admin: true },
			{ id: 2, name: "Bob", admin: false },
			{ id: 3, name: "Charlie", admin: true },
		]

		const isAdmin = (u: User) => u.admin
		const result = reject(isAdmin)(users)

		assertType<IsExact<typeof result, User[]>>(true)
		assertEquals(result, [{ id: 2, name: "Bob", admin: false }])
	})
})

Deno.test("reject: currying", async (t) => {
	await t.step("should be properly curried", () => {
		const isNegative = (x: number) => x < 0
		const rejectNegative = reject(isNegative)

		assertEquals(rejectNegative([-2, -1, 0, 1, 2]), [0, 1, 2])
		assertEquals(rejectNegative([-5, -10, 5, 10]), [5, 10])
	})

	await t.step("should allow partial application", () => {
		const rejectFalsy = reject((x: unknown) => !x)

		assertEquals(rejectFalsy([0, 1, "", "hello", false, true]), [
			1,
			"hello",
			true,
		])
		assertEquals(rejectFalsy([null, undefined, NaN, 42]), [42])
	})
})

Deno.test("reject: immutability", async (t) => {
	await t.step("should not modify the original array", () => {
		const original = [1, 2, 3, 4, 5]
		const copy = [...original]
		const isOdd = (x: number) => x % 2 === 1

		reject(isOdd)(original)
		assertEquals(original, copy)
	})

	await t.step("should not modify nested objects", () => {
		const original = [{ val: 1 }, { val: 2 }, { val: 3 }]
		const copy = original.map((obj) => ({ ...obj }))
		const hasEvenVal = (x: { val: number }) => x.val % 2 === 0

		reject(hasEvenVal)(original)
		assertEquals(original, copy)
	})
})

Deno.test("reject: practical examples", async (t) => {
	await t.step("should filter out invalid entries", () => {
		const entries = ["valid", "", "  ", "another", null, "last"]
		const isInvalid = (x: unknown) =>
			!x || (typeof x === "string" && x.trim() === "")
		const result = reject(isInvalid)(entries)
		assertEquals(result, ["valid", "another", "last"])
	})

	await t.step("should remove disabled features", () => {
		const features = [
			{ name: "feature1", enabled: true },
			{ name: "feature2", enabled: false },
			{ name: "feature3", enabled: true },
			{ name: "feature4", enabled: false },
		]
		const isDisabled = (f: { enabled: boolean }) => !f.enabled
		const result = reject(isDisabled)(features)
		assertEquals(result, [
			{ name: "feature1", enabled: true },
			{ name: "feature3", enabled: true },
		])
	})

	await t.step("should exclude specific values", () => {
		const excludeList = [2, 4, 6]
		const isExcluded = (x: number) => excludeList.includes(x)
		const result = reject(isExcluded)([1, 2, 3, 4, 5, 6, 7])
		assertEquals(result, [1, 3, 5, 7])
	})
})

Deno.test("reject: property-based tests", async (t) => {
	await t.step("should always return subset of original array", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.func(fc.boolean()),
				(arr, pred) => {
					const result = reject(pred)(arr)
					return result.every((item) => arr.includes(item))
				},
			),
		)
	})

	await t.step("should have length <= original array length", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.func(fc.boolean()),
				(arr, pred) => {
					const result = reject(pred)(arr)
					return result.length <= arr.length
				},
			),
		)
	})

	await t.step("reject and filter together should equal original", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer({ min: -100, max: 100 })),
				(arr) => {
					const predicate = (x: number) => x > 0
					const rejected = reject(predicate)(arr)
					const filtered = arr.filter(predicate)

					const combined = [...rejected, ...filtered]
					return combined.length === arr.length &&
						arr.every((item) => combined.includes(item))
				},
			),
		)
	})

	await t.step("should handle null/undefined consistently", () => {
		fc.assert(
			fc.property(
				fc.func(fc.boolean()),
				(pred) => {
					const nullResult = reject(pred)(null)
					const undefinedResult = reject(pred)(undefined)
					return JSON.stringify(nullResult) === "[]" &&
						JSON.stringify(undefinedResult) === "[]"
				},
			),
		)
	})
})

Deno.test("reject: specific test cases from examples", async (t) => {
	await t.step("should reject even numbers", () => {
		const isEven = (x: number) => x % 2 === 0
		assertEquals(reject(isEven)([1, 2, 3, 4, 5, 6]), [1, 3, 5])
	})

	await t.step("should reject null and undefined", () => {
		const isNullish = (x: unknown) => x == null
		assertEquals(reject(isNullish)([1, null, 2, undefined, 3]), [1, 2, 3])
	})

	await t.step("should reject by property", () => {
		const users = [
			{ name: "Alice", active: true },
			{ name: "Bob", active: false },
			{ name: "Charlie", active: true },
		]
		const isInactive = (u: { active: boolean }) => !u.active
		assertEquals(reject(isInactive)(users), [
			{ name: "Alice", active: true },
			{ name: "Charlie", active: true },
		])
	})

	await t.step("should reject with index", () => {
		const isEvenIndex = (_val: number, idx: number) => idx % 2 === 0
		assertEquals(reject(isEvenIndex)([10, 20, 30, 40, 50]), [20, 40])
	})

	await t.step("should handle edge cases from examples", () => {
		assertEquals(reject(() => true)([1, 2, 3]), [])
		assertEquals(reject(() => false)([1, 2, 3]), [1, 2, 3])
		assertEquals(reject(() => true)(null), [])
	})
})
