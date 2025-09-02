import { assertEquals } from "jsr:@std/assert@1.0.8"
import * as fc from "fast-check"

import dropRepeats from "../../../../src/simple/array/dropRepeats/index.ts"

Deno.test("dropRepeats", async (t) => {
	await t.step("basic functionality", async (t) => {
		await t.step("removes consecutive duplicates", () => {
			const result = dropRepeats([1, 1, 2, 2, 2, 3, 3, 1, 1])
			assertEquals(result, [1, 2, 3, 1])
		})

		await t.step("works with strings", () => {
			const result = dropRepeats(["a", "a", "b", "b", "c", "c", "c", "a"])
			assertEquals(result, ["a", "b", "c", "a"])
		})

		await t.step("preserves non-consecutive duplicates", () => {
			const result = dropRepeats([1, 2, 1, 2, 1, 2])
			assertEquals(result, [1, 2, 1, 2, 1, 2])
		})

		await t.step("handles mixed types", () => {
			const result = dropRepeats([1, 1, "a", "a", true, true, null, null])
			assertEquals(result, [1, "a", true, null])
		})
	})

	await t.step("edge cases", async (t) => {
		await t.step("returns empty array for empty input", () => {
			const result = dropRepeats([])
			assertEquals(result, [])
		})

		await t.step("returns single element array unchanged", () => {
			const result = dropRepeats([42])
			assertEquals(result, [42])
			// Check it's a copy
			const input = [42]
			const output = dropRepeats(input)
			assertEquals(output === input, false)
		})

		await t.step("returns single element when all are same", () => {
			const result = dropRepeats([5, 5, 5, 5, 5])
			assertEquals(result, [5])
		})

		await t.step("handles null input", () => {
			const result = dropRepeats(null)
			assertEquals(result, [])
		})

		await t.step("handles undefined input", () => {
			const result = dropRepeats(undefined)
			assertEquals(result, [])
		})

		await t.step("no duplicates returns copy", () => {
			const input = [1, 2, 3, 4, 5]
			const result = dropRepeats(input)
			assertEquals(result, [1, 2, 3, 4, 5])
			assertEquals(result === input, false)
		})
	})

	await t.step("special values", async (t) => {
		await t.step("handles NaN with Object.is", () => {
			const result = dropRepeats([NaN, NaN, 1, 1, NaN])
			assertEquals(result.length, 3)
			assertEquals(Number.isNaN(result[0]), true)
			assertEquals(result[1], 1)
			assertEquals(Number.isNaN(result[2]), true)
		})

		await t.step("handles +0 and -0 as different (Object.is behavior)", () => {
			// Object.is treats +0 and -0 as different (SameValue, not SameValueZero)
			const result = dropRepeats([0, -0, +0, 1, -0])
			assertEquals(result, [0, -0, +0, 1, -0])
		})

		await t.step("handles null and undefined", () => {
			const result = dropRepeats([null, null, undefined, undefined, null])
			assertEquals(result, [null, undefined, null])
		})

		await t.step("handles Infinity", () => {
			const result = dropRepeats([Infinity, Infinity, -Infinity, -Infinity, Infinity])
			assertEquals(result, [Infinity, -Infinity, Infinity])
		})
	})

	await t.step("object references", async (t) => {
		await t.step("uses reference equality for objects", () => {
			const obj1 = { id: 1 }
			const obj2 = { id: 1 }
			const result = dropRepeats([obj1, obj1, obj2, obj2, obj1])
			assertEquals(result, [obj1, obj2, obj1])
		})

		await t.step("different objects with same values are not duplicates", () => {
			const result = dropRepeats([{ a: 1 }, { a: 1 }, { a: 1 }])
			assertEquals(result.length, 3)
		})

		await t.step("same array references", () => {
			const arr1 = [1, 2]
			const arr2 = [1, 2]
			const result = dropRepeats([arr1, arr1, arr2, arr2, arr1])
			assertEquals(result, [arr1, arr2, arr1])
		})
	})

	await t.step("practical use cases", async (t) => {
		await t.step("state changes", () => {
			const states = ["loading", "loading", "ready", "ready", "error", "ready"]
			const result = dropRepeats(states)
			assertEquals(result, ["loading", "ready", "error", "ready"])
		})

		await t.step("sensor readings", () => {
			const readings = [20, 20, 20, 21, 21, 22, 22, 22, 21, 21]
			const result = dropRepeats(readings)
			assertEquals(result, [20, 21, 22, 21])
		})

		await t.step("boolean toggles", () => {
			const toggles = [true, true, false, false, false, true, false, false]
			const result = dropRepeats(toggles)
			assertEquals(result, [true, false, true, false])
		})
	})

	await t.step("property-based tests", async (t) => {
		await t.step("result has no consecutive duplicates", () => {
			fc.assert(
				fc.property(fc.array(fc.integer()), (arr) => {
					const result = dropRepeats(arr)
					// Check no consecutive duplicates
					for (let i = 1; i < result.length; i++) {
						assertEquals(Object.is(result[i], result[i - 1]), false)
					}
				}),
				{ numRuns: 100 }
			)
		})

		await t.step("result is subsequence of original", () => {
			fc.assert(
				fc.property(fc.array(fc.integer()), (arr) => {
					const result = dropRepeats(arr)
					// Every element in result exists in arr
					assertEquals(
						result.every(elem => arr.includes(elem)),
						true
					)
				}),
				{ numRuns: 100 }
			)
		})

		await t.step("preserves first element if array not empty", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					(arr) => {
						const result = dropRepeats(arr)
						assertEquals(result[0], arr[0])
					}
				),
				{ numRuns: 100 }
			)
		})

		await t.step("result length <= original length", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					const result = dropRepeats(arr)
					assertEquals(result.length <= arr.length, true)
				}),
				{ numRuns: 100 }
			)
		})

		await t.step("idempotent - applying twice gives same result", () => {
			fc.assert(
				fc.property(fc.array(fc.integer()), (arr) => {
					const once = dropRepeats(arr)
					const twice = dropRepeats(once)
					assertEquals(twice, once)
				}),
				{ numRuns: 100 }
			)
		})

		await t.step("empty or single element arrays unchanged", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { maxLength: 1 }),
					(arr) => {
						const result = dropRepeats(arr)
						assertEquals(result, arr)
					}
				),
				{ numRuns: 100 }
			)
		})

		await t.step("all same elements returns single element", () => {
			fc.assert(
				fc.property(
					fc.integer(),
					fc.integer({ min: 1, max: 100 }),
					(value, count) => {
						const arr = Array(count).fill(value)
						const result = dropRepeats(arr)
						assertEquals(result, [value])
					}
				),
				{ numRuns: 100 }
			)
		})
	})
})