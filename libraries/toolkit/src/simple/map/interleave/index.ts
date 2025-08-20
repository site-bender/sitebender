/**
 * Alternate entries from multiple Maps
 * 
 * Creates a new Map by taking entries alternately from each input Map.
 * Takes one entry from the first Map, then one from the second, and so on,
 * cycling through all Maps until all entries are consumed. If Maps have
 * different sizes, continues with remaining Maps after shorter ones are
 * exhausted. Duplicate keys use the last occurrence.
 * 
 * @param maps - Array of Maps to interleave
 * @returns A new Map with interleaved entries
 * @example
 * ```typescript
 * // Basic usage - equal sized Maps
 * const map1 = new Map([["a", 1], ["b", 2], ["c", 3]])
 * const map2 = new Map([["d", 4], ["e", 5], ["f", 6]])
 * interleave([map1, map2])
 * // Map { "a" => 1, "d" => 4, "b" => 2, "e" => 5, "c" => 3, "f" => 6 }
 * 
 * // Different sized Maps
 * const short = new Map([["a", 1], ["b", 2]])
 * const long = new Map([["x", 10], ["y", 20], ["z", 30], ["w", 40]])
 * interleave([short, long])
 * // Map { "a" => 1, "x" => 10, "b" => 2, "y" => 20, "z" => 30, "w" => 40 }
 * 
 * // Three Maps
 * const map1 = new Map([["a", 1], ["b", 2]])
 * const map2 = new Map([["c", 3], ["d", 4]])
 * const map3 = new Map([["e", 5], ["f", 6]])
 * interleave([map1, map2, map3])
 * // Map { "a" => 1, "c" => 3, "e" => 5, "b" => 2, "d" => 4, "f" => 6 }
 * 
 * // Single Map
 * interleave([new Map([["a", 1], ["b", 2]])])
 * // Map { "a" => 1, "b" => 2 }
 * 
 * // Empty Maps
 * interleave([new Map(), new Map()])
 * // Map {}
 * 
 * // Mix of empty and non-empty
 * const filled = new Map([["a", 1], ["b", 2]])
 * const empty = new Map()
 * interleave([filled, empty])
 * // Map { "a" => 1, "b" => 2 }
 * 
 * // No Maps
 * interleave([])
 * // Map {}
 * 
 * // Duplicate keys (last wins)
 * const first = new Map([["a", 1], ["b", 2]])
 * const second = new Map([["a", 10], ["c", 3]])
 * interleave([first, second])
 * // Map { "a" => 10, "b" => 2, "c" => 3 }
 * 
 * // String values
 * const colors = new Map([["r", "red"], ["g", "green"]])
 * const shapes = new Map([["c", "circle"], ["s", "square"]])
 * interleave([colors, shapes])
 * // Map { "r" => "red", "c" => "circle", "g" => "green", "s" => "square" }
 * 
 * // Number keys
 * const odds = new Map([[1, "one"], [3, "three"], [5, "five"]])
 * const evens = new Map([[2, "two"], [4, "four"], [6, "six"]])
 * interleave([odds, evens])
 * // Map { 1 => "one", 2 => "two", 3 => "three", 4 => "four", 5 => "five", 6 => "six" }
 * 
 * // Merging data sources
 * const primary = new Map([
 *   ["user1", { source: "primary", data: "A" }],
 *   ["user2", { source: "primary", data: "B" }]
 * ])
 * const secondary = new Map([
 *   ["user3", { source: "secondary", data: "C" }],
 *   ["user4", { source: "secondary", data: "D" }]
 * ])
 * interleave([primary, secondary])
 * // Alternates between primary and secondary sources
 * 
 * // Round-robin distribution
 * const server1 = new Map([["req1", "S1"], ["req4", "S1"], ["req7", "S1"]])
 * const server2 = new Map([["req2", "S2"], ["req5", "S2"], ["req8", "S2"]])
 * const server3 = new Map([["req3", "S3"], ["req6", "S3"], ["req9", "S3"]])
 * const distributed = interleave([server1, server2, server3])
 * // Map with requests distributed across servers
 * 
 * // Combining priorities
 * const high = new Map([
 *   ["task1", { priority: "high", name: "Critical" }],
 *   ["task2", { priority: "high", name: "Important" }]
 * ])
 * const medium = new Map([
 *   ["task3", { priority: "medium", name: "Normal" }],
 *   ["task4", { priority: "medium", name: "Regular" }]
 * ])
 * const low = new Map([
 *   ["task5", { priority: "low", name: "Minor" }]
 * ])
 * interleave([high, medium, low])
 * // Tasks interleaved by priority
 * 
 * // Language fallbacks
 * const english = new Map([
 *   ["hello", "Hello"],
 *   ["goodbye", "Goodbye"],
 *   ["thanks", "Thanks"]
 * ])
 * const spanish = new Map([
 *   ["hello", "Hola"],
 *   ["goodbye", "Adiós"]
 * ])
 * const french = new Map([
 *   ["hello", "Bonjour"]
 * ])
 * interleave([english, spanish, french])
 * // Interleaved translations with fallbacks
 * 
 * // Time-based data
 * const morning = new Map([
 *   [new Date("2024-01-01T08:00"), "Breakfast"],
 *   [new Date("2024-01-01T10:00"), "Meeting"]
 * ])
 * const afternoon = new Map([
 *   [new Date("2024-01-01T13:00"), "Lunch"],
 *   [new Date("2024-01-01T15:00"), "Workshop"]
 * ])
 * interleave([morning, afternoon])
 * // Events interleaved by time period
 * 
 * // Load balancing simulation
 * const partition1 = new Map([["a", 1], ["d", 4], ["g", 7]])
 * const partition2 = new Map([["b", 2], ["e", 5], ["h", 8]])
 * const partition3 = new Map([["c", 3], ["f", 6], ["i", 9]])
 * const balanced = interleave([partition1, partition2, partition3])
 * // Map { "a" => 1, "b" => 2, "c" => 3, "d" => 4, "e" => 5, ... }
 * 
 * // Shuffling effect
 * const firstHalf = new Map(
 *   Array.from({ length: 5 }, (_, i) => [`first${i}`, i])
 * )
 * const secondHalf = new Map(
 *   Array.from({ length: 5 }, (_, i) => [`second${i}`, i + 5])
 * )
 * interleave([firstHalf, secondHalf])
 * // Creates a shuffled pattern
 * 
 * // Multiple data types
 * const strings = new Map([["s1", "hello"], ["s2", "world"]])
 * const numbers = new Map([["n1", 42], ["n2", 99]])
 * const booleans = new Map([["b1", true], ["b2", false]])
 * interleave([strings, numbers, booleans])
 * // Map with mixed value types
 * 
 * // Zip-like behavior with Maps
 * const keys = new Map([["k1", "key1"], ["k2", "key2"], ["k3", "key3"]])
 * const values = new Map([["v1", "val1"], ["v2", "val2"], ["v3", "val3"]])
 * interleave([keys, values])
 * // Map { "k1" => "key1", "v1" => "val1", "k2" => "key2", ... }
 * 
 * // Maintaining order patterns
 * const sequential = new Map([["1", "first"], ["2", "second"], ["3", "third"]])
 * const reverse = new Map([["6", "sixth"], ["5", "fifth"], ["4", "fourth"]])
 * interleave([sequential, reverse])
 * // Map { "1" => "first", "6" => "sixth", "2" => "second", "5" => "fifth", ... }
 * 
 * // Config merging
 * const defaults = new Map([
 *   ["theme", "light"],
 *   ["fontSize", 14],
 *   ["language", "en"]
 * ])
 * const userPrefs = new Map([
 *   ["theme", "dark"],
 *   ["autoSave", true]
 * ])
 * const systemPrefs = new Map([
 *   ["timezone", "UTC"],
 *   ["locale", "en-US"]
 * ])
 * interleave([defaults, userPrefs, systemPrefs])
 * // Merged configuration with interleaved precedence
 * 
 * // Using with pipe
 * import { pipe } from "../../combinator/pipe/index.ts"
 * import { filter } from "../filter/index.ts"
 * 
 * const active = new Map([["a1", true], ["a2", true]])
 * const inactive = new Map([["i1", false], ["i2", false]])
 * const pending = new Map([["p1", null], ["p2", null]])
 * 
 * pipe(
 *   interleave([active, inactive, pending]),
 *   filter((v) => v !== null)
 * )
 * // Map with null values filtered out
 * 
 * // Creating patterns
 * const red = new Map(Array.from({ length: 3 }, (_, i) => [`r${i}`, "🔴"]))
 * const blue = new Map(Array.from({ length: 3 }, (_, i) => [`b${i}`, "🔵"]))
 * const pattern = interleave([red, blue])
 * // Map { "r0" => "🔴", "b0" => "🔵", "r1" => "🔴", "b1" => "🔵", ... }
 * 
 * // Symbol keys
 * const sym1 = Symbol("a")
 * const sym2 = Symbol("b")
 * const symMap1 = new Map([[sym1, 1], [Symbol("c"), 3]])
 * const symMap2 = new Map([[sym2, 2], [Symbol("d"), 4]])
 * interleave([symMap1, symMap2])
 * // Map with interleaved symbol keys
 * 
 * // Large Maps
 * const large1 = new Map(Array.from({ length: 1000 }, (_, i) => [`a${i}`, i]))
 * const large2 = new Map(Array.from({ length: 1000 }, (_, i) => [`b${i}`, i]))
 * const interleaved = interleave([large1, large2])
 * // Map with 2000 entries, alternating between a and b prefixes
 * 
 * // Type safety
 * const typed1 = new Map<string, number>([["a", 1], ["b", 2]])
 * const typed2 = new Map<string, number>([["c", 3], ["d", 4]])
 * const result: Map<string, number> = interleave([typed1, typed2])
 * // Type-safe interleaving
 * 
 * // Practical use case: A/B testing
 * const variantA = new Map([
 *   ["user1", "layoutA"],
 *   ["user3", "layoutA"],
 *   ["user5", "layoutA"]
 * ])
 * const variantB = new Map([
 *   ["user2", "layoutB"],
 *   ["user4", "layoutB"],
 *   ["user6", "layoutB"]
 * ])
 * const abTest = interleave([variantA, variantB])
 * // Users alternately assigned to variants
 * ```
 * @property Pure - Creates new Map, doesn't modify inputs
 * @property Flexible - Handles any number of Maps
 * @property Order-preserving - Maintains insertion order within each Map
 */
const interleave = <K, V>(maps: Array<Map<K, V>>): Map<K, V> => {
	const result = new Map<K, V>()
	
	if (maps.length === 0) {
		return result
	}
	
	// Convert each Map to an array of entries
	const iterators = maps.map(m => [...m.entries()])
	const maxLength = Math.max(...iterators.map(it => it.length))
	
	// Interleave entries
	for (let i = 0; i < maxLength; i++) {
		for (const iterator of iterators) {
			if (i < iterator.length) {
				const [key, value] = iterator[i]
				result.set(key, value)
			}
		}
	}
	
	return result
}

export default interleave