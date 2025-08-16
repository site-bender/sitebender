/**
 * Takes elements from the beginning of an array while predicate returns true
 * 
 * Returns a new array containing elements from the start of the input array,
 * stopping at the first element for which the predicate returns false.
 * Does not continue checking after the first false result.
 * 
 * @curried (predicate) => (array) => result
 * @param predicate - Function that returns true to continue taking elements
 * @param array - Array to take elements from
 * @returns New array with elements taken from the beginning
 * @example
 * ```typescript
 * // Take while less than 5
 * takeWhile((x: number) => x < 5)([1, 3, 5, 7, 2, 1])
 * // [1, 3]  (stops at 5, doesn't check further)
 * 
 * // Take while condition is met
 * takeWhile((x: number) => x % 2 === 0)([2, 4, 6, 7, 8, 10])
 * // [2, 4, 6]  (stops at 7)
 * 
 * // Take while string length increases
 * let lastLength = 0
 * takeWhile((s: string) => {
 *   const take = s.length > lastLength
 *   lastLength = s.length
 *   return take
 * })(["a", "ab", "abc", "ab", "abcd"])
 * // ["a", "ab", "abc"]  (stops when length doesn't increase)
 * 
 * // Take while ascending
 * let last = -Infinity
 * takeWhile((x: number) => {
 *   const take = x > last
 *   last = x
 *   return take
 * })([1, 2, 3, 2, 4, 5])
 * // [1, 2, 3]  (stops when order breaks)
 * 
 * // Take objects while property is true
 * takeWhile((item: { active: boolean }) => item.active)([
 *   { id: 1, active: true },
 *   { id: 2, active: true },
 *   { id: 3, active: false },
 *   { id: 4, active: true }
 * ])
 * // [{ id: 1, active: true }, { id: 2, active: true }]
 * 
 * // Take with index
 * takeWhile((x: number, i: number) => i < 3)([10, 20, 30, 40, 50])
 * // [10, 20, 30]
 * 
 * // Take while sum is under limit
 * let sum = 0
 * takeWhile((x: number) => {
 *   sum += x
 *   return sum <= 10
 * })([2, 3, 4, 5, 6])
 * // [2, 3, 4]  (sum = 9, adding 5 would exceed 10)
 * 
 * // Partial application for reusable takers
 * const takePositive = takeWhile((x: number) => x > 0)
 * takePositive([1, 2, 3, -1, 4, 5])  // [1, 2, 3]
 * takePositive([5, 10, 0, 15])       // [5, 10]
 * 
 * // Edge cases
 * takeWhile((x: number) => x < 5)([])         // []
 * takeWhile((x: number) => x < 0)([1, 2, 3])  // []
 * takeWhile((x: number) => x > 0)([1, 2, 3])  // [1, 2, 3]
 * 
 * // Handle null/undefined gracefully
 * takeWhile((x: number) => x > 0)(null)       // []
 * takeWhile((x: number) => x > 0)(undefined)  // []
 * 
 * // Complex predicate with multiple conditions
 * takeWhile((user: { age: number; verified: boolean }) => 
 *   user.age >= 18 && user.verified
 * )([
 *   { name: "Alice", age: 25, verified: true },
 *   { name: "Bob", age: 30, verified: true },
 *   { name: "Charlie", age: 20, verified: false },
 *   { name: "Dave", age: 35, verified: true }
 * ])
 * // [
 * //   { name: "Alice", age: 25, verified: true },
 * //   { name: "Bob", age: 30, verified: true }
 * // ]
 * ```
 * @property Immutable - doesn't modify input array
 * @property Short-circuit - stops at first false, doesn't evaluate rest
 * @property Order preserving - maintains element order
 */
const takeWhile = <T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean
) => (
	array: ReadonlyArray<T> | null | undefined
): Array<T> => {
	if (array == null || !Array.isArray(array)) {
		return []
	}
	
	const result: Array<T> = []
	
	for (let i = 0; i < array.length; i++) {
		const element = array[i]
		if (!predicate(element, i, array)) {
			break
		}
		result.push(element)
	}
	
	return result
}

export default takeWhile