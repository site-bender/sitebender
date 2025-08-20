import { expect } from "@std/expect"
import { describe, it } from "@std/testing/bdd"
import * as fc from "fast-check"

import isUndefined from "./index.ts"

describe("isUndefined", () => {
	describe("basic functionality", () => {
		it("should return true for undefined", () => {
			expect(isUndefined(undefined)).toBe(true)
		})

		it("should return false for null", () => {
			expect(isUndefined(null)).toBe(false)
		})

		it("should return false for defined values", () => {
			expect(isUndefined(0)).toBe(false)
			expect(isUndefined("")).toBe(false)
			expect(isUndefined(false)).toBe(false)
			expect(isUndefined([])).toBe(false)
			expect(isUndefined({})).toBe(false)
		})

		it("should distinguish null from undefined", () => {
			expect(isUndefined(null)).toBe(false)
			expect(isUndefined(undefined)).toBe(true)
		})
	})

	describe("type guard behavior", () => {
		it("should act as a type guard for TypeScript", () => {
			const value: string | undefined = Math.random() > 0.5 ? "hello" : undefined
			
			if (isUndefined(value)) {
				// TypeScript should know value is undefined here
				expect(value).toBe(undefined)
			} else {
				// TypeScript should know value is string here
				expect(typeof value).toBe("string")
				expect(value.length).toBeGreaterThanOrEqual(0)
			}
		})

		it("should narrow unknown types to undefined", () => {
			const value: unknown = Math.random() > 0.5 ? 42 : undefined
			
			if (isUndefined(value)) {
				// TypeScript should know value is undefined here
				expect(value).toBe(undefined)
			}
		})
	})

	describe("falsy values", () => {
		it("should return false for falsy but defined values", () => {
			expect(isUndefined(0)).toBe(false)
			expect(isUndefined("")).toBe(false)
			expect(isUndefined(false)).toBe(false)
			expect(isUndefined(NaN)).toBe(false)
		})

		it("should only return true for undefined, not other falsy values", () => {
			const falsyValues = [0, "", false, NaN, null]
			
			falsyValues.forEach(value => {
				expect(isUndefined(value)).toBe(false)
			})
			
			expect(isUndefined(undefined)).toBe(true)
		})
	})

	describe("edge cases", () => {
		it("should handle explicit undefined", () => {
			const explicitUndefined = undefined
			expect(isUndefined(explicitUndefined)).toBe(true)
		})

		it("should handle void expressions", () => {
			expect(isUndefined(void 0)).toBe(true)
			expect(isUndefined(void "anything")).toBe(true)
			expect(isUndefined(void 42)).toBe(true)
		})

		it("should handle functions that return undefined", () => {
			const returnsUndefined = () => undefined
			expect(isUndefined(returnsUndefined())).toBe(true)
			
			const returnsExplicitUndefined = () => { return undefined }
			expect(isUndefined(returnsExplicitUndefined())).toBe(true)
			
			const returnsNothing = () => { /* no return */ }
			expect(isUndefined(returnsNothing())).toBe(true)
		})

		it("should handle object properties that don't exist", () => {
			const obj = {} as { prop?: string }
			expect(isUndefined(obj.prop)).toBe(true)
			
			const arr: Array<string | undefined> = ["a", "b"]
			expect(isUndefined(arr[5])).toBe(true)
		})

		it("should handle destructuring with defaults", () => {
			const obj = { a: "value" } as { a?: string; b?: string }
			const { a, b } = obj
			
			expect(isUndefined(a)).toBe(false)
			expect(isUndefined(b)).toBe(true)
		})
	})

	describe("object and array values", () => {
		it("should return false for empty objects", () => {
			expect(isUndefined({})).toBe(false)
		})

		it("should return false for empty arrays", () => {
			expect(isUndefined([])).toBe(false)
		})

		it("should correctly identify undefined properties/elements", () => {
			const obj = { a: null, b: undefined, c: "value" }
			expect(isUndefined(obj)).toBe(false)
			expect(isUndefined(obj.a)).toBe(false) // null, not undefined
			expect(isUndefined(obj.b)).toBe(true)
			expect(isUndefined(obj.c)).toBe(false)
		})

		it("should handle arrays with undefined elements", () => {
			const arr = [null, undefined, "value", , "end"] // note the hole
			expect(isUndefined(arr)).toBe(false)
			expect(isUndefined(arr[0])).toBe(false) // null
			expect(isUndefined(arr[1])).toBe(true)  // undefined
			expect(isUndefined(arr[2])).toBe(false) // "value"
			expect(isUndefined(arr[3])).toBe(true)  // hole (undefined)
			expect(isUndefined(arr[4])).toBe(false) // "end"
		})
	})

	describe("special values", () => {
		it("should return false for special number values", () => {
			expect(isUndefined(Infinity)).toBe(false)
			expect(isUndefined(-Infinity)).toBe(false)
			expect(isUndefined(NaN)).toBe(false)
			expect(isUndefined(Number.MAX_VALUE)).toBe(false)
			expect(isUndefined(Number.MIN_VALUE)).toBe(false)
		})

		it("should return false for object types", () => {
			expect(isUndefined(new Date())).toBe(false)
			expect(isUndefined(new Date("invalid"))).toBe(false)
			expect(isUndefined(/test/)).toBe(false)
			expect(isUndefined(new RegExp("test"))).toBe(false)
		})

		it("should return false for function objects", () => {
			expect(isUndefined(() => {})).toBe(false)
			expect(isUndefined(function() {})).toBe(false)
			expect(isUndefined(Math.max)).toBe(false)
		})

		it("should return false for symbols", () => {
			expect(isUndefined(Symbol("test"))).toBe(false)
			expect(isUndefined(Symbol.iterator)).toBe(false)
		})
	})

	describe("property-based tests", () => {
		it("should return true only for undefined", () => {
			fc.assert(
				fc.property(
					fc.anything(),
					(value) => {
						const result = isUndefined(value)
						if (value === undefined) {
							expect(result).toBe(true)
						} else {
							expect(result).toBe(false)
						}
					}
				)
			)
		})

		it("should be consistent with strict equality", () => {
			fc.assert(
				fc.property(
					fc.anything(),
					(value) => {
						expect(isUndefined(value)).toBe(value === undefined)
					}
				)
			)
		})

		it("should be mutually exclusive with isDefined for undefined values", () => {
			// Note: This assumes isDefined exists and checks for both null and undefined
			const isDefined = (val: unknown) => val !== undefined && val !== null
			
			fc.assert(
				fc.property(
					fc.anything(),
					(value) => {
						if (value === undefined) {
							expect(isUndefined(value)).toBe(true)
							expect(isDefined(value)).toBe(false)
						}
						// For null, isDefined should be false but isUndefined should also be false
						if (value === null) {
							expect(isUndefined(value)).toBe(false)
							expect(isDefined(value)).toBe(false)
						}
					}
				)
			)
		})
	})

	describe("array filtering behavior", () => {
		it("should work as an array filter to find undefined values", () => {
			const mixed = [1, null, "hello", undefined, 0, false, "", undefined]
			const undefinedValues = mixed.filter(isUndefined)
			expect(undefinedValues).toEqual([undefined, undefined])
		})

		it("should work to remove undefined values (inverse filter)", () => {
			const maybeNumbers: Array<number | undefined> = [1, 2, undefined, 3, undefined, 4]
			const definedNumbers = maybeNumbers.filter(x => !isUndefined(x))
			expect(definedNumbers).toEqual([1, 2, 3, 4])
		})

		it("should handle sparse arrays correctly", () => {
			const sparse = new Array(5)
			sparse[1] = "defined"
			sparse[3] = 42
			// indices 0, 2, 4 are holes (undefined)
			
			const undefinedIndices: number[] = []
			// forEach skips holes in sparse arrays, so we need to use for loop
			for (let i = 0; i < sparse.length; i++) {
				if (isUndefined(sparse[i])) {
					undefinedIndices.push(i)
				}
			}
			
			expect(undefinedIndices).toEqual([0, 2, 4])
		})
	})

	describe("practical usage patterns", () => {
		it("should work in conditional checks", () => {
			const maybeValue: string | undefined = Math.random() > 0.5 ? "value" : undefined
			
			if (isUndefined(maybeValue)) {
				expect(maybeValue).toBe(undefined)
			} else {
				expect(typeof maybeValue).toBe("string")
			}
		})

		it("should work in ternary expressions", () => {
			const maybeValue: number | undefined = Math.random() > 0.5 ? 42 : undefined
			const result = isUndefined(maybeValue) ? "no value" : maybeValue.toString()
			
			if (maybeValue !== undefined) {
				expect(result).toBe("42")
			} else {
				expect(result).toBe("no value")
			}
		})

		it("should work for default value assignment", () => {
			const getValue = (input?: string) => isUndefined(input) ? "default" : input
			
			expect(getValue()).toBe("default")
			expect(getValue(undefined)).toBe("default")
			expect(getValue("custom")).toBe("custom")
			expect(getValue("")).toBe("") // empty string is not undefined
		})

		it("should work in logical OR expressions for defaults", () => {
			const getValue = (input?: string) => !isUndefined(input) ? input : "default"
			
			expect(getValue()).toBe("default")
			expect(getValue(undefined)).toBe("default")
			expect(getValue("custom")).toBe("custom")
		})
	})

	describe("parameter and variable scenarios", () => {
		it("should identify uninitialized variables", () => {
			let uninitializedVar: string | undefined
			expect(isUndefined(uninitializedVar)).toBe(true)
			
			uninitializedVar = "now defined"
			expect(isUndefined(uninitializedVar)).toBe(false)
		})

		it("should identify optional parameters", () => {
			function testOptional(required: string, optional?: number) {
				expect(isUndefined(required)).toBe(false)
				return isUndefined(optional)
			}
			
			expect(testOptional("test")).toBe(true)
			expect(testOptional("test", 42)).toBe(false)
			expect(testOptional("test", undefined)).toBe(true)
		})

		it("should work with function default parameters", () => {
			function withDefaults(param: string | undefined = "default") {
				// param will never be undefined due to default
				return isUndefined(param)
			}
			
			expect(withDefaults()).toBe(false) // gets default value
			expect(withDefaults("custom")).toBe(false)
			// Note: passing undefined explicitly would still use default
		})
	})

	describe("performance characteristics", () => {
		it("should be fast for primitive checks", () => {
			const values = [null, undefined, 0, "", false, true, 42, "hello"]
			
			const start = Date.now()
			for (let i = 0; i < 10000; i++) {
				values.forEach(isUndefined)
			}
			const end = Date.now()
			
			expect(end - start).toBeLessThan(100) // Should be very fast
		})

		it("should handle large arrays efficiently", () => {
			const largeArray = new Array(10000).fill(null).map((_, i) => 
				i % 2 === 0 ? undefined : i
			)
			
			const start = Date.now()
			const undefinedValues = largeArray.filter(isUndefined)
			const end = Date.now()
			
			expect(undefinedValues.length).toBe(5000)
			expect(end - start).toBeLessThan(100) // Should be reasonably fast
		})
	})
})