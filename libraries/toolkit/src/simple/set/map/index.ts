/**
 * Maps a function over Set elements, returning a new Set
 *
 * Applies a transformation function to each element in the Set, creating
 * a new Set with the transformed values. If the transformation produces
 * duplicate values, only one instance is kept (Set uniqueness is maintained).
 * This is the Set equivalent of Array.map, but preserves uniqueness.
 *
 * @curried (fn) => (set) => newSet
 * @param fn - Function to transform each element
 * @param set - Set to transform
 * @returns New Set with transformed elements
 * @example
 * ```typescript
 * // Basic transformation
 * map((x: number) => x * 2)(new Set([1, 2, 3, 4]))
 * // Set { 2, 4, 6, 8 }
 *
 * // String transformation
 * map((s: string) => s.toUpperCase())(new Set(["hello", "world"]))
 * // Set { "HELLO", "WORLD" }
 *
 * // Transformation that creates duplicates (uniqueness maintained)
 * map((x: number) => Math.floor(x / 2))(new Set([1, 2, 3, 4, 5]))
 * // Set { 0, 1, 2 } (not { 0, 1, 1, 2, 2 })
 *
 * // Object property extraction
 * map((user: { id: number; name: string }) => user.name)(
 *   new Set([
 *     { id: 1, name: "Alice" },
 *     { id: 2, name: "Bob" },
 *     { id: 3, name: "Alice" }  // Same name
 *   ])
 * )
 * // Set { "Alice", "Bob" } (duplicate "Alice" removed)
 *
 * // Type conversion
 * map((n: number) => n.toString())(new Set([1, 2, 3]))
 * // Set { "1", "2", "3" }
 *
 * // Boolean mapping
 * map((x: number) => x > 2)(new Set([1, 2, 3, 4]))
 * // Set { false, true } (only two unique values)
 *
 * // Complex transformation
 * map((n: number) => ({ value: n, squared: n * n }))(new Set([1, 2, 3]))
 * // Set {
 * //   { value: 1, squared: 1 },
 * //   { value: 2, squared: 4 },
 * //   { value: 3, squared: 9 }
 * // }
 *
 * // Date transformation
 * map((date: Date) => date.getFullYear())(
 *   new Set([
 *     new Date("2023-01-01"),
 *     new Date("2023-06-15"),
 *     new Date("2024-01-01")
 *   ])
 * )
 * // Set { 2023, 2024 }
 *
 * // Length mapping (creates duplicates)
 * map((s: string) => s.length)(new Set(["a", "bb", "ccc", "dd", "e"]))
 * // Set { 1, 2, 3 }
 *
 * // Case normalization
 * map((s: string) => s.toLowerCase())(new Set(["Hello", "HELLO", "hello"]))
 * // Set { "hello" } (all map to same value)
 *
 * // Partial application for reusable transformers
 * const double = map((x: number) => x * 2)
 * double(new Set([1, 2, 3]))      // Set { 2, 4, 6 }
 * double(new Set([10, 20, 30]))   // Set { 20, 40, 60 }
 *
 * const getId = map((obj: { id: number }) => obj.id)
 * getId(new Set([{ id: 1 }, { id: 2 }, { id: 3 }]))
 * // Set { 1, 2, 3 }
 *
 * // Empty Set
 * map((x: number) => x * 2)(new Set())
 * // Set { }
 *
 * // Null/undefined handling in transformation
 * map((x: number | null) => x ?? 0)(new Set([1, null, 2, null]))
 * // Set { 1, 0, 2 } (both nulls map to 0, duplicates removed)
 *
 * // Handle null/undefined set gracefully
 * map((x: number) => x * 2)(null)       // Set { }
 * map((x: number) => x * 2)(undefined)  // Set { }
 *
 * // Symbol transformation
 * map((x: any) => typeof x)(
 *   new Set([1, "hello", true, Symbol("test"), null])
 * )
 * // Set { "number", "string", "boolean", "symbol", "object" }
 *
 * // Path extraction
 * map((path: string) => path.split("/")[0])(
 *   new Set(["/home/user", "/home/admin", "/var/log", "/etc/config"])
 * )
 * // Set { "", "var", "etc" } (empty string from leading slash)
 *
 * // Categorization
 * map((n: number) => n < 0 ? "negative" : n > 0 ? "positive" : "zero")(
 *   new Set([-2, -1, 0, 1, 2])
 * )
 * // Set { "negative", "zero", "positive" }
 *
 * // Chain with other operations
 * const numbers = new Set([1, 2, 3, 4, 5])
 * const doubled = map((x: number) => x * 2)(numbers)
 * const filtered = filter((x: number) => x > 5)(doubled)
 * // Set { 6, 8, 10 }
 * ```
 * @property Immutable - returns new Set, doesn't modify original
 * @property Uniqueness - maintains Set's unique value constraint
 * @property Transform - applies function to each element
 */
const map = <T, U>(
	fn: (value: T) => U,
) =>
(
	set: Set<T> | null | undefined,
): Set<U> => {
	if (set == null || !(set instanceof Set)) {
		return new Set()
	}

	const result = new Set<U>()

	for (const element of set) {
		result.add(fn(element))
	}

	return result
}

export default map
