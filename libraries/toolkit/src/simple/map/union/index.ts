/**
 * Combines multiple Maps (alias for merge)
 *
 * Creates a new Map containing all entries from the provided Maps.
 * When keys appear in multiple Maps, values from later Maps override
 * those from earlier ones. This is an alias for the merge function,
 * providing a more familiar name for set union operations. Follows
 * left-to-right precedence for consistent, predictable results.
 *
 * @curried (...maps) => result
 * @param maps - Maps to combine
 * @returns A new Map containing all entries
 * @example
 * ```typescript
 * // Basic union of two Maps
 * const map1 = new Map([["a", 1], ["b", 2]])
 * const map2 = new Map([["c", 3], ["d", 4]])
 * union(map1, map2)
 * // Map { "a" => 1, "b" => 2, "c" => 3, "d" => 4 }
 *
 * // Overlapping keys (later wins)
 * const first = new Map([["x", 10], ["y", 20]])
 * const second = new Map([["y", 200], ["z", 300]])
 * union(first, second)
 * // Map { "x" => 10, "y" => 200, "z" => 300 }
 *
 * // Multiple Maps
 * const m1 = new Map([["a", 1]])
 * const m2 = new Map([["b", 2]])
 * const m3 = new Map([["c", 3]])
 * union(m1, m2, m3)
 * // Map { "a" => 1, "b" => 2, "c" => 3 }
 *
 * // Configuration merging
 * const defaults = new Map([["host", "localhost"], ["port", 3000]])
 * const overrides = new Map([["port", 8080], ["ssl", true]])
 * union(defaults, overrides)
 * // Map { "host" => "localhost", "port" => 8080, "ssl" => true }
 *
 * // Partial application
 * const withDefaults = (defaults: Map<string, any>) =>
 *   (...overrides: Array<Map<string, any>>) =>
 *     union(defaults, ...overrides)
 *
 * // This is an alias for merge
 * import merge from "../merge/index.ts"
 * const test = new Map([["x", 1]])
 * union(test) === merge(test)  // true
 * ```
 * @pure
 */
import merge from "../merge/index.ts"

const union = merge

export default union
