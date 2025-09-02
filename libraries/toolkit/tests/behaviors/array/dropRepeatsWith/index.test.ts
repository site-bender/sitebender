import * as fc from "fast-check"
import { assertEquals } from "jsr:@std/assert@1.0.8"

import dropRepeatsWith from "../../../../src/simple/array/dropRepeatsWith/index.ts"

Deno.test("dropRepeatsWith", async (t) => {
	await t.step("should return empty array for null/undefined", () => {
		const comparator = (a: number, b: number) => a === b
		assertEquals(dropRepeatsWith(comparator)(null), [])
		assertEquals(dropRepeatsWith(comparator)(undefined), [])
	})

	await t.step("should return empty array for empty array", () => {
		const comparator = (a: number, b: number) => a === b
		assertEquals(dropRepeatsWith(comparator)([]), [])
	})

	await t.step("should return single element array unchanged", () => {
		const numComparator = (a: number, b: number) => a === b
		assertEquals(dropRepeatsWith(numComparator)([42]), [42])

		const strComparator = (a: string, b: string) => a === b
		assertEquals(dropRepeatsWith(strComparator)(["hello"]), ["hello"])
	})

	await t.step(
		"should remove consecutive duplicates with simple comparator",
		() => {
			const comparator = (a: number, b: number) => a === b
			assertEquals(
				dropRepeatsWith(comparator)([1, 1, 2, 2, 3, 3, 1, 1]),
				[1, 2, 3, 1],
			)
			assertEquals(
				dropRepeatsWith(comparator)([1, 2, 3, 4, 5]),
				[1, 2, 3, 4, 5],
			)
		},
	)

	await t.step("should work with case-insensitive string comparison", () => {
		const caseInsensitive = (a: string, b: string) =>
			a.toLowerCase() === b.toLowerCase()
		assertEquals(
			dropRepeatsWith(caseInsensitive)([
				"Hello",
				"HELLO",
				"world",
				"WORLD",
				"foo",
			]),
			["Hello", "world", "foo"],
		)
		assertEquals(
			dropRepeatsWith(caseInsensitive)(["a", "A", "b", "B", "a", "A"]),
			["a", "b", "a"],
		)
	})

	await t.step("should work with object comparison by property", () => {
		const byId = (
			a: { id: number; name?: string },
			b: { id: number; name?: string },
		) => a.id === b.id
		const items = [
			{ id: 1, name: "first" },
			{ id: 1, name: "second" },
			{ id: 2, name: "third" },
			{ id: 2, name: "fourth" },
			{ id: 1, name: "fifth" },
		]
		assertEquals(
			dropRepeatsWith(byId)(items),
			[
				{ id: 1, name: "first" },
				{ id: 2, name: "third" },
				{ id: 1, name: "fifth" },
			],
		)
	})

	await t.step("should work with numeric tolerance comparator", () => {
		const approxEqual = (a: number, b: number) => Math.abs(a - b) < 0.1
		assertEquals(
			dropRepeatsWith(approxEqual)([1.0, 1.05, 1.08, 1.2, 1.25, 1.5]),
			[1.0, 1.2, 1.5],
		)
		assertEquals(
			dropRepeatsWith(approxEqual)([1, 1.09, 1.11, 1.2]),
			[1], // All subsequent values are within 0.1 of their predecessor
		)
	})

	await t.step("should handle comparator that always returns true", () => {
		const alwaysTrue = (_a: unknown, _b: unknown) => true
		assertEquals(dropRepeatsWith(alwaysTrue)([1, 2, 3, 4]), [1])
		assertEquals(dropRepeatsWith(alwaysTrue)(["a", "b", "c"]), ["a"])
	})

	await t.step("should handle comparator that always returns false", () => {
		const alwaysFalse = (_a: unknown, _b: unknown) => false
		assertEquals(
			dropRepeatsWith(alwaysFalse)([1, 1, 1, 1]),
			[1, 1, 1, 1],
		)
		assertEquals(
			dropRepeatsWith(alwaysFalse)(["a", "a", "a"]),
			["a", "a", "a"],
		)
	})

	await t.step("should handle different types with custom comparator", () => {
		// Compare by string representation
		const byString = (a: unknown, b: unknown) => String(a) === String(b)
		assertEquals(
			dropRepeatsWith(byString)([1, "1", "1", 2, "2", 3]),
			[1, 2, 3], // "1" is same as "1", and 2 is same as "2" by string comparison
		)
	})

	await t.step("should not mutate original array", () => {
		const comparator = (a: number, b: number) => a === b
		const original = [1, 1, 2, 2, 3, 3]
		const originalCopy = [...original]
		const result = dropRepeatsWith(comparator)(original)
		assertEquals(original, originalCopy) // Original unchanged
		assertEquals(result, [1, 2, 3])
	})

	await t.step("should handle arrays with undefined and null values", () => {
		const strictEqual = (a: unknown, b: unknown) => a === b
		assertEquals(
			dropRepeatsWith(strictEqual)([
				undefined,
				undefined,
				null,
				null,
				1,
				1,
			]),
			[undefined, null, 1],
		)
	})

	await t.step("should handle NaN values with custom comparator", () => {
		const nanAware = (a: number, b: number) =>
			(Number.isNaN(a) && Number.isNaN(b)) || a === b
		assertEquals(
			dropRepeatsWith(nanAware)([NaN, NaN, 1, 1, NaN, 2]),
			[NaN, 1, NaN, 2],
		)
	})

	await t.step("should work with complex nested structures", () => {
		const deepEqual = (a: unknown, b: unknown) =>
			JSON.stringify(a) === JSON.stringify(b)
		const data = [
			{ a: { b: 1 } },
			{ a: { b: 1 } },
			{ a: { b: 2 } },
			{ a: { b: 2 } },
			{ a: { b: 1 } },
		]
		assertEquals(
			dropRepeatsWith(deepEqual)(data),
			[{ a: { b: 1 } }, { a: { b: 2 } }, { a: { b: 1 } }],
		)
	})

	await t.step("should handle large arrays efficiently", () => {
		const comparator = (a: number, b: number) => a === b
		const largeArray = Array.from(
			{ length: 10000 },
			(_, i) => Math.floor(i / 100),
		)
		const result = dropRepeatsWith(comparator)(largeArray)
		assertEquals(result.length, 100)
		assertEquals(result[0], 0)
		assertEquals(result[99], 99)
	})

	await t.step(
		"property: should never have consecutive elements that comparator considers equal",
		() => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.func(fc.boolean()),
					(arr, comparatorFn) => {
						const comparator = (a: number, b: number) =>
							comparatorFn(a) === comparatorFn(b)
						const result = dropRepeatsWith(comparator)(arr)

						// Check no consecutive duplicates according to comparator
						for (let i = 1; i < result.length; i++) {
							if (comparator(result[i], result[i - 1])) {
								return false
							}
						}
						return true
					},
				),
			)
		},
	)

	await t.step("property: result should be subsequence of original", () => {
		fc.assert(
			fc.property(fc.array(fc.integer()), (arr) => {
				const comparator = (a: number, b: number) => a === b
				const result = dropRepeatsWith(comparator)(arr)

				// Every element in result should appear in original order
				let originalIndex = 0
				for (const item of result) {
					const found = arr.indexOf(item, originalIndex)
					if (found === -1) return false
					originalIndex = found + 1
				}
				return true
			}),
		)
	})

	await t.step("property: empty array always returns empty", () => {
		fc.assert(
			fc.property(
				fc.func(fc.boolean()),
				(comparatorFn) => {
					const comparator = (a: unknown, b: unknown) =>
						comparatorFn(a) === comparatorFn(b)
					const result = dropRepeatsWith(comparator)([])
					return result.length === 0
				},
			),
		)
	})

	await t.step(
		"property: single element array always returns single element",
		() => {
			fc.assert(
				fc.property(
					fc.anything(),
					fc.func(fc.boolean()),
					(element, comparatorFn) => {
						const comparator = (a: unknown, b: unknown) =>
							comparatorFn(a) === comparatorFn(b)
						const result = dropRepeatsWith(comparator)([element])
						return result.length === 1 && result[0] === element
					},
				),
			)
		},
	)

	await t.step(
		"property: comparator that always returns false keeps all elements",
		() => {
			fc.assert(
				fc.property(fc.array(fc.integer()), (arr) => {
					const alwaysFalse = () => false
					const result = dropRepeatsWith(alwaysFalse)(arr)
					return result.length === arr.length
				}),
			)
		},
	)

	await t.step(
		"property: comparator that always returns true keeps only first element",
		() => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					(arr) => {
						const alwaysTrue = () => true
						const result = dropRepeatsWith(alwaysTrue)(arr)
						return result.length === 1 && result[0] === arr[0]
					},
				),
			)
		},
	)
})
