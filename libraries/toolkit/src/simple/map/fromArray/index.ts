/**
 * Creates a Map from an array of [key, value] pairs
 *
 * Constructs a new Map from an array of tuples, where each tuple contains
 * a key and its corresponding value. This is the inverse of the entries
 * function. If duplicate keys exist, the last occurrence wins. The function
 * accepts any iterable of key-value pairs.
 *
 * @param entries - Array of [key, value] tuples
 * @returns A new Map constructed from the entries
 * @example
 * // Basic usage
 * fromArray([["a", 1], ["b", 2], ["c", 3]])
 * // Map { "a" => 1, "b" => 2, "c" => 3 }
 * 
 * // Empty array
 * fromArray([])  // Map {}
 * 
 * // Duplicate keys (last wins)
 * fromArray([["a", 1], ["b", 2], ["a", 3]])
 * // Map { "a" => 3, "b" => 2 }
 * 
 * // From Object.entries()
 * const obj = { name: "Alice", age: 30 }
 * fromArray(Object.entries(obj))
 * // Map { "name" => "Alice", "age" => 30 }
 * 
 * // Building from array transformations
 * const users = ["Alice", "Bob", "Charlie"]
 * const indexed = users.map((name, i) => [i + 1, name])
 * fromArray(indexed)  // Map { 1 => "Alice", 2 => "Bob", 3 => "Charlie" }
 * 
 * @pure
 * @immutable
 * @safe
 */
const fromArray = <K, V>(
	entries: Array<[K, V]>,
): Map<K, V> => {
	return new Map(entries)
}

export default fromArray