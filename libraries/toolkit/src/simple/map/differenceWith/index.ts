/**
 * Returns a Map with keys in the first Map but not in the second, using custom equality
 *
 * Creates a new Map containing only the key-value pairs from the first Map
 * whose keys are not present in the second Map, as determined by a custom
 * equality function. This allows for complex key comparisons beyond the
 * standard Map equality.
 *
 * @curried (equalsFn) => (subtrahend) => (minuend) => result
 * @param equalsFn - Function to compare keys for equality
 * @param subtrahend - The Map whose keys to exclude
 * @param minuend - The Map to subtract from
 * @returns A new Map with keys from minuend not matching any in subtrahend
 * @example
 * ```typescript
 * // Case-insensitive string comparison
 * const caseInsensitiveEq = (a: string, b: string) =>
 *   a.toLowerCase() === b.toLowerCase()
 *
 * const map1 = new Map([["Alice", 1], ["Bob", 2], ["Charlie", 3]])
 * const map2 = new Map([["alice", 10], ["BOB", 20]])
 *
 * differenceWith(caseInsensitiveEq)(map2)(map1)
 * // Map { "Charlie" => 3 }
 *
 * // Object key comparison by property
 * type User = { id: number; name: string }
 * const userEq = (a: User, b: User) => a.id === b.id
 *
 * const user1 = { id: 1, name: "Alice" }
 * const user2 = { id: 2, name: "Bob" }
 * const user1Alt = { id: 1, name: "Alicia" }
 *
 * const map1 = new Map([[user1, "A"], [user2, "B"]])
 * const map2 = new Map([[user1Alt, "X"]])
 *
 * differenceWith(userEq)(map2)(map1)
 * // Map { {id:2, name:"Bob"} => "B" }
 *
 * // Numeric tolerance comparison
 * const approxEq = (tolerance: number) => (a: number, b: number) =>
 *   Math.abs(a - b) <= tolerance
 *
 * const measurements = new Map([[10.1, "Sample A"], [20.5, "Sample B"]])
 * const baseline = new Map([[10, "Base"]])
 *
 * differenceWith(approxEq(0.5))(baseline)(measurements)
 * // Map { 20.5 => "Sample B" }
 *
 * // Array key comparison by contents
 * const arrayEq = <T>(a: Array<T>, b: Array<T>) =>
 *   a.length === b.length && a.every((v, i) => v === b[i])
 *
 * const map1 = new Map([[[1, 2, 3], "A"], [[4, 5, 6], "B"]])
 * const map2 = new Map([[[1, 2, 3], "X"]])
 *
 * differenceWith(arrayEq)(map2)(map1)
 * // Map { [4,5,6] => "B" }
 *
 * // Date comparison with day precision
 * const sameDayEq = (a: Date, b: Date) =>
 *   a.getFullYear() === b.getFullYear() &&
 *   a.getMonth() === b.getMonth() &&
 *   a.getDate() === b.getDate()
 *
 * const events = new Map([
 *   [new Date("2024-01-15T10:00:00"), "Meeting"],
 *   [new Date("2024-01-16T09:00:00"), "Workshop"]
 * ])
 * const holidays = new Map([[new Date("2024-01-15T00:00:00"), "Holiday"]])
 *
 * differenceWith(sameDayEq)(holidays)(events)
 * // Map { Date("2024-01-16T09:00:00") => "Workshop" }
 * ```
 * @pure
 * @curried
 * @immutable
 */
const differenceWith = <K, V, K2, V2>(
	equalsFn: (a: K, b: K2) => boolean,
) =>
(subtrahend: Map<K2, V2>) =>
(minuend: Map<K, V>): Map<K, V> => {
	const subtrahendKeys = [...subtrahend.keys()]
	return new Map(
		[...minuend.entries()].filter(
			([key]) => !subtrahendKeys.some(sKey => equalsFn(key, sKey))
		)
	)
}

export default differenceWith
