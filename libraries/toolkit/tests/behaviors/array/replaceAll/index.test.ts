import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import {
	assertType,
	IsExact,
} from "https://deno.land/std@0.218.0/testing/types.ts"
import * as fc from "npm:fast-check@3"

import replaceAll from "../../../../src/simple/array/replaceAll/index.ts"

Deno.test("replaceAll: type checking", async (t) => {
	await t.step("should have correct type signature", () => {
		const replacer = replaceAll(2)((n: number) => n * 10)
		assertType<
			IsExact<
				typeof replacer,
				(
					array: ReadonlyArray<number> | null | undefined,
				) => Array<number>
			>
		>(true)

		const result = replacer([1, 2, 3])
		assertType<IsExact<typeof result, Array<number>>>(true)
	})

	await t.step("should work with different types", () => {
		// String replacement
		const stringReplacer = replaceAll("old")(() => "new")
		assertType<
			IsExact<
				typeof stringReplacer,
				(
					array: ReadonlyArray<string> | null | undefined,
				) => Array<string>
			>
		>(true)

		// Object replacement
		const obj1 = { id: 1 }
		const obj2 = { id: 2 }
		const objReplacer = replaceAll(obj1)(() => obj2)
		assertType<
			IsExact<
				typeof objReplacer,
				(
					array: ReadonlyArray<{ id: number }> | null | undefined,
				) => Array<{ id: number }>
			>
		>(true)
	})
})

Deno.test("replaceAll: basic functionality", async (t) => {
	await t.step("should replace all occurrences of a value", () => {
		const replacer = replaceAll(2)((n) => n * 10)
		assertEquals(replacer([1, 2, 3, 2, 4]), [1, 20, 3, 20, 4])
	})

	await t.step("should replace strings", () => {
		const replacer = replaceAll("old")(() => "new")
		assertEquals(
			replacer(["old", "test", "old", "data"]),
			["new", "test", "new", "data"],
		)
	})

	await t.step("should replace null values", () => {
		const replacer = replaceAll(null)(() => 0)
		assertEquals(replacer([1, null, 2, null, 3]), [1, 0, 2, 0, 3])
	})

	await t.step("should replace undefined values", () => {
		const replacer = replaceAll(undefined)(() => "default")
		assertEquals(
			replacer([undefined, "a", undefined, "b"]),
			["default", "a", "default", "b"],
		)
	})

	await t.step("should return empty array when no matches", () => {
		const replacer = replaceAll(99)(() => 0)
		assertEquals(replacer([1, 2, 3]), [1, 2, 3])
	})

	await t.step("should handle empty arrays", () => {
		const replacer = replaceAll(1)(() => 2)
		assertEquals(replacer([]), [])
	})

	await t.step("should pass matched item to replacer function", () => {
		const items: number[] = []
		const replacer = replaceAll(5)((item) => {
			items.push(item)
			return item * 2
		})
		assertEquals(replacer([5, 10, 5, 15]), [10, 10, 10, 15])
		assertEquals(items, [5, 5])
	})
})

Deno.test("replaceAll: edge cases", async (t) => {
	await t.step("should handle null input", () => {
		const replacer = replaceAll(1)(() => 2)
		assertEquals(replacer(null), [])
	})

	await t.step("should handle undefined input", () => {
		const replacer = replaceAll(1)(() => 2)
		assertEquals(replacer(undefined), [])
	})

	await t.step("should use strict equality (===) for matching", () => {
		const replacer = replaceAll(0)(() => 99)
		assertEquals(replacer([0, false, "", null]), [99, false, "", null])
	})

	await t.step("should handle NaN values (NaN !== NaN)", () => {
		const replacer = replaceAll(NaN)(() => 0)
		const input = [1, NaN, 2, NaN]
		const result = replacer(input)
		// NaN is never equal to itself with ===
		assertEquals(result[0], 1)
		assertEquals(Number.isNaN(result[1]), true)
		assertEquals(result[2], 2)
		assertEquals(Number.isNaN(result[3]), true)
	})

	await t.step("should distinguish between +0 and -0", () => {
		const replacer = replaceAll(0)(() => 99)
		assertEquals(replacer([0, -0]), [99, 99]) // Both match with ===
	})

	await t.step("should handle arrays with only target values", () => {
		const replacer = replaceAll(1)(() => 2)
		assertEquals(replacer([1, 1, 1]), [2, 2, 2])
	})

	await t.step("should preserve array order", () => {
		const replacer = replaceAll(2)(() => 99)
		assertEquals(replacer([1, 2, 3, 2, 4]), [1, 99, 3, 99, 4])
	})
})

Deno.test("replaceAll: object references", async (t) => {
	await t.step("should match objects by reference", () => {
		const obj1 = { id: 1 }
		const obj2 = { id: 2 }
		const obj3 = { id: 1 } // Different instance with same content
		const replacement = { id: 99 }

		const replacer = replaceAll(obj1)(() => replacement)
		assertEquals(
			replacer([obj1, obj2, obj3, obj1]),
			[replacement, obj2, obj3, replacement],
		)
	})

	await t.step("should work with arrays as elements", () => {
		const arr1 = [1, 2]
		const arr2 = [3, 4]
		const arr3 = [1, 2] // Different instance
		const replacement = [99, 99]

		const replacer = replaceAll(arr1)(() => replacement)
		assertEquals(
			replacer([arr1, arr2, arr3, arr1]),
			[replacement, arr2, arr3, replacement],
		)
	})
})

Deno.test("replaceAll: currying", async (t) => {
	await t.step("should be curried", () => {
		const withTarget = replaceAll(5)
		assertType<
			IsExact<
				typeof withTarget,
				<T>(
					replacer: (item: T) => T,
				) => (array: ReadonlyArray<T> | null | undefined) => Array<T>
			>
		>(true)

		const withReplacer = withTarget((n) => n * 2)
		assertType<
			IsExact<
				typeof withReplacer,
				(
					array: ReadonlyArray<number> | null | undefined,
				) => Array<number>
			>
		>(true)

		const result = withReplacer([5, 10, 5])
		assertEquals(result, [10, 10, 10])
	})

	await t.step("should allow partial application", () => {
		// Create reusable replacers
		const replaceNulls = replaceAll(null)
		const replaceWithZero = replaceNulls(() => 0)
		const replaceWithDefault = replaceNulls(() => "N/A")

		assertEquals(replaceWithZero([1, null, 2]), [1, 0, 2])
		assertEquals(replaceWithDefault(["a", null, "b"]), ["a", "N/A", "b"])
	})
})

Deno.test("replaceAll: immutability", async (t) => {
	await t.step("should not modify original array", () => {
		const original = [1, 2, 3, 2, 4]
		const replacer = replaceAll(2)(() => 99)
		const result = replacer(original)

		assertEquals(original, [1, 2, 3, 2, 4])
		assertEquals(result, [1, 99, 3, 99, 4])
	})

	await t.step("should create new array even when no replacements", () => {
		const original = [1, 2, 3]
		const replacer = replaceAll(99)(() => 0)
		const result = replacer(original)

		assertEquals(result, [1, 2, 3])
		assertEquals(result === original, false)
	})
})

Deno.test("replaceAll: property-based tests", async (t) => {
	await t.step("should replace all and only matching elements", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.integer(),
				fc.integer(),
				(arr, target, replacement) => {
					const replacer = replaceAll(target)(() => replacement)
					const result = replacer(arr)

					// All target values should be replaced
					const hasTarget = result.some((x) => x === target)
					const expectedHasTarget = replacement === target &&
						arr.some((x) => x === target)
					assertEquals(hasTarget, expectedHasTarget)

					// Result should have same length
					assertEquals(result.length, arr.length)

					// Non-target values should be preserved
					arr.forEach((val, idx) => {
						if (val !== target) {
							assertEquals(result[idx], val)
						} else {
							assertEquals(result[idx], replacement)
						}
					})

					return true
				},
			),
			{ verbose: false },
		)
	})

	await t.step("should maintain array structure", () => {
		fc.assert(
			fc.property(
				fc.array(fc.oneof(
					fc.constant(null),
					fc.constant(undefined),
					fc.integer(),
					fc.string(),
				)),
				(arr) => {
					const target = arr[0]
					const replacer = replaceAll(target)(() => "REPLACED")
					const result = replacer(arr)

					// Length preserved
					assertEquals(result.length, arr.length)

					// Order preserved
					arr.forEach((val, idx) => {
						if (val === target) {
							assertEquals(result[idx], "REPLACED")
						} else {
							assertEquals(result[idx], val)
						}
					})

					return true
				},
			),
			{ verbose: false },
		)
	})

	await t.step("should be idempotent when target equals replacement", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.integer(),
				(arr, value) => {
					const replacer = replaceAll(value)(() => value)
					const result1 = replacer(arr)
					const result2 = replacer(result1)

					assertEquals(result1, result2)
					return true
				},
			),
			{ verbose: false },
		)
	})

	await t.step("should handle null and undefined correctly", () => {
		fc.assert(
			fc.property(
				fc.oneof(fc.constant(null), fc.constant(undefined)),
				fc.integer(),
				fc.integer(),
				(input, target, replacement) => {
					const replacer = replaceAll(target)(() => replacement)
					const result = replacer(input)
					assertEquals(result, [])
					return true
				},
			),
			{ verbose: false },
		)
	})
})

Deno.test("replaceAll: replacer function behavior", async (t) => {
	await t.step("should call replacer only for matching elements", () => {
		let callCount = 0
		const replacer = replaceAll(2)(() => {
			callCount++
			return 99
		})

		replacer([1, 2, 3, 2, 4])
		assertEquals(callCount, 2)
	})

	await t.step("should support complex transformations", () => {
		const users = [
			{ name: "Alice", status: "active" },
			{ name: "Bob", status: "inactive" },
			{ name: "Charlie", status: "inactive" },
		]

		const target = users[1] // Bob
		const replacer = replaceAll(target)((user) => ({
			...user,
			status: "active",
		}))

		const result = replacer(users)
		assertEquals(result[0].status, "active")
		assertEquals(result[1].status, "active") // Bob updated
		assertEquals(result[2].status, "inactive")
	})

	await t.step("should handle replacer that throws", () => {
		const replacer = replaceAll(2)(() => {
			throw new Error("test error")
		})

		try {
			replacer([1, 2, 3])
			throw new Error("Should have thrown")
		} catch (e) {
			assertEquals((e as Error).message, "test error")
		}
	})
})
