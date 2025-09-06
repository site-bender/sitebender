import * as fc from "fast-check"
import { assertEquals } from "jsr:@std/assert@1.0.8"

import findDuplicates from "../../../../src/simple/array/findDuplicates/index.ts"

Deno.test("findDuplicates", async (t) => {
	await t.step("returns empty array for null or undefined", () => {
		assertEquals(findDuplicates(null), [])
		assertEquals(findDuplicates(undefined), [])
	})

	await t.step("returns empty array for empty array", () => {
		assertEquals(findDuplicates([]), [])
	})

	await t.step("returns empty array when no duplicates", () => {
		assertEquals(findDuplicates([1, 2, 3, 4, 5]), [])
		assertEquals(findDuplicates(["a", "b", "c"]), [])
	})

	await t.step("finds duplicates in numeric array", () => {
		assertEquals(findDuplicates([1, 2, 3, 2, 4, 1, 5]), [1, 2])
		assertEquals(findDuplicates([5, 5, 5, 5]), [5])
		assertEquals(findDuplicates([0, 1, 0, 2, 1, 3]), [0, 1])
	})

	await t.step("finds duplicates in string array", () => {
		assertEquals(findDuplicates(["a", "b", "c", "b", "a"]), ["a", "b"])
		assertEquals(findDuplicates(["hello", "world", "hello"]), ["hello"])
		assertEquals(findDuplicates(["", "", "test", ""]), [""])
	})

	await t.step("finds duplicates in boolean array", () => {
		assertEquals(findDuplicates([true, false, true, false]), [true, false])
		assertEquals(findDuplicates([false, false, false]), [false])
	})

	await t.step("handles mixed type arrays", () => {
		const mixed = [1, "1", 1, "1", true, true] as const
		assertEquals(findDuplicates(mixed), [1, "1", true])
	})

	await t.step("handles NaN correctly (uses SameValueZero)", () => {
		assertEquals(findDuplicates([NaN, NaN]), [NaN])
		assertEquals(findDuplicates([1, NaN, 2, NaN, 3]), [NaN])
	})

	await t.step("handles special numeric values", () => {
		assertEquals(findDuplicates([0, -0, 0]), [0])
		assertEquals(findDuplicates([Infinity, -Infinity, Infinity]), [
			Infinity,
		])
	})

	await t.step("handles objects by reference", () => {
		const obj1 = { id: 1 }
		const obj2 = { id: 1 }
		const obj3 = obj1
		assertEquals(findDuplicates([obj1, obj2, obj3]), [obj1])
		assertEquals(findDuplicates([obj1, obj2]), [])
	})

	await t.step("handles arrays by reference", () => {
		const arr1 = [1, 2]
		const arr2 = [1, 2]
		const arr3 = arr1
		assertEquals(findDuplicates([arr1, arr2, arr3]), [arr1])
		assertEquals(findDuplicates([arr1, arr2]), [])
	})

	await t.step("preserves order of first occurrence", () => {
		assertEquals(findDuplicates([3, 1, 2, 1, 3, 4, 2]), [3, 1, 2])
		assertEquals(findDuplicates(["c", "a", "b", "a", "c"]), ["c", "a"])
	})

	await t.step("handles single duplicate", () => {
		assertEquals(findDuplicates([1, 1]), [1])
		assertEquals(findDuplicates(["test", "test"]), ["test"])
	})

	await t.step("handles multiple occurrences (>2)", () => {
		assertEquals(findDuplicates([1, 1, 1, 1, 1]), [1])
		assertEquals(findDuplicates([1, 2, 1, 2, 1, 2]), [1, 2])
		assertEquals(findDuplicates(["a", "a", "a", "b", "b", "b"]), ["a", "b"])
	})

	await t.step("handles null and undefined as values", () => {
		assertEquals(findDuplicates([null, undefined, null, undefined]), [
			null,
			undefined,
		])
		assertEquals(findDuplicates([1, null, 2, null, 3]), [null])
		assertEquals(findDuplicates([undefined, "test", undefined]), [
			undefined,
		])
	})

	await t.step("handles symbols", () => {
		const sym1 = Symbol("test")
		const sym2 = Symbol("test")
		assertEquals(findDuplicates([sym1, sym2, sym1]), [sym1])
		assertEquals(findDuplicates([sym1, sym2]), [])
	})

	await t.step("handles dates by reference", () => {
		const date1 = new Date("2024-01-01")
		const date2 = new Date("2024-01-01")
		const date3 = date1
		assertEquals(findDuplicates([date1, date2, date3]), [date1])
		assertEquals(findDuplicates([date1, date2]), [])
	})

	await t.step("handles functions by reference", () => {
		const fn1 = () => 1
		const fn2 = () => 1
		const fn3 = fn1
		assertEquals(findDuplicates([fn1, fn2, fn3]), [fn1])
		assertEquals(findDuplicates([fn1, fn2]), [])
	})

	await t.step("handles large arrays", () => {
		const large = Array(1000).fill(1).concat(Array(1000).fill(2))
		assertEquals(findDuplicates(large), [1, 2])

		const sequential = Array.from({ length: 100 }, (_, i) => i % 10)
		const expected = Array.from({ length: 10 }, (_, i) => i)
		assertEquals(findDuplicates(sequential), expected)
	})

	await t.step(
		"property: result contains only elements that appear more than once",
		() => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					const result = findDuplicates(arr)
					const counts = new Map<unknown, number>()

					// Count occurrences
					for (const item of arr) {
						counts.set(item, (counts.get(item) || 0) + 1)
					}

					// Every element in result should appear at least twice in original
					return result.every((item) => (counts.get(item) || 0) >= 2)
				}),
			)
		},
	)

	await t.step(
		"property: each duplicate appears only once in result",
		() => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					const result = findDuplicates(arr)
					const resultSet = new Set(result)
					return result.length === resultSet.size
				}),
			)
		},
	)

	await t.step(
		"property: result preserves order of first occurrence",
		() => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 20 })),
					(arr) => {
						const result = findDuplicates(arr)
						if (result.length <= 1) return true

						// Check that the order in result matches first occurrence order
						const firstIndices = new Map<number, number>()
						arr.forEach((item, index) => {
							if (!firstIndices.has(item)) {
								firstIndices.set(item, index)
							}
						})

						for (let i = 0; i < result.length - 1; i++) {
							const index1 = firstIndices.get(result[i]) ??
								Infinity
							const index2 = firstIndices.get(result[i + 1]) ??
								Infinity
							if (index1 >= index2) return false
						}
						return true
					},
				),
			)
		},
	)

	await t.step("property: result length is at most half of input", () => {
		fc.assert(
			fc.property(fc.array(fc.anything()), (arr) => {
				const result = findDuplicates(arr)
				return result.length <= Math.floor(arr.length / 2)
			}),
		)
	})

	await t.step("property: empty array returns empty array", () => {
		assertEquals(findDuplicates([]), [])
	})

	await t.step(
		"property: array with unique elements returns empty array",
		() => {
			fc.assert(
				fc.property(
					fc.uniqueArray(fc.anything(), {
						minLength: 0,
						maxLength: 100,
					}),
					(arr) => {
						const result = findDuplicates(arr)
						// Since we used uniqueArray, all elements are unique
						return result.length === 0
					},
				),
			)
		},
	)
})
