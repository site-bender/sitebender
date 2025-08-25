/**
 * Calculates the hypotenuse for multiple dimensions
 *
 * Computes the Euclidean norm (length) of a vector, equivalent to the
 * distance from the origin. For 2D, this is the Pythagorean theorem:
 * √(x² + y²). Generalizes to n dimensions as √(Σxᵢ²). Uses a numerically
 * stable algorithm to avoid overflow. Returns NaN for invalid inputs.
 *
 * @param values - Array of coordinate values
 * @returns Length of the vector (hypotenuse), or NaN if invalid
 * @example
 * ```typescript
 * // Classic Pythagorean theorem (3-4-5 triangle)
 * hypotenuse([3, 4])
 * // 5
 *
 * // Another right triangle
 * hypotenuse([5, 12])
 * // 13
 *
 * // 3D space
 * hypotenuse([2, 3, 6])
 * // 7 (√(4 + 9 + 36))
 *
 * // 4D space
 * hypotenuse([1, 2, 2, 2])
 * // 3.605... (√(1 + 4 + 4 + 4))
 *
 * // Single dimension
 * hypotenuse([5])
 * // 5 (absolute value)
 *
 * hypotenuse([-5])
 * // 5
 *
 * // Zero vector
 * hypotenuse([0, 0, 0])
 * // 0
 *
 * // Mixed positive and negative
 * hypotenuse([-3, 4])
 * // 5 (signs don't matter)
 *
 * // Large values (avoids overflow)
 * hypotenuse([1e200, 1e200])
 * // 1.414...e200 (√2 × 1e200)
 *
 * // Small values (maintains precision)
 * hypotenuse([1e-200, 1e-200])
 * // 1.414...e-200
 *
 * // Empty array
 * hypotenuse([])
 * // 0 (by convention)
 *
 * // Invalid inputs
 * hypotenuse(null)
 * // NaN
 *
 * hypotenuse([1, "2", 3])
 * // NaN
 *
 * hypotenuse([1, null, 3])
 * // NaN
 *
 * // Practical examples
 *
 * // Distance from origin in 2D
 * const point2D = [3, 4]
 * const distance2D = hypotenuse(point2D)
 * // 5
 *
 * // Distance from origin in 3D
 * const point3D = [1, 2, 2]
 * const distance3D = hypotenuse(point3D)
 * // 3
 *
 * // Vector magnitude
 * const vector = [6, 8]
 * const magnitude = hypotenuse(vector)
 * // 10
 *
 * // Screen diagonal
 * const screenWidth = 1920
 * const screenHeight = 1080
 * const diagonal = hypotenuse([screenWidth, screenHeight])
 * // 2202.9... pixels
 *
 * // 3D game physics - velocity magnitude
 * const velocity = [10, 5, -3]
 * const speed = hypotenuse(velocity)
 * // 11.575...
 *
 * // Signal processing - complex number magnitude
 * const real = 3
 * const imaginary = 4
 * const complexMagnitude = hypotenuse([real, imaginary])
 * // 5
 *
 * // N-dimensional distance
 * function distanceFromOrigin(coords: number[]): number {
 *   return hypotenuse(coords)
 * }
 *
 * // Right triangle solver
 * function findHypotenuse(a: number, b: number): number {
 *   return hypotenuse([a, b])
 * }
 *
 * // Normalize vector using hypotenuse
 * function normalizeVector(v: number[]): number[] {
 *   const length = hypotenuse(v)
 *   return length === 0 ? v : v.map(x => x / length)
 * }
 * normalizeVector([3, 4])
 * // [0.6, 0.8]
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Stable - Uses numerically stable algorithm
 * @property NDimensional - Works for any number of dimensions
 */
const hypotenuse = (
	values: number[] | null | undefined,
): number => {
	if (values == null || !Array.isArray(values)) {
		return NaN
	}

	// Empty array returns 0 by convention
	if (values.length === 0) {
		return 0
	}

	// Check for non-numeric values
	for (const value of values) {
		if (value == null || typeof value !== "number") {
			return NaN
		}
	}

	// Use Math.hypot if available (it's numerically stable)
	if (typeof Math.hypot === "function") {
		return Math.hypot(...values)
	}

	// Manual implementation with numerical stability
	// Find the maximum absolute value to scale
	let max = 0
	for (const value of values) {
		const abs = Math.abs(value)
		if (abs > max) {
			max = abs
		}
	}

	// If all values are zero
	if (max === 0) {
		return 0
	}

	// Scale values to avoid overflow/underflow
	let sumOfSquares = 0
	for (const value of values) {
		const scaled = value / max
		sumOfSquares += scaled * scaled
	}

	return max * Math.sqrt(sumOfSquares)
}

export default hypotenuse
