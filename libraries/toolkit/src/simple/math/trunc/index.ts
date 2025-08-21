/**
 * Removes the decimal part of a number (truncation)
 * 
 * Truncates a number by removing its fractional part, returning
 * the integer part only. Unlike floor or ceil, truncation always
 * moves toward zero. Returns NaN for invalid inputs.
 * 
 * @param n - The number to truncate
 * @returns The integer part of the number, or NaN if invalid
 * @example
 * ```typescript
 * // Positive numbers
 * trunc(3.7)
 * // 3
 * 
 * trunc(3.2)
 * // 3
 * 
 * trunc(3.9999)
 * // 3
 * 
 * trunc(10.5)
 * // 10
 * 
 * // Negative numbers (toward zero)
 * trunc(-3.7)
 * // -3
 * 
 * trunc(-3.2)
 * // -3
 * 
 * trunc(-3.9999)
 * // -3
 * 
 * trunc(-10.5)
 * // -10
 * 
 * // Already integers
 * trunc(5)
 * // 5
 * 
 * trunc(-10)
 * // -10
 * 
 * trunc(0)
 * // 0
 * 
 * // Very small decimals
 * trunc(0.1)
 * // 0
 * 
 * trunc(0.9)
 * // 0
 * 
 * trunc(0.00001)
 * // 0
 * 
 * trunc(-0.1)
 * // 0
 * 
 * trunc(-0.9)
 * // 0
 * 
 * // Large numbers
 * trunc(1000000.999)
 * // 1000000
 * 
 * trunc(999999.1)
 * // 999999
 * 
 * trunc(Number.MAX_SAFE_INTEGER - 0.5)
 * // 9007199254740990
 * 
 * // Special values
 * trunc(Infinity)
 * // Infinity
 * 
 * trunc(-Infinity)
 * // -Infinity
 * 
 * trunc(NaN)
 * // NaN
 * 
 * // Invalid inputs
 * trunc(null)
 * // NaN
 * 
 * trunc(undefined)
 * // NaN
 * 
 * trunc("3.5")
 * // NaN
 * 
 * trunc({})
 * // NaN
 * 
 * trunc([])
 * // NaN
 * 
 * // Comparison with floor and ceil
 * const n1 = 3.7
 * Math.floor(n1)
 * // 3
 * trunc(n1)
 * // 3
 * Math.ceil(n1)
 * // 4
 * 
 * const n2 = -3.7
 * Math.floor(n2)
 * // -4 (floor goes down)
 * trunc(n2)
 * // -3 (trunc goes toward zero)
 * Math.ceil(n2)
 * // -3
 * 
 * // Array operations
 * const decimals = [1.2, 2.7, -3.4, -4.9, 5.5]
 * decimals.map(trunc)
 * // [1, 2, -3, -4, 5]
 * 
 * const prices = [19.99, 34.50, 12.75, 8.99]
 * prices.map(trunc)
 * // [19, 34, 12, 8]
 * 
 * // Currency truncation (remove cents)
 * const amount = 123.45
 * trunc(amount)
 * // 123
 * 
 * const amount2 = -67.89
 * trunc(amount2)
 * // -67
 * 
 * // Time truncation (remove fractional hours)
 * const hours = 5.75
 * trunc(hours)
 * // 5
 * 
 * const hours2 = -2.25
 * trunc(hours2)
 * // -2
 * 
 * // Score truncation
 * const score = 87.6
 * trunc(score)
 * // 87
 * 
 * // Percentage truncation
 * const percentage = 99.9
 * trunc(percentage)
 * // 99
 * 
 * // Division with truncation
 * const divideAndTrunc = (a: number, b: number) => trunc(a / b)
 * divideAndTrunc(10, 3)
 * // 3
 * divideAndTrunc(17, 5)
 * // 3
 * divideAndTrunc(-10, 3)
 * // -3
 * 
 * // Integer division implementation
 * const intDiv = (dividend: number, divisor: number) => 
 *   trunc(dividend / divisor)
 * intDiv(20, 6)
 * // 3
 * intDiv(-20, 6)
 * // -3
 * 
 * // Extracting integer part
 * const getIntegerPart = trunc
 * getIntegerPart(123.456)
 * // 123
 * getIntegerPart(-123.456)
 * // -123
 * 
 * // Extracting decimal part
 * const getDecimalPart = (n: number) => n - trunc(n)
 * getDecimalPart(123.456)
 * // 0.456
 * getDecimalPart(-123.456)
 * // -0.456
 * 
 * // Pixel positioning (remove sub-pixel)
 * const xPos = 150.7
 * const yPos = 200.3
 * const pixelPos = { x: trunc(xPos), y: trunc(yPos) }
 * // { x: 150, y: 200 }
 * 
 * // Age calculation (years only)
 * const exactAge = 25.8
 * trunc(exactAge)
 * // 25
 * 
 * // Progress bar (percentage)
 * const progress = 67.89
 * trunc(progress)
 * // 67
 * 
 * // Frame counting
 * const frameTime = 16.67
 * const frameCount = trunc(1000 / frameTime)
 * // 59 (frames per second)
 * 
 * // Bitwise operation alternative
 * // Note: bitwise ops only work for 32-bit integers
 * const bitwiseTrunc = (n: number) => n | 0
 * bitwiseTrunc(3.7)
 * // 3
 * bitwiseTrunc(-3.7)
 * // -3
 * 
 * // Number of complete units
 * const totalMinutes = 185
 * const completeHours = trunc(totalMinutes / 60)
 * // 3
 * 
 * // Page calculation
 * const itemsPerPage = 10
 * const itemNumber = 47
 * const pageNumber = trunc(itemNumber / itemsPerPage)
 * // 4 (zero-indexed)
 * 
 * // Grid positioning
 * const gridSize = 32
 * const worldX = 150.7
 * const gridX = trunc(worldX / gridSize)
 * // 4
 * 
 * // Statistical binning
 * const value = 73.6
 * const binSize = 10
 * const binIndex = trunc(value / binSize)
 * // 7
 * 
 * // Fixed-point conversion
 * const floatValue = 3.14159
 * const fixedPoint = trunc(floatValue * 1000) / 1000
 * // 3.141
 * 
 * // Modulo implementation helper
 * const mod = (a: number, b: number) => a - trunc(a / b) * b
 * mod(10, 3)
 * // 1
 * mod(-10, 3)
 * // 2
 * 
 * // Pipeline processing
 * const process = (n: number) => 
 *   trunc(Math.sqrt(n) * 100) / 100
 * process(2)
 * // 1.41
 * 
 * // Safe trunc with validation
 * const safeTrunc = (value: unknown): number | null => {
 *   const num = typeof value === 'number' ? value : NaN
 *   const result = trunc(num)
 *   return isNaN(result) ? null : result
 * }
 * safeTrunc(3.7)
 * // 3
 * safeTrunc("3.7")
 * // null
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Toward-zero - Always truncates toward zero, not down or up
 * @property Idempotent - trunc(trunc(n)) === trunc(n)
 */
const trunc = (
	n: number | null | undefined
): number => {
	if (n == null || typeof n !== 'number') {
		return NaN
	}
	
	return Math.trunc(n)
}

export default trunc