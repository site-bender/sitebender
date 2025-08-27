/**
 * Count occurrences of each value across all Map values
 *
 * Creates a frequency map that counts how many times each unique value
 * appears across all values in the Map. Returns a Map where keys are the
 * unique values found and values are their occurrence counts. This is useful
 * for analyzing value distribution and finding the most common values.
 *
 * @param map - The Map to analyze values from
 * @returns Map with values as keys and counts as values
 * @example
 * ```typescript
 * // Basic usage - count value occurrences
 * const scores = new Map([
 *   ["Alice", 90],
 *   ["Bob", 85],
 *   ["Charlie", 90],
 *   ["Diana", 85],
 *   ["Eve", 90]
 * ])
 * frequency(scores)
 * // Map { 90 => 3, 85 => 2 }
 *
 * // String values
 * const roles = new Map([
 *   ["user1", "admin"],
 *   ["user2", "editor"],
 *   ["user3", "admin"],
 *   ["user4", "viewer"],
 *   ["user5", "admin"]
 * ])
 * frequency(roles)
 * // Map { "admin" => 3, "editor" => 1, "viewer" => 1 }
 *
 * // Empty Map
 * frequency(new Map())
 * // Map {}
 *
 * // All unique values
 * const unique = new Map([["a", 1], ["b", 2], ["c", 3]])
 * frequency(unique)
 * // Map { 1 => 1, 2 => 1, 3 => 1 }
 *
 * // All same value
 * const same = new Map([["x", 7], ["y", 7], ["z", 7]])
 * frequency(same)
 * // Map { 7 => 3 }
 *
 * // Mixed types
 * const mixed = new Map([
 *   ["a", 1],
 *   ["b", "1"],
 *   ["c", true],
 *   ["d", 1],
 *   ["e", "1"]
 * ])
 * frequency(mixed)
 * // Map { 1 => 2, "1" => 2, true => 1 }
 *
 * // Boolean values
 * const flags = new Map([
 *   ["isActive", true],
 *   ["isVerified", false],
 *   ["isPremium", true],
 *   ["isBlocked", false],
 *   ["isAdmin", true]
 * ])
 * frequency(flags)
 * // Map { true => 3, false => 2 }
 *
 * // Null and undefined
 * const nullable = new Map([
 *   ["a", null],
 *   ["b", undefined],
 *   ["c", null],
 *   ["d", 5],
 *   ["e", undefined],
 *   ["f", null]
 * ])
 * frequency(nullable)
 * // Map { null => 3, undefined => 2, 5 => 1 }
 *
 * // Finding most common value
 * const votes = new Map([
 *   ["voter1", "Alice"],
 *   ["voter2", "Bob"],
 *   ["voter3", "Alice"],
 *   ["voter4", "Charlie"],
 *   ["voter5", "Alice"],
 *   ["voter6", "Bob"]
 * ])
 * const freq = frequency(votes)
 * const mostCommon = [...freq.entries()].reduce((a, b) =>
 *   b[1] > a[1] ? b : a
 * )
 * // ["Alice", 3] - Alice has 3 votes
 *
 * // Status distribution
 * const tasks = new Map([
 *   ["task1", "pending"],
 *   ["task2", "completed"],
 *   ["task3", "pending"],
 *   ["task4", "failed"],
 *   ["task5", "completed"],
 *   ["task6", "completed"],
 *   ["task7", "pending"]
 * ])
 * frequency(tasks)
 * // Map { "pending" => 3, "completed" => 3, "failed" => 1 }
 *
 * // Grade analysis
 * const grades = new Map([
 *   ["John", "A"],
 *   ["Jane", "B"],
 *   ["Bob", "A"],
 *   ["Alice", "A"],
 *   ["Charlie", "C"],
 *   ["Diana", "B"]
 * ])
 * frequency(grades)
 * // Map { "A" => 3, "B" => 2, "C" => 1 }
 *
 * // Numeric distribution
 * const ages = new Map([
 *   ["person1", 25],
 *   ["person2", 30],
 *   ["person3", 25],
 *   ["person4", 35],
 *   ["person5", 30],
 *   ["person6", 25]
 * ])
 * frequency(ages)
 * // Map { 25 => 3, 30 => 2, 35 => 1 }
 *
 * // Array values (by reference)
 * const arr1 = [1, 2]
 * const arr2 = [1, 2] // Different array
 * const lists = new Map([
 *   ["a", arr1],
 *   ["b", arr2],
 *   ["c", arr1],
 *   ["d", arr1]
 * ])
 * frequency(lists)
 * // Map { [1,2] => 3, [1,2] => 1 } (arr1 appears 3 times, arr2 once)
 *
 * // Object values (by reference)
 * const obj1 = { type: "A" }
 * const obj2 = { type: "A" } // Different object
 * const objects = new Map([
 *   ["x", obj1],
 *   ["y", obj2],
 *   ["z", obj1]
 * ])
 * frequency(objects)
 * // Map { {type:"A"} => 2, {type:"A"} => 1 }
 *
 * // Finding duplicates
 * const data = new Map([
 *   ["id1", "value1"],
 *   ["id2", "value2"],
 *   ["id3", "value1"],
 *   ["id4", "value3"],
 *   ["id5", "value2"]
 * ])
 * const freqs = frequency(data)
 * const duplicates = [...freqs.entries()]
 *   .filter(([_, count]) => count > 1)
 *   .map(([value, _]) => value)
 * // ["value1", "value2"]
 *
 * // Finding unique values
 * const items = new Map([
 *   ["a", 1],
 *   ["b", 2],
 *   ["c", 3],
 *   ["d", 2],
 *   ["e", 1],
 *   ["f", 4]
 * ])
 * const freq = frequency(items)
 * const uniqueValues = [...freq.entries()]
 *   .filter(([_, count]) => count === 1)
 *   .map(([value, _]) => value)
 * // [3, 4]
 *
 * // Permission analysis
 * const userPermissions = new Map([
 *   ["alice", "read"],
 *   ["bob", "write"],
 *   ["charlie", "read"],
 *   ["diana", "admin"],
 *   ["eve", "read"],
 *   ["frank", "write"]
 * ])
 * frequency(userPermissions)
 * // Map { "read" => 3, "write" => 2, "admin" => 1 }
 *
 * // Response code distribution
 * const responses = new Map([
 *   ["req1", 200],
 *   ["req2", 404],
 *   ["req3", 200],
 *   ["req4", 500],
 *   ["req5", 200],
 *   ["req6", 404]
 * ])
 * frequency(responses)
 * // Map { 200 => 3, 404 => 2, 500 => 1 }
 *
 * // Category distribution
 * const products = new Map([
 *   ["prod1", "electronics"],
 *   ["prod2", "books"],
 *   ["prod3", "electronics"],
 *   ["prod4", "clothing"],
 *   ["prod5", "electronics"],
 *   ["prod6", "books"]
 * ])
 * const categoryFreq = frequency(products)
 * // Map { "electronics" => 3, "books" => 2, "clothing" => 1 }
 *
 * // Creating a histogram
 * const measurements = new Map([
 *   ["sample1", 10],
 *   ["sample2", 20],
 *   ["sample3", 10],
 *   ["sample4", 30],
 *   ["sample5", 20],
 *   ["sample6", 10]
 * ])
 * const histogram = frequency(measurements)
 * // Map { 10 => 3, 20 => 2, 30 => 1 }
 *
 * // Symbol values
 * const sym1 = Symbol("type")
 * const sym2 = Symbol("type")
 * const symbols = new Map([
 *   ["a", sym1],
 *   ["b", sym2],
 *   ["c", sym1],
 *   ["d", sym1]
 * ])
 * frequency(symbols)
 * // Map { Symbol(type) => 3, Symbol(type) => 1 }
 *
 * // Analyzing survey results
 * const survey = new Map([
 *   ["respondent1", "strongly agree"],
 *   ["respondent2", "agree"],
 *   ["respondent3", "strongly agree"],
 *   ["respondent4", "neutral"],
 *   ["respondent5", "agree"],
 *   ["respondent6", "strongly agree"]
 * ])
 * frequency(survey)
 * // Map { "strongly agree" => 3, "agree" => 2, "neutral" => 1 }
 *
 * // Use with pipe for analysis
 * import { pipe } from "../../combinator/pipe/index.ts"
 *
 * const raw = new Map([
 *   ["user1", "active"],
 *   ["user2", "inactive"],
 *   ["user3", "active"],
 *   ["user4", "pending"]
 * ])
 *
 * const analysis = pipe(
 *   raw,
 *   frequency,
 *   (freq) => ({
 *     total: raw.size,
 *     distribution: Object.fromEntries(freq),
 *     mostCommon: [...freq.entries()].reduce((a, b) => b[1] > a[1] ? b : a)
 *   })
 * )
 * // { total: 4, distribution: {...}, mostCommon: ["active", 2] }
 *
 * // Type preservation
 * const typed = new Map<string, number>([["a", 1], ["b", 2], ["c", 1]])
 * const typedFreq: Map<number, number> = frequency(typed)
 * // Map<number, number> { 1 => 2, 2 => 1 }
 *
 * // Performance with large Maps
 * const large = new Map(
 *   Array.from({ length: 10000 }, (_, i) => [`key${i}`, i % 100])
 * )
 * frequency(large)
 * // Map with 100 entries (values 0-99, each appearing 100 times)
 * ```
 * @pure Doesn't modify the input Map
 * @immutable Creates new Map from analysis
 * @safe Preserves value types as keys in result
 */
const frequency = <K, V>(map: Map<K, V>): Map<V, number> => {
	const freq = new Map<V, number>()
	for (const value of map.values()) {
		freq.set(value, (freq.get(value) ?? 0) + 1)
	}
	return freq
}

export default frequency
