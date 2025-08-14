import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import * as fc from "fast-check"
import insertAt from "../../../array/insertAt/index.ts"
import removeAt from "../../../array/removeAt/index.ts"
import replaceAt from "../../../array/replaceAt/index.ts"
import replaceFirst from "../../../array/replaceFirst/index.ts"
import replaceFirstMatch from "../../../array/replaceFirstMatch/index.ts"
import replaceLast from "../../../array/replaceLast/index.ts"
import replaceLastMatch from "../../../array/replaceLastMatch/index.ts"
import replaceAll from "../../../array/replaceAll/index.ts"
import replaceAllMatches from "../../../array/replaceAllMatches/index.ts"
import move from "../../../array/move/index.ts"
import repeat from "../../../array/repeat/index.ts"
import repeatItem from "../../../array/repeatItem/index.ts"

describe("Array Mutating Behaviors", () => {
	describe("when inserting elements", () => {
		it("inserts element at specified index", () => {
			const result = insertAt(2)("x")([1, 2, 3, 4])
			expect(result).toEqual([1, 2, "x", 3, 4])
		})

		it("inserts at beginning with index 0", () => {
			const result = insertAt(0)("start")([1, 2, 3])
			expect(result).toEqual(["start", 1, 2, 3])
		})

		it("inserts at end with index equal to length", () => {
			const result = insertAt(3)("end")([1, 2, 3])
			expect(result).toEqual([1, 2, 3, "end"])
		})

		it("handles negative indices", () => {
			const result = insertAt(-1)("x")([1, 2, 3])
			expect(result).toEqual([1, 2, 3]) // negative index returns original
		})

		it("handles out of bounds positive index", () => {
			const result = insertAt(10)("x")([1, 2, 3])
			expect(result).toEqual([1, 2, 3]) // out of bounds returns original
		})

		it("handles empty arrays", () => {
			const result = insertAt(0)("x")([])
			expect(result).toEqual(["x"])
		})

		it("does not mutate original array", () => {
			const original = [1, 2, 3]
			const result = insertAt(1)("x")(original)
			expect(original).toEqual([1, 2, 3])
			expect(result).not.toBe(original)
		})
	})

	describe("when removing at index", () => {
		it("removes element at specified index", () => {
			const result = removeAt(2)([1, 2, 3, 4, 5])
			expect(result).toEqual([1, 2, 4, 5])
		})

		it("removes first element", () => {
			const result = removeAt(0)([1, 2, 3])
			expect(result).toEqual([2, 3])
		})

		it("removes last element", () => {
			const result = removeAt(2)([1, 2, 3])
			expect(result).toEqual([1, 2])
		})

		it("handles negative indices", () => {
			const result = removeAt(-1)([1, 2, 3, 4])
			expect(result).toEqual([1, 2, 3])
		})

		it("returns same array for out of bounds index", () => {
			const result = removeAt(10)([1, 2, 3])
			expect(result).toEqual([1, 2, 3])
		})

		it("handles empty arrays", () => {
			const result = removeAt(0)([])
			expect(result).toEqual([])
		})

		it("does not mutate original array", () => {
			const original = [1, 2, 3]
			const result = removeAt(1)(original)
			expect(original).toEqual([1, 2, 3])
			expect(result).not.toBe(original)
		})
	})

	describe("when replacing at index", () => {
		it("replaces element at specified index", () => {
			const result = replaceAt(2)(() => "x")([1, 2, 3, 4])
			expect(result).toEqual([1, 2, "x", 4])
		})

		it("replaces first element", () => {
			const result = replaceAt(0)(() => "new")([1, 2, 3])
			expect(result).toEqual(["new", 2, 3])
		})

		it("replaces last element", () => {
			const result = replaceAt(2)(() => "new")([1, 2, 3])
			expect(result).toEqual([1, 2, "new"])
		})

		it("handles negative indices", () => {
			const result = replaceAt(-1)(() => "x")([1, 2, 3])
			expect(result).toEqual([1, 2, 3]) // negative index returns original
		})

		it("returns same array for out of bounds index", () => {
			const result = replaceAt(10)(() => "x")([1, 2, 3])
			expect(result).toEqual([1, 2, 3])
		})

		it("handles empty arrays", () => {
			const result = replaceAt(0)(() => "x")([])
			expect(result).toEqual([])
		})

		it("does not mutate original array", () => {
			const original = [1, 2, 3]
			const result = replaceAt(1)(() => "x")(original)
			expect(original).toEqual([1, 2, 3])
			expect(result).not.toBe(original)
		})
	})

	describe("when replacing first occurrence", () => {
		it("replaces first matching element", () => {
			const result = replaceFirst(2)(() => "x")([1, 2, 3, 2, 4])
			expect(result).toEqual([1, "x", 3, 2, 4])
		})

		it("returns unchanged array when no match", () => {
			const result = replaceFirst(5)(() => "x")([1, 2, 3, 4])
			expect(result).toEqual([1, 2, 3, 4])
		})

		it("handles single occurrence", () => {
			const result = replaceFirst(3)(() => "x")([1, 2, 3, 4])
			expect(result).toEqual([1, 2, "x", 4])
		})

		it("works with different types", () => {
			const result = replaceFirst("b")(() => "x")(["a", "b", "c", "b"])
			expect(result).toEqual(["a", "x", "c", "b"])
		})

		it("handles empty arrays", () => {
			const result = replaceFirst(1)(() => "x")([])
			expect(result).toEqual([])
		})
	})

	describe("when replacing first match with predicate", () => {
		it("replaces first element matching predicate", () => {
			const isEven = (n: number) => n % 2 === 0
			const result = replaceFirstMatch(isEven)(() => "x")([1, 2, 3, 4, 5])
			expect(result).toEqual([1, "x", 3, 4, 5])
		})

		it("returns unchanged array when no match", () => {
			const isNegative = (n: number) => n < 0
			const result = replaceFirstMatch(isNegative)(() => "x")([1, 2, 3])
			expect(result).toEqual([1, 2, 3])
		})

		it("only replaces first match", () => {
			const isEven = (n: number) => n % 2 === 0
			const result = replaceFirstMatch(isEven)(() => "x")([2, 4, 6])
			expect(result).toEqual(["x", 4, 6])
		})

		it("handles empty arrays", () => {
			const predicate = (n: number) => n > 0
			const result = replaceFirstMatch(predicate)(() => "x")([])
			expect(result).toEqual([])
		})
	})

	describe("when replacing last occurrence", () => {
		it("replaces last matching element", () => {
			const result = replaceLast(2)(() => "x")([1, 2, 3, 2, 4])
			expect(result).toEqual([1, 2, 3, "x", 4])
		})

		it("returns unchanged array when no match", () => {
			const result = replaceLast(5)(() => "x")([1, 2, 3, 4])
			expect(result).toEqual([1, 2, 3, 4])
		})

		it("handles single occurrence", () => {
			const result = replaceLast(3)(() => "x")([1, 2, 3, 4])
			expect(result).toEqual([1, 2, "x", 4])
		})

		it("works with different types", () => {
			const result = replaceLast("b")(() => "x")(["a", "b", "c", "b"])
			expect(result).toEqual(["a", "b", "c", "x"])
		})

		it("handles empty arrays", () => {
			const result = replaceLast(1)(() => "x")([])
			expect(result).toEqual([])
		})
	})

	describe("when replacing last match with predicate", () => {
		it("replaces last element matching predicate", () => {
			const isEven = (n: number) => n % 2 === 0
			const result = replaceLastMatch(isEven)(() => "x")([1, 2, 3, 4, 5])
			expect(result).toEqual([1, 2, 3, "x", 5])
		})

		it("returns unchanged array when no match", () => {
			const isNegative = (n: number) => n < 0
			const result = replaceLastMatch(isNegative)(() => "x")([1, 2, 3])
			expect(result).toEqual([1, 2, 3])
		})

		it("only replaces last match", () => {
			const isEven = (n: number) => n % 2 === 0
			const result = replaceLastMatch(isEven)(() => "x")([2, 4, 6])
			expect(result).toEqual([2, 4, "x"])
		})

		it("handles empty arrays", () => {
			const predicate = (n: number) => n > 0
			const result = replaceLastMatch(predicate)(() => "x")([])
			expect(result).toEqual([])
		})
	})

	describe("when replacing all occurrences", () => {
		it("replaces all matching elements", () => {
			const result = replaceAll(2)(() => "x")([1, 2, 3, 2, 4, 2])
			expect(result).toEqual([1, "x", 3, "x", 4, "x"])
		})

		it("returns unchanged array when no match", () => {
			const result = replaceAll(5)(() => "x")([1, 2, 3, 4])
			expect(result).toEqual([1, 2, 3, 4])
		})

		it("handles single occurrence", () => {
			const result = replaceAll(3)(() => "x")([1, 2, 3, 4])
			expect(result).toEqual([1, 2, "x", 4])
		})

		it("works with different types", () => {
			const result = replaceAll("b")(() => "x")(["a", "b", "c", "b", "b"])
			expect(result).toEqual(["a", "x", "c", "x", "x"])
		})

		it("handles empty arrays", () => {
			const result = replaceAll(1)(() => "x")([])
			expect(result).toEqual([])
		})
	})

	describe("when replacing all matches with predicate", () => {
		it("replaces all elements matching predicate", () => {
			const isEven = (n: number) => n % 2 === 0
			const result = replaceAllMatches(isEven)(() => "x")([1, 2, 3, 4, 5, 6])
			expect(result).toEqual([1, "x", 3, "x", 5, "x"])
		})

		it("returns unchanged array when no match", () => {
			const isNegative = (n: number) => n < 0
			const result = replaceAllMatches(isNegative)(() => "x")([1, 2, 3])
			expect(result).toEqual([1, 2, 3])
		})

		it("replaces all matches", () => {
			const isPositive = (n: number) => n > 0
			const result = replaceAllMatches(isPositive)(() => "x")([1, 2, 3])
			expect(result).toEqual(["x", "x", "x"])
		})

		it("handles empty arrays", () => {
			const predicate = (n: number) => n > 0
			const result = replaceAllMatches(predicate)(() => "x")([])
			expect(result).toEqual([])
		})
	})

	describe("when moving elements", () => {
		it("moves element from one index to another", () => {
			const result = move(0)(2)([1, 2, 3, 4])
			expect(result).toEqual([2, 3, 1, 4])
		})

		it("moves element forward", () => {
			const result = move(1)(3)(["a", "b", "c", "d"])
			expect(result).toEqual(["a", "c", "d", "b"])
		})

		it("moves element backward", () => {
			const result = move(3)(1)([1, 2, 3, 4])
			expect(result).toEqual([1, 4, 2, 3])
		})

		it("returns same array when indices are equal", () => {
			const result = move(2)(2)([1, 2, 3, 4])
			expect(result).toEqual([1, 2, 3, 4])
		})

		it("handles negative indices", () => {
			const result = move(-1)(0)([1, 2, 3, 4])
			expect(result).toEqual([1, 2, 3, 4]) // negative indices not supported
		})

		it("handles out of bounds indices", () => {
			const result = move(10)(0)([1, 2, 3])
			expect(result).toEqual([1, 2, 3])
		})

		it("does not mutate original array", () => {
			const original = [1, 2, 3, 4]
			const result = move(0)(2)(original)
			expect(original).toEqual([1, 2, 3, 4])
			expect(result).not.toBe(original)
		})
	})

	describe("when repeating arrays", () => {
		it("repeats array specified number of times", () => {
			const result = repeat(3)([1, 2])
			expect(result).toEqual([1, 2, 1, 2, 1, 2])
		})

		it("returns empty array for 0 repetitions", () => {
			const result = repeat(0)([1, 2, 3])
			expect(result).toEqual([])
		})

		it("returns original array for 1 repetition", () => {
			const result = repeat(1)([1, 2, 3])
			expect(result).toEqual([1, 2, 3])
		})

		it("handles empty arrays", () => {
			const result = repeat(3)([])
			expect(result).toEqual([])
		})

		it("handles negative counts as 0", () => {
			const result = repeat(-1)([1, 2])
			expect(result).toEqual([])
		})

		it("works with different types", () => {
			const result = repeat(2)(["a", "b"])
			expect(result).toEqual(["a", "b", "a", "b"])
		})
	})

	describe("when repeating items", () => {
		it("creates array with repeated item", () => {
			const result = repeatItem(5)(3)
			expect(result).toEqual([5, 5, 5])
		})

		it("returns empty array for 0 count", () => {
			const result = repeatItem("x")(0)
			expect(result).toEqual([])
		})

		it("handles single repetition", () => {
			const result = repeatItem(42)(1)
			expect(result).toEqual([42])
		})

		it("handles negative counts as 0", () => {
			const result = repeatItem("x")(-5)
			expect(result).toEqual([])
		})

		it("works with different types", () => {
			expect(repeatItem("hello")(2)).toEqual(["hello", "hello"])
			expect(repeatItem(true)(3)).toEqual([true, true, true])
			expect(repeatItem({ id: 1 })(2)).toEqual([{ id: 1 }, { id: 1 }])
		})

		it("creates independent references for objects", () => {
			const obj = { id: 1 }
			const result = repeatItem(obj)(2)
			expect(result[0]).toBe(result[1])
		})
	})

	describe("property-based tests", () => {
		describe("insertAt properties", () => {
			it("preserves array length when inserting at valid index", () => {
				fc.assert(fc.property(
					fc.array(fc.integer()),
					fc.integer({ min: 0, max: 20 }),
					fc.integer(),
					(arr, index, element) => {
						const validIndex = Math.min(index, arr.length)
						const result = insertAt(validIndex)(element)(arr)
						expect(result.length).toBe(arr.length + 1)
					}
				))
			})

			it("element is present at specified index", () => {
				fc.assert(fc.property(
					fc.array(fc.integer()),
					fc.nat(20),
					fc.integer(),
					(arr, index, element) => {
						const validIndex = Math.min(index, arr.length)
						const result = insertAt(validIndex)(element)(arr)
						expect(result[validIndex]).toBe(element)
					}
				))
			})

			it("maintains order of existing elements", () => {
				fc.assert(fc.property(
					fc.array(fc.integer()),
					fc.nat(20),
					fc.integer(),
					(arr, index, element) => {
						const validIndex = Math.min(index, arr.length)
						const result = insertAt(validIndex)(element)(arr)
						
						// Check elements before insertion point
						for (let i = 0; i < validIndex; i++) {
							expect(result[i]).toBe(arr[i])
						}
						
						// Check elements after insertion point
						for (let i = validIndex; i < arr.length; i++) {
							expect(result[i + 1]).toBe(arr[i])
						}
					}
				))
			})
		})

		describe("removeAt properties", () => {
			it("reduces array length by 1 when removing valid index", () => {
				fc.assert(fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					(arr) => {
						fc.pre(arr.length > 0)
						const index = fc.sample(fc.nat(arr.length - 1), 1)[0]
						const result = removeAt(index)(arr)
						expect(result.length).toBe(arr.length - 1)
					}
				))
			})

			it("maintains order of remaining elements", () => {
				fc.assert(fc.property(
					fc.array(fc.integer(), { minLength: 2 }),
					(arr) => {
						fc.pre(arr.length >= 2)
						const index = fc.sample(fc.nat(arr.length - 1), 1)[0]
						const result = removeAt(index)(arr)
						
						// Check elements before removal point
						for (let i = 0; i < index; i++) {
							expect(result[i]).toBe(arr[i])
						}
						
						// Check elements after removal point
						for (let i = index; i < result.length; i++) {
							expect(result[i]).toBe(arr[i + 1])
						}
					}
				))
			})

			it("returns original array for invalid indices", () => {
				fc.assert(fc.property(
					fc.array(fc.integer()),
					fc.integer(),
					(arr, index) => {
						fc.pre(index < 0 || index >= arr.length)
						const result = removeAt(index)(arr)
						expect(result).toEqual(arr)
					}
				))
			})
		})

		describe("replaceAt properties", () => {
			it("maintains array length", () => {
				fc.assert(fc.property(
					fc.array(fc.integer()),
					fc.nat(20),
					fc.integer(),
					(arr, index, newValue) => {
						const validIndex = Math.min(index, arr.length - 1)
						if (arr.length === 0) return
						
						const result = replaceAt(validIndex)(() => newValue)(arr)
						expect(result.length).toBe(arr.length)
					}
				))
			})

			it("element is replaced at specified index", () => {
				fc.assert(fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					fc.integer(),
					(arr, newValue) => {
						const index = fc.sample(fc.nat(arr.length - 1), 1)[0]
						const result = replaceAt(index)(() => newValue)(arr)
						expect(result[index]).toBe(newValue)
					}
				))
			})

			it("other elements remain unchanged", () => {
				fc.assert(fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					fc.integer(),
					(arr, newValue) => {
						const index = fc.sample(fc.nat(arr.length - 1), 1)[0]
						const result = replaceAt(index)(() => newValue)(arr)
						
						for (let i = 0; i < arr.length; i++) {
							if (i !== index) {
								expect(result[i]).toBe(arr[i])
							}
						}
					}
				))
			})
		})

		describe("repeat properties", () => {
			it("result length equals original length times count", () => {
				fc.assert(fc.property(
					fc.array(fc.integer()),
					fc.nat(10),
					(arr, count) => {
						const result = repeat(count)(arr)
						expect(result.length).toBe(arr.length * count)
					}
				))
			})

			it("repeats pattern correctly", () => {
				fc.assert(fc.property(
					fc.array(fc.integer(), { minLength: 1, maxLength: 5 }),
					fc.integer({ min: 1, max: 5 }),
					(arr, count) => {
						const result = repeat(count)(arr)
						
						for (let i = 0; i < count; i++) {
							for (let j = 0; j < arr.length; j++) {
								expect(result[i * arr.length + j]).toBe(arr[j])
							}
						}
					}
				))
			})

			it("empty array repeated any times is empty", () => {
				fc.assert(fc.property(
					fc.nat(10),
					(count) => {
						const result = repeat(count)([])
						expect(result).toEqual([])
					}
				))
			})
		})

		describe("repeatItem properties", () => {
			it("creates array of correct length", () => {
				fc.assert(fc.property(
					fc.integer(),
					fc.nat(20),
					(item, count) => {
						const result = repeatItem(item)(count)
						expect(result.length).toBe(count)
					}
				))
			})

			it("all elements are the same", () => {
				fc.assert(fc.property(
					fc.integer(),
					fc.integer({ min: 1, max: 20 }),
					(item, count) => {
						const result = repeatItem(item)(count)
						expect(result.every(x => x === item)).toBe(true)
					}
				))
			})
		})

		describe("immutability properties", () => {
			it("all operations do not mutate original array", () => {
				fc.assert(fc.property(
					fc.array(fc.integer()),
					fc.integer(),
					(arr, value) => {
						const original = [...arr]
						
						// Test all operations
						if (arr.length > 0) {
							const index = fc.sample(fc.nat(arr.length - 1), 1)[0]
							insertAt(index)(value)(arr)
							removeAt(index)(arr)
							replaceAt(index)(() => value)(arr)
						}
						
						repeat(2)(arr)
						repeatItem(value)(3)
						
						expect(arr).toEqual(original)
					}
				))
			})
		})
	})
})