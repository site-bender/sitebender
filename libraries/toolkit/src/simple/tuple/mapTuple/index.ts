import type { Pair, Singleton, Triple } from "../../../types/tuple/index.ts"

/**
 * Maps a function over all elements of a tuple, preserving its structure
 *
 * Applies a transformation function to each element of a tuple (Singleton,
 * Pair, or Triple) and returns a new tuple of the same size with transformed
 * elements. Unlike regular array map, this preserves the tuple type and size.
 *
 * The function is curried to allow partial application and composition.
 *
 * @curried fn => tuple => mappedTuple
 * @param fn - The function to apply to each element
 * @param tuple - The tuple to map over
 * @returns A new tuple with transformed elements
 * @example
 * ```typescript
 * // With singleton
 * mapTuple((x: number) => x * 2)([5])
 * // [10]
 *
 * // With pair
 * mapTuple((x: number) => x * 2)([3, 4])
 * // [6, 8]
 *
 * // With triple
 * mapTuple((x: number) => x * 2)([1, 2, 3])
 * // [2, 4, 6]
 *
 * // Type transformation
 * mapTuple((x: number) => x.toString())([1, 2, 3])
 * // ["1", "2", "3"]
 *
 * mapTuple((s: string) => s.length)(["hello", "world"])
 * // [5, 5]
 *
 * // With type inference
 * import { Pair, Triple } from "../../../types/tuple"
 *
 * const p: Pair<number, number> = [10, 20]
 * const doubled = mapTuple(x => x * 2)(p)
 * // doubled is inferred as [number, number]
 * // [20, 40]
 *
 * const t: Triple<string, string, string> = ["a", "b", "c"]
 * const uppercased = mapTuple(s => s.toUpperCase())(t)
 * // ["A", "B", "C"]
 *
 * // Partial application for reusable mappers
 * const double = mapTuple((x: number) => x * 2)
 * double([1])        // [2]
 * double([3, 4])     // [6, 8]
 * double([5, 6, 7])  // [10, 12, 14]
 *
 * const toLength = mapTuple((s: string) => s.length)
 * toLength(["hi"])                    // [2]
 * toLength(["hello", "world"])        // [5, 5]
 * toLength(["one", "two", "three"])   // [3, 3, 5]
 *
 * // RGB color manipulation
 * type RGB = Triple<number, number, number>
 * const color: RGB = [128, 64, 32]
 * const brighten = mapTuple((c: number) => Math.min(255, c * 1.5))
 * brighten(color)  // [192, 96, 48]
 *
 * // Coordinate transformation
 * const scale = (factor: number) => mapTuple((x: number) => x * factor)
 * const point: Pair<number, number> = [3, 4]
 * scale(2)(point)   // [6, 8]
 * scale(0.5)(point) // [1.5, 2]
 *
 * // Boolean negation
 * const flags: Triple<boolean, boolean, boolean> = [true, false, true]
 * mapTuple(b => !b)(flags)  // [false, true, false]
 *
 * // Object property extraction
 * type User = { name: string; age: number }
 * const users: Pair<User, User> = [
 *   { name: "Alice", age: 30 },
 *   { name: "Bob", age: 25 }
 * ]
 * mapTuple((u: User) => u.name)(users)  // ["Alice", "Bob"]
 * mapTuple((u: User) => u.age)(users)   // [30, 25]
 *
 * // Chaining transformations
 * import { compose } from "../../combinator/compose"
 *
 * const processNumbers = compose(
 *   mapTuple((x: number) => x.toFixed(2)),
 *   mapTuple((x: number) => x / 100),
 *   mapTuple((x: number) => x * 2)
 * )
 *
 * processNumbers([50, 75, 100])
 * // ["1.00", "1.50", "2.00"]
 *
 * // Date formatting
 * type DateTriple = Triple<number, number, number>  // [year, month, day]
 * const date: DateTriple = [2024, 3, 15]
 * mapTuple((n: number) => n.toString().padStart(2, "0"))(date)
 * // ["2024", "03", "15"]
 *
 * // Safe string operations
 * const strings: Pair<string, string> = ["HELLO", "WORLD"]
 * mapTuple((s: string) => s.toLowerCase())(strings)
 * // ["hello", "world"]
 *
 * // Index preservation
 * const values: Triple<string, string, string> = ["a", "b", "c"]
 * let index = 0
 * mapTuple((x: string) => `${index++}: ${x}`)(values)
 * // ["0: a", "1: b", "2: c"]
 *
 * // Empty array handling (returns empty)
 * mapTuple((x: number) => x * 2)([])
 * // []
 *
 * // Invalid input handling
 * mapTuple((x: number) => x * 2)(null)
 * // []
 *
 * mapTuple((x: number) => x * 2)(undefined)
 * // []
 *
 * // Type narrowing with predicates
 * const mixed: Pair<unknown, unknown> = [42, "hello"]
 * const process = mapTuple((x: unknown) =>
 *   typeof x === "number" ? x * 2 : String(x).toUpperCase()
 * )
 * process(mixed)  // [84, "HELLO"]
 *
 * // Async operations (returns promises)
 * const urls: Pair<string, string> = ["/api/user", "/api/posts"]
 * const fetchers = mapTuple((url: string) => fetch(url))(urls)
 * // [Promise<Response>, Promise<Response>]
 * ```
 * @property Pure - No side effects (unless fn has side effects)
 * @property Type-preserving - Maintains tuple size
 * @property Curried - Allows partial application
 */
function mapTuple<T, U>(
	fn: (value: T) => U,
): {
	(tuple: Singleton<T>): Singleton<U>
	(tuple: Pair<T, T>): Pair<U, U>
	(tuple: Triple<T, T, T>): Triple<U, U, U>
	(tuple: ReadonlyArray<T>): Array<U>
	(tuple: null | undefined): []
}

function mapTuple<T, U>(
	fn: (value: T) => U,
) {
	return (tuple: ReadonlyArray<T> | null | undefined): Array<U> => {
		if (tuple == null || !Array.isArray(tuple)) {
			return []
		}

		return tuple.map(fn)
	}
}

export default mapTuple
