import type { Maybe, Nothing } from "../../types/fp/maybe/index.ts"

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
 *   b === 0
 *     ? nothing()
 *     : just(a / b)
 *
 * const result1 = safeDivide(10)(2)  // Just(5)
 * const result2 = safeDivide(10)(0)  // Nothing
 *
 * // Using with pipe - operations skip on Nothing
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * import { map } from "../map/index.ts"
 * import { chain } from "../chain/index.ts"
 *
 * pipe(
 *   nothing(),
 *   map((x: number) => x * 2),    // Nothing - not executed
 *   map((x: number) => x + 3),    // Nothing - not executed
 *   map((x: number) => x.toString()) // Nothing - not executed
 * )
 *
 * // Safe array operations
 * const safeHead = <T>(arr: Array<T>): Maybe<T> =>
 *   arr.length > 0 ? just(arr[0]) : nothing()
 *
 * const safeLast = <T>(arr: Array<T>): Maybe<T> =>
 *   arr.length > 0 ? just(arr[arr.length - 1]) : nothing()
 *
 * safeHead([1, 2, 3])  // Just(1)
 * safeHead([])         // Nothing
 * safeLast([1, 2, 3])  // Just(3)
 * safeLast([])         // Nothing
 *
 * // Parsing with Nothing for failure
 * const parseInteger = (s: string): Maybe<number> => {
 *   const n = parseInt(s, 10)
 *   return isNaN(n) ? nothing() : just(n)
 * }
 *
 * parseInteger("42")    // Just(42)
 * parseInteger("abc")   // Nothing
 * parseInteger("")      // Nothing
 *
 * // Object property access
 * interface User {
 *   id: number
 *   name: string
 *   email?: string
 *   age?: number
 * }
 *
 * const getEmail = (user: User): Maybe<string> =>
 *   user.email ? just(user.email) : nothing()
 *
 * const getAge = (user: User): Maybe<number> =>
 *   user.age !== undefined ? just(user.age) : nothing()
 *
 * const user1: User = { id: 1, name: "Alice", email: "alice@example.com" }
 * const user2: User = { id: 2, name: "Bob" }
 *
 * getEmail(user1)  // Just("alice@example.com")
 * getEmail(user2)  // Nothing
 * getAge(user1)    // Nothing
 * getAge(user2)    // Nothing
 *
 * // Validation chains that short-circuit
 * const validatePositive = (n: number): Maybe<number> =>
 *   n > 0 ? just(n) : nothing()
 *
 * const validateEven = (n: number): Maybe<number> =>
 *   n % 2 === 0 ? just(n) : nothing()
 *
 * pipe(
 *   parseInteger("24"),
 *   chain(validatePositive),  // Just(24)
 *   chain(validateEven)       // Just(24)
 * )
 *
 * pipe(
 *   parseInteger("-4"),
 *   chain(validatePositive),  // Nothing - negative number
 *   chain(validateEven)       // Nothing - skipped
 * )
 *
 * // Find operations
 * const users: Array<User> = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob", email: "bob@example.com" },
 *   { id: 3, name: "Carol" }
 * ]
 *
 * const findUserById = (id: number) => (users: Array<User>): Maybe<User> => {
 *   const user = users.find(u => u.id === id)
 *   return user ? just(user) : nothing()
 * }
 *
 * findUserById(2)(users)  // Just({ id: 2, name: "Bob", email: "bob@example.com" })
 * findUserById(4)(users)  // Nothing
 *
 * // Environment variable access
 * const getEnvVar = (name: string): Maybe<string> => {
 *   const value = process.env[name]
 *   return value ? just(value) : nothing()
 * }
 *
 * getEnvVar("PATH")        // Just("/usr/bin:...")
 * getEnvVar("NONEXISTENT") // Nothing
 *
 * // Map lookup operations
 * const lookup = <K, V>(key: K) => (map: Map<K, V>): Maybe<V> => {
 *   const value = map.get(key)
 *   return value !== undefined ? just(value) : nothing()
 * }
 *
 * const cache = new Map([
 *   ["user:1", { id: 1, name: "Alice" }],
 *   ["user:2", { id: 2, name: "Bob" }]
 * ])
 *
 * lookup("user:1")(cache)  // Just({ id: 1, name: "Alice" })
 * lookup("user:3")(cache)  // Nothing
 * ```
 *
 * @property Pure - No side effects, always returns same Nothing instance
 * @property Type-safe - Absence is encoded in the type system
 * @property Composable - Works seamlessly with other Maybe functions
 */
const nothing = <A = never>(): Maybe<A> => ({
	_tag: "Nothing" as const,
} as Nothing)

export default nothing
