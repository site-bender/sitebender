/**
 * Partition array by consecutive elements satisfying predicate
 * 
 * Splits an array into subarrays where each subarray contains consecutive
 * elements that produce the same result when passed to the predicate function.
 * Unlike regular partition which creates two groups, this creates multiple
 * groups based on runs of elements with the same predicate result. Useful
 * for grouping consecutive similar items, run-length encoding, and data
 * segmentation.
 * 
 * @curried (predicate) => (array) => partitions
 * @param predicate - Function that determines grouping
 * @param array - Array to partition
 * @returns Array of subarrays with consecutive similar elements
 * @example
 * ```typescript
 * // Group consecutive even/odd numbers
 * const isEven = (n: number) => n % 2 === 0
 * partitionBy(isEven)([1, 3, 5, 2, 4, 6, 7, 9])
 * // [[1, 3, 5], [2, 4, 6], [7, 9]]
 * 
 * // Group by sign
 * const isPositive = (n: number) => n > 0
 * partitionBy(isPositive)([-1, -2, 3, 4, -5, 6])
 * // [[-1, -2], [3, 4], [-5], [6]]
 * 
 * // Group consecutive same values
 * const equals5 = (n: number) => n === 5
 * partitionBy(equals5)([1, 2, 5, 5, 5, 3, 4])
 * // [[1, 2], [5, 5, 5], [3, 4]]
 * 
 * // String length grouping
 * const isLong = (s: string) => s.length > 3
 * partitionBy(isLong)(["a", "bb", "long", "word", "x", "y", "another"])
 * // [["a", "bb"], ["long", "word"], ["x", "y"], ["another"]]
 * 
 * // Empty array
 * partitionBy(isEven)([])
 * // []
 * 
 * // Single element
 * partitionBy(isEven)([1])
 * // [[1]]
 * 
 * // All same group
 * partitionBy(isEven)([2, 4, 6, 8])
 * // [[2, 4, 6, 8]]
 * 
 * // Alternating groups
 * partitionBy(isEven)([1, 2, 3, 4, 5])
 * // [[1], [2], [3], [4], [5]]
 * 
 * // Boolean property grouping
 * interface Task {
 *   id: number
 *   completed: boolean
 * }
 * const tasks: Array<Task> = [
 *   { id: 1, completed: false },
 *   { id: 2, completed: false },
 *   { id: 3, completed: true },
 *   { id: 4, completed: true },
 *   { id: 5, completed: false }
 * ]
 * partitionBy((t: Task) => t.completed)(tasks)
 * // [
 * //   [{ id: 1, completed: false }, { id: 2, completed: false }],
 * //   [{ id: 3, completed: true }, { id: 4, completed: true }],
 * //   [{ id: 5, completed: false }]
 * // ]
 * 
 * // Character type grouping
 * const isLetter = (c: string) => /[a-zA-Z]/.test(c)
 * partitionBy(isLetter)([..."a1b2c34def"])
 * // [["a"], ["1"], ["b"], ["2"], ["c"], ["3", "4"], ["d", "e", "f"]]
 * 
 * // Grade grouping
 * const isPassing = (grade: number) => grade >= 60
 * partitionBy(isPassing)([45, 50, 75, 80, 85, 55, 40])
 * // [[45, 50], [75, 80, 85], [55, 40]]
 * 
 * // Run-length encoding preparation
 * const data = [1, 1, 1, 2, 2, 3, 1, 1]
 * const runs = partitionBy((x: number) => x)(data)
 * // Note: This doesn't work as intended since predicate returns different values
 * // Use custom equality instead:
 * const partitionBySame = <T>(arr: Array<T>): Array<Array<T>> => {
 *   if (arr.length === 0) return []
 *   const result: Array<Array<T>> = []
 *   let current: Array<T> = [arr[0]]
 *   for (let i = 1; i < arr.length; i++) {
 *     if (arr[i] === arr[i - 1]) {
 *       current.push(arr[i])
 *     } else {
 *       result.push(current)
 *       current = [arr[i]]
 *     }
 *   }
 *   result.push(current)
 *   return result
 * }
 * 
 * // State changes
 * const readings = [20, 22, 25, 30, 28, 26, 24, 35, 40]
 * const isHigh = (temp: number) => temp > 30
 * partitionBy(isHigh)(readings)
 * // [[20, 22, 25, 30, 28, 26, 24], [35, 40]]
 * 
 * // Whitespace grouping
 * const isWhitespace = (c: string) => /\s/.test(c)
 * partitionBy(isWhitespace)([..."hello  world"])
 * // [["h", "e", "l", "l", "o"], [" ", " "], ["w", "o", "r", "l", "d"]]
 * 
 * // Trend detection
 * const measurements = [1, 2, 3, 3, 2, 1, 2, 3, 4]
 * let prev = measurements[0]
 * const isIncreasing = (n: number) => {
 *   const increasing = n > prev
 *   prev = n
 *   return increasing
 * }
 * // Note: Stateful predicates can produce unexpected results
 * // Better to use index-based approach for trends
 * ```
 * @property Pure - No side effects (assuming pure predicate)
 * @property Immutable - Does not modify input array
 * @property Order-preserving - Maintains element order within groups
 */
const partitionBy = <T>(predicate: (value: T) => unknown) => 
	(array: Array<T>): Array<Array<T>> => {
		if (array.length === 0) return []
		
		const result: Array<Array<T>> = []
		let currentGroup: Array<T> = [array[0]]
		let currentKey = predicate(array[0])
		
		for (let i = 1; i < array.length; i++) {
			const key = predicate(array[i])
			if (key === currentKey) {
				currentGroup.push(array[i])
			} else {
				result.push(currentGroup)
				currentGroup = [array[i]]
				currentKey = key
			}
		}
		
		result.push(currentGroup)
		return result
	}

export default partitionBy