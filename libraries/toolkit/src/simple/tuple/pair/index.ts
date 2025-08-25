import type { Pair } from "../../../types/tuple/index.ts"

/**
 * Creates a two-element tuple (Pair) from two values
 *
 * A pair tuple is the most common tuple type, providing a type-safe way
 * to group exactly two values together. This is useful for:
 * - Key-value pairs in mappings and dictionaries
 * - Coordinates in 2D space (x, y)
 * - Success/error result pairs
 * - Any binary relationship between two values
 *
 * The function is curried to allow partial application and composition,
 * making it easy to create specialized pair constructors.
 *
 * @curried second => first => pair
 * @param second - The second element of the pair
 * @param first - The first element of the pair
 * @returns A tuple containing exactly two elements
 * @example
 * ```typescript
 * // Basic usage
 * pair(20)(10)
 * // [10, 20]
 *
 * pair("value")("key")
 * // ["key", "value"]
 *
 * pair(true)(42)
 * // [42, true]
 *
 * // Different types
 * pair({ age: 30 })("Alice")
 * // ["Alice", { age: 30 }]
 *
 * // Type safety - result is Pair<T, U>, not (T | U)[]
 * const coord: Pair<number, number> = pair(5)(3)
 * // coord is typed as [number, number]
 *
 * // Creating key-value pairs
 * const makeEntry = (value: number) => (key: string) => pair(value)(key)
 * const entry = makeEntry(100)("score")
 * // ["score", 100]
 *
 * // Partial application for coordinates
 * const withY = (y: number) => (x: number) => pair(y)(x)
 * const atY10 = withY(10)
 * atY10(5)   // [5, 10]
 * atY10(15)  // [15, 10]
 * atY10(25)  // [25, 10]
 *
 * // Building collections of pairs
 * const keys = ["name", "age", "city"]
 * const values = ["Alice", 30, "NYC"]
 * const entries = keys.map((key, i) => pair(values[i])(key))
 * // [["name", "Alice"], ["age", 30], ["city", "NYC"]]
 *
 * // Result/Error patterns
 * type Result<T, E> = Pair<T | null, E | null>
 * const success = <T>(value: T): Result<T, never> => pair(null)(value)
 * const failure = <E>(error: E): Result<never, E> => pair(error)(null)
 *
 * success(42)           // [42, null]
 * failure("Not found")  // [null, "Not found"]
 *
 * // Pairing with index
 * const withIndex = <T>(arr: T[]): Array<Pair<number, T>> =>
 *   arr.map((item, i) => pair(item)(i))
 *
 * withIndex(["a", "b", "c"])
 * // [[0, "a"], [1, "b"], [2, "c"]]
 *
 * // Null and undefined handling
 * pair(null)(undefined)       // [undefined, null]
 * pair(undefined)(null)       // [null, undefined]
 *
 * // Nested pairs
 * pair(pair(4)(3))(pair(2)(1))
 * // [[1, 2], [3, 4]]
 *
 * // With destructuring
 * const [x, y] = pair(20)(10)
 * // x is 10, y is 20
 *
 * // Creating specialized constructors
 * const point = pair
 * const p1 = point(5)(3)      // [3, 5]
 *
 * const range = (end: number) => (start: number) => pair(end)(start)
 * range(10)(1)                // [1, 10]
 *
 * // Converting objects to entries
 * const objToEntry = <K extends string, V>(key: K, value: V) =>
 *   pair(value)(key)
 *
 * objToEntry("name", "Bob")   // ["name", "Bob"]
 *
 * // Compose with map for transformations
 * import { map } from "../../array/map"
 *
 * const pairWithDouble = map((x: number) => pair(x * 2)(x))
 * pairWithDouble([1, 2, 3])
 * // [[1, 2], [2, 4], [3, 6]]
 *
 * // Use with Object.fromEntries
 * const pairs: Array<Pair<string, number>> = [
 *   pair(1)("a"),
 *   pair(2)("b"),
 *   pair(3)("c")
 * ]
 * // Object.fromEntries(pairs) => { a: 1, b: 2, c: 3 }
 *
 * // Swappable pairs
 * const swap = <T, U>(p: Pair<T, U>): Pair<U, T> => pair(p[0])(p[1])
 * swap(pair("world")("hello")) // ["world", "hello"]
 * ```
 * @property Pure - No side effects
 * @property Total - Defined for all inputs
 * @property Curried - Returns partially applicable function
 * @property Type-safe - Returns Pair<T, U> type
 */
const pair = <U>(second: U) => <T>(first: T): Pair<T, U> => {
	return [first, second]
}

export default pair
