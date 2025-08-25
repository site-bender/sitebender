/**
 * Creates a Map from an iterable of [key, value] entries
 *
 * Alias for fromArray. Constructs a new Map from an iterable of key-value
 * pairs. This matches the naming convention of Object.fromEntries() and
 * provides a more semantic name when working with entry arrays. If duplicate
 * keys exist, the last occurrence wins.
 *
 * @param entries - Iterable of [key, value] tuples
 * @returns A new Map constructed from the entries
 * @example
 * ```typescript
 * // Basic usage
 * fromEntries([["a", 1], ["b", 2], ["c", 3]])
 * // Map { "a" => 1, "b" => 2, "c" => 3 }
 *
 * // This is an alias for fromArray
 * import { fromArray } from "../fromArray/index.ts"
 * const entries = [["x", 10], ["y", 20]] as Array<[string, number]>
 * fromEntries(entries)  // Same as fromArray(entries)
 * // Map { "x" => 10, "y" => 20 }
 *
 * // See fromArray for comprehensive examples
 * ```
 * @property Pure - Creates a new Map without side effects
 * @property Alias - Semantic alias for fromArray
 * @property Last-wins - Duplicate keys use the last value
 * @see {@link fromArray} for detailed documentation and examples
 */
import fromArray from "../fromArray/index.ts"

const fromEntries = fromArray

export default fromEntries
