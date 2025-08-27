/**
 * Merges Maps using a custom merge function for conflicting keys
 *
 * Combines entries from multiple Maps into a new Map. When the same key
 * appears in multiple Maps, the provided merge function determines the
 * resulting value by receiving both the existing and new values. This
 * allows for sophisticated merging strategies like accumulation, deep
 * merging of objects, or custom conflict resolution.
 *
 * @param mergeFn - Function to merge values when keys conflict
 * @param maps - Maps to merge together
 * @returns A new Map with merged entries
 * @example
 * ```typescript
 * // Basic accumulation
 * const sum = (a: number, b: number) => a + b
 * const map1 = new Map([["a", 1], ["b", 2]])
 * const map2 = new Map([["b", 3], ["c", 4]])
 * mergeWith(sum)(map1, map2)
 * // Map { "a" => 1, "b" => 5, "c" => 4 }
 *
 * // String concatenation
 * const concat = (a: string, b: string) => `${a}, ${b}`
 * const names1 = new Map([["team", "Alice"], ["lead", "Bob"]])
 * const names2 = new Map([["team", "Charlie"], ["member", "David"]])
 * mergeWith(concat)(names1, names2)
 * // Map { "team" => "Alice, Charlie", "lead" => "Bob", "member" => "David" }
 *
 * // Array accumulation
 * const combine = (a: Array<any>, b: Array<any>) => [...a, ...b]
 * const tags1 = new Map([["user1", ["admin", "active"]]])
 * const tags2 = new Map([["user1", ["moderator"]], ["user2", ["guest"]]])
 * mergeWith(combine)(tags1, tags2)
 * // Map { "user1" => ["admin", "active", "moderator"], "user2" => ["guest"] }
 *
 * // Object deep merge
 * const deepMerge = (a: any, b: any) => ({ ...a, ...b })
 * const config1 = new Map([["app", { name: "MyApp", version: "1.0" }]])
 * const config2 = new Map([["app", { version: "1.1", debug: true }]])
 * mergeWith(deepMerge)(config1, config2)
 * // Map { "app" => {name:"MyApp", version:"1.1", debug:true} }
 *
 * // Maximum value selection
 * const max = (a: number, b: number) => Math.max(a, b)
 * const scores1 = new Map([["Alice", 85], ["Bob", 92]])
 * const scores2 = new Map([["Alice", 90], ["Charlie", 88]])
 * mergeWith(max)(scores1, scores2)
 * // Map { "Alice" => 90, "Bob" => 92, "Charlie" => 88 }
 * ```
 * @pure
 * @immutable
 * @curried
 */
const mergeWith = <K, V>(
	mergeFn: (existingValue: V, incomingValue: V) => V,
) =>
(...maps: Array<Map<K, V>>): Map<K, V> =>
	maps.reduce((acc, map) => {
		const entries = Array.from(map).map(([key, value]): [K, V] => [
			key,
			acc.has(key) ? mergeFn(acc.get(key)!, value) : value
		])
		return new Map([...acc, ...entries])
	}, new Map<K, V>())

export default mergeWith