/**
 * Rounds a number down to the nearest integer
 * 
 * Returns the largest integer less than or equal to the given number.
 * This is the floor function that always rounds toward negative infinity.
 * For positive numbers, it rounds down; for negative numbers, it rounds
 * away from zero. Returns NaN for non-numeric inputs to support safe
 * error handling.
 * 
 * @param n - Number to round down
 * @returns Largest integer <= n, or NaN if invalid
 * @example
 * ```typescript
 * // Positive decimals round down
 * floor(4.9)
 * // 4
 * 
 * floor(4.5)
 * // 4
 * 
 * floor(4.1)
 * // 4
 * 
 * floor(0.9)
 * // 0
 * 
 * floor(0.1)
 * // 0
 * 
 * floor(0.0001)
 * // 0
 * 
 * // Negative decimals round away from zero
 * floor(-4.1)
 * // -5
 * 
 * floor(-4.5)
 * // -5
 * 
 * floor(-4.9)
 * // -5
 * 
 * floor(-0.1)
 * // -1
 * 
 * floor(-0.9999)
 * // -1
 * 
 * // Integers remain unchanged
 * floor(5)
 * // 5
 * 
 * floor(-5)
 * // -5
 * 
 * floor(0)
 * // 0
 * 
 * floor(-0)
 * // -0
 * 
 * // Large numbers
 * floor(1000000.9)
 * // 1000000
 * 
 * floor(9999999.9999)
 * // 9999999
 * 
 * // Small numbers
 * floor(1e-10)
 * // 0
 * 
 * floor(-1e-10)
 * // -1
 * 
 * // Special values
 * floor(Infinity)
 * // Infinity
 * 
 * floor(-Infinity)
 * // -Infinity
 * 
 * floor(NaN)
 * // NaN
 * 
 * // Edge cases
 * floor(Number.MAX_VALUE)
 * // Number.MAX_VALUE (already an integer in JS representation)
 * 
 * floor(Number.MIN_VALUE)
 * // 0
 * 
 * floor(-Number.MIN_VALUE)
 * // -1
 * 
 * // Invalid inputs return NaN
 * floor(null)
 * // NaN
 * 
 * floor(undefined)
 * // NaN
 * 
 * floor("5.7")
 * // NaN
 * 
 * floor("abc")
 * // NaN
 * 
 * floor({})
 * // NaN
 * 
 * floor([])
 * // NaN
 * 
 * // Integer division
 * function integerDivision(dividend: number, divisor: number): number {
 *   return floor(dividend / divisor)
 * }
 * integerDivision(7, 3)
 * // 2
 * integerDivision(-7, 3)
 * // -3
 * integerDivision(10, 3)
 * // 3
 * 
 * // Array index from float
 * const items = ['a', 'b', 'c', 'd', 'e']
 * const floatIndex = 3.7
 * const index = floor(floatIndex)
 * items[index]
 * // 'd'
 * 
 * // Time calculations
 * const totalMinutes = 135.8
 * const hours = floor(totalMinutes / 60)
 * // 2 hours
 * const minutes = floor(totalMinutes % 60)
 * // 15 minutes
 * 
 * // Money calculations (avoiding cents)
 * const price = 19.99
 * const dollars = floor(price)
 * // 19
 * 
 * // Grid positioning
 * function gridPosition(x: number, cellSize: number): number {
 *   return floor(x / cellSize)
 * }
 * gridPosition(125.7, 50)
 * // 2 (cell index)
 * 
 * // Statistical bins
 * function getBin(value: number, binWidth: number): number {
 *   return floor(value / binWidth)
 * }
 * getBin(7.8, 2)
 * // 3 (bin index)
 * 
 * // Tile map coordinates
 * function tileCoordinate(worldPos: number, tileSize: number): number {
 *   return floor(worldPos / tileSize)
 * }
 * tileCoordinate(250, 32)
 * // 7
 * 
 * // Percentage to decile
 * function percentileToDecile(percentile: number): number {
 *   return floor(percentile / 10)
 * }
 * percentileToDecile(87)
 * // 8 (80th percentile range)
 * 
 * // Random integer generation
 * function randomInt(min: number, max: number): number {
 *   return floor(Math.random() * (max - min + 1)) + min
 * }
 * // randomInt(1, 6) returns 1-6 (dice roll)
 * 
 * // Pagination calculation
 * function getPage(itemIndex: number, itemsPerPage: number): number {
 *   return floor(itemIndex / itemsPerPage) + 1
 * }
 * getPage(25, 10)
 * // 3 (item 25 is on page 3)
 * 
 * // Truncating to decimal places
 * function truncateDecimals(num: number, decimals: number): number {
 *   const multiplier = Math.pow(10, decimals)
 *   return floor(num * multiplier) / multiplier
 * }
 * truncateDecimals(3.14159, 2)
 * // 3.14
 * truncateDecimals(9.9999, 3)
 * // 9.999
 * 
 * // Age from date difference
 * function calculateAge(birthYear: number, currentYear: number): number {
 *   return floor(currentYear - birthYear)
 * }
 * calculateAge(1990.5, 2024.8)
 * // 34
 * 
 * // Level progression
 * function getLevel(experience: number, expPerLevel: number): number {
 *   return floor(experience / expPerLevel) + 1
 * }
 * getLevel(2500, 1000)
 * // 3 (level 3)
 * 
 * // Music: Beat calculation
 * function getBeat(time: number, bpm: number): number {
 *   const beatsPerSecond = bpm / 60
 *   return floor(time * beatsPerSecond)
 * }
 * getBeat(10, 120) // 10 seconds at 120 BPM
 * // 20 beats
 * 
 * // Color channel extraction
 * function extractRed(rgb: number): number {
 *   return floor(rgb / 65536) % 256
 * }
 * extractRed(0xFF5733)
 * // 255
 * 
 * // Frame number from time
 * function getFrame(seconds: number, fps: number): number {
 *   return floor(seconds * fps)
 * }
 * getFrame(2.5, 30)
 * // 75 (frame 75 at 30fps)
 * 
 * // Array chunking helper
 * const data = new Array(25)
 * const chunkSize = 10
 * const fullChunks = floor(data.length / chunkSize)
 * // 2 full chunks
 * 
 * // Modulo operations
 * function floorMod(a: number, b: number): number {
 *   return a - floor(a / b) * b
 * }
 * floorMod(7, 3)
 * // 1
 * floorMod(-7, 3)
 * // 2 (different from % operator for negatives)
 * 
 * // Safe floor with validation
 * function safeFloor(value: unknown): number | null {
 *   const num = typeof value === 'number' ? floor(value) : NaN
 *   return isNaN(num) ? null : num
 * }
 * safeFloor(4.7)
 * // 4
 * safeFloor("invalid")
 * // null
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Monotonic - If a <= b, then floor(a) <= floor(b)
 * @property Idempotent - floor(floor(x)) === floor(x)
 */
const floor = (
	n: number | null | undefined
): number => {
	if (n == null || typeof n !== 'number') {
		return NaN
	}
	
	return Math.floor(n)
}

export default floor