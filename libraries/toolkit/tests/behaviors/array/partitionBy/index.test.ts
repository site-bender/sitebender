import * as fc from "fast-check"
import { assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

import partitionBy from "../../../../src/simple/array/partitionBy/index.ts"

describe("partitionBy", () => {
	describe("basic functionality", () => {
		it("should group consecutive elements with same predicate result", () => {
			const isEven = (n: number) => n % 2 === 0
			assertEquals(
				partitionBy(isEven)([1, 3, 5, 2, 4, 6, 7, 9]),
				[[1, 3, 5], [2, 4, 6], [7, 9]],
			)
		})

		it("should handle alternating groups", () => {
			const isEven = (n: number) => n % 2 === 0
			assertEquals(
				partitionBy(isEven)([1, 2, 3, 4, 5, 6]),
				[[1], [2], [3], [4], [5], [6]],
			)
		})

		it("should group by sign", () => {
			const isPositive = (n: number) => n > 0
			assertEquals(
				partitionBy(isPositive)([-1, -2, 3, 4, -5, 6]),
				[[-1, -2], [3, 4], [-5], [6]],
			)
		})

		it("should group consecutive strings by property", () => {
			const isLong = (s: string) => s.length > 3
			assertEquals(
				partitionBy(isLong)([
					"a",
					"bb",
					"ccc",
					"dddd",
					"eeeee",
					"f",
					"g",
				]),
				[["a", "bb", "ccc"], ["dddd", "eeeee"], ["f", "g"]],
			)
		})

		it("should group objects by boolean property", () => {
			const tasks = [
				{ id: 1, completed: false },
				{ id: 2, completed: false },
				{ id: 3, completed: true },
				{ id: 4, completed: false },
			]
			assertEquals(
				partitionBy((t: { id: number; completed: boolean }) =>
					t.completed
				)(
					tasks,
				),
				[
					[{ id: 1, completed: false }, { id: 2, completed: false }],
					[{ id: 3, completed: true }],
					[{ id: 4, completed: false }],
				],
			)
		})

		it("should handle complex predicate functions", () => {
			const byRange = (n: number) => {
				if (n < 0) return "negative"
				if (n === 0) return "zero"
				if (n <= 10) return "small"
				return "large"
			}
			assertEquals(
				partitionBy(byRange)([-3, -1, 0, 0, 5, 8, 15, 20, 3]),
				[[-3, -1], [0, 0], [5, 8], [15, 20], [3]],
			)
		})
	})

	describe("edge cases", () => {
		it("should handle empty arrays", () => {
			const isEven = (n: number) => n % 2 === 0
			assertEquals(partitionBy(isEven)([]), [])
		})

		it("should handle single element arrays", () => {
			const isEven = (n: number) => n % 2 === 0
			assertEquals(partitionBy(isEven)([1]), [[1]])
			assertEquals(partitionBy(isEven)([2]), [[2]])
		})

		it("should handle null and undefined", () => {
			const isEven = (n: number) => n % 2 === 0
			assertEquals(partitionBy(isEven)(null), [])
			assertEquals(partitionBy(isEven)(undefined), [])
		})

		it("should handle all elements in same group", () => {
			const alwaysTrue = () => true
			assertEquals(partitionBy(alwaysTrue)([1, 2, 3, 4, 5]), [[
				1,
				2,
				3,
				4,
				5,
			]])

			const alwaysFalse = () => false
			assertEquals(partitionBy(alwaysFalse)([1, 2, 3, 4, 5]), [[
				1,
				2,
				3,
				4,
				5,
			]])
		})

		it("should handle falsy predicate results", () => {
			const getFalsy = (n: number) => {
				if (n === 1) return false
				if (n === 2) return 0
				if (n === 3) return ""
				if (n === 4) return null
				if (n === 5) return undefined
				return NaN
			}
			// Note: All falsy values except NaN will be treated as equal
			// NaN !== NaN, so it creates separate groups
			const result = partitionBy(getFalsy)([1, 2, 3, 4, 5, 6])
			assertEquals(result.length, 6) // Each gets its own group due to different values
		})

		it("should handle NaN correctly", () => {
			const identity = (x: number) => x
			// NaN !== NaN, so consecutive NaNs create separate groups
			assertEquals(
				partitionBy(identity)([1, 1, NaN, NaN, 2, 2]),
				[[1, 1], [NaN], [NaN], [2, 2]],
			)
		})
	})

	describe("currying", () => {
		it("should support partial application", () => {
			const partitionByEven = partitionBy((n: number) => n % 2 === 0)
			assertEquals(partitionByEven([1, 3, 2, 4, 5]), [[1, 3], [2, 4], [
				5,
			]])
			assertEquals(partitionByEven([2, 4, 1, 3, 6]), [[2, 4], [1, 3], [
				6,
			]])

			const partitionBySign = partitionBy((n: number) => Math.sign(n))
			assertEquals(partitionBySign([-1, -2, 0, 1, 2, -3]), [
				[-1, -2],
				[0],
				[
					1,
					2,
				],
				[-3],
			])
		})
	})

	describe("type preservation", () => {
		it("should preserve element types", () => {
			const numbers = [1, 1, 2, 2, 3, 3]
			const groups: Array<Array<number>> = partitionBy((n: number) => n)(
				numbers,
			)
			assertEquals(groups, [[1, 1], [2, 2], [3, 3]])

			const strings = ["a", "a", "b", "c", "c"]
			const stringGroups: Array<Array<string>> = partitionBy((
				s: string,
			) => s)(
				strings,
			)
			assertEquals(stringGroups, [["a", "a"], ["b"], ["c", "c"]])
		})

		it("should work with complex types", () => {
			interface User {
				id: number
				role: string
				active: boolean
			}

			const users: Array<User> = [
				{ id: 1, role: "admin", active: true },
				{ id: 2, role: "admin", active: true },
				{ id: 3, role: "user", active: false },
				{ id: 4, role: "user", active: false },
				{ id: 5, role: "admin", active: true },
			]

			const byRole = partitionBy((u: User) => u.role)(users)
			assertEquals(byRole.length, 3) // admin, user, admin groups
			assertEquals(byRole[0].length, 2) // First admin group
			assertEquals(byRole[1].length, 2) // User group
			assertEquals(byRole[2].length, 1) // Second admin group
		})
	})

	describe("practical use cases", () => {
		it("should perform run-length encoding", () => {
			const chars = ["a", "a", "a", "b", "b", "c", "a", "a"]
			const runs = partitionBy((c: string) => c)(chars)
			const encoded = runs.map((group) => `${group[0]}${group.length}`)
			assertEquals(encoded, ["a3", "b2", "c1", "a2"])
		})

		it("should group time series data by state", () => {
			const data = [
				{ time: 1, state: "idle" },
				{ time: 2, state: "idle" },
				{ time: 3, state: "running" },
				{ time: 4, state: "running" },
				{ time: 5, state: "idle" },
			]
			const stateGroups = partitionBy((d: { state: string }) => d.state)(
				data,
			)
			assertEquals(stateGroups.length, 3)
			assertEquals(stateGroups[0][0].state, "idle")
			assertEquals(stateGroups[1][0].state, "running")
			assertEquals(stateGroups[2][0].state, "idle")
		})

		it("should detect consecutive duplicates", () => {
			const values = [1, 1, 1, 2, 3, 3, 1, 1]
			const groups = partitionBy((x: number) => x)(values)
			const duplicates = groups.filter((g) => g.length > 1)
			assertEquals(duplicates, [[1, 1, 1], [3, 3], [1, 1]])
		})

		it("should segment data by threshold", () => {
			const readings = [10, 12, 15, 50, 55, 48, 20, 18, 60, 65]
			const byThreshold = partitionBy((n: number) => n > 30)(readings)
			assertEquals(byThreshold, [
				[10, 12, 15],
				[50, 55, 48],
				[20, 18],
				[60, 65],
			])
		})
	})

	describe("property-based tests", () => {
		it("should preserve all elements in the same order", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.func(fc.integer()),
					(array, predicate) => {
						const groups = partitionBy(predicate)(array)
						const flattened = groups.flat()
						return JSON.stringify(flattened) ===
							JSON.stringify(array)
					},
				),
			)
		})

		it("should create groups where consecutive elements have same predicate result", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(array) => {
						const isEven = (n: number) => n % 2 === 0
						const groups = partitionBy(isEven)(array)

						// Check each group has consistent predicate result
						for (const group of groups) {
							if (group.length > 0) {
								const firstResult = isEven(group[0])
								const allSame = group.every((el) =>
									isEven(el) === firstResult
								)
								if (!allSame) return false
							}
						}
						return true
					},
				),
			)
		})

		it("should not create empty groups", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.func(fc.string()),
					(array, predicate) => {
						const groups = partitionBy(predicate)(array)
						return groups.every((group) => group.length > 0)
					},
				),
			)
		})

		it("should handle null and undefined consistently", () => {
			fc.assert(
				fc.property(
					fc.constantFrom(null, undefined),
					fc.func(fc.boolean()),
					(value, predicate) => {
						const result = partitionBy(predicate)(value)
						return Array.isArray(result) && result.length === 0
					},
				),
			)
		})

		it("should create at most array.length groups", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					fc.func(fc.integer()),
					(array, predicate) => {
						const groups = partitionBy(predicate)(array)
						return groups.length > 0 &&
							groups.length <= array.length
					},
				),
			)
		})

		it("should handle identity predicate correctly", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 10 })),
					(array) => {
						const identity = (x: number) => x
						const groups = partitionBy(identity)(array)

						// Each group should contain only identical values
						for (const group of groups) {
							if (group.length > 1) {
								const first = group[0]
								const allSame = group.every((el) =>
									el === first
								)
								if (!allSame) return false
							}
						}
						return true
					},
				),
			)
		})
	})
})
