/**
 * Returns a new array without consecutive duplicate elements
 * 
 * Removes consecutive duplicate elements from an array, keeping only the
 * first occurrence of each run of duplicates. Uses SameValueZero equality
 * for comparison. This is useful for cleaning up data with repeated values,
 * compressing sequences, or removing stuttering in time series data.
 * 
 * @param array - Array to remove consecutive duplicates from
 * @returns New array with consecutive duplicates removed
 * @example
 * ```typescript
 * // Basic consecutive duplicate removal
 * dropRepeats([1, 1, 2, 2, 2, 3, 3, 1, 1])
 * // [1, 2, 3, 1]
 * 
 * // Strings
 * dropRepeats(["a", "a", "b", "b", "c", "c", "c", "a"])
 * // ["a", "b", "c", "a"]
 * 
 * // Mixed types
 * dropRepeats([1, 1, "1", "1", 1, true, true, false])
 * // [1, "1", 1, true, false]
 * 
 * // Objects (uses reference equality)
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * dropRepeats([obj1, obj1, obj2, obj2, obj1])
 * // [obj1, obj2, obj1]
 * 
 * // Arrays
 * dropRepeats([[1], [1], [2], [2], [1]])
 * // [[1], [1], [2], [2], [1]] (different array references)
 * 
 * // Remove stuttering in text
 * dropRepeats(["the", "the", "quick", "brown", "fox", "fox", "fox"])
 * // ["the", "quick", "brown", "fox"]
 * 
 * // Clean sensor data
 * const readings = [20, 20, 20, 21, 21, 22, 22, 22, 21, 21]
 * dropRepeats(readings)
 * // [20, 21, 22, 21]
 * 
 * // Boolean sequences
 * dropRepeats([true, true, false, false, false, true, false])
 * // [true, false, true, false]
 * 
 * // Status changes only
 * const statuses = ["active", "active", "active", "idle", "idle", "active", "error", "error"]
 * dropRepeats(statuses)
 * // ["active", "idle", "active", "error"]
 * 
 * // Single element
 * dropRepeats([1])
 * // [1]
 * 
 * // All same elements
 * dropRepeats([5, 5, 5, 5, 5])
 * // [5]
 * 
 * // No duplicates
 * dropRepeats([1, 2, 3, 4, 5])
 * // [1, 2, 3, 4, 5]
 * 
 * // Empty array
 * dropRepeats([])
 * // []
 * 
 * // NaN handling (NaN === NaN in SameValueZero)
 * dropRepeats([NaN, NaN, 1, 1, NaN])
 * // [NaN, 1, NaN]
 * 
 * // Null and undefined
 * dropRepeats([null, null, undefined, undefined, null])
 * // [null, undefined, null]
 * 
 * // Compress whitespace markers
 * const chars = ["a", " ", " ", " ", "b", " ", "c"]
 * dropRepeats(chars)
 * // ["a", " ", "b", " ", "c"]
 * 
 * // Event stream deduplication
 * const events = ["click", "click", "hover", "hover", "hover", "click", "click"]
 * dropRepeats(events)
 * // ["click", "hover", "click"]
 * 
 * // Price changes only
 * const prices = [100, 100, 100, 105, 105, 103, 103, 103, 104]
 * dropRepeats(prices)
 * // [100, 105, 103, 104]
 * 
 * // Animation keyframes
 * const frames = ["frame1", "frame1", "frame2", "frame2", "frame2", "frame3", "frame1"]
 * dropRepeats(frames)
 * // ["frame1", "frame2", "frame3", "frame1"]
 * 
 * // Zero and negative zero (considered equal in SameValueZero)
 * dropRepeats([0, -0, 0, -0, 1])
 * // [0, 1]
 * 
 * // Symbols
 * const sym1 = Symbol("a")
 * const sym2 = Symbol("b")
 * dropRepeats([sym1, sym1, sym2, sym2, sym1])
 * // [sym1, sym2, sym1]
 * 
 * // Log level changes
 * const logs = ["INFO", "INFO", "INFO", "WARN", "WARN", "ERROR", "ERROR", "INFO"]
 * dropRepeats(logs)
 * // ["INFO", "WARN", "ERROR", "INFO"]
 * 
 * // State machine transitions
 * const states = ["init", "init", "loading", "loading", "loaded", "loaded", "error", "init"]
 * dropRepeats(states)
 * // ["init", "loading", "loaded", "error", "init"]
 * 
 * // Handle null/undefined gracefully
 * dropRepeats(null)       // []
 * dropRepeats(undefined)  // []
 * 
 * // Complex data cleaning
 * const data = [
 *   { type: "start", value: 1 },
 *   { type: "start", value: 1 },
 *   { type: "process", value: 2 },
 *   { type: "process", value: 2 },
 *   { type: "end", value: 3 }
 * ]
 * // Note: These are different objects, so no duplicates removed
 * dropRepeats(data)
 * // [...all 5 objects] (different references)
 * 
 * // But with same references:
 * const item1 = { type: "start", value: 1 }
 * const item2 = { type: "process", value: 2 }
 * const item3 = { type: "end", value: 3 }
 * dropRepeats([item1, item1, item2, item2, item3])
 * // [item1, item2, item3]
 * 
 * // Useful for React/UI optimization
 * const renderStates = ["loading", "loading", "loading", "ready", "ready", "updating", "ready"]
 * dropRepeats(renderStates)
 * // ["loading", "ready", "updating", "ready"]
 * // Only re-render when state actually changes
 * ```
 * @property Immutable - doesn't modify input array
 * @property Consecutive-only - only removes adjacent duplicates
 * @property SameValueZero - uses SameValueZero equality (NaN === NaN)
 */
const dropRepeats = <T>(
	array: ReadonlyArray<T> | null | undefined
): Array<T> => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return []
	}
	
	if (array.length === 1) {
		return [...array]
	}
	
	const result: Array<T> = [array[0]]
	
	for (let i = 1; i < array.length; i++) {
		// Use SameValueZero equality (handles NaN and -0/+0)
		if (!Object.is(array[i], array[i - 1])) {
			result.push(array[i])
		}
	}
	
	return result
}

export default dropRepeats