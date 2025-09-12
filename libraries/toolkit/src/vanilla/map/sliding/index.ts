/**
 * Creates sliding windows over Map entries
 *
 * Returns an array of Maps, each containing a window of consecutive entries
 * from the original Map (in iteration order). Windows are of specified size
 * and move by a specified step. Useful for analyzing patterns in ordered data,
 * computing local aggregates, or examining entry neighborhoods.
 *
 * @param size - Size of each window (must be positive)
 * @param step - Number of entries to advance between windows (default 1)
 * @param map - Map to create windows from
 * @returns Array of Map windows
 * @example
 * ```typescript
 * // Basic sliding window (size=2, step=1)
 * const scores = new Map([
 *   ["Alice", 85],
 *   ["Bob", 92],
 *   ["Charlie", 78],
 *   ["David", 88]
 * ])
 * sliding(2)(1)(scores)
 * // [
 * //   Map { "Alice" => 85, "Bob" => 92 },
 * //   Map { "Bob" => 92, "Charlie" => 78 },
 * //   Map { "Charlie" => 78, "David" => 88 }
 * // ]
 *
 * // Non-overlapping windows (step=size)
 * const items = new Map([
 *   ["1", "a"],
 *   ["2", "b"],
 *   ["3", "c"],
 *   ["4", "d"]
 * ])
 * sliding(2)(2)(items)
 * // [
 * //   Map { "1" => "a", "2" => "b" },
 * //   Map { "3" => "c", "4" => "d" }
 * // ]
 *
 * // Window larger than Map
 * const small = new Map([["a", 1], ["b", 2]])
 * sliding(5)(1)(small)
 * // [] (no complete windows possible)
 *
 * // Empty Map
 * sliding(2)(1)(new Map())
 * // []
 *
 * // Moving average with sliding windows
 * const temps = new Map([
 *   ["08:00", 18],
 *   ["09:00", 20],
 *   ["10:00", 22]
 * ])
 * const windows = sliding(2)(1)(temps)
 * // Use windows for moving average calculations
 * ```
 * @pure
 * @immutable
 * @curried
 */
const sliding =
	<K, V>(size: number) =>
	(step: number = 1) =>
	(map: Map<K, V>): Array<Map<K, V>> => {
		if (size <= 0 || step <= 0) return []

		const entries = Array.from(map.entries())

		return Array.from(
			{ length: Math.floor((entries.length - size) / step) + 1 },
			(_, i) => new Map(entries.slice(i * step, i * step + size)),
		).filter((window) => window.size === size)
	}

export default sliding
