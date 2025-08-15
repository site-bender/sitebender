import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import * as fc from "fast-check"
import reverse from "../../../array/reverse/index.ts"
import compact from "../../../array/compact/index.ts"
import unique from "../../../array/unique/index.ts"
import concat from "../../../array/concat/index.ts"
import flatten from "../../../array/flatten/index.ts"
import sort from "../../../array/sort/index.ts"
import map from "../../../array/map/index.ts"
import filter from "../../../array/filter/index.ts"
import take from "../../../array/take/index.ts"
import drop from "../../../array/drop/index.ts"
import slice from "../../../array/slice/index.ts"

describe("Array Operation Properties", () => {
	describe("reverse properties", () => {
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

		it("first element becomes last and vice versa", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything(), { minLength: 1 }),
					(arr) => {
						const reversed = reverse(arr)
						expect(reversed[0]).toEqual(arr[arr.length - 1])
						expect(reversed[reversed.length - 1]).toEqual(arr[0])
					},
				),
			)
		})
	})

	describe("compact properties", () => {
		it("compact never increases array length", () => {
			fc.assert(
				fc.property(
					fc.array(fc.option(fc.anything(), { nil: undefined })),
					(arr) => {
						const compacted = compact(arr)
						expect(compacted.length).toBeLessThanOrEqual(arr.length)
					},
				),
			)
		})

		it("compact removes all null and undefined", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					const compacted = compact(arr)
					expect(compacted.includes(null)).toBe(false)
					expect(compacted.includes(undefined)).toBe(false)
				}),
			)
		})

		it("compact preserves order", () => {
			fc.assert(
				fc.property(fc.array(fc.integer()), (arr) => {
					const withNulls = arr.flatMap((n) =>
						n % 2 === 0 ? [n] : [n, null],
					)
					const compacted = compact(withNulls)
					expect(compacted).toEqual(arr)
				}),
			)
		})
	})

	describe("unique properties", () => {
		it("unique maintains or reduces array length", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					const uniqueArr = unique(arr)
					expect(uniqueArr.length).toBeLessThanOrEqual(arr.length)
				}),
			)
		})

		it("unique result has no duplicates", () => {
			fc.assert(
				fc.property(fc.array(fc.integer()), (arr) => {
					const uniqueArr = unique(arr)
					const set = new Set(uniqueArr)
					expect(uniqueArr.length).toBe(set.size)
				}),
			)
		})

		it("unique preserves first occurrence order", () => {
			fc.assert(
				fc.property(fc.array(fc.integer({ min: 0, max: 10 })), (arr) => {
					const uniqueArr = unique(arr)
					const firstOccurrences = arr.filter(
						(val, idx) => arr.indexOf(val) === idx,
					)
					expect(uniqueArr).toEqual(firstOccurrences)
				}),
			)
		})

		it("unique is idempotent", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					const once = unique(arr)
					const twice = unique(once)
					expect(twice).toEqual(once)
				}),
			)
		})
	})

	describe("concat properties", () => {
		it("concat is associative", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					fc.array(fc.integer()),
					(a, b, c) => {
						const left = concat(c)(concat(b)(a))
						const right = concat(concat(c)(b))(a)
						expect(left).toEqual(right)
					},
				),
			)
		})

		it("concat with empty array is identity", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					expect(concat([])(arr)).toEqual(arr)
					expect(concat(arr)([])).toEqual(arr)
				}),
			)
		})

		it("concat preserves total length", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.array(fc.anything()),
					(a, b) => {
						const result = concat(b)(a)
						expect(result.length).toBe(a.length + b.length)
					},
				),
			)
		})
	})

	describe("flatten properties", () => {
		it("flatten reduces nesting level by 1", () => {
			fc.assert(
				fc.property(fc.array(fc.array(fc.integer())), (arr) => {
					const flattened = flatten(1)(arr)
					const isFlat = flattened.every((item) => !Array.isArray(item))
					expect(isFlat).toBe(true)
				}),
			)
		})

		it("flatten preserves total element count", () => {
			fc.assert(
				fc.property(fc.array(fc.array(fc.integer())), (arr) => {
					const totalElements = arr.reduce(
						(sum, subArr) => sum + subArr.length,
						0,
					)
					const flattened = flatten(1)(arr)
					expect(flattened.length).toBe(totalElements)
				}),
			)
		})

		it("flatten is idempotent on flat arrays", () => {
			fc.assert(
				fc.property(fc.array(fc.integer()), (arr) => {
					const flattened = flatten(1)(arr)
					expect(flattened).toEqual(arr)
				}),
			)
		})
	})

	describe("sort properties", () => {
		it("sort preserves length", () => {
			fc.assert(
				fc.property(fc.array(fc.integer()), (arr) => {
					const sorted = sort()(arr)
					expect(sorted.length).toBe(arr.length)
				}),
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

		it("sort preserves elements (permutation)", () => {
			fc.assert(
				fc.property(fc.array(fc.integer()), (arr) => {
					const sorted = sort()(arr)
					const originalCounts = new Map<number, number>()
					const sortedCounts = new Map<number, number>()

					arr.forEach((val) =>
						originalCounts.set(val, (originalCounts.get(val) || 0) + 1)
					)
					sorted.forEach((val) =>
						sortedCounts.set(val, (sortedCounts.get(val) || 0) + 1)
					)

					expect(sortedCounts).toEqual(originalCounts)
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
	})

	describe("map and filter composition laws", () => {
		it("map preserves array length", () => {
			fc.assert(
				fc.property(fc.array(fc.integer()), (arr) => {
					const mapped = map((x: number) => x * 2)(arr)
					expect(mapped.length).toBe(arr.length)
				}),
			)
		})

		it("map with identity is identity", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					const mapped = map((x: unknown) => x)(arr)
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

		it("filter never increases length", () => {
			fc.assert(
				fc.property(fc.array(fc.integer()), (arr) => {
					const filtered = filter((x: number) => x > 0)(arr)
					expect(filtered.length).toBeLessThanOrEqual(arr.length)
				}),
			)
		})

		it("filter with always true is identity", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					const filtered = filter(() => true)(arr)
					expect(filtered).toEqual(arr)
				}),
			)
		})

		it("filter with always false is empty", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					const filtered = filter(() => false)(arr)
					expect(filtered).toEqual([])
				}),
			)
		})
	})

	describe("take and drop properties", () => {
		it("take and drop partition the array", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.nat(),
					(arr, n) => {
						const taken = take(n)(arr)
						const dropped = drop(n)(arr)
						const combined = concat(dropped)(taken)  // concat takes second array first
						expect(combined).toEqual(arr)
					},
				),
			)
		})

		it("take never exceeds requested length", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), fc.nat(), (arr, n) => {
					const taken = take(n)(arr)
					expect(taken.length).toBeLessThanOrEqual(n)
					expect(taken.length).toBeLessThanOrEqual(arr.length)
				}),
			)
		})

		it("drop reduces length correctly", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), fc.nat(), (arr, n) => {
					const dropped = drop(n)(arr)
					const expectedLength = Math.max(0, arr.length - n)
					expect(dropped.length).toBe(expectedLength)
				}),
			)
		})
	})

	describe("slice properties", () => {
		it("slice with 0 to length is identity", () => {
			fc.assert(
				fc.property(fc.array(fc.anything()), (arr) => {
					const sliced = slice(0)(arr.length)(arr)
					expect(sliced).toEqual(arr)
				}),
			)
		})

		it("slice length is bounded correctly", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.integer(),
					fc.integer(),
					(arr, start, end) => {
						const sliced = slice(start)(end)(arr)
						expect(sliced.length).toBeLessThanOrEqual(arr.length)
						if (start >= 0 && end >= start) {
							expect(sliced.length).toBeLessThanOrEqual(end - start)
						}
					},
				),
			)
		})

		it("slice preserves element order", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 5 }),
					(arr) => {
						const sliced = slice(1)(4)(arr)
						for (let i = 0; i < sliced.length; i++) {
							expect(sliced[i]).toBe(arr[i + 1])
						}
					},
				),
			)
		})
	})
})