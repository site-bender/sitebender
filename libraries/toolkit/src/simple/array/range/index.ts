/**
 * Generates an array of numbers from start to end (exclusive)
 *
 * Creates an array containing a sequence of numbers from start up to but
 * not including end, incrementing by 1. If start is greater than or equal
 * to end, returns an empty array. For custom step values, use rangeStep.
 * Useful for generating sequences, creating indices, or iteration without
 * loops.
 *
 * @curried (start) => (end) => result
 * @param start - Starting number (inclusive)
 * @param end - Ending number (exclusive)
 * @returns Array of numbers from start to end-1
 * @example
 * ```typescript
 * // Basic range
 * range(0)(5)
 * // [0, 1, 2, 3, 4]
 *
 * // Starting from 1
 * range(1)(6)
 * // [1, 2, 3, 4, 5]
 *
 * // Negative to positive
 * range(-2)(3)
 * // [-2, -1, 0, 1, 2]
 *
 * // Both negative
 * range(-5)(-1)
 * // [-5, -4, -3, -2]
 *
 * // Start equals end (empty)
 * range(5)(5)
 * // []
 *
 * // Start greater than end (empty)
 * range(5)(3)
 * // []
 *
 * // Large range
 * range(10)(20)
 * // [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
 *
 * // Generate indices
 * const indices = range(0)(array.length)
 * // [0, 1, 2, ..., array.length - 1]
 *
 * // Create pagination
 * const pageSize = 10
 * const page = 3
 * range(page * pageSize)((page + 1) * pageSize)
 * // [30, 31, 32, 33, 34, 35, 36, 37, 38, 39]
 *
 * // Generate test data
 * range(1)(11).map(n => ({ id: n, value: n * 10 }))
 * // [
 * //   { id: 1, value: 10 },
 * //   { id: 2, value: 20 },
 * //   ...
 * //   { id: 10, value: 100 }
 * // ]
 *
 * // Create alphabet indices
 * range(0)(26).map(i => String.fromCharCode(65 + i))
 * // ["A", "B", "C", ..., "Z"]
 *
 * // Generate time slots
 * range(9)(17).map(hour => `${hour}:00`)
 * // ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"]
 *
 * // Build coordinates
 * const rows = range(0)(5)
 * const cols = range(0)(5)
 * const grid = rows.flatMap(row =>
 *   cols.map(col => ({ row, col }))
 * )
 * // [{ row: 0, col: 0 }, { row: 0, col: 1 }, ..., { row: 4, col: 4 }]
 *
 * // Fibonacci using range
 * const fib = (n: number): number[] => {
 *   const result = [0, 1]
 *   range(2)(n).forEach(i => {
 *     result[i] = result[i - 1] + result[i - 2]
 *   })
 *   return result.slice(0, n)
 * }
 * fib(10)
 * // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
 *
 * // Create buckets
 * const min = 0
 * const max = 100
 * const bucketSize = 10
 * range(min)(max + 1).filter(n => n % bucketSize === 0)
 * // [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
 *
 * // Generate years
 * const startYear = 2020
 * const endYear = 2025
 * range(startYear)(endYear + 1)
 * // [2020, 2021, 2022, 2023, 2024, 2025]
 *
 * // Zero-length range
 * range(10)(10)
 * // []
 *
 * // Single element range
 * range(5)(6)
 * // [5]
 *
 * // Partial application for common ranges
 * const fromZero = range(0)
 * fromZero(5)   // [0, 1, 2, 3, 4]
 * fromZero(10)  // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 *
 * const fromOne = range(1)
 * fromOne(6)    // [1, 2, 3, 4, 5]
 * fromOne(11)   // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 *
 * // Create histogram bins
 * const data = [23, 45, 67, 12, 89, 34, 56, 78, 90, 21]
 * const bins = range(0)(101).filter(n => n % 20 === 0)
 * // [0, 20, 40, 60, 80, 100]
 *
 * // Generate degrees
 * range(0)(361).filter(deg => deg % 45 === 0)
 * // [0, 45, 90, 135, 180, 225, 270, 315, 360]
 *
 * // Create array with calculated values
 * range(1)(11).map(n => n * n)
 * // [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
 *
 * // Generate percentages
 * range(0)(101).filter(n => n % 10 === 0).map(n => `${n}%`)
 * // ["0%", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"]
 *
 * // Create time series
 * const startHour = 8
 * const endHour = 18
 * range(startHour * 60)((endHour * 60) + 1)
 *   .filter(min => min % 30 === 0)
 *   .map(min => {
 *     const h = Math.floor(min / 60)
 *     const m = min % 60
 *     return `${h}:${m.toString().padStart(2, "0")}`
 *   })
 * // ["8:00", "8:30", "9:00", "9:30", ..., "17:30", "18:00"]
 *
 * // Floating point warning
 * // For decimal ranges, multiply and divide:
 * range(0)(10).map(n => n / 10)
 * // [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
 *
 * // Matrix indices
 * const matrixSize = 3
 * range(0)(matrixSize * matrixSize).map(i => ({
 *   row: Math.floor(i / matrixSize),
 *   col: i % matrixSize,
 *   index: i
 * }))
 * // [
 * //   { row: 0, col: 0, index: 0 },
 * //   { row: 0, col: 1, index: 1 },
 * //   { row: 0, col: 2, index: 2 },
 * //   { row: 1, col: 0, index: 3 },
 * //   ...
 * // ]
 * ```
 * @property Immutable - generates new array
 * @property Exclusive-end - end value is not included
 * @property Integer-step - always increments by 1
 */
const range = (
	start: number,
) =>
(
	end: number,
): Array<number> => {
	if (start >= end) {
		return []
	}

	const result: Array<number> = []

	for (let i = start; i < end; i++) {
		result.push(i)
	}

	return result
}

export default range
