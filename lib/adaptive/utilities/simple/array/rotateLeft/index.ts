/**
 * Rotates array elements to the left by n positions
 * 
 * Moves elements from the beginning of the array to the end, rotating
 * the array leftward. Elements that fall off the left side wrap around
 * to the right. Negative rotations rotate right. Rotations larger than
 * array length wrap around. Useful for circular buffers, carousels,
 * scheduling, or cyclic operations.
 * 
 * @curried (n) => (array) => result  
 * @param n - Number of positions to rotate left (negative rotates right)
 * @param array - Array to rotate
 * @returns New array with elements rotated left by n positions
 * @example
 * ```typescript
 * // Basic left rotation
 * rotateLeft(2)([1, 2, 3, 4, 5])
 * // [3, 4, 5, 1, 2]
 * 
 * // Rotate by 1
 * rotateLeft(1)([1, 2, 3, 4, 5])
 * // [2, 3, 4, 5, 1]
 * 
 * // Rotate by array length (full cycle)
 * rotateLeft(5)([1, 2, 3, 4, 5])
 * // [1, 2, 3, 4, 5]
 * 
 * // Rotate beyond array length (wraps)
 * rotateLeft(7)([1, 2, 3, 4, 5])
 * // [3, 4, 5, 1, 2] (same as rotate by 2)
 * 
 * // Negative rotation (rotates right)
 * rotateLeft(-2)([1, 2, 3, 4, 5])
 * // [4, 5, 1, 2, 3]
 * 
 * // Zero rotation (no change)
 * rotateLeft(0)([1, 2, 3, 4, 5])
 * // [1, 2, 3, 4, 5]
 * 
 * // String array
 * rotateLeft(3)(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"])
 * // ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"]
 * 
 * // Carousel navigation
 * const slides = ["slide1", "slide2", "slide3", "slide4", "slide5"]
 * rotateLeft(1)(slides)  // Next slide
 * // ["slide2", "slide3", "slide4", "slide5", "slide1"]
 * rotateLeft(-1)(slides) // Previous slide
 * // ["slide5", "slide1", "slide2", "slide3", "slide4"]
 * 
 * // Task rotation
 * const tasks = ["Alice", "Bob", "Charlie", "David"]
 * rotateLeft(1)(tasks)  // Next person's turn
 * // ["Bob", "Charlie", "David", "Alice"]
 * 
 * // Shift schedule
 * const shifts = ["morning", "afternoon", "night"]
 * rotateLeft(1)(shifts)
 * // ["afternoon", "night", "morning"]
 * 
 * // Menu rotation
 * const menu = ["Pizza", "Burger", "Salad", "Pasta", "Soup"]
 * rotateLeft(2)(menu)  // Skip ahead 2 days
 * // ["Salad", "Pasta", "Soup", "Pizza", "Burger"]
 * 
 * // Color cycling
 * const colors = ["red", "green", "blue"]
 * rotateLeft(1)(colors)
 * // ["green", "blue", "red"]
 * 
 * // Buffer rotation
 * const buffer = [1, 2, 3, 4, 5, 6, 7, 8]
 * rotateLeft(3)(buffer)
 * // [4, 5, 6, 7, 8, 1, 2, 3]
 * 
 * // Single element (no effect)
 * rotateLeft(5)([42])
 * // [42]
 * 
 * // Two elements
 * rotateLeft(1)([1, 2])
 * // [2, 1]
 * 
 * // Empty array
 * rotateLeft(3)([])
 * // []
 * 
 * // Large rotation (efficiently handled with modulo)
 * rotateLeft(1002)([1, 2, 3, 4, 5])
 * // [3, 4, 5, 1, 2] (1002 % 5 = 2)
 * 
 * // Playlist rotation
 * const playlist = ["Song A", "Song B", "Song C", "Song D"]
 * rotateLeft(1)(playlist)  // Skip to next
 * // ["Song B", "Song C", "Song D", "Song A"]
 * 
 * // Caesar cipher (rotate alphabet)
 * const alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
 * const rot13 = rotateLeft(13)(alphabet).join("")
 * // "nopqrstuvwxyzabcdefghijklm"
 * 
 * // Time slots
 * const hours = Array.from({ length: 24 }, (_, i) => i)
 * rotateLeft(3)(hours)  // Shift timezone by 3 hours
 * // [3, 4, 5, ..., 23, 0, 1, 2]
 * 
 * // Game turns
 * const players = ["North", "East", "South", "West"]
 * rotateLeft(1)(players)  // Next player
 * // ["East", "South", "West", "North"]
 * 
 * // Circular queue simulation
 * const queue = [1, 2, 3, 4, 5]
 * const dequeueAndEnqueue = (q: number[]) => {
 *   const rotated = rotateLeft(1)(q)
 *   // First element moved to back
 *   return rotated
 * }
 * dequeueAndEnqueue(queue)
 * // [2, 3, 4, 5, 1]
 * 
 * // Animation frames
 * const frames = ["frame0", "frame1", "frame2", "frame3"]
 * rotateLeft(1)(frames)  // Next frame
 * // ["frame1", "frame2", "frame3", "frame0"]
 * 
 * // Partial application for common rotations
 * const rotateOne = rotateLeft(1)
 * rotateOne([1, 2, 3])  // [2, 3, 1]
 * rotateOne(["a", "b", "c"])  // ["b", "c", "a"]
 * 
 * const rotatePrev = rotateLeft(-1)
 * rotatePrev([1, 2, 3])  // [3, 1, 2]
 * 
 * // Handle null/undefined gracefully
 * rotateLeft(2)(null)       // []
 * rotateLeft(2)(undefined)  // []
 * 
 * // Complex objects
 * const items = [
 *   { id: 1, value: "first" },
 *   { id: 2, value: "second" },
 *   { id: 3, value: "third" }
 * ]
 * rotateLeft(1)(items)
 * // [
 * //   { id: 2, value: "second" },
 * //   { id: 3, value: "third" },
 * //   { id: 1, value: "first" }
 * // ]
 * 
 * // Combination with other operations
 * const numbers = [1, 2, 3, 4, 5]
 * const rotatedAndDoubled = rotateLeft(2)(numbers).map(n => n * 2)
 * // [6, 8, 10, 2, 4]
 * 
 * // LED display rotation
 * const display = [
 *   [1, 0, 0],
 *   [0, 1, 0],
 *   [0, 0, 1]
 * ]
 * rotateLeft(1)(display)
 * // [
 * //   [0, 1, 0],
 * //   [0, 0, 1],
 * //   [1, 0, 0]
 * // ]
 * 
 * // Negative wrapping
 * rotateLeft(-7)([1, 2, 3, 4, 5])
 * // [4, 5, 1, 2, 3] (same as rotateLeft(3) or rotateRight(2))
 * ```
 * @property Immutable - doesn't modify input array
 * @property Cyclic - elements wrap around
 * @property Bidirectional - negative values rotate right
 */
const rotateLeft = <T>(
	n: number
) => (
	array: ReadonlyArray<T> | null | undefined
): Array<T> => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return []
	}
	
	// Normalize rotation amount to be within array bounds
	// Handles negative rotations and rotations larger than array length
	const len = array.length
	const normalizedN = ((n % len) + len) % len
	
	if (normalizedN === 0) {
		return [...array]
	}
	
	// Rotate by slicing and concatenating
	return [...array.slice(normalizedN), ...array.slice(0, normalizedN)]
}

export default rotateLeft