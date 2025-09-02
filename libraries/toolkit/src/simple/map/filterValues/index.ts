/**
 * Filters a Map based on a value predicate
 *
 * Creates a new Map containing only the key-value pairs whose values satisfy
 * the predicate function. This is a specialized version of filter that only
 * examines values, making it clearer and more efficient when filtering is
 * based solely on value properties.
 *
 * @param predicate - Function that returns true for values to keep
 * @param map - The Map to filter
 * @returns A new Map with only entries whose values satisfy the predicate
 * @example
 * ```typescript
 * // Basic usage - filter by value
 * const scores = new Map([["Alice", 95], ["Bob", 72], ["Charlie", 88]])
 * const highScores = filterValues((score: number) => score >= 80)
 * highScores(scores)
 * // Map { "Alice" => 95, "Charlie" => 88 }
 *
 * // Filter by value type
 * const mixed = new Map([["a", 1], ["b", "hello"], ["c", 2]])
 * filterValues((v: any) => typeof v === "number")(mixed)
 * // Map { "a" => 1, "c" => 2 }
 *
 * // Filter object values by property
 * const users = new Map([
 *   ["user1", { name: "Alice", active: true }],
 *   ["user2", { name: "Bob", active: false }]
 * ])
 * filterValues((user: any) => user.active)(users)
 * // Map { "user1" => {...} }
 *
 * // Using with pipe
 * import pipe from "../../combinator/pipe/index.ts"
 *
 * pipe(
 *   new Map([
 *     ["apple", { count: 50, category: "fruit" }],
 *     ["carrot", { count: 0, category: "vegetable" }],
 *     ["banana", { count: 25, category: "fruit" }]
 *   ]),
 *   filterValues((item: any) => item.count > 0),
 *   filterValues((item: any) => item.category === "fruit")
 * )
 * // Map { "apple" => {...} }
 *
 * // Partial application for reuse
 * const nonEmpty = filterValues((v: string) => v.length > 0)
 * nonEmpty(new Map([["name", "MyApp"], ["version", ""], ["author", "Alice"]]))
 * // Map { "name" => "MyApp", "author" => "Alice" }
 *
 * // Numeric range filtering
 * const temperatures = new Map([["sensor1", 23.5], ["sensor2", 18.2], ["sensor3", 25.8]])
 * filterValues((temp: number) => temp >= 20 && temp <= 25)(temperatures)
 * // Map { "sensor1" => 23.5 }
 *
 * // Boolean filtering
 * const flags = new Map([["isActive", true], ["isVerified", false], ["isPremium", true]])
 * filterValues((flag: boolean) => flag === true)(flags)
 * // Map { "isActive" => true, "isPremium" => true }
 * ```
 * @pure
 * @curried
 * @immutable
 */
const filterValues = <K, V>(
	predicate: (value: V) => boolean,
) =>
(map: Map<K, V>): Map<K, V> => {
	return new Map(
		[...map.entries()].filter(([, value]) => predicate(value)),
	)
}

export default filterValues
