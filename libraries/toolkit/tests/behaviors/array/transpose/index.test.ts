import { describe, it } from "jsr:@std/testing/bdd"
import { expect } from "jsr:@std/expect"
import * as fc from "fast-check"

import transpose from "../../../../src/simple/array/transpose/index.ts"

describe("transpose", () => {
	describe("behavioral tests", () => {
		it("transposes a square matrix", () => {
			const matrix = [
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
			]
			const result = transpose(matrix)
			expect(result).toEqual([
				[1, 4, 7],
				[2, 5, 8],
				[3, 6, 9],
			])
		})

		it("transposes a rectangular matrix (more rows)", () => {
			const matrix = [
				[1, 2],
				[3, 4],
				[5, 6],
			]
			const result = transpose(matrix)
			expect(result).toEqual([
				[1, 3, 5],
				[2, 4, 6],
			])
		})

		it("transposes a rectangular matrix (more columns)", () => {
			const matrix = [
				[1, 2, 3, 4],
				[5, 6, 7, 8],
			]
			const result = transpose(matrix)
			expect(result).toEqual([
				[1, 5],
				[2, 6],
				[3, 7],
				[4, 8],
			])
		})

		it("handles jagged arrays with padding", () => {
			const matrix = [
				[1, 2, 3],
				[4, 5],
				[6],
			]
			const result = transpose(matrix)
			expect(result).toEqual([
				[1, 4, 6],
				[2, 5, undefined],
				[3, undefined, undefined],
			])
		})

		it("handles empty array", () => {
			const result = transpose([])
			expect(result).toEqual([])
		})

		it("handles array of empty arrays", () => {
			const result = transpose([[], [], []])
			expect(result).toEqual([])
		})

		it("handles null and undefined", () => {
			expect(transpose(null)).toEqual([])
			expect(transpose(undefined)).toEqual([])
		})

		it("handles single element matrix", () => {
			const result = transpose([[42]])
			expect(result).toEqual([[42]])
		})

		it("handles single row", () => {
			const result = transpose([[1, 2, 3, 4]])
			expect(result).toEqual([[1], [2], [3], [4]])
		})

		it("handles single column", () => {
			const result = transpose([[1], [2], [3], [4]])
			expect(result).toEqual([[1, 2, 3, 4]])
		})

		it("transposes string matrix", () => {
			const matrix = [
				["a", "b", "c"],
				["d", "e", "f"],
			]
			const result = transpose(matrix)
			expect(result).toEqual([
				["a", "d"],
				["b", "e"],
				["c", "f"],
			])
		})

		it("handles table data transformation", () => {
			const data = [
				["Name", "Age", "City"],
				["Alice", 25, "NYC"],
				["Bob", 30, "LA"],
			]
			const result = transpose(data)
			expect(result).toEqual([
				["Name", "Alice", "Bob"],
				["Age", 25, 30],
				["City", "NYC", "LA"],
			])
		})

		it("handles mixed types", () => {
			const matrix = [
				[1, "two", true],
				[null, undefined, false],
				[[], {}, 0],
			]
			const result = transpose(matrix)
			expect(result).toEqual([
				[1, null, []],
				["two", undefined, {}],
				[true, false, 0],
			])
		})

		it("handles very jagged arrays", () => {
			const matrix = [
				[1],
				[2, 3],
				[4, 5, 6],
				[7, 8, 9, 10],
			]
			const result = transpose(matrix)
			expect(result).toEqual([
				[1, 2, 4, 7],
				[undefined, 3, 5, 8],
				[undefined, undefined, 6, 9],
				[undefined, undefined, undefined, 10],
			])
		})

		it("handles non-array rows", () => {
			const matrix = [
				[1, 2, 3],
				null as any,
				[4, 5, 6],
				undefined as any,
				[7, 8, 9],
			]
			const result = transpose(matrix)
			expect(result).toEqual([
				[1, undefined, 4, undefined, 7],
				[2, undefined, 5, undefined, 8],
				[3, undefined, 6, undefined, 9],
			])
		})

		it("preserves object references", () => {
			const obj1 = { id: 1 }
			const obj2 = { id: 2 }
			const matrix = [
				[obj1, obj2],
				[obj2, obj1],
			]
			const result = transpose(matrix)
			expect(result).toEqual([
				[obj1, obj2],
				[obj2, obj1],
			])
			// Check same references
			expect(result[0][0]).toBe(obj1)
			expect(result[0][1]).toBe(obj2)
		})

		it("does not mutate original matrix", () => {
			const original = [
				[1, 2, 3],
				[4, 5, 6],
			]
			const copy = JSON.parse(JSON.stringify(original))
			
			transpose(original)
			
			expect(original).toEqual(copy)
		})

		it("handles matrix with NaN and Infinity", () => {
			const matrix = [
				[1, NaN, 3],
				[Infinity, 5, -Infinity],
			]
			const result = transpose(matrix)
			expect(result).toEqual([
				[1, Infinity],
				[NaN, 5],
				[3, -Infinity],
			])
			// Check NaN explicitly
			expect(Number.isNaN(result[1][0])).toBe(true)
		})

		it("handles boolean matrix", () => {
			const matrix = [
				[true, false, true],
				[false, true, false],
			]
			const result = transpose(matrix)
			expect(result).toEqual([
				[true, false],
				[false, true],
				[true, false],
			])
		})
	})

	describe("property-based tests", () => {
		it("transpose twice returns original for square matrices", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 10 }),
					(size) => {
						// Generate square matrix
						const matrix = Array.from({ length: size }, (_, i) =>
							Array.from({ length: size }, (_, j) => i * size + j)
						)
						
						const transposed = transpose(matrix)
						const doubleTransposed = transpose(transposed)
						
						return doubleTransposed.length === matrix.length &&
							doubleTransposed.every((row, i) =>
								row.every((val, j) => val === matrix[i][j])
							)
					},
				),
			)
		})

		it("transpose swaps dimensions", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 10 }),
					fc.integer({ min: 1, max: 10 }),
					(rows, cols) => {
						const matrix = Array.from({ length: rows }, () =>
							Array.from({ length: cols }, () => Math.random())
						)
						
						const result = transpose(matrix)
						
						return result.length === cols &&
							result.every(row => row.length === rows)
					},
				),
			)
		})

		it("element at [i][j] becomes [j][i]", () => {
			fc.assert(
				fc.property(
					fc.integer({ min: 1, max: 10 }),
					fc.integer({ min: 1, max: 10 }),
					(rows, cols) => {
						const matrix = Array.from({ length: rows }, (_, i) =>
							Array.from({ length: cols }, (_, j) => `${i},${j}`)
						)
						
						const result = transpose(matrix)
						
						for (let i = 0; i < rows; i++) {
							for (let j = 0; j < cols; j++) {
								if (result[j][i] !== matrix[i][j]) {
									return false
								}
							}
						}
						return true
					},
				),
			)
		})

		it("handles jagged arrays consistently", () => {
			fc.assert(
				fc.property(
					fc.array(
						fc.array(fc.integer(), { maxLength: 10 }),
						{ minLength: 1, maxLength: 10 },
					),
					(matrix) => {
						const result = transpose(matrix)
						
						// Find max length in original
						const maxLen = Math.max(...matrix.map(row => row.length))
						
						// Result should have maxLen rows
						if (maxLen === 0) {
							return result.length === 0
						}
						
						return result.length === maxLen &&
							result.every(row => row.length === matrix.length)
					},
				),
			)
		})

		it("preserves types in transposed matrix", () => {
			fc.assert(
				fc.property(
					fc.array(
						fc.array(
							fc.oneof(
								fc.integer(),
								fc.string(),
								fc.boolean(),
								fc.constant(null),
							),
							{ minLength: 1, maxLength: 5 },
						),
						{ minLength: 1, maxLength: 5 },
					),
					(matrix) => {
						const result = transpose(matrix)
						
						// Check that all non-undefined values maintain their type
						for (let i = 0; i < result.length; i++) {
							for (let j = 0; j < result[i].length; j++) {
								if (result[i][j] !== undefined && 
									matrix[j] && 
									i < matrix[j].length) {
									const original = matrix[j][i]
									const transposed = result[i][j]
									if (original !== transposed) {
										return false
									}
								}
							}
						}
						return true
					},
				),
			)
		})
	})
})