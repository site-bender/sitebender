/**
 * Count occurrences of each unique value in an object
 * 
 * Creates a frequency map that counts how many times each unique value
 * appears in the object's properties. Returns a Map where keys are the
 * unique values and values are their occurrence counts. Useful for
 * analyzing value distribution, finding common values, and data summarization.
 * 
 * @param obj - The object to analyze values from
 * @returns Map with values as keys and counts as values
 * @example
 * ```typescript
 * // Basic frequency counting
 * frequency({ a: 1, b: 2, c: 1, d: 2, e: 2 })
 * // Map { 1 => 2, 2 => 3 }
 * 
 * // String values
 * frequency({ 
 *   name: "Alice", 
 *   role: "admin", 
 *   dept: "IT", 
 *   manager: "Alice" 
 * })
 * // Map { "Alice" => 2, "admin" => 1, "IT" => 1 }
 * 
 * // Empty object
 * frequency({})
 * // Map {}
 * 
 * // All unique values
 * frequency({ a: 1, b: 2, c: 3, d: 4 })
 * // Map { 1 => 1, 2 => 1, 3 => 1, 4 => 1 }
 * 
 * // All same value
 * frequency({ x: 7, y: 7, z: 7, w: 7 })
 * // Map { 7 => 4 }
 * 
 * // Mixed types
 * frequency({ a: 1, b: "1", c: true, d: 1, e: "1" })
 * // Map { 1 => 2, "1" => 2, true => 1 }
 * 
 * // Boolean values
 * frequency({ 
 *   isActive: true, 
 *   isAdmin: false, 
 *   isVerified: true, 
 *   isBlocked: false 
 * })
 * // Map { true => 2, false => 2 }
 * 
 * // Null and undefined
 * frequency({ a: null, b: undefined, c: null, d: 5 })
 * // Map { null => 2, undefined => 1, 5 => 1 }
 * 
 * // Finding most common value
 * const scores = { alice: 85, bob: 90, charlie: 85, diana: 85, eve: 90 }
 * const freq = frequency(scores)
 * const mostCommon = [...freq.entries()].reduce((a, b) => 
 *   b[1] > a[1] ? b : a
 * )
 * // [85, 3] - score 85 appears 3 times
 * 
 * // Analyzing configuration
 * const config = {
 *   timeout: 5000,
 *   retry: 3,
 *   maxConnections: 10,
 *   minConnections: 3,
 *   poolSize: 10
 * }
 * frequency(config)
 * // Map { 5000 => 1, 3 => 2, 10 => 2 }
 * 
 * // Status distribution
 * const tasks = {
 *   task1: "pending",
 *   task2: "completed",
 *   task3: "pending",
 *   task4: "failed",
 *   task5: "completed",
 *   task6: "completed"
 * }
 * frequency(tasks)
 * // Map { "pending" => 2, "completed" => 3, "failed" => 1 }
 * 
 * // Grade analysis
 * const grades = {
 *   math: "A",
 *   science: "B",
 *   english: "A",
 *   history: "B",
 *   art: "A"
 * }
 * frequency(grades)
 * // Map { "A" => 3, "B" => 2 }
 * 
 * // Object references (by reference, not value)
 * const obj1 = { id: 1 }
 * const obj2 = { id: 1 }  // Different object
 * frequency({ a: obj1, b: obj2, c: obj1 })
 * // Map { {id:1} => 2, {id:1} => 1 }
 * 
 * // Finding duplicates
 * const data = { x: 1, y: 2, z: 3, w: 2, v: 1 }
 * const freqs = frequency(data)
 * const duplicates = [...freqs.entries()]
 *   .filter(([_, count]) => count > 1)
 *   .map(([value, _]) => value)
 * // [1, 2]
 * 
 * // Permission analysis
 * const permissions = {
 *   read: "allow",
 *   write: "deny",
 *   execute: "allow",
 *   delete: "deny",
 *   modify: "allow"
 * }
 * frequency(permissions)
 * // Map { "allow" => 3, "deny" => 2 }
 * 
 * // Vote counting from object
 * const votes = {
 *   voter1: "Alice",
 *   voter2: "Bob",
 *   voter3: "Alice",
 *   voter4: "Charlie",
 *   voter5: "Alice"
 * }
 * const tally = frequency(votes)
 * // Map { "Alice" => 3, "Bob" => 1, "Charlie" => 1 }
 * 
 * // Finding unique values
 * const props = { a: 1, b: 2, c: 3, d: 2, e: 1 }
 * const freq = frequency(props)
 * const uniqueValues = [...freq.entries()]
 *   .filter(([_, count]) => count === 1)
 *   .map(([value, _]) => value)
 * // [3]
 * ```
 * @property Pure - No side effects
 * @property Immutable - Does not modify input object
 * @property Type-safe - Preserves value types in Map keys
 */
const frequency = <T>(obj: Record<string, T>): Map<T, number> => {
	const freq = new Map<T, number>()
	for (const value of Object.values(obj)) {
		freq.set(value, (freq.get(value) ?? 0) + 1)
	}
	return freq
}

export default frequency