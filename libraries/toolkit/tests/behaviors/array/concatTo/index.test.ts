import { assertEquals } from "jsr:@std/assert@1.0.10"
import { describe, it } from "jsr:@std/testing@1.0.9/bdd"
import * as fc from "npm:fast-check@3"

import concatTo from "../../../../src/simple/array/concatTo/index.ts"

describe("concatTo", () => {
	describe("basic functionality", () => {
		it("should concatenate arrays in the correct order", () => {
			const result = concatTo([3, 4])([1, 2])
			assertEquals(result, [1, 2, 3, 4])
		})

		it("should handle empty toAppend array", () => {
			const result = concatTo<number>([])([1, 2, 3])
			assertEquals(result, [1, 2, 3])
		})

		it("should handle empty base array", () => {
			const result = concatTo([3, 4])([])
			assertEquals(result, [3, 4])
		})

		it("should handle both arrays empty", () => {
			const result = concatTo<any>([])([])
			assertEquals(result, [])
		})

		it("should handle single element arrays", () => {
			const result = concatTo([2])([1])
			assertEquals(result, [1, 2])
		})

		it("should handle string arrays", () => {
			const result = concatTo(["c", "d"])(["a", "b"])
			assertEquals(result, ["a", "b", "c", "d"])
		})

		it("should handle mixed type arrays", () => {
			const result = concatTo<string | number | boolean | null>([3, "d", null])(
				["a", 2, true],
			)
			assertEquals(result, ["a", 2, true, 3, "d", null])
		})

		it("should handle arrays with undefined", () => {
			const result = concatTo<string | number | undefined>([undefined, 2])([
				"a",
				undefined,
			])
			assertEquals(result, ["a", undefined, undefined, 2])
		})

		it("should handle arrays with null", () => {
			const result = concatTo([null, 2])([1, null])
			assertEquals(result, [1, null, null, 2])
		})

		it("should handle arrays with objects", () => {
			const obj1 = { a: 1 }
			const obj2 = { b: 2 }
			const result = concatTo<{ a?: number; b?: number }>([obj2])([obj1])
			assertEquals(result, [obj1, obj2])
		})

		it("should handle nested arrays", () => {
			const result = concatTo([[3, 4], [5]])([[1], [2]])
			assertEquals(result, [[1], [2], [3, 4], [5]])
		})

		it("should handle arrays with NaN", () => {
			const result = concatTo([NaN, 2])([1, NaN])
			assertEquals(result.length, 4)
			assertEquals(result[0], 1)
			assertEquals(Number.isNaN(result[1]), true)
			assertEquals(Number.isNaN(result[2]), true)
			assertEquals(result[3], 2)
		})

		it("should handle arrays with Infinity", () => {
			const result = concatTo([Infinity, -Infinity])([0, Infinity])
			assertEquals(result, [0, Infinity, Infinity, -Infinity])
		})
	})

	describe("partial application", () => {
		it("should support partial application for suffixing", () => {
			const appendSuffix = concatTo([99, 100])
			assertEquals(appendSuffix([1, 2, 3]), [1, 2, 3, 99, 100])
			assertEquals(appendSuffix([4, 5]), [4, 5, 99, 100])
			assertEquals(appendSuffix([]), [99, 100])
		})

		it("should support adding standard endings", () => {
			const addSentinel = concatTo([-1])
			assertEquals(addSentinel([1, 2, 3]), [1, 2, 3, -1])
			assertEquals(addSentinel([]), [-1])
			assertEquals(addSentinel([0]), [0, -1])
		})

		it("should create reusable suffix functions", () => {
			const addEllipsis = concatTo(["..."])
			assertEquals(addEllipsis(["Hello", "World"]), ["Hello", "World", "..."])
			assertEquals(addEllipsis(["a"]), ["a", "..."])
		})

		it("should work with different types via partial application", () => {
			const addNumbers = concatTo([4, 5, 6])
			const addStrings = concatTo(["d", "e", "f"])
			const addBooleans = concatTo([true, false])

			assertEquals(addNumbers([1, 2, 3]), [1, 2, 3, 4, 5, 6])
			assertEquals(addStrings(["a", "b", "c"]), ["a", "b", "c", "d", "e", "f"])
			assertEquals(addBooleans([false, true]), [false, true, true, false])
		})
	})

	describe("immutability", () => {
		it("should not modify the original arrays", () => {
			const toAppend = [3, 4]
			const baseArray = [1, 2]
			const result = concatTo(toAppend)(baseArray)

			assertEquals(baseArray, [1, 2])
			assertEquals(toAppend, [3, 4])
			assertEquals(result, [1, 2, 3, 4])
		})

		it("should create a new array instance", () => {
			const toAppend = [2]
			const baseArray = [1]
			const result = concatTo(toAppend)(baseArray)

			assertEquals(result !== baseArray, true)
			assertEquals(result !== toAppend, true)
		})
	})

	describe("property-based tests", () => {
		it("should preserve total length", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.array(fc.anything()),
					(toAppend, baseArray) => {
						const result = concatTo(toAppend)(baseArray)
						assertEquals(result.length, baseArray.length + toAppend.length)
					},
				),
			)
		})

		it("should preserve element order", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					(toAppend, baseArray) => {
						const result = concatTo(toAppend)(baseArray)

						// Check baseArray elements come first
						for (let i = 0; i < baseArray.length; i++) {
							assertEquals(result[i], baseArray[i])
						}

						// Check toAppend elements come after
						for (let i = 0; i < toAppend.length; i++) {
							assertEquals(result[baseArray.length + i], toAppend[i])
						}
					},
				),
			)
		})

		it("should be the reverse of concat", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.array(fc.anything()),
					(a, b) => {
						// concat: a.concat(b) => [...a, ...b]
						// concatTo: concatTo(b)(a) => [...a, ...b]
						const concatResult = a.concat(b)
						const concatToResult = concatTo(b)(a)
						assertEquals(concatToResult, concatResult)
					},
				),
			)
		})

		it("should handle identity: concatTo([])", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					(arr) => {
						const result = concatTo<unknown>([])(arr)
						assertEquals(result, arr)
					},
				),
			)
		})

		it("should handle sparse arrays correctly", () => {
			const sparse1 = new Array(3)
			sparse1[1] = "a"
			const sparse2 = new Array(2)
			sparse2[0] = "b"

			const result = concatTo(sparse2)(sparse1)
			assertEquals(result.length, 5)
			assertEquals(result[0], undefined)
			assertEquals(result[1], "a")
			assertEquals(result[2], undefined)
			assertEquals(result[3], "b")
			assertEquals(result[4], undefined)
		})
	})

	describe("practical use cases", () => {
		it("should append file extensions", () => {
			const addExtensions = concatTo([".js", ".ts", ".tsx"])
			const baseFiles = ["index", "App", "utils"]
			const result = addExtensions(baseFiles)
			assertEquals(result, ["index", "App", "utils", ".js", ".ts", ".tsx"])
		})

		it("should add footer items to lists", () => {
			const addFooter = concatTo(["---", "Total", "Summary"])
			const dataRows = ["Row1", "Row2", "Row3"]
			assertEquals(addFooter(dataRows), [
				"Row1",
				"Row2",
				"Row3",
				"---",
				"Total",
				"Summary",
			])
		})

		it("should append default options", () => {
			const addDefaults = concatTo(["Other", "None", "All"])
			const userOptions = ["Option1", "Option2"]
			assertEquals(addDefaults(userOptions), [
				"Option1",
				"Option2",
				"Other",
				"None",
				"All",
			])
		})

		it("should work in function composition", () => {
			const appendSuffix = concatTo([4, 5])
			const processArray = (arr: Array<number>) => arr.map((x) => x * 2)

			const pipeline = (arr: Array<number>) => processArray(appendSuffix(arr))
			assertEquals(pipeline([1, 2, 3]), [2, 4, 6, 8, 10])
		})
	})

	describe("type safety", () => {
		it("should maintain type safety with generics", () => {
			const appendNumbers = concatTo([3, 4])
			const numberResult: Array<number> = appendNumbers([1, 2])
			assertEquals(numberResult, [1, 2, 3, 4])

			const appendStrings = concatTo(["c", "d"])
			const stringResult: Array<string> = appendStrings(["a", "b"])
			assertEquals(stringResult, ["a", "b", "c", "d"])
		})

		it("should work with union types", () => {
			const appendMixed = concatTo<string | number>([3, "d"])
			const result = appendMixed(["a", 2])
			assertEquals(result, ["a", 2, 3, "d"])
		})
	})

	describe("edge cases", () => {
		it("should handle very large arrays", () => {
			const largeAppend = new Array(1000).fill(1)
			const largeBase = new Array(1000).fill(0)
			const result = concatTo(largeAppend)(largeBase)
			assertEquals(result.length, 2000)
			assertEquals(result[0], 0)
			assertEquals(result[999], 0)
			assertEquals(result[1000], 1)
			assertEquals(result[1999], 1)
		})

		it("should handle arrays with symbols", () => {
			const sym1 = Symbol("a")
			const sym2 = Symbol("b")
			const result = concatTo([sym2])([sym1])
			assertEquals(result, [sym1, sym2])
		})

		it("should handle arrays with functions", () => {
			const fn1 = () => 1
			const fn2 = () => 2
			const result = concatTo([fn2])([fn1])
			assertEquals(result[0], fn1)
			assertEquals(result[1], fn2)
		})
	})
})
