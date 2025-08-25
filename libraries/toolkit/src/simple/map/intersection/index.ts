/**
 * Returns a Map with keys present in both Maps
 *
 * Creates a new Map containing only the key-value pairs whose keys exist
 * in both input Maps. The values are taken from the first Map. This is
 * the set intersection operation for Map keys. The comparison uses the
 * standard Map equality (SameValueZero algorithm).
 *
 * @curried (second) => (first) => result
 * @param second - The Map to intersect with
 * @param first - The Map to take values from
 * @returns A new Map with keys present in both Maps, values from first
 * @example
 * ```typescript
 * // Basic usage
 * const map1 = new Map([["a", 1], ["b", 2], ["c", 3]])
 * const map2 = new Map([["b", 20], ["c", 30], ["d", 40]])
 * intersection(map2)(map1)
 * // Map { "b" => 2, "c" => 3 }
 * // Keys "b" and "c" are in both, values from map1
 *
 * // Direct application
 * const inventory = new Map([
 *   ["apple", 50],
 *   ["banana", 30],
 *   ["orange", 25]
 * ])
 * const requested = new Map([
 *   ["banana", 10],
 *   ["orange", 5],
 *   ["grape", 20]
 * ])
 * intersection(requested)(inventory)
 * // Map { "banana" => 30, "orange" => 25 }
 * // Only items that exist in inventory
 *
 * // No overlap
 * const map1 = new Map([["a", 1], ["b", 2]])
 * const map2 = new Map([["c", 3], ["d", 4]])
 * intersection(map2)(map1)
 * // Map {}
 *
 * // Complete overlap
 * const map1 = new Map([["a", 1], ["b", 2]])
 * const map2 = new Map([["a", 10], ["b", 20]])
 * intersection(map2)(map1)
 * // Map { "a" => 1, "b" => 2 }
 *
 * // Empty Maps
 * intersection(new Map())(new Map([["a", 1]]))
 * // Map {}
 * intersection(new Map([["a", 1]]))(new Map())
 * // Map {}
 *
 * // One key in common
 * const users = new Map([
 *   ["alice", { age: 30 }],
 *   ["bob", { age: 25 }],
 *   ["charlie", { age: 35 }]
 * ])
 * const active = new Map([
 *   ["bob", true],
 *   ["diana", true]
 * ])
 * intersection(active)(users)
 * // Map { "bob" => { age: 25 } }
 *
 * // Using with pipe
 * import { pipe } from "../../combinator/pipe/index.ts"
 *
 * const allProducts = new Map([
 *   ["laptop", 999],
 *   ["mouse", 29],
 *   ["keyboard", 79],
 *   ["monitor", 399]
 * ])
 * const inStock = new Map([
 *   ["mouse", 15],
 *   ["keyboard", 8],
 *   ["cable", 50]
 * ])
 * const featured = new Map([
 *   ["keyboard", true],
 *   ["monitor", true]
 * ])
 *
 * pipe(
 *   allProducts,
 *   intersection(inStock),
 *   intersection(featured)
 * )
 * // Map { "keyboard" => 79 }
 *
 * // Partial application for filtering
 * const allowlist = new Map([
 *   ["user:read", true],
 *   ["user:write", true],
 *   ["admin:read", true]
 * ])
 * const filterByAllowlist = intersection(allowlist)
 *
 * const permissions1 = new Map([
 *   ["user:read", "Alice"],
 *   ["user:delete", "Alice"],
 *   ["admin:write", "Alice"]
 * ])
 * filterByAllowlist(permissions1)
 * // Map { "user:read" => "Alice" }
 *
 * // Number keys
 * const scores = new Map([[1, 95], [2, 87], [3, 92], [4, 88]])
 * const passing = new Map([[1, true], [3, true], [4, true], [5, true]])
 * intersection(passing)(scores)
 * // Map { 1 => 95, 3 => 92, 4 => 88 }
 *
 * // Finding common elements
 * const shopA = new Map([
 *   ["apples", 1.99],
 *   ["bananas", 0.59],
 *   ["oranges", 2.49]
 * ])
 * const shopB = new Map([
 *   ["bananas", 0.69],
 *   ["oranges", 2.29],
 *   ["grapes", 3.99]
 * ])
 * intersection(shopB)(shopA)
 * // Map { "bananas" => 0.59, "oranges" => 2.49 }
 * // Common items with shopA prices
 *
 * // User verification
 * const registered = new Map([
 *   ["alice@example.com", { id: 1 }],
 *   ["bob@example.com", { id: 2 }],
 *   ["charlie@example.com", { id: 3 }]
 * ])
 * const verified = new Map([
 *   ["bob@example.com", true],
 *   ["charlie@example.com", true],
 *   ["diana@example.com", true]
 * ])
 * intersection(verified)(registered)
 * // Map { "bob@example.com" => {id:2}, "charlie@example.com" => {id:3} }
 *
 * // Feature flags
 * const available = new Map([
 *   ["feature1", "enabled"],
 *   ["feature2", "beta"],
 *   ["feature3", "disabled"]
 * ])
 * const userAccess = new Map([
 *   ["feature2", true],
 *   ["feature3", true],
 *   ["feature4", true]
 * ])
 * intersection(userAccess)(available)
 * // Map { "feature2" => "beta", "feature3" => "disabled" }
 *
 * // Symbol keys
 * const sym1 = Symbol("a")
 * const sym2 = Symbol("b")
 * const sym3 = Symbol("c")
 * const map1 = new Map([[sym1, 1], [sym2, 2], [sym3, 3]])
 * const map2 = new Map([[sym2, 20], [sym3, 30], [Symbol("d"), 40]])
 * intersection(map2)(map1)
 * // Map { Symbol(b) => 2, Symbol(c) => 3 }
 *
 * // Object keys (reference equality)
 * const key1 = { id: 1 }
 * const key2 = { id: 2 }
 * const key3 = { id: 3 }
 * const objMap1 = new Map([[key1, "first"], [key2, "second"]])
 * const objMap2 = new Map([[key2, "zwei"], [key3, "drei"]])
 * intersection(objMap2)(objMap1)
 * // Map { {id:2} => "second" }
 *
 * // Date keys
 * const date1 = new Date("2024-01-01")
 * const date2 = new Date("2024-01-02")
 * const events1 = new Map([
 *   [date1, "New Year"],
 *   [date2, "Day After"]
 * ])
 * const events2 = new Map([
 *   [date1, "Holiday"],
 *   [new Date("2024-01-03"), "Regular Day"]
 * ])
 * intersection(events2)(events1)
 * // Map { Date("2024-01-01") => "New Year" }
 *
 * // Chaining intersections
 * const set1 = new Map([["a", 1], ["b", 2], ["c", 3], ["d", 4]])
 * const set2 = new Map([["b", 20], ["c", 30], ["d", 40], ["e", 50]])
 * const set3 = new Map([["c", 300], ["d", 400], ["e", 500], ["f", 600]])
 *
 * pipe(
 *   set1,
 *   intersection(set2),
 *   intersection(set3)
 * )
 * // Map { "c" => 3, "d" => 4 }
 *
 * // Access control
 * const resources = new Map([
 *   ["file1", { type: "document", size: 1024 }],
 *   ["file2", { type: "image", size: 2048 }],
 *   ["file3", { type: "video", size: 4096 }]
 * ])
 * const userAccess = new Map([
 *   ["file1", "read"],
 *   ["file3", "write"]
 * ])
 * intersection(userAccess)(resources)
 * // Map { "file1" => {...}, "file3" => {...} }
 *
 * // Language support
 * const appTranslations = new Map([
 *   ["en", { hello: "Hello" }],
 *   ["es", { hello: "Hola" }],
 *   ["fr", { hello: "Bonjour" }],
 *   ["de", { hello: "Hallo" }]
 * ])
 * const userLanguages = new Map([
 *   ["en", true],
 *   ["es", true],
 *   ["pt", true]
 * ])
 * intersection(userLanguages)(appTranslations)
 * // Map { "en" => {...}, "es" => {...} }
 *
 * // Cache validation
 * const cache = new Map([
 *   ["user:1", { data: "Alice", ttl: 3600 }],
 *   ["user:2", { data: "Bob", ttl: 1800 }],
 *   ["user:3", { data: "Charlie", ttl: 900 }]
 * ])
 * const valid = new Map([
 *   ["user:1", true],
 *   ["user:3", true],
 *   ["user:4", true]
 * ])
 * intersection(valid)(cache)
 * // Map { "user:1" => {...}, "user:3" => {...} }
 *
 * // Set theory operations
 * const A = new Map([["x", 1], ["y", 2], ["z", 3]])
 * const B = new Map([["y", 20], ["z", 30], ["w", 40]])
 * const AintersectB = intersection(B)(A)
 * // Map { "y" => 2, "z" => 3 }
 * // A ∩ B
 *
 * // Building filters
 * const data = new Map([
 *   ["id", 123],
 *   ["name", "Product"],
 *   ["price", 99.99],
 *   ["_internal", "secret"],
 *   ["_debug", true]
 * ])
 * const publicFields = new Map([
 *   ["id", 1],
 *   ["name", 1],
 *   ["price", 1]
 * ])
 * intersection(publicFields)(data)
 * // Map { "id" => 123, "name" => "Product", "price" => 99.99 }
 *
 * // Null and undefined keys
 * const nullable1 = new Map([
 *   [null, "null1"],
 *   [undefined, "undef1"],
 *   ["normal", "value1"]
 * ])
 * const nullable2 = new Map([
 *   [null, "null2"],
 *   ["normal", "value2"],
 *   ["other", "value3"]
 * ])
 * intersection(nullable2)(nullable1)
 * // Map { null => "null1", "normal" => "value1" }
 *
 * // Type safety
 * const typed1 = new Map<string, number>([["a", 1], ["b", 2], ["c", 3]])
 * const typed2 = new Map<string, boolean>([["b", true], ["c", false]])
 * const result: Map<string, number> = intersection(typed2)(typed1)
 * // Map<string, number> { "b" => 2, "c" => 3 }
 *
 * // Performance with large Maps
 * const large1 = new Map(
 *   Array.from({ length: 10000 }, (_, i) => [`key${i}`, i])
 * )
 * const large2 = new Map(
 *   Array.from({ length: 5000 }, (_, i) => [`key${i * 2}`, i])
 * )
 * intersection(large2)(large1)
 * // Map with ~5000 entries (even numbered keys)
 * ```
 * @property Pure - Creates new Map, doesn't modify inputs
 * @property Curried - Allows partial application
 * @property Set-like - Implements set intersection for Map keys
 */
const intersection =
	<K, V, V2>(second: Map<K, V2>) => (first: Map<K, V>): Map<K, V> => {
		const result = new Map<K, V>()

		for (const [key, value] of first) {
			if (second.has(key)) {
				result.set(key, value)
			}
		}

		return result
	}

export default intersection
