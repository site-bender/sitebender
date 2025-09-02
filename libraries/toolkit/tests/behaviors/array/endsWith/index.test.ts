import * as fc from "fast-check"
import { assertEquals } from "jsr:@std/assert@1.0.8"

import endsWith from "../../../../src/simple/array/endsWith/index.ts"

Deno.test("endsWith", async (t) => {
	await t.step("should return false for null/undefined array", () => {
		const suffix = [3, 4, 5]
		assertEquals(endsWith(suffix)(null), false)
		assertEquals(endsWith(suffix)(undefined), false)
	})

	await t.step("should return false for null/undefined suffix", () => {
		const array = [1, 2, 3, 4, 5]
		assertEquals(endsWith(null)(array), false)
		assertEquals(endsWith(undefined)(array), false)
	})

	await t.step("should return true for empty suffix", () => {
		assertEquals(endsWith<number>([])([1, 2, 3]), true)
		assertEquals(endsWith<unknown>([])([]), true)
		assertEquals(endsWith<string>([])(["a", "b"]), true)
	})

	await t.step("should return false when suffix is longer than array", () => {
		assertEquals(endsWith([1, 2, 3, 4])([2, 3, 4]), false)
		assertEquals(endsWith([1, 2, 3])([1, 2]), false)
		assertEquals(endsWith(["a", "b", "c"])(["c"]), false)
	})

	await t.step("should correctly check if array ends with suffix", () => {
		assertEquals(endsWith([3, 4, 5])([1, 2, 3, 4, 5]), true)
		assertEquals(endsWith([4, 5])([1, 2, 3, 4, 5]), true)
		assertEquals(endsWith([5])([1, 2, 3, 4, 5]), true)
		assertEquals(endsWith([1, 2, 3, 4, 5])([1, 2, 3, 4, 5]), true)
	})

	await t.step("should return false when suffix doesn't match", () => {
		assertEquals(endsWith([2, 3])([1, 2, 3, 4, 5]), false)
		assertEquals(endsWith([3, 5])([1, 2, 3, 4, 5]), false)
		assertEquals(endsWith([6])([1, 2, 3, 4, 5]), false)
	})

	await t.step("should work with strings", () => {
		assertEquals(endsWith([".jpg"])(["image", ".jpg"]), true)
		assertEquals(endsWith([".png"])(["image", ".jpg"]), false)
		assertEquals(
			endsWith(["world", "!"])(["hello", "world", "!"]),
			true,
		)
		assertEquals(
			endsWith(["hello"])(["hello", "world"]),
			false,
		)
	})

	await t.step("should work with objects", () => {
		const obj1 = { id: 1 }
		const obj2 = { id: 2 }
		const obj3 = { id: 3 }

		assertEquals(endsWith([obj2, obj3])([obj1, obj2, obj3]), true)
		assertEquals(endsWith([obj1, obj2])([obj1, obj2, obj3]), false)

		// Different object instances with same shape
		assertEquals(
			endsWith([{ id: 2 }, { id: 3 }])([{ id: 1 }, { id: 2 }, { id: 3 }]),
			false, // false because they're different object instances
		)
	})

	await t.step("should handle NaN correctly using Object.is", () => {
		assertEquals(endsWith([NaN, 3])([1, 2, NaN, 3]), true)
		assertEquals(endsWith([NaN])([1, 2, 3, NaN]), true)
		assertEquals(endsWith([NaN, NaN])([NaN, NaN, NaN]), true)
		assertEquals(endsWith([1, NaN])([NaN, 1, NaN]), true)
	})

	await t.step("should handle +0 and -0 correctly using Object.is", () => {
		assertEquals(endsWith([+0])([1, 2, -0]), false) // Object.is(+0, -0) is false
		assertEquals(endsWith([-0])([1, 2, +0]), false) // Object.is(-0, +0) is false
		assertEquals(endsWith([+0])([1, 2, +0]), true)
		assertEquals(endsWith([-0])([1, 2, -0]), true)
	})

	await t.step("should handle undefined and null values", () => {
		assertEquals(
			endsWith<number | undefined | null>([undefined, null])([
				1,
				undefined,
				null,
			]),
			true,
		)
		assertEquals(
			endsWith<undefined | null>([null])([undefined, null]),
			true,
		)
		assertEquals(
			endsWith<undefined | null>([undefined])([null, undefined]),
			true,
		)
	})

	await t.step("should handle mixed types", () => {
		assertEquals(
			endsWith([3, "4", true])([1, "2", 3, "4", true]),
			true,
		)
		assertEquals(
			endsWith(["3", 4])([1, 2, 3, 4]),
			false, // Different types
		)
	})

	await t.step("should handle single element arrays", () => {
		assertEquals(endsWith([1])([1]), true)
		assertEquals(endsWith([2])([1]), false)
		assertEquals(endsWith<number>([])([1]), true)
	})

	await t.step("should handle empty arrays", () => {
		assertEquals(endsWith<unknown>([])([]), true)
		assertEquals(endsWith([1])([]), false)
	})

	await t.step("should be reusable through partial application", () => {
		const endsWithExtension = endsWith([".ts"])
		assertEquals(endsWithExtension(["file", ".ts"]), true)
		assertEquals(endsWithExtension(["file", ".js"]), false)
		assertEquals(endsWithExtension([".ts"]), true)

		const endsWithPattern = endsWith([0, 1])
		assertEquals(endsWithPattern([1, 0, 1]), true)
		assertEquals(endsWithPattern([0, 1, 0]), false)
	})

	await t.step("property: empty suffix always returns true", () => {
		fc.assert(
			fc.property(fc.array(fc.anything()), (arr) => {
				return endsWith<unknown>([])(arr) === true
			}),
		)
	})

	await t.step(
		"property: suffix longer than array always returns false",
		() => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { maxLength: 10 }),
					fc.array(fc.integer(), { minLength: 11 }),
					(arr, suffix) => {
						if (suffix.length > arr.length) {
							return endsWith(suffix)(arr) === false
						}
						return true
					},
				),
			)
		},
	)

	await t.step("property: array always ends with itself", () => {
		fc.assert(
			fc.property(fc.array(fc.integer()), (arr) => {
				return endsWith(arr)(arr) === true
			}),
		)
	})

	await t.step(
		"property: if endsWith returns true, suffix matches end of array",
		() => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.nat({ max: 10 }),
					(arr, suffixLength) => {
						const suffix = arr.slice(-suffixLength)
						const result = endsWith(suffix)(arr)

						if (result) {
							// Verify the suffix actually matches
							const startIndex = arr.length - suffix.length
							return suffix.every((val, i) =>
								Object.is(arr[startIndex + i], val)
							)
						}
						return true
					},
				),
			)
		},
	)

	await t.step(
		"property: concatenating suffix to array prefix makes endsWith true",
		() => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					(prefix, suffix) => {
						const combined = [...prefix, ...suffix]
						return endsWith(suffix)(combined) === true
					},
				),
			)
		},
	)

	await t.step("property: null/undefined array always returns false", () => {
		fc.assert(
			fc.property(fc.array(fc.anything()), (suffix) => {
				return endsWith(suffix)(null) === false &&
					endsWith(suffix)(undefined) === false
			}),
		)
	})

	await t.step("property: null/undefined suffix always returns false", () => {
		fc.assert(
			fc.property(fc.array(fc.anything()), (arr) => {
				return endsWith(null)(arr) === false &&
					endsWith(undefined)(arr) === false
			}),
		)
	})
})
