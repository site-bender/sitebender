import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import * as fc from "fast-check"
import castToBoolean from "../../../castValue/castToBoolean/index.ts"
import castToInteger from "../../../castValue/castToInteger/index.ts"
import castToNumber from "../../../castValue/castToNumber/index.ts"
import castToPercent from "../../../castValue/castToPercent/index.ts"
import castToString from "../../../castValue/castToString/index.ts"

describe("Primitive Type Conversion Behaviors", () => {
	describe("when converting to boolean", () => {
		it("returns boolean unchanged", () => {
			expect(castToBoolean(true)).toEqual({ right: true })
			expect(castToBoolean(false)).toEqual({ right: false })
		})

		it("converts truthy strings to true", () => {
			expect(castToBoolean("true")).toEqual({ right: true })
			expect(castToBoolean("TRUE")).toEqual({ right: true })
			expect(castToBoolean("t")).toEqual({ right: true })
			expect(castToBoolean("T")).toEqual({ right: true })
			expect(castToBoolean("yes")).toEqual({ right: true })
			expect(castToBoolean("YES")).toEqual({ right: true })
		})

		it("converts falsy strings to false", () => {
			expect(castToBoolean("false")).toEqual({ right: false })
			expect(castToBoolean("FALSE")).toEqual({ right: false })
			expect(castToBoolean("f")).toEqual({ right: false })
			expect(castToBoolean("F")).toEqual({ right: false })
			expect(castToBoolean("no")).toEqual({ right: false })
			expect(castToBoolean("NO")).toEqual({ right: false })
		})

		it("handles numeric values", () => {
			expect(castToBoolean(0)).toEqual({ right: false })
			expect(castToBoolean(1)).toEqual({ right: true })
			expect(castToBoolean(-1)).toEqual({ right: true })
			expect(castToBoolean(42)).toEqual({ right: true })
			expect(castToBoolean(0.0)).toEqual({ right: false })
		})

		it("returns error for unparseable values", () => {
			const result = castToBoolean("maybe")
			expect(result.left).toBeDefined()
			expect(result.left?.[0].message).toContain("Cannot cast")
		})

		it("returns error for null and undefined", () => {
			const nullResult = castToBoolean(null)
			expect(nullResult.left).toBeDefined()

			const undefinedResult = castToBoolean(undefined)
			expect(undefinedResult.left).toBeDefined()
		})

		it("returns error for objects and arrays", () => {
			const objResult = castToBoolean({ value: true })
			expect(objResult.left).toBeDefined()

			const arrResult = castToBoolean([true])
			expect(arrResult.left).toBeDefined()
		})
	})

	describe("when converting to integer", () => {
		it("returns integer unchanged", () => {
			expect(castToInteger(42)).toEqual({ right: 42 })
			expect(castToInteger(0)).toEqual({ right: 0 })
			expect(castToInteger(-10)).toEqual({ right: -10 })
		})

		it("parses integer strings", () => {
			expect(castToInteger("42")).toEqual({ right: 42 })
			expect(castToInteger("0")).toEqual({ right: 0 })
			expect(castToInteger("-10")).toEqual({ right: -10 })
			expect(castToInteger("+5")).toEqual({ right: 5 })
		})

		it("truncates decimal numbers", () => {
			expect(castToInteger(3.14)).toEqual({ right: 3 })
			expect(castToInteger(3.99)).toEqual({ right: 3 })
			expect(castToInteger(-3.14)).toEqual({ right: -3 })
		})

		it("parses decimal strings as integers", () => {
			expect(castToInteger("3.14")).toEqual({ right: 3 })
			expect(castToInteger("3.99")).toEqual({ right: 3 })
		})

		it("returns error for non-numeric strings", () => {
			const result = castToInteger("abc")
			expect(result.left).toBeDefined()
			expect(result.left?.[0].message).toContain("Cannot cast")
		})

		it("returns error for NaN and Infinity", () => {
			const nanResult = castToInteger(NaN)
			expect(nanResult.left).toBeDefined()

			const infResult = castToInteger(Infinity)
			expect(infResult.left).toBeDefined()

			const negInfResult = castToInteger(-Infinity)
			expect(negInfResult.left).toBeDefined()
		})

		it("handles edge cases", () => {
			expect(castToInteger("")).toHaveProperty("left")
			expect(castToInteger(null)).toHaveProperty("left")
			expect(castToInteger(undefined)).toHaveProperty("left")
			expect(castToInteger([])).toHaveProperty("left")
			expect(castToInteger({})).toHaveProperty("left")
		})
	})

	describe("when converting to number", () => {
		it("returns number unchanged", () => {
			expect(castToNumber(42)).toEqual({ right: 42 })
			expect(castToNumber(3.14)).toEqual({ right: 3.14 })
			expect(castToNumber(0)).toEqual({ right: 0 })
			expect(castToNumber(-10.5)).toEqual({ right: -10.5 })
		})

		it("parses numeric strings", () => {
			expect(castToNumber("42")).toEqual({ right: 42 })
			expect(castToNumber("3.14")).toEqual({ right: 3.14 })
			expect(castToNumber("-10.5")).toEqual({ right: -10.5 })
			expect(castToNumber("+5.5")).toEqual({ right: 5.5 })
		})

		it("handles scientific notation", () => {
			expect(castToNumber("1e3")).toEqual({ right: 1000 })
			expect(castToNumber("1.5e2")).toEqual({ right: 150 })
			expect(castToNumber("-2e-3")).toEqual({ right: -0.002 })
			expect(castToNumber(1e10)).toEqual({ right: 10000000000 })
		})

		it("handles special numeric values", () => {
			expect(castToNumber("0.0")).toEqual({ right: 0 })
			expect(castToNumber("-0")).toEqual({ right: -0 })
		})

		it("returns error for non-numeric strings", () => {
			const result = castToNumber("not a number")
			expect(result.left).toBeDefined()
			expect(result.left?.[0].message).toContain("Cannot cast")
		})

		it("returns error for NaN", () => {
			const result = castToNumber(NaN)
			expect(result.left).toBeDefined()
		})

		it("returns error for Infinity", () => {
			const infResult = castToNumber(Infinity)
			expect(infResult.left).toBeDefined()

			const negInfResult = castToNumber(-Infinity)
			expect(negInfResult.left).toBeDefined()
		})

		it("handles edge cases", () => {
			expect(castToNumber("")).toHaveProperty("left")
			expect(castToNumber(null)).toHaveProperty("left")
			expect(castToNumber(undefined)).toHaveProperty("left")
			expect(castToNumber(true)).toHaveProperty("left")
			expect(castToNumber(false)).toHaveProperty("left")
		})
	})

	describe("when converting to percent", () => {
		it("converts decimal to percentage", () => {
			expect(castToPercent(0.5)).toEqual({ right: 50 })
			expect(castToPercent(0.25)).toEqual({ right: 25 })
			expect(castToPercent(1)).toEqual({ right: 100 })
			expect(castToPercent(0)).toEqual({ right: 0 })
		})

		it("handles values greater than 1", () => {
			expect(castToPercent(1.5)).toEqual({ right: 150 })
			expect(castToPercent(2)).toEqual({ right: 200 })
		})

		it("handles negative values", () => {
			expect(castToPercent(-0.5)).toEqual({ right: -50 })
			expect(castToPercent(-1)).toEqual({ right: -100 })
		})

		it("parses percentage strings", () => {
			expect(castToPercent("50%")).toEqual({ right: 50 })
			expect(castToPercent("25%")).toEqual({ right: 25 })
			expect(castToPercent("100%")).toEqual({ right: 100 })
			expect(castToPercent("0%")).toEqual({ right: 0 })
		})

		it("parses decimal strings as percentages", () => {
			expect(castToPercent("0.5")).toEqual({ right: 50 })
			expect(castToPercent("0.25")).toEqual({ right: 25 })
			expect(castToPercent("1.0")).toEqual({ right: 100 })
		})

		it("handles percentage strings with decimals", () => {
			expect(castToPercent("33.33%")).toEqual({ right: 33.33 })
			expect(castToPercent("66.67%")).toEqual({ right: 66.67 })
		})

		it("returns error for non-numeric values", () => {
			const result = castToPercent("not a percent")
			expect(result.left).toBeDefined()
		})

		it("returns error for NaN and Infinity", () => {
			expect(castToPercent(NaN)).toHaveProperty("left")
			expect(castToPercent(Infinity)).toHaveProperty("left")
			expect(castToPercent(-Infinity)).toHaveProperty("left")
		})

		it("handles edge cases", () => {
			expect(castToPercent("")).toHaveProperty("left")
			expect(castToPercent(null)).toHaveProperty("left")
			expect(castToPercent(undefined)).toHaveProperty("left")
			expect(castToPercent({})).toHaveProperty("left")
		})
	})

	describe("when converting to string", () => {
		it("returns string unchanged", () => {
			expect(castToString("hello")).toEqual({ right: "hello" })
			expect(castToString("")).toEqual({ right: "" })
			expect(castToString("123")).toEqual({ right: "123" })
		})

		it("converts numbers to strings", () => {
			expect(castToString(42)).toEqual({ right: "42" })
			expect(castToString(3.14)).toEqual({ right: "3.14" })
			expect(castToString(0)).toEqual({ right: "0" })
			expect(castToString(-10)).toEqual({ right: "-10" })
		})

		it("converts booleans to strings", () => {
			expect(castToString(true)).toEqual({ right: "true" })
			expect(castToString(false)).toEqual({ right: "false" })
		})

		it("handles special numeric values", () => {
			expect(castToString(NaN)).toEqual({ right: "NaN" })
			expect(castToString(Infinity)).toEqual({ right: "Infinity" })
			expect(castToString(-Infinity)).toEqual({ right: "-Infinity" })
		})

		it("converts null and undefined to strings", () => {
			expect(castToString(null)).toEqual({ right: "null" })
			expect(castToString(undefined)).toEqual({
				left: [
					{
						message: "Cannot cast undefined to a string.",
						operation: "castToString",
						tag: "Error",
						type: "String",
					},
				],
			})
		})

		it("converts objects to JSON strings", () => {
			const obj = { name: "test", value: 42 }
			const result = castToString(obj)
			expect(result).toEqual({ right: JSON.stringify(obj) })
		})

		it("converts objects to JSON strings", () => {
			const obj = { name: "test", value: 42 }
			const result = castToString(obj)
			expect(result).toEqual({ right: JSON.stringify(obj) })
		})

		it("converts arrays to JSON strings", () => {
			const arr = [1, 2, 3]
			const result = castToString(arr)
			expect(result).toEqual({ right: JSON.stringify(arr) })
		})

		it("handles empty objects and arrays", () => {
			expect(castToString({})).toEqual({ right: "{}" })
			expect(castToString([])).toEqual({ right: "[]" })
		})

		it("preserves string with special characters", () => {
			expect(castToString("line\nbreak")).toEqual({ right: "line\nbreak" })
			expect(castToString("tab\there")).toEqual({ right: "tab\there" })
			expect(castToString("quote\"here")).toEqual({ right: "quote\"here" })
		})
	})

	describe("property-based tests", () => {
		describe("boolean conversion properties", () => {
			it("castToBoolean is idempotent for booleans", () => {
				fc.assert(fc.property(
					fc.boolean(),
					(bool) => {
						const result = castToBoolean(bool)
						expect(result.right).toBe(bool)
					}
				))
			})

			it("castToBoolean preserves truthiness for numbers", () => {
				fc.assert(fc.property(
					fc.integer(),
					(num) => {
						const result = castToBoolean(num)

						if (num === 0) {
							expect(result.right).toBe(false)
						} else {
							expect(result.right).toBe(true)
						}
					}
				))
			})

			it("castToBoolean round-trip with strings", () => {
				fc.assert(fc.property(
					fc.boolean(),
					(bool) => {
						const asString = String(bool)
						const backToBoolean = castToBoolean(asString)
						expect(backToBoolean.right).toBe(bool)
					}
				))
			})
		})

		describe("integer conversion properties", () => {
			it("castToInteger is idempotent for integers", () => {
				fc.assert(fc.property(
					fc.integer(),
					(int) => {
						const result = castToInteger(int)
						expect(result.right).toBe(int)
					}
				))
			})

			it("castToInteger truncates decimals", () => {
				fc.assert(fc.property(
					fc.float({ min: -1000, max: 1000 }),
					(float) => {
						fc.pre(!Number.isNaN(float) && Number.isFinite(float))
						const result = castToInteger(float)
						expect(result.right).toBe(Math.trunc(float))
					}
				))
			})

			it("castToInteger preserves sign", () => {
				fc.assert(fc.property(
					fc.float({ min: -1000, max: 1000 }),
					(float) => {
						fc.pre(!Number.isNaN(float) && Number.isFinite(float) && float !== 0)
						const result = castToInteger(float)
						const originalSign = Math.sign(float)
						const resultSign = Math.sign(result.right!)
						expect(resultSign).toBe(originalSign)
					}
				))
			})

			it("castToInteger round-trip with string", () => {
				fc.assert(fc.property(
					fc.integer(),
					(int) => {
						const asString = String(int)
						const backToInt = castToInteger(asString)
						expect(backToInt.right).toBe(int)
					}
				))
			})
		})

		describe("number conversion properties", () => {
			it("castToNumber is idempotent for finite numbers", () => {
				fc.assert(fc.property(
					fc.float({ min: -Number.MAX_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER }),
					(num) => {
						fc.pre(Number.isFinite(num))
						const result = castToNumber(num)
						expect(result.right).toBe(num)
					}
				))
			})

			it("castToNumber preserves integer values", () => {
				fc.assert(fc.property(
					fc.integer(),
					(int) => {
						const result = castToNumber(int)
						expect(result.right).toBe(int)
					}
				))
			})

			it("castToNumber round-trip with string", () => {
				fc.assert(fc.property(
					fc.float({ min: -1000, max: 1000 }),
					(num) => {
						fc.pre(Number.isFinite(num))
						const asString = String(num)
						const backToNum = castToNumber(asString)
						// Account for floating point precision
						expect(Math.abs(backToNum.right! - num)).toBeLessThan(1e-10)
					}
				))
			})
		})

		describe("percent conversion properties", () => {
			it("castToPercent multiplication by 100", () => {
				fc.assert(fc.property(
					fc.float({ min: 0, max: 10 }),
					(decimal) => {
						fc.pre(Number.isFinite(decimal))
						const result = castToPercent(decimal)
						expect(result.right).toBe(decimal * 100)
					}
				))
			})

			it("castToPercent round-trip with decimal", () => {
				fc.assert(fc.property(
					fc.float({ min: 0, max: 1 }),
					(decimal) => {
						fc.pre(Number.isFinite(decimal))
						const asPercent = castToPercent(decimal)
						const backToDecimal = asPercent.right! / 100
						expect(Math.abs(backToDecimal - decimal)).toBeLessThan(1e-10)
					}
				))
			})

			it("castToPercent preserves sign", () => {
				fc.assert(fc.property(
					fc.float({ min: -5, max: 5 }),
					(decimal) => {
						fc.pre(Number.isFinite(decimal) && decimal !== 0)
						const result = castToPercent(decimal)
						const originalSign = Math.sign(decimal)
						const resultSign = Math.sign(result.right!)
						expect(resultSign).toBe(originalSign)
					}
				))
			})
		})

		describe("string conversion properties", () => {
			it("castToString is idempotent for strings", () => {
				fc.assert(fc.property(
					fc.string(),
					(str) => {
						const result = castToString(str)
						expect(result.right).toBe(str)
					}
				))
			})

			it("castToString preserves string length", () => {
				fc.assert(fc.property(
					fc.string(),
					(str) => {
						const result = castToString(str)
						expect(result.right!.length).toBe(str.length)
					}
				))
			})

			it("castToString round-trip with numbers", () => {
				fc.assert(fc.property(
					fc.integer(),
					(int) => {
						const asString = castToString(int)
						const backToNumber = Number(asString.right!)
						expect(backToNumber).toBe(int)
					}
				))
			})

			it("castToString round-trip with booleans", () => {
				fc.assert(fc.property(
					fc.boolean(),
					(bool) => {
						const asString = castToString(bool)
						const backToBoolean = asString.right === "true"
						expect(backToBoolean).toBe(bool)
					}
				))
			})
		})

		describe("error handling properties", () => {
			it("invalid inputs return Left results", () => {
				fc.assert(fc.property(
					fc.oneof(
						fc.constant(null),
						fc.constant(undefined),
						fc.object(),
						fc.array(fc.anything())
					),
					(invalidInput) => {
						const boolResult = castToBoolean(invalidInput)
						const intResult = castToInteger(invalidInput)
						const numResult = castToNumber(invalidInput)
						const percentResult = castToPercent(invalidInput)

						if (invalidInput === null || invalidInput === undefined ||
							typeof invalidInput === "object") {
							expect(boolResult.left).toBeDefined()
							expect(intResult.left).toBeDefined()
							expect(numResult.left).toBeDefined()
							expect(percentResult.left).toBeDefined()
						}
					}
				))
			})

			it("NaN and Infinity are handled consistently", () => {
				fc.assert(fc.property(
					fc.oneof(
						fc.constant(NaN),
						fc.constant(Infinity),
						fc.constant(-Infinity)
					),
					(specialValue) => {
						const intResult = castToInteger(specialValue)
						const numResult = castToNumber(specialValue)
						const percentResult = castToPercent(specialValue)

						expect(intResult.left).toBeDefined()
						expect(numResult.left).toBeDefined()
						expect(percentResult.left).toBeDefined()
					}
				))
			})
		})

		describe("consistency properties", () => {
			it("successful conversions always return Right", () => {
				fc.assert(fc.property(
					fc.oneof(
						fc.boolean(),
						fc.integer(),
						fc.float({ min: -1000, max: 1000 }),
						fc.string()
					),
					(validInput) => {
						const stringResult = castToString(validInput)
						expect(stringResult.right).toBeDefined()
						expect(stringResult.left).toBeUndefined()
					}
				))
			})

			it("type preservation through valid conversions", () => {
				fc.assert(fc.property(
					fc.integer(),
					(int) => {
						const boolResult = castToBoolean(int)
						const numResult = castToNumber(int)
						const stringResult = castToString(int)

						expect(typeof boolResult.right).toBe("boolean")
						expect(typeof numResult.right).toBe("number")
						expect(typeof stringResult.right).toBe("string")
					}
				))
			})
		})

		describe("mathematical properties", () => {
			it("castToInteger(castToNumber(x)) equals castToInteger(x) for valid inputs", () => {
				fc.assert(fc.property(
					fc.integer(),
					(int) => {
						const directInt = castToInteger(int)
						const throughNumber = castToInteger(castToNumber(int).right!)

						expect(directInt.right).toBe(throughNumber.right)
					}
				))
			})

			it("castToPercent(x/100) equals x for valid percentages", () => {
				fc.assert(fc.property(
					fc.float({ min: 0, max: 100 }),
					(percent) => {
						fc.pre(Number.isFinite(percent))
						const asDecimal = percent / 100
						const backToPercent = castToPercent(asDecimal)
						expect(Math.abs(backToPercent.right! - percent)).toBeLessThan(1e-10)
					}
				))
			})
		})
	})
})
