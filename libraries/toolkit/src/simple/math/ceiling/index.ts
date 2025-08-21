/**
 * Rounds a number up to the nearest integer
 * 
 * Returns the smallest integer greater than or equal to the given number.
 * This is the ceiling function that always rounds toward positive infinity.
 * For positive numbers, it rounds up; for negative numbers, it rounds
 * toward zero. Returns NaN for non-numeric inputs to support safe error
 * handling.
 * 
 * @param n - Number to round up
 * @returns Smallest integer >= n, or NaN if invalid
 * @example
 * ```typescript
 * // Positive decimals round up
 * ceiling(4.1)
 * // 5
 * 
 * ceiling(4.5)
 * // 5
 * 
 * ceiling(4.9)
 * // 5
 * 
 * ceiling(0.1)
 * // 1
 * 
 * ceiling(0.0001)
 * // 1
 * 
 * // Negative decimals round toward zero
 * ceiling(-4.1)
 * // -4
 * 
 * ceiling(-4.5)
 * // -4
 * 
 * ceiling(-4.9)
 * // -4
 * 
 * ceiling(-0.1)
 * // -0
 * 
 * ceiling(-0.9999)
 * // -0
 * 
 * // Integers remain unchanged
 * ceiling(5)
 * // 5
 * 
 * ceiling(-5)
 * // -5
 * 
 * ceiling(0)
 * // 0
 * 
 * ceiling(-0)
 * // -0
 * 
 * // Large numbers
 * ceiling(1000000.1)
 * // 1000001
 * 
 * ceiling(9999999.0001)
 * // 10000000
 * 
 * // Small numbers
 * ceiling(1e-10)
 * // 1
 * 
 * ceiling(-1e-10)
 * // -0
 * 
 * // Special values
 * ceiling(Infinity)
 * // Infinity
 * 
 * ceiling(-Infinity)
 * // -Infinity
 * 
 * ceiling(NaN)
 * // NaN
 * 
 * // Edge cases
 * ceiling(Number.MAX_VALUE)
 * // Number.MAX_VALUE (already an integer in JS representation)
 * 
 * ceiling(Number.MIN_VALUE)
 * // 1
 * 
 * ceiling(-Number.MIN_VALUE)
 * // -0
 * 
 * // Invalid inputs return NaN
 * ceiling(null)
 * // NaN
 * 
 * ceiling(undefined)
 * // NaN
 * 
 * ceiling("5.7")
 * // NaN
 * 
 * ceiling("abc")
 * // NaN
 * 
 * ceiling({})
 * // NaN
 * 
 * ceiling([])
 * // NaN
 * 
 * // Pagination calculations
 * function calculatePages(totalItems: number, itemsPerPage: number): number {
 *   return ceiling(totalItems / itemsPerPage)
 * }
 * calculatePages(95, 10)
 * // 10 pages needed for 95 items
 * 
 * calculatePages(100, 10)
 * // 10 pages (exactly)
 * 
 * calculatePages(101, 10)
 * // 11 pages
 * 
 * // Price rounding (up to nearest dollar)
 * function roundUpPrice(price: number): number {
 *   return ceiling(price)
 * }
 * roundUpPrice(19.99)
 * // 20
 * 
 * roundUpPrice(19.01)
 * // 20
 * 
 * // Time calculations (minutes to hours)
 * function minutesToHours(minutes: number): number {
 *   return ceiling(minutes / 60)
 * }
 * minutesToHours(90)
 * // 2 hours
 * 
 * minutesToHours(61)
 * // 2 hours
 * 
 * minutesToHours(60)
 * // 1 hour
 * 
 * // Storage allocation
 * function calculateBlocks(bytes: number, blockSize: number = 4096): number {
 *   return ceiling(bytes / blockSize)
 * }
 * calculateBlocks(5000)
 * // 2 blocks needed
 * 
 * calculateBlocks(4096)
 * // 1 block (exactly)
 * 
 * // Batch processing
 * function calculateBatches(items: number, batchSize: number): number {
 *   return ceiling(items / batchSize)
 * }
 * calculateBatches(250, 100)
 * // 3 batches
 * 
 * // Resource allocation
 * function serversNeeded(requests: number, requestsPerServer: number): number {
 *   return ceiling(requests / requestsPerServer)
 * }
 * serversNeeded(1500, 500)
 * // 3 servers
 * 
 * // Shipping calculations
 * function boxesNeeded(items: number, itemsPerBox: number): number {
 *   return ceiling(items / itemsPerBox)
 * }
 * boxesNeeded(47, 12)
 * // 4 boxes
 * 
 * // Progress bar segments
 * function progressSegments(progress: number, segments: number = 10): number {
 *   return ceiling(progress * segments / 100)
 * }
 * progressSegments(67)
 * // 7 segments filled (out of 10)
 * 
 * // Grid layout calculations
 * function gridRows(items: number, columns: number): number {
 *   return ceiling(items / columns)
 * }
 * gridRows(25, 4)
 * // 7 rows needed
 * 
 * // Rate limiting
 * function waitTime(requests: number, rateLimit: number): number {
 *   const seconds = requests / rateLimit
 *   return ceiling(seconds)
 * }
 * waitTime(150, 60) // 150 requests at 60/second
 * // 3 seconds wait time
 * 
 * // Array chunking
 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * const chunkSize = 3
 * const chunks = ceil(data.length / chunkSize)
 * // 4 chunks needed
 * 
 * // Memory alignment
 * function alignToWord(bytes: number, wordSize: number = 4): number {
 *   return ceiling(bytes / wordSize) * wordSize
 * }
 * alignToWord(13)
 * // 16 (aligned to 4-byte boundary)
 * 
 * // Safe calculation with validation
 * function safeCeil(value: unknown): number | null {
 *   const num = typeof value === 'number' ? ceiling(value) : NaN
 *   return isNaN(num) ? null : num
 * }
 * safeCeil(4.7)
 * // 5
 * safeCeil("invalid")
 * // null
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Monotonic - If a <= b, then ceiling(a) <= ceiling(b)
 * @property Idempotent - ceiling(ceiling(x)) === ceiling(x)
 */
const ceiling = (
	n: number | null | undefined
): number => {
	if (n == null || typeof n !== 'number') {
		return NaN
	}
	
	return Math.ceil(n)
}

export default ceiling