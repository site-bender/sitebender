import { expect } from "@std/expect"
import { describe, it } from "@std/testing/bdd"
import * as fc from "fast-check"

import isDefined from "./index.ts"

describe("isDefined", () => {
	describe("basic functionality", () => {
		it("should return false for undefined", () => {
			expect(isDefined(undefined)).toBe(false)
		})

		it("should return false for null", () => {
			expect(isDefined(null)).toBe(false)
		})

		it("should return true for defined values", () => {
			expect(isDefined(0)).toBe(true)
			expect(isDefined("")).toBe(true)
			expect(isDefined(false)).toBe(true)
			expect(isDefined([])).toBe(true)
			expect(isDefined({})).toBe(true)
		})
	})

	describe("type guard behavior", () => {
		it("should act as a type guard for TypeScript", () => {
			const value: string | undefined = Math.random() > 0.5 ? "hello" : undefined
			
			if (isDefined(value)) {
				// TypeScript should know value is string here
				expect(typeof value).toBe("string")
				expect(value.length).toBeGreaterThanOrEqual(0) // This should compile without error
			}
		})

		it("should narrow null | undefined types", () => {
			const value: number | null | undefined = Math.random() > 0.5 ? 42 : null
			
			if (isDefined(value)) {
				// TypeScript should know value is number here
				expect(typeof value).toBe("number")
				expect(value + 1).toBe(43) // This should compile without error
			}
		})
	})

	describe("falsy values", () => {
		it("should return true for falsy but defined values", () => {
			expect(isDefined(0)).toBe(true)
			expect(isDefined("")).toBe(true)
			expect(isDefined(false)).toBe(true)
			expect(isDefined(NaN)).toBe(true)
		})

		it("should distinguish between falsy and null/undefined", () => {
			const falsyValues = [0, "", false, NaN]
			const nullishValues = [null, undefined]
			
			falsyValues.forEach(value => {
				expect(isDefined(value)).toBe(true)
			})
			
			nullishValues.forEach(value => {
				expect(isDefined(value)).toBe(false)
			})
		})
	})

	describe("edge cases", () => {
		it("should handle explicit undefined", () => {
			const explicitUndefined = undefined
			expect(isDefined(explicitUndefined)).toBe(false)
		})

		it("should handle explicit null", () => {
			const explicitNull = null
			expect(isDefined(explicitNull)).toBe(false)
		})

		it("should handle void expressions", () => {
			expect(isDefined(void 0)).toBe(false)
			expect(isDefined(void "anything")).toBe(false)
		})

		it("should handle functions that return undefined", () => {
			const returnsUndefined = () => undefined
			expect(isDefined(returnsUndefined())).toBe(false)
		})

		it("should handle object properties that don't exist", () => {
			const obj = {} as { prop?: string }
			expect(isDefined(obj.prop)).toBe(false)
		})
	})

	describe("object and array values", () => {
		it("should return true for empty objects", () => {
			expect(isDefined({})).toBe(true)
		})

		it("should return true for empty arrays", () => {
			expect(isDefined([])).toBe(true)
		})

		it("should return true for objects with null/undefined properties", () => {
			const obj = { a: null, b: undefined, c: "value" }
			expect(isDefined(obj)).toBe(true)
			expect(isDefined(obj.a)).toBe(false)
			expect(isDefined(obj.b)).toBe(false)
			expect(isDefined(obj.c)).toBe(true)
		})

		it("should return true for arrays with null/undefined elements", () => {
			const arr = [null, undefined, "value"]
			expect(isDefined(arr)).toBe(true)
			expect(isDefined(arr[0])).toBe(false)
			expect(isDefined(arr[1])).toBe(false)
			expect(isDefined(arr[2])).toBe(true)
		})
	})

	describe("special values", () => {
		it("should handle special number values", () => {
			expect(isDefined(Infinity)).toBe(true)
			expect(isDefined(-Infinity)).toBe(true)
			expect(isDefined(NaN)).toBe(true)
			expect(isDefined(Number.MAX_VALUE)).toBe(true)
			expect(isDefined(Number.MIN_VALUE)).toBe(true)
		})

		it("should handle Date objects", () => {
			expect(isDefined(new Date())).toBe(true)
			expect(isDefined(new Date("invalid"))).toBe(true) // Invalid Date is still an object
		})

		it("should handle regex objects", () => {
			expect(isDefined(/test/)).toBe(true)
			expect(isDefined(new RegExp("test"))).toBe(true)
		})

		it("should handle function objects", () => {
			expect(isDefined(() => {})).toBe(true)
			expect(isDefined(function() {})).toBe(true)
			expect(isDefined(Math.max)).toBe(true)
		})
	})

	describe("property-based tests", () => {
		it("should return false only for null and undefined", () => {
			fc.assert(
				fc.property(
					fc.anything(),
					(value) => {
						const result = isDefined(value)
						if (value === null || value === undefined) {
							expect(result).toBe(false)
						} else {
							expect(result).toBe(true)
						}
					}
				)
			)
		})

		it("should be consistent with double negation", () => {
			fc.assert(
				fc.property(
					fc.anything(),
					(value) => {
						expect(isDefined(value)).toBe(!!isDefined(value))
					}
				)
			)
		})

		it("should be the inverse of checking for null/undefined", () => {
			fc.assert(
				fc.property(
					fc.anything(),
					(value) => {
						const isNullish = value === null || value === undefined
						expect(isDefined(value)).toBe(!isNullish)
					}
				)
			)
		})
	})

	describe("array filtering behavior", () => {
		it("should work as an array filter", () => {
			const mixed = [1, null, "hello", undefined, 0, false, ""]
			const defined = mixed.filter(isDefined)
			expect(defined).toEqual([1, "hello", 0, false, ""])
		})

		it("should preserve type information in filtered arrays", () => {
			const maybeNumbers: Array<number | null | undefined> = [1, 2, null, 3, undefined, 4]
			const definedNumbers = maybeNumbers.filter(isDefined)
			// TypeScript should infer definedNumbers as number[]
			expect(definedNumbers).toEqual([1, 2, 3, 4])
			definedNumbers.forEach(num => {
				expect(typeof num).toBe("number")
			})
		})

		it("should handle sparse arrays", () => {
			const sparse = new Array(5)
			sparse[1] = "defined"
			sparse[3] = 42
			
			const elements = sparse.map((val, index) => ({ index, val, isDefined: isDefined(val) }))
			const definedElements = elements.filter(item => item.isDefined)
			
			expect(definedElements.length).toBe(2)
			expect(definedElements[0].index).toBe(1)
			expect(definedElements[1].index).toBe(3)
		})
	})

	describe("practical usage patterns", () => {
		it("should work in conditional checks", () => {
			const maybeValue: string | undefined = Math.random() > 0.5 ? "value" : undefined
			
			if (isDefined(maybeValue)) {
				expect(typeof maybeValue).toBe("string")
			} else {
				expect(maybeValue).toBe(undefined)
			}
		})

		it("should work in ternary expressions", () => {
			const maybeValue: number | null = Math.random() > 0.5 ? 42 : null
			const result = isDefined(maybeValue) ? maybeValue * 2 : 0
			
			if (maybeValue !== null) {
				expect(result).toBe(84)
			} else {
				expect(result).toBe(0)
			}
		})

		it("should work in logical AND expressions", () => {
			const maybeValue: string | undefined = Math.random() > 0.5 ? "test" : undefined
			const result = isDefined(maybeValue) && maybeValue.toUpperCase()
			
			if (maybeValue !== undefined) {
				expect(result).toBe("TEST")
			} else {
				expect(result).toBe(false)
			}
		})
	})

	describe("performance characteristics", () => {
		it("should be fast for primitive checks", () => {
			const values = [null, undefined, 0, "", false, true, 42, "hello"]
			
			const start = Date.now()
			for (let i = 0; i < 10000; i++) {
				values.forEach(isDefined)
			}
			const end = Date.now()
			
			expect(end - start).toBeLessThan(100) // Should be very fast
		})

		it("should handle large arrays efficiently", () => {
			const largeArray = new Array(10000).fill(null).map((_, i) => 
				i % 3 === 0 ? undefined : i % 3 === 1 ? null : i
			)
			
			const start = Date.now()
			const defined = largeArray.filter(isDefined)
			const end = Date.now()
			
			expect(defined.length).toBe(Math.floor(10000 / 3))
			expect(end - start).toBeLessThan(100) // Should be reasonably fast
		})
	})
})