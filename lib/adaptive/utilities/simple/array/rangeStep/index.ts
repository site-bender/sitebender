/**
 * Generates an array of numbers from start to end with custom step
 * 
 * Creates an array containing a sequence of numbers from start towards end,
 * incrementing by the specified step value. The sequence stops before
 * exceeding end (for positive step) or going below end (for negative step).
 * Returns empty array if the step direction doesn't lead from start to end.
 * This is the flexible version of range that allows custom increments.
 * 
 * @curried (step) => (start) => (end) => result
 * @param step - Increment between values (can be negative)
 * @param start - Starting number (inclusive)
 * @param end - Ending boundary (exclusive)
 * @returns Array of numbers from start towards end by step
 * @example
 * ```typescript
 * // Step by 2
 * rangeStep(2)(0)(10)
 * // [0, 2, 4, 6, 8]
 * 
 * // Step by 5
 * rangeStep(5)(0)(26)
 * // [0, 5, 10, 15, 20, 25]
 * 
 * // Negative step (counting down)
 * rangeStep(-1)(5)(0)
 * // [5, 4, 3, 2, 1]
 * 
 * // Larger negative step
 * rangeStep(-2)(10)(0)
 * // [10, 8, 6, 4, 2]
 * 
 * // Decimal step
 * rangeStep(0.5)(0)(3)
 * // [0, 0.5, 1, 1.5, 2, 2.5]
 * 
 * // Step by 0.1 (be careful with floating point)
 * rangeStep(0.1)(0)(1)
 * // [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
 * // Note: May have floating point precision issues
 * 
 * // Wrong direction (returns empty)
 * rangeStep(1)(10)(5)  // Step up but end is lower
 * // []
 * 
 * rangeStep(-1)(5)(10)  // Step down but end is higher
 * // []
 * 
 * // Zero step (returns empty to prevent infinite loop)
 * rangeStep(0)(1)(10)
 * // []
 * 
 * // Generate even numbers
 * rangeStep(2)(0)(21)
 * // [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
 * 
 * // Generate odd numbers
 * rangeStep(2)(1)(20)
 * // [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
 * 
 * // Multiples of 3
 * rangeStep(3)(3)(31)
 * // [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
 * 
 * // Powers of 2 indices
 * rangeStep(1)(0)(10).map(n => Math.pow(2, n))
 * // [1, 2, 4, 8, 16, 32, 64, 128, 256, 512]
 * 
 * // Time intervals (every 15 minutes)
 * rangeStep(15)(0)(121).map(min => {
 *   const h = Math.floor(min / 60)
 *   const m = min % 60
 *   return `${h}:${m.toString().padStart(2, "0")}`
 * })
 * // ["0:00", "0:15", "0:30", "0:45", "1:00", "1:15", "1:30", "1:45", "2:00"]
 * 
 * // Countdown
 * rangeStep(-1)(10)(-1)
 * // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
 * 
 * // Temperature scale
 * rangeStep(10)(-20)(41)
 * // [-20, -10, 0, 10, 20, 30, 40]
 * 
 * // Percentage increments
 * rangeStep(25)(0)(101).map(n => `${n}%`)
 * // ["0%", "25%", "50%", "75%", "100%"]
 * 
 * // Angles in radians
 * rangeStep(Math.PI / 4)(0)(2 * Math.PI + 0.1)
 * // [0, π/4, π/2, 3π/4, π, 5π/4, 3π/2, 7π/4, 2π]
 * 
 * // Musical notes (semitones)
 * const A4 = 440
 * rangeStep(1)(0)(13).map(n => A4 * Math.pow(2, n / 12))
 * // [440, 466.16, 493.88, 523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99, 830.61, 880]
 * 
 * // Grid coordinates with step
 * const gridStep = 10
 * const xCoords = rangeStep(gridStep)(0)(51)
 * const yCoords = rangeStep(gridStep)(0)(51)
 * const gridPoints = xCoords.flatMap(x => 
 *   yCoords.map(y => ({ x, y }))
 * )
 * // [{ x: 0, y: 0 }, { x: 0, y: 10 }, ..., { x: 50, y: 50 }]
 * 
 * // Logarithmic scale approximation
 * rangeStep(1)(0)(10).map(n => Math.pow(10, n))
 * // [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000]
 * 
 * // Partial application for common steps
 * const byTens = rangeStep(10)
 * byTens(0)(101)  // [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
 * byTens(5)(56)   // [5, 15, 25, 35, 45, 55]
 * 
 * const byHalves = rangeStep(0.5)
 * byHalves(0)(5)  // [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5]
 * 
 * const countdown = rangeStep(-1)
 * countdown(10)(0)  // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
 * countdown(5)(-3)  // [5, 4, 3, 2, 1, 0, -1, -2]
 * 
 * // Exact endpoint check
 * rangeStep(3)(0)(9)   // [0, 3, 6] - stops before 9
 * rangeStep(3)(0)(10)  // [0, 3, 6, 9] - stops before 10
 * rangeStep(3)(0)(12)  // [0, 3, 6, 9] - stops before 12
 * 
 * // Single value range
 * rangeStep(10)(5)(6)
 * // [5]
 * 
 * // Empty when start equals end
 * rangeStep(1)(5)(5)
 * // []
 * 
 * // Fibonacci indices
 * const fibIndices = [0, 1]
 * rangeStep(1)(2)(10).forEach(i => {
 *   fibIndices[i] = fibIndices[i - 1] + fibIndices[i - 2]
 * })
 * // fibIndices: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
 * 
 * // Sample data points
 * const dataSize = 1000
 * const sampleRate = 10
 * rangeStep(sampleRate)(0)(dataSize)
 * // [0, 10, 20, 30, ..., 990]
 * 
 * // Color gradient steps
 * rangeStep(51)(0)(256).map(n => `rgb(${n}, 0, ${255 - n})`)
 * // ["rgb(0, 0, 255)", "rgb(51, 0, 204)", "rgb(102, 0, 153)", "rgb(153, 0, 102)", "rgb(204, 0, 51)", "rgb(255, 0, 0)"]
 * ```
 * @property Immutable - generates new array
 * @property Flexible-step - supports any numeric step including negative and decimal
 * @property Direction-aware - requires correct step direction for start/end
 */
const rangeStep = (
	step: number
) => (
	start: number
) => (
	end: number
): Array<number> => {
	// Prevent infinite loops with zero step
	if (step === 0) {
		return []
	}
	
	// Check if step direction is correct
	if ((step > 0 && start >= end) || (step < 0 && start <= end)) {
		return []
	}
	
	const result: Array<number> = []
	
	if (step > 0) {
		for (let i = start; i < end; i += step) {
			result.push(i)
		}
	} else {
		for (let i = start; i > end; i += step) {
			result.push(i)
		}
	}
	
	return result
}

export default rangeStep