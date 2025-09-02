import isNullish from "../../validation/isNullish/index.ts"

/**
 * Returns an infinite repetition of the given array (generator function)
 *
 * Creates a generator that yields elements from the array in a continuous
 * cycle, starting over from the beginning when it reaches the end. The
 * generator runs infinitely, so use with caution and always include a
 * termination condition when consuming it. Useful for round-robin selection,
 * creating repeating patterns, or infinite sequences.
 *
 * @param array - Array to cycle through infinitely
 * @returns Generator that yields array elements in cycles
 * @example
 * ```typescript
 * // Basic cycling - take first 7 elements
 * const gen = cycle([1, 2, 3])
 * const result = Array.from({ length: 7 }, () => gen.next().value)
 * // [1, 2, 3, 1, 2, 3, 1]
 *
 * // Round-robin assignment
 * const workers = ["Alice", "Bob", "Charlie"]
 * const tasks = ["Task1", "Task2", "Task3", "Task4", "Task5"]
 * const workerCycle = cycle(workers)
 * const assignments = tasks.map(task => ({
 *   task,
 *   assignedTo: workerCycle.next().value
 * }))
 * // Assigns tasks to workers in round-robin fashion
 *
 * // Alternating styles
 * const styles = cycle(["odd", "even"])
 * const rows = ["Row1", "Row2", "Row3", "Row4"]
 * const styledRows = rows.map(row => ({
 *   content: row,
 *   class: styles.next().value
 * }))
 * // [{ content: "Row1", class: "odd" }, { content: "Row2", class: "even" }, ...]
 *
 * // Edge cases
 * const single = cycle([42])
 * Array.from({ length: 3 }, () => single.next().value)
 * // [42, 42, 42]
 *
 * const empty = cycle([])
 * empty.next()  // { value: undefined, done: true }
 *
 * // Handle null/undefined
 * cycle(null).next()       // { value: undefined, done: true }
 * cycle(undefined).next()  // { value: undefined, done: true }
 * ```
 * @impure
 * @safe
 */
function* cycle<T>(
	array: ReadonlyArray<T> | null | undefined,
): Generator<T, void, unknown> {
	if (isNullish(array) || array.length === 0) {
		return
	}

	// Array is guaranteed to be non-null here due to isNullish check
	const validArray = array
	// Use recursive generator for functional approach
	function* cycleRecursive(): Generator<T, void, unknown> {
		yield* validArray
		// deno-coverage-ignore - Coverage tool cannot track yield* in recursive generator context
		yield* cycleRecursive()
	// deno-coverage-ignore - Generator function closing brace not detected by coverage tool
	}

	// deno-coverage-ignore - Coverage tool cannot track yield* delegation to recursive generator
	yield* cycleRecursive()
}

export default cycle
