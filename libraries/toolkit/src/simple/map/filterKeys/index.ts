/**
 * Filters a Map based on a key predicate
 *
 * Creates a new Map containing only the key-value pairs whose keys satisfy
 * the predicate function. This is a specialized version of filter that only
 * examines keys, making it clearer and more efficient when filtering is
 * based solely on key properties.
 *
 * @param predicate - Function that returns true for keys to keep
 * @param map - The Map to filter
 * @returns A new Map with only entries whose keys satisfy the predicate
 * @example
 * ```typescript
 * // Basic usage - filter by key prefix
 * const config = new Map([
 *   ["app.name", "MyApp"],
 *   ["app.version", "1.0.0"],
 *   ["db.host", "localhost"]
 * ])
 * const appConfig = filterKeys((key: string) => key.startsWith("app."))
 * appConfig(config)
 * // Map { "app.name" => "MyApp", "app.version" => "1.0.0" }
 *
 * // Filter by key suffix
 * const data = new Map([["user_id", 123], ["user_name", "Alice"], ["post_id", 456]])
 * filterKeys((key: string) => key.endsWith("_id"))(data)
 * // Map { "user_id" => 123, "post_id" => 456 }
 *
 * // Filter numeric keys
 * const numMap = new Map([[1, "one"], [2, "two"], [3, "three"]])
 * filterKeys((key: number) => key % 2 === 1)(numMap)
 * // Map { 1 => "one", 3 => "three" }
 *
 * // Using with pipe
 * import pipe from "../../combinator/pipe/index.ts"
 *
 * pipe(
 *   new Map([
 *     ["cache:user:1", "Alice"],
 *     ["temp:file:1", "temp.txt"],
 *     ["cache:user:2", "Bob"]
 *   ]),
 *   filterKeys((key: string) => key.startsWith("cache:")),
 *   filterKeys((key: string) => key.includes("user"))
 * )
 * // Map { "cache:user:1" => "Alice", "cache:user:2" => "Bob" }
 *
 * // Partial application for key patterns
 * const keepPublic = filterKeys((key: string) => !key.startsWith("_"))
 * keepPublic(new Map([["theme", "dark"], ["_internal", "secret"]]))
 * // Map { "theme" => "dark" }
 *
 * // Regular expression matching
 * const files = new Map([["index.ts", 100], ["styles.css", 50], ["utils.ts", 150]])
 * filterKeys((name: string) => /\.ts$/.test(name))(files)
 * // Map { "index.ts" => 100, "utils.ts" => 150 }
 * ```
 * @pure
 * @curried
 * @immutable
 */
const filterKeys = <K, V>(
	predicate: (key: K) => boolean,
) =>
(map: Map<K, V>): Map<K, V> => {
	return new Map(
		[...map.entries()].filter(([key]) => predicate(key))
	)
}

export default filterKeys
