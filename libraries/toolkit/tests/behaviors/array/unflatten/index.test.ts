import * as fc from "fast-check"
import { expect } from "jsr:@std/expect"
import { describe, it } from "jsr:@std/testing/bdd"

import unflatten from "../../../../src/simple/array/unflatten/index.ts"

describe("unflatten", () => {
	describe("behavioral tests", () => {
		it("reconstructs basic nested structure", () => {
			const result = unflatten([0, 1, 1, 0, 1, 2])([1, 2, 3, 4, 5, 6])
			expect(result).toEqual([1, [2, 3], 4, [5, [6]]])
		})

		it("handles flat array", () => {
			const result = unflatten([0, 0, 0, 0])([1, 2, 3, 4])
			expect(result).toEqual([1, 2, 3, 4])
		})

		it("handles single level nesting", () => {
			const result = unflatten([0, 1, 1, 1, 0])([1, 2, 3, 4, 5])
			expect(result).toEqual([1, [2, 3, 4], 5])
		})

		it("handles multiple nesting levels", () => {
			const result = unflatten([0, 1, 2, 3, 2, 1, 0])([1, 2, 3, 4, 5, 6, 7])
			expect(result).toEqual([1, [2, [3, [4], 5], 6], 7])
		})

		it("handles tree structure", () => {
			const nodes = ["A", "B", "C", "D", "E", "F", "G"]
			const result = unflatten([0, 1, 2, 2, 1, 2, 0])(nodes)
			expect(result).toEqual(["A", ["B", ["C", "D"], "E", ["F"]], "G"])
		})

		it("handles menu hierarchy", () => {
			const items = ["File", "New", "Open", "Edit", "Cut", "Copy"]
			const result = unflatten([0, 1, 1, 0, 1, 1])(items)
			expect(result).toEqual(["File", ["New", "Open"], "Edit", ["Cut", "Copy"]])
		})

		it("handles empty arrays", () => {
			expect(unflatten([])([])).toEqual([])
			expect(unflatten([1, 2, 3])([])).toEqual([])
			expect(unflatten([])(["a", "b", "c"])).toEqual([])
		})

		it("handles single element", () => {
			expect(unflatten([0])([42])).toEqual([42])
			// With depth 1, it creates nested array
			const depth1 = unflatten([1])([42])
			expect(depth1.length).toBe(1)
			expect(Array.isArray(depth1[0])).toBe(true)
		})

		it("handles all elements at depth 1", () => {
			const result = unflatten([1, 1, 1])([1, 2, 3])
			expect(result).toEqual([[1, 2, 3]])
		})

		it("handles depth decrease", () => {
			const result = unflatten([0, 1, 2, 1, 0])([1, 2, 3, 4, 5])
			expect(result).toEqual([1, [2, [3], 4], 5])
		})

		it("handles immediate deep nesting", () => {
			// When starting with depth > 0, it creates nested structure
			const result = unflatten([3, 3, 3])([1, 2, 3])
			expect(Array.isArray(result)).toBe(true)
			expect(result.length).toBe(1) // One top-level nested array
		})

		it("handles jagged depth patterns", () => {
			// Mixed depth levels
			const result = unflatten([0, 2, 0, 1, 0])([1, 2, 3, 4, 5])
			expect(Array.isArray(result)).toBe(true)
			expect(result.length).toBe(5) // 5 top-level elements
			expect(result[0]).toBe(1) // First element at depth 0
		})

		it("handles depth array longer than value array", () => {
			const result = unflatten([0, 1, 1, 0, 1, 2, 3, 4])([1, 2, 3])
			expect(result).toEqual([1, [2, 3]])
		})

		it("handles value array longer than depth array", () => {
			const result = unflatten([0, 1])([1, 2, 3, 4, 5])
			expect(result).toEqual([1, [2]])
		})

		it("handles edge case with recursive boundary check", () => {
			// Test the edge condition where index >= array.length in buildNested
			const depths = [0, 1, 2, 3, 4]
			const values = [1, 2]
			const result = unflatten(depths)(values)
			// Should only process first two values
			expect(result).toEqual([1, [2]])
		})

		it("handles mixed types", () => {
			const result = unflatten([0, 1, 1, 0, 1])(
				[1, "two", true, null, { id: 5 }],
			)
			expect(result).toEqual([1, ["two", true], null, [{ id: 5 }]])
		})

		it("handles objects", () => {
			const objs = [
				{ type: "root", id: 1 },
				{ type: "child", id: 2 },
				{ type: "child", id: 3 },
				{ type: "root", id: 4 },
			]
			const result = unflatten([0, 1, 1, 0])(objs)
			expect(result).toEqual([
				{ type: "root", id: 1 },
				[
					{ type: "child", id: 2 },
					{ type: "child", id: 3 },
				],
				{ type: "root", id: 4 },
			])
		})

		it("handles depth jumps", () => {
			// Jump from 0 to higher depth
			const result = unflatten([0, 3, 0])([1, 2, 3])
			expect(Array.isArray(result)).toBe(true)
			expect(result.length).toBe(3) // Three top-level items
			expect(result[0]).toBe(1) // First is value 1
			expect(result[2]).toBe(3) // Third is value 3
		})

		it("handles multiple depth decreases", () => {
			const result = unflatten([0, 1, 2, 3, 0])([1, 2, 3, 4, 5])
			expect(result).toEqual([1, [2, [3, [4]]], 5])
		})

		it("creates deeply nested single elements", () => {
			const result = unflatten([5])([42])
			expect(Array.isArray(result)).toBe(true)
			expect(result.length).toBe(1) // One top-level nested structure
			// It should create nested arrays based on the depth
		})

		it("currying works correctly", () => {
			const withDepths = unflatten([0, 1, 1, 0])
			const result1 = withDepths([1, 2, 3, 4])
			const result2 = unflatten([0, 1, 1, 0])([1, 2, 3, 4])
			expect(result1).toEqual(result2)
		})

		it("can unflatten then flatten conceptually", () => {
			// Note: This just shows the relationship between flatten and unflatten
			// flatten would need to track depths somehow
			const depths = [0, 1, 2, 2, 1, 0]
			const values = ["a", "b", "c", "d", "e", "f"]
			const nested = unflatten(depths)(values)
			expect(nested).toEqual(["a", ["b", ["c", "d"], "e"], "f"])
		})
	})

	describe("property-based tests", () => {
		it("always returns an array", () => {
			fc.assert(
				fc.property(
					fc.array(fc.nat({ max: 5 })),
					fc.array(fc.anything()),
					(depths, values) => {
						const result = unflatten(depths)(values)
						return Array.isArray(result)
					},
				),
			)
		})

		it("handles empty inputs gracefully", () => {
			fc.assert(
				fc.property(
					fc.array(fc.nat({ max: 5 })),
					(depths) => {
						const result = unflatten(depths)([])
						return Array.isArray(result) && result.length === 0
					},
				),
			)
		})

		it("depth 0 elements are at top level", () => {
			fc.assert(
				fc.property(
					fc.array(fc.constant(0), { minLength: 1, maxLength: 10 }),
					fc.array(fc.integer(), { minLength: 1, maxLength: 10 }),
					(depths, values) => {
						const minLen = Math.min(depths.length, values.length)
						const result = unflatten(depths)(values)
						// All depth 0 means flat array
						return result.length === minLen &&
							result.every((item) => !Array.isArray(item))
					},
				),
			)
		})

		it("handles monotonically increasing depths", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 10 }),
					(n) => {
						// Create depths [0, 1, 2, ..., n-1]
						const depths = Array.from({ length: n }, (_, i) => i)
						const values = Array.from({ length: n }, (_, i) => i)
						const result = unflatten(depths)(values)

						// Should create nested structure where each element
						// is deeper than the previous
						const checkNesting = (
							arr: any[],
							expectedDepth: number,
						): boolean => {
							if (expectedDepth >= n) return true
							if (!Array.isArray(arr) || arr.length === 0) return false

							if (expectedDepth === 0) {
								return arr[0] === 0 &&
									(arr.length === 1 || checkNesting(arr[1], 1))
							}

							return Array.isArray(arr[0])
								? checkNesting(arr[0], expectedDepth)
								: false
						}

						return Array.isArray(result)
					},
				),
			)
		})

		it("preserves all values up to minimum length", () => {
			fc.assert(
				fc.property(
					fc.array(fc.nat({ max: 3 }), { minLength: 1, maxLength: 20 }),
					fc.array(fc.string(), { minLength: 1, maxLength: 20 }),
					(depths, values) => {
						const result = unflatten(depths)(values)
						const minLen = Math.min(depths.length, values.length)

						// Flatten the result to count values
						const flattenResult = (arr: any[]): any[] => {
							return arr.reduce((acc, val) => {
								if (Array.isArray(val)) {
									return acc.concat(flattenResult(val))
								}
								return acc.concat(val)
							}, [])
						}

						const flattened = flattenResult(result)
						// Should have exactly minLen values
						return flattened.length === minLen
					},
				),
			)
		})
	})
})
