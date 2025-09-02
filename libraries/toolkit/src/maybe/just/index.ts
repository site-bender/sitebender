import type { Just, Maybe } from "../../types/fp/maybe/index.ts"

/**
 * Creates a Just value representing the presence of a value in a Maybe
 *
 * The Just constructor is used to represent cases where a value exists,
 * similar to Some in other functional languages. When a Just is created,
 * subsequent map and chain operations will be applied to the contained
 * value. This allows for safe handling of nullable values and optional
 * data in a functional programming style.
 *
 * @param value - The value to wrap in a Just
 * @returns A Just containing the value
 * @example
 * ```typescript
 * // Basic value wrapping
 * const value = just(42)
 * // { _tag: "Just", value: 42 }
 *
 * // Wrapping complex objects
 * const user = just({ id: 1, name: "Alice" })
 * // { _tag: "Just", value: { id: 1, name: "Alice" } }
 *
 * // Safe division example
 * const safeDivide = (a: number) => (b: number): Maybe<number> =>
 *   b === 0 ? nothing() : just(a / b)
 *
 * safeDivide(10)(2)  // Just(5)
 * safeDivide(10)(0)  // Nothing
 *
 * // Using with pipe for transformation chains
 * pipe(
 *   just(5),
 *   map(x => x * 2),    // Just(10)
 *   map(x => x + 3),    // Just(13)
 *   map(x => x.toString()) // Just("13")
 * )
 *
 * // Safe property access
 * const getApiUrl = (config: { apiUrl?: string }): Maybe<string> =>
 *   config.apiUrl ? just(config.apiUrl) : nothing()
 *
 * // Working with arrays and optional values
 * const findFirst = <T>(arr: Array<T>): Maybe<T> =>
 *   arr.length > 0 ? just(arr[0]) : nothing()
 *
 * findFirst([1, 2, 3])  // Just(1)
 * findFirst([])         // Nothing
 *
 * // Chaining optional operations
 * const parseInteger = (s: string): Maybe<number> => {
 *   const n = parseInt(s, 10)
 *   return isNaN(n) ? nothing() : just(n)
 * }
 *
 * pipe(
 *   just("42"),
 *   chain(parseInteger),
 *   chain(n => n > 0 ? just(n) : nothing())
 * )  // Just(42)
 * ```
 *
 * @pure
 */
const just = <A>(value: A): Maybe<A> => ({
	_tag: "Just" as const,
	value,
} as Just<A>)

export default just
