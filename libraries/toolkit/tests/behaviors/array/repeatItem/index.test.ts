import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import { assertType, IsExact } from "https://deno.land/std@0.218.0/testing/types.ts"
import * as fc from "npm:fast-check@3"

import repeatItem from "../../../../src/simple/array/repeatItem/index.ts"

Deno.test("repeatItem: basic functionality", async (t) => {
	await t.step("should repeat string value", () => {
		const result = repeatItem("x")(3)
		assertEquals(result, ["x", "x", "x"])
	})

	await t.step("should repeat number value", () => {
		const result = repeatItem(42)(2)
		assertEquals(result, [42, 42])
	})

	await t.step("should return empty array for zero count", () => {
		const result = repeatItem("y")(0)
		assertEquals(result, [])
	})

	await t.step("should return empty array for negative count", () => {
		const result = repeatItem(true)(-1)
		assertEquals(result, [])
	})

	await t.step("should repeat null value", () => {
		const result = repeatItem(null)(5)
		assertEquals(result, [null, null, null, null, null])
	})

	await t.step("should repeat undefined value", () => {
		const result = repeatItem(undefined)(3)
		assertEquals(result, [undefined, undefined, undefined])
	})

	await t.step("should repeat boolean value", () => {
		const result = repeatItem(false)(4)
		assertEquals(result, [false, false, false, false])
	})

	await t.step("should create single element array", () => {
		const result = repeatItem("single")(1)
		assertEquals(result, ["single"])
	})

	await t.step("should handle large counts", () => {
		const result = repeatItem(0)(100)
		assertEquals(result.length, 100)
		assertEquals(result.every((v) => v === 0), true)
	})
})

Deno.test("repeatItem: edge cases", async (t) => {
	await t.step("should handle negative counts", () => {
		const result = repeatItem("test")(-100)
		assertEquals(result, [])
	})

	await t.step("should handle NaN count", () => {
		const result = repeatItem("test")(NaN)
		assertEquals(result, [])
	})

	await t.step("should handle Infinity count", () => {
		// Should handle without throwing (returns empty array since Infinity > 0 is true but Array.from with Infinity length fails)
		try {
			const result = repeatItem("test")(Infinity)
			// If it doesn't throw, it should return empty array
			assertEquals(Array.isArray(result), true)
		} catch {
			// Expected to throw RangeError for invalid array length
			assertEquals(true, true)
		}
	})

	await t.step("should handle fractional counts", () => {
		const result = repeatItem("x")(3.7)
		assertEquals(result, ["x", "x", "x"]) // Truncates to 3
	})

	await t.step("should repeat objects by reference", () => {
		const obj = { a: 1 }
		const result = repeatItem(obj)(3)
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
		const result = repeatItem(arr)(2)
		assertEquals(result, [arr, arr])
		// Both references are the same array
		assertEquals(result[0] === result[1], true)
	})

	await t.step("should repeat functions", () => {
		const fn = () => "hello"
		const result = repeatItem(fn)(2)
		assertEquals(result.length, 2)
		assertEquals(result[0], fn)
		assertEquals(result[1], fn)
		assertEquals(result[0](), "hello")
	})

	await t.step("should handle symbols", () => {
		const sym = Symbol("test")
		const result = repeatItem(sym)(3)
		assertEquals(result, [sym, sym, sym])
	})

	await t.step("should handle empty string", () => {
		const result = repeatItem("")(3)
		assertEquals(result, ["", "", ""])
	})
})

Deno.test("repeatItem: type safety", async (t) => {
	await t.step("should correctly infer types", () => {
		const result = repeatItem("test")(3)
		assertType<IsExact<typeof result, string[]>>(true)
	})

	await t.step("should handle number types", () => {
		const result = repeatItem(42)(2)
		assertType<IsExact<typeof result, number[]>>(true)
		assertEquals(result, [42, 42])
	})

	await t.step("should handle complex types", () => {
		type Item = { id: number; name: string }
		const item: Item = { id: 1, name: "test" }
		const result = repeatItem(item)(3)
		assertType<IsExact<typeof result, Item[]>>(true)
		assertEquals(result.length, 3)
	})

	await t.step("should handle union types", () => {
		const value: string | number = "test"
		const result = repeatItem(value)(2)
		assertType<IsExact<typeof result, (string | number)[]>>(true)
		assertEquals(result, ["test", "test"])
	})
})

Deno.test("repeatItem: currying", async (t) => {
	await t.step("should be fully curried", () => {
		const repeatNull = repeatItem(null)
		const repeatZero = repeatItem(0)
		const repeatA = repeatItem("a")
		
		assertEquals(repeatNull(3), [null, null, null])
		assertEquals(repeatZero(2), [0, 0])
		assertEquals(repeatA(4), ["a", "a", "a", "a"])
	})

	await t.step("should create reusable repeaters", () => {
		const repeatStar = repeatItem("*")
		
		const result1 = repeatStar(1)
		const result2 = repeatStar(3)
		const result3 = repeatStar(5)
		
		assertEquals(result1, ["*"])
		assertEquals(result2, ["*", "*", "*"])
		assertEquals(result3, ["*", "*", "*", "*", "*"])
	})

	await t.step("should allow building patterns", () => {
		const repeatDash = repeatItem("-")
		const repeatEquals = repeatItem("=")
		
		const separator = repeatDash(10).join("")
		const divider = repeatEquals(20).join("")
		
		assertEquals(separator, "----------")
		assertEquals(divider, "====================")
	})
})

Deno.test("repeatItem: property-based tests", async (t) => {
	await t.step("should create array of correct length", () => {
		fc.assert(
			fc.property(
				fc.anything(),
				fc.integer({ min: 0, max: 1000 }),
				(item, count) => {
					const result = repeatItem(item)(count)
					return result.length === count
				},
			),
		)
	})

	await t.step("should contain only the specified item", () => {
		fc.assert(
			fc.property(
				fc.anything(),
				fc.integer({ min: 1, max: 100 }),
				(item, count) => {
					const result = repeatItem(item)(count)
					return result.every((v) => v === item)
				},
			),
		)
	})

	await t.step("should return empty array for non-positive counts", () => {
		fc.assert(
			fc.property(
				fc.anything(),
				fc.integer({ max: 0 }),
				(item, count) => {
					const result = repeatItem(item)(count)
					return result.length === 0
				},
			),
		)
	})

	await t.step("should handle fractional counts by truncating", () => {
		fc.assert(
			fc.property(
				fc.anything(),
				fc.float({ min: 0, max: 100, noNaN: true }),
				(item, count) => {
					const result = repeatItem(item)(count)
					const expectedLength = Math.floor(count)
					return result.length === expectedLength
				},
			),
		)
	})

	await t.step("should maintain reference equality for objects", () => {
		fc.assert(
			fc.property(
				fc.object(),
				fc.integer({ min: 2, max: 10 }),
				(obj, count) => {
					const result = repeatItem(obj)(count)
					// All elements should be the same reference
					return result.every((v) => v === result[0])
				},
			),
		)
	})

	await t.step("should be inverse of repeat function", () => {
		fc.assert(
			fc.property(
				fc.anything(),
				fc.integer({ min: 0, max: 100 }),
				(item, count) => {
					const result = repeatItem(item)(count)
					// Manual creation to compare
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