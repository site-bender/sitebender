import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import { assertType, IsExact } from "https://deno.land/std@0.218.0/testing/types.ts"
import * as fc from "npm:fast-check@3"

import replaceFirst from "../../../../src/simple/array/replaceFirst/index.ts"

Deno.test("replaceFirst: type checking", async (t) => {
	await t.step("should have correct type signature", () => {
		const replacer = replaceFirst(2)((n: number) => n * 10)
		assertType<IsExact<typeof replacer, (array: ReadonlyArray<number> | null | undefined) => Array<number>>>(true)

		const result = replacer([1, 2, 3])
		assertType<IsExact<typeof result, Array<number>>>(true)
	})

	await t.step("should work with different types", () => {
		// String replacement
		const stringReplacer = replaceFirst("old")(() => "new")
		assertType<IsExact<typeof stringReplacer, (array: ReadonlyArray<string> | null | undefined) => Array<string>>>(true)

		// Object replacement
		const obj1 = { id: 1 }
		const obj2 = { id: 2 }
		const objReplacer = replaceFirst(obj1)(() => obj2)
		assertType<IsExact<typeof objReplacer, (array: ReadonlyArray<{ id: number }> | null | undefined) => Array<{ id: number }>>>(true)
	})
})

Deno.test("replaceFirst: basic functionality", async (t) => {
	await t.step("should replace only first occurrence", () => {
		const replacer = replaceFirst(2)((n) => n * 10)
		assertEquals(replacer([1, 2, 3, 2, 4]), [1, 20, 3, 2, 4])
	})

	await t.step("should replace first string occurrence", () => {
		const replacer = replaceFirst("old")(() => "new")
		assertEquals(
			replacer(["old", "test", "old", "data"]),
			["new", "test", "old", "data"]
		)
	})

	await t.step("should return original array when target not found", () => {
		const replacer = replaceFirst(5)((n) => n * 10)
		const result = replacer([1, 2, 3])
		assertEquals(result, [1, 2, 3])
	})

	await t.step("should handle empty arrays", () => {
		const replacer = replaceFirst(1)(() => 2)
		assertEquals(replacer([]), [])
	})

	await t.step("should replace null values", () => {
		const replacer = replaceFirst(null)(() => 0)
		assertEquals(replacer([1, null, 2, null]), [1, 0, 2, null])
	})

	await t.step("should replace undefined values", () => {
		const replacer = replaceFirst(undefined)(() => "default")
		assertEquals(
			replacer([undefined, "a", undefined, "b"]),
			["default", "a", undefined, "b"]
		)
	})

	await t.step("should replace at beginning of array", () => {
		const replacer = replaceFirst(1)(() => 99)
		assertEquals(replacer([1, 2, 3, 1]), [99, 2, 3, 1])
	})

	await t.step("should replace at end when only last matches", () => {
		const replacer = replaceFirst(4)(() => 99)
		assertEquals(replacer([1, 2, 3, 4]), [1, 2, 3, 99])
	})

	await t.step("should pass matched item to replacer", () => {
		let capturedItem: number | null = null
		const replacer = replaceFirst(5)((item) => {
			capturedItem = item
			return item * 2
		})
		assertEquals(replacer([3, 5, 7, 5]), [3, 10, 7, 5])
		assertEquals(capturedItem, 5)
	})
})

Deno.test("replaceFirst: edge cases", async (t) => {
	await t.step("should handle null input", () => {
		const replacer = replaceFirst(1)(() => 2)
		assertEquals(replacer(null), [])
	})

	await t.step("should handle undefined input", () => {
		const replacer = replaceFirst(1)(() => 2)
		assertEquals(replacer(undefined), [])
	})

	await t.step("should use strict equality (===)", () => {
		const replacer = replaceFirst(0)(() => 99)
		assertEquals(replacer([0, false, "", null]), [99, false, "", null])
	})

	await t.step("should handle NaN values (NaN !== NaN)", () => {
		const replacer = replaceFirst(NaN)(() => 0)
		const input = [1, NaN, 2, NaN]
		const result = replacer(input)
		// NaN is never equal to itself with ===, so indexOf returns -1
		assertEquals(result[0], 1)
		assertEquals(Number.isNaN(result[1]), true)
		assertEquals(result[2], 2)
		assertEquals(Number.isNaN(result[3]), true)
	})

	await t.step("should not distinguish between +0 and -0", () => {
		const replacer = replaceFirst(0)(() => 99)
		assertEquals(replacer([0, -0, 0]), [99, -0, 0])
		
		const replacer2 = replaceFirst(-0)(() => 99)
		assertEquals(replacer2([0, -0, 0]), [99, -0, 0]) // Finds +0 first
	})

	await t.step("should handle array with single element", () => {
		const replacer = replaceFirst(1)(() => 99)
		assertEquals(replacer([1]), [99])
	})

	await t.step("should preserve array order", () => {
		const replacer = replaceFirst(2)(() => 99)
		assertEquals(replacer([1, 2, 3, 2, 4]), [1, 99, 3, 2, 4])
	})
})

Deno.test("replaceFirst: object references", async (t) => {
	await t.step("should match objects by reference", () => {
		const obj1 = { id: 1 }
		const obj2 = { id: 2 }
		const obj3 = { id: 1 } // Different instance with same content
		const replacement = { id: 99 }
		
		const replacer = replaceFirst(obj1)(() => replacement)
		assertEquals(
			replacer([obj1, obj2, obj3, obj1]),
			[replacement, obj2, obj3, obj1]
		)
	})

	await t.step("should work with arrays as elements", () => {
		const arr1 = [1, 2]
		const arr2 = [3, 4]
		const arr3 = [1, 2] // Different instance
		const replacement = [99, 99]
		
		const replacer = replaceFirst(arr1)(() => replacement)
		assertEquals(
			replacer([arr1, arr2, arr3, arr1]),
			[replacement, arr2, arr3, arr1]
		)
	})

	await t.step("should not match different instances with same content", () => {
		const obj1 = { id: 1 }
		const obj2 = { id: 1 } // Same content, different instance
		const replacement = { id: 99 }
		
		const replacer = replaceFirst(obj2)(() => replacement)
		assertEquals(
			replacer([obj1, obj2, obj1]),
			[obj1, replacement, obj1]
		)
	})
})

Deno.test("replaceFirst: currying", async (t) => {
	await t.step("should be curried", () => {
		const withTarget = replaceFirst(5)
		assertType<IsExact<typeof withTarget, <T>(replacer: (item: T) => T) => (array: ReadonlyArray<T> | null | undefined) => Array<T>>>(true)

		const withReplacer = withTarget((n) => n * 2)
		assertType<IsExact<typeof withReplacer, (array: ReadonlyArray<number> | null | undefined) => Array<number>>>(true)

		const result = withReplacer([5, 10, 5])
		assertEquals(result, [10, 10, 5])
	})

	await t.step("should allow partial application", () => {
		// Create reusable replacers
		const replaceFirstNull = replaceFirst(null)
		const replaceWithZero = replaceFirstNull(() => 0)
		const replaceWithDefault = replaceFirstNull(() => "N/A")

		assertEquals(replaceWithZero([1, null, 2, null]), [1, 0, 2, null])
		assertEquals(replaceWithDefault(["a", null, "b", null]), ["a", "N/A", "b", null])
	})
})

Deno.test("replaceFirst: immutability", async (t) => {
	await t.step("should not modify original array", () => {
		const original = [1, 2, 3, 2, 4]
		const replacer = replaceFirst(2)(() => 99)
		const result = replacer(original)
		
		assertEquals(original, [1, 2, 3, 2, 4])
		assertEquals(result, [1, 99, 3, 2, 4])
	})

	await t.step("should return same content when no replacements", () => {
		const original = [1, 2, 3]
		const replacer = replaceFirst(99)(() => 0)
		const result = replacer(original)
		
		assertEquals(result, [1, 2, 3])
		// Note: Current implementation returns same reference when target not found
		// This is because replaceAt returns same array for out-of-bounds index
	})

	await t.step("should create new array even for single replacement", () => {
		const original = [1]
		const replacer = replaceFirst(1)(() => 2)
		const result = replacer(original)
		
		assertEquals(result, [2])
		assertEquals(result === original, false)
	})
})

Deno.test("replaceFirst: property-based tests", async (t) => {
	await t.step("should replace at most one element", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.integer(),
				fc.integer(),
				(arr, target, replacement) => {
					const replacer = replaceFirst(target)(() => replacement)
					const result = replacer(arr)
					
					// Count occurrences of target in original
					const originalCount = arr.filter(x => x === target).length
					
					// Count occurrences of target in result
					const resultCount = result.filter(x => x === target).length
					
					// If target was in original, result should have one less
					if (originalCount > 0) {
						assertEquals(resultCount, originalCount - 1)
						
						// Count replacements
						const replacementCount = result.filter(x => x === replacement).length
						const originalReplacementCount = arr.filter(x => x === replacement).length
						
						if (replacement !== target) {
							assertEquals(replacementCount, originalReplacementCount + 1)
						}
					} else {
						// Content unchanged if target not found
						assertEquals(result, arr)
					}
					
					// Length always preserved
					assertEquals(result.length, arr.length)
					
					return true
				}
			),
			{ verbose: false }
		)
	})

	await t.step("should preserve elements after first replacement", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.integer(),
				fc.integer(),
				(arr, target, replacement) => {
					const replacer = replaceFirst(target)(() => replacement)
					const result = replacer(arr)
					
					const firstIndex = arr.indexOf(target)
					if (firstIndex !== -1) {
						// Elements before first occurrence unchanged
						for (let i = 0; i < firstIndex; i++) {
							assertEquals(result[i], arr[i])
						}
						
						// First occurrence replaced
						assertEquals(result[firstIndex], replacement)
						
						// Elements after first occurrence unchanged
						for (let i = firstIndex + 1; i < arr.length; i++) {
							assertEquals(result[i], arr[i])
						}
					} else {
						assertEquals(result, arr)
					}
					
					return true
				}
			),
			{ verbose: false }
		)
	})

	await t.step("should be idempotent when target equals replacement", () => {
		fc.assert(
			fc.property(
				fc.array(fc.integer()),
				fc.integer(),
				(arr, value) => {
					const replacer = replaceFirst(value)(() => value)
					const result1 = replacer(arr)
					const result2 = replacer(result1)
					
					assertEquals(result1, result2)
					assertEquals(result1, arr) // Content unchanged
					return true
				}
			),
			{ verbose: false }
		)
	})

	await t.step("should handle null and undefined correctly", () => {
		fc.assert(
			fc.property(
				fc.oneof(fc.constant(null), fc.constant(undefined)),
				fc.integer(),
				fc.integer(),
				(input, target, replacement) => {
					const replacer = replaceFirst(target)(() => replacement)
					const result = replacer(input)
					assertEquals(result, [])
					return true
				}
			),
			{ verbose: false }
		)
	})
})

Deno.test("replaceFirst: replacer function behavior", async (t) => {
	await t.step("should call replacer at most once", () => {
		let callCount = 0
		const replacer = replaceFirst(2)(() => {
			callCount++
			return 99
		})
		
		replacer([1, 2, 3, 2, 4])
		assertEquals(callCount, 1)
		
		callCount = 0
		replacer([1, 3, 4]) // No match
		assertEquals(callCount, 0)
	})

	await t.step("should support complex transformations", () => {
		const users = [
			{ name: "Alice", status: "active" },
			{ name: "Bob", status: "inactive" },
			{ name: "Charlie", status: "inactive" },
		]
		
		const target = users[1] // Bob
		const replacer = replaceFirst(target)((user) => ({
			...user,
			status: "active",
			updatedAt: "2024-01-01"
		}))
		
		const result = replacer([...users, target]) // Bob appears twice
		assertEquals(result[0].status, "active")
		assertEquals(result[1].status, "active") // First Bob updated
		assertEquals((result[1] as any).updatedAt, "2024-01-01")
		assertEquals(result[2].status, "inactive")
		assertEquals(result[3], target) // Second Bob unchanged
	})

	await t.step("should handle replacer that throws", () => {
		const replacer = replaceFirst(2)(() => {
			throw new Error("test error")
		})
		
		try {
			replacer([1, 2, 3])
			throw new Error("Should have thrown")
		} catch (e) {
			assertEquals((e as Error).message, "test error")
		}
	})

	await t.step("should work with different transformation types", () => {
		// Double the value
		const doubler = replaceFirst(5)((n) => n * 2)
		assertEquals(doubler([5, 5, 5]), [10, 5, 5])
		
		// Uppercase string
		const uppercaser = replaceFirst("hello")((s) => s.toUpperCase())
		assertEquals(uppercaser(["hello", "world", "hello"]), ["HELLO", "world", "hello"])
		
		// Toggle boolean
		const toggler = replaceFirst(true)(() => false)
		assertEquals(toggler([true, false, true]), [false, false, true])
	})
})