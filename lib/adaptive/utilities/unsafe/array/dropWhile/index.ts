/**
 * Drops elements from the beginning of an array while predicate returns true
 * 
 * Returns a new array with elements from the beginning removed as long as
 * the predicate returns true. Once predicate returns false, all remaining
 * elements are included. Does not continue checking after the first false.
 * 
 * @curried (predicate) => (array) => result
 * @param predicate - Function that returns true to continue dropping elements
 * @param array - Array to drop elements from
 * @returns New array with initial elements dropped
 * @example
 * ```typescript
 * // Drop while less than 5
 * dropWhile((x: number) => x < 5)([1, 3, 5, 7, 2, 1])
 * // [5, 7, 2, 1]  (keeps everything from 5 onward)
 * 
 * // Drop while even
 * dropWhile((x: number) => x % 2 === 0)([2, 4, 6, 7, 8, 10])
 * // [7, 8, 10]  (keeps from first odd number onward)
 * 
 * // Drop leading whitespace characters
 * dropWhile((c: string) => c === " ")([..." hello world"])
 * // ["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]
 * 
 * // Drop while negative
 * dropWhile((x: number) => x < 0)([-3, -1, 0, 2, -5, 4])
 * // [0, 2, -5, 4]  (keeps from first non-negative onward)
 * 
 * // Drop objects while inactive
 * dropWhile((item: { active: boolean }) => !item.active)([
 *   { id: 1, active: false },
 *   { id: 2, active: false },
 *   { id: 3, active: true },
 *   { id: 4, active: false }
 * ])
 * // [
 * //   { id: 3, active: true },
 * //   { id: 4, active: false }
 * // ]
 * 
 * // Drop with index condition
 * dropWhile((x: number, i: number) => i < 3)([10, 20, 30, 40, 50])
 * // [40, 50]
 * 
 * // Drop while accumulating sum is small
 * let sum = 0
 * dropWhile((x: number) => {
 *   sum += x
 *   return sum < 10
 * })([2, 3, 4, 5, 6])
 * // [5, 6]  (dropped 2, 3, 4 which sum to 9)
 * 
 * // Skip header rows
 * dropWhile((row: string) => row.startsWith("#"))([
 *   "# Header 1",
 *   "# Header 2",
 *   "Data row 1",
 *   "# Not a header",
 *   "Data row 2"
 * ])
 * // ["Data row 1", "# Not a header", "Data row 2"]
 * 
 * // Partial application for reusable droppers
 * const dropZeros = dropWhile((x: number) => x === 0)
 * dropZeros([0, 0, 0, 1, 2, 0, 3])  // [1, 2, 0, 3]
 * dropZeros([1, 2, 3])               // [1, 2, 3]
 * dropZeros([0, 0, 0])               // []
 * 
 * // Drop until threshold
 * const dropUntilLarge = dropWhile((x: number) => x < 100)
 * dropUntilLarge([10, 50, 150, 30, 200])  // [150, 30, 200]
 * dropUntilLarge([200, 50, 10])           // [200, 50, 10]
 * 
 * // Edge cases
 * dropWhile((x: number) => x < 5)([])         // []
 * dropWhile((x: number) => false)([1, 2, 3])  // [1, 2, 3]
 * dropWhile((x: number) => true)([1, 2, 3])   // []
 * 
 * // Handle null/undefined gracefully
 * dropWhile((x: number) => x > 0)(null)       // []
 * dropWhile((x: number) => x > 0)(undefined)  // []
 * 
 * // Complex predicate for filtering initial invalid entries
 * dropWhile((entry: { valid: boolean; timestamp: number }) => 
 *   !entry.valid || entry.timestamp < 1000
 * )([
 *   { valid: false, timestamp: 500 },
 *   { valid: true, timestamp: 800 },
 *   { valid: true, timestamp: 1200 },
 *   { valid: false, timestamp: 1500 }
 * ])
 * // [
 * //   { valid: true, timestamp: 1200 },
 * //   { valid: false, timestamp: 1500 }
 * // ]
 * ```
 * @property Immutable - doesn't modify input array
 * @property Short-circuit - stops checking at first false
 * @property Order preserving - maintains element order after drop point
 */
const dropWhile = <T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean
) => (
	array: ReadonlyArray<T> | null | undefined
): Array<T> => {
	if (array == null || !Array.isArray(array)) {
		return []
	}
	
	let dropIndex = 0
	
	for (let i = 0; i < array.length; i++) {
		if (!predicate(array[i], i, array)) {
			dropIndex = i
			break
		}
		dropIndex = i + 1
	}
	
	return array.slice(dropIndex)
}

export default dropWhile