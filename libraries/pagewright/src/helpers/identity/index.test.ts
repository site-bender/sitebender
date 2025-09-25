import { expect } from "@std/expect"
import { describe, it } from "@std/testing/bdd"
import * as fc from "fast-check"

import identity from "./index.ts"

describe("identity", () => {
	describe("basic functionality", () => {
		it("should return the same value for primitives", () => {
			expect(identity(5)).toBe(5)
			expect(identity("hello")).toBe("hello")
			expect(identity(true)).toBe(true)
			expect(identity(null)).toBe(null)
			expect(identity(undefined)).toBe(undefined)
		})

		it("should return the same reference for objects", () => {
			const obj = { a: 1, b: 2 }
			expect(identity(obj)).toBe(obj)
			expect(identity(obj)).toEqual(obj)
		})

		it("should return the same reference for arrays", () => {
			const arr = [1, 2, 3]
			expect(identity(arr)).toBe(arr)
			expect(identity(arr)).toEqual(arr)
		})

		it("should return the same reference for functions", () => {
			const func = () => "test"
			expect(identity(func)).toBe(func)
		})
	})

	describe("type preservation", () => {
		it("should preserve number types", () => {
			const num = 42
			const result = identity(num)
			expect(typeof result).toBe("number")
			expect(result).toBe(num)
		})

		it("should preserve string types", () => {
			const str = "test string"
			const result = identity(str)
			expect(typeof result).toBe("string")
			expect(result).toBe(str)
		})

		it("should preserve boolean types", () => {
			const bool = true
			const result = identity(bool)
			expect(typeof result).toBe("boolean")
			expect(result).toBe(bool)
		})

		it("should preserve object types", () => {
			const obj = { key: "value" }
			const result = identity(obj)
			expect(typeof result).toBe("object")
			expect(result).toBe(obj)
		})

		it("should preserve array types", () => {
			const arr = [1, 2, 3]
			const result = identity(arr)
			expect(Array.isArray(result)).toBe(true)
			expect(result).toBe(arr)
		})
	})

	describe("edge cases", () => {
		it("should handle zero", () => {
			expect(identity(0)).toBe(0)
		})

		it("should handle negative numbers", () => {
			expect(identity(-42)).toBe(-42)
			expect(identity(-0)).toBe(-0)
		})

		it("should handle empty string", () => {
			expect(identity("")).toBe("")
		})

		it("should handle empty array", () => {
			const emptyArr: unknown[] = []
			expect(identity(emptyArr)).toBe(emptyArr)
		})

		it("should handle empty object", () => {
			const emptyObj = {}
			expect(identity(emptyObj)).toBe(emptyObj)
		})

		it("should handle NaN", () => {
			const result = identity(NaN)
			expect(Number.isNaN(result)).toBe(true)
		})

		it("should handle Infinity", () => {
			expect(identity(Infinity)).toBe(Infinity)
			expect(identity(-Infinity)).toBe(-Infinity)
		})
	})

	describe("complex data structures", () => {
		it("should handle nested objects", () => {
			const nested = {
				a: { b: { c: "deep" } },
				d: [1, { e: "nested" }],
			}
			const result = identity(nested)
			expect(result).toBe(nested)
			expect(result.a.b.c).toBe("deep")
		})

		it("should handle nested arrays", () => {
			const nested = [[1, 2], [3, [4, 5]]]
			const result = identity(nested)
			expect(result).toBe(nested)
			expect(result[1][1]).toEqual([4, 5])
		})

		it("should handle Map objects", () => {
			const map = new Map([["key", "value"]])
			const result = identity(map)
			expect(result).toBe(map)
			expect(result.get("key")).toBe("value")
		})

		it("should handle Set objects", () => {
			const set = new Set([1, 2, 3])
			const result = identity(set)
			expect(result).toBe(set)
			expect(result.has(2)).toBe(true)
		})

		it("should handle Date objects", () => {
			const date = new Date("2024-01-01")
			const result = identity(date)
			expect(result).toBe(date)
			expect(result.getTime()).toBe(date.getTime())
		})
	})

	describe("property-based tests", () => {
		it("should satisfy identity law for any value", () => {
			fc.assert(
				fc.property(
					fc.anything(),
					(value) => {
						expect(identity(value)).toBe(value)
					},
				),
			)
		})

		it("should be idempotent", () => {
			fc.assert(
				fc.property(
					fc.anything(),
					(value) => {
						expect(identity(identity(value))).toBe(value)
					},
				),
			)
		})

		it("should work with function composition", () => {
			fc.assert(
				fc.property(
					fc.anything(),
					(value) => {
						const compose = <T>(f: (b: T) => T, g: (a: T) => T) => (a: T) =>
							f(g(a))
						const identityComposed = compose(identity, identity)
						expect(identityComposed(value)).toBe(value)
					},
				),
			)
		})

		it("should preserve equality", () => {
			fc.assert(
				fc.property(
					fc.anything(),
					fc.anything(),
					(a, b) => {
						const aIdentity = identity(a)
						const bIdentity = identity(b)

						if (a === b) {
							expect(aIdentity === bIdentity).toBe(true)
						}

						expect(aIdentity === a).toBe(true)
						expect(bIdentity === b).toBe(true)
					},
				),
			)
		})
	})

	describe("functional programming patterns", () => {
		it("should work as identity for map operations", () => {
			const arr = [1, 2, 3, 4, 5]
			const result = arr.map(identity)
			expect(result).toEqual(arr)
			expect(result).not.toBe(arr) // map creates new array
		})

		it("should work in filter operations (always true for truthy values)", () => {
			const arr = [0, 1, "", "hello", null, undefined, false, true]
			const truthyValues = arr.filter(identity)
			expect(truthyValues).toEqual([1, "hello", true])
		})

		it("should work in reduce operations", () => {
			const arr = [1, 2, 3]
			// Using identity as initial value
			const result = arr.reduce((acc, val) => acc + val, identity(0))
			expect(result).toBe(6)
		})

		it("should work in function composition", () => {
			const double = (x: number) => x * 2
			const add1 = (x: number) => x + 1

			// identity should not change the result
			const composed1 = (x: number) => identity(double(add1(x)))
			const composed2 = (x: number) => double(identity(add1(x)))
			const composed3 = (x: number) => double(add1(identity(x)))

			expect(composed1(5)).toBe(12)
			expect(composed2(5)).toBe(12)
			expect(composed3(5)).toBe(12)
		})
	})

	describe("performance characteristics", () => {
		it("should be extremely fast for primitives", () => {
			const start = Date.now()
			for (let i = 0; i < 10000; i++) {
				identity(i)
			}
			const end = Date.now()
			expect(end - start).toBeLessThan(100) // Should be very fast
		})

		it("should not clone or copy objects", () => {
			const largeObj = {
				data: new Array(10000).fill(0).map((_, i) => ({
					id: i,
					value: `item-${i}`,
				})),
			}

			const start = Date.now()
			const result = identity(largeObj)
			const end = Date.now()

			expect(result).toBe(largeObj) // Same reference
			expect(end - start).toBeLessThan(10) // Should be instant
		})
	})

	describe("mathematical properties", () => {
		it("should satisfy left identity law", () => {
			// For any function f and value x: f(identity(x)) === f(x)
			const double = (x: number) => x * 2
			const testValue = 42

			expect(double(identity(testValue))).toBe(double(testValue))
		})

		it("should satisfy right identity law", () => {
			// For any function f and value x: identity(f(x)) === f(x)
			const double = (x: number) => x * 2
			const testValue = 42

			expect(identity(double(testValue))).toBe(double(testValue))
		})

		it("should be its own inverse", () => {
			fc.assert(
				fc.property(
					fc.anything(),
					(value) => {
						// identity is its own inverse: identity⁻¹ = identity
						expect(identity(value)).toBe(value)
					},
				),
			)
		})
	})
})
