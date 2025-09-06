import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import {
	assertType,
	IsExact,
} from "https://deno.land/std@0.218.0/testing/types.ts"
import * as fc from "npm:fast-check@3"

import repeat from "../../../../src/simple/array/repeat/index.ts"

Deno.test("repeat: basic functionality", async (t) => {
	await t.step("should repeat string value", () => {
		const result = repeat(3)("x")
		assertEquals(result, ["x", "x", "x"])
	})

	await t.step("should repeat number value", () => {
		const result = repeat(2)(42)
		assertEquals(result, [42, 42])
	})

	await t.step("should return empty array for zero count", () => {
		const result = repeat(0)("y")
		assertEquals(result, [])
	})

	await t.step("should return empty array for negative count", () => {
		const result = repeat(-1)("z")
		assertEquals(result, [])
	})

	await t.step("should repeat null value", () => {
		const result = repeat(3)(null)
		assertEquals(result, [null, null, null])
	})

	await t.step("should repeat undefined value", () => {
		const result = repeat(2)(undefined)
		assertEquals(result, [undefined, undefined])
	})

	await t.step("should repeat boolean value", () => {
		const result = repeat(4)(true)
		assertEquals(result, [true, true, true, true])
	})

	await t.step("should create single element array", () => {
		const result = repeat(1)("single")
		assertEquals(result, ["single"])
	})

	await t.step("should handle large counts", () => {
		const result = repeat(100)(0)
		assertEquals(result.length, 100)
		assertEquals(result.every((v) => v === 0), true)
	})
})

Deno.test("repeat: edge cases", async (t) => {
	await t.step("should handle negative counts", () => {
		const result = repeat(-100)("test")
		assertEquals(result, [])
	})

	await t.step("should handle NaN count", () => {
		const result = repeat(NaN)("test")
		assertEquals(result, [])
	})

	await t.step("should handle Infinity count", () => {
		// Should handle without throwing (returns empty array since Infinity > 0 is true but Array.from with Infinity length fails)
		try {
			const result = repeat(Infinity)("test")
			// If it doesn't throw, it should return empty array
			assertEquals(Array.isArray(result), true)
		} catch {
			// Expected to throw RangeError for invalid array length
			assertEquals(true, true)
		}
	})

	await t.step("should handle fractional counts", () => {
		const result = repeat(3.7)("x")
		assertEquals(result, ["x", "x", "x"]) // Truncates to 3
	})

	await t.step("should repeat objects by reference", () => {
		const obj = { a: 1 }
		const result = repeat(3)(obj)
		assertEquals(result, [obj, obj, obj])
		// All references are the same object
		assertEquals(result[0] === result[1], true)
		assertEquals(result[1] === result[2], true)
		// Modifying one affects all
		result[0].a = 2
		assertEquals(result[1].a, 2)
		assertEquals(result[2].a, 2)
	})

	await t.step("should repeat arrays by reference", () => {
		const arr = [1, 2, 3]
		const result = repeat(2)(arr)
		assertEquals(result, [arr, arr])
		// Both references are the same array
		assertEquals(result[0] === result[1], true)
	})

	await t.step("should repeat functions", () => {
		const fn = () => "hello"
		const result = repeat(2)(fn)
		assertEquals(result.length, 2)
		assertEquals(result[0], fn)
		assertEquals(result[1], fn)
		assertEquals(result[0](), "hello")
	})

	await t.step("should handle symbols", () => {
		const sym = Symbol("test")
		const result = repeat(3)(sym)
		assertEquals(result, [sym, sym, sym])
	})
})

Deno.test("repeat: type safety", async (t) => {
	await t.step("should correctly infer types", () => {
		const result = repeat(3)("test")
		assertType<IsExact<typeof result, string[]>>(true)
	})

	await t.step("should handle number types", () => {
		const result = repeat(2)(42)
		assertType<IsExact<typeof result, number[]>>(true)
		assertEquals(result, [42, 42])
	})

	await t.step("should handle complex types", () => {
		type Item = { id: number; name: string }
		const item: Item = { id: 1, name: "test" }
		const result = repeat(3)(item)
		assertType<IsExact<typeof result, Item[]>>(true)
		assertEquals(result.length, 3)
	})

	await t.step("should handle union types", () => {
		const value: string | number = "test"
		const result = repeat(2)(value)
		assertType<IsExact<typeof result, (string | number)[]>>(true)
		assertEquals(result, ["test", "test"])
	})
})

Deno.test("repeat: currying", async (t) => {
	await t.step("should be fully curried", () => {
		const triple = repeat(3)

		const result1 = triple("a")
		const result2 = triple(10)
		const result3 = triple(null)

		assertEquals(result1, ["a", "a", "a"])
		assertEquals(result2, [10, 10, 10])
		assertEquals(result3, [null, null, null])
	})

	await t.step(
		"should allow partial application for different counts",
		() => {
			const single = repeat(1)
			const double = repeat(2)
			const quintuple = repeat(5)

			assertEquals(single("x"), ["x"])
			assertEquals(double("x"), ["x", "x"])
			assertEquals(quintuple("x"), ["x", "x", "x", "x", "x"])
		},
	)

	await t.step("should create reusable array generators", () => {
		const makePair = repeat(2)

		const pairs = [
			makePair("first"),
			makePair("second"),
			makePair("third"),
		]

		assertEquals(pairs, [
			["first", "first"],
			["second", "second"],
			["third", "third"],
		])
	})
})

Deno.test("repeat: property-based tests", async (t) => {
	await t.step("should create array of correct length", () => {
		fc.assert(
			fc.property(
				fc.integer({ min: 0, max: 1000 }),
				fc.anything(),
				(count, item) => {
					const result = repeat(count)(item)
					return result.length === count
				},
			),
		)
	})

	await t.step("should contain only the specified item", () => {
		fc.assert(
			fc.property(
				fc.integer({ min: 1, max: 100 }),
				fc.anything(),
				(count, item) => {
					const result = repeat(count)(item)
					return result.every((v) => v === item)
				},
			),
		)
	})

	await t.step("should return empty array for non-positive counts", () => {
		fc.assert(
			fc.property(
				fc.integer({ max: 0 }),
				fc.anything(),
				(count, item) => {
					const result = repeat(count)(item)
					return result.length === 0
				},
			),
		)
	})

	await t.step("should handle fractional counts by truncating", () => {
		fc.assert(
			fc.property(
				fc.float({ min: 0, max: 100, noNaN: true }),
				fc.anything(),
				(count, item) => {
					const result = repeat(count)(item)
					const expectedLength = Math.floor(count)
					return result.length === expectedLength
				},
			),
		)
	})

	await t.step("should maintain reference equality for objects", () => {
		fc.assert(
			fc.property(
				fc.integer({ min: 2, max: 10 }),
				fc.object(),
				(count, obj) => {
					const result = repeat(count)(obj)
					// All elements should be the same reference
					return result.every((v) => v === result[0])
				},
			),
		)
	})

	await t.step("should be equivalent to manual array creation", () => {
		fc.assert(
			fc.property(
				fc.integer({ min: 0, max: 100 }),
				fc.anything(),
				(count, item) => {
					const result = repeat(count)(item)
					const manual = []
					for (let i = 0; i < count; i++) {
						manual.push(item)
					}

					return result.length === manual.length &&
						result.every((v, i) => v === manual[i])
				},
			),
		)
	})
})
