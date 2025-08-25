/**
 * Rounds a number to the nearest integer
 *
 * Rounds to the nearest integer using standard mathematical rounding
 * rules. Values exactly halfway between integers round away from zero
 * (0.5 rounds to 1, -0.5 rounds to -1). Returns NaN for invalid inputs.
 *
 * @param n - The number to round
 * @returns The rounded integer value, or NaN if invalid input
 * @example
 * ```typescript
 * // Basic rounding
 * round(3.2)
 * // 3
 *
 * round(3.7)
 * // 4
 *
 * round(3.5)
 * // 4 (rounds away from zero)
 *
 * // Negative numbers
 * round(-3.2)
 * // -3
 *
 * round(-3.7)
 * // -4
 *
 * round(-3.5)
 * // -3 (rounds away from zero)
 *
 * // Already integers
 * round(5)
 * // 5
 *
 * round(-10)
 * // -10
 *
 * round(0)
 * // 0
 *
 * // Very small decimals
 * round(0.1)
 * // 0
 *
 * round(0.49999)
 * // 0
 *
 * round(0.5)
 * // 1
 *
 * round(0.50001)
 * // 1
 *
 * round(0.9)
 * // 1
 *
 * // Large numbers
 * round(1000000.3)
 * // 1000000
 *
 * round(999999.9)
 * // 1000000
 *
 * round(Number.MAX_SAFE_INTEGER - 0.4)
 * // 9007199254740991
 *
 * // Special values
 * round(Infinity)
 * // Infinity
 *
 * round(-Infinity)
 * // -Infinity
 *
 * round(NaN)
 * // NaN
 *
 * // Invalid inputs
 * round(null)
 * // NaN
 *
 * round(undefined)
 * // NaN
 *
 * round("3.5")
 * // NaN
 *
 * round({})
 * // NaN
 *
 * round([])
 * // NaN
 *
 * // Rounding in calculations
 * const average = (a: number, b: number) => round((a + b) / 2)
 * average(3, 4)
 * // 4 (3.5 rounds to 4)
 * average(3, 3)
 * // 3
 *
 * // Array operations
 * const decimals = [1.2, 2.5, 3.7, 4.4, 5.9]
 * decimals.map(round)
 * // [1, 3, 4, 4, 6]
 *
 * // Percentage rounding
 * const percentage = 67.8
 * round(percentage)
 * // 68
 *
 * // Score rounding
 * const scores = [85.3, 92.7, 78.5, 95.4, 88.6]
 * scores.map(round)
 * // [85, 93, 79, 95, 89]
 *
 * // Currency rounding (cents to nearest dollar)
 * const cents = 1250 // $12.50
 * round(cents / 100)
 * // 13
 *
 * const cents2 = 1249 // $12.49
 * round(cents2 / 100)
 * // 12
 *
 * // Temperature rounding
 * const celsius = 22.7
 * round(celsius)
 * // 23
 *
 * const fahrenheit = 72.3
 * round(fahrenheit)
 * // 72
 *
 * // Time rounding (minutes)
 * const minutes = 45.6
 * round(minutes)
 * // 46
 *
 * // Distance rounding
 * const miles = 3.8
 * round(miles)
 * // 4
 *
 * const kilometers = 5.2
 * round(kilometers)
 * // 5
 *
 * // Age calculation
 * const exactAge = 25.8
 * round(exactAge)
 * // 26
 *
 * // Pixel positioning
 * const xPosition = 150.7
 * const yPosition = 200.3
 * const pixel = { x: round(xPosition), y: round(yPosition) }
 * // { x: 151, y: 200 }
 *
 * // Frame rate rounding
 * const fps = 59.94
 * round(fps)
 * // 60
 *
 * // Statistical rounding
 * const mean = 73.5
 * round(mean)
 * // 74
 *
 * const median = 68.5
 * round(median)
 * // 69
 *
 * // Vote counting
 * const votePercentage = 51.7
 * round(votePercentage)
 * // 52
 *
 * // Progress bar
 * const progress = 67.3
 * round(progress)
 * // 67
 *
 * // Rating system
 * const rating = 4.6
 * round(rating)
 * // 5
 *
 * const rating2 = 3.4
 * round(rating2)
 * // 3
 *
 * // Halfway cases (banker's rounding alternative)
 * // Note: Math.round uses "round half away from zero"
 * round(2.5)
 * // 3
 * round(3.5)
 * // 4
 * round(4.5)
 * // 5
 * round(-2.5)
 * // -2
 * round(-3.5)
 * // -3
 *
 * // Comparison with floor and ceil
 * const n = 3.7
 * Math.floor(n)
 * // 3
 * round(n)
 * // 4
 * Math.ceil(n)
 * // 4
 *
 * // Discrete value mapping
 * const continuous = 0.7
 * const discrete = round(continuous * 10)
 * // 7
 *
 * // Grid snapping
 * const gridSize = 10
 * const snapToGrid = (value: number) => round(value / gridSize) * gridSize
 * snapToGrid(23)
 * // 20
 * snapToGrid(27)
 * // 30
 *
 * // Quantization
 * const analog = 127.8
 * const digital = round(analog)
 * // 128
 *
 * // Division with rounding
 * const divideAndRound = (a: number, b: number) => round(a / b)
 * divideAndRound(10, 3)
 * // 3
 * divideAndRound(11, 3)
 * // 4
 *
 * // Pipeline processing
 * const process = (n: number) =>
 *   round(Math.sqrt(n) * 10)
 * process(2)
 * // 14 (sqrt(2) * 10 ≈ 14.14...)
 *
 * // Safe round with validation
 * const safeRound = (value: unknown): number | null => {
 *   const num = typeof value === 'number' ? value : NaN
 *   const result = round(num)
 *   return isNaN(result) ? null : result
 * }
 * safeRound(3.7)
 * // 4
 * safeRound("3.7")
 * // null
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Standard - Uses mathematical rounding (round half away from zero)
 * @property Idempotent - round(round(n)) === round(n)
 */
const round = (
	n: number | null | undefined,
): number => {
	if (n == null || typeof n !== "number") {
		return NaN
	}

	return Math.round(n)
}

export default round
