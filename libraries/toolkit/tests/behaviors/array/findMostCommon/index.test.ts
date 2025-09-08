import * as fc from "fast-check"
import { assertEquals } from "jsr:@std/assert@1.0.8"

import findMostCommon from "../../../../src/simple/array/findMostCommon/index.ts"

Deno.test("findMostCommon", async (t) => {
	await t.step("returns empty array for null or undefined", () => {
		assertEquals(findMostCommon(null), [])
		assertEquals(findMostCommon(undefined), [])
	})

	await t.step("returns empty array for empty array", () => {
		assertEquals(findMostCommon([]), [])
	})

	await t.step("finds single most common element", () => {
		assertEquals(findMostCommon([1, 2, 3, 2, 4, 2, 5]), [2])
		assertEquals(findMostCommon(["a", "b", "a", "c", "a"]), ["a"])
	})

	await t.step("returns all elements when tied for most common", () => {
		assertEquals(findMostCommon([1, 1, 2, 2, 3, 3]), [1, 2, 3])
		assertEquals(findMostCommon(["a", "a", "b", "b"]), ["a", "b"])
	})

	await t.step("returns all elements when all unique", () => {
		assertEquals(findMostCommon([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
		assertEquals(findMostCommon(["a", "b", "c"]), ["a", "b", "c"])
	})

	await t.step("preserves order of first occurrence on ties", () => {
		assertEquals(findMostCommon([3, 1, 2, 1, 3, 2]), [3, 1, 2])
		assertEquals(findMostCommon([5, 4, 3, 3, 4, 5]), [5, 4, 3])
	})

	await t.step("handles single element array", () => {
		assertEquals(findMostCommon([42]), [42])
		assertEquals(findMostCommon(["test"]), ["test"])
	})

	await t.step("handles NaN with SameValueZero", () => {
		assertEquals(findMostCommon([NaN, NaN, 1, 1]), [NaN, 1])
		assertEquals(findMostCommon([NaN, NaN, NaN, 1, 1]), [NaN])
	})

	await t.step("handles special numeric values", () => {
		assertEquals(findMostCommon([0, -0, 0, 1]), [0])
		assertEquals(findMostCommon([Infinity, -Infinity, Infinity]), [
			Infinity,
		])
	})

	await t.step("handles null and undefined as values", () => {
		assertEquals(findMostCommon([null, undefined, null, undefined, 1]), [
			null,
			undefined,
		])
		assertEquals(findMostCommon([null, null, null, undefined]), [null])
	})

	await t.step("handles boolean values", () => {
		assertEquals(findMostCommon([true, false, true, false, true]), [true])
		assertEquals(findMostCommon([false, false, true]), [false])
	})

	await t.step("handles mixed type arrays", () => {
		const mixed = [1, "1", 1, "1", true, 1] as const
		assertEquals(findMostCommon(mixed), [1])
	})

	await t.step("handles objects by reference", () => {
		const obj1 = { id: 1 }
		const obj2 = { id: 1 }
		const obj3 = obj1
		assertEquals(findMostCommon([obj1, obj2, obj3, obj3]), [obj1])
		assertEquals(findMostCommon([obj1, obj2]), [obj1, obj2])
	})

	await t.step("handles arrays by reference", () => {
		const arr1 = [1, 2]
		const arr2 = [1, 2]
		const arr3 = arr1
		assertEquals(findMostCommon([arr1, arr2, arr3, arr3]), [arr1])
	})

	await t.step("handles symbols", () => {
		const sym1 = Symbol("test")
		const sym2 = Symbol("test")
		assertEquals(findMostCommon([sym1, sym2, sym1, sym1]), [sym1])
		assertEquals(findMostCommon([sym1, sym2]), [sym1, sym2])
	})

	await t.step("handles dates by reference", () => {
		const date1 = new Date("2024-01-01")
		const date2 = new Date("2024-01-01")
		const date3 = date1
		assertEquals(findMostCommon([date1, date2, date3, date3]), [date1])
	})

	await t.step("handles functions by reference", () => {
		const fn1 = () => 1
		const fn2 = () => 1
		const fn3 = fn1
		assertEquals(findMostCommon([fn1, fn2, fn3, fn3]), [fn1])
	})

	await t.step("handles large arrays", () => {
		const large = [
			...Array(100).fill(1),
			...Array(200).fill(2),
			...Array(150).fill(3),
		]
		assertEquals(findMostCommon(large), [2])
	})

	await t.step("handles string arrays", () => {
		const words = "the quick brown fox the".split(" ")
		assertEquals(findMostCommon(words), ["the"])

		const letters = "aabbccdddeee".split("")
		assertEquals(findMostCommon(letters), ["d", "e"])
	})

	await t.step("handles complex tie scenarios", () => {
		// Multiple groups with same frequency
		assertEquals(findMostCommon([1, 1, 2, 2, 3, 3, 4, 5]), [1, 2, 3])

		// All elements appear exactly twice
		assertEquals(findMostCommon([5, 3, 1, 3, 5, 1]), [5, 3, 1])
	})

	await t.step(
		"property: result elements are from the original array",
		() => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					const result = findMostCommon(arr)
					if (arr.length === 0) return result.length === 0

					// Every element in result exists in original array
					return result.every((item) => {
						// Use Set's has method which uses SameValueZero
						const set = new Set(arr)
						return set.has(item)
					})
				}),
			)
		},
	)

	await t.step(
		"property: result elements have maximum frequency",
		() => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 20 }), { minLength: 1 }),
					(arr) => {
						const result = findMostCommon(arr)

						// Calculate frequencies
						const freq = new Map<number, number>()
						arr.forEach((item) => {
							freq.set(item, (freq.get(item) || 0) + 1)
						})

						const maxFreq = Math.max(...freq.values())

						// All result elements should have max frequency
						return result.every((item) => freq.get(item) === maxFreq)
					},
				),
			)
		},
	)

	await t.step(
		"property: no element with max frequency is excluded",
		() => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 20 }), { minLength: 1 }),
					(arr) => {
						const result = findMostCommon(arr)

						// Calculate frequencies
						const freq = new Map<number, number>()
						arr.forEach((item) => {
							freq.set(item, (freq.get(item) || 0) + 1)
						})

						const maxFreq = Math.max(...freq.values())

						// Find all elements with max frequency
						const expectedSet = new Set<number>()
						freq.forEach((count, item) => {
							if (count === maxFreq) {
								expectedSet.add(item)
							}
						})

						const resultSet = new Set(result)
						return expectedSet.size === resultSet.size
					},
				),
			)
		},
	)

	await t.step(
		"property: preserves order of first occurrence",
		() => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 10 }), { minLength: 1 }),
					(arr) => {
						const result = findMostCommon(arr)
						if (result.length <= 1) return true

						// Check that result preserves first occurrence order
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

	await t.step(
		"property: empty array returns empty result",
		() => {
			assertEquals(findMostCommon([]), [])
		},
	)

	await t.step(
		"property: single element array returns that element",
		() => {
			fc.assert(
				fc.property(fc.anything(), (item) => {
					const result = findMostCommon([item])
					return result.length === 1 &&
						Object.is(result[0], item) // Use Object.is for NaN comparison
				}),
			)
		},
	)
})
