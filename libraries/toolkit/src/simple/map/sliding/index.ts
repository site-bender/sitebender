/**
 * Creates sliding windows over Map entries
 * 
 * Returns an array of Maps, each containing a window of consecutive entries
 * from the original Map (in iteration order). Windows are of specified size
 * and move by a specified step. Useful for analyzing patterns in ordered data,
 * computing local aggregates, or examining entry neighborhoods.
 * 
 * @curried (size) => (step) => (map) => windows
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
 * // Sliding window with step=2
 * const data = new Map([
 *   ["a", 1],
 *   ["b", 2],
 *   ["c", 3],
 *   ["d", 4],
 *   ["e", 5],
 *   ["f", 6]
 * ])
 * sliding(3)(2)(data)
 * // [
 * //   Map { "a" => 1, "b" => 2, "c" => 3 },
 * //   Map { "c" => 3, "d" => 4, "e" => 5 }
 * // ]
 * 
 * // Pairwise comparison (size=2, step=1)
 * const prices = new Map([
 *   ["day1", 100],
 *   ["day2", 105],
 *   ["day3", 103],
 *   ["day4", 108]
 * ])
 * sliding(2)(1)(prices)
 * // [
 * //   Map { "day1" => 100, "day2" => 105 },
 * //   Map { "day2" => 105, "day3" => 103 },
 * //   Map { "day3" => 103, "day4" => 108 }
 * // ]
 * 
 * // Non-overlapping windows (step=size)
 * const items = new Map([
 *   ["1", "a"],
 *   ["2", "b"],
 *   ["3", "c"],
 *   ["4", "d"],
 *   ["5", "e"],
 *   ["6", "f"]
 * ])
 * sliding(2)(2)(items)
 * // [
 * //   Map { "1" => "a", "2" => "b" },
 * //   Map { "3" => "c", "4" => "d" },
 * //   Map { "5" => "e", "6" => "f" }
 * // ]
 * 
 * // Window larger than Map
 * const small = new Map([["a", 1], ["b", 2]])
 * sliding(5)(1)(small)
 * // [] (no complete windows possible)
 * 
 * // Single element windows
 * const singles = new Map([["x", 10], ["y", 20], ["z", 30]])
 * sliding(1)(1)(singles)
 * // [
 * //   Map { "x" => 10 },
 * //   Map { "y" => 20 },
 * //   Map { "z" => 30 }
 * // ]
 * 
 * // Empty Map
 * sliding(2)(1)(new Map())
 * // []
 * 
 * // Moving average calculation
 * const temperatures = new Map([
 *   ["08:00", 18],
 *   ["09:00", 20],
 *   ["10:00", 22],
 *   ["11:00", 21],
 *   ["12:00", 23]
 * ])
 * const windows = sliding(3)(1)(temperatures)
 * const averages = windows.map(window => {
 *   const values = Array.from(window.values())
 *   const avg = values.reduce((a, b) => a + b, 0) / values.length
 *   const keys = Array.from(window.keys())
 *   return { period: `${keys[0]}-${keys[keys.length-1]}`, avg }
 * })
 * // [
 * //   { period: "08:00-10:00", avg: 20 },
 * //   { period: "09:00-11:00", avg: 21 },
 * //   { period: "10:00-12:00", avg: 22 }
 * // ]
 * 
 * // Pattern detection in user activity
 * const activity = new Map([
 *   ["user1", "login"],
 *   ["user2", "view"],
 *   ["user1", "edit"],
 *   ["user3", "login"],
 *   ["user1", "logout"]
 * ])
 * const patterns = sliding(2)(1)(activity)
 * // Analyze consecutive activity patterns
 * 
 * // Time series analysis
 * const sales = new Map([
 *   ["Jan", 1000],
 *   ["Feb", 1200],
 *   ["Mar", 1100],
 *   ["Apr", 1400],
 *   ["May", 1300]
 * ])
 * const quarters = sliding(3)(1)(sales)
 * // Each window represents a rolling quarter
 * 
 * // Using with pipe for analysis
 * import { pipe } from "../../combinator/pipe/index.ts"
 * 
 * const metrics = new Map([
 *   ["t1", { cpu: 45, memory: 60 }],
 *   ["t2", { cpu: 50, memory: 65 }],
 *   ["t3", { cpu: 48, memory: 62 }],
 *   ["t4", { cpu: 52, memory: 68 }]
 * ])
 * 
 * const analysis = pipe(
 *   metrics,
 *   sliding(2)(1),
 *   windows => windows.map(w => {
 *     const entries = Array.from(w.entries())
 *     const [k1, v1] = entries[0]
 *     const [k2, v2] = entries[1]
 *     return {
 *       period: `${k1}-${k2}`,
 *       cpuChange: v2.cpu - v1.cpu,
 *       memChange: v2.memory - v1.memory
 *     }
 *   })
 * )
 * // [
 * //   { period: "t1-t2", cpuChange: 5, memChange: 5 },
 * //   { period: "t2-t3", cpuChange: -2, memChange: -3 },
 * //   { period: "t3-t4", cpuChange: 4, memChange: 6 }
 * // ]
 * 
 * // Overlapping batches for processing
 * const tasks = new Map([
 *   ["task1", { priority: 1 }],
 *   ["task2", { priority: 2 }],
 *   ["task3", { priority: 1 }],
 *   ["task4", { priority: 3 }],
 *   ["task5", { priority: 2 }]
 * ])
 * const batches = sliding(3)(2)(tasks)
 * // Process overlapping batches of tasks
 * 
 * // Partial application for common window sizes
 * const pairs = sliding(2)(1)
 * const triples = sliding(3)(1)
 * const nonOverlapping = (size: number) => sliding(size)(size)
 * 
 * const nums = new Map([["a", 1], ["b", 2], ["c", 3], ["d", 4]])
 * pairs(nums)    // Adjacent pairs
 * triples(nums)  // Adjacent triples
 * nonOverlapping(2)(nums) // Non-overlapping pairs
 * 
 * // Event correlation
 * const events = new Map([
 *   [new Date("2024-01-01T10:00"), "start"],
 *   [new Date("2024-01-01T10:05"), "process"],
 *   [new Date("2024-01-01T10:10"), "complete"],
 *   [new Date("2024-01-01T10:15"), "cleanup"]
 * ])
 * const eventPairs = sliding(2)(1)(events)
 * // Analyze consecutive event relationships
 * 
 * // Sliding with transformation
 * const transformWindows = <K, V, R>(
 *   transformer: (window: Map<K, V>) => R
 * ) => (windows: Array<Map<K, V>>) =>
 *   windows.map(transformer)
 * 
 * const values = new Map([["a", 10], ["b", 20], ["c", 30], ["d", 40]])
 * pipe(
 *   values,
 *   sliding(2)(1),
 *   transformWindows(w => {
 *     const vals = Array.from(w.values())
 *     return vals[1] - vals[0]  // difference
 *   })
 * )
 * // [10, 10, 10] (differences between consecutive values)
 * 
 * // Detecting trends
 * const readings = new Map([
 *   ["h1", 100],
 *   ["h2", 102],
 *   ["h3", 105],
 *   ["h4", 103],
 *   ["h5", 107]
 * ])
 * const trends = sliding(3)(1)(readings).map(window => {
 *   const values = Array.from(window.values())
 *   const increasing = values[1] > values[0] && values[2] > values[1]
 *   const decreasing = values[1] < values[0] && values[2] < values[1]
 *   return { increasing, decreasing, stable: !increasing && !decreasing }
 * })
 * // Trend analysis for each window
 * 
 * // Symbol keys
 * const sym1 = Symbol("a")
 * const sym2 = Symbol("b")
 * const sym3 = Symbol("c")
 * const symMap = new Map([
 *   [sym1, 1],
 *   [sym2, 2],
 *   [sym3, 3]
 * ])
 * sliding(2)(1)(symMap)
 * // Windows with Symbol keys
 * 
 * // Context windows for text
 * const words = new Map([
 *   [0, "the"],
 *   [1, "quick"],
 *   [2, "brown"],
 *   [3, "fox"],
 *   [4, "jumps"]
 * ])
 * const trigrams = sliding(3)(1)(words)
 * // 3-word context windows
 * 
 * // Validation with windows
 * const validate = <K, V>(validator: (w: Map<K, V>) => boolean) =>
 *   (windows: Array<Map<K, V>>) => windows.every(validator)
 * 
 * const sequence = new Map([["a", 1], ["b", 2], ["c", 3], ["d", 4]])
 * const windows = sliding(2)(1)(sequence)
 * const isIncreasing = validate<string, number>(w => {
 *   const vals = Array.from(w.values())
 *   return vals[1] > vals[0]
 * })
 * isIncreasing(windows) // true (all pairs increasing)
 * 
 * // Type safety
 * const typed = new Map<string, number>([
 *   ["a", 1],
 *   ["b", 2],
 *   ["c", 3]
 * ])
 * const typedWindows: Array<Map<string, number>> = sliding(2)(1)(typed)
 * // Array<Map<string, number>>
 * 
 * // Performance consideration for large Maps
 * const large = new Map(Array.from({length: 1000}, (_, i) => [i, i]))
 * const sample = sliding(10)(100)(large) // Sample windows
 * // Takes every 100th position for window starts
 * 
 * // Use for data smoothing
 * const noisy = new Map([
 *   ["s1", 10],
 *   ["s2", 15],
 *   ["s3", 8],
 *   ["s4", 12],
 *   ["s5", 14]
 * ])
 * const smoothed = sliding(3)(1)(noisy).map((window, i) => {
 *   const keys = Array.from(window.keys())
 *   const values = Array.from(window.values())
 *   const avg = values.reduce((a, b) => a + b, 0) / values.length
 *   return [keys[1], avg] as [string, number] // Middle key with average
 * })
 * // Smoothed values using moving average
 * ```
 * @property Pure - No side effects
 * @property Flexible - Configurable window size and step
 * @property Order-preserving - Maintains Map iteration order
 */
const sliding = <K, V>(size: number) =>
	(step: number = 1) =>
		(map: Map<K, V>): Array<Map<K, V>> => {
			if (size <= 0 || step <= 0) return []
			
			const entries = Array.from(map.entries())
			const windows: Array<Map<K, V>> = []
			
			for (let i = 0; i <= entries.length - size; i += step) {
				const window = new Map<K, V>()
				for (let j = 0; j < size; j++) {
					const [key, value] = entries[i + j]
					window.set(key, value)
				}
				windows.push(window)
			}
			
			return windows
		}

export default sliding