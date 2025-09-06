/**
 * Returns a Map with keys present in both Maps, using custom equality
 *
 * Creates a new Map containing only the key-value pairs from the first Map
 * whose keys are present in the second Map, as determined by a custom
 * equality function. This allows for complex key comparisons beyond the
 * standard Map equality. Values are taken from the first Map.
 *
 * @param equalsFn - Function to compare keys for equality
 * @param second - The Map to intersect with
 * @param first - The Map to take values from
 * @returns A new Map with matching keys, values from first
 * @example
 * ```typescript
 * // Case-insensitive string comparison
 * const caseInsensitiveEq = (a: string, b: string) =>
 *   a.toLowerCase() === b.toLowerCase()
 *
 * const map1 = new Map([["Alice", 1], ["Bob", 2]])
 * const map2 = new Map([["alice", 10], ["charlie", 30]])
 * intersectionWith(caseInsensitiveEq)(map2)(map1)
 * // Map { "Alice" => 1 }
 *
 * // Object key comparison by property
 * const userEq = (a: {id: number}, b: {id: number}) => a.id === b.id
 * const users1 = new Map([[{id: 1, name: "Alice"}, "A"]])
 * const users2 = new Map([[{id: 1, name: "Alicia"}, "X"]])
 * intersectionWith(userEq)(users2)(users1)
 * // Map { {id:1, name:"Alice"} => "A" }
 *
 * // Numeric tolerance comparison
 * const approxEq = (a: number, b: number) => Math.abs(a - b) <= 0.5
 * const measurements = new Map([[10.1, "Sample A"], [30.2, "Sample C"]])
 * const targets = new Map([[10, "Target 1"], [30, "Target 2"]])
 * intersectionWith(approxEq)(targets)(measurements)
 * // Map { 10.1 => "Sample A", 30.2 => "Sample C" }
 *
 * // Array comparison by content
 * const arrayEq = (a: number[], b: number[]) =>
 *   a.length === b.length && a.every((v, i) => v === b[i])
 * const arrays1 = new Map([[[1, 2], "A"], [[3, 4], "B"]])
 * const arrays2 = new Map([[[1, 2], "X"]])
 * intersectionWith(arrayEq)(arrays2)(arrays1)
 * // Map { [1,2] => "A" }
 *
 * // No matches
 * const noMatch1 = new Map([["a", 1]])
 * const noMatch2 = new Map([["b", 2]])
 * intersectionWith((a, b) => a === b)(noMatch2)(noMatch1)
 * // Map {}
 * ```
 * @pure
 * @immutable
 * @curried
 */
const intersectionWith = <K, V, K2, V2>(
	equalsFn: (a: K, b: K2) => boolean,
) =>
(second: Map<K2, V2>) =>
(first: Map<K, V>): Map<K, V> =>
	new Map(
		Array.from(first).filter(([key]) =>
			Array.from(second.keys()).some((secondKey) =>
				equalsFn(key, secondKey)
			)
		),
	)

export default intersectionWith
