/**
 * Creates a new empty Map
 *
 * Returns a new empty Map instance. This is useful for clearing a Map
 * while maintaining immutability, or for creating a fresh Map in a
 * functional pipeline. The function is pure and always returns a new
 * Map instance.
 *
 * @returns A new empty Map
 * @example
 * // Basic usage
 * clear()                                                  // Map {}
 *
 * // Clearing an existing Map immutably
 * const original = new Map([["a", 1], ["b", 2]])
 * const cleared = clear()
 * // original unchanged, cleared is new empty Map
 *
 * // Use with conditional logic
 * const resetIfError = (map: Map<string, any>, hasError: boolean) =>
 *   hasError ? clear() : map
 *
 * // Type-safe empty Maps
 * const emptyNumbers: Map<string, number> = clear()
 * const emptyUsers: Map<number, { name: string }> = clear()
 *
 * // Use as default/fallback
 * const getMap = (data: Map<string, any> | null) => data ?? clear()
 * getMap(null)                                            // Map {}
 *
 * // Factory pattern
 * const createEmptyCache = () => clear()
 * const cache1 = createEmptyCache()                       // Map {}
 * const cache2 = createEmptyCache()                       // Map {} (different instance)
 * @pure
 * @immutable
 * @safe
 */
const clear = <K = any, V = any>(): Map<K, V> => {
	return new Map<K, V>()
}

export default clear
