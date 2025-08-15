import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import fc from "fast-check"

// Import all combining functions
import concat from "../../../array/concat/index.ts"
import insertAt from "../../../array/insertAt/index.ts"
import join from "../../../array/join/index.ts"

describe("Array Combining Operations", () => {
	describe("Behavioral Properties", () => {
		describe("concat", () => {
			it("concatenates empty arrays", () => {
				const emptyNumbers: Array<number> = []
				expect(concat(emptyNumbers)(emptyNumbers)).toEqual([])
				expect(concat([1, 2])(emptyNumbers)).toEqual([1, 2])
				expect(concat(emptyNumbers)([1, 2])).toEqual([1, 2])
			})

			it("concatenates non-empty arrays", () => {
				expect(concat([3, 4])([1, 2])).toEqual([1, 2, 3, 4])
				expect(concat(["c", "d"])(["a", "b"])).toEqual(["a", "b", "c", "d"])
				expect(concat([5])([1, 2, 3, 4])).toEqual([1, 2, 3, 4, 5])
			})

			it("preserves order", () => {
				const first = [1, 2, 3]
				const second = [4, 5, 6]
				const result = concat(second)(first)
				expect(result).toEqual([1, 2, 3, 4, 5, 6])
				// Verify exact order
				for (let i = 0; i < first.length; i++) {
					expect(result[i]).toBe(first[i])
				}
				for (let i = 0; i < second.length; i++) {
					expect(result[first.length + i]).toBe(second[i])
				}
			})

			it("handles different types", () => {
				const boolNull: Array<boolean | null | undefined> = [true, undefined]
				const falsNull: Array<boolean | null | undefined> = [false, null]
				expect(concat(falsNull)(boolNull))
					.toEqual([true, undefined, false, null])
				
				type ObjType = { a?: number; b?: number }
				const obj1: ObjType = { a: 1 }
				const obj2: ObjType = { b: 2 }
				expect(concat([obj2])([obj1]))
					.toEqual([obj1, obj2])
			})

			it("property: concat with empty array is identity", () => {
				fc.assert(
					fc.property(fc.array(fc.anything()), (arr) => {
						const emptyArr: typeof arr = []
						expect(concat(emptyArr)(arr)).toEqual(arr)
						expect(concat(arr)(emptyArr)).toEqual(arr)
					})
				)
			})

			it("property: length of result is sum of lengths", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer()),
						fc.array(fc.integer()),
						(arr1, arr2) => {
							const result = concat(arr2)(arr1)
							expect(result.length).toBe(arr1.length + arr2.length)
						}
					)
				)
			})

			it("property: associative - (a + b) + c = a + (b + c)", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer()),
						fc.array(fc.integer()),
						fc.array(fc.integer()),
						(a, b, c) => {
							const leftAssoc = concat(c)(concat(b)(a))
							const rightAssoc = concat(concat(c)(b))(a)
							expect(leftAssoc).toEqual(rightAssoc)
						}
					)
				)
			})

			it("preserves original arrays", () => {
				const original1 = [1, 2, 3]
				const original2 = [4, 5, 6]
				const copy1 = [...original1]
				const copy2 = [...original2]
				concat(original2)(original1)
				expect(original1).toEqual(copy1)
				expect(original2).toEqual(copy2)
			})

			it("creates new array reference", () => {
				const arr1 = [1, 2]
				const arr2 = [3, 4]
				const result = concat(arr2)(arr1)
				expect(result).not.toBe(arr1)
				expect(result).not.toBe(arr2)
			})
		})

		describe("insertAt", () => {
			it("inserts at beginning", () => {
				expect(insertAt(0)("x")(["a", "b", "c"])).toEqual(["x", "a", "b", "c"])
				expect(insertAt(0)(1)([2, 3, 4])).toEqual([1, 2, 3, 4])
				expect(insertAt(0)("only")([])).toEqual(["only"])
			})

			it("inserts in middle", () => {
				expect(insertAt(1)("x")(["a", "b", "c"])).toEqual(["a", "x", "b", "c"])
				expect(insertAt(2)(99)([1, 2, 3, 4])).toEqual([1, 2, 99, 3, 4])
			})

			it("inserts at end", () => {
				expect(insertAt(3)("x")(["a", "b", "c"])).toEqual(["a", "b", "c", "x"])
				expect(insertAt(2)("end")(["a", "b"])).toEqual(["a", "b", "end"])
				expect(insertAt(0)("only")([])).toEqual(["only"])
			})

			it("handles out-of-bounds indices", () => {
				expect(insertAt(-1)("x")(["a", "b"])).toEqual(["a", "b"]) // negative
				expect(insertAt(10)("x")(["a", "b"])).toEqual(["a", "b"]) // too large
				expect(insertAt(5)("x")([])).toEqual([]) // beyond empty
			})

			it("handles different types", () => {
				const numsOrNull: Array<number | null> = [1, 2]
				const insertNullAt1 = insertAt(1)<number | null>
				expect(insertNullAt1(null)(numsOrNull)).toEqual([1, null, 2])
				const boolsOrUndef: Array<boolean | undefined> = [true, false]
				const insertUndefAt0 = insertAt(0)<boolean | undefined>
				expect(insertUndefAt0(undefined)(boolsOrUndef))
					.toEqual([undefined, true, false])
			})

			it("property: inserting at 0 prepends", () => {
				fc.assert(
					fc.property(
						fc.array(fc.anything()),
						fc.anything(),
						(arr, item) => {
							const result = insertAt(0)(item)(arr)
							expect(result[0]).toBe(item)
							expect(result.slice(1)).toEqual(arr)
						}
					)
				)
			})

			it("property: inserting at length appends", () => {
				fc.assert(
					fc.property(
						fc.array(fc.anything()),
						fc.anything(),
						(arr, item) => {
							const result = insertAt(arr.length)(item)(arr)
							expect(result[arr.length]).toBe(item)
							expect(result.slice(0, arr.length)).toEqual(arr)
						}
					)
				)
			})

			it("property: valid insert increases length by 1", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer()),
						fc.integer(),
						(arr, item) => {
							const index = Math.floor(Math.random() * (arr.length + 1))
							const result = insertAt(index)(item)(arr)
							expect(result.length).toBe(arr.length + 1)
						}
					)
				)
			})

			it("property: elements before and after index preserved", () => {
				fc.assert(
					fc.property(
						fc.array(fc.integer(), { minLength: 1 }),
						fc.integer(),
						(arr, item) => {
							const index = Math.floor(Math.random() * (arr.length + 1))
							const result = insertAt(index)(item)(arr)
							// Check elements before insertion point
							for (let i = 0; i < index; i++) {
								expect(result[i]).toBe(arr[i])
							}
							// Check inserted element
							expect(result[index]).toBe(item)
							// Check elements after insertion point
							for (let i = index; i < arr.length; i++) {
								expect(result[i + 1]).toBe(arr[i])
							}
						}
					)
				)
			})

			it("preserves original array", () => {
				const original = [1, 2, 3]
				const copy = [...original]
				insertAt(1)(99)(original)
				expect(original).toEqual(copy)
			})
		})

		describe("join", () => {
			it("joins empty array to empty string", () => {
				expect(join(",")([])).toBe("")
				expect(join("")([])).toBe("")
				expect(join(" ")([])).toBe("")
			})

			it("joins single element without separator", () => {
				expect(join(",")(['hello'])).toBe("hello")
				expect(join("-")(["only"])).toBe("only")
				expect(join("")(["a"])).toBe("a")
			})

			it("joins multiple elements with separator", () => {
				expect(join(", ")(["a", "b", "c"])).toBe("a, b, c")
				expect(join("-")(["one", "two", "three"])).toBe("one-two-three")
				expect(join("")(["h", "e", "l", "l", "o"])).toBe("hello")
			})

			it("handles different separator types", () => {
				expect(join(" | ")(["a", "b", "c"])).toBe("a | b | c")
				expect(join("\n")(["line1", "line2", "line3"])).toBe("line1\nline2\nline3")
				expect(join("\t")(["col1", "col2", "col3"])).toBe("col1\tcol2\tcol3")
			})

			it("converts elements to strings", () => {
				expect(join(",")(["1", "2", "3"])).toBe("1,2,3")
				expect(join(" ")(["hello", "world"])).toBe("hello world")
			})

			it("property: empty separator concatenates all", () => {
				fc.assert(
					fc.property(
						fc.array(fc.string()),
						(arr) => {
							const result = join("")(arr)
							expect(result).toBe(arr.join(""))
						}
					)
				)
			})

			it("property: join then split recovers array", () => {
				fc.assert(
					fc.property(
						fc.array(fc.string({ minLength: 1 }).filter(s => !s.includes("|"))),
						(arr) => {
							if (arr.length === 0) return
							const joined = join("|")(arr)
							const split = joined.split("|")
							expect(split).toEqual(arr)
						}
					)
				)
			})

			it("property: length relationship", () => {
				fc.assert(
					fc.property(
						fc.array(fc.string(), { minLength: 2 }),
						fc.string({ minLength: 1, maxLength: 3 }),
						(arr, sep) => {
							const joined = join(sep)(arr)
							const expectedMinLength = arr.reduce((acc, s) => acc + s.length, 0) +
								(arr.length - 1) * sep.length
							expect(joined.length).toBeGreaterThanOrEqual(expectedMinLength)
						}
					)
				)
			})

			it("preserves original array", () => {
				const original = ["a", "b", "c"]
				const copy = [...original]
				join(",")(original)
				expect(original).toEqual(copy)
			})
		})

		describe("Cross-function relationships", () => {
			it("insertAt at 0 similar to concat", () => {
				const arr = [2, 3, 4]
				const item = 1
				const inserted = insertAt(0)(item)(arr)
				const concatenated = concat(arr)([item])
				expect(inserted).toEqual(concatenated)
			})

			it("insertAt at length similar to concat", () => {
				const arr = [1, 2, 3]
				const item = 4
				const inserted = insertAt(arr.length)(item)(arr)
				const concatenated = concat([item])(arr)
				expect(inserted).toEqual(concatenated)
			})

			it("multiple insertAt similar to concat", () => {
				const arr1 = [1, 2]
				const arr2 = [3, 4]
				// Insert arr2 elements one by one
				let result = arr1
				for (let i = 0; i < arr2.length; i++) {
					result = insertAt(result.length)(arr2[i])(result)
				}
				expect(result).toEqual(concat(arr2)(arr1))
			})

			it("join with empty separator similar to array toString", () => {
				const arr = ["a", "b", "c"]
				const joined = join("")(arr)
				expect(joined).toBe("abc")
			})
		})

		describe("Immutability", () => {
			it("all combining functions preserve original arrays", () => {
				const original1 = [1, 2, 3]
				const original2 = [4, 5, 6]
				const originalStrings = ["a", "b", "c"]
				const copy1 = [...original1]
				const copy2 = [...original2]
				const copyStrings = [...originalStrings]
				
				concat(original2)(original1)
				insertAt(1)(99)(original1)
				join(",")(originalStrings)
				
				expect(original1).toEqual(copy1)
				expect(original2).toEqual(copy2)
				expect(originalStrings).toEqual(copyStrings)
			})

			it("concat creates new array with new reference", () => {
				const arr1 = [1, 2]
				const arr2 = [3, 4]
				const result = concat(arr2)(arr1)
				
				expect(result).not.toBe(arr1)
				expect(result).not.toBe(arr2)
				
				// Modifying result doesn't affect originals
				result[0] = 99
				expect(arr1[0]).toBe(1)
				expect(arr2[0]).toBe(3)
			})

			it("insertAt creates new array with new reference", () => {
				const arr = [1, 2, 3]
				const result = insertAt(1)(99)(arr)
				
				expect(result).not.toBe(arr)
				
				// Modifying result doesn't affect original
				result[0] = 88
				expect(arr[0]).toBe(1)
			})
		})

		describe("Edge cases", () => {
			it("handles very large arrays", () => {
				const largeArray1 = Array.from({ length: 5000 }, (_, i) => i)
				const largeArray2 = Array.from({ length: 5000 }, (_, i) => i + 5000)
				
				const concatenated = concat(largeArray2)(largeArray1)
				expect(concatenated.length).toBe(10000)
				expect(concatenated[0]).toBe(0)
				expect(concatenated[4999]).toBe(4999)
				expect(concatenated[5000]).toBe(5000)
				expect(concatenated[9999]).toBe(9999)
				
				const inserted = insertAt(2500)(99999)(largeArray1)
				expect(inserted.length).toBe(5001)
				expect(inserted[2500]).toBe(99999)
				
				const largeStrings = Array.from({ length: 1000 }, (_, i) => `item${i}`)
				const joined = join(",")(largeStrings)
				expect(joined.split(",").length).toBe(1000)
			})

			it("handles arrays with undefined and null", () => {
				const arr1: Array<number | null | undefined> = [undefined, null, 1]
				const arr2: Array<number | null | undefined> = [2, null, undefined]
				
				expect(concat(arr2)(arr1)).toEqual([undefined, null, 1, 2, null, undefined])
				const arr3: Array<number | null | undefined> = [undefined, 1]
				const insertNullAt1Mixed = insertAt(1)<number | null | undefined>
				expect(insertNullAt1Mixed(null)(arr3)).toEqual([undefined, null, 1])
			})

			it("handles empty string separators", () => {
				expect(join("")(["a", "b", "c"])).toBe("abc")
				expect(join("")([])).toBe("")
				expect(join("")([""])).toBe("")
				expect(join("")(["", "", ""])).toBe("")
			})

			it("handles special characters in join", () => {
				expect(join("\\n")(["line1", "line2"])).toBe("line1\\nline2")
				expect(join("\\t")(["col1", "col2"])).toBe("col1\\tcol2")
				expect(join("🔥")(["fire", "hot"])).toBe("fire🔥hot")
			})
		})

		describe("Type consistency", () => {
			it("concat maintains type consistency", () => {
				const nums1: Array<number> = [1, 2]
				const nums2: Array<number> = [3, 4]
				const result: Array<number> = concat(nums2)(nums1)
				expect(result).toEqual([1, 2, 3, 4])
				
				const strs1: Array<string> = ["a", "b"]
				const strs2: Array<string> = ["c", "d"]
				const strResult: Array<string> = concat(strs2)(strs1)
				expect(strResult).toEqual(["a", "b", "c", "d"])
			})

			it("insertAt maintains type consistency", () => {
				const nums: Array<number> = [1, 2, 3]
				const result: Array<number> = insertAt(1)(99)(nums)
				expect(result).toEqual([1, 99, 2, 3])
				
				const strs: Array<string> = ["a", "b", "c"]
				const strResult: Array<string> = insertAt(1)("x")(strs)
				expect(strResult).toEqual(["a", "x", "b", "c"])
			})
		})
	})
})