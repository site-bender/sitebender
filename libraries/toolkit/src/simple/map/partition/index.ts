/**
 * Splits a Map into two Maps based on a predicate
 *
 * Divides a Map into two separate Maps: one containing all entries that
 * satisfy the predicate (truthy), and another containing all entries that
 * don't (falsy). The predicate function receives both value and key for
 * each entry. Returns a tuple with the satisfying Map first and the
 * non-satisfying Map second.
 *
 * @curried (predicate) => (map) => [satisfies, doesNotSatisfy]
 * @param predicate - Function that returns true for entries in the first Map
 * @param map - The Map to partition
 * @returns A tuple of two Maps: [satisfying, non-satisfying]
 * @example
 * ```typescript
 * // Basic numeric partition
 * const scores = new Map([
 *   ["Alice", 95],
 *   ["Bob", 72],
 *   ["Charlie", 88],
 *   ["David", 65]
 * ])
 * const [passing, failing] = partition((score: number) => score >= 80)(scores)
 * // passing: Map { "Alice" => 95, "Charlie" => 88 }
 * // failing: Map { "Bob" => 72, "David" => 65 }
 *
 * // Partition by key pattern
 * const config = new Map([
 *   ["app.name", "MyApp"],
 *   ["_debug", true],
 *   ["user.theme", "dark"]
 * ])
 * const [public, private] = partition(
 *   (_: any, key: string) => !key.startsWith("_")
 * )(config)
 * // public: Map { "app.name" => "MyApp", "user.theme" => "dark" }
 * // private: Map { "_debug" => true }
 *
 * // Partition objects by property
 * const users = new Map([
 *   [1, { name: "Alice", active: true }],
 *   [2, { name: "Bob", active: false }],
 *   [3, { name: "Charlie", active: true }]
 * ])
 * const [activeUsers, inactiveUsers] = partition(
 *   (user: any) => user.active
 * )(users)
 * // activeUsers: Map { 1 => {...}, 3 => {...} }
 * // inactiveUsers: Map { 2 => {...} }
 *
 * // Empty Map
 * const [empty1, empty2] = partition((v: any) => true)(new Map())
 * // empty1: Map {}, empty2: Map {}
 *
 * // All satisfy
 * const positive = new Map([["a", 1], ["b", 2]])
 * const [all, none] = partition((n: number) => n > 0)(positive)
 * // all: Map { "a" => 1, "b" => 2 }, none: Map {}
 * ```
 * @curried
 * @pure
 * @immutable
 */
const partition = <K, V>(
	predicate: (value: V, key: K) => boolean,
) =>
(map: Map<K, V>): [Map<K, V>, Map<K, V>] => {
	const satisfies = new Map<K, V>()
	const doesNotSatisfy = new Map<K, V>()

	for (const [key, value] of map) {
		if (predicate(value, key)) {
			satisfies.set(key, value)
		} else {
			doesNotSatisfy.set(key, value)
		}
	}

	return [satisfies, doesNotSatisfy]
}

export default partition