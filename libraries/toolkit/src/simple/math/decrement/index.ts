/**
 * Subtracts 1 from a number
 *
 * Decrements a number by one. This is equivalent to n - 1 but provides
 * a semantic function for decrementing operations. Useful in functional
 * pipelines and iterative operations. Returns NaN for non-numeric inputs
 * to support safe error handling.
 *
 * @param n - Number to decrement
 * @returns Number minus 1, or NaN if invalid
 * @example
 * ```typescript
 * // Basic decrement
 * decrement(5)
 * // 4
 *
 * decrement(1)
 * // 0
 *
 * decrement(0)
 * // -1
 *
 * decrement(-1)
 * // -2
 *
 * // Decimal numbers
 * decrement(5.5)
 * // 4.5
 *
 * decrement(1.1)
 * // 0.10000000000000009 (floating point precision)
 *
 * decrement(0.5)
 * // -0.5
 *
 * decrement(-0.5)
 * // -1.5
 *
 * // Large numbers
 * decrement(1000000)
 * // 999999
 *
 * decrement(Number.MAX_SAFE_INTEGER)
 * // 9007199254740990
 *
 * // Small numbers
 * decrement(Number.MIN_VALUE)
 * // -1 (MIN_VALUE is very small positive)
 *
 * decrement(-Number.MIN_VALUE)
 * // -1
 *
 * // Special values
 * decrement(Infinity)
 * // Infinity
 *
 * decrement(-Infinity)
 * // -Infinity
 *
 * decrement(NaN)
 * // NaN
 *
 * // Edge cases
 * decrement(1)
 * // 0
 *
 * decrement(-0)
 * // -1
 *
 * // Invalid inputs return NaN
 * decrement(null)
 * // NaN
 *
 * decrement(undefined)
 * // NaN
 *
 * decrement("5")
 * // NaN
 *
 * decrement("abc")
 * // NaN
 *
 * decrement({})
 * // NaN
 *
 * decrement([])
 * // NaN
 *
 * // Loop counter
 * let counter = 10
 * while (counter > 0) {
 *   console.log(counter)
 *   counter = decrement(counter)
 * }
 * // Logs: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
 *
 * // Array indexing
 * const arr = ['a', 'b', 'c', 'd', 'e']
 * let index = arr.length
 * index = decrement(index)
 * // 4 (last valid index)
 *
 * // Countdown timer
 * function countdown(seconds: number): Array<number> {
 *   const result: Array<number> = []
 *   let current = seconds
 *   while (current >= 0) {
 *     result.push(current)
 *     current = decrement(current)
 *   }
 *   return result
 * }
 * countdown(5)
 * // [5, 4, 3, 2, 1, 0]
 *
 * // Page navigation
 * let currentPage = 10
 * const previousPage = decrement(currentPage)
 * // 9
 *
 * // Level/stage progression (backward)
 * const currentLevel = 5
 * const previousLevel = decrement(currentLevel)
 * // 4
 *
 * // Stock inventory
 * let itemsInStock = 100
 * itemsInStock = decrement(itemsInStock) // Sell one item
 * // 99
 *
 * // Array operations
 * const numbers = [5, 4, 3, 2, 1]
 * const decremented = numbers.map(decrement)
 * // [4, 3, 2, 1, 0]
 *
 * // Health/lives system
 * let lives = 3
 * lives = decrement(lives) // Lose a life
 * // 2
 *
 * // Score penalty
 * let score = 1000
 * const penalty = () => decrement(score)
 * score = penalty()
 * // 999
 *
 * // Date calculations (simplified)
 * const dayOfMonth = 15
 * const yesterday = decrement(dayOfMonth)
 * // 14
 *
 * // Recursion depth
 * function recurse(depth: number): void {
 *   if (depth <= 0) return
 *   console.log(`Depth: ${depth}`)
 *   recurse(decrement(depth))
 * }
 * recurse(3)
 * // Logs: Depth: 3, Depth: 2, Depth: 1
 *
 * // Priority queue
 * const priority = 10
 * const lowerPriority = decrement(priority)
 * // 9
 *
 * // Undo stack pointer
 * let undoPointer = 5
 * undoPointer = decrement(undoPointer) // Move back in history
 * // 4
 *
 * // Iteration with functional approach
 * function repeat(n: number, fn: () => void): void {
 *   if (n <= 0) return
 *   fn()
 *   repeat(decrement(n), fn)
 * }
 * repeat(3, () => console.log("Hello"))
 * // Logs "Hello" 3 times
 *
 * // Building sequences
 * function decrementSequence(start: number, count: number): Array<number> {
 *   const result: Array<number> = []
 *   let current = start
 *   for (let i = 0; i < count; i++) {
 *     result.push(current)
 *     current = decrement(current)
 *   }
 *   return result
 * }
 * decrementSequence(10, 5)
 * // [10, 9, 8, 7, 6]
 *
 * // Comparison with manual subtraction
 * const n = 100
 * const manual = n - 1
 * const functional = decrement(n)
 * console.log(manual === functional)
 * // true
 *
 * // Pipeline processing
 * const pipeline = [
 *   (x: number) => x * 2,
 *   decrement,
 *   (x: number) => x / 3
 * ]
 * const result = pipeline.reduce((acc, fn) => fn(acc), 6)
 * // 3.6666... ((6 * 2 - 1) / 3)
 *
 * // Safe decrement with validation
 * function safeDecrement(value: unknown): number | null {
 *   const num = typeof value === 'number' ? decrement(value) : NaN
 *   return isNaN(num) ? null : num
 * }
 * safeDecrement(5)
 * // 4
 * safeDecrement("invalid")
 * // null
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Inverse - decrement is the inverse of increment
 */
const decrement = (
	n: number | null | undefined,
): number => {
	if (n == null || typeof n !== "number") {
		return NaN
	}

	return n - 1
}

export default decrement
