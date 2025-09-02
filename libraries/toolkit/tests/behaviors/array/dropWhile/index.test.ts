import * as fc from "fast-check"
import { assertEquals } from "jsr:@std/assert@1.0.8"

import dropWhile from "../../../../src/simple/array/dropWhile/index.ts"

Deno.test("dropWhile", async (t) => {
	await t.step("should return empty array for null/undefined", () => {
		const predicate = (x: number) => x < 5
		assertEquals(dropWhile(predicate)(null), [])
		assertEquals(dropWhile(predicate)(undefined), [])
	})

	await t.step("should return empty array for empty array", () => {
		const predicate = (x: number) => x < 5
		assertEquals(dropWhile(predicate)([]), [])
	})

	await t.step("should drop elements while predicate is true", () => {
		const lessThan5 = (x: number) => x < 5
		assertEquals(dropWhile(lessThan5)([1, 3, 5, 7, 2, 1]), [5, 7, 2, 1])
		assertEquals(dropWhile(lessThan5)([2, 3, 4, 5, 6]), [5, 6])
	})

	await t.step(
		"should keep all elements if predicate is initially false",
		() => {
			const lessThan5 = (x: number) => x < 5
			assertEquals(dropWhile(lessThan5)([10, 20, 30]), [10, 20, 30])
			assertEquals(dropWhile(lessThan5)([5, 1, 2, 3]), [5, 1, 2, 3])
		},
	)

	await t.step("should drop all elements if predicate is always true", () => {
		const alwaysTrue = () => true
		assertEquals(dropWhile(alwaysTrue)([1, 2, 3, 4, 5]), [])
		assertEquals(dropWhile(alwaysTrue)(["a", "b", "c"]), [])
	})

	await t.step("should keep all elements if predicate is always false", () => {
		const alwaysFalse = () => false
		assertEquals(dropWhile(alwaysFalse)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])
		assertEquals(dropWhile(alwaysFalse)(["a", "b", "c"]), ["a", "b", "c"])
	})

	await t.step("should work with predicate using index", () => {
		const indexLessThan3 = (_x: number, i: number) => i < 3
		assertEquals(dropWhile(indexLessThan3)([10, 20, 30, 40, 50]), [40, 50])
		assertEquals(dropWhile(indexLessThan3)([1, 2]), [])
	})

	await t.step("should work with predicate using array", () => {
		const lessThanHalfLength = (
			_x: number,
			i: number,
			arr: ReadonlyArray<number>,
		) => i < arr.length / 2
		assertEquals(dropWhile(lessThanHalfLength)([1, 2, 3, 4]), [3, 4])
		assertEquals(dropWhile(lessThanHalfLength)([1, 2, 3, 4, 5, 6]), [4, 5, 6])
	})

	await t.step("should work with strings", () => {
		const isSpace = (c: string) => c === " "
		const chars = [..." hello world"]
		assertEquals(
			dropWhile(isSpace)(chars),
			["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"],
		)

		const startsWithHash = (s: string) => s.startsWith("#")
		assertEquals(
			dropWhile(startsWithHash)([
				"# Header 1",
				"# Header 2",
				"Data row 1",
				"# Not a header",
				"Data row 2",
			]),
			["Data row 1", "# Not a header", "Data row 2"],
		)
	})

	await t.step("should work with objects", () => {
		interface Item {
			id: number
			active: boolean
		}
		const isInactive = (item: Item) => !item.active
		const items: Item[] = [
			{ id: 1, active: false },
			{ id: 2, active: false },
			{ id: 3, active: true },
			{ id: 4, active: false },
		]
		assertEquals(
			dropWhile(isInactive)(items),
			[
				{ id: 3, active: true },
				{ id: 4, active: false },
			],
		)
	})

	await t.step("should handle complex predicates", () => {
		interface Entry {
			valid: boolean
			timestamp: number
		}
		const isInvalid = (entry: Entry) => !entry.valid || entry.timestamp < 1000
		const entries: Entry[] = [
			{ valid: false, timestamp: 500 },
			{ valid: true, timestamp: 800 },
			{ valid: true, timestamp: 1200 },
			{ valid: false, timestamp: 1500 },
		]
		assertEquals(
			dropWhile(isInvalid)(entries),
			[
				{ valid: true, timestamp: 1200 },
				{ valid: false, timestamp: 1500 },
			],
		)
	})

	await t.step("should not mutate original array", () => {
		const original = [1, 2, 3, 4, 5]
		const originalCopy = [...original]
		const predicate = (x: number) => x < 3
		const result = dropWhile(predicate)(original)
		assertEquals(original, originalCopy) // Original unchanged
		assertEquals(result, [3, 4, 5])
	})

	await t.step("should handle arrays with undefined and null values", () => {
		const isNullish = (x: unknown) => x === null || x === undefined
		assertEquals(
			dropWhile(isNullish)([null, undefined, null, 1, null, 2]),
			[1, null, 2],
		)
		assertEquals(
			dropWhile(isNullish)([1, null, undefined]),
			[1, null, undefined],
		)
	})

	await t.step("should handle NaN values", () => {
		const isNaN = (x: number) => Number.isNaN(x)
		assertEquals(
			dropWhile(isNaN)([NaN, NaN, 1, NaN, 2]),
			[1, NaN, 2],
		)
		assertEquals(
			dropWhile(isNaN)([1, NaN, 2]),
			[1, NaN, 2],
		)
	})

	await t.step("should work with negative numbers", () => {
		const isNegative = (x: number) => x < 0
		assertEquals(
			dropWhile(isNegative)([-3, -1, 0, 2, -5, 4]),
			[0, 2, -5, 4],
		)
		assertEquals(
			dropWhile(isNegative)([1, -2, 3]),
			[1, -2, 3],
		)
	})

	await t.step("should handle single element arrays", () => {
		const lessThan5 = (x: number) => x < 5
		assertEquals(dropWhile(lessThan5)([3]), [])
		assertEquals(dropWhile(lessThan5)([7]), [7])
	})

	await t.step("should be reusable through partial application", () => {
		const dropZeros = dropWhile((x: number) => x === 0)
		assertEquals(dropZeros([0, 0, 0, 1, 2, 0, 3]), [1, 2, 0, 3])
		assertEquals(dropZeros([1, 2, 3]), [1, 2, 3])
		assertEquals(dropZeros([0, 0, 0]), [])

		const dropUntilLarge = dropWhile((x: number) => x < 100)
		assertEquals(dropUntilLarge([10, 50, 150, 30, 200]), [150, 30, 200])
		assertEquals(dropUntilLarge([200, 50, 10]), [200, 50, 10])
	})

	await t.step("property: result is suffix of original array", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.func(fc.boolean()),
				(arr, predicateFn) => {
					const predicate = (x: number) => predicateFn(x)
					const result = dropWhile(predicate)(arr)

					// Result should be a suffix of original
					if (result.length === 0) return true
					const startIndex = arr.length - result.length
					return arr.slice(startIndex).every((v, i) => v === result[i])
				},
			),
		)
	})

	await t.step(
		"property: if first element fails predicate, entire array is returned",
		() => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					(arr) => {
						// Predicate that always fails for first element
						const predicate = (x: number) => x !== arr[0]
						const result = dropWhile(predicate)(arr)
						return result.length === arr.length &&
							result.every((v, i) => v === arr[i])
					},
				),
			)
		},
	)

	await t.step("property: predicate always true drops all elements", () => {
		fc.assert(
			fc.property(fc.array(fc.integer()), (arr) => {
				const alwaysTrue = () => true
				const result = dropWhile(alwaysTrue)(arr)
				return result.length === 0
			}),
		)
	})

	await t.step("property: predicate always false keeps all elements", () => {
		fc.assert(
			fc.property(fc.array(fc.integer()), (arr) => {
				const alwaysFalse = () => false
				const result = dropWhile(alwaysFalse)(arr)
				return result.length === arr.length &&
					result.every((v, i) => v === arr[i])
			}),
		)
	})

	await t.step("property: empty array always returns empty", () => {
		fc.assert(
			fc.property(fc.func(fc.boolean()), (predicateFn) => {
				const predicate = (x: unknown) => predicateFn(x)
				const result = dropWhile(predicate)([])
				return result.length === 0
			}),
		)
	})

	await t.step(
		"property: result never starts with element satisfying predicate",
		() => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.func(fc.boolean()),
					(arr, predicateFn) => {
						const predicate = (x: number) => predicateFn(x)
						const result = dropWhile(predicate)(arr)

						// If result is non-empty, first element should not satisfy predicate
						if (result.length > 0) {
							return !predicate(result[0])
						}
						return true
					},
				),
			)
		},
	)

	await t.step(
		"property: predicate is never called after returning false",
		() => {
			fc.assert(
				fc.property(fc.array(fc.integer()), (arr) => {
					let callCount = 0
					let firstFalseIndex = -1

					const predicate = (x: number, index: number) => {
						callCount++
						const result = x < 50
						if (!result && firstFalseIndex === -1) {
							firstFalseIndex = index
						}
						return result
					}

					dropWhile(predicate)(arr)

					// Predicate should be called at most until first false + 1
					if (firstFalseIndex !== -1) {
						return callCount <= firstFalseIndex + 1
					}
					return true
				}),
			)
		},
	)
})
