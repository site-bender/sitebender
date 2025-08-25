/**
 * Returns an array of [key, value] pairs from a Map
 *
 * Converts a Map to an array of tuples, where each tuple contains a key
 * and its corresponding value. The order of entries follows the Map's
 * insertion order. This is useful for serialization, transformation, or
 * when you need to work with Map data as an array.
 *
 * @param map - The Map to convert to entries
 * @returns Array of [key, value] tuples
 * @example
 * ```typescript
 * // Basic usage
 * const map = new Map([["a", 1], ["b", 2], ["c", 3]])
 * entries(map)
 * // [["a", 1], ["b", 2], ["c", 3]]
 *
 * // Empty Map
 * entries(new Map())
 * // []
 *
 * // Single entry
 * entries(new Map([["only", 42]]))
 * // [["only", 42]]
 *
 * // Different value types
 * const mixed = new Map([
 *   ["string", "hello"],
 *   ["number", 123],
 *   ["boolean", true],
 *   ["object", { x: 1 }]
 * ])
 * entries(mixed)
 * // [["string", "hello"], ["number", 123], ["boolean", true], ["object", {x:1}]]
 *
 * // Number keys
 * const numMap = new Map([[1, "one"], [2, "two"], [3, "three"]])
 * entries(numMap)
 * // [[1, "one"], [2, "two"], [3, "three"]]
 *
 * // Object keys
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * const objMap = new Map([[obj1, "first"], [obj2, "second"]])
 * entries(objMap)
 * // [[{id:1}, "first"], [{id:2}, "second"]]
 *
 * // Symbol keys
 * const sym1 = Symbol("a")
 * const sym2 = Symbol("b")
 * const symMap = new Map([[sym1, 100], [sym2, 200]])
 * entries(symMap)
 * // [[Symbol(a), 100], [Symbol(b), 200]]
 *
 * // Transformation pipeline
 * import { pipe } from "../../combinator/pipe/index.ts"
 * import { map as arrayMap } from "../../array/map/index.ts"
 *
 * const scores = new Map([["Alice", 95], ["Bob", 87], ["Charlie", 92]])
 * pipe(
 *   scores,
 *   entries,
 *   arrayMap(([name, score]) => `${name}: ${score}`)
 * )
 * // ["Alice: 95", "Bob: 87", "Charlie: 92"]
 *
 * // Filtering entries
 * const data = new Map([["a", 1], ["b", 2], ["c", 3], ["d", 4]])
 * entries(data).filter(([_, value]) => value > 2)
 * // [["c", 3], ["d", 4]]
 *
 * // Sorting entries
 * const unsorted = new Map([["c", 3], ["a", 1], ["b", 2]])
 * entries(unsorted).sort(([a], [b]) => a.localeCompare(b))
 * // [["a", 1], ["b", 2], ["c", 3]]
 *
 * // Converting to object
 * const userMap = new Map([
 *   ["name", "Alice"],
 *   ["age", 30],
 *   ["city", "NYC"]
 * ])
 * Object.fromEntries(entries(userMap))
 * // { name: "Alice", age: 30, city: "NYC" }
 *
 * // Serialization for JSON
 * const cache = new Map([
 *   ["user:1", { name: "Alice", role: "admin" }],
 *   ["user:2", { name: "Bob", role: "user" }]
 * ])
 * const serializable = entries(cache)
 * const json = JSON.stringify(serializable)
 * // Can later restore with: new Map(JSON.parse(json))
 *
 * // Map to Map transformation
 * const prices = new Map([
 *   ["apple", 1.99],
 *   ["banana", 0.59],
 *   ["orange", 2.49]
 * ])
 * const discounted = new Map(
 *   entries(prices).map(([item, price]) => [item, price * 0.9])
 * )
 * // Map { "apple" => 1.791, "banana" => 0.531, "orange" => 2.241 }
 *
 * // Destructuring entries
 * const config = new Map([["host", "localhost"], ["port", 3000]])
 * for (const [key, value] of entries(config)) {
 *   console.log(`${key}: ${value}`)
 * }
 * // "host: localhost"
 * // "port: 3000"
 *
 * // Reversing key-value pairs
 * const original = new Map([["a", 1], ["b", 2], ["c", 3]])
 * const reversed = new Map(
 *   entries(original).map(([k, v]) => [v, k])
 * )
 * // Map { 1 => "a", 2 => "b", 3 => "c" }
 *
 * // Combining with reduce
 * const inventory = new Map([
 *   ["apples", 10],
 *   ["bananas", 5],
 *   ["oranges", 8]
 * ])
 * const total = entries(inventory).reduce(
 *   (sum, [_, count]) => sum + count,
 *   0
 * )
 * // 23
 *
 * // Finding specific entries
 * const users = new Map([
 *   [1, { name: "Alice", active: true }],
 *   [2, { name: "Bob", active: false }],
 *   [3, { name: "Charlie", active: true }]
 * ])
 * const activeUsers = entries(users).filter(
 *   ([_, user]) => user.active
 * )
 * // [[1, {name:"Alice", active:true}], [3, {name:"Charlie", active:true}]]
 *
 * // Grouping entries
 * const items = new Map([
 *   ["apple", { category: "fruit", price: 1.99 }],
 *   ["carrot", { category: "vegetable", price: 0.99 }],
 *   ["banana", { category: "fruit", price: 0.59 }]
 * ])
 * const grouped = entries(items).reduce((acc, [name, item]) => {
 *   const cat = item.category
 *   acc[cat] = acc[cat] || []
 *   acc[cat].push(name)
 *   return acc
 * }, {} as Record<string, Array<string>>)
 * // { fruit: ["apple", "banana"], vegetable: ["carrot"] }
 *
 * // Preserves insertion order
 * const ordered = new Map()
 * ordered.set("z", 26)
 * ordered.set("a", 1)
 * ordered.set("m", 13)
 * entries(ordered)
 * // [["z", 26], ["a", 1], ["m", 13]]
 *
 * // Type preservation
 * const typed = new Map<string, number>([["a", 1], ["b", 2]])
 * const typedEntries: Array<[string, number]> = entries(typed)
 * // Type is preserved as Array<[string, number]>
 *
 * // Comparison with Map.entries()
 * const map = new Map([["a", 1], ["b", 2]])
 * entries(map)           // Returns array directly
 * [...map.entries()]     // Built-in requires spreading
 * // Both produce [["a", 1], ["b", 2]]
 *
 * // Use with async operations
 * const urls = new Map([
 *   ["api", "https://api.example.com"],
 *   ["cdn", "https://cdn.example.com"]
 * ])
 * await Promise.all(
 *   entries(urls).map(async ([name, url]) => {
 *     const response = await fetch(url)
 *     return [name, response.status]
 *   })
 * )
 * // [["api", 200], ["cdn", 200]]
 *
 * // Memory efficiency note
 * const hugeMap = new Map() // Imagine millions of entries
 * entries(hugeMap)  // Creates array with all entries in memory
 * // For large Maps, consider iterating directly instead
 * ```
 * @property Pure - Doesn't modify the input Map
 * @property Order-preserving - Maintains Map's insertion order
 * @property Type-safe - Preserves key and value types
 */
const entries = <K, V>(map: Map<K, V>): Array<[K, V]> => {
	return Array.from(map.entries())
}

export default entries
