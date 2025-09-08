import * as fc from "fast-check"
import { assertEquals } from "jsr:@std/assert@1.0.8"

import findIndices from "../../../../src/simple/array/findIndices/index.ts"

Deno.test("findIndices", async (t) => {
	await t.step("returns empty array for null or undefined", () => {
		assertEquals(findIndices(() => true)(null), [])
		assertEquals(findIndices(() => true)(undefined), [])
	})

	await t.step("returns empty array for empty array", () => {
		assertEquals(findIndices(() => true)([]), [])
		assertEquals(findIndices(() => false)([]), [])
	})

	await t.step("finds all even number indices", () => {
		const isEven = (x: number) => x % 2 === 0
		assertEquals(findIndices(isEven)([1, 2, 3, 4, 5, 6]), [1, 3, 5])
		assertEquals(findIndices(isEven)([2, 4, 6, 8]), [0, 1, 2, 3])
		assertEquals(findIndices(isEven)([1, 3, 5, 7]), [])
	})

	await t.step("finds all matching string indices", () => {
		const isA = (x: string) => x === "a"
		assertEquals(findIndices(isA)(["a", "b", "a", "c"]), [0, 2])
		assertEquals(findIndices(isA)(["b", "c", "d"]), [])
		assertEquals(findIndices(isA)(["a", "a", "a"]), [0, 1, 2])
	})

	await t.step("works with complex predicates", () => {
		const users = [
			{ name: "Alice", active: true },
			{ name: "Bob", active: false },
			{ name: "Charlie", active: true },
			{ name: "David", active: false },
		]
		const isActive = (u: typeof users[0]) => u.active
		assertEquals(findIndices(isActive)(users), [0, 2])
	})

	await t.step("returns empty array when no matches", () => {
		assertEquals(findIndices((x: number) => x > 100)([1, 2, 3]), [])
		assertEquals(findIndices((x: string) => x === "z")(["a", "b", "c"]), [])
	})

	await t.step("passes index and array to predicate", () => {
		const indices: number[] = []
		const arrays: ReadonlyArray<string>[] = []

		findIndices(
			(value: string, index: number, array: ReadonlyArray<string>) => {
				indices.push(index)
				arrays.push(array)
				return value === "b"
			},
		)(["a", "b", "c"])

		assertEquals(indices, [0, 1, 2])
		assertEquals(arrays, [["a", "b", "c"], ["a", "b", "c"], [
			"a",
			"b",
			"c",
		]])
	})

	await t.step("finds all truthy value indices", () => {
		const isTruthy = (x: unknown) => !!x
		assertEquals(
			findIndices(isTruthy)([
				0,
				1,
				"",
				"hello",
				false,
				true,
				null,
				undefined,
				NaN,
				[],
				{},
			]),
			[1, 3, 5, 9, 10],
		)
	})

	await t.step("finds indices by type", () => {
		const isNumber = (x: unknown) => typeof x === "number"
		const mixed = [1, "2", 3, "4", 5, true, false, null]
		assertEquals(findIndices(isNumber)(mixed), [0, 2, 4])
	})

	await t.step("handles special numeric values", () => {
		const isNaN = (x: number) => Number.isNaN(x)
		assertEquals(findIndices(isNaN)([1, NaN, 2, NaN, 3]), [1, 3])

		const isInfinity = (x: number) => x === Infinity
		assertEquals(
			findIndices(isInfinity)([1, Infinity, -Infinity, Infinity]),
			[
				1,
				3,
			],
		)
	})

	await t.step("finds indices based on position", () => {
		const isEvenIndex = (_: unknown, index: number) => index % 2 === 0
		assertEquals(findIndices(isEvenIndex)(["a", "b", "c", "d", "e"]), [
			0,
			2,
			4,
		])
	})

	await t.step("finds indices relative to array length", () => {
		const isInFirstHalf = (
			_: unknown,
			index: number,
			array: ReadonlyArray<unknown>,
		) => index < array.length / 2
		assertEquals(findIndices(isInFirstHalf)([1, 2, 3, 4]), [0, 1])
		assertEquals(findIndices(isInFirstHalf)([1, 2, 3, 4, 5]), [0, 1, 2]) // 5/2=2.5, so indices 0,1,2 are < 2.5
	})

	await t.step("is curried", () => {
		const findEvens = findIndices((n: number) => n % 2 === 0)
		assertEquals(findEvens([1, 2, 3, 4, 5]), [1, 3])
		assertEquals(findEvens([2, 4, 6]), [0, 1, 2])
		assertEquals(findEvens([1, 3, 5]), [])
	})

	await t.step("handles single element arrays", () => {
		assertEquals(findIndices((x: number) => x === 1)([1]), [0])
		assertEquals(findIndices((x: number) => x === 2)([1]), [])
	})

	await t.step("handles large arrays", () => {
		const large = Array.from({ length: 1000 }, (_, i) => i)
		const isMultipleOf100 = (x: number) => x % 100 === 0 && x > 0
		const expected = [100, 200, 300, 400, 500, 600, 700, 800, 900]
		assertEquals(findIndices(isMultipleOf100)(large), expected)
	})

	await t.step("handles arrays with objects", () => {
		const items = [
			{ id: 1, value: 10 },
			{ id: 2, value: 20 },
			{ id: 3, value: 10 },
			{ id: 4, value: 30 },
		]
		const hasValue10 = (item: typeof items[0]) => item.value === 10
		assertEquals(findIndices(hasValue10)(items), [0, 2])
	})

	await t.step("handles arrays with null/undefined values", () => {
		const isNullish = (x: unknown) => x === null || x === undefined
		assertEquals(
			findIndices(isNullish)([1, null, undefined, 2, null, 3]),
			[1, 2, 4],
		)
	})

	await t.step(
		"property: result indices are valid and in ascending order",
		() => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.func(fc.boolean()),
					(arr, predicate) => {
						const indices = findIndices(predicate)(arr)

						// All indices are valid
						const allValid = indices.every((i) => i >= 0 && i < arr.length)

						// Indices are in ascending order
						const isAscending = indices.every((val, i, arr) =>
							i === 0 || val > arr[i - 1]
						)

						return allValid && isAscending
					},
				),
			)
		},
	)

	await t.step(
		"property: all matching indices are included",
		() => {
			fc.assert(
				fc.property(
					fc.array(fc.integer({ min: 0, max: 10 })),
					(arr) => {
						const threshold = 5
						const predicate = (x: number) => x > threshold
						const indices = findIndices(predicate)(arr)

						// Check that all indices where predicate is true are included
						const expectedIndices = arr
							.map((val, idx) => predicate(val) ? idx : -1)
							.filter((idx) => idx !== -1)

						return JSON.stringify(indices) ===
							JSON.stringify(expectedIndices)
					},
				),
			)
		},
	)

	await t.step(
		"property: length of result is at most array length",
		() => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.func(fc.boolean()),
					(arr, predicate) => {
						const indices = findIndices(predicate)(arr)
						return indices.length <= arr.length
					},
				),
			)
		},
	)

	await t.step(
		"property: empty array returns empty indices",
		() => {
			fc.assert(
				fc.property(
					fc.func(fc.boolean()),
					(predicate) => {
						const indices = findIndices(predicate)([])
						return indices.length === 0
					},
				),
			)
		},
	)

	await t.step(
		"property: always true predicate returns all indices",
		() => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { minLength: 1, maxLength: 100 }),
					(arr) => {
						const indices = findIndices(() => true)(arr)
						const expected = arr.map((_, i) => i)
						return JSON.stringify(indices) ===
							JSON.stringify(expected)
					},
				),
			)
		},
	)

	await t.step(
		"property: always false predicate returns empty array",
		() => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					(arr) => {
						const indices = findIndices(() => false)(arr)
						return indices.length === 0
					},
				),
			)
		},
	)
})
