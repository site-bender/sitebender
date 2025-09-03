import * as fc from "fast-check"
import { assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

import partition from "../../../../src/simple/array/partition/index.ts"

describe("partition", () => {
	describe("basic functionality", () => {
		it("should partition elements based on predicate", () => {
			const isEven = (x: number) => x % 2 === 0
			assertEquals(partition(isEven)([1, 2, 3, 4, 5, 6]), [[2, 4, 6], [
				1,
				3,
				5,
			]])

			const isPositive = (x: number) => x > 0
			assertEquals(partition(isPositive)([-2, -1, 0, 1, 2]), [[1, 2], [
				-2,
				-1,
				0,
			]])
		})

		it("should partition strings by condition", () => {
			const isLong = (s: string) => s.length > 3
			assertEquals(
				partition(isLong)(["hi", "hello", "bye", "goodbye"]),
				[["hello", "goodbye"], ["hi", "bye"]],
			)

			const startsWithA = (s: string) => s.startsWith("a")
			assertEquals(
				partition(startsWithA)(["apple", "banana", "apricot", "berry"]),
				[["apple", "apricot"], ["banana", "berry"]],
			)
		})

		it("should partition objects by property", () => {
			const users = [
				{ name: "Alice", active: true },
				{ name: "Bob", active: false },
				{ name: "Charlie", active: true },
			]
			const isActive = (user: { active: boolean }) => user.active
			assertEquals(partition(isActive)(users), [
				[{ name: "Alice", active: true }, { name: "Charlie", active: true }],
				[{ name: "Bob", active: false }],
			])
		})

		it("should preserve original order in both partitions", () => {
			const numbers = [5, 15, 8, 20, 3, 12]
			const isGreaterThan10 = (x: number) => x > 10
			assertEquals(partition(isGreaterThan10)(numbers), [[15, 20, 12], [
				5,
				8,
				3,
			]])
		})

		it("should provide index and array to predicate", () => {
			const indices: Array<number> = []
			const arrays: Array<ReadonlyArray<number>> = []
			const predicate = (
				x: number,
				index: number,
				array: ReadonlyArray<number>,
			) => {
				indices.push(index)
				arrays.push(array)
				return x % 2 === 0
			}

			const input = [1, 2, 3, 4]
			partition(predicate)(input)

			assertEquals(indices, [0, 1, 2, 3])
			assertEquals(arrays, [input, input, input, input])
		})
	})

	describe("edge cases", () => {
		it("should handle empty arrays", () => {
			const isEven = (x: number) => x % 2 === 0
			assertEquals(partition(isEven)([]), [[], []])
		})

		it("should handle null and undefined", () => {
			const isEven = (x: number) => x % 2 === 0
			assertEquals(partition(isEven)(null), [[], []])
			assertEquals(partition(isEven)(undefined), [[], []])
		})

		it("should handle all elements passing", () => {
			const alwaysTrue = () => true
			assertEquals(partition(alwaysTrue)([1, 2, 3, 4]), [[1, 2, 3, 4], []])
		})

		it("should handle all elements failing", () => {
			const alwaysFalse = () => false
			assertEquals(partition(alwaysFalse)([1, 2, 3, 4]), [[], [1, 2, 3, 4]])
		})

		it("should handle single element arrays", () => {
			const isEven = (x: number) => x % 2 === 0
			assertEquals(partition(isEven)([2]), [[2], []])
			assertEquals(partition(isEven)([3]), [[], [3]])
		})

		it("should handle falsy values correctly", () => {
			const isTruthy = (x: unknown) => !!x
			assertEquals(
				partition(isTruthy)([0, 1, false, true, "", "hello", null, undefined]),
				[[1, true, "hello"], [0, false, "", null, undefined]],
			)
		})
	})

	describe("currying", () => {
		it("should support partial application", () => {
			const partitionByEven = partition((x: number) => x % 2 === 0)
			assertEquals(partitionByEven([1, 2, 3, 4]), [[2, 4], [1, 3]])
			assertEquals(partitionByEven([5, 6, 7, 8]), [[6, 8], [5, 7]])

			const partitionByPositive = partition((x: number) => x > 0)
			assertEquals(partitionByPositive([-1, 0, 1]), [[1], [-1, 0]])
			assertEquals(partitionByPositive([-5, -3, 2, 4]), [[2, 4], [-5, -3]])
		})

		it("should work with different predicates", () => {
			const numbers = [1, 2, 3, 4, 5, 6]

			const byEven = partition((x: number) => x % 2 === 0)
			assertEquals(byEven(numbers), [[2, 4, 6], [1, 3, 5]])

			const byGreaterThan3 = partition((x: number) => x > 3)
			assertEquals(byGreaterThan3(numbers), [[4, 5, 6], [1, 2, 3]])

			const byDivisibleBy3 = partition((x: number) => x % 3 === 0)
			assertEquals(byDivisibleBy3(numbers), [[3, 6], [1, 2, 4, 5]])
		})
	})

	describe("type preservation", () => {
		it("should preserve element types", () => {
			const numbers = [1, 2, 3, 4]
			const [evens, odds]: [Array<number>, Array<number>] = partition(
				(x: number) => x % 2 === 0,
			)(numbers)
			assertEquals(evens, [2, 4])
			assertEquals(odds, [1, 3])

			const strings = ["a", "bb", "ccc"]
			const [long, short]: [Array<string>, Array<string>] = partition(
				(s: string) => s.length > 1,
			)(strings)
			assertEquals(long, ["bb", "ccc"])
			assertEquals(short, ["a"])
		})

		it("should work with complex types", () => {
			interface User {
				id: number
				name: string
				role: "admin" | "user"
			}

			const users: Array<User> = [
				{ id: 1, name: "Alice", role: "admin" },
				{ id: 2, name: "Bob", role: "user" },
				{ id: 3, name: "Charlie", role: "admin" },
			]

			const [admins, regularUsers] = partition((u: User) => u.role === "admin")(
				users,
			)
			assertEquals(admins.length, 2)
			assertEquals(regularUsers.length, 1)
		})
	})

	describe("practical use cases", () => {
		it("should separate valid and invalid data", () => {
			const data = [1, NaN, 2, Infinity, 3, -Infinity, 4]
			const [valid, invalid] = partition(
				(x: number) => Number.isFinite(x),
			)(data)
			assertEquals(valid, [1, 2, 3, 4])
			assertEquals(invalid, [NaN, Infinity, -Infinity])
		})

		it("should filter and collect rejects", () => {
			const emails = [
				"user@example.com",
				"invalid",
				"admin@site.org",
				"notanemail",
			]
			const isValidEmail = (email: string) =>
				email.includes("@") && email.includes(".")
			const [valid, invalid] = partition(isValidEmail)(emails)
			assertEquals(valid, ["user@example.com", "admin@site.org"])
			assertEquals(invalid, ["invalid", "notanemail"])
		})

		it("should split data for parallel processing", () => {
			const tasks = Array.from({ length: 10 }, (_, i) => i)
			const [batch1, batch2] = partition((_, index) => index % 2 === 0)(tasks)
			assertEquals(batch1, [0, 2, 4, 6, 8])
			assertEquals(batch2, [1, 3, 5, 7, 9])
		})
	})

	describe("property-based tests", () => {
		it("should always return two arrays whose combined length equals input length", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.func(fc.boolean()),
					(array, predicate) => {
						const [pass, fail] = partition(predicate)(array)
						return pass.length + fail.length === array.length
					},
				),
			)
		})

		it("should include every element exactly once", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.func(fc.boolean()),
					(array, predicate) => {
						const [pass, fail] = partition(predicate)(array)
						const combined = [...pass, ...fail]

						// Check each element appears exactly once
						for (const element of array) {
							const count = combined.filter((x) => x === element).length
							const expectedCount = array.filter((x) => x === element).length
							if (count !== expectedCount) return false
						}
						return true
					},
				),
			)
		})

		it("should preserve relative order within each partition", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 100 })),
					fc.func(fc.boolean()),
					(array, predicate) => {
						const [pass, fail] = partition(predicate)(array)

						// Check order preservation in pass array
						const passIndices = array
							.map((el, i) => predicate(el, i, array) ? i : -1)
							.filter((i) => i !== -1)
						for (let i = 0; i < passIndices.length - 1; i++) {
							if (passIndices[i] >= passIndices[i + 1]) return false
						}

						// Check order preservation in fail array
						const failIndices = array
							.map((el, i) => !predicate(el, i, array) ? i : -1)
							.filter((i) => i !== -1)
						for (let i = 0; i < failIndices.length - 1; i++) {
							if (failIndices[i] >= failIndices[i + 1]) return false
						}

						return true
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
						const result = partition(predicate)(value)
						return Array.isArray(result) &&
							result.length === 2 &&
							Array.isArray(result[0]) &&
							Array.isArray(result[1]) &&
							result[0].length === 0 &&
							result[1].length === 0
					},
				),
			)
		})

		it("should correctly partition based on predicate", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(array) => {
						const isEven = (x: number) => x % 2 === 0
						const [evens, odds] = partition(isEven)(array)

						// Check all evens are actually even
						const allEvensCorrect = evens.every((x) => x % 2 === 0)
						// Check all odds are actually odd
						const allOddsCorrect = odds.every((x) => x % 2 !== 0)

						return allEvensCorrect && allOddsCorrect
					},
				),
			)
		})
	})
})
