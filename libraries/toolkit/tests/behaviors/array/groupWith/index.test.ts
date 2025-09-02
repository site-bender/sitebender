import { assert, assertEquals, assertFalse } from "jsr:@std/assert@1.0.8"
import * as fc from "npm:fast-check@3"

import groupWith from "../../../../src/simple/array/groupWith/index.ts"

Deno.test("groupWith", async (t) => {
	await t.step("groups consecutive equal elements", () => {
		const equal = (a: number, b: number) => a === b
		const result = groupWith(equal)([1, 1, 2, 2, 2, 3, 1, 1])
		assertEquals(result, [[1, 1], [2, 2, 2], [3], [1, 1]])
	})

	await t.step("groups ascending sequences", () => {
		const ascending = (a: number, b: number) => b >= a
		const result = groupWith(ascending)([1, 2, 3, 2, 3, 4, 1, 5])
		assertEquals(result, [[1, 2, 3], [2, 3, 4], [1, 5]])
	})

	await t.step("groups descending sequences", () => {
		const descending = (a: number, b: number) => b <= a
		const result = groupWith(descending)([5, 3, 1, 2, 1, 0, 4, 2])
		assertEquals(result, [[5, 3, 1], [2, 1, 0], [4, 2]])
	})

	await t.step("groups by property", () => {
		const items = [
			{ category: "A", value: 1 },
			{ category: "A", value: 2 },
			{ category: "B", value: 3 },
			{ category: "B", value: 4 },
			{ category: "A", value: 5 },
		]
		const sameCategory = <T extends { category: string }>(a: T, b: T) =>
			a.category === b.category
		const result = groupWith(sameCategory)(items)
		assertEquals(result, [
			[items[0], items[1]],
			[items[2], items[3]],
			[items[4]],
		])
	})

	await t.step("groups strings by length", () => {
		const sameLength = (a: string, b: string) => a.length === b.length
		const result = groupWith(sameLength)(["a", "b", "cc", "dd", "e", "fff"])
		assertEquals(result, [["a", "b"], ["cc", "dd"], ["e"], ["fff"]])
	})

	await t.step("handles single element array", () => {
		const equal = (a: number, b: number) => a === b
		const result = groupWith(equal)([42])
		assertEquals(result, [[42]])
	})

	await t.step("handles two element array - same group", () => {
		const equal = (a: number, b: number) => a === b
		const result = groupWith(equal)([1, 1])
		assertEquals(result, [[1, 1]])
	})

	await t.step("handles two element array - different groups", () => {
		const equal = (a: number, b: number) => a === b
		const result = groupWith(equal)([1, 2])
		assertEquals(result, [[1], [2]])
	})

	await t.step("handles empty array", () => {
		const equal = (a: number, b: number) => a === b
		const result = groupWith(equal)([])
		assertEquals(result, [])
	})

	await t.step("handles null", () => {
		const equal = (a: number, b: number) => a === b
		const result = groupWith(equal)(null)
		assertEquals(result, [])
	})

	await t.step("handles undefined", () => {
		const equal = (a: number, b: number) => a === b
		const result = groupWith(equal)(undefined)
		assertEquals(result, [])
	})

	await t.step("works with predicate that always returns true", () => {
		const alwaysTrue = (_a: number, _b: number) => true
		const result = groupWith(alwaysTrue)([1, 2, 3, 4, 5])
		assertEquals(result, [[1, 2, 3, 4, 5]])
	})

	await t.step("works with predicate that always returns false", () => {
		const alwaysFalse = (_a: number, _b: number) => false
		const result = groupWith(alwaysFalse)([1, 2, 3, 4, 5])
		assertEquals(result, [[1], [2], [3], [4], [5]])
	})

	await t.step("groups numbers by parity", () => {
		const sameParity = (a: number, b: number) => a % 2 === b % 2
		const result = groupWith(sameParity)([1, 3, 2, 4, 5, 7, 6, 8])
		assertEquals(result, [[1, 3], [2, 4], [5, 7], [6, 8]])
	})

	await t.step("groups numbers within threshold", () => {
		const withinThreshold = (a: number, b: number) => Math.abs(b - a) <= 2
		const result = groupWith(withinThreshold)([1, 2, 4, 7, 8, 10, 15])
		assertEquals(result, [[1, 2, 4], [7, 8, 10], [15]])
	})

	await t.step("handles special values", () => {
		const equal = (a: number, b: number) => Object.is(a, b)
		const result = groupWith(equal)([NaN, NaN, 0, -0, 0, Infinity, Infinity])
		assertEquals(result, [[NaN, NaN], [0], [-0], [0], [Infinity, Infinity]])
	})

	await t.step("is curried", () => {
		const equal = (a: number, b: number) => a === b
		const groupEqual = groupWith(equal)
		assertEquals(groupEqual([1, 1, 2]), [[1, 1], [2]])
		assertEquals(groupEqual([3, 3, 3]), [[3, 3, 3]])
	})

	await t.step("preserves element order within groups", () => {
		const items = [
			{ id: 1, type: "A" },
			{ id: 2, type: "A" },
			{ id: 3, type: "B" },
			{ id: 4, type: "A" },
		]
		const sameType = <T extends { type: string }>(a: T, b: T) =>
			a.type === b.type
		const result = groupWith(sameType)(items)
		assertEquals(result[0][0].id, 1)
		assertEquals(result[0][1].id, 2)
		assertEquals(result[1][0].id, 3)
		assertEquals(result[2][0].id, 4)
	})

	await t.step("property tests", async (t) => {
		await t.step("always returns array of arrays", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.func(fc.boolean()),
					(arr, predicate) => {
						const result = groupWith(predicate)(arr)
						assert(Array.isArray(result))
						assert(result.every((group) => Array.isArray(group)))
					},
				),
			)
		})

		await t.step("flattening reconstructs original array", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.func(fc.boolean()),
					(arr, predicate) => {
						const result = groupWith(predicate)(arr)
						const flattened = result.flat()
						assertEquals(flattened, arr)
					},
				),
			)
		})

		await t.step("no empty groups", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.func(fc.boolean()),
					(arr, predicate) => {
						const result = groupWith(predicate)(arr)
						assert(result.every((group) => group.length > 0))
					},
				),
			)
		})

		await t.step("sum of group lengths equals original length", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					fc.func(fc.boolean()),
					(arr, predicate) => {
						const result = groupWith(predicate)(arr)
						const totalLength = result.reduce(
							(sum, group) => sum + group.length,
							0,
						)
						assertEquals(totalLength, arr.length)
					},
				),
			)
		})

		await t.step("adjacent elements in groups satisfy predicate", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 10 }), {
						minLength: 2,
						maxLength: 20,
					}),
					(arr) => {
						// Use a simple predicate we can verify
						const equal = (a: number, b: number) => a === b
						const result = groupWith(equal)(arr)

						// Check that within each group, adjacent elements are equal
						for (const group of result) {
							for (let i = 1; i < group.length; i++) {
								assert(equal(group[i - 1], group[i]))
							}
						}

						// Check that between groups, the boundary elements don't satisfy predicate
						for (let i = 1; i < result.length; i++) {
							const lastOfPrev = result[i - 1][result[i - 1].length - 1]
							const firstOfCurr = result[i][0]
							assertFalse(equal(lastOfPrev, firstOfCurr))
						}
					},
				),
			)
		})

		await t.step(
			"groups with always-true predicate produces single group",
			() => {
				fc.assert(
					fc.property(
						fc.array(fc.integer(), { minLength: 1 }),
						(arr) => {
							const alwaysTrue = () => true
							const result = groupWith(alwaysTrue)(arr)
							assertEquals(result.length, 1)
							assertEquals(result[0], arr)
						},
					),
				)
			},
		)

		await t.step(
			"groups with always-false predicate produces individual elements",
			() => {
				fc.assert(
					fc.property(
						fc.array(fc.integer(), { minLength: 1 }),
						(arr) => {
							const alwaysFalse = () => false
							const result = groupWith(alwaysFalse)(arr)
							assertEquals(result.length, arr.length)
							assert(result.every((group) => group.length === 1))
						},
					),
				)
			},
		)
	})

	await t.step("works with complex predicates", () => {
		// Test with dates
		const dates = [
			new Date("2024-01-01"),
			new Date("2024-01-02"),
			new Date("2024-02-01"),
			new Date("2024-02-02"),
		]
		const sameMonth = (a: Date, b: Date) => a.getMonth() === b.getMonth()
		const monthGroups = groupWith(sameMonth)(dates)
		assertEquals(monthGroups.length, 2)
		assertEquals(monthGroups[0].length, 2)
		assertEquals(monthGroups[1].length, 2)

		// Test with mixed types using type guard
		const mixed = [1, "a", 2, "b", "c", 3, 4]
		const sameType = (a: unknown, b: unknown) => typeof a === typeof b
		const typeGroups = groupWith(sameType)(mixed)
		assertEquals(typeGroups, [[1], ["a"], [2], ["b", "c"], [3, 4]])
	})

	await t.step("predicate receives correct parameters", () => {
		const calls: Array<[number, number]> = []
		const trackingPredicate = (a: number, b: number) => {
			calls.push([a, b])
			return a === b
		}

		groupWith(trackingPredicate)([1, 1, 2, 3, 3])

		// Should compare adjacent pairs
		assertEquals(calls, [
			[1, 1], // first and second
			[1, 2], // second and third
			[2, 3], // third and fourth
			[3, 3], // fourth and fifth
		])
	})
})