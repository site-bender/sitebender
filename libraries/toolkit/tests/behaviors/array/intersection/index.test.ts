import { assert, assertEquals } from "jsr:@std/assert@1.0.8"
import * as fc from "npm:fast-check@3"

import intersection from "../../../../src/simple/array/intersection/index.ts"

Deno.test("intersection", async (t) => {
	await t.step("returns common elements", () => {
		assertEquals(intersection([2, 3, 4])([1, 2, 3, 5]), [2, 3])
	})

	await t.step("works with strings", () => {
		assertEquals(
			intersection(["b", "c", "d"])(["a", "b", "c", "e"]),
			["b", "c"],
		)
	})

	await t.step("returns all elements when identical arrays", () => {
		assertEquals(intersection([1, 2, 3])([1, 2, 3]), [1, 2, 3])
	})

	await t.step("preserves duplicates from first array", () => {
		assertEquals(intersection([2, 3])([1, 2, 2, 3, 3, 3]), [2, 2, 3, 3, 3])
	})

	await t.step("does not include duplicates from second array only", () => {
		assertEquals(intersection([2, 2, 3, 3])([1, 2, 3]), [2, 3])
	})

	await t.step("preserves order from first array", () => {
		assertEquals(intersection([3, 2, 1])([1, 2, 3, 4, 5]), [1, 2, 3])
	})

	await t.step("returns empty when no common elements", () => {
		assertEquals(intersection([4, 5])([6, 7]), [])
	})

	await t.step("returns empty when first array is empty", () => {
		assertEquals(intersection([1, 2, 3])([]), [])
	})

	await t.step("returns empty when second array is empty", () => {
		assertEquals(intersection([])([1, 2, 3]), [])
	})

	await t.step("returns empty when both arrays are empty", () => {
		assertEquals(intersection([])([]), [])
	})

	await t.step("handles null first array", () => {
		assertEquals(intersection([1, 2])(null), [])
	})

	await t.step("handles undefined first array", () => {
		assertEquals(intersection([1, 2])(undefined), [])
	})

	await t.step("handles null second array", () => {
		assertEquals(intersection(null)([1, 2]), [])
	})

	await t.step("handles undefined second array", () => {
		assertEquals(intersection(undefined)([1, 2]), [])
	})

	await t.step("works with objects using reference equality", () => {
		const obj1 = { a: 1 }
		const obj2 = { b: 2 }
		const obj3 = { c: 3 }
		const arr1 = [obj1, obj2]
		const arr2 = [obj2, obj3]
		assertEquals(intersection(arr2)(arr1), [obj2])
	})

	await t.step("works with mixed types", () => {
		const mixed1 = [1, "2", 3, "4", 5]
		const mixed2 = ["2", 3, 4, "5"]
		assertEquals(intersection(mixed2)(mixed1), ["2", 3])
	})

	await t.step("handles special numeric values", () => {
		assertEquals(intersection([NaN, 0, -0])([NaN, Infinity, 0]), [NaN, 0])
		// Note: -0 === 0 in JavaScript
		assertEquals(intersection([-0])([0]), [0])
	})

	await t.step("is curried", () => {
		const withEvens = intersection([2, 4, 6, 8])
		assertEquals(withEvens([1, 2, 3, 4]), [2, 4])
		assertEquals(withEvens([5, 6, 7, 8]), [6, 8])
	})

	await t.step("works with partial application", () => {
		const onlyValidIds = intersection([1, 2, 3, 4, 5])
		assertEquals(onlyValidIds([3, 4, 5, 6, 7]), [3, 4, 5])
	})

	await t.step("handles arrays with all duplicates", () => {
		assertEquals(intersection([2, 2])([1, 1, 1, 2, 2, 2]), [2, 2, 2])
	})

	await t.step("works with single element arrays", () => {
		assertEquals(intersection([1])([1]), [1])
		assertEquals(intersection([1])([2]), [])
	})

	await t.step("preserves type information", () => {
		const nums: number[] = [1, 2, 3]
		const result = intersection([2, 3, 4])(nums)
		// TypeScript should infer result as number[]
		const _check: number[] = result
		assertEquals(result, [2, 3])
	})

	await t.step("property tests", async (t) => {
		await t.step("result is subset of first array", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					(arr1, arr2) => {
						const result = intersection(arr2)(arr1)
						// Every element in result comes from arr1
						assert(result.every((elem, idx) => arr1.includes(elem)))
						// Preserves order from arr1
						for (let i = 1; i < result.length; i++) {
							const prevIdx = arr1.indexOf(result[i - 1])
							const currIdx = arr1.indexOf(result[i], prevIdx + 1)
							assert(prevIdx < currIdx)
						}
					},
				),
			)
		})

		await t.step("result elements exist in both arrays", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					(arr1, arr2) => {
						const result = intersection(arr2)(arr1)
						assert(result.every((elem) => arr1.includes(elem)))
						assert(result.every((elem) => arr2.includes(elem)))
					},
				),
			)
		})

		await t.step("empty array intersected with anything is empty", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(arr) => {
						assertEquals(intersection(arr)([]), [])
						assertEquals(intersection([])(arr), [])
					},
				),
			)
		})

		await t.step("intersection with self preserves all elements", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 100 }), {
						minLength: 0,
						maxLength: 20,
					}),
					(arr) => {
						const result = intersection(arr)(arr)
						assertEquals(result, arr)
					},
				),
			)
		})

		await t.step("result length <= first array length", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					(arr1, arr2) => {
						const result = intersection(arr2)(arr1)
						assert(result.length <= arr1.length)
					},
				),
			)
		})

		await t.step("commutative for sets (ignoring duplicates)", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 10 }), {
						minLength: 0,
						maxLength: 20,
					}),
					fc.array(fc.integer({ min: 0, max: 10 }), {
						minLength: 0,
						maxLength: 20,
					}),
					(arr1, arr2) => {
						const result1 = intersection(arr2)(arr1)
						const result2 = intersection(arr1)(arr2)
						// Convert to sets to ignore duplicates and order
						const set1 = new Set(result1)
						const set2 = new Set(result2)
						assertEquals(set1.size, set2.size)
						assert([...set1].every((elem) => set2.has(elem)))
					},
				),
			)
		})

		await t.step("preserves duplicate count from first array", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 5 }), {
						minLength: 1,
						maxLength: 20,
					}),
					fc.array(fc.integer({ min: 0, max: 5 }), {
						minLength: 1,
						maxLength: 20,
					}),
					(arr1, arr2) => {
						const result = intersection(arr2)(arr1)
						// Count occurrences of each value
						const countInArr1 = (val: number) =>
							arr1.filter((x) => x === val).length
						const countInResult = (val: number) =>
							result.filter((x) => x === val).length

						// For each unique value in result
						const uniqueValues = [...new Set(result)]
						for (const val of uniqueValues) {
							// It should appear in arr2
							assert(arr2.includes(val))
							// Count in result should match count in arr1
							assertEquals(countInResult(val), countInArr1(val))
						}
					},
				),
			)
		})
	})

	await t.step("works with large arrays", () => {
		const large1 = Array.from({ length: 10000 }, (_, i) => i)
		const large2 = Array.from({ length: 10000 }, (_, i) => i + 5000)
		const result = intersection(large2)(large1)
		assertEquals(result.length, 5000)
		assertEquals(result[0], 5000)
		assertEquals(result[result.length - 1], 9999)
	})

	await t.step("handles arrays with undefined and null values", () => {
		assertEquals(
			intersection([null, undefined, 1])([undefined, null, 2]),
			[undefined, null],
		)
	})

	await t.step("preserves exact duplicates from first array", () => {
		const arr1 = [1, 1, 2, 2, 2, 3, 3, 3, 3]
		const arr2 = [2, 3]
		const result = intersection(arr2)(arr1)
		assertEquals(result, [2, 2, 2, 3, 3, 3, 3])

		// Verify exact counts
		assertEquals(result.filter((x) => x === 2).length, 3)
		assertEquals(result.filter((x) => x === 3).length, 4)
	})
})