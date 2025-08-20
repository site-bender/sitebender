import type { Just, Maybe } from "../../../types/fp/maybe/index.ts"

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
 * const user = just({ 
 *   id: 1, 
 *   name: "Alice",
 *   email: "alice@example.com"
 * })
 * // { _tag: "Just", value: { id: 1, name: "Alice", email: "alice@example.com" } }
 * 
 * // Safe division example
 * const safeDivide = (a: number) => (b: number): Maybe<number> =>
 *   b === 0 
 *     ? nothing()
 *     : just(a / b)
 * 
 * const result1 = safeDivide(10)(2)  // Just(5)
 * const result2 = safeDivide(10)(0)  // Nothing
 * 
 * // Using with pipe for transformation chains
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * import { map } from "../map/index.ts"
 * 
 * pipe(
 *   just(5),
 *   map(x => x * 2),    // Just(10)
 *   map(x => x + 3),    // Just(13)
 *   map(x => x.toString()) // Just("13")
 * )
 * 
 * // Safe property access
 * interface Config {
 *   apiUrl?: string
 *   timeout?: number
 * }
 * 
 * const getApiUrl = (config: Config): Maybe<string> =>
 *   config.apiUrl ? just(config.apiUrl) : nothing()
 * 
 * const config1: Config = { apiUrl: "https://api.example.com", timeout: 5000 }
 * const config2: Config = { timeout: 5000 }
 * 
 * getApiUrl(config1) // Just("https://api.example.com")
 * getApiUrl(config2) // Nothing
 * 
 * // Working with arrays and optional values
 * const findFirst = <T>(arr: Array<T>): Maybe<T> =>
 *   arr.length > 0 ? just(arr[0]) : nothing()
 * 
 * findFirst([1, 2, 3])  // Just(1)
 * findFirst([])         // Nothing
 * 
 * // Partial application for specific types
 * interface User {
 *   id: number
 *   name: string
 *   age?: number
 * }
 * 
 * const getUserAge = (user: User): Maybe<number> =>
 *   user.age !== undefined ? just(user.age) : nothing()
 * 
 * const user1: User = { id: 1, name: "Bob", age: 25 }
 * const user2: User = { id: 2, name: "Carol" }
 * 
 * getUserAge(user1)  // Just(25)
 * getUserAge(user2)  // Nothing
 * 
 * // Chaining optional operations
 * import { chain } from "../chain/index.ts"
 * 
 * const parseInteger = (s: string): Maybe<number> => {
 *   const n = parseInt(s, 10)
 *   return isNaN(n) ? nothing() : just(n)
 * }
 * 
 * const validatePositive = (n: number): Maybe<number> =>
 *   n > 0 ? just(n) : nothing()
 * 
 * pipe(
 *   just("42"),
 *   chain(parseInteger),      // Just(42)
 *   chain(validatePositive)   // Just(42)
 * )
 * 
 * pipe(
 *   just("-5"),
 *   chain(parseInteger),      // Just(-5)
 *   chain(validatePositive)   // Nothing
 * )
 * ```
 * 
 * @property Pure - No side effects, always returns same output for same input
 * @property Type-safe - Optional values are encoded in the type system
 * @property Composable - Works seamlessly with other Maybe functions
 */
const just = <A>(value: A): Maybe<A> => ({
	_tag: "Just" as const,
	value,
} as Just<A>)

export default just