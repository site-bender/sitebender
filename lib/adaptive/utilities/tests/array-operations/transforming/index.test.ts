import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import * as fc from "fast-check"
import map from "../../../array/map/index.ts"
import flatMap from "../../../array/flatMap/index.ts"
import flatten from "../../../array/flatten/index.ts"
import reduce from "../../../array/reduce/index.ts"
import reverse from "../../../array/reverse/index.ts"
import sort from "../../../array/sort/index.ts"
import concat from "../../../array/concat/index.ts"
import join from "../../../array/join/index.ts"

describe("Array Transforming Behaviors", () => {
	describe("when mapping over elements", () => {
		it("transforms each element", () => {
			const double = (n: number) => n * 2
			const result = map(double)([1, 2, 3, 4])
			expect(result).toEqual([2, 4, 6, 8])
		})

		it("preserves array length", () => {
			const fn = (n: number) => n + 1
			const input = [1, 2, 3, 4, 5]
			const result = map(fn)(input)
			expect(result.length).toBe(input.length)
		})

		it("handles empty arrays", () => {
			const fn = (n: number) => n * 2
			const result = map(fn)([])
			expect(result).toEqual([])
		})

		it("works with type transformations", () => {
			const toString = (n: number) => n.toString()
			const result = map(toString)([1, 2, 3])
			expect(result).toEqual(["1", "2", "3"])
		})

		it("passes index as second argument", () => {
			const withIndex = (val: string, idx: number) => `${val}-${idx}`
			const result = map(withIndex)(["a", "b", "c"])
			expect(result).toEqual(["a-0", "b-1", "c-2"])
		})

		it("does not mutate original array", () => {
			const original = [1, 2, 3]
			const fn = (n: number) => n * 2
			map(fn)(original)
			expect(original).toEqual([1, 2, 3])
		})
	})

	describe("when flat mapping", () => {
		it("maps and flattens one level", () => {
			const duplicate = (n: number) => [n, n]
			const result = flatMap(duplicate)([1, 2, 3])
			expect(result).toEqual([1, 1, 2, 2, 3, 3])
		})

		it("handles functions returning empty arrays", () => {
			const maybeDouble = (n: number) => (n % 2 === 0 ? [n * 2] : [])
			const result = flatMap(maybeDouble)([1, 2, 3, 4])
			expect(result).toEqual([4, 8])
		})

		it("handles mixed array sizes", () => {
			const expand = (n: number) => Array(n).fill(n)
			const result = flatMap(expand)([1, 2, 3])
			expect(result).toEqual([1, 2, 2, 3, 3, 3])
		})

		it("handles empty input arrays", () => {
			const fn = (n: number) => [n, n]
			const result = flatMap(fn)([])
			expect(result).toEqual([])
		})

		it("handles single values returned", () => {
			const wrap = (n: number) => [n + 1]
			const result = flatMap(wrap)([1, 2, 3])
			expect(result).toEqual([2, 3, 4])
		})

		it("properly types the result", () => {
			const toChars = (s: string) => s.split("")
			const result = flatMap(toChars)(["ab", "cd"])
			expect(result).toEqual(["a", "b", "c", "d"])
		})
	})

	describe("when flattening arrays", () => {
		it("flattens one level by default", () => {
			const result = flatten([[1, 2], [3, 4], [5]])
			expect(result).toEqual([1, 2, 3, 4, 5])
		})

		it("flattens to specified depth", () => {
			const nested = [1, [2, [3, [4]]]]
			expect(flatten(nested, 1)).toEqual([1, 2, [3, [4]]])
			expect(flatten(nested, 2)).toEqual([1, 2, 3, [4]])
			expect(flatten(nested, 3)).toEqual([1, 2, 3, 4])
		})

		it("flattens deeply with Infinity", () => {
			const deeplyNested = [1, [2, [3, [4, [5, [6]]]]]]
			const result = flatten(deeplyNested, Infinity)
			expect(result).toEqual([1, 2, 3, 4, 5, 6])
		})

		it("handles empty arrays", () => {
			expect(flatten([])).toEqual([])
			expect(flatten([[], [], []])).toEqual([])
		})

		it("handles mixed content", () => {
			const mixed = [1, [2, 3], [[4]], 5]
			expect(flatten(mixed)).toEqual([1, 2, 3, [4], 5])
		})

		it("preserves non-array elements", () => {
			const result = flatten([1, 2, [3, 4], 5])
			expect(result).toEqual([1, 2, 3, 4, 5])
		})

		it("handles arrays with nullish values", () => {
			const result = flatten([null, [undefined, 1], [2, null]])
			expect(result).toEqual([null, undefined, 1, 2, null])
		})
	})

	describe("when reducing arrays", () => {
		it("accumulates values from left to right", () => {
			const sum = (acc: number, val: number) => acc + val
			const result = reduce(sum, 0)([1, 2, 3, 4])
			expect(result).toBe(10)
		})

		it("works with different accumulator types", () => {
			const concat = (acc: string, val: number) => acc + val
			const result = reduce(concat, "")([1, 2, 3])
			expect(result).toBe("123")
		})

		it("builds objects from arrays", () => {
			const toObject = (
				acc: Record<string, number>,
				[key, val]: [string, number],
			) => ({ ...acc, [key]: val })
			const pairs: Array<[string, number]> = [["a", 1], ["b", 2], ["c", 3]]
			const result = reduce(toObject, {})(pairs)
			expect(result).toEqual({ a: 1, b: 2, c: 3 })
		})

		it("handles empty arrays with initial value", () => {
			const sum = (acc: number, val: number) => acc + val
			const result = reduce(sum, 10)([])
			expect(result).toBe(10)
		})

		it("passes index as third argument", () => {
			const withIndex = (acc: Array<string>, val: string, idx: number) => [
				...acc,
				`${val}-${idx}`,
			]
			const result = reduce(withIndex, [] as Array<string>)(["a", "b", "c"])
			expect(result).toEqual(["a-0", "b-1", "c-2"])
		})

		it("can implement other array methods", () => {
			const filter = <T>(
				predicate: (val: T) => boolean,
			) => (arr: Array<T>) =>
				reduce(
					(acc: Array<T>, val: T) =>
						predicate(val) ? [...acc, val] : acc,
					[] as Array<T>,
				)(arr)

			const isEven = (n: number) => n % 2 === 0
			const result = filter(isEven)([1, 2, 3, 4, 5])
			expect(result).toEqual([2, 4])
		})
	})

	describe("when reversing arrays", () => {
		it("reverses element order", () => {
			const result = reverse([1, 2, 3, 4, 5])
			expect(result).toEqual([5, 4, 3, 2, 1])
		})

		it("handles empty arrays", () => {
			const result = reverse([])
			expect(result).toEqual([])
		})

		it("handles single element arrays", () => {
			const result = reverse([42])
			expect(result).toEqual([42])
		})

		it("handles two element arrays", () => {
			const result = reverse([1, 2])
			expect(result).toEqual([2, 1])
		})

		it("does not mutate original array", () => {
			const original = [1, 2, 3]
			const result = reverse(original)
			expect(original).toEqual([1, 2, 3])
			expect(result).not.toBe(original)
		})

		it("works with different types", () => {
			expect(reverse(["a", "b", "c"])).toEqual(["c", "b", "a"])
			expect(reverse([true, false, true])).toEqual([true, false, true])
		})

		it("is involutive (reversing twice returns original)", () => {
			const original = [1, 2, 3, 4, 5]
			const result = reverse(reverse(original))
			expect(result).toEqual(original)
		})
	})

	describe("when sorting arrays", () => {
		it("sorts numbers in ascending order by default", () => {
			const result = sort()([3, 1, 4, 1, 5, 9, 2, 6])
			expect(result).toEqual([1, 1, 2, 3, 4, 5, 6, 9])
		})

		it("sorts with custom comparator", () => {
			const descending = (a: number, b: number) => b - a
			const result = sort(descending)([3, 1, 4, 1, 5])
			expect(result).toEqual([5, 4, 3, 1, 1])
		})

		it("sorts strings alphabetically", () => {
			const result = sort()(["banana", "apple", "cherry"])
			expect(result).toEqual(["apple", "banana", "cherry"])
		})

		it("sorts objects by property", () => {
			const users = [
				{ name: "Charlie", age: 30 },
				{ name: "Alice", age: 25 },
				{ name: "Bob", age: 35 },
			]
			const byAge = (a: { age: number }, b: { age: number }) => a.age - b.age
			const result = sort(byAge)(users)
			expect(result).toEqual([
				{ name: "Alice", age: 25 },
				{ name: "Charlie", age: 30 },
				{ name: "Bob", age: 35 },
			])
		})

		it("handles empty arrays", () => {
			const result = sort()([])
			expect(result).toEqual([])
		})

		it("does not mutate original array", () => {
			const original = [3, 1, 2]
			const result = sort()(original)
			expect(original).toEqual([3, 1, 2])
			expect(result).not.toBe(original)
		})

		it("maintains stability for equal elements", () => {
			const items = [
				{ id: 1, value: 2 },
				{ id: 2, value: 1 },
				{ id: 3, value: 2 },
			]
			const byValue = (
				a: { value: number },
				b: { value: number },
			) => a.value - b.value
			const result = sort(byValue)(items)
			expect(result[1].id).toBe(1)
			expect(result[2].id).toBe(3)
		})
	})

	describe("when concatenating arrays", () => {
		it("combines two arrays", () => {
			const result = concat([3, 4])([1, 2])
			expect(result).toEqual([1, 2, 3, 4])
		})

		it("handles empty arrays", () => {
			expect(concat([2, 3])([1])).toEqual([1, 2, 3])
			expect(concat([])([1, 2])).toEqual([1, 2])
			expect(concat([1, 2])([])).toEqual([1, 2])
		})

		it("preserves types", () => {
			const strings = concat(["c", "d"])(["a", "b"])
			expect(strings).toEqual(["a", "b", "c", "d"])
		})

		it("does not mutate original arrays", () => {
			const arr1 = [1, 2]
			const arr2 = [3, 4]
			const result = concat(arr2)(arr1)
			expect(arr1).toEqual([1, 2])
			expect(arr2).toEqual([3, 4])
			expect(result).toEqual([1, 2, 3, 4])
		})

		it("handles arrays with mixed types when types match", () => {
			const mixed1 = [1, "a", true]
			const mixed2 = [2, "b", false]
			const result = concat(mixed2)(mixed1)
			expect(result).toEqual([1, "a", true, 2, "b", false])
		})
	})

	describe("when joining array elements", () => {
		it("joins with comma separator", () => {
			const result = join(",")(["1", "2", "3"])
			expect(result).toBe("1,2,3")
		})

		it("joins with custom separator", () => {
			const result = join(" - ")(["a", "b", "c"])
			expect(result).toBe("a - b - c")
		})

		it("handles empty separator", () => {
			const result = join("")(["1", "2", "3"])
			expect(result).toBe("123")
		})

		it("handles single element arrays", () => {
			const result = join(", ")(["42"])
			expect(result).toBe("42")
		})

		it("handles empty arrays", () => {
			const result = join(", ")([])
			expect(result).toBe("")
		})

		it("joins various string elements", () => {
			const result = join(", ")(["one", "two", "three"])
			expect(result).toBe("one, two, three")
		})

		it("handles special characters in separator", () => {
			const result = join(" | ")(["a", "b", "c"])
			expect(result).toBe("a | b | c")
		})
	})

	describe("property-based tests", () => {
		it("map preserves array length", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.func(fc.anything()),
					(arr, fn) => {
						const mapped = map(fn)(arr)
						expect(mapped.length).toBe(arr.length)
					},
				),
			)
		})

		it("map with identity returns original values", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					const identity = (x: unknown) => x
					const mapped = map(identity)(arr)
					expect(mapped).toEqual(arr)
				}),
			)
		})

		it("map composition law", () => {
			fc.assert(
				fc.property(fc.array(fc.integer()), (arr) => {
					const f = (x: number) => x * 2
					const g = (x: number) => x + 1
					const composed = map((x: number) => g(f(x)))(arr)
					const sequential = map(g)(map(f)(arr))
					expect(composed).toEqual(sequential)
				}),
			)
		})

		it("reduce with empty array returns initial value", () => {
			fc.assert(
				fc.property(
					fc.anything(),
					fc.func(fc.anything()),
					(initial, fn) => {
						const result = reduce(fn)(initial)([])
						expect(result).toBe(initial)
					},
				),
			)
		})

		it("flatten reduces nesting level by specified depth", () => {
			fc.assert(
				fc.property(
					fc.array(fc.array(fc.array(fc.integer()))),
					(arr) => {
						const flattened1 = flatten(1)(arr)
						const allFlat = flattened1.every(item =>
							!Array.isArray(item) || item.every(x => !Array.isArray(x))
						)
						expect(allFlat).toBe(true)
					},
				),
			)
		})

		it("reverse is involutive", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					const reversed = reverse(reverse(arr))
					expect(reversed).toEqual(arr)
				}),
			)
		})

		it("reverse preserves length", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					const reversed = reverse(arr)
					expect(reversed.length).toBe(arr.length)
				}),
			)
		})

		it("sort preserves length", () => {
			fc.assert(
				fc.property(fc.array(fc.integer()), (arr) => {
					const sorted = sort()(arr)
					expect(sorted.length).toBe(arr.length)
				}),
			)
		})

		it("sort is idempotent", () => {
			fc.assert(
				fc.property(fc.array(fc.integer()), (arr) => {
					const compareFn = (a: number, b: number) => a - b
					const once = sort(compareFn)(arr)
					const twice = sort(compareFn)(once)
					expect(twice).toEqual(once)
				}),
			)
		})

		it("concat is associative", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.array(fc.anything()),
					fc.array(fc.anything()),
					(a, b, c) => {
						const left = concat(concat(a)(b))(c)
						const right = concat(a)(concat(b)(c))
						expect(left).toEqual(right)
					},
				),
			)
		})

		it("concat preserves total length", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.array(fc.anything()),
					(a, b) => {
						const result = concat(a)(b)
						expect(result.length).toBe(a.length + b.length)
					},
				),
			)
		})

		it("join on empty array returns empty string", () => {
			fc.assert(
				fc.property(fc.string(), (separator) => {
					const result = join(separator)([])
					expect(result).toBe("")
				}),
			)
		})

		it("flatMap is equivalent to map then flatten", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(arr) => {
						const fn = (x: number) => [x, x * 2]
						const flatMapped = flatMap(fn)(arr)
						const mapThenFlatten = flatten(1)(map(fn)(arr))
						expect(flatMapped).toEqual(mapThenFlatten)
					},
				),
			)
		})

		it("reduce processes elements left to right", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1, maxLength: 10 }),
					(arr) => {
						const reducer = (acc: Array<number>, val: number) => [...acc, val]
						const result = reduce(reducer)([])(arr)
						expect(result).toEqual(arr)
					},
				),
			)
		})

		it("sort produces ordered result", () => {
			fc.assert(
				fc.property(fc.array(fc.integer()), (arr) => {
					const sorted = sort((a, b) => a - b)(arr)
					for (let i = 1; i < sorted.length; i++) {
						expect(sorted[i - 1]).toBeLessThanOrEqual(sorted[i])
					}
				}),
			)
		})
	})
})