import type { Maybe, Nothing } from "../../types/fp/maybe/index.ts"

import isNotUndefined from "../../simple/validation/isNotUndefined/index.ts"

/**
 * Creates a Nothing value representing the absence of a value in a Maybe
 *
 * The Nothing constructor is used to represent cases where no value exists,
 * similar to None in other functional languages. When a Nothing is created,
 * subsequent map and chain operations will be skipped, effectively short-circuiting
 * the computation chain. This allows for safe handling of missing data and
 * null/undefined values without explicit null checks.
 *
 * @returns A Nothing value
 * @example
 * ```typescript
 * // Basic absence representation
 * const noValue = nothing()
 * // { _tag: "Nothing" }
 *
 * // Safe division with Nothing for error case
 * const safeDivide = (a: number) => (b: number): Maybe<number> =>
 *   b === 0 ? nothing() : just(a / b)
 *
 * safeDivide(10)(2)  // Just(5)
 * safeDivide(10)(0)  // Nothing
 *
 * // Using with pipe - operations skip on Nothing
 * pipe(
 *   nothing(),
 *   map((x: number) => x * 2),    // Nothing
 *   map((x: number) => x + 3),    // Nothing
 *   map((x: number) => x.toString()) // Nothing
 * )
 *
 * // Safe array operations
 * const safeHead = <T>(arr: Array<T>): Maybe<T> =>
 *   arr.length > 0 ? just(arr[0]) : nothing()
 *
 * safeHead([1, 2, 3])  // Just(1)
 * safeHead([])         // Nothing
 *
 * // Parsing with Nothing for failure
 * const parseInteger = (s: string): Maybe<number> => {
 *   const n = parseInt(s, 10)
 *   return isNaN(n) ? nothing() : just(n)
 * }
 *
 * parseInteger("42")    // Just(42)
 * parseInteger("abc")   // Nothing
 *
 * // Object property access
 * const getEmail = (user: { email?: string }): Maybe<string> =>
 *   user.email ? just(user.email) : nothing()
 *
 * getEmail({ email: "alice@example.com" })  // Just("alice@example.com")
 * getEmail({})  // Nothing
 *
 * // Validation chains that short-circuit
 * pipe(
 *   parseInteger("24"),
 *   chain(n => n > 0 ? just(n) : nothing()),  // Just(24)
 *   chain(n => n % 2 === 0 ? just(n) : nothing())  // Just(24)
 * )
 *
 * // Find operations
 * const findUserById = (id: number) => (users: Array<User>): Maybe<User> => {
 *   const user = users.find(u => u.id === id)
 *   return user ? just(user) : nothing()
 * }
 *
 * // Map lookup operations
 * const lookup = <K, V>(key: K) => (map: Map<K, V>): Maybe<V> => {
 *   const value = map.get(key)
 *   return isNotUndefined(value) ? just(value) : nothing()
 * }
 * ```
 *
 * @pure
 */
const nothing = <A = never>(): Maybe<A> => ({
	_tag: "Nothing" as const,
} as Nothing)

export default nothing
