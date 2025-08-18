/**
 * Rotates array elements to the right by n positions
 * 
 * Moves elements from the end of the array to the beginning, rotating
 * the array rightward. Elements that fall off the right side wrap around
 * to the left. Negative rotations rotate left. Rotations larger than
 * array length wrap around. Useful for circular buffers, carousels,
 * scheduling, or cyclic operations.
 * 
 * @curried (n) => (array) => result
 * @param n - Number of positions to rotate right (negative rotates left)
 * @param array - Array to rotate
 * @returns New array with elements rotated right by n positions
 * @example
 * ```typescript
 * // Basic right rotation
 * rotateRight(2)([1, 2, 3, 4, 5])
 * // [4, 5, 1, 2, 3]
 * 
 * // Rotate by 1
 * rotateRight(1)([1, 2, 3, 4, 5])
 * // [5, 1, 2, 3, 4]
 * 
 * // Rotate by array length (full cycle)
 * rotateRight(5)([1, 2, 3, 4, 5])
 * // [1, 2, 3, 4, 5]
 * 
 * // Rotate beyond array length (wraps)
 * rotateRight(7)([1, 2, 3, 4, 5])
 * // [4, 5, 1, 2, 3] (same as rotate by 2)
 * 
 * // Negative rotation (rotates left)
 * rotateRight(-2)([1, 2, 3, 4, 5])
 * // [3, 4, 5, 1, 2]
 * 
 * // Zero rotation (no change)
 * rotateRight(0)([1, 2, 3, 4, 5])
 * // [1, 2, 3, 4, 5]
 * 
 * // String array
 * rotateRight(3)(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"])
 * // ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"]
 * 
 * // Carousel navigation (previous)
 * const slides = ["slide1", "slide2", "slide3", "slide4", "slide5"]
 * rotateRight(1)(slides)  // Previous slide
 * // ["slide5", "slide1", "slide2", "slide3", "slide4"]
 * rotateRight(-1)(slides) // Next slide
 * // ["slide2", "slide3", "slide4", "slide5", "slide1"]
 * 
 * // Task rotation backwards
 * const tasks = ["Alice", "Bob", "Charlie", "David"]
 * rotateRight(1)(tasks)  // Previous person's turn
 * // ["David", "Alice", "Bob", "Charlie"]
 * 
 * // Undo rotation
 * const original = [1, 2, 3, 4, 5]
 * const leftRotated = rotateLeft(2)(original)
 * // [3, 4, 5, 1, 2]
 * const restored = rotateRight(2)(leftRotated)
 * // [1, 2, 3, 4, 5]
 * 
 * // History navigation
 * const history = ["page1", "page2", "page3", "page4", "page5"]
 * rotateRight(1)(history)  // Go back
 * // ["page5", "page1", "page2", "page3", "page4"]
 * 
 * // Shift schedule reverse
 * const shifts = ["morning", "afternoon", "night"]
 * rotateRight(1)(shifts)
 * // ["night", "morning", "afternoon"]
 * 
 * // Playlist previous
 * const playlist = ["Song A", "Song B", "Song C", "Song D"]
 * rotateRight(1)(playlist)  // Previous song
 * // ["Song D", "Song A", "Song B", "Song C"]
 * 
 * // Buffer rotation right
 * const buffer = [1, 2, 3, 4, 5, 6, 7, 8]
 * rotateRight(3)(buffer)
 * // [6, 7, 8, 1, 2, 3, 4, 5]
 * 
 * // Single element (no effect)
 * rotateRight(5)([42])
 * // [42]
 * 
 * // Two elements
 * rotateRight(1)([1, 2])
 * // [2, 1]
 * 
 * // Empty array
 * rotateRight(3)([])
 * // []
 * 
 * // Large rotation (efficiently handled with modulo)
 * rotateRight(1002)([1, 2, 3, 4, 5])
 * // [4, 5, 1, 2, 3] (1002 % 5 = 2)
 * 
 * // Caesar cipher reverse (ROT13 decrypt)
 * const alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
 * const rot13Decrypt = rotateRight(13)(alphabet).join("")
 * // "nopqrstuvwxyzabcdefghijklm"
 * 
 * // Time zone adjustment backwards
 * const hours = Array.from({ length: 24 }, (_, i) => i)
 * rotateRight(3)(hours)  // Shift timezone back by 3 hours
 * // [21, 22, 23, 0, 1, 2, ..., 20]
 * 
 * // Game turns reverse
 * const players = ["North", "East", "South", "West"]
 * rotateRight(1)(players)  // Previous player
 * // ["West", "North", "East", "South"]
 * 
 * // Stack rotation (bottom to top)
 * const stack = [1, 2, 3, 4, 5]
 * rotateRight(1)(stack)
 * // [5, 1, 2, 3, 4]
 * 
 * // Animation frames reverse
 * const frames = ["frame0", "frame1", "frame2", "frame3"]
 * rotateRight(1)(frames)  // Previous frame
 * // ["frame3", "frame0", "frame1", "frame2"]
 * 
 * // Color wheel reverse
 * const colors = ["red", "orange", "yellow", "green", "blue", "purple"]
 * rotateRight(2)(colors)
 * // ["blue", "purple", "red", "orange", "yellow", "green"]
 * 
 * // Matrix row rotation
 * const matrix = [
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, 9]
 * ]
 * rotateRight(1)(matrix)
 * // [
 * //   [7, 8, 9],
 * //   [1, 2, 3],
 * //   [4, 5, 6]
 * // ]
 * 
 * // Partial application for common rotations
 * const rotatePrevious = rotateRight(1)
 * rotatePrevious([1, 2, 3])  // [3, 1, 2]
 * rotatePrevious(["a", "b", "c"])  // ["c", "a", "b"]
 * 
 * const rotateNext = rotateRight(-1)
 * rotateNext([1, 2, 3])  // [2, 3, 1]
 * 
 * // Handle null/undefined gracefully
 * rotateRight(2)(null)       // []
 * rotateRight(2)(undefined)  // []
 * 
 * // Complex objects
 * const items = [
 *   { id: 1, value: "first" },
 *   { id: 2, value: "second" },
 *   { id: 3, value: "third" }
 * ]
 * rotateRight(1)(items)
 * // [
 * //   { id: 3, value: "third" },
 * //   { id: 1, value: "first" },
 * //   { id: 2, value: "second" }
 * // ]
 * 
 * // Circular menu
 * const menuItems = ["File", "Edit", "View", "Tools", "Help"]
 * rotateRight(2)(menuItems)  // Navigate backwards 2 items
 * // ["Tools", "Help", "File", "Edit", "View"]
 * 
 * // Combination with map
 * const numbers = [1, 2, 3, 4, 5]
 * const rotatedAndSquared = rotateRight(2)(numbers).map(n => n * n)
 * // [16, 25, 1, 4, 9]
 * 
 * // Conveyor belt simulation
 * const belt = ["item1", "item2", "item3", "item4"]
 * rotateRight(1)(belt)  // Move belt backwards
 * // ["item4", "item1", "item2", "item3"]
 * 
 * // Negative wrapping
 * rotateRight(-7)([1, 2, 3, 4, 5])
 * // [3, 4, 5, 1, 2] (same as rotateRight(-2) or rotateLeft(2))
 * 
 * // Relation to rotateLeft
 * const arr = [1, 2, 3, 4, 5]
 * // rotateRight(n) === rotateLeft(-n)
 * rotateRight(2)(arr)   // [4, 5, 1, 2, 3]
 * rotateLeft(-2)(arr)   // [4, 5, 1, 2, 3]
 * 
 * // DNA sequence shift
 * const dna = ["A", "T", "G", "C"]
 * rotateRight(1)(dna)
 * // ["C", "A", "T", "G"]
 * ```
 * @property Immutable - doesn't modify input array
 * @property Cyclic - elements wrap around
 * @property Bidirectional - negative values rotate left
 */
const rotateRight = <T>(
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
	
	// Rotate right by slicing from the end and concatenating
	return [...array.slice(-normalizedN), ...array.slice(0, -normalizedN)]
}

export default rotateRight