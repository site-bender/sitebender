/**
 * Partition Map by consecutive entries satisfying predicate
 *
 * Splits a Map into an array of Maps where each Map contains consecutive
 * entries (in iteration order) that produce the same result when passed to
 * the predicate function. Unlike regular partition which creates two groups,
 * this creates multiple groups based on runs of entries with the same
 * predicate result. Useful for grouping consecutive similar entries,
 * segmenting data, and analyzing patterns in ordered Maps.
 *
 * @curried (predicate) => (map) => partitions
 * @param predicate - Function that determines grouping
 * @param map - Map to partition
 * @returns Array of Maps with consecutive similar entries
 * @example
 * ```typescript
 * // Group consecutive entries by value range
 * const scores = new Map([
 *   ["alice", 95],
 *   ["bob", 92],
 *   ["charlie", 75],
 *   ["david", 72],
 *   ["eve", 88],
 *   ["frank", 91]
 * ])
 * const isHighScore = (score: number) => score >= 90
 * partitionBy(isHighScore)(scores)
 * // [
 * //   Map { "alice" => 95, "bob" => 92 },
 * //   Map { "charlie" => 75, "david" => 72 },
 * //   Map { "eve" => 88 },
 * //   Map { "frank" => 91 }
 * // ]
 *
 * // Group by object property
 * const users = new Map([
 *   [1, { name: "Alice", active: true }],
 *   [2, { name: "Bob", active: true }],
 *   [3, { name: "Charlie", active: false }],
 *   [4, { name: "David", active: false }],
 *   [5, { name: "Eve", active: true }]
 * ])
 * partitionBy((user: any) => user.active)(users)
 * // [
 * //   Map { 1 => {name:"Alice", active:true}, 2 => {name:"Bob", active:true} },
 * //   Map { 3 => {name:"Charlie", active:false}, 4 => {name:"David", active:false} },
 * //   Map { 5 => {name:"Eve", active:true} }
 * // ]
 *
 * // Group by key pattern
 * const config = new Map([
 *   ["app.name", "MyApp"],
 *   ["app.version", "1.0"],
 *   ["db.host", "localhost"],
 *   ["db.port", 5432],
 *   ["api.url", "https://api.example.com"]
 * ])
 * partitionBy((_: any, key: string) => key.split(".")[0])(config)
 * // [
 * //   Map { "app.name" => "MyApp", "app.version" => "1.0" },
 * //   Map { "db.host" => "localhost", "db.port" => 5432 },
 * //   Map { "api.url" => "https://api.example.com" }
 * // ]
 *
 * // Group consecutive same values
 * const signals = new Map([
 *   ["t1", 0],
 *   ["t2", 0],
 *   ["t3", 1],
 *   ["t4", 1],
 *   ["t5", 1],
 *   ["t6", 0],
 *   ["t7", 0]
 * ])
 * partitionBy((value: number) => value)(signals)
 * // [
 * //   Map { "t1" => 0, "t2" => 0 },
 * //   Map { "t3" => 1, "t4" => 1, "t5" => 1 },
 * //   Map { "t6" => 0, "t7" => 0 }
 * // ]
 *
 * // String length grouping
 * const words = new Map([
 *   ["a", "hi"],
 *   ["b", "bye"],
 *   ["c", "hello"],
 *   ["d", "world"],
 *   ["e", "x"],
 *   ["f", "y"]
 * ])
 * partitionBy((word: string) => word.length > 3)(words)
 * // [
 * //   Map { "a" => "hi", "b" => "bye" },
 * //   Map { "c" => "hello", "d" => "world" },
 * //   Map { "e" => "x", "f" => "y" }
 * // ]
 *
 * // Empty Map
 * partitionBy((v: any) => v > 0)(new Map())
 * // []
 *
 * // Single entry
 * partitionBy((v: number) => v > 0)(new Map([["a", 1]]))
 * // [Map { "a" => 1 }]
 *
 * // All same group
 * const positive = new Map([["a", 1], ["b", 2], ["c", 3]])
 * partitionBy((n: number) => n > 0)(positive)
 * // [Map { "a" => 1, "b" => 2, "c" => 3 }]
 *
 * // Alternating groups
 * const alternating = new Map([
 *   ["a", 1],
 *   ["b", -1],
 *   ["c", 2],
 *   ["d", -2],
 *   ["e", 3]
 * ])
 * partitionBy((n: number) => n > 0)(alternating)
 * // [
 * //   Map { "a" => 1 },
 * //   Map { "b" => -1 },
 * //   Map { "c" => 2 },
 * //   Map { "d" => -2 },
 * //   Map { "e" => 3 }
 * // ]
 *
 * // Date-based grouping
 * const events = new Map([
 *   [new Date("2024-01-01"), "New Year"],
 *   [new Date("2024-01-15"), "MLK Day"],
 *   [new Date("2024-02-14"), "Valentine's"],
 *   [new Date("2024-03-17"), "St. Patrick's"],
 *   [new Date("2024-03-20"), "Spring"]
 * ])
 * partitionBy((_: string, date: Date) => date.getMonth())(events)
 * // [
 * //   Map with January dates,
 * //   Map with February date,
 * //   Map with March dates
 * // ]
 *
 * // Status code grouping
 * const responses = new Map([
 *   ["req1", 200],
 *   ["req2", 201],
 *   ["req3", 404],
 *   ["req4", 401],
 *   ["req5", 200],
 *   ["req6", 204]
 * ])
 * partitionBy((code: number) => Math.floor(code / 100))(responses)
 * // [
 * //   Map { "req1" => 200, "req2" => 201 },
 * //   Map { "req3" => 404, "req4" => 401 },
 * //   Map { "req5" => 200, "req6" => 204 }
 * // ]
 *
 * // Boolean property runs
 * const features = new Map([
 *   ["feature1", { enabled: true }],
 *   ["feature2", { enabled: true }],
 *   ["feature3", { enabled: false }],
 *   ["feature4", { enabled: true }],
 *   ["feature5", { enabled: true }]
 * ])
 * partitionBy((f: any) => f.enabled)(features)
 * // [
 * //   Map with feature1 and feature2,
 * //   Map with feature3,
 * //   Map with feature4 and feature5
 * // ]
 *
 * // Using with pipe for analysis
 * import { pipe } from "../../combinator/pipe/index.ts"
 *
 * const temperatures = new Map([
 *   ["08:00", 18],
 *   ["09:00", 20],
 *   ["10:00", 22],
 *   ["11:00", 19],
 *   ["12:00", 17],
 *   ["13:00", 21]
 * ])
 *
 * const analysis = pipe(
 *   temperatures,
 *   partitionBy((temp: number) => temp >= 20),
 *   (groups: Array<Map<string, number>>) => groups.map(g => ({
 *     count: g.size,
 *     keys: Array.from(g.keys()),
 *     avg: Array.from(g.values()).reduce((a, b) => a + b, 0) / g.size
 *   }))
 * )
 * // [
 * //   { count: 1, keys: ["08:00"], avg: 18 },
 * //   { count: 2, keys: ["09:00", "10:00"], avg: 21 },
 * //   { count: 2, keys: ["11:00", "12:00"], avg: 18 },
 * //   { count: 1, keys: ["13:00"], avg: 21 }
 * // ]
 *
 * // Run detection
 * const measurements = new Map([
 *   ["s1", "normal"],
 *   ["s2", "normal"],
 *   ["s3", "alert"],
 *   ["s4", "alert"],
 *   ["s5", "alert"],
 *   ["s6", "normal"]
 * ])
 * const runs = partitionBy((status: string) => status)(measurements)
 * const alertRun = runs.find(m =>
 *   Array.from(m.values())[0] === "alert"
 * )
 * // Map { "s3" => "alert", "s4" => "alert", "s5" => "alert" }
 *
 * // Partial application for specific groupings
 * const groupBySign = partitionBy((n: number) => n >= 0 ? "positive" : "negative")
 * const groupByParity = partitionBy((n: number) => n % 2 === 0 ? "even" : "odd")
 *
 * const numbers = new Map([
 *   ["a", 1],
 *   ["b", 2],
 *   ["c", -1],
 *   ["d", -2],
 *   ["e", 3]
 * ])
 *
 * groupBySign(numbers)
 * // Groups by positive/negative runs
 * groupByParity(numbers)
 * // Groups by even/odd runs
 *
 * // Symbol keys
 * const sym1 = Symbol("a")
 * const sym2 = Symbol("b")
 * const sym3 = Symbol("c")
 * const symMap = new Map([
 *   [sym1, 1],
 *   [sym2, 1],
 *   [sym3, 2]
 * ])
 * partitionBy((v: number) => v)(symMap)
 * // [Map with sym1 and sym2, Map with sym3]
 *
 * // Trend analysis
 * const prices = new Map([
 *   ["day1", 100],
 *   ["day2", 105],
 *   ["day3", 110],
 *   ["day4", 108],
 *   ["day5", 106],
 *   ["day6", 112]
 * ])
 * let prevPrice = 0
 * partitionBy((price: number) => {
 *   const trend = price > prevPrice ? "up" : "down"
 *   prevPrice = price
 *   return trend
 * })(prices)
 * // Note: Stateful predicates may produce unexpected results
 * // Consider using index-aware approaches for trend analysis
 *
 * // Type safety
 * const typed = new Map<string, number>([
 *   ["a", 1],
 *   ["b", 2],
 *   ["c", -1],
 *   ["d", 3]
 * ])
 * const groups: Array<Map<string, number>> = partitionBy<string, number>(
 *   (n) => n > 0
 * )(typed)
 * // Array<Map<string, number>> with grouped entries
 *
 * // Segmentation for processing
 * const tasks = new Map([
 *   ["t1", { priority: "high", status: "pending" }],
 *   ["t2", { priority: "high", status: "pending" }],
 *   ["t3", { priority: "low", status: "pending" }],
 *   ["t4", { priority: "high", status: "pending" }]
 * ])
 *
 * const segments = partitionBy((task: any) => task.priority)(tasks)
 * // Process each segment differently based on priority
 * segments.forEach(segment => {
 *   const priority = Array.from(segment.values())[0]?.priority
 *   // Apply priority-specific processing
 * })
 * ```
 * @property Pure - No side effects (assuming pure predicate)
 * @property Immutable - Does not modify input Map
 * @property Order-preserving - Maintains Map iteration order within groups
 */
const partitionBy = <K, V>(
	predicate: (value: V, key: K) => unknown,
) =>
(map: Map<K, V>): Array<Map<K, V>> => {
	const entries = Array.from(map.entries())
	if (entries.length === 0) return []

	const result: Array<Map<K, V>> = []
	let currentGroup = new Map<K, V>()
	const [firstKey, firstValue] = entries[0]
	currentGroup.set(firstKey, firstValue)
	let currentPredicateResult = predicate(firstValue, firstKey)

	for (let i = 1; i < entries.length; i++) {
		const [key, value] = entries[i]
		const predicateResult = predicate(value, key)

		if (predicateResult === currentPredicateResult) {
			currentGroup.set(key, value)
		} else {
			result.push(currentGroup)
			currentGroup = new Map<K, V>()
			currentGroup.set(key, value)
			currentPredicateResult = predicateResult
		}
	}

	result.push(currentGroup)
	return result
}

export default partitionBy
