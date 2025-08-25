/**
 * Calls a function n times and collects the results in an array
 *
 * Executes a function n times, passing the current index to each call,
 * and returns an array of the results. The function receives the current
 * iteration index (0-based) as its argument. Useful for generating arrays
 * of a specific length, creating test data, repeating operations, or
 * building sequences based on index.
 *
 * @curried (n) => (fn) => result
 * @param n - Number of times to call the function
 * @param fn - Function to call, receives index as argument
 * @returns Array containing the results of each function call
 * @example
 * ```typescript
 * // Generate array of numbers
 * times(5)((i: number) => i)
 * // [0, 1, 2, 3, 4]
 *
 * // Generate array of squares
 * times(5)((i: number) => i * i)
 * // [0, 1, 4, 9, 16]
 *
 * // Create array of constants
 * times(3)(() => "hello")
 * // ["hello", "hello", "hello"]
 *
 * // Generate IDs
 * times(4)((i: number) => `id-${i + 1}`)
 * // ["id-1", "id-2", "id-3", "id-4"]
 *
 * // Create objects
 * times(3)((i: number) => ({ id: i, value: i * 10 }))
 * // [
 * //   { id: 0, value: 0 },
 * //   { id: 1, value: 10 },
 * //   { id: 2, value: 20 }
 * // ]
 *
 * // Generate random numbers
 * times(5)(() => Math.random())
 * // [0.123..., 0.456..., 0.789..., 0.234..., 0.567...]
 *
 * // Create date range
 * const today = new Date()
 * times(7)((i: number) => {
 *   const date = new Date(today)
 *   date.setDate(date.getDate() + i)
 *   return date.toDateString()
 * })
 * // ["Mon Jan 1", "Tue Jan 2", "Wed Jan 3", ...]
 *
 * // Generate alphabet
 * times(26)((i: number) => String.fromCharCode(65 + i))
 * // ["A", "B", "C", ..., "Z"]
 *
 * // Create matrix row
 * times(5)((i: number) => i === 2 ? 1 : 0)
 * // [0, 0, 1, 0, 0]
 *
 * // Generate coordinates
 * times(4)((i: number) => ({ x: i, y: i * 2 }))
 * // [
 * //   { x: 0, y: 0 },
 * //   { x: 1, y: 2 },
 * //   { x: 2, y: 4 },
 * //   { x: 3, y: 6 }
 * // ]
 *
 * // Create test users
 * times(3)((i: number) => ({
 *   name: `User${i + 1}`,
 *   email: `user${i + 1}@example.com`,
 *   age: 20 + i * 5
 * }))
 * // [
 * //   { name: "User1", email: "user1@example.com", age: 20 },
 * //   { name: "User2", email: "user2@example.com", age: 25 },
 * //   { name: "User3", email: "user3@example.com", age: 30 }
 * // ]
 *
 * // Fibonacci sequence
 * let a = 0, b = 1
 * times(10)(() => {
 *   const result = a
 *   const next = a + b
 *   a = b
 *   b = next
 *   return result
 * })
 * // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
 *
 * // Powers of 2
 * times(8)((i: number) => Math.pow(2, i))
 * // [1, 2, 4, 8, 16, 32, 64, 128]
 *
 * // Generate color palette
 * times(5)((i: number) => `hsl(${i * 72}, 70%, 50%)`)
 * // ["hsl(0, 70%, 50%)", "hsl(72, 70%, 50%)", ...]
 *
 * // Create grid positions
 * const gridSize = 3
 * times(gridSize * gridSize)((i: number) => ({
 *   row: Math.floor(i / gridSize),
 *   col: i % gridSize
 * }))
 * // [
 * //   { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 },
 * //   { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 },
 * //   { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }
 * // ]
 *
 * // n = 0 (returns empty array)
 * times(0)((i: number) => i)
 * // []
 *
 * // n = 1
 * times(1)((i: number) => i * 100)
 * // [0]
 *
 * // Negative n (treated as 0)
 * times(-5)((i: number) => i)
 * // []
 *
 * // Generate DOM elements (conceptual)
 * times(5)((i: number) => `<div>Item ${i + 1}</div>`)
 * // ["<div>Item 1</div>", "<div>Item 2</div>", ...]
 *
 * // Create animation frames
 * times(60)((i: number) => ({
 *   frame: i,
 *   rotation: i * 6,  // 360 degrees in 60 frames
 *   opacity: 1 - (i / 60)
 * }))
 * // Animation keyframes
 *
 * // Generate time slots
 * times(24)((i: number) => {
 *   const hour = i.toString().padStart(2, "0")
 *   return `${hour}:00`
 * })
 * // ["00:00", "01:00", "02:00", ..., "23:00"]
 *
 * // Create boolean array
 * times(10)((i: number) => i % 2 === 0)
 * // [true, false, true, false, true, false, true, false, true, false]
 *
 * // Generate mock data
 * times(5)((i: number) => ({
 *   id: `mock-${i}`,
 *   status: i % 3 === 0 ? "active" : "inactive",
 *   value: Math.floor(Math.random() * 100)
 * }))
 * // Mock data array
 *
 * // Create pagination
 * const totalPages = 10
 * times(totalPages)((i: number) => ({
 *   page: i + 1,
 *   offset: i * 20,
 *   limit: 20
 * }))
 * // Pagination configs
 *
 * // Generate sine wave points
 * times(20)((i: number) => {
 *   const x = i * 0.5
 *   return { x, y: Math.sin(x) }
 * })
 * // Sine wave data points
 *
 * // Partial application for common patterns
 * const repeat = (value: any) => times(5)(() => value)
 * repeat("A")  // ["A", "A", "A", "A", "A"]
 * repeat(42)   // [42, 42, 42, 42, 42]
 *
 * const range = (n: number) => times(n)((i: number) => i)
 * range(5)   // [0, 1, 2, 3, 4]
 * range(10)  // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 *
 * // Create lookup table
 * const factorials = times(10)((i: number) => {
 *   let result = 1
 *   for (let j = 2; j <= i; j++) {
 *     result *= j
 *   }
 *   return result
 * })
 * // [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880]
 *
 * // Generate test cases
 * times(5)((i: number) => ({
 *   input: i * 2,
 *   expected: i * 4
 * }))
 * // Test case array
 *
 * // Create bit flags
 * times(8)((i: number) => 1 << i)
 * // [1, 2, 4, 8, 16, 32, 64, 128]
 *
 * // Generate CSS classes
 * times(5)((i: number) => `col-${i + 1}`)
 * // ["col-1", "col-2", "col-3", "col-4", "col-5"]
 *
 * // Create delay sequence
 * times(5)((i: number) => i * 100)
 * // [0, 100, 200, 300, 400] (milliseconds)
 *
 * // Build histogram bins
 * times(10)((i: number) => ({
 *   min: i * 10,
 *   max: (i + 1) * 10,
 *   count: 0
 * }))
 * // Histogram bin objects
 *
 * // Generate musical notes
 * const notes = ["C", "D", "E", "F", "G", "A", "B"]
 * times(7)((i: number) => notes[i])
 * // ["C", "D", "E", "F", "G", "A", "B"]
 *
 * // Create circular positions
 * times(12)((i: number) => {
 *   const angle = (i * 30) * Math.PI / 180  // 30 degrees each
 *   return {
 *     x: Math.cos(angle),
 *     y: Math.sin(angle)
 *   }
 * })
 * // Clock positions
 *
 * // Error handling with NaN/Infinity
 * times(NaN)((i: number) => i)         // []
 * times(Infinity)((i: number) => i)    // [] (protected against infinite loop)
 * times(3.7)((i: number) => i)         // [0, 1, 2] (truncated to 3)
 * ```
 * @property Pure - Same inputs produce same outputs (unless fn has side effects)
 * @property Generator - Creates new array based on function calls
 * @property Indexed - Function receives 0-based index
 */
const times = <T>(
	n: number,
) =>
(
	fn: (index: number) => T,
): Array<T> => {
	// Handle invalid n values
	if (n == null || n <= 0 || !Number.isFinite(n)) {
		return []
	}

	// Truncate to integer
	const count = Math.floor(n)

	const result: Array<T> = []
	for (let i = 0; i < count; i++) {
		result.push(fn(i))
	}

	return result
}

export default times
