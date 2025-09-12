/**
 * Count occurrences of each unique value in an object
 *
 * Creates a frequency map that counts how many times each unique value
 * appears in the object's properties. Returns a Map where keys are the
 * unique values and values are their occurrence counts. Useful for
 * analyzing value distribution, finding common values, and data summarization.
 *
 * @pure
 * @immutable
 * @param obj - The object to analyze values from
 * @returns Map with values as keys and counts as values
 * @example
 * ```typescript
 * // Basic frequency counting
 * frequency({ a: 1, b: 2, c: 1, d: 2, e: 2 })
 * // Map { 1 => 2, 2 => 3 }
 *
 * // String values
 * frequency({ name: "Alice", role: "admin", dept: "IT", manager: "Alice" })
 * // Map { "Alice" => 2, "admin" => 1, "IT" => 1 }
 *
 * // Boolean values
 * frequency({ isActive: true, isAdmin: false, isVerified: true })
 * // Map { true => 2, false => 1 }
 *
 * // Finding most common value
 * const scores = { alice: 85, bob: 90, charlie: 85, diana: 85 }
 * const freq = frequency(scores)
 * const mostCommon = [...freq.entries()].reduce((a, b) =>
 *   b[1] > a[1] ? b : a
 * )
 * // [85, 3] - score 85 appears 3 times
 *
 * // Status distribution
 * const tasks = { task1: "pending", task2: "completed", task3: "pending" }
 * frequency(tasks)
 * // Map { "pending" => 2, "completed" => 1 }
 *
 * // Finding duplicates
 * const data = { x: 1, y: 2, z: 3, w: 2, v: 1 }
 * const freqs = frequency(data)
 * const duplicates = [...freqs.entries()]
 *   .filter(([_, count]) => count > 1)
 *   .map(([value, _]) => value)
 * // [1, 2]
 * ```
 */
const frequency = <T>(obj: Record<string, T>): Map<T, number> => {
	return Object.values(obj).reduce((freq, value) => {
		freq.set(value, (freq.get(value) ?? 0) + 1)
		return freq
	}, new Map<T, number>())
}

export default frequency
