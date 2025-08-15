import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import fc from "fast-check"

// Import all replacing functions
import replaceAll from "../../../array/replaceAll/index.ts"
import replaceAt from "../../../array/replaceAt/index.ts"
import replaceFirst from "../../../array/replaceFirst/index.ts"
import replaceLast from "../../../array/replaceLast/index.ts"
import replaceFirstMatch from "../../../array/replaceFirstMatch/index.ts"
import replaceLastMatch from "../../../array/replaceLastMatch/index.ts"
import replaceAllMatches from "../../../array/replaceAllMatches/index.ts"

describe("Array Replacing Operations", () => {
	describe("Behavioral Properties", () => {
		describe("replaceAll", () => {
			it("returns original array when target not found", () => {
				expect(replaceAll(5)((n) => n * 2)([1, 2, 3])).toEqual([1, 2, 3])
				expect(replaceAll("x")((s) => s.toUpperCase())(["a", "b", "c"])).toEqual(["a", "b", "c"])
			})

			it("replaces all occurrences of target", () => {
				expect(replaceAll(2)((n) => n * 10)([1, 2, 3, 2, 4])).toEqual([1, 20, 3, 20, 4])
				expect(replaceAll("a")((s) => "X")(["a", "b", "a", "c", "a"])).toEqual(["X", "b", "X", "c", "X"])
			})

			it("replaces single occurrence", () => {
				expect(replaceAll(3)((n) => n * 2)([1, 2, 3, 4])).toEqual([1, 2, 6, 4])
				expect(replaceAll("test")(() => "found")(["hello", "test", "world"])).toEqual(["hello", "found", "world"])
			})

			it("uses strict equality", () => {
				const mixed1: Array<string | number> = [2, "2", 2]
				const replacer1 = replaceAll<string | number>("2")
				expect(replacer1((item) => "X")(mixed1)).toEqual([2, "X", 2])
				
				const mixed2: Array<number | boolean | string | null> = [false, 0, "", null]
				const replacer2 = replaceAll<number | boolean | string | null>(0)
				expect(replacer2((item) => 99)(mixed2)).toEqual([false, 99, "", null])
			})

			it("handles special values", () => {
				const mixed1: Array<null | number | string> = [null, 1, null]
				const replacer1 = replaceAll<null | number | string>(null)
				expect(replacer1((item) => "replaced")(mixed1)).toEqual(["replaced", 1, "replaced"])
				
				const mixed2: Array<undefined | null | string> = [undefined, null, undefined]
				const replacer2 = replaceAll<undefined | null | string>(undefined)
				expect(replacer2((item) => "found")(mixed2)).toEqual(["found", null, "found"])
				
				// NaN doesn't work with === comparison
				expect(replaceAll(NaN)(() => 0)([1, NaN, 3])).toEqual([1, NaN, 3])
			})

			it("replacer function receives matched item", () => {
				const doubler = (n: number) => n * 2
				expect(replaceAll(5)(doubler)([1, 5, 3, 5])).toEqual([1, 10, 3, 10])
				
				const capitalizer = (s: string) => s.toUpperCase()
				expect(replaceAll("hi")(capitalizer)(["hi", "bye", "hi"])).toEqual(["HI", "bye", "HI"])
			})

			it("property: replaceAll with non-existent target returns same array", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer({ min: 0, max: 100 })),
						(arr) => {
							expect(replaceAll(-1)((n) => n * 2)(arr)).toEqual(arr)
						}
					)
				)
			})

			it("property: all occurrences are replaced", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer({ min: 0, max: 10 })),
						fc.integer({ min: 0, max: 10 }),
						(arr, target) => {
							const result = replaceAll(target)(() => 999)(arr)
							expect(result.includes(target)).toBe(false)
							const targetCount = arr.filter(x => x === target).length
							const replacedCount = result.filter(x => x === 999).length - arr.filter(x => x === 999).length
							expect(replacedCount).toBe(targetCount)
						}
					)
				)
			})

			it("preserves original array", () => {
				const original = [1, 2, 3, 2, 4]
				const copy = [...original]
				replaceAll(2)((n) => n * 10)(original)
				expect(original).toEqual(copy)
			})
		})

		describe("replaceAt", () => {
			it("returns original array for out-of-bounds index", () => {
				expect(replaceAt(5)<number>((n) => n * 2)([1, 2, 3])).toEqual([1, 2, 3])
				expect(replaceAt(-1)<number>((n) => n * 2)([1, 2, 3])).toEqual([1, 2, 3])
				expect(replaceAt(10)<string>((s) => s.toUpperCase())(["a", "b"])).toEqual(["a", "b"])
			})

			it("replaces element at specified index", () => {
				expect(replaceAt(0)<number>((n) => n * 2)([1, 2, 3])).toEqual([2, 2, 3])
				expect(replaceAt(1)<number>((n) => n * 2)([1, 2, 3])).toEqual([1, 4, 3])
				expect(replaceAt(2)<number>((n) => n * 2)([1, 2, 3])).toEqual([1, 2, 6])
			})

			it("replacer receives current value", () => {
				expect(replaceAt(1)((n: number) => n + 10)([1, 2, 3])).toEqual([1, 12, 3])
				expect(replaceAt(0)((s: string) => s + "!")((["hello", "world"]))).toEqual(["hello!", "world"])
			})

			it("handles different types", () => {
				const nums: Array<number | null> = [1, 2, 3]
				expect(replaceAt(1)<number | null>(() => null)(nums)).toEqual([1, null, 3])
				const bools: Array<boolean | undefined> = [true, false]
				expect(replaceAt(0)<boolean | undefined>(() => undefined)(bools)).toEqual([undefined, false])
			})

			it("property: replaceAt preserves array length", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer()),
						fc.integer({ min: -5, max: 20 }),
						(arr, index) => {
							const result = replaceAt(index)<number>((n) => n * 2)(arr)
							expect(result.length).toBe(arr.length)
						}
					)
				)
			})

			it("property: only element at index changes", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer(), { minLength: 1 }),
						(arr) => {
							const index = Math.floor(Math.random() * arr.length)
							const result = replaceAt(index)<number>(() => 999)(arr)
							// Check all other elements unchanged
							for (let i = 0; i < arr.length; i++) {
								if (i !== index) {
									expect(result[i]).toBe(arr[i])
								} else {
									expect(result[i]).toBe(999)
								}
							}
						}
					)
				)
			})

			it("preserves original array", () => {
				const original = [1, 2, 3, 4]
				const copy = [...original]
				replaceAt(2)<number>((n) => n * 10)(original)
				expect(original).toEqual(copy)
			})
		})

		describe("replaceFirst", () => {
			it("returns original array when target not found", () => {
				expect(replaceFirst(5)((n) => n * 2)([1, 2, 3])).toEqual([1, 2, 3])
				expect(replaceFirst("x")((s) => s.toUpperCase())(["a", "b", "c"])).toEqual(["a", "b", "c"])
			})

			it("replaces only first occurrence", () => {
				expect(replaceFirst(2)((n) => n * 10)([1, 2, 3, 2, 4])).toEqual([1, 20, 3, 2, 4])
				expect(replaceFirst("a")(() => "X")(["a", "b", "a", "c", "a"])).toEqual(["X", "b", "a", "c", "a"])
			})

			it("replaces single occurrence", () => {
				expect(replaceFirst(3)((n) => n * 2)([1, 2, 3, 4])).toEqual([1, 2, 6, 4])
				expect(replaceFirst("test")(() => "found")(["hello", "test", "world"])).toEqual(["hello", "found", "world"])
			})

			it("uses strict equality", () => {
				const mixed1: Array<string | number> = [2, "2", 2, "2"]
				const replacer1 = replaceFirst<string | number>("2")
				expect(replacer1(() => "X")(mixed1)).toEqual([2, "X", 2, "2"])
				
				const mixed2: Array<number | boolean> = [false, 0, 0]
				const replacer2 = replaceFirst<number | boolean>(0)
				expect(replacer2(() => 99)(mixed2)).toEqual([false, 99, 0])
			})

			it("handles special values", () => {
				const mixed1: Array<null | number | string> = [null, 1, null]
				const replacer1 = replaceFirst<null | number | string>(null)
				expect(replacer1(() => "replaced")(mixed1)).toEqual(["replaced", 1, null])
				
				const mixed2: Array<undefined | null | string> = [undefined, null, undefined]
				const replacer2 = replaceFirst<undefined | null | string>(undefined)
				expect(replacer2(() => "found")(mixed2)).toEqual(["found", null, undefined])
			})

			it("property: replaces at most one occurrence", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer({ min: 0, max: 10 })),
						fc.integer({ min: 0, max: 10 }),
						(arr, target) => {
							const result = replaceFirst(target)(() => 999)(arr)
							const originalCount = arr.filter(x => x === target).length
							const resultCount = result.filter(x => x === target).length
							if (originalCount > 0) {
								expect(resultCount).toBe(originalCount - 1)
							} else {
								expect(resultCount).toBe(0)
							}
						}
					)
				)
			})

			it("preserves original array", () => {
				const original = [1, 2, 3, 2, 4]
				const copy = [...original]
				replaceFirst(2)((n) => n * 10)(original)
				expect(original).toEqual(copy)
			})
		})

		describe("replaceLast", () => {
			it("returns original array when target not found", () => {
				expect(replaceLast(5)((n) => n * 2)([1, 2, 3])).toEqual([1, 2, 3])
				expect(replaceLast("x")((s) => s.toUpperCase())(["a", "b", "c"])).toEqual(["a", "b", "c"])
			})

			it("replaces only last occurrence", () => {
				expect(replaceLast(2)((n) => n * 10)([1, 2, 3, 2, 4])).toEqual([1, 2, 3, 20, 4])
				expect(replaceLast("a")(() => "X")(["a", "b", "a", "c", "a"])).toEqual(["a", "b", "a", "c", "X"])
			})

			it("replaces single occurrence", () => {
				expect(replaceLast(3)((n) => n * 2)([1, 2, 3, 4])).toEqual([1, 2, 6, 4])
				expect(replaceLast("test")(() => "found")(["hello", "test", "world"])).toEqual(["hello", "found", "world"])
			})

			it("uses strict equality", () => {
				const mixed1: Array<string | number> = [2, "2", 2, "2"]
				const replacer1 = replaceLast<string | number>("2")
				expect(replacer1(() => "X")(mixed1)).toEqual([2, "2", 2, "X"])
				
				const mixed2: Array<number | boolean> = [false, 0, 0]
				const replacer2 = replaceLast<number | boolean>(0)
				expect(replacer2(() => 99)(mixed2)).toEqual([false, 0, 99])
			})

			it("handles special values", () => {
				const mixed1: Array<null | number | string> = [null, 1, null]
				const replacer1 = replaceLast<null | number | string>(null)
				expect(replacer1(() => "replaced")(mixed1)).toEqual([null, 1, "replaced"])
				
				const mixed2: Array<undefined | null | string> = [undefined, null, undefined]
				const replacer2 = replaceLast<undefined | null | string>(undefined)
				expect(replacer2(() => "found")(mixed2)).toEqual([undefined, null, "found"])
			})

			it("property: replaces at most one occurrence from end", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer({ min: 0, max: 10 })),
						fc.integer({ min: 0, max: 10 }),
						(arr, target) => {
							const result = replaceLast(target)(() => 999)(arr)
							const originalCount = arr.filter(x => x === target).length
							const resultCount = result.filter(x => x === target).length
							if (originalCount > 0) {
								expect(resultCount).toBe(originalCount - 1)
								// Check it was the last one replaced
								const lastIndex = arr.lastIndexOf(target)
								if (lastIndex >= 0) {
									expect(result[lastIndex]).toBe(999)
								}
							} else {
								expect(resultCount).toBe(0)
							}
						}
					)
				)
			})

			it("preserves original array", () => {
				const original = [1, 2, 3, 2, 4]
				const copy = [...original]
				replaceLast(2)((n) => n * 10)(original)
				expect(original).toEqual(copy)
			})
		})

		describe("replaceFirstMatch", () => {
			it("returns original array when no match found", () => {
				expect(replaceFirstMatch(/xyz/)((s) => s.toUpperCase())(["abc", "def"])).toEqual(["abc", "def"])
				expect(replaceFirstMatch(/^z/)(() => "found")(["apple", "banana"])).toEqual(["apple", "banana"])
			})

			it("replaces only first matching string", () => {
				expect(replaceFirstMatch(/^h/)((s) => s.toUpperCase())(["hello", "hi", "world"])).toEqual(["HELLO", "hi", "world"])
				expect(replaceFirstMatch(/test/)(() => "replaced")(["test1", "test2", "other"])).toEqual(["replaced", "test2", "other"])
			})

			it("handles pattern matching", () => {
				expect(replaceFirstMatch(/\d+/)((s) => "NUM")(["abc", "123", "456"])).toEqual(["abc", "NUM", "456"])
				expect(replaceFirstMatch(/^[A-Z]/)((s) => s.toLowerCase())(["Hello", "World", "Test"])).toEqual(["hello", "World", "Test"])
			})

			it("replacer receives matched string", () => {
				expect(replaceFirstMatch(/test\d/)((s) => s.toUpperCase())(["test1", "test2"])).toEqual(["TEST1", "test2"])
				expect(replaceFirstMatch(/\w+/)((s) => `[${s}]`)(["hello", "world"])).toEqual(["[hello]", "world"])
			})

			it("property: replaces at most one match", () => {
				fc.assert(
					fc.property(
						fc.array(fc.string()),
						(arr) => {
							const result = replaceFirstMatch(/a/)(() => "X")(arr)
							const originalMatches = arr.filter(s => /a/.test(s)).length
							const resultMatches = result.filter(s => /a/.test(s)).length
							if (originalMatches > 0) {
								expect(resultMatches).toBe(originalMatches - 1)
							} else {
								expect(result).toEqual(arr)
							}
						}
					)
				)
			})

			it("preserves original array", () => {
				const original = ["test1", "test2", "test3"]
				const copy = [...original]
				replaceFirstMatch(/test/)((s) => s.toUpperCase())(original)
				expect(original).toEqual(copy)
			})
		})

		describe("replaceLastMatch", () => {
			it("returns original array when no match found", () => {
				expect(replaceLastMatch(/xyz/)((s) => s.toUpperCase())(["abc", "def"])).toEqual(["abc", "def"])
				expect(replaceLastMatch(/^z/)(() => "found")(["apple", "banana"])).toEqual(["apple", "banana"])
			})

			it("replaces only last matching string", () => {
				expect(replaceLastMatch(/^h/)((s) => s.toUpperCase())(["hello", "hi", "world"])).toEqual(["hello", "HI", "world"])
				expect(replaceLastMatch(/test/)(() => "replaced")(["test1", "test2", "other"])).toEqual(["test1", "replaced", "other"])
			})

			it("handles string patterns", () => {
				expect(replaceLastMatch("abc")(() => "found")(["abc", "def", "abc"])).toEqual(["abc", "def", "found"])
				expect(replaceLastMatch("test")((s) => s.toUpperCase())(["test", "other", "test"])).toEqual(["test", "other", "TEST"])
			})

			it("handles regex patterns", () => {
				expect(replaceLastMatch(/\d+/)((s) => "NUM")(["abc", "123", "456"])).toEqual(["abc", "123", "NUM"])
				expect(replaceLastMatch(/^[A-Z]/)((s) => s.toLowerCase())(["Hello", "World", "Test"])).toEqual(["Hello", "World", "test"])
			})

			it("replacer receives matched string", () => {
				expect(replaceLastMatch(/test\d/)((s) => s.toUpperCase())(["test1", "test2"])).toEqual(["test1", "TEST2"])
				expect(replaceLastMatch(/\w+/)((s) => `[${s}]`)(["hello", "world"])).toEqual(["hello", "[world]"])
			})

			it("property: replaces at most one match from end", () => {
				fc.assert(
					fc.property(
						fc.array(fc.string()),
						(arr) => {
							const result = replaceLastMatch(/a/)(() => "X")(arr)
							const originalMatches = arr.filter(s => /a/.test(s)).length
							const resultMatches = result.filter(s => /a/.test(s)).length
							if (originalMatches > 0) {
								expect(resultMatches).toBe(originalMatches - 1)
							} else {
								expect(result).toEqual(arr)
							}
						}
					)
				)
			})

			it("preserves original array", () => {
				const original = ["test1", "test2", "test3"]
				const copy = [...original]
				replaceLastMatch(/test/)((s) => s.toUpperCase())(original)
				expect(original).toEqual(copy)
			})
		})

		describe("replaceAllMatches", () => {
			it("returns original array when no matches found", () => {
				expect(replaceAllMatches(/xyz/)((s) => s.toUpperCase())(["abc", "def"])).toEqual(["abc", "def"])
				expect(replaceAllMatches(/^z/)(() => "found")(["apple", "banana"])).toEqual(["apple", "banana"])
			})

			it("replaces all matching strings", () => {
				expect(replaceAllMatches(/^h/)((s) => s.toUpperCase())(["hello", "hi", "world"])).toEqual(["HELLO", "HI", "world"])
				expect(replaceAllMatches(/test/)(() => "replaced")(["test1", "test2", "other"])).toEqual(["replaced", "replaced", "other"])
			})

			it("handles complex patterns", () => {
				expect(replaceAllMatches(/\d+/)(() => "NUM")(["abc", "123", "456", "xyz"])).toEqual(["abc", "NUM", "NUM", "xyz"])
				expect(replaceAllMatches(/^[A-Z]/)((s) => s.toLowerCase())(["Hello", "World", "test"])).toEqual(["hello", "world", "test"])
			})

			it("replacer receives each matched string", () => {
				expect(replaceAllMatches(/test\d/)((s) => s.toUpperCase())(["test1", "test2", "test3"])).toEqual(["TEST1", "TEST2", "TEST3"])
				expect(replaceAllMatches(/\w+/)((s) => `[${s}]`)(["hello", "world"])).toEqual(["[hello]", "[world]"])
			})

			it("property: all matches are replaced", () => {
				fc.assert(
					fc.property(
						fc.array(fc.string()),
						(arr) => {
							const result = replaceAllMatches(/a/)(() => "X")(arr)
							const hasMatch = result.some(s => /a/.test(s))
							expect(hasMatch).toBe(false)
						}
					)
				)
			})

			it("property: non-matching strings unchanged", () => {
				fc.assert(
					fc.property(
						fc.array(fc.string()),
						(arr) => {
							const result = replaceAllMatches(/^###/)((s) => s.toUpperCase())(arr)
							const nonMatching = arr.filter(s => !/^###/.test(s))
							const resultNonMatching = result.filter(s => !/^###/.test(s))
							expect(resultNonMatching).toEqual(nonMatching)
						}
					)
				)
			})

			it("preserves original array", () => {
				const original = ["test1", "test2", "test3"]
				const copy = [...original]
				replaceAllMatches(/test/)((s) => s.toUpperCase())(original)
				expect(original).toEqual(copy)
			})
		})

		describe("Cross-function relationships", () => {
			it("replaceFirst and replaceLast with single occurrence", () => {
				const arr = [1, 2, 3, 4]
				const replacer = (n: number) => n * 10
				expect(replaceFirst(3)(replacer)(arr)).toEqual(replaceLast(3)(replacer)(arr))
			})

			it("replaceAll with single occurrence equals replaceFirst", () => {
				const arr = [1, 2, 3, 4]
				const replacer = (n: number) => n * 10
				expect(replaceAll(3)(replacer)(arr)).toEqual(replaceFirst(3)(replacer)(arr))
			})

			it("replaceAt with indexOf equals replaceFirst", () => {
				const arr = [1, 2, 3, 2, 4]
				const target = 2
				const replacer = (n: number) => n * 10
				const index = arr.indexOf(target)
				expect(replaceAt(index)(replacer)(arr)).toEqual(replaceFirst(target)(replacer)(arr))
			})

			it("replaceAt with lastIndexOf equals replaceLast", () => {
				const arr = [1, 2, 3, 2, 4]
				const target = 2
				const replacer = (n: number) => n * 10
				const index = arr.lastIndexOf(target)
				expect(replaceAt(index)(replacer)(arr)).toEqual(replaceLast(target)(replacer)(arr))
			})

			it("replaceFirstMatch and replaceLastMatch with single match", () => {
				const arr = ["abc", "def", "ghi"]
				const replacer = (s: string) => s.toUpperCase()
				expect(replaceFirstMatch(/def/)(replacer)(arr)).toEqual(replaceLastMatch(/def/)(replacer)(arr))
			})

			it("replaceAllMatches with single match equals replaceFirstMatch", () => {
				const arr = ["abc", "def", "ghi"]
				const replacer = (s: string) => s.toUpperCase()
				expect(replaceAllMatches(/def/)(replacer)(arr)).toEqual(replaceFirstMatch(/def/)(replacer)(arr))
			})
		})

		describe("Immutability", () => {
			it("all replacing functions preserve original array", () => {
				const original = [1, 2, 3, 2, 4]
				const originalStrings = ["test1", "test2", "test3"]
				const copy = [...original]
				const copyStrings = [...originalStrings]
				
				replaceAll(2)((n) => n * 10)(original)
				replaceAt(1)<number>((n) => n * 10)(original)
				replaceFirst(2)((n) => n * 10)(original)
				replaceLast(2)((n) => n * 10)(original)
				replaceFirstMatch(/test/)((s) => s.toUpperCase())(originalStrings)
				replaceLastMatch(/test/)((s) => s.toUpperCase())(originalStrings)
				replaceAllMatches(/test/)((s) => s.toUpperCase())(originalStrings)
				
				expect(original).toEqual(copy)
				expect(originalStrings).toEqual(copyStrings)
			})

			it("creates new array references", () => {
				const arr = [1, 2, 3]
				const result1 = replaceAll(99)(() => 0)(arr) // no match
				const result2 = replaceAt(1)<number>((n) => n * 2)(arr)
				
				expect(result1).not.toBe(arr)
				expect(result2).not.toBe(arr)
				expect(result1).toEqual(arr) // same content when no match
			})
		})

		describe("Edge cases", () => {
			it("handles empty arrays", () => {
				const emptyNum: Array<number> = []
				const emptyStr: Array<string> = []
				
				expect(replaceAll(1)(() => 2)(emptyNum)).toEqual([])
				expect(replaceAt(0)(() => 2)(emptyNum)).toEqual([])
				expect(replaceFirst(1)(() => 2)(emptyNum)).toEqual([])
				expect(replaceLast(1)(() => 2)(emptyNum)).toEqual([])
				expect(replaceFirstMatch(/test/)(() => "x")(emptyStr)).toEqual([])
				expect(replaceLastMatch(/test/)(() => "x")(emptyStr)).toEqual([])
				expect(replaceAllMatches(/test/)(() => "x")(emptyStr)).toEqual([])
			})

			it("handles arrays with undefined and null", () => {
				const mixed: Array<number | null | undefined> = [1, null, undefined, 2, null]
				const replacer1 = replaceAll<number | null | undefined>(null)
				expect(replacer1(() => 0)(mixed)).toEqual([1, 0, undefined, 2, 0])
				
				const replacer2 = replaceFirst<number | null | undefined>(undefined)
				expect(replacer2(() => 0)(mixed)).toEqual([1, null, 0, 2, null])
				
				const replacer3 = replaceLast<number | null | undefined>(null)
				expect(replacer3(() => 0)(mixed)).toEqual([1, null, undefined, 2, 0])
			})

			it("handles very large arrays", () => {
				const largeArray = Array.from({ length: 10000 }, (_, i) => i % 100)
				
				const replaced = replaceAll(50)(() => 999)(largeArray)
				expect(replaced.filter(x => x === 999).length).toBe(100) // 100 occurrences of 50
				expect(replaced.filter(x => x === 50).length).toBe(0)
				
				const replacedAt = replaceAt(5000)<number>(() => 999)(largeArray)
				expect(replacedAt[5000]).toBe(999)
				expect(replacedAt[4999]).toBe(largeArray[4999])
			})

			it("handles complex replacer functions", () => {
				let counter = 0
				const incrementingReplacer = () => ++counter
				const result = replaceAll(2)(incrementingReplacer)([1, 2, 3, 2, 4, 2])
				expect(result).toEqual([1, 1, 3, 2, 4, 3]) // Each replacement gets next counter value
			})

			it("handles regex edge cases", () => {
				// Empty string regex matches everything
				expect(replaceAllMatches(/(?:)/)(() => "X")(["a", "b"])).toEqual(["X", "X"])
				
				// Dot matches any character
				expect(replaceFirstMatch(/./)(() => "X")(["a", "b"])).toEqual(["X", "b"])
				
				// Case sensitive by default
				expect(replaceAllMatches(/test/)(() => "X")(["test", "TEST", "Test"])).toEqual(["X", "TEST", "Test"])
				expect(replaceAllMatches(/test/i)(() => "X")(["test", "TEST", "Test"])).toEqual(["X", "X", "X"])
			})
		})

		describe("Type consistency", () => {
			it("replaceAll maintains type consistency", () => {
				const nums: Array<number> = [1, 2, 3, 2, 4]
				const result: Array<number> = replaceAll(2)((n) => n * 10)(nums)
				expect(result).toEqual([1, 20, 3, 20, 4])
				
				const strs: Array<string> = ["a", "b", "a"]
				const strResult: Array<string> = replaceAll("a")(() => "X")(strs)
				expect(strResult).toEqual(["X", "b", "X"])
			})

			it("replaceAt maintains type consistency", () => {
				const nums: Array<number> = [1, 2, 3]
				const result: Array<number> = replaceAt(1)<number>((n) => n * 2)(nums)
				expect(result).toEqual([1, 4, 3])
			})

			it("match functions maintain string array type", () => {
				const strs: Array<string> = ["test1", "test2", "test3"]
				const result1: Array<string> = replaceFirstMatch(/test/)((s) => s.toUpperCase())(strs)
				const result2: Array<string> = replaceLastMatch(/test/)((s) => s.toUpperCase())(strs)
				const result3: Array<string> = replaceAllMatches(/test/)((s) => s.toUpperCase())(strs)
				
				expect(result1[0]).toBe("TEST1")
				expect(result2[2]).toBe("TEST3")
				expect(result3).toEqual(["TEST1", "TEST2", "TEST3"])
			})
		})
	})
})