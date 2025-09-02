import * as fc from "fast-check"
import { assertEquals } from "jsr:@std/assert@1.0.8"

import differenceWith from "../../../../src/simple/array/differenceWith/index.ts"

Deno.test("differenceWith", async (t) => {
	await t.step("basic functionality", async (t) => {
		await t.step("uses comparator for equality", () => {
			const comparator = (a: number, b: number) => a === b
			const result = differenceWith(comparator)([2, 3])([1, 2, 3, 4, 5])
			assertEquals(result, [1, 4, 5])
		})

		await t.step("case-insensitive string comparison", () => {
			const caseInsensitive = (a: string, b: string) =>
				a.toLowerCase() === b.toLowerCase()
			const result = differenceWith(caseInsensitive)(["B", "C"])([
				"a",
				"B",
				"c",
				"D",
			])
			assertEquals(result, ["a", "D"])
		})

		await t.step("object comparison by property", () => {
			type User = { id: number; name?: string }
			const byId = (a: User, b: User) => a.id === b.id
			const users: User[] = [
				{ id: 1, name: "Alice" },
				{ id: 2, name: "Bob" },
				{ id: 3, name: "Charlie" },
			]
			const exclude: User[] = [{ id: 2 }]
			const result = differenceWith(byId)(exclude)(users)
			assertEquals(result, [
				{ id: 1, name: "Alice" },
				{ id: 3, name: "Charlie" },
			])
		})

		await t.step("number comparison with tolerance", () => {
			const approxEqual = (a: number, b: number) => Math.abs(a - b) < 0.01
			const result = differenceWith(approxEqual)([1.001, 2.002])([
				1.0,
				1.5,
				2.0,
				3.0,
			])
			assertEquals(result, [1.5, 3.0])
		})

		await t.step("preserves duplicates in minuend", () => {
			const comparator = (a: number, b: number) => a === b
			const result = differenceWith(comparator)([2])([1, 1, 2, 3, 3])
			assertEquals(result, [1, 1, 3, 3])
		})

		await t.step("removes based on complex logic", () => {
			const divisibleBy = (a: number, b: number) => a % b === 0
			const result = differenceWith(divisibleBy)([2, 3])([
				1,
				2,
				3,
				4,
				5,
				6,
				7,
				8,
				9,
				10,
			])
			// Remove multiples of 2 and 3
			assertEquals(result, [1, 5, 7])
		})
	})

	await t.step("edge cases", async (t) => {
		await t.step("returns copy when subtrahend is empty", () => {
			const comparator = (a: number, b: number) => a === b
			const input = [1, 2, 3]
			const result = differenceWith(comparator)([])(input)
			assertEquals(result, [1, 2, 3])
			// Ensure it's a new array
			assertEquals(result === input, false)
		})

		await t.step("returns empty when minuend is empty", () => {
			const comparator = (a: number, b: number) => a === b
			const result = differenceWith(comparator)([1, 2])([])
			assertEquals(result, [])
		})

		await t.step("returns empty when both are empty", () => {
			const comparator = (a: number, b: number) => a === b
			const result = differenceWith(comparator)([])([])
			assertEquals(result, [])
		})

		await t.step("returns copy when subtrahend is null", () => {
			const comparator = (a: number, b: number) => a === b
			const input = [1, 2, 3]
			const result = differenceWith(comparator)(null)(input)
			assertEquals(result, [1, 2, 3])
			assertEquals(result === input, false)
		})

		await t.step("returns copy when subtrahend is undefined", () => {
			const comparator = (a: number, b: number) => a === b
			const input = [1, 2, 3]
			const result = differenceWith(comparator)(undefined)(input)
			assertEquals(result, [1, 2, 3])
			assertEquals(result === input, false)
		})

		await t.step("returns empty when minuend is null", () => {
			const comparator = (a: number, b: number) => a === b
			const result = differenceWith(comparator)([1, 2])(null)
			assertEquals(result, [])
		})

		await t.step("returns empty when minuend is undefined", () => {
			const comparator = (a: number, b: number) => a === b
			const result = differenceWith(comparator)([1, 2])(undefined)
			assertEquals(result, [])
		})

		await t.step("handles both null", () => {
			const comparator = (a: unknown, b: unknown) => a === b
			const result = differenceWith(comparator)(null)(null)
			assertEquals(result, [])
		})

		await t.step("handles both undefined", () => {
			const comparator = (a: unknown, b: unknown) => a === b
			const result = differenceWith(comparator)(undefined)(undefined)
			assertEquals(result, [])
		})
	})

	await t.step("comparator behaviors", async (t) => {
		await t.step("always true comparator removes everything", () => {
			const alwaysMatch = () => true
			const result = differenceWith(alwaysMatch)([1])([1, 2, 3])
			assertEquals(result, [])
		})

		await t.step("always false comparator removes nothing", () => {
			const neverMatch = () => false
			const result = differenceWith(neverMatch)([1, 2])([1, 2, 3])
			assertEquals(result, [1, 2, 3])
		})

		await t.step("asymmetric comparator", () => {
			// Only match if first is greater than second
			const greaterThan = (a: number, b: number) => a > b
			const result = differenceWith(greaterThan)([2])([1, 2, 3, 4])
			// Remove elements > 2 (3 and 4)
			assertEquals(result, [1, 2])
		})

		await t.step("comparator with side effects still works", () => {
			let callCount = 0
			const countingComparator = (a: number, b: number) => {
				callCount++
				return a === b
			}
			const result = differenceWith(countingComparator)([2])([1, 2, 3])
			assertEquals(result, [1, 3])
			assertEquals(callCount > 0, true)
		})
	})

	await t.step("type safety", async (t) => {
		await t.step("different types for minuend and subtrahend", () => {
			const compareLengths = (str: string, num: number) => str.length === num
			const result = differenceWith(compareLengths)([2, 3])([
				"a",
				"bb",
				"ccc",
				"dddd",
			])
			assertEquals(result, ["a", "dddd"])
		})

		await t.step("complex object comparisons", () => {
			type Person = { name: string; age: number }
			type Filter = { minAge?: number; maxAge?: number; namePattern?: RegExp }

			const matchesFilter = (person: Person, filter: Filter) => {
				if (filter.minAge && person.age < filter.minAge) return false
				if (filter.maxAge && person.age > filter.maxAge) return false
				if (filter.namePattern && !filter.namePattern.test(person.name)) {
					return false
				}
				return true
			}

			const people: Person[] = [
				{ name: "Alice", age: 25 },
				{ name: "Bob", age: 30 },
				{ name: "Charlie", age: 35 },
				{ name: "David", age: 40 },
			]

			const filters: Filter[] = [
				{ minAge: 30, maxAge: 35 },
			]

			const result = differenceWith(matchesFilter)(filters)(people)
			assertEquals(result, [
				{ name: "Alice", age: 25 },
				{ name: "David", age: 40 },
			])
		})
	})

	await t.step("currying", async (t) => {
		await t.step("supports partial application", () => {
			const caseInsensitive = (a: string, b: string) =>
				a.toLowerCase() === b.toLowerCase()
			const removeStopWords = differenceWith(caseInsensitive)([
				"the",
				"a",
				"an",
				"and",
			])

			const result1 = removeStopWords([
				"The",
				"quick",
				"brown",
				"fox",
				"AND",
				"lazy",
			])
			assertEquals(result1, ["quick", "brown", "fox", "lazy"])

			const result2 = removeStopWords(["A", "simple", "test"])
			assertEquals(result2, ["simple", "test"])
		})

		await t.step("can be reused with same comparator and subtrahend", () => {
			const byValue = (a: { val: number }, b: { val: number }) =>
				a.val === b.val
			const removeEvens = differenceWith(byValue)([
				{ val: 2 },
				{ val: 4 },
				{ val: 6 },
			])

			const result1 = removeEvens([
				{ val: 1 },
				{ val: 2 },
				{ val: 3 },
				{ val: 4 },
			])
			assertEquals(result1, [{ val: 1 }, { val: 3 }])

			const result2 = removeEvens([
				{ val: 5 },
				{ val: 6 },
				{ val: 7 },
			])
			assertEquals(result2, [{ val: 5 }, { val: 7 }])
		})
	})

	await t.step("property-based tests", async (t) => {
		await t.step("with standard equality, behaves like difference", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					(arr1, arr2) => {
						const standardEqual = (a: number, b: number) => a === b
						const result = differenceWith(standardEqual)(arr2)(arr1)
						const expected = arr1.filter((x) => !arr2.includes(x))
						assertEquals(result, expected)
					},
				),
				{ numRuns: 100 },
			)
		})

		await t.step("empty subtrahend returns copy of minuend", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					const comparator = (a: unknown, b: unknown) => a === b
					const result = differenceWith(comparator)([])(arr)
					assertEquals(result, arr)
					assertEquals(result === arr, false) // Should be a copy
				}),
				{ numRuns: 100 },
			)
		})

		await t.step("result is subset of minuend", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					(arr1, arr2) => {
						const comparator = (a: number, b: number) => a === b
						const result = differenceWith(comparator)(arr2)(arr1)
						// Every element in result must be in arr1
						assertEquals(
							result.every((elem) => arr1.includes(elem)),
							true,
						)
					},
				),
				{ numRuns: 100 },
			)
		})

		await t.step("always true comparator returns empty", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer({ min: 1, max: 10 })),
					(arr1, arr2) => {
						// Skip if arr2 is empty as that would return arr1
						if (arr2.length === 0) return
						const alwaysTrue = () => true
						const result = differenceWith(alwaysTrue)(arr2)(arr1)
						assertEquals(result, [])
					},
				),
				{ numRuns: 100 },
			)
		})

		await t.step("always false comparator returns minuend copy", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					(arr1, arr2) => {
						const alwaysFalse = () => false
						const result = differenceWith(alwaysFalse)(arr2)(arr1)
						assertEquals(result, arr1)
					},
				),
				{ numRuns: 100 },
			)
		})

		await t.step("preserves element order", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					(arr1, arr2) => {
						const comparator = (a: number, b: number) => a === b
						const result = differenceWith(comparator)(arr2)(arr1)
						// The result should preserve the order from arr1
						const expected = arr1.filter((x) => !arr2.includes(x))
						assertEquals(result, expected)
					},
				),
				{ numRuns: 100 },
			)
		})
	})
})
