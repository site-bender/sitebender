import * as fc from "fast-check"
import { expect } from "jsr:@std/expect"
import { describe, it } from "jsr:@std/testing/bdd"

import times from "../../../../src/simple/array/times/index.ts"

describe("times", () => {
	describe("behavioral tests", () => {
		it("generates array with indices", () => {
			const result = times(5)((i: number) => i)
			expect(result).toEqual([0, 1, 2, 3, 4])
		})

		it("generates array with squared indices", () => {
			const result = times(5)((i: number) => i * i)
			expect(result).toEqual([0, 1, 4, 9, 16])
		})

		it("generates array of constants", () => {
			const result = times(3)(() => "hello")
			expect(result).toEqual(["hello", "hello", "hello"])
		})

		it("handles zero count", () => {
			const result = times(0)((i: number) => i)
			expect(result).toEqual([])
		})

		it("handles negative count", () => {
			const result = times(-5)((i: number) => i)
			expect(result).toEqual([])
		})

		it("handles NaN count", () => {
			const result = times(NaN)((i: number) => i)
			expect(result).toEqual([])
		})

		it("handles Infinity count", () => {
			const result = times(Infinity)((i: number) => i)
			expect(result).toEqual([])
		})

		it("handles negative Infinity count", () => {
			const result = times(-Infinity)((i: number) => i)
			expect(result).toEqual([])
		})

		it("handles null count", () => {
			const result = times(null as any)((i: number) => i)
			expect(result).toEqual([])
		})

		it("handles undefined count", () => {
			const result = times(undefined as any)((i: number) => i)
			expect(result).toEqual([])
		})

		it("truncates fractional counts", () => {
			const result = times(3.7)((i: number) => i)
			expect(result).toEqual([0, 1, 2])
			
			const result2 = times(2.1)((i: number) => i * 2)
			expect(result2).toEqual([0, 2])
		})

		it("generates IDs with offset", () => {
			const result = times(4)((i: number) => `id-${i + 1}`)
			expect(result).toEqual(["id-1", "id-2", "id-3", "id-4"])
		})

		it("generates objects", () => {
			const result = times(3)((i: number) => ({ id: i, value: i * 10 }))
			expect(result).toEqual([
				{ id: 0, value: 0 },
				{ id: 1, value: 10 },
				{ id: 2, value: 20 },
			])
		})

		it("generates powers of 2", () => {
			const result = times(8)((i: number) => Math.pow(2, i))
			expect(result).toEqual([1, 2, 4, 8, 16, 32, 64, 128])
		})

		it("generates fibonacci sequence", () => {
			let prev = 0
			let curr = 1
			const result = times(7)(() => {
				const temp = prev
				prev = curr
				curr = temp + curr
				return temp
			})
			expect(result).toEqual([0, 1, 1, 2, 3, 5, 8])
		})

		it("passes correct index to function", () => {
			const indices: number[] = []
			times(5)((i: number) => {
				indices.push(i)
				return i
			})
			expect(indices).toEqual([0, 1, 2, 3, 4])
		})

		it("can generate random numbers", () => {
			const result = times(5)(() => Math.random())
			expect(result.length).toBe(5)
			// All should be numbers between 0 and 1
			result.forEach(n => {
				expect(typeof n).toBe("number")
				expect(n).toBeGreaterThanOrEqual(0)
				expect(n).toBeLessThan(1)
			})
		})

		it("can generate dates", () => {
			const baseDate = new Date("2024-01-01")
			const result = times(7)((i: number) => {
				const date = new Date(baseDate)
				date.setDate(date.getDate() + i)
				return date.toISOString().split("T")[0]
			})
			expect(result).toEqual([
				"2024-01-01",
				"2024-01-02",
				"2024-01-03",
				"2024-01-04",
				"2024-01-05",
				"2024-01-06",
				"2024-01-07",
			])
		})

		it("can generate alphabet letters", () => {
			const result = times(5)((i: number) => String.fromCharCode(65 + i))
			expect(result).toEqual(["A", "B", "C", "D", "E"])
		})

		it("handles single iteration", () => {
			const result = times(1)((i: number) => i * 100)
			expect(result).toEqual([0])
		})

		it("can generate null and undefined", () => {
			const result = times(4)((i: number) => i % 2 === 0 ? null : undefined)
			expect(result).toEqual([null, undefined, null, undefined])
		})

		it("can generate nested arrays", () => {
			const result = times(3)((i: number) => times(3)((j: number) => i * 3 + j))
			expect(result).toEqual([
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
			])
		})

		it("currying works correctly", () => {
			const timesFive = times(5)
			const result1 = timesFive((i: number) => i)
			const result2 = times(5)((i: number) => i)
			expect(result1).toEqual(result2)
		})

		it("function can throw without affecting times", () => {
			let callCount = 0
			const fn = (i: number) => {
				callCount++
				if (i === 2) throw new Error("test error")
				return i
			}
			
			expect(() => times(5)(fn)).toThrow("test error")
			expect(callCount).toBe(3) // Called for 0, 1, 2 (throws)
		})
	})

	describe("property-based tests", () => {
		it("always returns array of correct length", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 0, max: 100 }),
					(n) => {
						const result = times(n)((i: number) => i)
						return result.length === n
					},
				),
			)
		})

		it("always passes correct indices", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 100 }),
					(n) => {
						const result = times(n)((i: number) => i)
						return result.every((val, idx) => val === idx)
					},
				),
			)
		})

		it("handles various return types", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 0, max: 50 }),
					fc.func(fc.anything()),
					(n, fn) => {
						const result = times(n)(fn)
						return Array.isArray(result) && result.length === n
					},
				),
			)
		})

		it("negative numbers always return empty array", () => {
			fc.assert(
				fc.property(
					fc.integer({ max: -1 }),
					(n) => {
						const result = times(n)((i: number) => i)
						return result.length === 0
					},
				),
			)
		})

		it("fractional numbers are truncated", () => {
			fc.assert(
				fc.property(
					fc.double({ min: 0, max: 100, noNaN: true }),
					(n) => {
						const result = times(n)((i: number) => i)
						return result.length === Math.floor(n)
					},
				),
			)
		})

		it("function is called exactly n times", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 0, max: 100 }),
					(n) => {
						let callCount = 0
						times(n)(() => callCount++)
						return callCount === n
					},
				),
			)
		})

		it("results maintain function's return values", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 50 }),
					(n) => {
						const fn = (i: number) => ({ index: i, value: i * 2 })
						const result = times(n)(fn)
						return result.every((item, idx) => 
							item.index === idx && item.value === idx * 2
						)
					},
				),
			)
		})

		it("curried function can be reused", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 0, max: 50 }),
					(n) => {
						const timesN = times(n)
						const result1 = timesN((i: number) => i)
						const result2 = timesN((i: number) => i * 2)
						
						return result1.length === n && 
							result2.length === n &&
							result1.every((val, idx) => val === idx) &&
							result2.every((val, idx) => val === idx * 2)
					},
				),
			)
		})
	})
})