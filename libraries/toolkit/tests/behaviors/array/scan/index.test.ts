import { assertEquals } from "jsr:@std/assert@1"
import { describe, it } from "jsr:@std/testing@1/bdd"
import * as fc from "npm:fast-check@3"

import scan from "../../../../src/simple/array/scan/index.ts"

describe("scan", () => {
	describe("behavioral tests", () => {
		it("should return [initial] for null input", () => {
			assertEquals(scan((acc: number, n: number) => acc + n)(0)(null), [0])
		})

		it("should return [initial] for undefined input", () => {
			assertEquals(scan((acc: number, n: number) => acc + n)(10)(undefined), [
				10,
			])
		})

		it("should return [initial] for empty array", () => {
			assertEquals(scan((acc: number, n: number) => acc + n)(5)([]), [5])
		})

		it("should compute running sum", () => {
			const result = scan((acc: number, n: number) => acc + n)(0)([1, 2, 3, 4])
			assertEquals(result, [0, 1, 3, 6, 10])
		})

		it("should compute running product", () => {
			const result = scan((acc: number, n: number) => acc * n)(1)([2, 3, 4])
			assertEquals(result, [1, 2, 6, 24])
		})

		it("should build strings progressively", () => {
			const result = scan((acc: string, char: string) => acc + char)("")([
				"h",
				"e",
				"l",
				"l",
				"o",
			])
			assertEquals(result, ["", "h", "he", "hel", "hell", "hello"])
		})

		it("should track maximum so far", () => {
			const result = scan((max: number, n: number) => Math.max(max, n))(
				-Infinity,
			)([3, 1, 4, 1, 5])
			assertEquals(result, [-Infinity, 3, 3, 4, 4, 5])
		})

		it("should build array progressively", () => {
			const result = scan((acc: Array<number>, n: number) =>
				n % 2 === 0 ? [...acc, n] : acc
			)([])([1, 2, 3, 4, 5])
			assertEquals(result, [[], [], [2], [2], [2, 4], [2, 4]])
		})

		it("should compute Fibonacci sequence", () => {
			const result = scan(([a, b]: [number, number]) => [b, a + b])([0, 1])(
				Array(8).fill(0),
			)
			assertEquals(result, [
				[0, 1],
				[1, 1],
				[1, 2],
				[2, 3],
				[3, 5],
				[5, 8],
				[8, 13],
				[13, 21],
				[21, 34],
			])
		})

		it("should handle state machine transitions", () => {
			type State = "idle" | "loading" | "success" | "error"
			type Action = "fetch" | "succeed" | "fail" | "reset"

			const transition = (state: State, action: Action): State => {
				switch (state) {
					case "idle":
						return action === "fetch" ? "loading" : state
					case "loading":
						return action === "succeed"
							? "success"
							: action === "fail"
							? "error"
							: state
					case "success":
					case "error":
						return action === "reset" ? "idle" : state
					default:
						return state
				}
			}

			const result = scan(transition)("idle")([
				"fetch",
				"succeed",
				"reset",
				"fetch",
				"fail",
			])
			assertEquals(result, [
				"idle",
				"loading",
				"success",
				"idle",
				"loading",
				"error",
			])
		})

		it("should pass index to accumulator function", () => {
			const indices: Array<number> = []
			scan((acc: number, n: number, index?: number) => {
				if (index !== undefined) indices.push(index)
				return acc + n
			})(0)([1, 2, 3])
			assertEquals(indices, [0, 1, 2])
		})

		it("should handle single element array", () => {
			const result = scan((acc: number, n: number) => acc + n)(10)([5])
			assertEquals(result, [10, 15])
		})

		it("should work with different initial types", () => {
			// String initial
			const strResult = scan((acc: string, n: number) => acc + n)("sum: ")([
				1,
				2,
				3,
			])
			assertEquals(strResult, ["sum: ", "sum: 1", "sum: 12", "sum: 123"])

			// Boolean initial
			const boolResult = scan((acc: boolean, n: number) => acc || n > 3)(false)(
				[1, 2, 4, 2],
			)
			assertEquals(boolResult, [false, false, false, true, true])

			// Object initial
			const objResult = scan((acc: { sum: number }, n: number) => ({
				sum: acc.sum + n,
			}))({ sum: 0 })([1, 2, 3])
			assertEquals(objResult, [{ sum: 0 }, { sum: 1 }, { sum: 3 }, { sum: 6 }])
		})

		it("should handle NaN in calculations", () => {
			const result = scan((acc: number, n: number) => acc + n)(0)([1, NaN, 2])
			assertEquals(result[0], 0)
			assertEquals(result[1], 1)
			assertEquals(Number.isNaN(result[2]), true)
			assertEquals(Number.isNaN(result[3]), true)
		})

		it("should handle infinity", () => {
			const result = scan((acc: number, n: number) => acc + n)(0)([
				1,
				Infinity,
				2,
			])
			assertEquals(result, [0, 1, Infinity, Infinity])
		})

		it("should handle arrays with mixed types", () => {
			const result = scan((acc: string, item: any) => acc + String(item))("")([
				1,
				"a",
				true,
				null,
			])
			assertEquals(result, ["", "1", "1a", "1atrue", "1atruenull"])
		})

		it("should be pure (same result for same inputs)", () => {
			const scanner = scan((acc: number, n: number) => acc * n)(1)
			const input = [2, 3, 4]
			const result1 = scanner(input)
			const result2 = scanner(input)
			assertEquals(result1, result2)
			assertEquals(result1, [1, 2, 6, 24])
		})

		it("should not mutate original array", () => {
			const input = [1, 2, 3]
			const inputCopy = [...input]
			scan((acc: number, n: number) => acc + n)(0)(input)
			assertEquals(input, inputCopy)
		})

		it("should handle reducer that throws", () => {
			let errorThrown = false
			try {
				scan((acc: number, n: number) => {
					if (n === 3) throw new Error("test error")
					return acc + n
				})(0)([1, 2, 3, 4])
			} catch {
				errorThrown = true
			}
			assertEquals(errorThrown, true)
		})

		it("should handle deeply nested structures", () => {
			type Nested = { value: number; children: Nested[] }
			const result = scan((acc: Nested[], item: number): Nested[] => [
				...acc,
				{ value: item, children: [] },
			])([])([1, 2, 3])

			assertEquals(result.length, 4)
			assertEquals(result[0], [])
			assertEquals(result[1], [{ value: 1, children: [] }])
			assertEquals(result[2], [
				{ value: 1, children: [] },
				{ value: 2, children: [] },
			])
			assertEquals(result[3], [
				{ value: 1, children: [] },
				{ value: 2, children: [] },
				{ value: 3, children: [] },
			])
		})
	})

	describe("property-based tests", () => {
		it("should always start with initial value", () => {
			fc.assert(
				fc.property(
					fc.array(fc.anything()),
					fc.anything(),
					(arr, initial) => {
						const result = scan((acc: any, item: any) => item)(initial)(arr)
						return result[0] === initial
					},
				),
			)
		})

		it("should return array of length array.length + 1", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.integer(),
					(arr, initial) => {
						const result = scan((acc: number, n: number) => acc + n)(initial)(
							arr,
						)
						return result.length === arr.length + 1
					},
				),
			)
		})

		it("should have last element equal to reduce result", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1 }),
					fc.integer(),
					(arr, initial) => {
						const scanResult = scan((acc: number, n: number) => acc + n)(
							initial,
						)(arr)
						const reduceResult = arr.reduce((acc, n) => acc + n, initial)
						return scanResult[scanResult.length - 1] === reduceResult
					},
				),
			)
		})

		it("should be curried correctly", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					fc.integer(),
					(arr, initial) => {
						const fn = (acc: number, n: number) => acc + n
						const partial1 = scan(fn)
						const partial2 = partial1(initial)
						const result1 = partial2(arr)
						const result2 = scan(fn)(initial)(arr)
						return JSON.stringify(result1) === JSON.stringify(result2)
					},
				),
			)
		})

		it("should preserve accumulator type throughout", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer()),
					(arr) => {
						// String accumulator should stay string
						const result = scan((acc: string, n: number) => acc + n)("start")(
							arr,
						)
						return result.every((item) => typeof item === "string")
					},
				),
			)
		})

		it("should handle empty arrays consistently", () => {
			fc.assert(
				fc.property(
					fc.anything(),
					(initial) => {
						const result = scan((acc: any, item: any) => item)(initial)([])
						return result.length === 1 && result[0] === initial
					},
				),
			)
		})

		it("should process elements in order", () => {
			fc.assert(
				fc.property(
					fc.array(fc.integer(), { minLength: 1, maxLength: 20 }),
					(arr) => {
						const processedIndices: number[] = []
						scan((acc: number, item: number, index?: number) => {
							if (index !== undefined) processedIndices.push(index)
							return acc
						})(0)(arr)

						// Indices should be in ascending order
						for (let i = 1; i < processedIndices.length; i++) {
							if (processedIndices[i] <= processedIndices[i - 1]) {
								return false
							}
						}
						return true
					},
				),
			)
		})
	})
})
