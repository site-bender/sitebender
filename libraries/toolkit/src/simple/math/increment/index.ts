/**
 * Adds 1 to a number
 * 
 * Increments a number by one. This is equivalent to n + 1 but provides
 * a semantic function for incrementing operations. Useful in functional
 * pipelines and iterative operations. Returns NaN for non-numeric inputs
 * to support safe error handling.
 * 
 * @param n - Number to increment
 * @returns Number plus 1, or NaN if invalid
 * @example
 * ```typescript
 * // Basic increment
 * increment(5)
 * // 6
 * 
 * increment(0)
 * // 1
 * 
 * increment(-1)
 * // 0
 * 
 * increment(-2)
 * // -1
 * 
 * // Decimal numbers
 * increment(5.5)
 * // 6.5
 * 
 * increment(0.9)
 * // 1.9
 * 
 * increment(-0.5)
 * // 0.5
 * 
 * increment(-1.5)
 * // -0.5
 * 
 * // Large numbers
 * increment(999999)
 * // 1000000
 * 
 * increment(Number.MAX_SAFE_INTEGER - 1)
 * // 9007199254740991 (MAX_SAFE_INTEGER)
 * 
 * increment(Number.MAX_SAFE_INTEGER)
 * // 9007199254740992 (loses precision)
 * 
 * // Small numbers
 * increment(Number.MIN_VALUE)
 * // 1 (MIN_VALUE is very small positive)
 * 
 * increment(-Number.MIN_VALUE)
 * // 1 (approximately)
 * 
 * // Special values
 * increment(Infinity)
 * // Infinity
 * 
 * increment(-Infinity)
 * // -Infinity
 * 
 * increment(NaN)
 * // NaN
 * 
 * // Edge cases
 * increment(-1)
 * // 0
 * 
 * increment(-0)
 * // 1
 * 
 * // Invalid inputs return NaN
 * increment(null)
 * // NaN
 * 
 * increment(undefined)
 * // NaN
 * 
 * increment("5")
 * // NaN
 * 
 * increment("abc")
 * // NaN
 * 
 * increment({})
 * // NaN
 * 
 * increment([])
 * // NaN
 * 
 * // Loop counter
 * let counter = 0
 * while (counter < 10) {
 *   console.log(counter)
 *   counter = increment(counter)
 * }
 * // Logs: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
 * 
 * // Array indexing
 * const arr = ['a', 'b', 'c', 'd', 'e']
 * let index = 0
 * index = increment(index)
 * arr[index]
 * // 'b'
 * 
 * // Generate sequence
 * function sequence(start: number, count: number): Array<number> {
 *   const result: Array<number> = []
 *   let current = start
 *   for (let i = 0; i < count; i++) {
 *     result.push(current)
 *     current = increment(current)
 *   }
 *   return result
 * }
 * sequence(5, 5)
 * // [5, 6, 7, 8, 9]
 * 
 * // Page navigation
 * let currentPage = 1
 * const nextPage = increment(currentPage)
 * // 2
 * 
 * // Level progression
 * const currentLevel = 5
 * const nextLevel = increment(currentLevel)
 * // 6
 * 
 * // Score tracking
 * let score = 0
 * score = increment(score) // Add point
 * // 1
 * 
 * // Array operations
 * const numbers = [1, 2, 3, 4, 5]
 * const incremented = numbers.map(increment)
 * // [2, 3, 4, 5, 6]
 * 
 * // ID generation
 * let lastId = 1000
 * function generateId(): number {
 *   lastId = increment(lastId)
 *   return lastId
 * }
 * generateId()
 * // 1001
 * generateId()
 * // 1002
 * 
 * // Counter object
 * const counter = {
 *   value: 0,
 *   next() {
 *     this.value = increment(this.value)
 *     return this.value
 *   }
 * }
 * counter.next()
 * // 1
 * counter.next()
 * // 2
 * 
 * // Date calculations (simplified)
 * const dayOfMonth = 15
 * const tomorrow = increment(dayOfMonth)
 * // 16
 * 
 * // Iteration helper
 * function times(n: number, fn: (i: number) => void): void {
 *   let i = 0
 *   while (i < n) {
 *     fn(i)
 *     i = increment(i)
 *   }
 * }
 * times(3, i => console.log(`Iteration ${i}`))
 * // Logs: Iteration 0, Iteration 1, Iteration 2
 * 
 * // Step counter
 * let steps = 0
 * function takeStep(): number {
 *   steps = increment(steps)
 *   return steps
 * }
 * takeStep()
 * // 1
 * takeStep()
 * // 2
 * 
 * // Version numbering (patch)
 * const version = {
 *   major: 1,
 *   minor: 2,
 *   patch: 3
 * }
 * version.patch = increment(version.patch)
 * // { major: 1, minor: 2, patch: 4 }
 * 
 * // Building number sequences
 * function range(start: number, end: number): Array<number> {
 *   const result: Array<number> = []
 *   let current = start
 *   while (current <= end) {
 *     result.push(current)
 *     current = increment(current)
 *   }
 *   return result
 * }
 * range(5, 10)
 * // [5, 6, 7, 8, 9, 10]
 * 
 * // Recursive countdown (upward)
 * function countUp(from: number, to: number): void {
 *   if (from > to) return
 *   console.log(from)
 *   countUp(increment(from), to)
 * }
 * countUp(1, 3)
 * // Logs: 1, 2, 3
 * 
 * // Comparison with manual addition
 * const n = 100
 * const manual = n + 1
 * const functional = increment(n)
 * console.log(manual === functional)
 * // true
 * 
 * // Pipeline processing
 * const pipeline = [
 *   increment,
 *   (x: number) => x * 2,
 *   increment
 * ]
 * const result = pipeline.reduce((acc, fn) => fn(acc), 5)
 * // 13 ((5 + 1) * 2 + 1)
 * 
 * // Finding next available
 * function findNextAvailable(used: Set<number>, start: number = 0): number {
 *   let current = start
 *   while (used.has(current)) {
 *     current = increment(current)
 *   }
 *   return current
 * }
 * findNextAvailable(new Set([1, 2, 3, 5, 6]), 1)
 * // 4
 * 
 * // Safe increment with validation
 * function safeIncrement(value: unknown): number | null {
 *   const num = typeof value === 'number' ? increment(value) : NaN
 *   return isNaN(num) ? null : num
 * }
 * safeIncrement(5)
 * // 6
 * safeIncrement("invalid")
 * // null
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Inverse - increment is the inverse of decrement
 */
const increment = (
	n: number | null | undefined
): number => {
	if (n == null || typeof n !== 'number') {
		return NaN
	}
	
	return n + 1
}

export default increment